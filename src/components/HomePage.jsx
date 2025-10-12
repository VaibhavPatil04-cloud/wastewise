import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { FaCamera, FaPlay, FaBolt, FaGlobeAmericas, FaBullseye, FaCamera as FaCameraAlt, FaRobot, FaRecycle } from 'react-icons/fa';
import CameraCapture from './CameraCapture';
import UpcyclingTips from './UpcyclingTips';
import SearchBar from './SearchBar';
import ClassificationSlider from './ClassificationSlider';
import '../styles/HomePage.css';

const HomePage = () => {
  const [showCamera, setShowCamera] = useState(false);
  const navigate = useNavigate();

  // Function to scroll to How It Works section
  const scrollToHowItWorks = () => {
    const element = document.getElementById('how-it-works');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <>
      {/* Hero Section - Clean Design */}
      <section id="home" className="premium-hero">
        <div className="hero-gradient-overlay" />

        {/* Animated background elements */}
        <div className="floating-particles">
          <div className="particle particle-1" />
          <div className="particle particle-2" />
          <div className="particle particle-3" />
        </div>

        <div className="hero-content-centered">
          <motion.h1 
            className="hero-title"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Know What Goes Where
          </motion.h1>

          <motion.p 
            className="hero-subtitle"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            AI-powered waste classification • Smart recycling guidance • Eco-friendly living
          </motion.p>

          <motion.div 
            className="hero-cta-container"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <button 
              onClick={() => setShowCamera(true)}
              className="cta-primary"
            >
              <FaCamera className="cta-icon" />
              <span>Start Scanning</span>
            </button>

            <button 
              onClick={scrollToHowItWorks}
              className="cta-secondary"
            >
              <FaPlay className="cta-icon-small" />
              <span>Watch How It Works</span>
            </button>
          </motion.div>

          {/* Search Bar Below Buttons */}
          <motion.div 
            className="hero-search-container"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <SearchBar />
          </motion.div>

          {/* Feature highlights */}
          <motion.div 
            className="feature-badges"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <div className="feature-badge">
              <FaBolt className="badge-icon" />
              <span>Instant Recognition</span>
            </div>
            <div className="feature-badge">
              <FaGlobeAmericas className="badge-icon" />
              <span>Global Coverage</span>
            </div>
            <div className="feature-badge">
              <FaBullseye className="badge-icon" />
              <span>99% Accurate</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="how-it-works-section">
        <h2 className="section-title">How It Works</h2>
        <div className="steps-container">
          {[
            {
              icon: <FaCameraAlt />,
              title: 'Capture',
              desc: 'Take a photo of any waste item',
              color: 'from-blue-500 to-cyan-500'
            },
            {
              icon: <FaRobot />,
              title: 'Analyze',
              desc: 'AI identifies and categorizes instantly',
              color: 'from-purple-500 to-pink-500'
            },
            {
              icon: <FaRecycle />,
              title: 'Dispose',
              desc: 'Get exact bin and disposal instructions',
              color: 'from-emerald-500 to-green-500'
            },
          ].map((step, idx) => (
            <motion.div
              key={idx}
              className="step-card"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.2 }}
            >
              <div className={`step-icon bg-gradient-to-br ${step.color}`}>
                {step.icon}
              </div>
              <h3 className="step-title">{step.title}</h3>
              <p className="step-desc">{step.desc}</p>
              <span className="step-number">0{idx + 1}</span>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Upcycling Tips - Replacing Featured Items */}
      <UpcyclingTips />

      {/* Classification Slider */}
      <ClassificationSlider />

      {/* Stats Section */}
      <section className="stats-section">
        <div className="stats-grid">
          {[
            { number: '50K+', label: 'Items Classified' },
            { number: '25+', label: 'Cities Covered' },
            { number: '99%', label: 'Accuracy Rate' },
            { number: '10K+', label: 'Happy Users' },
          ].map((stat, idx) => (
            <motion.div
              key={idx}
              className="stat-card"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
            >
              <div className="stat-number">{stat.number}</div>
              <div className="stat-label">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Camera Modal */}
      {showCamera && <CameraCapture onClose={() => setShowCamera(false)} />}
    </>
  );
};

export default HomePage;