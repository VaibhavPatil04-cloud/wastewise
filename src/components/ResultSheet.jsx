import React, { useContext } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  FaTimes, 
  FaRecycle
} from 'react-icons/fa';
import { LocaleContext } from '../context/LocaleContext';
import '../styles/ResultSheet.css';

const ResultSheet = ({ result, onClose }) => {
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
          {/* Item Name */}
          <div className="result-title-container">
            <h2 className="result-title">{result.itemName || result.name}</h2>
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
            This item should be disposed of in the <strong style={{ color: binInfo.color }}>{binInfo.name}</strong>. 
            Click below to see detailed preparation steps and upcycling ideas.
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