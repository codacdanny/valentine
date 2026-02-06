import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Heart, Sparkles } from 'lucide-react';
import { useState, useEffect } from 'react';

function Landing({ onNavigate }) {
  const navigate = useNavigate();
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowButton(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="landing-page">
      <motion.div
        className="landing-content"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
      >
        <motion.div
          className="landing-heart-container"
          animate={{ 
            scale: [1, 1.2, 1],
            rotate: [0, 5, -5, 0]
          }}
          transition={{ 
            duration: 2,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        >
          <Heart className="landing-heart" size={120} />
        </motion.div>

        <motion.h1
          className="landing-title"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
        >
          6 Months of Pure Magic
        </motion.h1>

        <motion.p
          className="landing-subtitle"
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
        >
          A journey through our beautiful story
        </motion.p>

        {showButton && (
          <motion.button
            className="landing-button"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ 
              delay: 0.5,
              type: "spring",
              stiffness: 260,
              damping: 20 
            }}
            whileHover={{ 
              scale: 1.1,
              boxShadow: "0 0 30px rgba(255, 105, 180, 0.6)"
            }}
            whileTap={{ scale: 0.95 }}
            onClick={() => (onNavigate ? onNavigate() : navigate('/our-story'))}
          >
            <Sparkles className="button-icon" size={20} />
            Begin Our Journey
            <Sparkles className="button-icon" size={20} />
          </motion.button>
        )}

        <motion.div
          className="scroll-indicator"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: showButton ? 0.5 : 0 }}
        >
          <div className="scroll-arrow">↓</div>
        </motion.div>
      </motion.div>
    </div>
  );
}

export default Landing;
