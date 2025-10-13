import React, { useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaArrowLeft, FaRecycle, FaWrench, FaCheckCircle, FaExclamationTriangle, FaTrash } from 'react-icons/fa';
import { LocaleContext } from '../context/LocaleContext';
import '../styles/ItemDetails.css';

const ItemDetails = () => {
  const { category } = useParams();
  const navigate = useNavigate();
  const { getBinInfo, getPickupDay } = useContext(LocaleContext);
  
  const binInfo = getBinInfo(category);

  // Mock data - replace with actual data from your context or API
  const itemData = {
    'plastics': {
      name: 'Plastic Bottle',
      preparationSteps: [
        'Remove cap and labels',
        'Rinse thoroughly with water',
        'Crush to save space',
        'Place in designated bin'
      ],
      upcyclingTip: 'Transform into a vertical garden planter or bird feeder',
      specialHandling: false
    },
    'paper': {
      name: 'Paper Waste',
      preparationSteps: [
        'Remove any plastic coating',
        'Keep it dry and clean',
        'Flatten cardboard boxes',
        'Bundle newspapers together'
      ],
      upcyclingTip: 'Use for crafts, wrapping, or composting (non-glossy paper)',
      specialHandling: false
    },
    'bio': {
      name: 'Organic Waste',
      preparationSteps: [
        'Remove any packaging',
        'No meat or dairy products',
        'Cut large items into smaller pieces',
        'Keep separate from other waste'
      ],
      upcyclingTip: 'Create your own compost bin for nutrient-rich garden soil',
      specialHandling: false
    },
    'glass': {
      name: 'Glass Items',
      preparationSteps: [
        'Rinse containers thoroughly',
        'Remove caps and lids',
        'Separate by color if required',
        'Handle broken glass carefully'
      ],
      upcyclingTip: 'Use jars for storage, decoration, or candle holders',
      specialHandling: true
    },
    'ewaste': {
      name: 'Electronic Waste',
      preparationSteps: [
        'Remove batteries if possible',
        'Delete personal data from devices',
        'Keep accessories together',
        'Take to designated e-waste collection center'
      ],
      upcyclingTip: 'Donate working electronics or repurpose parts for DIY projects',
      specialHandling: true
    }
  };

  const item = itemData[category] || itemData['plastics'];

  return (
    <div className="item-details-page">
      <motion.div 
        className="item-details-container"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Header */}
        <div className="item-details-header">
          <button className="back-btn" onClick={() => navigate('/')}>
            <FaArrowLeft className="back-icon" />
            <span>Back to Home</span>
          </button>
          <h1 className="page-title">Item Details</h1>
        </div>

        {/* Item Card */}
        <div className="item-card">
          <div className="item-image-section">
            <div className="item-image-placeholder">
              <FaTrash className="item-icon" style={{ color: binInfo.color }} />
            </div>
          </div>

          <div className="item-info-section">
            <h2 className="item-name">{item.name}</h2>

            {/* Bin Badge */}
            <div className="bin-badges">
              <span 
                className="bin-badge"
                style={{
                  background: `${binInfo.color}15`,
                  borderColor: `${binInfo.color}40`,
                  color: binInfo.color
                }}
              >
                <FaTrash /> {binInfo.name}
              </span>
            </div>

            {/* Special Handling Alert */}
            {item.specialHandling && (
              <div className="special-handling-alert">
                <FaExclamationTriangle className="alert-icon" />
                <div className="alert-content">
                  <h4 className="alert-title">Special Handling Required</h4>
                  <p className="alert-description">
                    This item requires special care during disposal.
                  </p>
                </div>
              </div>
            )}

            {/* Preparation Steps */}
            <div className="preparation-section">
              <h3 className="section-heading">
                <FaWrench className="heading-icon" />
                Preparation Steps
              </h3>
              <div className="steps-list">
                {item.preparationSteps.map((step, idx) => (
                  <div key={idx} className="step-item">
                    <FaCheckCircle className="step-check" />
                    <p className="step-text">{step}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Upcycling Tip */}
            {item.upcyclingTip && (
              <div className="upcycling-box">
                <h3 className="upcycling-heading">
                  <FaRecycle className="heading-icon" />
                  Upcycling Idea
                </h3>
                <p className="upcycling-content">{item.upcyclingTip}</p>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ItemDetails;
