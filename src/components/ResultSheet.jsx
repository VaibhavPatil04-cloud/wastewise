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
    navigate('/');
  };

  return (
    <motion.div
      className="result-sheet-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="result-sheet"
        initial={{ y: '100%' }}
        animate={{ y: 0 }}
        exit={{ y: '100%' }}
        transition={{ type: 'spring', damping: 30, stiffness: 300 }}
      >
        <div className="result-header">
          <button className="back-button" onClick={handleBackToHome}>
            <FaArrowLeft /> Back to Home
          </button>
          <button className="close-button" onClick={onClose}>
            <FaTimes />
          </button>
        </div>

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
          <div className="bin-category">
            {binInfo.bins && binInfo.bins.map((bin, idx) => (
              <div key={idx} className="bin-badge">
                {bin.icon} {bin.label}
              </div>
            ))}
          </div>

          {/* Environmental Impact (New) */}
          {result.environmentalImpact && (
            <div className="environmental-impact">
              <h3><FaLeaf /> Environmental Impact</h3>
              <p>{result.environmentalImpact}</p>
            </div>
          )}

          {/* Special Handling */}
          {binInfo.specialHandling && (
            <div className="special-handling">
              <FaExclamationTriangle />
              <div>
                <h3>Special Handling Required</h3>
                <p>This item requires special care. Please follow the preparation steps carefully.</p>
              </div>
            </div>
          )}

          {/* Preparation Steps */}
          {result.preparationSteps && result.preparationSteps.length > 0 && (
            <div className="preparation-steps">
              <h3><FaWrench /> Preparation Steps</h3>
              <ol>
                {result.preparationSteps.map((step, idx) => (
                  <li key={idx}>{step}</li>
                ))}
              </ol>
            </div>
          )}

          {/* Disposal Instructions (New) */}
          {result.disposalInstructions && (
            <div className="disposal-instructions">
              <h3><FaRecycle /> Disposal Instructions</h3>
              <p>{result.disposalInstructions}</p>
            </div>
          )}

          {/* Upcycling Tip */}
          {result.upcyclingTip && (
            <div className="upcycling-tip">
              <h3><FaCheckCircle /> Upcycling Idea</h3>
              <p>{result.upcyclingTip}</p>
            </div>
          )}

          <button 
            className="view-details-button"
            onClick={() => navigate(`/item/${result.category}`)}
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
