import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import GeneratePage from './pages/GeneratePage';
import HistoryPage from './pages/HistoryPage';

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