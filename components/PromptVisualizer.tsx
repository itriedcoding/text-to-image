import React, { useMemo } from 'react';
import { cn } from '../utils/cn';

interface PromptVisualizerProps {
  prompt: string;
  disabled?: boolean;
}

const PromptVisualizer: React.FC<PromptVisualizerProps> = ({ prompt, disabled }) => {
  const complexityScore = useMemo(() => {
    // Simple complexity based on prompt length and number of words
    const trimmedPrompt = prompt.trim();
    if (!trimmedPrompt) return 0;

    const lengthScore = Math.min(trimmedPrompt.length / 50, 1) * 0.5; // Max 0.5 for length over 50 chars
    const wordCount = trimmedPrompt.split(/\s+/).filter(Boolean).length;
    const wordScore = Math.min(wordCount / 10, 1) * 0.5; // Max 0.5 for 10+ words
    return lengthScore + wordScore; // Score between 0 and 1
  }, [prompt]);

  // Animation properties derived from complexityScore
  // Duration: Faster for lower complexity (more "raw"), slower for higher complexity (more "thoughtful")
  const animationDuration = `${Math.max(3 - complexityScore * 1.5, 1.5)}s`; // 3s to 1.5s
  // Blur: More blur for lower complexity (less "defined"), less blur for higher complexity (more "refined")
  const blurAmount = `${Math.max(4 - complexityScore * 4, 0)}px`; // 4px to 0px
  // Saturation: Less saturated for lower complexity, more vibrant for higher complexity
  const saturation = `${Math.max(70 + complexityScore * 130, 70)}%`; // 70% to 200%
  // Scale: Subtle scaling effect based on complexity
  const scale = `${1 + complexityScore * 0.05}`; // 1 to 1.05

  const displayPrompt = prompt.trim() === '' ? 'Start typing your prompt...' : prompt;

  return (
    <div
      className={cn(
        "relative w-full h-28 rounded-xl overflow-hidden flex items-center justify-center p-4 shadow-inner",
        "transition-all duration-500 ease-in-out",
        disabled ? "bg-gray-200 text-gray-500" : "bg-gradient-to-br from-blue-50 via-white to-blue-100",
      )}
      style={!disabled ? {
        transform: `scale(${scale})`,
        filter: `blur(${blurAmount}) saturate(${saturation})`,
        opacity: prompt.trim() === '' ? 0.7 : 1,
      } : {}}
      aria-hidden={disabled}
    >
      {disabled ? (
        <span className="text-xl font-semibold italic">Visualizer Disabled</span>
      ) : (
        <>
          {/* Background animated gradients */}
          <div className="absolute inset-0 bg-gradient-to-br from-purple-400 via-blue-500 to-indigo-600 animate-gradient-shift"></div>
          <div
            className="absolute inset-0 bg-gradient-to-tl from-green-300 via-yellow-400 to-orange-500 mix-blend-overlay animate-gradient-shift-alt"
            style={{ animationDuration: animationDuration }}
          ></div>

          {/* Foreground overlay for visual effect and text legibility */}
          <div className="absolute inset-0 bg-white/10 backdrop-blur-sm"></div>

          <p
            className="relative z-10 text-white text-xl font-bold drop-shadow-lg text-center select-none max-w-[95%] break-words leading-snug"
            aria-label={`Prompt visualizer for: ${displayPrompt}`}
          >
            {displayPrompt}
          </p>
        </>
      )}

      {/* Global CSS for keyframes (since <style jsx> isn't standard React) */}
      <style>{`
        @keyframes gradient-shift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        @keyframes gradient-shift-alt {
          0% { background-position: 100% 50%; }
          50% { background-position: 0% 50%; }
          100% { background-position: 100% 50%; }
        }
        .animate-gradient-shift {
          background-size: 200% 200%;
          animation: gradient-shift 4s ease infinite alternate;
        }
        .animate-gradient-shift-alt {
          background-size: 200% 200%;
          animation: gradient-shift-alt 5s ease infinite alternate;
        }
      `}</style>
    </div>
  );
};

export default PromptVisualizer;