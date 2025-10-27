import React, { useEffect } from 'react';
import { HashRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import GeneratePage from './pages/GeneratePage';
import HistoryPage from './pages/HistoryPage';
import { GeneratedImage } from './types';

// Component to handle navigation and image editing state from history
const GeneratePageWrapper: React.FC = () => {
  const navigate = useNavigate();
  // We'll pass `editingImage` down to `GeneratePage` as a prop if it exists.
  // This state can be used to pre-fill the editing UI.
  // For simplicity, we'll use localStorage to pass the image from HistoryPage.
  // In a more complex app, a global state management solution would be preferred.

  useEffect(() => {
    const imageToEditString = localStorage.getItem('imageToEdit');
    if (imageToEditString) {
      const imageToEdit: GeneratedImage = JSON.parse(imageToEditString);
      // GeneratePage will handle setting its internal editingImage state based on this prop.
      // We clear it immediately after reading to avoid stale data.
      localStorage.removeItem('imageToEdit');
      // Pass the image via state to GeneratePage
      navigate('/generate', { state: { imageToEdit } });
    }
  }, [navigate]);

  return <GeneratePage />;
};


const App: React.FC = () => {
  // `isAuthenticated` state and its management are removed from App.tsx.
  // API key selection and status are now handled directly within GeneratePage.
  return (
    <Router>
      {/* Navbar no longer receives isAuthenticated prop */}
      <Navbar />
      <main className="min-h-screen pt-16">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/generate" element={<GeneratePage />} />
          <Route path="/history" element={<HistoryPage />} />
          {/* AuthPage route is removed as API key management is moved to GeneratePage */}
        </Routes>
      </main>
    </Router>
  );
};

export default App;