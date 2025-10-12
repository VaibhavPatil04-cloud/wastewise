import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FaRecycle } from 'react-icons/fa';
import LocaleSelector from './LocaleSelector';
import '../styles/Header.css';

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Smooth scroll to section on home page
  const scrollToSection = (sectionId) => {
    if (location.pathname !== '/') {
      // Navigate to home first, then scroll
      navigate('/');
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    } else {
      // Already on home page, just scroll
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  const navItems = [
    { id: 'home', label: 'Home', type: 'scroll' },
    { id: 'how-it-works', label: 'How It Works', type: 'scroll' },
    { id: 'upcycling-tips', label: 'Upcycling Tips', type: 'scroll' },
    { id: 'footer', label: 'About', type: 'scroll' }, // Changed to scroll to footer
  ];

  return (
    <motion.header 
      className={`main-header ${scrolled ? 'scrolled' : ''}`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="header-container">
        <Link to="/" className="logo-container">
          <FaRecycle className="logo-icon" />
          <span className="logo-text">WasteWise</span>
        </Link>

        <nav className="nav-menu">
          {navItems.map((item, idx) => (
            <motion.button
              key={idx}
              onClick={() => scrollToSection(item.id)}
              className={`nav-link ${location.pathname === '/' && location.hash === `#${item.id}` ? 'active' : ''}`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="nav-label">{item.label}</span>
            </motion.button>
          ))}
        </nav>

        <div className="header-actions">
          <LocaleSelector />
        </div>
      </div>
    </motion.header>
  );
};

export default Header;
