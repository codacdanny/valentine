import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Music, Pause, Play, Volume2, VolumeX } from 'lucide-react';

function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [showPlayer, setShowPlayer] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    // You can add your romantic song URL here
    audioRef.current = new Audio('/music/romantic-song.mp3');
    audioRef.current.loop = true;
    audioRef.current.volume = 0.5;

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, []);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(err => {
          console.log('Audio play failed:', err);
        });
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <>
      <motion.button
        className="music-player-button"
        onClick={() => setShowPlayer(!showPlayer)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        animate={{
          boxShadow: isPlaying 
            ? [
                "0 0 20px rgba(255, 107, 157, 0.5)",
                "0 0 30px rgba(255, 107, 157, 0.8)",
                "0 0 20px rgba(255, 107, 157, 0.5)"
              ]
            : "0 0 10px rgba(255, 255, 255, 0.2)"
        }}
        transition={{
          boxShadow: {
            duration: 1.5,
            repeat: Infinity,
            repeatType: "reverse"
          }
        }}
      >
        <Music size={24} />
      </motion.button>

      <AnimatePresence>
        {showPlayer && (
          <motion.div
            className="music-player-panel"
            initial={{ scale: 0, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0, opacity: 0, y: 20 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
          >
            <div className="player-title">Our Song 🎵</div>
            
            <div className="player-controls">
              <motion.button
                className="player-control-button"
                onClick={togglePlay}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                {isPlaying ? <Pause size={20} /> : <Play size={20} />}
              </motion.button>

              <motion.button
                className="player-control-button"
                onClick={toggleMute}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
              </motion.button>
            </div>

            <div className="player-status">
              {isPlaying ? 'Now Playing' : 'Paused'}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default MusicPlayer;
