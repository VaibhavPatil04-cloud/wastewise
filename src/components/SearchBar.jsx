import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { wasteItems } from '../utils/wasteData';
import { useNavigate } from 'react-router-dom';
import '../styles/SearchBar.css';

const SearchBar = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const navigate = useNavigate();

  const handleSearch = (value) => {
    setQuery(value);
    
    if (value.trim().length > 0) {
      const filtered = wasteItems.filter(item =>
        item.name.toLowerCase().includes(value.toLowerCase()) ||
        item.category.toLowerCase().includes(value.toLowerCase())
      );
      setResults(filtered);
      setShowResults(true);
    } else {
      setResults([]);
      setShowResults(false);
    }
  };

  const selectItem = (item) => {
    navigate(`/item/${item.id}`);
    setQuery('');
    setShowResults(false);
  };

  return (
  <div className="search-container" data-aos="zoom-in">
    <div className="relative">
      <input
        type="text"
        placeholder="Search for waste items... (e.g., 'plastic bottle')"
        value={query}
        onChange={(e) => handleSearch(e.target.value)}
        className="search-input"
      />
      <span className="search-icon">🔍</span>
    </div>

    <AnimatePresence>
      {showResults && results.length > 0 && (
        <motion.div className="search-results">
          {results.map((item, idx) => (
            <div
              key={item.id}
              className="search-result-item"
              onClick={() => selectItem(item)}
            >
              <span className="search-result-icon">{item.icon}</span>
              <div className="search-result-content">
                <p className="search-result-title">{item.name}</p>
                <p className="search-result-category">{item.category}</p>
              </div>
              <span className="search-result-arrow">→</span>
            </div>
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  </div>
);
};

export default SearchBar;
