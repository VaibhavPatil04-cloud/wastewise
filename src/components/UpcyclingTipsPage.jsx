import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  FaSeedling, FaBox, FaLightbulb, FaCouch, FaWineBottle, 
  FaTshirt, FaCoffee, FaPalette, FaSearch, FaArrowLeft,
  FaRecycle, FaHammer, FaClock, FaRobot, FaSpinner
} from 'react-icons/fa';
import { generateUpcyclingIdeasDetailed } from '../api/geminiAPI';
import '../styles/UpcyclingTipsPage.css';

const UpcyclingTipsPage = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [aiGeneratedProjects, setAiGeneratedProjects] = useState([]);
  const [showAiResults, setShowAiResults] = useState(false);

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Default local projects
  const defaultProjects = [
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

  const getIconForCategory = (category) => {
    const iconMap = {
      'plastic': FaSeedling,
      'cardboard': FaBox,
      'glass': FaLightbulb,
      'paper': FaPalette,
      'metal': FaHammer,
      'fabric': FaTshirt,
      'wood': FaHammer,
      'bottle': FaWineBottle
    };
    
    const lowerCategory = category?.toLowerCase() || '';
    for (const [key, icon] of Object.entries(iconMap)) {
      if (lowerCategory.includes(key)) return icon;
    }
    return FaRecycle;
  };

  const getIconColor = (category) => {
    const colorMap = {
      'plastic': '#10b981',
      'cardboard': '#f59e0b',
      'glass': '#fbbf24',
      'paper': '#ec4899',
      'metal': '#d97706',
      'fabric': '#06b6d4',
      'wood': '#92400e',
      'bottle': '#dc2626'
    };
    
    const lowerCategory = category?.toLowerCase() || '';
    for (const [key, color] of Object.entries(colorMap)) {
      if (lowerCategory.includes(key)) return color;
    }
    return '#10b981';
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    
    if (searchQuery.trim() === '') {
      setShowAiResults(false);
      setAiGeneratedProjects([]);
      return;
    }

    setIsSearching(true);

    try {
      // Call Gemini API to generate upcycling ideas
      const aiProjects = await generateUpcyclingIdeasDetailed(searchQuery.trim());
      
      // Transform AI response to match our project structure
      const transformedProjects = aiProjects.map((project, index) => ({
        id: `ai-${index}`,
        title: project.title,
        category: project.category || searchQuery,
        difficulty: project.difficulty || 'Medium',
        time: project.time || '1 hour',
        materials: project.materials || [],
        instructions: project.instructions || [],
        icon: getIconForCategory(project.category || searchQuery),
        iconColor: getIconColor(project.category || searchQuery),
        impact: project.impact || `Creative reuse of ${searchQuery}`,
        isAiGenerated: true
      }));

      setAiGeneratedProjects(transformedProjects);
      setShowAiResults(true);

    } catch (error) {
      console.error('Error generating upcycling ideas:', error);
      // Show empty results on error
      setAiGeneratedProjects([]);
      setShowAiResults(true);
    } finally {
      setIsSearching(false);
    }
  };

  const displayProjects = showAiResults ? aiGeneratedProjects : defaultProjects;

  const cardVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.9 },
    visible: (index) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        delay: index * 0.1,
        ease: [0.43, 0.13, 0.23, 0.96]
      }
    })
  };

  return (
    <div className="upcycling-page">
      {/* Header Section */}
      <div className="upcycling-page-header">
        <button className="back-button" onClick={() => navigate('/')}>
          <FaArrowLeft /> Back to Home
        </button>
        
        <motion.h1 
          className="page-title"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Upcycling Ideas & Projects
        </motion.h1>
        
        <motion.p 
          className="page-subtitle"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Discover creative ways to transform waste into wonderful creations
        </motion.p>

        {/* Search Bar */}
        <motion.form 
          className="upcycling-search-container"
          onSubmit={handleSearch}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="search-box">
            <FaSearch className="search-icon-input" />
            <input
              type="text"
              className="search-input-field"
              placeholder="Search by item (e.g., plastic bottle, cardboard, glass jar)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              disabled={isSearching}
            />
            <button 
              type="submit" 
              className="search-submit-btn"
              disabled={isSearching}
            >
              {isSearching ? (
                <>
                  <FaSpinner className="spinning" /> Generating...
                </>
              ) : (
                'Search'
              )}
            </button>
          </div>
          {showAiResults && (
            <div className="search-results-info">
              {aiGeneratedProjects.length > 0 ? (
                <p className="search-results-text">
                  <FaRobot style={{ display: 'inline', marginRight: '8px' }} />
                  Found {aiGeneratedProjects.length} AI-generated project{aiGeneratedProjects.length !== 1 ? 's' : ''} for "{searchQuery}"
                </p>
              ) : (
                <p className="search-results-text no-results-text">
                  No projects found - Try a different search term
                </p>
              )}
              <button 
                className="clear-search-btn"
                onClick={() => {
                  setSearchQuery('');
                  setShowAiResults(false);
                  setAiGeneratedProjects([]);
                }}
              >
                Show All Projects
              </button>
            </div>
          )}
        </motion.form>
      </div>

      {/* Projects Grid */}
      <div className="upcycling-projects-grid">
        <AnimatePresence mode="wait">
          {displayProjects.map((project, index) => {
            const IconComponent = project.icon;
            return (
              <motion.div
                key={project.id}
                className="upcycling-project-card"
                custom={index}
                initial="hidden"
                animate="visible"
                variants={cardVariants}
                whileHover={{ y: -10, boxShadow: "0 20px 40px rgba(0,0,0,0.3)" }}
                layout
              >
                {project.isAiGenerated && (
                  <div className="ai-generated-badge">
                    <FaRobot /> AI Generated
                  </div>
                )}
                
                <div 
                  className="project-icon-wrapper" 
                  style={{ backgroundColor: `${project.iconColor}20` }}
                >
                  <IconComponent 
                    className="project-main-icon" 
                    style={{ color: project.iconColor }} 
                  />
                </div>

                <h3 className="project-card-title">{project.title}</h3>

                <div className="project-meta">
                  <span 
                    className="difficulty-badge" 
                    style={{ backgroundColor: getDifficultyColor(project.difficulty) }}
                  >
                    {project.difficulty}
                  </span>
                  <span className="time-badge">
                    <FaClock /> {project.time}
                  </span>
                </div>

                <div className="materials-section">
                  <h4 className="section-heading">Materials Needed:</h4>
                  <ul className="materials-list">
                    {project.materials.slice(0, 3).map((material, idx) => (
                      <li key={idx}>{material}</li>
                    ))}
                    {project.materials.length > 3 && (
                      <li className="more-items">+{project.materials.length - 3} more</li>
                    )}
                  </ul>
                </div>

                <div className="instructions-section">
                  <h4 className="section-heading">Instructions:</h4>
                  <ol className="instructions-list">
                    {project.instructions.map((step, idx) => (
                      <li key={idx}>{step}</li>
                    ))}
                  </ol>
                </div>

                <div className="impact-section">
                  <FaRecycle className="impact-icon" />
                  <p className="impact-text">{project.impact}</p>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {displayProjects.length === 0 && showAiResults && !isSearching && (
        <motion.div 
          className="no-results"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <FaSearch className="no-results-icon" />
          <h3>No projects found</h3>
          <p>Try searching for common waste items like "plastic", "cardboard", "glass", or "bottle"</p>
        </motion.div>
      )}

      {isSearching && (
        <motion.div 
          className="loading-state"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <FaSpinner className="loading-spinner spinning" />
          <p>Generating creative upcycling ideas...</p>
        </motion.div>
      )}
    </div>
  );
};

export default UpcyclingTipsPage;