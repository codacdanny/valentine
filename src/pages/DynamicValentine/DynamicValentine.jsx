import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from '../../supabase/client';
import Landing from '../Landing';
import OurStory from '../OurStory';
import Gallery from '../Gallery';
import LoveLetters from '../LoveLetters';
import Proposal from '../Proposal';
import Celebration from '../Celebration';
import Navigation from '../../components/Navigation';
import MusicPlayer from '../../components/MusicPlayer';
import ParticleBackground from '../../components/ParticleBackground';
import { Loader2, AlertCircle } from 'lucide-react';
import './DynamicValentine.css';

function mapRowToValentineData(row) {
  if (!row) return null;
  return {
    ...row,
    relationshipStartDate: row.relationship_start_date ?? '',
    loveReasons: row.love_reasons ?? [],
    milestones: row.milestones ?? [],
    photos: row.photos ?? [],
    music: row.music ?? null
  };
}

function DynamicValentine() {
  const { username } = useParams();
  const [valentineData, setValentineData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState('landing');

  useEffect(() => {
    const fetchValentineData = async () => {
      try {
        const { data, error: err } = await supabase
          .from('valentines')
          .select('*')
          .eq('username', username)
          .maybeSingle();

        if (err) throw err;
        if (!data) {
          setError('Page not found');
        } else {
          setValentineData(mapRowToValentineData(data));
        }
      } catch (err) {
        console.error('Error fetching valentine data:', err);
        setError('Something went wrong. Try again later.');
      } finally {
        setLoading(false);
      }
    };

    if (username) {
      fetchValentineData();
    }
  }, [username]);

  if (loading) {
    return (
      <div className="dynamic-loading">
        <ParticleBackground />
        <Loader2 className="loading-spinner" size={80} />
        <h2>Loading...</h2>
        <p>Preparing the experience</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="dynamic-error">
        <ParticleBackground />
        <AlertCircle className="error-icon" size={80} />
        <h2>{error}</h2>
        <p>This page doesn't exist or has been removed.</p>
      </div>
    );
  }

  return (
    <div className="dynamic-valentine-app">
      <ParticleBackground />
      <Navigation currentPage={currentPage} onNavClick={setCurrentPage} />
      <MusicPlayer musicUrl={valentineData?.music} />

      {currentPage === 'landing' && (
        <Landing onNavigate={() => setCurrentPage('story')} />
      )}
      {currentPage === 'story' && (
        <OurStory
          startDate={valentineData?.relationshipStartDate}
          milestones={valentineData?.milestones}
        />
      )}
      {currentPage === 'gallery' && (
        <Gallery photos={valentineData?.photos || []} />
      )}
      {currentPage === 'letters' && (
        <LoveLetters reasons={valentineData?.loveReasons || []} />
      )}
      {currentPage === 'proposal' && (
        <Proposal onYes={() => setCurrentPage('celebration')} />
      )}
      {currentPage === 'celebration' && <Celebration />}
    </div>
  );
}

export default DynamicValentine;
