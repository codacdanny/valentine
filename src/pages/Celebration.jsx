import { motion } from 'framer-motion';
import { useEffect } from 'react';
import { Heart, Sparkles, Star } from 'lucide-react';

function Celebration() {
  useEffect(() => {
    // Continuous confetti
    const script = document.createElement("script");
    script.src = "https://cdn.jsdelivr.net/npm/canvas-confetti@1.5.1/dist/confetti.browser.min.js";
    script.async = true;
    script.onload = () => {
      const duration = 15 * 1000;
      const animationEnd = Date.now() + duration;

      const randomInRange = (min, max) => Math.random() * (max - min) + min;

      const interval = setInterval(() => {
        const timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
          clearInterval(interval);
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
          },
          colors: ['#ff1744', '#ff6b9d', '#c44569', '#f97f51', '#ff4757']
        });
      }, 250);
    };

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div className="celebration-page">
      <motion.div
        className="celebration-container"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, type: "spring", bounce: 0.5 }}
      >
        <motion.div
          className="celebration-hearts"
          animate={{
            rotate: 360
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
        >
          <Heart className="celebration-heart celebration-heart-1" size={80} fill="#ff1744" />
          <Heart className="celebration-heart celebration-heart-2" size={60} fill="#ff6b9d" />
          <Heart className="celebration-heart celebration-heart-3" size={70} fill="#c44569" />
          <Heart className="celebration-heart celebration-heart-4" size={50} fill="#f97f51" />
        </motion.div>

        <motion.h1
          className="celebration-title"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          🎉 She Said YES! 🎉
        </motion.h1>

        <motion.div
          className="celebration-message"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <motion.p
            className="celebration-text"
            animate={{
              scale: [1, 1.05, 1]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatType: "reverse"
            }}
          >
            You just made me the happiest person in the world! 💖
          </motion.p>

          <motion.p
            className="celebration-subtext"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5 }}
          >
            I promise to make every day as special as you make me feel.
          </motion.p>

          <motion.p
            className="celebration-subtext"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2 }}
          >
            Here's to many more beautiful moments together! 🥂
          </motion.p>
        </motion.div>

        <motion.div
          className="celebration-icons"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 2.5, type: "spring" }}
        >
          <motion.div
            animate={{
              rotate: [0, 10, -10, 0],
              y: [0, -10, 0]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatType: "reverse"
            }}
          >
            <Sparkles size={60} color="#ffd700" />
          </motion.div>

          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 180, 360]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <Heart size={80} fill="#ff1744" color="#ff1744" />
          </motion.div>

          <motion.div
            animate={{
              rotate: [0, -10, 10, 0],
              y: [0, -10, 0]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatType: "reverse",
              delay: 0.5
            }}
          >
            <Star size={60} fill="#ffd700" color="#ffd700" />
          </motion.div>
        </motion.div>

        <motion.div
          className="celebration-emoji-rain"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3 }}
        >
          {['💖', '💕', '💗', '💓', '💝', '💘', '❤️', '🌹'].map((emoji, index) => (
            <motion.span
              key={index}
              className="falling-emoji"
              style={{
                left: `${10 + index * 12}%`,
              }}
              animate={{
                y: ['-10vh', '110vh'],
                rotate: [0, 360],
                opacity: [0, 1, 1, 0]
              }}
              transition={{
                duration: 5 + index * 0.5,
                repeat: Infinity,
                delay: index * 0.5,
                ease: "linear"
              }}
            >
              {emoji}
            </motion.span>
          ))}
        </motion.div>

        <motion.div
          className="celebration-final-message"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 4 }}
        >
          <p className="final-text">
            Forever and Always,<br />
            Your Valentine 💕
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}

export default Celebration;
