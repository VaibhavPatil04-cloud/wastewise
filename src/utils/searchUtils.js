// src/utils/searchUtils.js
import { wasteItems } from '../data/wasteData';

/**
 * Search local waste items database
 * @param {string} query - Search query
 * @returns {Array} Array of matching items with scores
 */
export const searchLocalItems = (query) => {
  if (!query || query.trim().length === 0) {
    return [];
  }

  const searchTerm = query.toLowerCase().trim();
  const matches = [];

  wasteItems.forEach(item => {
    const itemNameLower = item.name.toLowerCase();
    let matchScore = 0;

    // Exact match - highest priority
    if (itemNameLower === searchTerm) {
      matchScore = 1.0;
    }
    // Starts with query - high priority
    else if (itemNameLower.startsWith(searchTerm)) {
      matchScore = 0.9;
    }
    // Contains query - medium priority
    else if (itemNameLower.includes(searchTerm)) {
      matchScore = 0.7;
    }
    // Query is part of item name - lower priority
    else if (searchTerm.includes(itemNameLower)) {
      matchScore = 0.6;
    }

    if (matchScore > 0) {
      matches.push({
        ...item,
        matchScore,
        isLocal: true
      });
    }
  });

  // Sort by match score (highest first)
  return matches.sort((a, b) => b.matchScore - a.matchScore);
};

/**
 * Get autocomplete suggestions from local database
 * @param {string} query - Search query
 * @returns {Array} Array of suggestion objects
 */
export const getLocalSuggestions = (query) => {
  if (!query || query.trim().length === 0) {
    return [];
  }

  const searchTerm = query.toLowerCase().trim();
  const suggestions = [];

  wasteItems.forEach(item => {
    const itemNameLower = item.name.toLowerCase();
    
    // Show items that start with or contain the search term
    if (itemNameLower.includes(searchTerm)) {
      suggestions.push({
        name: item.name,
        category: item.category,
        icon: item.icon,
        isLocal: true
      });
    }
  });

  // Return top 5 suggestions
  return suggestions.slice(0, 5);
};

/**
 * Convert wasteData item format to geminiAPI format
 * @param {Object} item - Item from wasteData
 * @returns {Object} Formatted item for ResultSheet
 */
export const formatLocalItemForResult = (item) => {
  return {
    name: item.name,
    category: item.category,
    confidence: 1.0,
    itemName: item.name,
    preparationSteps: item.preparation || [],
    upcyclingTip: item.upcyclingTip || 'Consider creative reuse before disposal',
    environmentalImpact: `Proper disposal of ${item.name.toLowerCase()} helps reduce waste and protect the environment.`,
    disposalInstructions: `Dispose in the appropriate ${item.category} bin according to local guidelines.`,
    aiGenerated: false,
    isLocal: true,
    icon: item.icon,
    image: item.image
  };
};
