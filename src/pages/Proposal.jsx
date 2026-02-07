import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Heart } from 'lucide-react';

function Proposal({ onYes }) {
  const [showProposal, setShowProposal] = useState(false);
  const [hearts, setHearts] = useState([]);
  const [noButtonPosition, setNoButtonPosition] = useState({ x: 0, y: 0 });
  const [noButtonText, setNoButtonText] = useState("No 💔");
  const [yesButtonSize, setYesButtonSize] = useState(1);

  useEffect(() => {
    // Add confetti script
    const script = document.createElement("script");
    script.src = "https://cdn.jsdelivr.net/npm/canvas-confetti@1.5.1/dist/confetti.browser.min.js";
    script.async = true;
    document.body.appendChild(script);

    const timer = setTimeout(() => setShowProposal(true), 1000);

    return () => {
      if (script.parentNode) script.parentNode.removeChild(script);
      clearTimeout(timer);
    };
  }, []);

  useEffect(() => {
    if (showProposal) {
      const interval = setInterval(() => {
        setHearts((prev) => [
          ...prev.slice(-20),
          {
            id: Date.now() + Math.random(),
            left: Math.random() * 100,
          },
        ]);
      }, 300);

      return () => clearInterval(interval);
    }
  }, [showProposal]);

  const handleYes = () => {
    // Massive confetti celebration
    if (window.confetti) {
      const duration = 5 * 1000;
      const animationEnd = Date.now() + duration;

      const randomInRange = (min, max) => Math.random() * (max - min) + min;

      const interval = setInterval(() => {
        const timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
          clearInterval(interval);
          if (onYes) onYes();
          return;
        }

        const particleCount = 50 * (timeLeft / duration);

        window.confetti({
          particleCount,
          startVelocity: 30,
          spread: 360,
          origin: {
            x: randomInRange(0.1, 0.9),
            y: Math.random() - 0.2
          }
        });
      }, 250);
    } else {
      setTimeout(() => onYes?.(), 1000);
    }
  };

  const handleNoHover = () => {
    // Move button to random position
    const newX = Math.random() * (window.innerWidth - 200) - (window.innerWidth / 2 - 100);
    const newY = Math.random() * (window.innerHeight - 100) - (window.innerHeight / 2 - 50);
    setNoButtonPosition({ x: newX, y: newY });
    
    // Change button text
    const texts = [
      "Are you sure? 🥺",
      "Think again! ❤️",
      "Wrong button! 😅",
      "Try the YES button! 💕",
      "You can't say no! 😊",
      "Just say YES! 💖"
    ];
    setNoButtonText(texts[Math.floor(Math.random() * texts.length)]);

    // Make YES button bigger
    setYesButtonSize(prev => Math.min(prev + 0.1, 2));
  };

  return (
    <div className="proposal-page">
      <div className="floating-hearts">
        {hearts.map((heart) => (
          <motion.div
            key={heart.id}
            className="floating-heart"
            style={{ left: `${heart.left}%` }}
            initial={{ y: '100vh', opacity: 1 }}
            animate={{ y: '-100vh', opacity: 0 }}
            transition={{ duration: 4, ease: 'linear' }}
          >
            ❤️
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {showProposal && (
          <motion.div
            className="proposal-container"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, type: "spring" }}
          >
            <motion.div
              className="proposal-heart-icon"
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
              <Heart className="big-heart" size={100} fill="#ff1744" color="#ff1744" />
            </motion.div>

            <motion.div
              className="proposal-text-container"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <motion.h1
                className="proposal-line"
                initial={{ x: -100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.7, duration: 0.6 }}
              >
                My Love,
              </motion.h1>

              <motion.h1
                className="proposal-line"
                initial={{ x: 100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 1, duration: 0.6 }}
              >
                Will You Be
              </motion.h1>

              <motion.h1
                className="proposal-line proposal-main"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 1.3, duration: 0.8, type: "spring" }}
              >
                My Valentine? 💖
              </motion.h1>
            </motion.div>

            <motion.div
              className="proposal-buttons"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.8 }}
            >
              <motion.button
                className="proposal-yes-button"
                onClick={handleYes}
                style={{ transform: `scale(${yesButtonSize})` }}
                whileHover={{ 
                  scale: yesButtonSize * 1.1,
                  boxShadow: "0 0 40px rgba(255, 23, 68, 0.8)"
                }}
                whileTap={{ scale: yesButtonSize * 0.95 }}
                animate={{
                  boxShadow: [
                    "0 0 20px rgba(255, 23, 68, 0.5)",
                    "0 0 30px rgba(255, 23, 68, 0.8)",
                    "0 0 20px rgba(255, 23, 68, 0.5)"
                  ]
                }}
                transition={{
                  boxShadow: {
                    duration: 1.5,
                    repeat: Infinity,
                    repeatType: "reverse"
                  }
                }}
              >
                Yes! 💝 YES! 💖 YES!
              </motion.button>

              <motion.button
                className="proposal-no-button"
                onMouseEnter={handleNoHover}
                onClick={handleYes}
                animate={{
                  x: noButtonPosition.x,
                  y: noButtonPosition.y
                }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                whileHover={{ scale: 0.9 }}
              >
                {noButtonText}
              </motion.button>
            </motion.div>

            <motion.p
              className="proposal-hint"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.7 }}
              transition={{ delay: 2.5 }}
            >
              (Hint: There's only one right answer 😉)
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default Proposal;
