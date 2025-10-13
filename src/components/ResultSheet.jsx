import React, { useContext } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaTimes, FaExclamationTriangle, FaWrench, FaCheckCircle, FaRecycle } from 'react-icons/fa';
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
      className="result-sheet"
      initial={{ y: '100%' }}
      animate={{ y: 0 }}
      exit={{ y: '100%' }}
      transition={{ type: 'spring', damping: 25, stiffness: 200 }}
    >
      <div className="result-header">
        <button className="back-btn" onClick={handleBackToHome}>
          <FaArrowLeft /> Back to Home
        </button>
        <button className="close-btn" onClick={onClose}>
          <FaTimes />
        </button>
      </div>

      <div className="result-content">
        <h2 className="item-name">{result.itemName}</h2>
        <div className="confidence-badge">
          <FaCheckCircle className="check-icon" />
          Confidence: {(result.confidence * 100).toFixed(1)}%
        </div>

        <div className="bin-section">
          {binInfo.bins && binInfo.bins.map((bin, idx) => (
            <div key={idx} className="bin-card">
              {bin.icon} {bin.label}
            </div>
          ))}
        </div>

        {binInfo.specialHandling && (
          <div className="warning-box">
            <FaExclamationTriangle className="warning-icon" />
            <div>
              <strong>Special Handling Required</strong>
              <p>This item requires special care. Please follow the preparation steps carefully.</p>
            </div>
          </div>
        )}

        {result.preparationSteps && result.preparationSteps.length > 0 && (
          <div className="result-section">
            <h3><FaWrench className="section-icon" /> Preparation Steps</h3>
            <ol className="preparation-list">
              {result.preparationSteps.map((step, idx) => (
                <li key={idx}>{step}</li>
              ))}
            </ol>
          </div>
        )}

        {result.upcyclingTip && (
          <div className="result-section upcycling-section">
            <h3><FaRecycle className="section-icon" /> Upcycling Idea</h3>
            <p>{result.upcyclingTip}</p>
          </div>
        )}

        <button 
          className="details-btn"
          onClick={() => navigate(`/item/${result.category}`)}
        >
          View Full Details
        </button>
      </div>
    </motion.div>
  );
};

export default ResultSheet;