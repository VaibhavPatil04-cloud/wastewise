import React, { useRef, useState, useCallback, useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Webcam from 'react-webcam';
import { FaCamera, FaRedo, FaBrain } from 'react-icons/fa';
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
      console.error('Classification error:', error);
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
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close Button - Hidden during preview */}
          {!imgSrc && (
            <button className="ultra-close-btn" onClick={onClose}>
              ✕
            </button>
          )}

          {!imgSrc ? (
            <>
              {/* Instruction Box - ABOVE Camera (Icon and Text inline) */}
              <div className="ultra-instruction-box">
                <div className="ultra-instruction-content">
                  <FaCamera className="ultra-instruction-icon" />
                  <div className="ultra-instruction-text-group">
                    <div className="ultra-instruction-text">Position waste item in frame</div>
                    <div className="ultra-instruction-hint">Keep item centered and well-lit</div>
                  </div>
                </div>
              </div>

              {/* Webcam Section - MIDDLE (Clean Area) */}
              <div className="ultra-webcam-section">
                <Webcam
                  ref={webcamRef}
                  audio={false}
                  screenshotFormat="image/jpeg"
                  className="ultra-webcam"
                  videoConstraints={{
                    facingMode: 'environment',
                    width: 1280,
                    height: 960,
                  }}
                />

                {/* Scan Overlay - Only Frame, No Text/Buttons */}
                <div className="ultra-scan-overlay">
                  <div className="ultra-scan-frame">
                    <div className="ultra-corner ultra-tl" />
                    <div className="ultra-corner ultra-tr" />
                    <div className="ultra-corner ultra-bl" />
                    <div className="ultra-corner ultra-br" />
                    <div className="ultra-scan-line" />
                  </div>
                </div>
              </div>

              {/* Capture Button Container - BELOW Camera */}
              <div className="ultra-capture-container">
                <button className="ultra-capture-btn" onClick={capture}>
                  <div className="ultra-capture-outer">
                    <div className="ultra-capture-inner" />
                  </div>
                </button>
              </div>
            </>
          ) : (
            <div className="ultra-preview-section">
              <img src={imgSrc} alt="Captured" className="ultra-preview-img" />

              <div className="ultra-actions-bar">
                <button 
                  className="ultra-action-btn ultra-retake" 
                  onClick={retake}
                  disabled={loading}
                >
                  <FaRedo />
                  <span>Retake</span>
                </button>

                <button 
                  className="ultra-action-btn ultra-analyze" 
                  onClick={analyzeImage}
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <div className="ultra-spinner" />
                      <span>Analyzing...</span>
                    </>
                  ) : (
                    <>
                      <FaBrain />
                      <span>Analyze</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          )}
        </motion.div>

        {result && (
          <ResultSheet 
            result={result} 
            onClose={() => {
              setResult(null);
              setImgSrc(null);
            }} 
          />
        )}
      </motion.div>
    </AnimatePresence>
  );
};

export default CameraCapture;