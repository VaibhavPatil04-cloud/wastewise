import React, { useRef, useState, useCallback, useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Webcam from 'react-webcam';
import { FaCamera, FaRedo, FaBrain, FaUpload, FaImage } from 'react-icons/fa';
import { LocaleContext } from '../context/LocaleContext';
import { classifyWaste } from '../api/wasteClassifier';
import '../styles/CameraCapture.css';

const CameraCapture = ({ onClose }) => {
  const webcamRef = useRef(null);
  const fileInputRef = useRef(null);
  const [imgSrc, setImgSrc] = useState(null);
  const [loading, setLoading] = useState(false);
  const { locale } = useContext(LocaleContext);
  const navigate = useNavigate();

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImgSrc(imageSrc);
  }, []);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImgSrc(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  const retake = () => {
    setImgSrc(null);
  };

  const analyzeImage = async () => {
    setLoading(true);
    try {
      const classification = await classifyWaste(imgSrc, locale);
      
      // Navigate to ItemDetail page with the category
      navigate(`/item/${classification.category}`);
      
      // Close the camera capture modal
      if (onClose) {
        onClose();
      }
    } catch (error) {
      console.error('Classification error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
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
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button - Hidden during preview */}
        {!imgSrc && (
          <button className="ultra-close-btn" onClick={onClose}>
            ×
          </button>
        )}

        {!imgSrc ? (
          <>
            {/* Instruction Box - ABOVE Camera (Icon and Text inline) */}
            <div className="ultra-instruction-box">
              <div className="ultra-instruction-content">
                <FaCamera className="ultra-instruction-icon" />
                <div className="ultra-instruction-text-group">
                  <p className="ultra-instruction-text">Position waste item in frame</p>
                  <p className="ultra-instruction-hint">Keep item centered and well-lit</p>
                </div>
              </div>
            </div>

            {/* Webcam Section - MIDDLE (Clean Area) */}
            <div className="ultra-webcam-section">
              <Webcam
                ref={webcamRef}
                screenshotFormat="image/jpeg"
                className="ultra-webcam"
                videoConstraints={{
                  facingMode: 'environment'
                }}
              />
              
              {/* Scan Overlay - Only Frame, No Text/Buttons */}
              <div className="ultra-scan-overlay">
                <div className="ultra-scan-frame">
                  <div className="ultra-corner ultra-tl"></div>
                  <div className="ultra-corner ultra-tr"></div>
                  <div className="ultra-corner ultra-bl"></div>
                  <div className="ultra-corner ultra-br"></div>
                  <div className="ultra-scan-line"></div>
                </div>
              </div>
            </div>

            {/* Capture Button Container - BELOW Camera */}
            <div className="ultra-capture-container">
              <button className="ultra-capture-btn" onClick={capture}>
                <div className="ultra-capture-outer">
                  <div className="ultra-capture-inner"></div>
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
            <div className="ultra-actions-bar">
              <button className="ultra-action-btn ultra-retake" onClick={retake}>
                <FaRedo /> Retake
              </button>
              {loading ? (
                <button className="ultra-action-btn ultra-analyze" disabled>
                  <div className="ultra-spinner"></div>
                  Analyzing...
                </button>
              ) : (
                <button className="ultra-action-btn ultra-analyze" onClick={analyzeImage}>
                  <FaBrain /> Analyze
                </button>
              )}
            </div>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
};

export default CameraCapture;
