import React, { useContext } from 'react';
import { motion } from 'framer-motion';
import { LocaleContext } from '../context/LocaleContext';
import '../styles/ResultSheet.css';

const ResultSheet = ({ result, onClose }) => {
  const { getBinInfo } = useContext(LocaleContext);
  const binInfo = getBinInfo(result.category);

  return (
  <div className="result-sheet">
    <div className="result-sheet-handle" />
    <button className="close-result-btn" onClick={onClose}>✕</button>

    <h3 className="result-title">{result.name}</h3>
    {result.confidence && (
      <p className="confidence-score">
        Confidence: {(result.confidence * 100).toFixed(1)}%
      </p>
    )}

    <div className="bin-badges-container">
      <span className="bin-badge" style={{ backgroundColor: binInfo.color }}>
        {binInfo.name}
      </span>
    </div>

    {result.contaminated && (
      <div className="contamination-alert">
        <div className="flex items-start gap-2">
          <span className="alert-icon">⚠️</span>
          <div className="alert-content">
            <p className="alert-title">Special Handling Required</p>
            <p className="alert-description">
              This item requires special care. Please follow the preparation steps carefully.
            </p>
          </div>
        </div>
      </div>
    )}

    <div className="preparation-section">
      <h4 className="section-title">
        <span>📋</span>
        Preparation Steps
      </h4>
      <div className="preparation-list">
        {result.preparation.map((step, idx) => (
          <div key={idx} className="preparation-item">
            <span className="check-icon">✓</span>
            <span className="preparation-text">{step}</span>
          </div>
        ))}
      </div>
    </div>

    {result.upcyclingTip && (
      <div className="upcycling-section">
        <h4 className="upcycling-title">
          <span>💡</span>
          Upcycling Idea
        </h4>
        <p className="upcycling-text">{result.upcyclingTip}</p>
      </div>
    )}

    <button className="view-details-btn">
      View Full Details →
    </button>
  </div>
);
};

export default ResultSheet;
