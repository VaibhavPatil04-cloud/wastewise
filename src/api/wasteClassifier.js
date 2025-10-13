// src/api/wasteClassifier.js
// Updated to use Google Vision API + Gemini API

import { analyzeWasteWithGoogleVision } from './googleVisionAPI';
import { generateWasteInstructions } from './geminiAPI';

/**
 * Main function to classify waste using Google Vision API + Gemini
 */
export const classifyWaste = async (imageBase64, locale) => {
  try {
    console.log('Starting waste classification with Google Vision API...');
    
    // Step 1: Classify image with Vision API
    const visionResult = await analyzeWasteWithGoogleVision(imageBase64);
    console.log('Vision API result:', visionResult);
    
    // Step 2: Enhance with Gemini AI-generated content
    console.log('Generating AI instructions with Gemini...');
    const enhancedResult = await generateWasteInstructions(visionResult);
    console.log('Enhanced result:', enhancedResult);
    
    return enhancedResult;
    
  } catch (error) {
    console.error('Classification failed, using fallback:', error);
    // Fallback to mock data if both APIs fail
    return await mockClassification();
  }
};

/**
 * Mock classification for fallback or testing
 */
const mockClassification = async () => {
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  const mockResults = [
    {
      name: 'Plastic Bottle',
      category: 'plastics',
      confidence: 0.95,
      itemName: 'Plastic Water Bottle',
      preparationSteps: [
        'Remove cap and label',
        'Rinse thoroughly with water',
        'Crush to save space',
        'Place in recycling bin'
      ],
      upcyclingTip: 'Cut in half and use as a planter for small herbs or succulents',
      environmentalImpact: 'Proper recycling of plastic bottles saves energy and reduces ocean pollution.',
      aiGenerated: false
    }
  ];
  
  return mockResults[0];
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
      preparationSteps: ['Rinse bottle', 'Remove cap', 'Recycle cap separately'],
      upcyclingTip: 'Use as water bottle holder or craft material'
    }
  };
  
  return barcodeDatabase[barcode] || {
    name: 'Unknown Product',
    category: 'residual',
    preparationSteps: ['Check product packaging for disposal instructions'],
    upcyclingTip: null
  };
};
