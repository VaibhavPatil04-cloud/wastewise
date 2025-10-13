import React, { useContext, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  FaArrowLeft,
  FaExclamationTriangle,
  FaCheckCircle,
  FaRecycle,
  FaRobot,
  FaLeaf,
  FaTrash
} from 'react-icons/fa';
import { LocaleContext } from '../context/LocaleContext';
import '../styles/ResultPage.css';

const ResultPage = () => {
  const { getBinInfo } = useContext(LocaleContext);
  const navigate = useNavigate();
  const location = useLocation();
  const result = location.state?.result;

  useEffect(() => {
    if (!result) {
      navigate('/');
    }
  }, [result, navigate]);

  if (!result) {
    return null;
  }

  const binInfo = getBinInfo(result.category);

  return (
    <div className="result-page">
      <div className="result-page-container">
        {/* Back Button */}
        <button className="back-to-home-btn" onClick={() => navigate('/')}>
          <FaArrowLeft className="back-icon" />
          <span>Back to Home</span>
        </button>

        {/* Result Content */}
        <div className="result-page-content">
          {/* Item Name with AI Badge */}
          <div className="result-title-container">
            <h1 className="result-title">{result.itemName || result.name}</h1>
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
            {binInfo.bins && binInfo.bins.map((bin, idx) => (
              <div key={idx} className="bin-badge" style={{ borderColor: bin.color }}>
                {bin.icon} {bin.label}
              </div>
            ))}
          </div>

          {/* Environmental Impact */}
          {result.environmentalImpact && (
            <div className="environmental-impact">
              <h3><FaLeaf className="section-icon" /> Environmental Impact</h3>
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

          {/* Disposal Instructions */}
          {result.disposalInstructions && (
            <div className="preparation-section">
              <h3 className="section-title">
                <FaTrash className="section-icon" /> Disposal Instructions
              </h3>
              <div className="disposal-instructions-content">
                <p>{result.disposalInstructions}</p>
              </div>
            </div>
          )}

          {/* Preparation Steps */}
          {result.preparationSteps && result.preparationSteps.length > 0 && (
            <div className="preparation-section">
              <h3 className="section-title">
                <FaRecycle className="section-icon" /> Preparation Steps
              </h3>
              <div className="preparation-list">
                {result.preparationSteps.map((step, idx) => (
                  <div key={idx} className="preparation-item">
                    <FaCheckCircle className="check-icon" />
                    <span className="preparation-text">{step}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Upcycling Tip */}
          {result.upcyclingTip && (
            <div className="upcycling-section">
              <h3 className="upcycling-title">
                <FaCheckCircle className="section-icon" /> Upcycling Idea
              </h3>
              <p className="upcycling-text">{result.upcyclingTip}</p>
            </div>
          )}

          {/* View Category Details Button */}
          <button
            className="view-details-btn"
            onClick={() => navigate(`/item/${result.category}`)}
          >
            <FaRecycle />
            View Full Category Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResultPage;
