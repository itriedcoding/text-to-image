
import React, { useState, useRef, useEffect, useCallback } from 'react';
import { GeneratedImage } from '../types';
import { Button } from './ui/button'; // Import the new Button component
import { Card, CardContent, CardFooter } from './ui/card'; // Import Card components
import { cn } from '../utils/cn';

interface ImageCardProps {
  image: GeneratedImage;
  onEdit?: (image: GeneratedImage) => void; // New: Callback for editing an image
}

// Helper to convert base64 to Blob
const base64ToBlob = (base64: string, mimeType: string): Blob => {
  const byteCharacters = atob(base64);
  const byteNumbers = new Array(byteCharacters.length);
  for (let i = 0; i < byteCharacters.length; i++) {
    byteNumbers[i] = byteCharacters.charCodeAt(i);
  }
  const byteArray = new Uint8Array(byteNumbers);
  return new Blob([byteArray], { type: mimeType });
};

const ImageCard: React.FC<ImageCardProps> = ({ image, onEdit }) => {
  const [copied, setCopied] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [objectUrl, setObjectUrl] = useState<string | null>(null); // New state for object URL

  useEffect(() => {
    // Generate object URL when image data changes
    if (image.base64Data) {
      const blob = base64ToBlob(image.base64Data, 'image/png'); // Assuming PNG from geminiService
      const url = URL.createObjectURL(blob);
      setObjectUrl(url);
      // Cleanup: revoke the object URL when component unmounts or image changes
      return () => {
        URL.revokeObjectURL(url);
      };
    }
  }, [image.base64Data]);

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
    if (objectUrl) {
      const link = document.createElement('a');
      link.href = objectUrl;
      link.download = `gemini-image-${image.id}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      console.error('Object URL not available for download.');
    }
  };

  const copyLink = () => {
    if (objectUrl) {
      navigator.clipboard.writeText(objectUrl)
        .then(() => {
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
        })
        .catch((err) => console.error('Failed to copy: ', err));
    } else {
      console.error('Object URL not available for copying.');
    }
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
          src={objectUrl || `data:image/png;base64,${image.base64Data}`} // Fallback to data URI if objectUrl not ready
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
          <Button onClick={downloadImage} className="w-full" disabled={!objectUrl}>
            Download
          </Button>
          <Button
            onClick={copyLink}
            variant={copied ? 'secondary' : 'default'}
            className={cn("w-full", copied ? 'bg-green-500 hover:bg-green-600 text-white' : '')}
            disabled={!objectUrl}
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
