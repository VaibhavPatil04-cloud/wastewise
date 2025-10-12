import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import CameraCapture from './CameraCapture';
import FeaturedCards from './FeaturedCards';
import SearchBar from './SearchBar';
import TestimonialsSlider from './TestimonialsSlider';
import '../styles/HomePage.css';

const HomePage = () => {
  const [showCamera, setShowCamera] = useState(false);
  const navigate = useNavigate();

  return (
    <>
      {/* Hero Section */}
      <section className="premium-hero">
        <div className="hero-gradient-overlay" />

        {/* Animated background elements */}
        <div className="floating-particles">
          <div className="particle particle-1" />
          <div className="particle particle-2" />
          <div className="particle particle-3" />
        </div>

        <div className="hero-content">
          <div className="hero-text">
            {/* Search Bar at Top */}
            <div className="hero-search-container">
              <SearchBar />
            </div>

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
                <span className="cta-icon">📸</span>
                <span>Start Scanning</span>
              </button>

              <button 
                onClick={() => navigate('/how-it-works')}
                className="cta-secondary"
              >
                <span>Watch How It Works</span>
                <span className="cta-arrow">→</span>
              </button>
            </motion.div>

            {/* Feature highlights */}
            <motion.div 
              className="feature-badges"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <div className="feature-badge">
                <span className="badge-icon">⚡</span>
                <span>Instant Recognition</span>
              </div>
              <div className="feature-badge">
                <span className="badge-icon">🌍</span>
                <span>Global Coverage</span>
              </div>
              <div className="feature-badge">
                <span className="badge-icon">🎯</span>
                <span>99% Accurate</span>
              </div>
            </motion.div>
          </div>

          {/* Classification Tips Section - Replaces Hero Image */}
          <motion.div 
            className="classification-tips-container"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <h3 className="tips-title">Quick Classification Guide</h3>
            <div className="tips-grid">
              <div className="tip-card wet-waste">
                <div className="tip-icon">🥬</div>
                <h4 className="tip-category">Wet Waste</h4>
                <p className="tip-description">Food scraps, vegetable peels, fruit waste, tea bags</p>
                <div className="tip-bin">Green Bin 🟢</div>
              </div>

              <div className="tip-card dry-waste">
                <div className="tip-icon">📄</div>
                <h4 className="tip-category">Dry Waste</h4>
                <p className="tip-description">Paper, cardboard, plastic bottles, metal cans</p>
                <div className="tip-bin">Blue Bin 🔵</div>
              </div>

              <div className="tip-card hazardous-waste">
                <div className="tip-icon">🔋</div>
                <h4 className="tip-category">Hazardous Waste</h4>
                <p className="tip-description">Batteries, electronics, paints, chemicals</p>
                <div className="tip-bin">Red Bin 🔴</div>
              </div>

              <div className="tip-card recyclable-waste">
                <div className="tip-icon">♻️</div>
                <h4 className="tip-category">Recyclable</h4>
                <p className="tip-description">Glass bottles, aluminum, clean paper, plastics</p>
                <div className="tip-bin">Yellow Bin 🟡</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="how-it-works-section">
        <h2 className="section-title">How It Works</h2>
        <div className="steps-container">
          {[
            {
              icon: '📸',
              title: 'Capture',
              desc: 'Take a photo of any waste item',
              color: 'from-blue-500 to-cyan-500'
            },
            {
              icon: '🤖',
              title: 'Analyze',
              desc: 'AI identifies and categorizes instantly',
              color: 'from-purple-500 to-pink-500'
            },
            {
              icon: '♻️',
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

      {/* Featured Items */}
      <FeaturedCards />

      {/* Testimonials */}
      <TestimonialsSlider />

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