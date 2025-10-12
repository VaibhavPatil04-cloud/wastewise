import React from 'react';
import { motion } from 'framer-motion';
import { FaLeaf, FaFileAlt, FaBatteryFull, FaRecycle, FaTrashAlt } from 'react-icons/fa';
import '../styles/ClassificationSlider.css';

const ClassificationSlider = () => {
  const classificationTips = [
    {
      id: 1,
      icon: <FaLeaf />,
      category: 'Wet Waste',
      description: 'Food scraps, vegetable peels, fruit waste, tea bags, leftovers',
      bin: 'Green Bin',
      color: 'wet-waste',
      bgColor: '#d1fae5', // Light green
      iconColor: '#22c55e' // Darker green for icon
    },
    {
      id: 2,
      icon: <FaFileAlt />,
      category: 'Dry Waste',
      description: 'Paper, cardboard, plastic bottles, metal cans, packaging',
      bin: 'Blue Bin',
      color: 'dry-waste',
      bgColor: '#dbeafe', // Light blue
      iconColor: '#3b82f6' // Darker blue for icon
    },
    {
      id: 3,
      icon: <FaBatteryFull />,
      category: 'Hazardous Waste',
      description: 'Batteries, electronics, paints, chemicals, medical waste',
      bin: 'Red Bin',
      color: 'hazardous-waste',
      bgColor: '#fee2e2', // Light red
      iconColor: '#ef4444' // Darker red for icon
    },
    {
      id: 4,
      icon: <FaRecycle />,
      category: 'Recyclable',
      description: 'Glass bottles, aluminum, clean paper, plastics, containers',
      bin: 'Yellow Bin',
      color: 'recyclable-waste',
      bgColor: '#fef3c7', // Light yellow
      iconColor: '#eab308' // Darker yellow for icon
    },
  ];

  // Duplicate for infinite scroll effect
  const duplicatedTips = [...classificationTips, ...classificationTips];

  return (
    <section className="classification-slider-section">
      <h2 className="classification-title">Quick Classification Guide</h2>
      <p className="classification-subtitle">Learn how to sort waste properly for a cleaner environment</p>

      <div className="classification-slider-container">
        <div className="classification-slider-track">
          {duplicatedTips.map((tip, idx) => (
            <motion.div
              key={`${tip.id}-${idx}`}
              className={`classification-card ${tip.color}`}
              style={{ backgroundColor: tip.bgColor }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: (idx % 4) * 0.1 }}
            >
              <div className="tip-icon-large" style={{ color: tip.iconColor }}>
                {tip.icon}
              </div>
              <h3 className="tip-category-title">{tip.category}</h3>
              <p className="tip-description-text">{tip.description}</p>
              <div className="tip-bin-badge">
                <span className="bin-icon" style={{ color: tip.iconColor }}>
                  <FaTrashAlt />
                </span>
                <span className="bin-name">{tip.bin}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ClassificationSlider;