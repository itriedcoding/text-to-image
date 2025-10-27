
import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

const HomePage: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

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

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <div
      ref={sectionRef}
      className="flex flex-col items-center justify-center min-h-screen text-center px-4 pt-24 pb-8 opacity-0 transition-opacity duration-1000 ease-out"
      style={{
        animationDelay: '0.2s', // Delay for initial fade-in
      }}
    >
      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up {
          animation: fadeInUp 1s ease-out forwards;
        }
      `}</style>
      <h1 className="text-5xl md:text-7xl font-extrabold text-blue-900 leading-tight mb-6 animate-fade-in-up">
        Unleash Your Imagination
      </h1>
      <p className="text-lg md:text-xl text-blue-800 max-w-2xl mb-10 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
        Transform your ideas into stunning visuals with Gemini AI ImageCrafter.
        Experience advanced text-to-image generation with unparalleled creativity and control.
      </p>
      <Link
        to="/generate"
        className="
          inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded-full text-xl
          shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out transform hover:scale-105
          animate-fade-in-up
        "
        style={{ animationDelay: '0.6s' }}
      >
        Start Crafting Images
      </Link>
    </div>
  );
};

export default HomePage;
