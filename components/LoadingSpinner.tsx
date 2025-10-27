
import React from 'react';

const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex items-center justify-center space-x-2 animate-pulse">
      <div className="w-4 h-4 bg-blue-500 rounded-full animate-bounce-delay-0"></div>
      <div className="w-4 h-4 bg-blue-500 rounded-full animate-bounce-delay-200"></div>
      <div className="w-4 h-4 bg-blue-500 rounded-full animate-bounce-delay-400"></div>
      <style>{`
        .animate-bounce-delay-0 { animation-delay: 0s; }
        .animate-bounce-delay-200 { animation-delay: 0.2s; }
        .animate-bounce-delay-400 { animation-delay: 0.4s; }
        @keyframes bounce {
          0%, 100% { transform: translateY(-25%); animation-timing-function: cubic-bezier(0.8, 0, 1, 1); }
          50% { transform: translateY(0); animation-timing-function: cubic-bezier(0, 0, 0.2, 1); }
        }
        .animate-bounce-delay-0, .animate-bounce-delay-200, .animate-bounce-delay-400 {
          animation: bounce 1s infinite;
        }
      `}</style>
    </div>
  );
};

export default LoadingSpinner;
