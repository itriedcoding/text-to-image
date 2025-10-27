import React, { useState, useCallback, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { generateImagesWithGemini } from '../services/geminiService'; // ensureApiKeySelected is implicitly handled by prompt
import { GeneratedImage, ImageAspectRatio } from '../types';
import { IMAGE_HISTORY_STORAGE_KEY, DEFAULT_PROMPT, DEFAULT_NUMBER_OF_IMAGES, DEFAULT_ASPECT_RATIO, MAX_IMAGES_TO_GENERATE, DEFAULT_SEED } from '../constants';
import LoadingSpinner from '../components/LoadingSpinner';
import ImageCard from '../components/ImageCard';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '../components/ui/card';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { Input } from '../components/ui/input';
import { Select } from '../components/ui/select';
import { Button } from '../components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '../components/ui/alert';
import { PROMPT_CATEGORIES } from '../promptSuggestions'; // Import prompt suggestions
import { cn } from '../utils/cn'; // Import cn utility
import PromptVisualizer from '../components/PromptVisualizer'; // Import the new PromptVisualizer

const GeneratePage: React.FC = () => {
  const [prompt, setPrompt] = useState(DEFAULT_PROMPT);
  const [negativePrompt, setNegativePrompt] = useState(''); // Not directly used by imagen-4.0-generate-001, but kept for advanced UX.
  const [numberOfImages, setNumberOfImages] = useState(DEFAULT_NUMBER_OF_IMAGES);
  const [aspectRatio, setAspectRatio] = useState<ImageAspectRatio>(DEFAULT_ASPECT_RATIO);
  const [seed, setSeed] = useState<number | undefined>(undefined); // New state for seed
  const [generatedImages, setGeneratedImages] = useState<GeneratedImage[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showPromptBuilder, setShowPromptBuilder] = useState(false); // State for prompt builder visibility
  const [apiKeyStatus, setApiKeyStatus] = useState<'checking' | 'selected' | 'not-selected'>('checking');


  // --- API Key Management Logic ---
  useEffect(() => {
    const checkInitialApiKey = async () => {
      if (typeof window.aistudio === 'undefined' || !window.aistudio.hasSelectedApiKey) {
        console.warn('window.aistudio API not available. Assuming API_KEY is NOT set via environment variable.');
        setApiKeyStatus('not-selected'); // Assume not selected if platform API is missing
        return;
      }
      try {
        const hasKey = await window.aistudio.hasSelectedApiKey();
        setApiKeyStatus(hasKey ? 'selected' : 'not-selected');
      } catch (err) {
        console.error("Error checking API key status:", err);
        setApiKeyStatus('not-selected');
        setError("Failed to check API key status. Please try again.");
      }
    };
    checkInitialApiKey();
  }, []);

  const handleSelectApiKey = async () => {
    setApiKeyStatus('checking'); // Indicate that selection process is starting
    setError(null); // Clear any previous errors

    try {
      if (typeof window.aistudio === 'undefined' || !window.aistudio.openSelectKey) {
        setError("AI Studio platform API not available. Cannot select API key.");
        setApiKeyStatus('not-selected');
        return;
      }
      await window.aistudio.openSelectKey();
      // After selection attempt, re-check status
      const hasKey = await window.aistudio.hasSelectedApiKey();
      setApiKeyStatus(hasKey ? 'selected' : 'not-selected');
      if (!hasKey) {
        setError("API key selection was cancelled or failed. Please try again.");
      } else {
        setError(null); // Clear any previous errors if key is now selected
      }
    } catch (err: any) {
      setError(`Failed to select API key: ${err.message || 'Unknown error'}`);
      setApiKeyStatus('not-selected');
    }
  };

  const isGenerationDisabled = loading || apiKeyStatus !== 'selected';
  // --- End API Key Management Logic ---


  const saveToHistory = useCallback((newImages: GeneratedImage[]) => {
    const historyString = localStorage.getItem(IMAGE_HISTORY_STORAGE_KEY);
    const history: GeneratedImage[] = historyString ? JSON.parse(historyString) : [];
    const updatedHistory = [...newImages, ...history];
    localStorage.setItem(IMAGE_HISTORY_STORAGE_KEY, JSON.stringify(updatedHistory));
  }, []);

  const appendToPrompt = useCallback((keyword: string) => {
    setPrompt(prevPrompt => {
      let newPrompt = prevPrompt.trim();
      if (newPrompt === '') {
        return keyword;
      }
      // Check if it ends with a punctuation or space, if not, add a comma and space
      if (!newPrompt.match(/[,.\s]$/)) {
        newPrompt += ', ';
      } else if (newPrompt.endsWith(',')) {
        newPrompt += ' '; // Add space if it ends with just a comma
      }
      return newPrompt + keyword;
    });
  }, []);

  const clearPrompt = useCallback(() => {
    setPrompt('');
  }, []);

  const handleGenerate = useCallback(async () => {
    setLoading(true);
    setError(null);
    setGeneratedImages([]); // Clear previous results

    try {
      // The `generateImagesWithGemini` function already handles `ensureApiKeySelected` internally
      // and will prompt the user if the key is missing or invalid.
      // We should optimistically set apiKeyStatus to 'selected' if an error from `generateImagesWithGemini`
      // isn't related to API key, or to 'not-selected' if it is.

      const cleanedPrompt = prompt.trim().replace(/,\s*$/, '').trim(); // Remove trailing comma and whitespace

      if (!cleanedPrompt) {
        setError("Prompt cannot be empty.");
        setLoading(false);
        return;
      }

      const base64Images = await generateImagesWithGemini({
        prompt: cleanedPrompt,
        // negativePrompt is not supported by 'imagen-4.0-generate-001'
        // We could theoretically append it to the prompt if the model was more flexible,
        // but it's best to keep it explicit for future model updates.
        numberOfImages,
        aspectRatio,
        seed: seed !== undefined ? Number(seed) : undefined, // Pass seed if provided
      });

      const newGeneratedImages: GeneratedImage[] = base64Images.map(data => ({
        id: uuidv4(),
        prompt: cleanedPrompt,
        negativePrompt,
        numberOfImages,
        aspectRatio,
        base64Data: data,
        timestamp: new Date().toISOString(),
        seed: seed !== undefined ? Number(seed) : undefined,
      }));

      setGeneratedImages(newGeneratedImages);
      saveToHistory(newGeneratedImages);
      setApiKeyStatus('selected'); // If generation was successful, API key is active.

    } catch (err: any) {
      console.error("Generation error:", err);
      // If the error indicates API key issue, set status to not-selected
      if (err.message && err.message.includes("API key invalid or not found")) {
        setApiKeyStatus('not-selected');
        setError("API key invalid or not found. Please select your API key again.");
      } else {
        setError(err.message || 'Failed to generate images. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  }, [prompt, negativePrompt, numberOfImages, aspectRatio, seed, saveToHistory]);

  // Scroll to new images when they are generated
  useEffect(() => {
    if (generatedImages.length > 0) {
      const firstImageElement = document.getElementById(generatedImages[0].id);
      firstImageElement?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [generatedImages]);

  // Helper for responsive number of images selection
  const numImagesOptions = Array.from({ length: MAX_IMAGES_TO_GENERATE }, (_, i) => i + 1);

  return (
    <div className="container mx-auto px-6 py-8 pt-28">
      <h1 className="text-4xl font-extrabold text-blue-900 mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-800">
        Generate New Images
      </h1>

      {/* API Key Status & Management Card */}
      {apiKeyStatus === 'checking' && (
        <Alert className="mb-6 flex items-center justify-center bg-blue-50 text-blue-800 border-blue-200 shadow-md">
          <LoadingSpinner />
          <AlertDescription className="ml-4 text-base font-semibold">Checking Google Gemini API Key status...</AlertDescription>
        </Alert>
      )}

      {apiKeyStatus === 'not-selected' && (
        <Card className="mb-10 p-4 border-red-300 bg-red-50 text-red-800 shadow-lg animate-fade-in-up">
          <CardHeader className="pb-4">
            <CardTitle className="text-red-700 text-3xl">Google Gemini API Key Required</CardTitle>
            <CardDescription className="text-red-600 text-base mt-2">
              To unleash your creativity with AI image generation, you need to select your Google Gemini API Key.
              <br /><br />
              Please note:
              <ul className="list-disc list-inside ml-4 mt-2 space-y-1">
                <li>Direct API key input is not supported due to platform security guidelines.</li>
                <li>This application is currently focused on the Google Gemini API. Integration with other APIs like OpenAI is not supported at this time.</li>
              </ul>
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center pt-0">
            <Button onClick={handleSelectApiKey} className="mb-4 bg-red-600 hover:bg-red-700 text-white text-lg py-3 px-8 rounded-full shadow-lg">
              Select Google Gemini API Key
            </Button>
            <p className="text-sm text-red-600 text-center">
              Please ensure your selected API key has billing enabled to prevent service interruptions.
              <br />
              <a href="https://ai.google.dev/gemini-api/docs/billing" target="_blank" rel="noopener noreferrer" className="text-red-800 hover:underline font-medium">
                Billing Information
              </a>
            </p>
          </CardContent>
        </Card>
      )}

      {apiKeyStatus === 'selected' && !error && (
        <Alert className="mb-6 bg-green-50 text-green-800 border-green-200 shadow-md animate-fade-in-up">
          <AlertTitle className="text-green-700">API Key Active!</AlertTitle>
          <AlertDescription className="text-base">
            Google Gemini API Key is successfully selected. You are ready to create!
          </AlertDescription>
        </Alert>
      )}

      <Card className="mb-12 p-0">
        <CardHeader className="pb-4">
          <CardTitle>Image Generation Controls</CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="mb-6">
            <Label htmlFor="prompt" className="mb-2">
              Prompt <span className="text-sm text-blue-600">(What do you want to create?)</span>
            </Label>
            <Textarea
              id="prompt"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Describe your desired image..."
              rows={4}
              required
              className="resize-y"
              disabled={isGenerationDisabled}
            />
          </div>

          {/* NEW: Prompt Visualizer */}
          <div className="mb-8">
            <PromptVisualizer prompt={prompt} disabled={isGenerationDisabled} />
          </div>
          {/* END NEW */}

          <div className="flex justify-start mb-6">
            <Button
              variant="outline"
              onClick={() => setShowPromptBuilder(!showPromptBuilder)}
              className="group"
              disabled={isGenerationDisabled}
            >
              <svg
                className={cn("mr-2 h-4 w-4 transition-transform duration-300", showPromptBuilder ? "rotate-90" : "rotate-0")}
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M5 12h14" />
                <path d="M12 5v14" />
              </svg>
              {showPromptBuilder ? 'Hide Prompt Builder' : 'Show Prompt Builder'}
            </Button>
          </div>

          {showPromptBuilder && (
            <Card className="mb-10 p-0 shadow-lg border-blue-200 bg-blue-50/50">
              <CardHeader className="pb-4">
                <CardTitle className="text-2xl text-blue-800">Advanced Prompt Builder</CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="mb-6 flex justify-end">
                  <Button variant="secondary" onClick={clearPrompt} className="hover:bg-blue-100" disabled={isGenerationDisabled}>
                    Clear Current Prompt
                  </Button>
                </div>
                {PROMPT_CATEGORIES.map((categoryData, index) => (
                  <div key={categoryData.category} className={cn("mb-6", index < PROMPT_CATEGORIES.length - 1 ? 'border-b border-blue-200 pb-6' : '')}>
                    <h3 className="text-xl font-semibold text-blue-700 mb-4">{categoryData.category}</h3>
                    <div className="flex flex-wrap gap-3">
                      {categoryData.suggestions.map(suggestion => (
                        <Button
                          key={suggestion}
                          variant="secondary"
                          size="sm"
                          onClick={() => appendToPrompt(suggestion)}
                          className="hover:bg-blue-100 transition-colors duration-200"
                          disabled={isGenerationDisabled}
                        >
                          {suggestion}
                        </Button>
                      ))}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          )}

          <div className="mb-6">
            <Label htmlFor="negativePrompt" className="mb-2">
              Negative Prompt <span className="text-sm text-blue-600">(What to avoid? - UI-only, not directly supported by current model 'imagen-4.0-generate-001')</span>
            </Label>
            <Textarea
              id="negativePrompt"
              value={negativePrompt}
              onChange={(e) => setNegativePrompt(e.target.value)}
              placeholder="e.g., blurry, low quality, deformed, text"
              rows={2}
              className="resize-y"
              disabled={isGenerationDisabled}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <div className="grid gap-2">
              <Label htmlFor="numImages">Number of Images</Label>
              <Select
                id="numImages"
                value={numberOfImages}
                onChange={(e) => setNumberOfImages(Number(e.target.value))}
                disabled={isGenerationDisabled}
              >
                {numImagesOptions.map((num) => (
                  <option key={num} value={num}>{num}</option>
                ))}
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="aspectRatio">Aspect Ratio</Label>
              <Select
                id="aspectRatio"
                value={aspectRatio}
                onChange={(e) => setAspectRatio(e.target.value as ImageAspectRatio)}
                disabled={isGenerationDisabled}
              >
                <option value="1:1">1:1 (Square)</option>
                <option value="4:3">4:3 (Landscape)</option>
                <option value="3:4">3:4 (Portrait)</option>
                <option value="16:9">16:9 (Widescreen)</option>
                <option value="9:16">9:16 (Tall)</option>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="seed">Seed (Optional)</Label>
              <Input
                id="seed"
                type="number"
                placeholder="Leave blank for random"
                value={seed === undefined ? '' : seed}
                onChange={(e) => setSeed(e.target.value === '' ? undefined : Number(e.target.value))}
                disabled={isGenerationDisabled}
              />
            </div>
          </div>

          {error && (
            <Alert variant="destructive" className="mb-6">
              <AlertTitle>Error!</AlertTitle>
              <AlertDescription className="flex items-center justify-between">
                <span>{error}</span>
                <Button variant="ghost" size="icon" onClick={() => setError(null)} className="ml-4 -mr-2">
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                </Button>
              </AlertDescription>
            </Alert>
          )}

          <Button
            onClick={handleGenerate}
            className="w-full py-4 text-xl bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800"
            disabled={isGenerationDisabled}
          >
            {loading ? (
              <>
                <LoadingSpinner />
                <span className="ml-3">Generating...</span>
              </>
            ) : (
              'Generate Images'
            )}
          </Button>
        </CardContent>
      </Card>

      {generatedImages.length > 0 && (
        <div className="mt-12">
          <h2 className="text-3xl font-bold text-blue-900 mb-8 text-center">Your Creations</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {generatedImages.map((img) => (
              <div key={img.id} id={img.id} className="animate-fade-in-up">
                <ImageCard image={img} />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default GeneratePage;