import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import { FaCamera, FaPlay, FaBolt, FaGlobeAmericas, FaBullseye, FaCamera as FaCameraAlt, FaRobot, FaRecycle } from 'react-icons/fa';
import CameraCapture from './CameraCapture';
import UpcyclingTips from './UpcyclingTips';
import SearchBar from './SearchBar';
import ClassificationSlider from './ClassificationSlider';
import demoVideo from '../assets/Dark_Theme_Bin_Color_Fix.mp4';
import '../styles/HomePage.css';

const HomePage = () => {
  const [showCamera, setShowCamera] = useState(false);
  const [showVideo, setShowVideo] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const videoRef = useRef(null);
  const timerRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  // Initial delay before showing video for the first time
  useEffect(() => {
    if (!isPaused) {
      timerRef.current = setTimeout(() => {
        setShowVideo(true);
      }, 3000);
    }

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [isPaused]);

  // Handle video end event - switch back to steps
  useEffect(() => {
    const videoElement = videoRef.current;
    
    if (videoElement && !isPaused) {
      const handleVideoEnd = () => {
        setShowVideo(false);
        
        // After 3 seconds of showing steps, play video again
        if (!isPaused) {
          timerRef.current = setTimeout(() => {
            setShowVideo(true);
          }, 3000);
        }
      };

      videoElement.addEventListener('ended', handleVideoEnd);

      return () => {
        videoElement.removeEventListener('ended', handleVideoEnd);
      };
    }
  }, [showVideo, isPaused]);

  // Pause video when isPaused becomes true
  useEffect(() => {
    const videoElement = videoRef.current;
    
    if (videoElement) {
      if (isPaused) {
        videoElement.pause();
      } else {
        videoElement.play();
      }
    }
  }, [isPaused]);

  // Handle mouse enter on How It Works section
  const handleMouseEnter = () => {
    setIsPaused(true);
    // Clear any pending timers
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
  };

  // Handle mouse leave from How It Works section
  const handleMouseLeave = () => {
    setIsPaused(false);
    
    // Resume the cycle based on current state
    if (showVideo) {
      // If video is showing, play it
      if (videoRef.current) {
        videoRef.current.play();
      }
    } else {
      // If steps are showing, start timer to show video
      timerRef.current = setTimeout(() => {
        setShowVideo(true);
      }, 3000);
    }
  };

  // Function to scroll to How It Works section
  const scrollToHowItWorks = () => {
    const element = document.getElementById('how-it-works');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Scroll handling when navigating from other pages
  useEffect(() => {
    if (location.state && location.state.scrollTo) {
      const element = document.getElementById(location.state.scrollTo);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
      }
      // Clear the state after scrolling
      window.history.replaceState({}, document.title);
    }
  }, [location]);

  return (
    <>
      {/* Hero Section - Clean Design */}
      <section className="premium-hero">
        <div className="hero-gradient-overlay"></div>
        
        {/* Animated background elements */}
        <div className="floating-particles">
          <div className="particle particle-1"></div>
          <div className="particle particle-2"></div>
          <div className="particle particle-3"></div>
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
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            AI-powered waste classification • Smart recycling guidance • Eco-friendly living
          </motion.p>

          <motion.div 
            className="hero-cta-container"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
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
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.8 }}
          >
            <SearchBar />
          </motion.div>

          {/* Feature highlights */}
          <motion.div 
            className="feature-badges"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9, duration: 0.8 }}
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
      <section 
        id="how-it-works" 
        className="how-it-works-section"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <h2 className="section-title">How It Works</h2>
        
        {/* Video Container */}
        <div className="video-container">
          {!showVideo && (
            <motion.div 
              className="steps-container"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
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
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.2, duration: 0.6 }}
                >
                  <div className={`step-icon bg-gradient-to-br ${step.color}`}>
                    {step.icon}
                  </div>
                  <h3 className="step-title">{step.title}</h3>
                  <p className="step-desc">{step.desc}</p>
                  <span className="step-number">0{idx + 1}</span>
                </motion.div>
              ))}
            </motion.div>
          )}

          {showVideo && (
            <motion.div 
              className="video-wrapper"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <video 
                ref={videoRef}
                className="demo-video" 
                autoPlay 
                muted
                playsInline
                controls={false}
                style={{ pointerEvents: 'none' }}
              >
                <source src={demoVideo} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </motion.div>
          )}
        </div>
      </section>

      {/* Upcycling Tips - Replacing Featured Items */}
      <UpcyclingTips />

      {/* Classification Slider */}
      <ClassificationSlider />

      {/* Stats Section */}
      <section className="stats-section">
        <h2 className="section-title">Our Impact</h2>
        
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
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1, duration: 0.6 }}
              viewport={{ once: true }}
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
