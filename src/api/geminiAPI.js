// src/api/geminiAPI.js
// Gemini API Integration for generating waste disposal instructions

const GEMINI_API_KEY = 'AIzaSyBrH25SxbvTm1JBeYOkzJjxezZju7J9dE8';
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent';

/**
 * Generate disposal instructions and tips using Gemini API
 * @param {Object} classificationResult - Result from Vision API
 * @returns {Object} Enhanced result with AI-generated content
 */
export const generateWasteInstructions = async (classificationResult) => {
  try {
    const { name, category, confidence } = classificationResult;

    const prompt = `You are a waste management and recycling expert. 

A waste item has been identified as: "${name}" 
Category: ${category}
Confidence: ${(confidence * 100).toFixed(1)}%

Please provide the following information in a structured JSON format:

{
  "itemName": "Clear, user-friendly name for this item",
  "preparationSteps": [
    "Step 1: Specific action to prepare the item",
    "Step 2: Another preparation step",
    "Step 3: Final preparation step"
  ],
  "upcyclingTip": "One creative and practical upcycling idea",
  "environmentalImpact": "Brief statement about proper disposal importance (1-2 sentences)",
  "disposalInstructions": "Specific disposal instructions for this category"
}

Keep all responses concise, practical, and actionable. Return ONLY the JSON object, no additional text.`;

    const requestBody = {
      contents: [{
        parts: [{
          text: prompt
        }]
      }],
      generationConfig: {
        temperature: 0.9,
        topK: 40,
        topP: 0.95,
        maxOutputTokens: 1024,
        responseMimeType: "application/json"
      }
    };

    console.log('Sending request to Gemini API...');
    
    const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody)
    });

    console.log('Gemini API response status:', response.status);

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Gemini API error response:', errorData);
      throw new Error(`Gemini API error: ${response.status}`);
    }

    const data = await response.json();
    console.log('Gemini API full response:', JSON.stringify(data, null, 2));

    if (!data.candidates || data.candidates.length === 0) {
      console.error('No candidates in Gemini response:', data);
      throw new Error('Gemini API returned no candidates');
    }

    if (!data.candidates[0].content?.parts?.[0]) {
      console.error('No content in candidate:', data.candidates[0]);
      throw new Error('Gemini API candidate has no content');
    }

    const generatedText = data.candidates[0].content.parts[0].text;
    console.log('Generated text:', generatedText);
    
    let generatedContent;
    try {
      generatedContent = JSON.parse(generatedText);
    } catch (parseError) {
      const jsonMatch = generatedText.match(/\{[\s\S]*\}/);
      if (!jsonMatch) {
        throw new Error('Failed to extract JSON from Gemini response');
      }
      generatedContent = JSON.parse(jsonMatch[0]);
    }

    console.log('Parsed content:', generatedContent);

    return {
      ...classificationResult,
      itemName: generatedContent.itemName || name,
      preparationSteps: generatedContent.preparationSteps || [],
      upcyclingTip: generatedContent.upcyclingTip || null,
      environmentalImpact: generatedContent.environmentalImpact || null,
      disposalInstructions: generatedContent.disposalInstructions || null,
      aiGenerated: true
    };

  } catch (error) {
    console.error('Gemini API error:', error);
    
    return {
      ...classificationResult,
      itemName: classificationResult.name,
      preparationSteps: [
        'Clean the item thoroughly',
        'Remove any labels or stickers',
        'Check with local recycling guidelines'
      ],
      upcyclingTip: 'Consider creative reuse before disposal',
      environmentalImpact: 'Proper disposal helps protect the environment and conserves resources.',
      disposalInstructions: `Place in ${classificationResult.category} bin according to local guidelines.`,
      aiGenerated: false
    };
  }
};

/**
 * Generate waste information from text search query using Gemini
 * @param {string} searchQuery - User's search query
 * @returns {Object} Waste classification result with AI-generated content
 */
