import { GoogleGenAI, Modality } from "@google/genai";
import { GenerateImageConfig, EditedImageConfig } from '../types';

/**
 * Generates images using the Gemini `imagen-4.0-generate-001` model.
 * The API key is expected to be available via `process.env.API_KEY`.
 * @param {GenerateImageConfig} config - Configuration for image generation.
 * @returns {Promise<string[]>} An array of base64 encoded image strings.
 * @throws {Error} If image generation fails.
 */
export const generateImagesWithGemini = async (config: GenerateImageConfig): Promise<string[]> => {
  // CRITICAL: Create GoogleGenAI instance right before making an API call
  // to ensure it always uses the most up-to-date API key from the environment.
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
    console.error("Error generating image:", error);
    throw new Error(`Failed to generate images: ${error.message || 'Unknown error'}`);
  }
};

/**
 * Edits an image using the Gemini `gemini-2.5-flash-image` model.
 * @param {EditedImageConfig} config - Configuration for image editing.
 * @returns {Promise<string>} A base64 encoded string of the edited image.
 * @throws {Error} If image editing fails.
 */
export const editImageWithGemini = async (config: EditedImageConfig): Promise<string> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image', // Model for image editing
      contents: {
        parts: [
          {
            inlineData: {
              data: config.sourceImageBase64,
              mimeType: config.sourceImageMimeType,
            },
          },
          {
            text: config.prompt, // The prompt for editing
          },
        ],
      },
      config: {
        responseModalities: [Modality.IMAGE],
      },
    });

    const editedImagePart = response.candidates?.[0]?.content?.parts?.[0];
    if (editedImagePart?.inlineData?.data) {
      return editedImagePart.inlineData.data;
    } else {
      throw new Error('No edited image generated or invalid response structure.');
    }
  } catch (error: any) {
    console.error("Error editing image:", error);
    throw new Error(`Failed to edit image: ${error.message || 'Unknown error'}`);
  }
};