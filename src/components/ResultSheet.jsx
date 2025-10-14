import React, { useContext } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  FaTimes, 
  FaRecycle,
  FaRobot,
  FaCheckCircle
} from 'react-icons/fa';
import { LocaleContext } from '../context/LocaleContext';
import '../styles/ResultSheet.css';

const ResultSheet = ({ result, onClose }) => {
  
  // Add these CSS styles inline if not already in ResultSheet.css
  const additionalStyles = `
    .recognition-success-badge {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.75rem 1.5rem;
      background: linear-gradient(135deg, rgba(16, 185, 129, 0.2), rgba(5, 150, 105, 0.1));
      border: 2px solid rgba(16, 185, 129, 0.4);
      border-radius: 50px;
      margin-bottom: 1.5rem;
      color: #10b981;
      font-weight: 600;
      font-size: 0.95rem;
      animation: pulse-success 2s ease-in-out infinite;
    }
    
    @keyframes pulse-success {
      0%, 100% {
        box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.4);
      }
      50% {
        box-shadow: 0 0 0 10px rgba(16, 185, 129, 0);
      }
    }
    
    .success-icon {
      font-size: 1.25rem;
    }
    
    .confidence-score {
      display: flex;
      align-items: center;
      gap: 1rem;
      margin-bottom: 1.5rem;
      padding: 1rem;
      background: linear-gradient(145deg, rgba(31, 41, 55, 0.5), rgba(17, 24, 39, 0.7));
      border-radius: 1rem;
      border: 1px solid rgba(75, 85, 99, 0.2);
    }
    
    .confidence-label {
      font-weight: 600;
      color: rgba(255, 255, 255, 0.8);
      font-size: 0.95rem;
      white-space: nowrap;
    }
    
    .confidence-bar-container {
      flex: 1;
      height: 10px;
      background: rgba(75, 85, 99, 0.3);
      border-radius: 10px;
      overflow: hidden;
      position: relative;
    }
    
    .confidence-bar-fill {
      height: 100%;
      border-radius: 10px;
      transition: width 0.6s ease-out;
      box-shadow: 0 0 10px currentColor;
      animation: fill-bar 0.6s ease-out;
    }
    
    @keyframes fill-bar {
      from {
        width: 0;
      }
    }
    
    .confidence-percentage {
      font-weight: 700;
      color: white;
      font-size: 1rem;
      min-width: 50px;
      text-align: right;
    }
  `;
  
  const { getBinInfo } = useContext(LocaleContext);
  const navigate = useNavigate();
  const binInfo = getBinInfo(result.category);

  const handleViewDetails = () => {
    onClose();
    navigate(`/item/${result.category}`);
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  // Get the item name to display
  const displayName = result.itemName || result.name || 'Unknown Item';
  
  // Calculate confidence percentage
  const confidencePercent = Math.round((result.confidence || 0.85) * 100);

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
          {/* Recognition Success Badge */}
          <div className="recognition-success-badge">
            <FaCheckCircle className="success-icon" />
            <span>Item Recognized Successfully!</span>
          </div>

          {/* Item Name with AI Badge */}
          <div className="result-title-container">
            <h2 className="result-title">{displayName}</h2>
            {result.aiGenerated && (
              <span className="ai-badge">
                <FaRobot /> AI Generated
              </span>
            )}
          </div>

          {/* Confidence Score */}
          <div className="confidence-score">
            <span className="confidence-label">Confidence:</span>
            <div className="confidence-bar-container">
              <div 
                className="confidence-bar-fill" 
                style={{ 
                  width: `${confidencePercent}%`,
                  backgroundColor: confidencePercent > 80 ? '#10b981' : 
                                 confidencePercent > 60 ? '#fbbf24' : '#ef4444'
                }}
              />
            </div>
            <span className="confidence-percentage">{confidencePercent}%</span>
          </div>

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

          {/* Simple message */}
          <p className="result-message">
            The <strong style={{ color: binInfo.color }}>{displayName}</strong> has been identified and should be disposed of in the{' '}
            <strong style={{ color: binInfo.color }}>{binInfo.name}</strong>.
            <br /><br />
            Click below to see detailed preparation steps, upcycling ideas, and environmental impact information.
          </p>

          <button 
            className="view-details-btn"
            onClick={handleViewDetails}
          >
            <FaRecycle />
            View Full Details
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ResultSheet;