import { GoogleGenAI } from "@google/genai";
import { GenerateImageConfig } from '../types';

/**
 * Ensures an API key is selected before proceeding with an AI operation.
 * If no key is selected, it prompts the user and potentially retries.
 * @returns {Promise<boolean>} True if an API key is available, false otherwise.
 */
export const ensureApiKeySelected = async (): Promise<boolean> => {
  if (typeof window.aistudio === 'undefined' || !window.aistudio.hasSelectedApiKey) {
    console.warn('window.aistudio API not available. Assuming API_KEY is NOT set via environment variable.');
    return false; // Crucially, return false if platform API is not available to indicate key is not selected
  }

  let hasKey = await window.aistudio.hasSelectedApiKey();
  if (!hasKey) {
    alert('Please select your Google Gemini API Key to use this feature. Billing information: ai.google.dev/gemini-api/docs/billing');
    try {
      await window.aistudio.openSelectKey();
      // After selection attempt, re-check status
      hasKey = await window.aistudio.hasSelectedApiKey();
      if (!hasKey) {
        throw new Error("API key selection was cancelled or failed.");
      }
    } catch (error) {
      console.error("Error during API key selection:", error);
      throw new Error("API key selection failed. Please try again.");
    }
  }
  return hasKey;
};

/**
 * Generates images using the Gemini `imagen-4.0-generate-001` model.
 * @param {GenerateImageConfig} config - Configuration for image generation.
 * @returns {Promise<string[]>} An array of base64 encoded image strings.
 * @throws {Error} If API key is not selected, or if image generation fails.
 */
export const generateImagesWithGemini = async (config: GenerateImageConfig): Promise<string[]> => {
  // First, ensure an API key is selected. This function will prompt the user if needed.
  const isApiKeyReady = await ensureApiKeySelected();
  if (!isApiKeyReady) {
    // If ensureApiKeySelected returns false (e.g., aistudio API missing or user cancelled),
    // throw an error to prevent proceeding without a key.
    throw new Error("API key not selected or platform API not available.");
  }

  // CRITICAL: Create GoogleGenAI instance right before making an API call
  // to ensure it always uses the most up-to-date API key from the dialog.
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

  try {
    const generationConfig: Record<string, any> = {
      numberOfImages: config.numberOfImages,
      outputMimeType: 'image/png', // Always request PNG for consistency
      aspectRatio: config.aspectRatio,
    };

    if (config.seed !== undefined) {
      generationConfig.seed = config.seed;
    }

    const response = await ai.models.generateImages({
      model: 'imagen-4.0-generate-001',
      prompt: config.prompt,
      config: generationConfig,
    });

    if (response.generatedImages && response.generatedImages.length > 0) {
      return response.generatedImages.map(img => img.image.imageBytes);
    } else {
      throw new Error('No images generated or invalid response structure.');
    }
  } catch (error: any) {
    if (error.message && error.message.includes("Requested entity was not found.")) {
      console.error("API key might be invalid or not selected. Prompting user to select key.");
      // This part now re-prompts for API key due to an actual API error,
      // and if successful, generateImagesWithGemini will retry, otherwise re-throws.
      // The calling component (GeneratePage) can then update its UI state.
      await ensureApiKeySelected(); // Attempt to get a new key
      throw new Error("API key invalid or not found. Please select your API key and try again.");
    }
    console.error("Error generating image:", error);
    throw new Error(`Failed to generate images: ${error.message || 'Unknown error'}`);
  }
};