import React, { useState, useRef, useEffect, useCallback } from 'react';
import { GeneratedImage } from '../types';
import { Button } from './ui/button'; // Import the new Button component
import { Card, CardContent, CardFooter } from './ui/card'; // Import Card components
import { cn } from '../utils/cn';

interface ImageCardProps {
  image: GeneratedImage;
  onEdit?: (image: GeneratedImage) => void; // New: Callback for editing an image
}

const ImageCard: React.FC<ImageCardProps> = ({ image, onEdit }) => {
  const [copied, setCopied] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (cardRef.current) {
      const card = cardRef.current.getBoundingClientRect();
      const centerX = card.left + card.width / 2;
      const centerY = card.top + card.height / 2;
      const x = (e.clientX - centerX) / (card.width / 2); // -1 to 1
      const y = (e.clientY - centerY) / (card.height / 2); // -1 to 1

      // Adjust sensitivity
      setTilt({ x: y * 5, y: -x * 5 }); // Rotate around X based on Y mouse pos, around Y based on X mouse pos
    }
  }, []);

  const handleMouseEnter = useCallback(() => {
    setIsHovering(true);
    document.addEventListener('mousemove', handleMouseMove);
  }, [handleMouseMove]);

  const handleMouseLeave = useCallback(() => {
    setIsHovering(false);
    setTilt({ x: 0, y: 0 }); // Reset tilt
    document.removeEventListener('mousemove', handleMouseMove);
  }, [handleMouseMove]);

  const downloadImage = () => {
    const link = document.createElement('a');
    link.href = `data:image/png;base64,${image.base64Data}`;
    link.download = `gemini-image-${image.id}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const copyLink = () => {
    // For a frontend-only app, the "random link" will be the data URI itself.
    navigator.clipboard.writeText(`data:image/png;base64,${image.base64Data}`)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      })
      .catch((err) => console.error('Failed to copy: ', err));
  };

  const handleEditClick = () => {
    if (onEdit) {
      onEdit(image);
    }
  };

  useEffect(() => {
    // Cleanup on unmount
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, [handleMouseMove]);

  return (
    // Fixed: The Card component itself needs to be updated to accept `ref` via `React.forwardRef`.
    // The error `Property 'ref' does not exist on type 'IntrinsicAttributes & CardProps'.` will be resolved
    // by changing the definition of `Card` in `components/ui/card.tsx`.
    <Card
      ref={cardRef}
      className={cn(
        `transition-all duration-500 ease-out flex flex-col items-center space-y-4`,
        isHovering ? 'scale-105 shadow-2xl' : '',
      )}
      style={{
        transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <CardContent className="flex flex-col items-center p-4">
        <img
          src={`data:image/png;base64,${image.base64Data}`}
          alt={image.prompt}
          className="rounded-lg max-h-64 object-contain shadow-md"
          style={{ aspectRatio: image.aspectRatio, maxWidth: '100%' }}
        />
        <p className="text-center text-blue-900 font-semibold text-sm line-clamp-2 min-h-[2.5em] mt-4">
          {image.prompt}
        </p>
        {image.sourceImageId && (
          <p className="text-xs text-blue-600 italic mt-1">
            (Edited from previous generation)
          </p>
        )}
      </CardContent>
      <CardFooter className="flex flex-col items-center justify-center space-y-3 pt-0">
        <div className="flex space-x-3 w-full justify-center">
          <Button onClick={downloadImage} className="w-full">
            Download
          </Button>
          <Button
            onClick={copyLink}
            variant={copied ? 'secondary' : 'default'}
            className={cn("w-full", copied ? 'bg-green-500 hover:bg-green-600 text-white' : '')}
          >
            {copied ? 'Copied!' : 'Copy Link'}
          </Button>
        </div>
        {onEdit && (
          <Button
            onClick={handleEditClick}
            variant="outline"
            className="w-full mt-2 flex items-center justify-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
            Edit Image
          </Button>
        )}
        <p className="text-xs text-blue-700 mt-2">
          Generated: {new Date(image.timestamp).toLocaleString()}
          {image.seed !== undefined && <span className="ml-2">(Seed: {image.seed})</span>}
        </p>
      </CardFooter>
    </Card>
  );
};

export default ImageCard;