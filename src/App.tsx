import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import Timeline from './components/Timeline';
import PhotoAlbum from './components/PhotoAlbum';
import LoveLetter from './components/LoveLetter';
import Countdown from './components/Countdown';
import FloatingHearts from './components/FloatingHearts';
import PageSelector from './components/PageSelector';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-blush">
        <FloatingHearts />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/timeline" element={<Timeline />} />
          <Route path="/photos" element={<PhotoAlbum />} />
          <Route path="/letter" element={<LoveLetter />} />
          <Route path="/countdown" element={<Countdown />} />
        </Routes>
        <PageSelector />
      </div>
    </Router>
  );
}

export default App;