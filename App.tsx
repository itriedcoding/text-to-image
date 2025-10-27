import React, { useEffect, useState } from 'react';
import { HashRouter as Router, Routes, Route, useNavigate, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer'; // Import Footer with correct relative path
import HomePage from './pages/HomePage';
import GeneratePage from './pages/GeneratePage';
import HistoryPage from './pages/HistoryPage';
import AuthPage from './AuthPage'; // Import AuthPage
import TermsOfServicePage from './TermsOfServicePage'; // Import TermsOfServicePage
import PrivacyPolicyPage from './PrivacyPolicyPage'; // Import PrivacyPolicyPage
import { GeneratedImage } from './types';

// Auth Guard component
interface ProtectedRouteProps {
  children: React.ReactNode;
  isAuthenticated: boolean;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, isAuthenticated }) => {
  if (!isAuthenticated) {
    return <Navigate to="/auth" replace />;
  }
  return <>{children}</>;
};

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return localStorage.getItem('isLoggedIn') === 'true';
  });
  const [username, setUsername] = useState<string | null>(() => {
    return localStorage.getItem('currentUser');
  });

  const handleLogin = (user: string) => {
    setIsAuthenticated(true);
    setUsername(user);
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('currentUser', user);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUsername(null);
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('currentUser');
  };

  // Component to handle navigation and image editing state from history
  const GeneratePageWrapper: React.FC = () => {
    const navigate = useNavigate();
    
    useEffect(() => {
      const imageToEditString = localStorage.getItem('imageToEdit');
      if (imageToEditString) {
        const imageToEdit: GeneratedImage = JSON.parse(imageToEditString);
        localStorage.removeItem('imageToEdit');
        navigate('/generate', { state: { imageToEdit } });
      }
    }, [navigate]);

    return <GeneratePage />;
  };

  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar isAuthenticated={isAuthenticated} username={username} onLogout={handleLogout} />
        <main className="flex-grow pt-16"> {/* flex-grow to push footer to bottom */}
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/auth" element={<AuthPage onLogin={handleLogin} />} />
            <Route path="/terms" element={<TermsOfServicePage />} />
            <Route path="/privacy" element={<PrivacyPolicyPage />} />
            <Route
              path="/generate"
              element={
                <ProtectedRoute isAuthenticated={isAuthenticated}>
                  <GeneratePageWrapper />
                </ProtectedRoute>
              }
            />
            <Route
              path="/history"
              element={
                <ProtectedRoute isAuthenticated={isAuthenticated}>
                  <HistoryPage />
                </ProtectedRoute>
              }
            />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;