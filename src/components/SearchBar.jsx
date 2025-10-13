import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaSearch, FaChevronRight } from 'react-icons/fa';
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
    <div className="search-container">
      <input
        type="text"
        className="search-input"
        placeholder="Search for any waste item..."
        value={query}
        onChange={(e) => handleSearch(e.target.value)}
        onFocus={() => query && setShowResults(true)}
      />
      <FaSearch className="search-icon" />

      <AnimatePresence>
        {showResults && results.length > 0 && (
          <motion.div
            className="search-results"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {results.map((item) => (
              <motion.div
                key={item.id}
                className="search-result-item"
                onClick={() => selectItem(item)}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <span className="search-result-icon">{item.icon}</span>
                <div className="search-result-content">
                  <div className="search-result-title">{item.name}</div>
                  <div className="search-result-category">{item.category}</div>
                </div>
                <FaChevronRight className="search-result-arrow" />
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SearchBar;
