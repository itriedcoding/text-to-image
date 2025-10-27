import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from './ui/button'; // Import the new Button component
import { cn } from '../utils/cn'; // Import cn utility

interface NavbarProps { // Add props interface
  // isAuthenticated prop removed as API key status is managed on GeneratePage
}

const Navbar: React.FC<NavbarProps> = () => { // Accept isAuthenticated
  return (
    <nav className="bg-white/70 backdrop-blur-lg shadow-lg fixed w-full z-10 top-0">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-blue-800 hover:text-blue-600 transition-colors duration-300">
          AI ImageCrafter
        </Link>
        <div className="flex space-x-4 md:space-x-8">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/generate">Generate</NavLink>
          <NavLink to="/history">History</NavLink>
          {/* Removed conditional "Sign In" / "Welcome Back" as API key is managed on GeneratePage */}
        </div>
      </div>
    </nav>
  );
};

interface NavLinkProps {
  to: string;
  children: React.ReactNode;
}

const NavLink: React.FC<NavLinkProps> = ({ to, children }) => (
  <Link
    to={to}
    className={cn(
      'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium',
      'ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2',
      'focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
      'hover:bg-blue-50 hover:text-blue-800',
      "text-lg font-medium text-blue-700 hover:text-blue-500 transition-colors duration-300 relative",
      "px-0 h-auto"
    )}
  >
    {children}
    <span className="absolute left-0 bottom-0 w-full h-0.5 bg-blue-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out"></span>
  </Link>
);

export default Navbar;