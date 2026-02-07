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
import valentineConfig from './valentineConfig';

function App() {
  const [currentPage, setCurrentPage] = useState('landing');
  const [showNav, setShowNav] = useState(false);
  const [musicStarted, setMusicStarted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowNav(true), 2500);
    return () => clearTimeout(timer);
  }, []);

  const handleBeginJourney = () => {
    setMusicStarted(true);
    setCurrentPage('story');
  };

  return (
    <div className="app">
      <ParticleBackground />
      {showNav && <Navigation currentPage={currentPage} onNavClick={setCurrentPage} />}
      <MusicPlayer musicUrl={valentineConfig.musicUrl} startPlaying={musicStarted} />

      {currentPage === 'landing' && (
        <Landing onNavigate={handleBeginJourney} />
      )}
      {currentPage === 'story' && (
        <OurStory
          startDate={valentineConfig.relationshipStartDate}
          milestones={valentineConfig.milestones}
        />
      )}
      {currentPage === 'gallery' && (
        <Gallery photos={valentineConfig.photos} />
      )}
      {currentPage === 'letters' && (
        <LoveLetters reasons={valentineConfig.loveReasons} />
      )}
      {currentPage === 'proposal' && (
        <Proposal onYes={() => setCurrentPage('celebration')} />
      )}
      {currentPage === 'celebration' && <Celebration />}
    </div>
  );
}

export default App;
