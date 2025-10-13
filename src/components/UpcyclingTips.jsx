import React from 'react';
import { motion } from 'framer-motion';
import { FaSeedling, FaBox, FaLightbulb, FaCouch, FaArrowRight } from 'react-icons/fa';
import '../styles/UpcyclingTips.css';

const UpcyclingTips = () => {
  const upcyclingProjects = [
    {
      id: 1,
      title: "Plastic Bottle Planters",
      category: "plastic",
      difficulty: "Easy",
      time: "30 mins",
      materials: ["Plastic bottles", "Scissors", "Paint", "Soil", "Seeds"],
      instructions: [
        "Clean plastic bottles thoroughly",
        "Cut bottle in half, keep bottom part",
        "Paint with eco-friendly paint",
        "Add drainage holes",
        "Fill with soil and plant seeds"
      ],
      icon: FaSeedling,
      iconColor: "#10b981",
      impact: "Reduces plastic waste by 1 bottle per planter"
    },
    {
      id: 2,
      title: "Cardboard Storage Boxes",
      category: "cardboard",
      difficulty: "Medium",
      time: "45 mins",
      materials: ["Cardboard boxes", "Fabric", "Glue", "Scissors", "Ruler"],
      instructions: [
        "Reinforce cardboard box corners",
        "Measure and cut fabric to size",
        "Apply fabric with eco-friendly glue",
        "Add decorative elements",
        "Create labels for organization"
      ],
      icon: FaBox,
      iconColor: "#f59e0b",
      impact: "Saves cardboard from landfill and creates storage solution"
    },
    {
      id: 3,
      title: "Glass Jar Lighting",
      category: "glass",
      difficulty: "Medium",
      time: "1 hour",
      materials: ["Glass jars", "LED string lights", "Wire", "Drill", "Paint"],
      instructions: [
        "Clean glass jars completely",
        "Drill small hole in jar lid",
        "Thread LED lights through hole",
        "Paint jar if desired",
        "Hang or place as ambient lighting"
      ],
      icon: FaLightbulb,
      iconColor: "#fbbf24",
      impact: "Repurposes glass jars and reduces electronic waste"
    },
    {
      id: 4,
      title: "Tire Garden Furniture",
      category: "rubber",
      difficulty: "Hard",
      time: "2 hours",
      materials: ["Old tires", "Rope", "Cushions", "Paint", "Drill"],
      instructions: [
        "Clean tires thoroughly",
        "Paint with weather-resistant paint",
        "Wrap with rope for texture",
        "Add cushions for seating",
        "Secure all components safely"
      ],
      icon: FaCouch,
      iconColor: "#8b5cf6",
      impact: "Prevents tire waste and creates durable furniture"
    }
  ];

  const getDifficultyColor = (difficulty) => {
    switch(difficulty) {
      case 'Easy': return '#4CAF50';
      case 'Medium': return '#FF9800';
      case 'Hard': return '#F44336';
      default: return '#757575';
    }
  };

  // Animation variants for cards
  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 50,
      scale: 0.9
    },
    visible: (index) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        delay: index * 0.15,
        ease: [0.43, 0.13, 0.23, 0.96]
      }
    })
  };

  const headerVariants = {
    hidden: { opacity: 0, y: -30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <section id="upcycling-tips" className="upcycling-section">
      <motion.div 
        className="upcycling-header"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={headerVariants}
      >
        <h2 className="upcycling-title">Upcycling Tips & Ideas</h2>
        <p className="upcycling-subtitle">
          Transform waste into wonderful creations and reduce your environmental footprint
        </p>
      </motion.div>

      <div className="projects-grid">
        {upcyclingProjects.map((project, index) => {
          const IconComponent = project.icon;
          return (
            <motion.div
              key={project.id}
              className="project-card"
              custom={index}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={cardVariants}
              whileHover={{ y: -10, transition: { duration: 0.3 } }}
            >
              <div className="project-header">
                <div className="project-image">
                  <IconComponent style={{ color: project.iconColor }} />
                </div>
              </div>

              <div className="project-content">
                <h3 className="project-title">{project.title}</h3>

                <div className="project-meta">
                  <span 
                    className="difficulty-badge"
                    style={{ 
                      background: `${getDifficultyColor(project.difficulty)}20`,
                      border: `1px solid ${getDifficultyColor(project.difficulty)}`,
                      color: getDifficultyColor(project.difficulty)
                    }}
                  >
                    {project.difficulty}
                  </span>
                  <span className="time-badge">
                    ⏱️ {project.time}
                  </span>
                </div>

                <div className="project-materials">
                  <h4>Materials Needed:</h4>
                  <ul>
                    {project.materials.map((material, idx) => (
                      <li key={idx}>{material}</li>
                    ))}
                  </ul>
                </div>

                <div className="project-instructions">
                  <h4>Instructions:</h4>
                  <ol>
                    {project.instructions.map((step, idx) => (
                      <li key={idx}>{step}</li>
                    ))}
                  </ol>
                </div>

                <div className="project-impact">
                  <strong>Environmental Impact:</strong>
                  <p>{project.impact}</p>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* View More Button */}
      <motion.div 
        className="view-more-container"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        <button className="view-more-btn">
          <span>View More Ideas</span>
          <FaArrowRight className="arrow-icon" />
        </button>
      </motion.div>
    </section>
  );
};

export default UpcyclingTips;
