import { motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { Home, Clock, Camera, Heart, Sparkles } from 'lucide-react';

function Navigation() {
  const location = useLocation();

  const navItems = [
    { path: '/', icon: <Home size={20} />, label: 'Home' },
    { path: '/our-story', icon: <Clock size={20} />, label: 'Our Story' },
    { path: '/gallery', icon: <Camera size={20} />, label: 'Gallery' },
    { path: '/love-letters', icon: <Heart size={20} />, label: 'Love Letters' },
    { path: '/proposal', icon: <Sparkles size={20} />, label: 'The Question' },
  ];

  // Don't show nav on celebration page
  if (location.pathname === '/celebration') return null;

  return (
    <motion.nav
      className="navigation"
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="nav-content">
        {navItems.map((item, index) => (
          <Link
            key={item.path}
            to={item.path}
            className={`nav-item ${location.pathname === item.path ? 'active' : ''}`}
          >
            <motion.div
              className="nav-item-content"
              whileHover={{ scale: 1.1, y: -5 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="nav-icon">{item.icon}</div>
              <span className="nav-label">{item.label}</span>
            </motion.div>
            
            {location.pathname === item.path && (
              <motion.div
                className="nav-indicator"
                layoutId="nav-indicator"
                transition={{ type: "spring", stiffness: 380, damping: 30 }}
              />
            )}
          </Link>
        ))}
      </div>
    </motion.nav>
  );
}

export default Navigation;