export const generateWasteInfoFromSearch = async (searchQuery) => {
  try {
    // Add timestamp to make each query unique
    const timestamp = Date.now();
    const uniquePrompt = `You are a waste management and recycling expert. [Request ID: ${timestamp}]

A user is searching for information about: "${searchQuery}"

Analyze this SPECIFIC item: "${searchQuery}" and provide UNIQUE, DETAILED waste disposal information.

Respond ONLY with a JSON object in this exact format:
{
  "name": "Exact name of ${searchQuery}",
  "category": "one of: plastics, paper, bio, glass, ewaste, or residual",
  "confidence": 0.85,
  "itemName": "User-friendly display name for ${searchQuery}",
  "preparationSteps": [
    "Step 1: VERY SPECIFIC action for ${searchQuery}",
    "Step 2: Another SPECIFIC step for ${searchQuery}",
    "Step 3: Final SPECIFIC step for ${searchQuery}"
  ],
  "upcyclingTip": "ONE creative, practical upcycling idea SPECIFIC to ${searchQuery}",
  "environmentalImpact": "Brief statement about ${searchQuery}'s environmental importance",
  "disposalInstructions": "SPECIFIC disposal instructions for ${searchQuery}"
}

CRITICAL REQUIREMENTS:
- category must be exactly one of: plastics, paper, bio, glass, ewaste, residual
- confidence between 0.0 and 1.0
- ALL content MUST be UNIQUE and SPECIFIC to "${searchQuery}"
- DO NOT use generic phrases like "this item" or "the item"
- Mention "${searchQuery}" explicitly in responses
- Be creative and varied in your responses
- Return ONLY valid JSON`;

    const requestBody = {
      contents: [{
        parts: [{ text: uniquePrompt }]
      }],
      generationConfig: {
        temperature: 1.2,  // Higher temperature for more variation
        topK: 64,
        topP: 0.98,
        maxOutputTokens: 1024,
        responseMimeType: "application/json"
      }
    };

    console.log('Generating waste info from search query:', searchQuery);

    const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody)
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Gemini API error response:', errorData);
      throw new Error(`Gemini API error: ${response.status}`);
    }

    const data = await response.json();

    if (!data.candidates || data.candidates.length === 0) {
      throw new Error('No candidates in Gemini response');
    }

    if (!data.candidates[0].content?.parts?.[0]) {
      throw new Error('Invalid response structure');
    }

    const generatedText = data.candidates[0].content.parts[0].text;
    console.log('Generated search result:', generatedText);

    let wasteInfo;
    try {
      wasteInfo = JSON.parse(generatedText);
    } catch (parseError) {
      const jsonMatch = generatedText.match(/\{[\s\S]*\}/);
      if (!jsonMatch) {
        throw new Error('Failed to parse JSON from Gemini response');
      }
      wasteInfo = JSON.parse(jsonMatch[0]);
    }

    if (!wasteInfo.category || !wasteInfo.name) {
      throw new Error('Invalid waste info structure');
    }

    wasteInfo.aiGenerated = true;
    wasteInfo.searchQuery = searchQuery;

    console.log('Parsed waste info:', wasteInfo);
    return wasteInfo;

  } catch (error) {
    console.error('Error generating waste info from search:', error);

    return {
      name: searchQuery,
      category: 'residual',
      confidence: 0.5,
      itemName: searchQuery,
      preparationSteps: [
        'Check the item for recycling symbols',
        'Clean the item if needed',
        'Consult local waste management guidelines'
      ],
      upcyclingTip: 'Consider if this item can be reused or repurposed before disposal',
      environmentalImpact: 'Proper waste sorting helps reduce landfill waste and conserves resources.',
      disposalInstructions: 'If unsure, place in residual waste bin or contact local waste management.',
      aiGenerated: false,
      searchQuery: searchQuery
    };
  }
};

/**
 * Generate creative upcycling ideas using Gemini
 */
export const generateUpcyclingIdeas = async (itemName, category) => {
  try {
    const prompt = `Generate 5 creative and practical upcycling ideas for: ${itemName} (Category: ${category})

Provide ideas that are:
- Easy to implement at home
- Practical and useful
- Environmentally friendly
- Creative but realistic

Return as JSON array: ["idea 1", "idea 2", "idea 3", "idea 4", "idea 5"]`;

    const requestBody = {
      contents: [{
        parts: [{ text: prompt }]
      }],
      generationConfig: {
        temperature: 0.8,
        maxOutputTokens: 512,
        responseMimeType: "application/json"
      }
    };

    const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody)
    });

    if (!response.ok) {
      throw new Error(`Gemini API error: ${response.status}`);
    }

    const data = await response.json();
    
    if (!data.candidates || !data.candidates[0]?.content?.parts?.[0]) {
      throw new Error('Invalid response structure');
    }

    const generatedText = data.candidates[0].content.parts[0].text;
    
    try {
      return JSON.parse(generatedText);
    } catch {
      const jsonMatch = generatedText.match(/\[[\s\S]*\]/);
      if (jsonMatch) {
        return JSON.parse(jsonMatch[0]);
      }
    }

    return [];
  } catch (error) {
    console.error('Gemini upcycling ideas error:', error);
    return [];
  }
};
