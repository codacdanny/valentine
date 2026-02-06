import { Component } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ValentineProvider } from './context/ValentineContext';

// Error boundary so we show something instead of a blank screen
class ErrorBoundary extends Component {
  state = { hasError: false, error: null };

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          minHeight: '100vh',
          background: '#0a0a0a',
          color: '#fff',
          padding: '2rem',
          fontFamily: 'system-ui, sans-serif',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center'
        }}>
          <h1 style={{ color: '#ef4444', marginBottom: '1rem' }}>Something went wrong</h1>
          <pre style={{
            background: 'rgba(255,255,255,0.1)',
            padding: '1rem',
            borderRadius: '8px',
            overflow: 'auto',
            maxWidth: '100%',
            fontSize: '0.85rem'
          }}>
            {this.state.error?.message || String(this.state.error)}
          </pre>
          <p style={{ marginTop: '1.5rem', opacity: 0.8 }}>
            Check the browser console (F12) for details. Restart the dev server if you changed .env.
          </p>
        </div>
      );
    }
    return this.props.children;
  }
}

// Auth pages
import Login from './pages/Auth/Login';
import Signup from './pages/Auth/Signup';

// Dashboard
import Dashboard from './pages/BroCode/Dashboard';

// Dynamic Valentine pages
import DynamicValentine from './pages/DynamicValentine/DynamicValentine';

// Original pages (for backwards compatibility / personal use)
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

// Personal Valentine (original static version)
function PersonalValentine() {
  const [showNav, setShowNav] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowNav(true), 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
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
  );
}

function App() {
  return (
    <ErrorBoundary>
      <Router>
        <ValentineProvider>
          <Routes>
          {/* Authentication Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          
          {/* Bro Code Dashboard (secret admin panel) */}
          <Route path="/bro-code" element={<Dashboard />} />
          
          {/* Dynamic Valentine Pages (for each user) */}
          <Route path="/u/:username" element={<DynamicValentine />} />
          
          {/* Original Static Pages (for personal use) */}
          <Route path="/my-valentine/*" element={<PersonalValentine />} />
          
          {/* Default Route - Redirect to login/signup page */}
          <Route path="/" element={<Navigate to="/signup" replace />} />
          </Routes>
        </ValentineProvider>
      </Router>
    </ErrorBoundary>
  );
}

export default App;
