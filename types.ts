

export interface GeneratedImage {
  id: string;
  prompt: string;
  negativePrompt?: string;
  numberOfImages: number;
  aspectRatio: ImageAspectRatio;
  base64Data: string;
  timestamp: string;
  seed?: number; // Added for reproducibility
}

export type ImageAspectRatio = '1:1' | '3:4' | '4:3' | '9:16' | '16:9';

export interface GenerateImageConfig {
  prompt: string;
  negativePrompt?: string; // Kept for UX, not directly used by imagen-4.0-generate-001
  numberOfImages: number;
  aspectRatio: ImageAspectRatio;
  seed?: number; // Added for reproducibility
}

// The AIStudio interface and related global declaration are removed as the interactive API key selection is no longer used.
