import React, { useState, useEffect, useRef } from 'react';
import { GeneratedImage } from '../types';
import { IMAGE_HISTORY_STORAGE_KEY } from '../constants';
import ImageCard from '../components/ImageCard';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';

const HistoryPage: React.FC = () => {
  const [history, setHistory] = useState<GeneratedImage[]>([]);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const storedHistory = localStorage.getItem(IMAGE_HISTORY_STORAGE_KEY);
    if (storedHistory) {
      // Sort by timestamp descending (newest first)
      const parsedHistory: GeneratedImage[] = JSON.parse(storedHistory)
        .sort((a: GeneratedImage, b: GeneratedImage) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
      setHistory(parsedHistory);
    }
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in-up');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    cardRefs.current.forEach((ref) => {
      if (ref) {
        observer.observe(ref);
      }
    });

    return () => {
      cardRefs.current.forEach((ref) => {
        if (ref) {
          observer.unobserve(ref);
        }
      });
    };
  }, [history]);

  const clearHistory = () => {
    if (window.confirm("Are you sure you want to clear all your image history? This action cannot be undone.")) {
      localStorage.removeItem(IMAGE_HISTORY_STORAGE_KEY);
      setHistory([]);
    }
  };

  return (
    <div className="container mx-auto px-6 py-8 pt-28">
      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up {
          animation: fadeInUp 0.8s ease-out forwards;
        }
      `}</style>
      <h1 className="text-4xl font-extrabold text-blue-900 mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-800">
        Your Generation History
      </h1>

      {history.length > 0 && (
        <div className="flex justify-center mb-10">
          <Button
            onClick={clearHistory}
            variant="destructive"
            className="shadow-md hover:shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105"
          >
            Clear All History
          </Button>
        </div>
      )}

      {history.length === 0 ? (
        <Card className="max-w-xl mx-auto">
          <CardContent className="py-8 text-center text-blue-800 text-lg">
            <p className="mb-4">No images generated yet.</p>
            <p>Go to the "Generate" page to create your first masterpiece!</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {history.map((image, index) => (
            <div
              key={image.id}
              // Fixed: Ensure the ref callback returns void
              ref={(el) => {
                cardRefs.current[index] = el;
              }}
              className="opacity-0" // Start invisible for animation
              style={{ animationDelay: `${index * 0.1}s` }} // Staggered animation
            >
              <ImageCard image={image} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default HistoryPage;