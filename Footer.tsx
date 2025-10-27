import React from 'react';
import { Link } from 'react-router-dom';
import { cn } from '../utils/cn';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white/70 backdrop-blur-lg shadow-inner mt-16 py-8 border-t border-blue-100">
      <div className="container mx-auto px-6 text-center text-blue-700">
        <div className="mb-4">
          <Link to="/" className="text-2xl font-bold text-blue-800 hover:text-blue-600 transition-colors duration-300">
            AI ImageCrafter
          </Link>
        </div>
        <div className="flex flex-wrap justify-center space-x-4 md:space-x-8 text-sm md:text-base mb-6">
          <FooterLink to="/terms">Terms of Service</FooterLink>
          <FooterLink to="/privacy">Privacy Policy</FooterLink>
          <FooterLink to="/generate">Generate</FooterLink>
          <FooterLink to="/history">History</FooterLink>
        </div>
        <p className="text-sm">
          &copy; {currentYear} Gemini AI ImageCrafter. All rights reserved.
        </p>
        <p className="text-xs mt-2 text-blue-600">
          Powered by Google's Gemini AI. This is a frontend-only simulation of a user authentication system.
        </p>
      </div>
    </footer>
  );
};

interface FooterLinkProps {
  to: string;
  children: React.ReactNode;
}

const FooterLink: React.FC<FooterLinkProps> = ({ to, children }) => (
  <Link
    to={to}
    className={cn(
      'text-blue-700 hover:text-blue-500 transition-colors duration-300 relative',
      'inline-flex items-center justify-center whitespace-nowrap text-sm font-medium',
      'px-0 h-auto'
    )}
  >
    {children}
    <span className="absolute left-0 bottom-0 w-full h-0.5 bg-blue-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out"></span>
  </Link>
);

export default Footer;