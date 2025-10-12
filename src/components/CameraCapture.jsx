import React, { useRef, useState, useCallback, useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Webcam from 'react-webcam';
import { LocaleContext } from '../context/LocaleContext';
import { classifyWaste } from '../api/wasteClassifier';
import ResultSheet from './ResultSheet';
import '../styles/CameraCapture.css';

const CameraCapture = ({ onClose }) => {
  const webcamRef = useRef(null);
  const [imgSrc, setImgSrc] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const { locale } = useContext(LocaleContext);

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImgSrc(imageSrc);
  }, []);

  const retake = () => {
    setImgSrc(null);
    setResult(null);
  };

  const analyzeImage = async () => {
    setLoading(true);
    try {
      const classification = await classifyWaste(imgSrc, locale);
      setResult(classification);
    } catch (error) {
      console.error('Classification failed:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        className="ultra-camera-modal"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="ultra-camera-container"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          transition={{ type: 'spring', damping: 20 }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close Button */}
          <motion.button
            className="ultra-close-btn"
            onClick={onClose}
            whileHover={{ scale: 1.1, rotate: 90 }}
            whileTap={{ scale: 0.9 }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M18 6L6 18M6 6l12 12" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </motion.button>

          {!imgSrc ? (
            <div className="ultra-webcam-section">
              <Webcam
                ref={webcamRef}
                screenshotFormat="image/jpeg"
                videoConstraints={{ facingMode: { ideal: 'environment' } }}
                className="ultra-webcam"
              />
              
              {/* Premium Scan Frame */}
              <div className="ultra-scan-overlay">
                <div className="ultra-scan-frame">
                  <svg className="ultra-corner ultra-tl" viewBox="0 0 50 50">
                    <path d="M 50 0 L 0 0 L 0 50" stroke="url(#gradient1)" strokeWidth="4" fill="none"/>
                  </svg>
                  <svg className="ultra-corner ultra-tr" viewBox="0 0 50 50">
                    <path d="M 0 0 L 50 0 L 50 50" stroke="url(#gradient1)" strokeWidth="4" fill="none"/>
                  </svg>
                  <svg className="ultra-corner ultra-bl" viewBox="0 0 50 50">
                    <path d="M 0 0 L 0 50 L 50 50" stroke="url(#gradient1)" strokeWidth="4" fill="none"/>
                  </svg>
                  <svg className="ultra-corner ultra-br" viewBox="0 0 50 50">
                    <path d="M 50 0 L 50 50 L 0 50" stroke="url(#gradient1)" strokeWidth="4" fill="none"/>
                  </svg>
                  
                  <svg width="0" height="0">
                    <defs>
                      <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" style={{stopColor: '#10b981', stopOpacity: 1}} />
                        <stop offset="100%" style={{stopColor: '#34d399', stopOpacity: 1}} />
                      </linearGradient>
                    </defs>
                  </svg>
                  
                  <div className="ultra-scan-line"></div>
                </div>
                
                <div className="ultra-instruction-box">
                  <div className="ultra-instruction-icon">◉</div>
                  <p className="ultra-instruction-text">Position waste item in frame</p>
                  <div className="ultra-instruction-hint">Keep item centered and well-lit</div>
                </div>
              </div>

              {/* Capture Button */}
              <motion.button
                className="ultra-capture-btn"
                onClick={capture}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="ultra-capture-outer">
                  <div className="ultra-capture-inner"></div>
                </div>
              </motion.button>
            </div>
          ) : (
            <div className="ultra-preview-section">
              <motion.img 
                src={imgSrc} 
                alt="captured" 
                className="ultra-preview-img"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
              />
              
              <div className="ultra-actions-bar">
                <motion.button
                  className="ultra-action-btn ultra-retake"
                  onClick={retake}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path d="M3 12a9 9 0 019-9 9.75 9.75 0 016.74 2.74L21 8" strokeWidth="2"/>
                    <path d="M21 3v5h-5" strokeWidth="2"/>
                  </svg>
                  <span>Retake</span>
                </motion.button>
                
                <motion.button
                  className="ultra-action-btn ultra-analyze"
                  onClick={analyzeImage}
                  disabled={loading}
                  whileHover={{ scale: loading ? 1 : 1.05 }}
                  whileTap={{ scale: loading ? 1 : 0.95 }}
                >
                  {loading ? (
                    <>
                      <div className="ultra-spinner"></div>
                      <span>Analyzing...</span>
                    </>
                  ) : (
                    <>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path d="M9 12l2 2 4-4" strokeWidth="2" strokeLinecap="round"/>
                        <circle cx="12" cy="12" r="10" strokeWidth="2"/>
                      </svg>
                      <span>Analyze</span>
                    </>
                  )}
                </motion.button>
              </div>
            </div>
          )}

          {result && <ResultSheet result={result} onClose={() => setResult(null)} />}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default CameraCapture;
