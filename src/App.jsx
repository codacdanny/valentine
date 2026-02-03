import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Landing from './pages/Landing';
import OurStory from './pages/OurStory';
import Gallery from './pages/Gallery';
import LoveLetters from './pages/LoveLetters';
import Proposal from './pages/Proposal';
import Celebration from './pages/Celebration';
import Navigation from './components/Navigation';
import MusicPlayer from './components/MusicPlayer';
import ParticleBackground from './components/ParticleBackground';

function App() {
  const [showNav, setShowNav] = useState(false);

  useEffect(() => {
    // Show navigation after landing
    const timer = setTimeout(() => setShowNav(true), 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Router>
      <div className="app">
        <ParticleBackground />
        {showNav && <Navigation />}
        <MusicPlayer />
        
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/our-story" element={<OurStory />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/love-letters" element={<LoveLetters />} />
          <Route path="/proposal" element={<Proposal />} />
          <Route path="/celebration" element={<Celebration />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
