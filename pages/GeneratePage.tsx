import React, { useState, useCallback, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { generateImagesWithGemini, editImageWithGemini } from '../services/geminiService';
import { GeneratedImage, ImageAspectRatio } from '../types';
import { IMAGE_HISTORY_STORAGE_KEY, DEFAULT_PROMPT, DEFAULT_NUMBER_OF_IMAGES, DEFAULT_ASPECT_RATIO, MAX_IMAGES_TO_GENERATE } from '../constants';
import LoadingSpinner from '../components/LoadingSpinner';
import ImageCard from '../components/ImageCard';
import { Card, CardHeader, CardTitle, CardContent, CardFooter, CardDescription } from '../components/ui/card';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { Input } from '../components/ui/input';
import { Select } from '../components/ui/select';
import { Button } from '../components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '../components/ui/alert';
import { PROMPT_CATEGORIES } from '../promptSuggestions';
import { cn } from '../utils/cn';
import PromptVisualizer from '../components/PromptVisualizer';

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

  // New: State for image editing
  const [editingImage, setEditingImage] = useState<GeneratedImage | null>(null);
  const [editPrompt, setEditPrompt] = useState('');

  // Generation is disabled only when loading, as API key is assumed from environment.
  const isGenerationDisabled = loading;

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
      const cleanedPrompt = prompt.trim().replace(/,\s*$/, '').trim(); // Remove trailing comma and whitespace

      if (!cleanedPrompt) {
        setError("Prompt cannot be empty.");
        setLoading(false);
        return;
      }

      const base64Images = await generateImagesWithGemini({
        prompt: cleanedPrompt,
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

    } catch (err: any) {
      console.error("Generation error:", err);
      setError(err.message || 'Failed to generate images. Please try again.');
    } finally {
      setLoading(false);
    }
  }, [prompt, negativePrompt, numberOfImages, aspectRatio, seed, saveToHistory]);


  const handleEditImage = useCallback((image: GeneratedImage) => {
    setEditingImage(image);
    setEditPrompt(`Refine the image: ${image.prompt}`); // Pre-fill edit prompt
    window.scrollTo({ top: 0, behavior: 'smooth' }); // Scroll to top to show editor
  }, []);

  const handleApplyEdit = useCallback(async () => {
    if (!editingImage || !editPrompt.trim()) {
      setError("Please provide a prompt for editing.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const editedBase64 = await editImageWithGemini({
        prompt: editPrompt.trim(),
        sourceImageBase64: editingImage.base64Data,
        sourceImageMimeType: 'image/png', // Assuming all generated images are PNG
      });

      const newEditedImage: GeneratedImage = {
        id: uuidv4(),
        prompt: editPrompt.trim(),
        negativePrompt: editingImage.negativePrompt, // Carry over negative prompt
        numberOfImages: 1, // Edited image is always one
        aspectRatio: editingImage.aspectRatio, // Maintain original aspect ratio
        base64Data: editedBase64,
        timestamp: new Date().toISOString(),
        seed: editingImage.seed, // Carry over seed if applicable
        sourceImageId: editingImage.id, // Reference to the original image
      };

      // Add the new edited image to the beginning of the generated images list
      setGeneratedImages(prev => [newEditedImage, ...prev]);
      saveToHistory([newEditedImage]);

      setEditingImage(null); // Clear editing state
      setEditPrompt(''); // Clear edit prompt
      setPrompt(DEFAULT_PROMPT); // Reset main prompt for new generations

    } catch (err: any) {
      console.error("Editing error:", err);
      setError(err.message || 'Failed to edit image. Please try again.');
    } finally {
      setLoading(false);
    }
  }, [editingImage, editPrompt, saveToHistory]);

  const handleCancelEdit = useCallback(() => {
    setEditingImage(null);
    setEditPrompt('');
    setError(null);
  }, []);


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

      {editingImage && (
        <Card className="mb-12 p-0 border-purple-300 shadow-xl bg-purple-50/50">
          <CardHeader className="pb-4">
            <CardTitle className="text-purple-800">Edit Image</CardTitle>
            <CardDescription className="text-purple-700">Refine or transform an existing image.</CardDescription>
          </CardHeader>
          <CardContent className="pt-0 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col items-center justify-center p-4 bg-white/70 rounded-lg shadow-inner">
              <Label className="mb-2 text-purple-900 font-semibold">Original Image:</Label>
              <img
                src={`data:image/png;base64,${editingImage.base64Data}`}
                alt="Image to edit"
                className="rounded-lg max-h-48 object-contain shadow-md"
                style={{ aspectRatio: editingImage.aspectRatio, maxWidth: '100%' }}
              />
              <p className="text-sm text-center text-purple-800 mt-2 line-clamp-2">{editingImage.prompt}</p>
            </div>
            <div className="flex flex-col gap-4">
              <Label htmlFor="editPrompt" className="mb-1 text-purple-900">
                New Prompt for Editing <span className="text-sm text-purple-600">(What changes do you want?)</span>
              </Label>
              <Textarea
                id="editPrompt"
                value={editPrompt}
                onChange={(e) => setEditPrompt(e.target.value)}
                placeholder="e.g., add a red hat, change the background to a snowy forest, make it an oil painting"
                rows={4}
                required
                className="resize-y border-purple-400 focus-visible:ring-purple-500"
                disabled={isGenerationDisabled}
              />
              <div className="flex space-x-3 mt-4">
                <Button
                  onClick={handleApplyEdit}
                  className="w-full py-3 text-lg bg-gradient-to-r from-purple-600 to-indigo-700 hover:from-purple-700 hover:to-indigo-800"
                  disabled={isGenerationDisabled || !editPrompt.trim()}
                >
                  {loading ? (
                    <>
                      <LoadingSpinner />
                      <span className="ml-3">Applying Edit...</span>
                    </>
                  ) : (
                    'Apply Edit'
                  )}
                </Button>
                <Button
                  onClick={handleCancelEdit}
                  variant="outline"
                  className="w-full py-3 text-lg border-purple-400 text-purple-800 hover:bg-purple-100"
                  disabled={isGenerationDisabled}
                >
                  Cancel
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
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
                <ImageCard image={img} onEdit={handleEditImage} />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default GeneratePage;