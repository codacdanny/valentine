import { motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { Home, Clock, Camera, Heart, Sparkles } from 'lucide-react';

const navItems = [
  { path: '/', page: 'landing', icon: <Home size={20} />, label: 'Home' },
  { path: '/our-story', page: 'story', icon: <Clock size={20} />, label: 'Our Story' },
  { path: '/gallery', page: 'gallery', icon: <Camera size={20} />, label: 'Gallery' },
  { path: '/love-letters', page: 'letters', icon: <Heart size={20} />, label: 'Love Letters' },
  { path: '/proposal', page: 'proposal', icon: <Sparkles size={20} />, label: 'The Question' },
];

function Navigation({ currentPage, onNavClick }) {
  const location = useLocation();
  const isDynamic = typeof onNavClick === 'function';

  if (isDynamic && currentPage === 'celebration') return null;
  if (!isDynamic && location.pathname === '/celebration') return null;

  return (
    <motion.nav
      className="navigation"
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="nav-content">
        {navItems.map((item, index) => {
          const isActive = isDynamic ? currentPage === item.page : location.pathname === item.path;
          const content = (
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
          );

          return isDynamic ? (
            <button
              key={item.page}
              type="button"
              className={`nav-item ${isActive ? 'active' : ''}`}
              onClick={() => onNavClick(item.page)}
            >
              {content}
              {isActive && (
                <motion.div
                  className="nav-indicator"
                  layoutId="nav-indicator"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
            </button>
          ) : (
            <Link
              key={item.path}
              to={item.path}
              className={`nav-item ${isActive ? 'active' : ''}`}
            >
              {content}
              {isActive && (
                <motion.div
                  className="nav-indicator"
                  layoutId="nav-indicator"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
            </Link>
          );
        })}
      </div>
    </motion.nav>
  );
}

export default Navigation;
