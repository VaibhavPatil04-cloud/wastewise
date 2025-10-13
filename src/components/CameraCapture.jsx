// src/components/CameraCapture.jsx
import React, { useRef, useState, useCallback, useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Webcam from 'react-webcam';
import { FaCamera, FaRedo, FaBrain, FaImage } from 'react-icons/fa';
import { LocaleContext } from '../context/LocaleContext';
import { classifyWaste } from '../api/wasteClassifier';
import '../styles/CameraCapture.css';

const CameraCapture = ({ onClose }) => {
  const webcamRef = useRef(null);
  const fileInputRef = useRef(null);
  const [imgSrc, setImgSrc] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { locale } = useContext(LocaleContext);
  const navigate = useNavigate();

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImgSrc(imageSrc);
    setError(null);
  }, []);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        setError('Please select a valid image file');
        return;
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setError('Image size should be less than 5MB');
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setImgSrc(reader.result);
        setError(null);
      };
      reader.onerror = () => {
        setError('Failed to read image file');
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  const retake = () => {
    setImgSrc(null);
    setError(null);
  };

  const analyzeImage = async () => {
    if (!imgSrc) {
      setError('No image to analyze');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Call classification API
      const classification = await classifyWaste(imgSrc, locale);
      
      console.log('Classification result:', classification);

      // Store result in sessionStorage for ItemDetail page to access
      sessionStorage.setItem('lastClassification', JSON.stringify({
        ...classification,
        timestamp: new Date().toISOString(),
        imageData: imgSrc
      }));

      // Close camera modal
      if (onClose) {
        onClose();
      }

      // Navigate to item detail page with category
      navigate(`/item/${classification.category}`, {
        state: { classification }
      });

    } catch (error) {
      console.error('Classification error:', error);
      setError('Failed to analyze image. Please try again.');
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
          {/* Close Button */}
          {!imgSrc && (
            <button className="ultra-close-btn" onClick={onClose}>
              ✕
            </button>
          )}

          {!imgSrc ? (
            <>
              {/* Instruction Box */}
              <div className="ultra-instruction-box">
                <div className="ultra-instruction-content">
                  <FaCamera className="ultra-instruction-icon" />
                  <div className="ultra-instruction-text-group">
                    <div className="ultra-instruction-text">Position waste item in frame</div>
                    <div className="ultra-instruction-hint">Keep item centered and well-lit</div>
                  </div>
                </div>
              </div>

              {/* Webcam Section */}
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
                  onUserMediaError={(err) => {
                    console.error('Camera error:', err);
                    setError('Camera access denied. Please allow camera permissions.');
                  }}
                />

                {/* Scan Overlay */}
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

              {/* Error Message */}
              {error && (
                <div className="ultra-error-message">
                  <span>⚠️</span>
                  <span>{error}</span>
                </div>
              )}

              {/* Capture Button Container */}
              <div className="ultra-capture-container">
                <button className="ultra-capture-btn" onClick={capture}>
                  <div className="ultra-capture-outer">
                    <div className="ultra-capture-inner" />
                  </div>
                </button>

                {/* Upload Button */}
                <button className="ultra-upload-btn" onClick={triggerFileInput}>
                  <FaImage className="upload-icon" />
                  <span>Upload Image</span>
                </button>

                {/* Hidden File Input */}
                <input
                  type="file"
                  ref={fileInputRef}
                  accept="image/*"
                  onChange={handleFileUpload}
                  style={{ display: 'none' }}
                />
              </div>
            </>
          ) : (
            <div className="ultra-preview-section">
              <img src={imgSrc} alt="Captured" className="ultra-preview-img" />

              {/* Error Message in Preview */}
              {error && (
                <div className="ultra-error-message">
                  <span>⚠️</span>
                  <span>{error}</span>
                </div>
              )}

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
      </motion.div>
    </AnimatePresence>
  );
};

export default CameraCapture;