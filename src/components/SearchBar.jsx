import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaSearch, FaSpinner } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { generateWasteInfoFromSearch } from '../api/geminiAPI';
import ResultSheet from './ResultSheet';
import '../styles/SearchBar.css';

const SearchBar = () => {
  const [query, setQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [searchResult, setSearchResult] = useState(null);
  const [showResultSheet, setShowResultSheet] = useState(false);
  const navigate = useNavigate();

  const handleSearch = async (e) => {
    e.preventDefault();
    
    if (!query.trim()) return;

    setIsSearching(true);

    try {
      // Generate AI-powered waste information from search query
      const result = await generateWasteInfoFromSearch(query.trim());
      
      setSearchResult(result);
      setShowResultSheet(true);
    } catch (error) {
      console.error('Search error:', error);
      // Show error result
      setSearchResult({
        name: query,
        category: 'residual',
        confidence: 0.5,
        itemName: query,
        preparationSteps: [
          'Check local recycling guidelines',
          'Clean the item if needed',
          'Consult waste management services'
        ],
        upcyclingTip: 'Consider creative reuse before disposal',
        environmentalImpact: 'Proper waste sorting helps protect the environment.',
        disposalInstructions: 'If unsure, contact local waste management.',
        aiGenerated: false
      });
      setShowResultSheet(true);
    } finally {
      setIsSearching(false);
    }
  };

  const handleCloseResult = () => {
    setShowResultSheet(false);
    setQuery('');
  };

  return (
    <>
      <form className="search-container" onSubmit={handleSearch}>
        <input
          type="text"
          className="search-input"
          placeholder="Search for any waste item (e.g., plastic bottle, cardboard box)..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          disabled={isSearching}
        />
        <button 
          type="submit" 
          className="search-icon-button"
          disabled={isSearching || !query.trim()}
          style={{ 
            background: 'none', 
            border: 'none', 
            cursor: isSearching ? 'not-allowed' : 'pointer',
            position: 'absolute',
            right: '1.75rem',
            top: '50%',
            transform: 'translateY(-50%)',
            color: isSearching ? 'rgba(255, 255, 255, 0.3)' : 'rgba(255, 255, 255, 0.7)'
          }}
        >
          {isSearching ? (
            <FaSpinner className="search-icon spinning" />
          ) : (
            <FaSearch className="search-icon" />
          )}
        </button>
      </form>

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