import React, { useContext } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  FaArrowLeft, 
  FaTimes, 
  FaExclamationTriangle, 
  FaWrench, 
  FaCheckCircle, 
  FaRecycle,
  FaRobot,
  FaLeaf
} from 'react-icons/fa';
import { LocaleContext } from '../context/LocaleContext';
import '../styles/ResultSheet.css';

const ResultSheet = ({ result, onClose }) => {
  const { getBinInfo } = useContext(LocaleContext);
  const navigate = useNavigate();
  const binInfo = getBinInfo(result.category);

  const handleBackToHome = () => {
    onClose();
    navigate('/');
  };

  const handleOverlayClick = (e) => {
    // Close if clicking the overlay background
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <motion.div
      className="result-sheet-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={handleOverlayClick}
    >
      <motion.div
        className="result-sheet"
        initial={{ y: '100%' }}
        animate={{ y: 0 }}
        exit={{ y: '100%' }}
        transition={{ type: 'spring', damping: 30, stiffness: 300 }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="result-sheet-handle"></div>
        
        <button className="close-result-btn" onClick={onClose}>
          <FaTimes />
        </button>

        <div className="result-content">
          {/* Item Name with AI Badge */}
          <div className="result-title-container">
            <h2 className="result-title">{result.itemName || result.name}</h2>
            {result.aiGenerated && (
              <span className="ai-badge">
                <FaRobot /> AI Generated
              </span>
            )}
          </div>
          
          <p className="confidence-score">
            Confidence: {(result.confidence * 100).toFixed(1)}%
          </p>

          {/* Bin Information */}
          <div className="bin-badges-container">
            <span 
              className="bin-badge"
              style={{
                background: `${binInfo.color}15`,
                borderColor: `${binInfo.color}40`,
                color: binInfo.color
              }}
            >
              <FaRecycle /> {binInfo.name}
            </span>
          </div>

          {/* Environmental Impact */}
          {result.environmentalImpact && (
            <div className="environmental-impact">
              <h3><FaLeaf /> Environmental Impact</h3>
              <p>{result.environmentalImpact}</p>
            </div>
          )}

          {/* Special Handling */}
          {binInfo.specialHandling && (
            <div className="contamination-alert">
              <FaExclamationTriangle className="alert-icon" />
              <div className="alert-content">
                <h3 className="alert-title">Special Handling Required</h3>
                <p className="alert-description">
                  This item requires special care. Please follow the preparation steps carefully.
                </p>
              </div>
            </div>
          )}

          {/* Preparation Steps */}
          {result.preparationSteps && result.preparationSteps.length > 0 && (
            <div className="preparation-section">
              <h3 className="section-title">
                <FaWrench className="section-icon" />
                Preparation Steps
              </h3>
              <div className="preparation-list">
                {result.preparationSteps.map((step, idx) => (
                  <div key={idx} className="preparation-item">
                    <FaCheckCircle className="check-icon" />
                    <p className="preparation-text">{step}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Disposal Instructions */}
          {result.disposalInstructions && (
            <div className="disposal-instructions">
              <h3><FaRecycle /> Disposal Instructions</h3>
              <p>{result.disposalInstructions}</p>
            </div>
          )}

          {/* Upcycling Tip */}
          {result.upcyclingTip && (
            <div className="upcycling-section">
              <h3 className="upcycling-title">
                <FaRecycle className="section-icon" />
                Upcycling Idea
              </h3>
              <p className="upcycling-text">{result.upcyclingTip}</p>
            </div>
          )}

          <button 
            className="view-details-btn"
            onClick={() => navigate(`/item/${result.category}`)}
          >
            <FaRecycle />
            View Full Details
          </button>

          <button 
            className="back-to-home-btn"
            onClick={handleBackToHome}
          >
            <FaArrowLeft className="back-icon" />
            <span>Back to Home</span>
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ResultSheet;