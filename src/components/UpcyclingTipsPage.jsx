import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  FaSeedling, FaBox, FaLightbulb, FaCouch, FaWineBottle, 
  FaTshirt, FaCoffee, FaPalette, FaSearch, FaArrowLeft,
  FaRecycle, FaHammer, FaClock
} from 'react-icons/fa';
import '../styles/UpcyclingTipsPage.css';

const UpcyclingTipsPage = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Extended local data - will be replaced with Gemini API
  const allUpcyclingProjects = [
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
    },
    {
      id: 5,
      title: "Wine Cork Bulletin Board",
      category: "cork",
      difficulty: "Easy",
      time: "1 hour",
      materials: ["Wine corks", "Picture frame", "Hot glue gun", "Paint"],
      instructions: [
        "Collect enough wine corks",
        "Remove glass from picture frame",
        "Arrange corks in desired pattern",
        "Glue corks to frame backing",
        "Let dry and hang on wall"
      ],
      icon: FaWineBottle,
      iconColor: "#dc2626",
      impact: "Reuses wine corks and creates functional decor"
    },
    {
      id: 6,
      title: "T-Shirt Tote Bag",
      category: "fabric",
      difficulty: "Easy",
      time: "20 mins",
      materials: ["Old t-shirt", "Scissors", "Ruler"],
      instructions: [
        "Cut off sleeves of t-shirt",
        "Cut neckline wider",
        "Turn inside out",
        "Cut fringe at bottom",
        "Tie fringe together to close bottom"
      ],
      icon: FaTshirt,
      iconColor: "#06b6d4",
      impact: "Transforms old clothing into reusable shopping bags"
    },
    {
      id: 7,
      title: "Coffee Can Organizer",
      category: "metal",
      difficulty: "Easy",
      time: "40 mins",
      materials: ["Coffee cans", "Spray paint", "Fabric/paper", "Glue", "Magnets"],
      instructions: [
        "Clean and remove labels from cans",
        "Paint cans with spray paint",
        "Decorate with fabric or decorative paper",
        "Add magnets to back for wall mounting",
        "Use for organizing kitchen utensils or office supplies"
      ],
      icon: FaCoffee,
      iconColor: "#92400e",
      impact: "Keeps metal cans out of recycling stream and organizes space"
    },
    {
      id: 8,
      title: "Crayon Art Canvas",
      category: "crayon",
      difficulty: "Medium",
      time: "1.5 hours",
      materials: ["Old crayons", "Canvas", "Hot glue gun", "Hair dryer"],
      instructions: [
        "Arrange crayons along top of canvas",
        "Glue crayons in place",
        "Use hair dryer to melt crayons",
        "Let wax drip down canvas",
        "Create colorful abstract art"
      ],
      icon: FaPalette,
      iconColor: "#ec4899",
      impact: "Gives new life to broken crayons and creates unique artwork"
    },
    {
      id: 9,
      title: "Plastic Bag Rope",
      category: "plastic",
      difficulty: "Medium",
      time: "2 hours",
      materials: ["Plastic bags", "Scissors", "Crochet hook (optional)"],
      instructions: [
        "Cut plastic bags into strips",
        "Tie strips together end-to-end",
        "Roll into a ball like yarn",
        "Use for weaving, crocheting, or crafts",
        "Create durable outdoor mats or bags"
      ],
      icon: FaRecycle,
      iconColor: "#059669",
      impact: "Diverts hundreds of plastic bags from landfills"
    },
    {
      id: 10,
      title: "Pallet Wood Shelf",
      category: "wood",
      difficulty: "Hard",
      time: "3 hours",
      materials: ["Wooden pallet", "Sandpaper", "Wood stain", "Brackets", "Screws"],
      instructions: [
        "Disassemble pallet carefully",
        "Sand wood pieces smooth",
        "Apply wood stain or paint",
        "Assemble shelf structure",
        "Mount with brackets on wall"
      ],
      icon: FaHammer,
      iconColor: "#d97706",
      impact: "Reclaims discarded pallets into functional furniture"
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

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim() === '') {
      setFilteredProjects([]);
      setIsSearching(false);
      return;
    }

    setIsSearching(true);
    
    // Filter projects based on search query
    // TODO: Replace with Gemini API call
    const results = allUpcyclingProjects.filter(project => 
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.materials.some(material => 
        material.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );

    setFilteredProjects(results);
  };

  const displayProjects = isSearching ? filteredProjects : allUpcyclingProjects;

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
            />
            <button type="submit" className="search-submit-btn">
              Search
            </button>
          </div>
          {isSearching && (
            <p className="search-results-text">
              Found {filteredProjects.length} project{filteredProjects.length !== 1 ? 's' : ''} 
              {filteredProjects.length === 0 && ' - Try a different search term'}
            </p>
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

      {displayProjects.length === 0 && isSearching && (
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
    </div>
  );
};

export default UpcyclingTipsPage;
