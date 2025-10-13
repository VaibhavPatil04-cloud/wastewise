// src/api/wasteClassifier.js
// Updated to use Google Vision API

import { analyzeWasteWithGoogleVision } from './googleVisionAPI';

/**
 * Main function to classify waste using Google Vision API
 * Falls back to mock data if API fails
 */
export const classifyWaste = async (imageBase64, locale) => {
  try {
    console.log('Starting waste classification with Google Vision API...');
    
    // Call Google Vision API
    const result = await analyzeWasteWithGoogleVision(imageBase64);
    
    console.log('Classification successful:', result);
    return result;

  } catch (error) {
    console.error('Google Vision API failed, using fallback:', error);
    
    // Fallback to mock data if API fails
    return await mockClassification();
  }
};

/**
 * Mock classification for fallback or testing
 */
const mockClassification = async () => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));

  const mockResults = [
    {
      name: 'Plastic Bottle',
      category: 'plastics',
      confidence: 0.95,
      contaminated: false,
      preparation: ['Remove cap and label', 'Rinse thoroughly', 'Crush to save space'],
      upcyclingTip: 'Cut in half and use as a planter or bird feeder'
    },
    {
      name: 'Aluminum Can',
      category: 'plastics',
      confidence: 0.92,
      contaminated: false,
      preparation: ['Rinse inside', 'Crush if possible', 'Remove paper labels'],
      upcyclingTip: 'Use as small planters or pen holders'
    },
    {
      name: 'Food Scraps',
      category: 'bio',
      confidence: 0.88,
      contaminated: false,
      preparation: ['Remove non-organic materials', 'Drain excess liquid'],
      upcyclingTip: 'Create compost for your garden'
    }
  ];

  return mockResults[Math.floor(Math.random() * mockResults.length)];
};

/**
 * Lookup barcode in database (future enhancement)
 */
export const lookupBarcode = async (barcode, locale) => {
  await new Promise(resolve => setTimeout(resolve, 800));

  const barcodeDatabase = {
    '5449000000996': {
      name: 'Coca-Cola Bottle',
      category: 'plastics',
      contaminated: false,
      preparation: ['Rinse bottle', 'Remove cap', 'Recycle cap separately'],
      upcyclingTip: 'Use as water bottle holder or craft material'
    }
  };

  return barcodeDatabase[barcode] || {
    name: 'Unknown Product',
    category: 'residual',
    contaminated: false,
    preparation: ['Check product packaging for disposal instructions'],
    upcyclingTip: null
  };
};