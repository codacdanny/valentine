import { motion } from 'framer-motion';
import { Heart, Smile, Star, Coffee, Music, Sun } from 'lucide-react';

function LoveLetters() {
  const reasons = [
    {
      icon: <Heart size={30} />,
      title: "Your Beautiful Smile",
      text: "Every time you smile, my whole world lights up. It's the most beautiful thing I've ever seen.",
      color: "#ff6b9d"
    },
    {
      icon: <Smile size={30} />,
      title: "Your Laughter",
      text: "Your laugh is my favorite sound. It's infectious, genuine, and makes every moment better.",
      color: "#c44569"
    },
    {
      icon: <Star size={30} />,
      title: "Your Kindness",
      text: "The way you care for everyone around you shows the beautiful soul you have. You inspire me every day.",
      color: "#f97f51"
    },
    {
      icon: <Coffee size={30} />,
      title: "Morning Conversations",
      text: "Waking up to your messages and hearing your voice is the perfect start to any day.",
      color: "#ff4757"
    },
    {
      icon: <Music size={30} />,
      title: "Dancing Together",
      text: "Whether it's a slow dance or silly moves, being in your arms feels like home.",
      color: "#ff6348"
    },
    {
      icon: <Sun size={30} />,
      title: "Your Presence",
      text: "You make everything better just by being there. You're my sunshine on cloudy days.",
      color: "#ffa502"
    },
    {
      icon: <Heart size={30} />,
      title: "The Little Things",
      text: "The way you hold my hand, your random hugs, your sweet texts - every little thing you do makes me fall deeper.",
      color: "#ff6b9d"
    },
    {
      icon: <Star size={30} />,
      title: "Your Dreams",
      text: "I love how passionate you are about your dreams. I'm so proud to be by your side as you chase them.",
      color: "#c44569"
    },
    {
      icon: <Heart size={30} />,
      title: "Simply You",
      text: "You are perfect just the way you are. I love every quirk, every habit, everything that makes you YOU.",
      color: "#f97f51"
    }
  ];

  return (
    <div className="love-letters-page">
      <motion.div
        className="letters-header"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="letters-title">Why I Love You</h1>
        <p className="letters-subtitle">
          There are infinite reasons, but here are a few...
        </p>
      </motion.div>

      <div className="love-cards-container">
        {reasons.map((reason, index) => (
          <motion.div
            key={index}
            className="love-card"
            initial={{ opacity: 0, y: 50, rotateY: -90 }}
            whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ 
              delay: index * 0.1,
              duration: 0.6,
              type: "spring"
            }}
            whileHover={{ 
              scale: 1.05,
              y: -10,
              boxShadow: "0 20px 40px rgba(255, 107, 157, 0.3)"
            }}
          >
            <motion.div 
              className="card-icon"
              style={{ backgroundColor: reason.color }}
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.5 }}
            >
              {reason.icon}
            </motion.div>
            
            <h3 className="card-title" style={{ color: reason.color }}>
              {reason.title}
            </h3>
            
            <p className="card-text">{reason.text}</p>

            <motion.div
              className="card-heart-decoration"
              animate={{ 
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.6, 0.3]
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                repeatType: "reverse"
              }}
            >
              ❤️
            </motion.div>
          </motion.div>
        ))}
      </div>

      <motion.div
        className="final-message"
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
      >
        <motion.div
          className="message-heart"
          animate={{ 
            scale: [1, 1.1, 1],
          }}
          transition={{ 
            duration: 1.5,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        >
          💖
        </motion.div>
        <p className="message-text">
          These are just a few of the countless reasons I love you. 
          Every day with you is a gift, and I can't wait to create 
          more beautiful memories together. You mean the world to me.
        </p>
        <p className="message-signature">— Forever Yours</p>
      </motion.div>
    </div>
  );
}

export default LoveLetters;
