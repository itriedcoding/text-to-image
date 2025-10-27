

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

// Fix: Define the `AIStudio` interface based on the properties expected
// for `window.aistudio` to resolve type conflicts and "subsequent property declarations" error.
interface AIStudio {
  hasSelectedApiKey: () => Promise<boolean>;
  openSelectKey: () => Promise<void>;
}

// Remove the declare global block based on the assumption that `window.aistudio`
// is already globally typed by the environment, making this a duplicate declaration.
// This resolves "All declarations of 'aistudio' must have identical modifiers."
// and "Subsequent property declarations must have the same type." errors.
// If after this fix, there's an error about `aistudio` not existing on `Window`,
// then the `declare global` would need to be reinstated, implying the problem
// was deeper (e.g., build config processing files multiple times).
// declare global {
//   interface Window {
//     aistudio: AIStudio; // Assign the defined AIStudio interface as the type
//   }
// }
