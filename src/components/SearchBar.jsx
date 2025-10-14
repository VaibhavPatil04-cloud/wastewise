import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaSearch, FaArrowRight } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { getLocalSuggestions, formatLocalItemForResult, searchLocalItems } from '../utils/searchUtils';
import ResultSheet from './ResultSheet';
import '../styles/SearchBar.css';

const SearchBar = () => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [searchResult, setSearchResult] = useState(null);
  const [showResultSheet, setShowResultSheet] = useState(false);
  const navigate = useNavigate();
  const searchRef = useRef(null);

  // Handle clicks outside to close suggestions
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Update suggestions when query changes
  useEffect(() => {
    if (query.trim().length > 0) {
      const localSuggestions = getLocalSuggestions(query);
      setSuggestions(localSuggestions);
      setShowSuggestions(localSuggestions.length > 0);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }, [query]);

  const handleSearch = (e) => {
    e.preventDefault();
    
    if (!query.trim()) return;

    const localMatches = searchLocalItems(query.trim());
    
    if (localMatches.length > 0) {
      const bestMatch = localMatches[0];
      const formattedResult = formatLocalItemForResult(bestMatch);
      
      setSearchResult(formattedResult);
      setShowResultSheet(true);
      setShowSuggestions(false);
    } else {
      setSearchResult({
        name: query,
        category: 'residual',
        confidence: 0.5,
        itemName: query,
        preparationSteps: [
          'Check local recycling guidelines for this item',
          'Clean the item if needed',
          'Consult waste management services if unsure'
        ],
        upcyclingTip: 'Consider creative reuse before disposal',
        environmentalImpact: 'Proper waste sorting helps protect the environment.',
        disposalInstructions: 'If unsure, contact local waste management or place in residual waste bin.',
        aiGenerated: false
      });
      setShowResultSheet(true);
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    const localMatches = searchLocalItems(suggestion.name);
    
    if (localMatches.length > 0) {
      const formattedResult = formatLocalItemForResult(localMatches[0]);
      setSearchResult(formattedResult);
      setShowResultSheet(true);
    }
    
    setQuery('');
    setShowSuggestions(false);
  };

  const handleCloseResult = () => {
    setShowResultSheet(false);
    setQuery('');
  };

  return (
    <>
      <div ref={searchRef} style={{ position: 'relative', width: '100%' }}>
        <form className="search-container" onSubmit={handleSearch}>
          <input
            type="text"
            className="search-input"
            placeholder="Search for any waste item (e.g., plastic bottle, cardboard box)..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => query.trim().length > 0 && setShowSuggestions(suggestions.length > 0)}
          />
          <button 
            type="submit" 
            className="search-icon-button"
            disabled={!query.trim()}
            style={{ 
              background: 'none', 
              border: 'none', 
              cursor: query.trim() ? 'pointer' : 'not-allowed',
              position: 'absolute',
              right: '1.75rem',
              top: '50%',
              transform: 'translateY(-50%)',
              color: query.trim() ? 'rgba(255, 255, 255, 0.7)' : 'rgba(255, 255, 255, 0.3)'
            }}
          >
            <FaSearch className="search-icon" />
          </button>
        </form>

        {/* Suggestions Dropdown */}
        <AnimatePresence>
          {showSuggestions && suggestions.length > 0 && (
            <motion.div
              className="search-results"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              {suggestions.map((suggestion, index) => (
                <div
                  key={index}
                  className="search-result-item"
                  onClick={() => handleSuggestionClick(suggestion)}
                >
                  <span className="search-result-icon">{suggestion.icon}</span>
                  <div className="search-result-content">
                    <div className="search-result-title">{suggestion.name}</div>
                    <div className="search-result-category">{suggestion.category}</div>
                  </div>
                  <FaArrowRight className="search-result-arrow" />
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {showResultSheet && searchResult && (
          <ResultSheet 
            result={searchResult} 
            onClose={handleCloseResult}
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default SearchBar;