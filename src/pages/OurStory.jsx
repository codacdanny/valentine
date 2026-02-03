import { motion } from 'framer-motion';
import { Calendar, Heart, Star, Sparkles } from 'lucide-react';
import { useEffect, useState } from 'react';

function OurStory() {
  const [daysTogether, setDaysTogether] = useState(0);

  useEffect(() => {
    // Calculate days together (6 months from today)
    const startDate = new Date('2025-08-01'); // Adjust to your actual start date
    const today = new Date();
    const diffTime = Math.abs(today - startDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    setDaysTogether(diffDays);
  }, []);

  const milestones = [
    {
      icon: <Heart size={30} />,
      title: "The Beginning",
      date: "August 1, 2025",
      description: "The day we made it official. The day my life changed forever.",
      color: "#ff6b9d"
    },
    {
      icon: <Star size={30} />,
      title: "First Month",
      date: "September 2025",
      description: "Every moment with you felt like a dream. Still does.",
      color: "#c44569"
    },
    {
      icon: <Sparkles size={30} />,
      title: "Growing Stronger",
      date: "October - November 2025",
      description: "Learning, laughing, and loving every second together.",
      color: "#f97f51"
    },
    {
      icon: <Calendar size={30} />,
      title: "6 Months Strong",
      date: "February 2026",
      description: "And I fall for you more deeply every single day.",
      color: "#ff4757"
    }
  ];

  return (
    <div className="our-story-page">
      <motion.div
        className="story-header"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="story-title">Our Beautiful Story</h1>
        <motion.div 
          className="days-counter"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.5, type: "spring" }}
        >
          <div className="counter-number">{daysTogether}</div>
          <div className="counter-label">Days of Pure Happiness</div>
        </motion.div>
      </motion.div>

      <div className="timeline-container">
        {milestones.map((milestone, index) => (
          <motion.div
            key={index}
            className="timeline-item"
            initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ delay: index * 0.2, duration: 0.8 }}
          >
            <motion.div 
              className="timeline-icon"
              style={{ backgroundColor: milestone.color }}
              whileHover={{ scale: 1.2, rotate: 360 }}
              transition={{ duration: 0.5 }}
            >
              {milestone.icon}
            </motion.div>
            
            <div className="timeline-content">
              <motion.h3 
                className="timeline-title"
                whileHover={{ scale: 1.05, color: milestone.color }}
              >
                {milestone.title}
              </motion.h3>
              <p className="timeline-date">{milestone.date}</p>
              <p className="timeline-description">{milestone.description}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div
        className="story-quote"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.5 }}
      >
        <p className="quote-text">
          "In all the world, there is no heart for me like yours. 
          In all the world, there is no love for you like mine."
        </p>
        <p className="quote-author">— Maya Angelou</p>
      </motion.div>
    </div>
  );
}

export default OurStory;
