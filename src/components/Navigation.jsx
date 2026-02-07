import { motion } from 'framer-motion';
import { Home, Clock, Camera, Heart, Sparkles } from 'lucide-react';

const navItems = [
  { page: 'landing', icon: <Home size={20} />, label: 'Home' },
  { page: 'story', icon: <Clock size={20} />, label: 'Our Story' },
  { page: 'gallery', icon: <Camera size={20} />, label: 'Gallery' },
  { page: 'letters', icon: <Heart size={20} />, label: 'Love Letters' },
  { page: 'proposal', icon: <Sparkles size={20} />, label: 'The Question' },
];

function Navigation({ currentPage, onNavClick }) {
  if (currentPage === 'celebration') return null;

  return (
    <motion.nav
      className="navigation"
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="nav-content">
        {navItems.map((item, index) => {
          const isActive = currentPage === item.page;
          return (
            <button
              key={item.page}
              type="button"
              className={`nav-item ${isActive ? 'active' : ''}`}
              onClick={() => onNavClick(item.page)}
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
              {isActive && (
                <motion.div
                  className="nav-indicator"
                  layoutId="nav-indicator"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
            </button>
          );
        })}
      </div>
    </motion.nav>
  );
}

export default Navigation;
