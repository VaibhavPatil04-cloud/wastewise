// src/api/geminiAPI.js
// Gemini API Integration for generating waste disposal instructions

const GEMINI_API_KEY = 'AIzaSyAGveSOxS8WEpZDpn1hctcMvTNzhsqb8H0';
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

/**
 * Generate detailed upcycling project ideas for UpcyclingTipsPage
 * @param {string} itemQuery - User's search query for item
 * @returns {Array} Array of detailed upcycling projects
 */
export const generateUpcyclingIdeasDetailed = async (itemQuery) => {
  try {
    const timestamp = Date.now();
    const uniquePrompt = `You are a creative upcycling and DIY expert. [Request ID: ${timestamp}]

A user wants upcycling ideas for: "${itemQuery}"

Generate 5 UNIQUE, CREATIVE, and PRACTICAL upcycling projects specifically for "${itemQuery}".

Respond ONLY with a JSON array in this exact format:
[
  {
    "title": "Creative project name using ${itemQuery}",
    "category": "material type (e.g., plastic, cardboard, glass, metal, fabric)",
    "difficulty": "Easy, Medium, or Hard",
    "time": "estimated time (e.g., 30 mins, 1 hour, 2 hours)",
    "materials": ["${itemQuery}", "material 2", "material 3", "material 4"],
    "instructions": [
      "Step 1: SPECIFIC action for ${itemQuery}",
      "Step 2: Another SPECIFIC step",
      "Step 3: Continue...",
      "Step 4: ...",
      "Step 5: Final step"
    ],
    "impact": "Environmental impact statement about reusing ${itemQuery}"
  }
]

CRITICAL REQUIREMENTS:
- Generate exactly 5 different projects
- Each project must be UNIQUE and CREATIVE
- All content must be SPECIFIC to "${itemQuery}"
- Instructions should have 5-7 detailed steps
- Materials list should have 3-5 items
- Be practical and achievable at home
- Focus on real, useful end products
- Mention "${itemQuery}" explicitly in titles and instructions
- Return ONLY valid JSON array`;

    const requestBody = {
      contents: [{
        parts: [{ text: uniquePrompt }]
      }],
      generationConfig: {
        temperature: 1.0,
        topK: 64,
        topP: 0.95,
        maxOutputTokens: 2048,
        responseMimeType: "application/json"
      }
    };

    console.log('Generating detailed upcycling ideas for:', itemQuery);

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
    console.log('Generated upcycling projects:', generatedText);

    let projects;
    try {
      projects = JSON.parse(generatedText);
    } catch (parseError) {
      const jsonMatch = generatedText.match(/\[[\s\S]*\]/);
      if (!jsonMatch) {
        throw new Error('Failed to parse JSON from Gemini response');
      }
      projects = JSON.parse(jsonMatch[0]);
    }

    // Validate projects structure
    if (!Array.isArray(projects) || projects.length === 0) {
      throw new Error('Invalid projects structure');
    }

    console.log('Parsed upcycling projects:', projects);
    return projects;

  } catch (error) {
    console.error('Error generating detailed upcycling ideas:', error);

    // Return fallback projects
    return [
      {
        title: `Creative ${itemQuery} Organizer`,
        category: 'general',
        difficulty: 'Easy',
        time: '30 mins',
        materials: [itemQuery, 'Scissors', 'Paint', 'Glue'],
        instructions: [
          `Clean the ${itemQuery} thoroughly`,
          'Cut or shape as needed',
          'Paint or decorate with eco-friendly materials',
          'Let dry completely',
          'Use for storage or organization'
        ],
        impact: `Gives ${itemQuery} a second life and reduces waste`
      },
      {
        title: `${itemQuery} Planter`,
        category: 'general',
        difficulty: 'Easy',
        time: '20 mins',
        materials: [itemQuery, 'Soil', 'Seeds', 'Drainage tool'],
        instructions: [
          `Prepare and clean the ${itemQuery}`,
          'Create drainage holes at the bottom',
          'Fill with potting soil',
          'Plant seeds or small plants',
          'Water and place in sunlight'
        ],
        impact: `Transforms ${itemQuery} into a sustainable garden container`
      },
      {
        title: `Decorative ${itemQuery} Art`,
        category: 'general',
        difficulty: 'Medium',
        time: '1 hour',
        materials: [itemQuery, 'Acrylic paint', 'Brushes', 'Clear sealant'],
        instructions: [
          `Clean and prepare ${itemQuery} surface`,
          'Sketch your design lightly',
          'Paint with creative patterns and colors',
          'Add details and finishing touches',
          'Apply clear sealant for durability and shine'
        ],
        impact: `Creates unique art while repurposing ${itemQuery}`
      },
      {
        title: `${itemQuery} Storage Solution`,
        category: 'general',
        difficulty: 'Easy',
        time: '25 mins',
        materials: [itemQuery, 'Labels', 'Markers', 'Decorative paper'],
        instructions: [
          `Clean ${itemQuery} and remove any existing labels`,
          'Measure and cut decorative paper if needed',
          'Attach paper or paint the exterior',
          'Add custom labels for organization',
          'Use for storing small items or supplies'
        ],
        impact: `Repurposes ${itemQuery} into functional household storage`
      },
      {
        title: `${itemQuery} Gift Container`,
        category: 'general',
        difficulty: 'Easy',
        time: '35 mins',
        materials: [itemQuery, 'Ribbon', 'Gift wrap', 'Decorative elements'],
        instructions: [
          `Thoroughly clean and dry ${itemQuery}`,
          'Wrap or paint in festive colors',
          'Add ribbons, bows, or decorative elements',
          'Fill with gifts, treats, or homemade items',
          'Present as a unique, eco-friendly gift package'
        ],
        impact: `Turns ${itemQuery} into a reusable, environmentally-friendly gift container`
      }
    ];
  }
};  
