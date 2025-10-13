// src/api/googleVisionAPI.js
// SETUP INSTRUCTIONS:
// 1. Go to Google Cloud Console: https://console.cloud.google.com/
// 2. Create a new project or select existing one
// 3. Enable Cloud Vision API
// 4. Create credentials (API Key)
// 5. Replace GOOGLE_VISION_API_KEY below with your actual key
// 6. For production, use environment variables instead

// src/api/googleVisionAPI.js
// Google Cloud Vision API Integration

const GOOGLE_VISION_API_KEY = process.env.REACT_APP_GOOGLE_VISION_API_KEY;const VISION_API_URL = `https://vision.googleapis.com/v1/images:annotate?key=${GOOGLE_VISION_API_KEY}`;

/**
 * Waste category mapping from Google Vision labels to your bin categories
 */
const WASTE_CATEGORY_MAPPING = {
  // Plastics
  'plastic': 'plastics',
  'bottle': 'plastics',
  'plastic bottle': 'plastics',
  'container': 'plastics',
  'packaging': 'plastics',
  'bag': 'plastics',
  'wrapper': 'plastics',
  'can': 'plastics',
  'aluminum': 'plastics',
  'metal': 'plastics',
  
  // Paper
  'paper': 'paper',
  'cardboard': 'paper',
  'newspaper': 'paper',
  'magazine': 'paper',
  'book': 'paper',
  'document': 'paper',
  'box': 'paper',
  'carton': 'paper',
  
  // Glass
  'glass': 'glass',
  'jar': 'glass',
  'glass bottle': 'glass',
  'glass container': 'glass',
  
  // Organic/Bio
  'food': 'bio',
  'fruit': 'bio',
  'vegetable': 'bio',
  'organic': 'bio',
  'plant': 'bio',
  'leaf': 'bio',
  'peel': 'bio',
  'compost': 'bio',
  
  // E-waste
  'battery': 'ewaste',
  'electronic': 'ewaste',
  'electronics': 'ewaste',
  'phone': 'ewaste',
  'computer': 'ewaste',
  'device': 'ewaste',
  'gadget': 'ewaste',
  'wire': 'ewaste',
  'cable': 'ewaste',
  
  // Residual (fallback)
  'trash': 'residual',
  'waste': 'residual',
  'garbage': 'residual',
};

/**
 * Item-specific data based on detected labels
 */
const ITEM_DATABASE = {
  'plastic bottle': {
    name: 'Plastic Bottle',
    category: 'plastics',
    preparation: [
      'Remove cap and label',
      'Rinse thoroughly with water',
      'Crush to save space',
      'Place in designated plastics bin'
    ],
    upcyclingTip: 'Cut in half and use as a planter, bird feeder, or pencil holder',
    contaminated: false
  },
  'glass bottle': {
    name: 'Glass Bottle',
    category: 'glass',
    preparation: [
      'Remove lid and rinse',
      'Remove labels if possible',
      'Separate by color if required',
      'Place carefully in glass bin'
    ],
    upcyclingTip: 'Use as a vase, candle holder, or decorative storage container',
    contaminated: false
  },
  'aluminum can': {
    name: 'Aluminum Can',
    category: 'plastics',
    preparation: [
      'Rinse inside thoroughly',
      'Crush to save space',
      'Remove any paper labels',
      'Place in recycling bin'
    ],
    upcyclingTip: 'Use as small planters, pen holders, or candle holders',
    contaminated: false
  },
  'cardboard box': {
    name: 'Cardboard Box',
    category: 'paper',
    preparation: [
      'Flatten the box completely',
      'Remove any tape or staples',
      'Keep dry and clean',
      'Bundle together if multiple boxes'
    ],
    upcyclingTip: 'Use for DIY storage boxes, cat houses, or children\'s craft projects',
    contaminated: false
  },
  'food waste': {
    name: 'Food Waste',
    category: 'bio',
    preparation: [
      'Remove any packaging',
      'Drain excess liquid',
      'No meat or dairy in some regions',
      'Place in organic waste bin'
    ],
    upcyclingTip: 'Create compost for your garden by mixing with dry leaves',
    contaminated: false
  },
  'battery': {
    name: 'Battery',
    category: 'ewaste',
    preparation: [
      'Do NOT throw in regular bins',
      'Tape terminals of lithium batteries',
      'Store in cool, dry place',
      'Take to e-waste collection center'
    ],
    upcyclingTip: 'Take to designated e-waste collection centers. Never dispose with regular trash.',
    contaminated: true
  },
  'paper': {
    name: 'Paper',
    category: 'paper',
    preparation: [
      'Keep dry and clean',
      'Remove any plastic coating',
      'Stack neatly',
      'Place in paper recycling bin'
    ],
    upcyclingTip: 'Use for wrapping gifts, cleaning windows, or as mulch for gardening',
    contaminated: false
  }
};

/**
 * Analyze image using Google Cloud Vision API
 * @param {string} imageBase64 - Base64 encoded image (with or without data:image prefix)
 * @returns {Promise<Object>} - Classification result
 */
export const analyzeWasteWithGoogleVision = async (imageBase64) => {
  try {
    // Remove data URL prefix if present
    const base64Image = imageBase64.includes(',') 
      ? imageBase64.split(',')[1] 
      : imageBase64;

    // Prepare the request body
    const requestBody = {
      requests: [
        {
          image: {
            content: base64Image
          },
          features: [
            {
              type: 'LABEL_DETECTION',
              maxResults: 10
            },
            {
              type: 'OBJECT_LOCALIZATION',
              maxResults: 5
            }
          ]
        }
      ]
    };

    // Call Google Vision API
    const response = await fetch(VISION_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody)
    });

    if (!response.ok) {
      throw new Error(`Google Vision API error: ${response.status}`);
    }

    const data = await response.json();
    
    // Process the results
    return processVisionResults(data);

  } catch (error) {
    console.error('Google Vision API Error:', error);
    throw error;
  }
};

/**
 * Process Google Vision API results and map to waste categories
 * @param {Object} visionData - Raw response from Google Vision API
 * @returns {Object} - Processed classification result
 */
const processVisionResults = (visionData) => {
  const response = visionData.responses[0];
  
  if (!response || (!response.labelAnnotations && !response.localizedObjectAnnotations)) {
    throw new Error('No labels or objects detected in image');
  }

  // Extract labels and objects
  const labels = response.labelAnnotations || [];
  const objects = response.localizedObjectAnnotations || [];
  
  // Combine and score all detections
  const detections = [
    ...labels.map(label => ({
      description: label.description.toLowerCase(),
      score: label.score
    })),
    ...objects.map(obj => ({
      description: obj.name.toLowerCase(),
      score: obj.score
    }))
  ];

  // Sort by confidence score
  detections.sort((a, b) => b.score - a.score);

  // Find the best matching waste category
  let detectedCategory = 'residual'; // Default fallback
  let detectedItem = 'Unknown Item';
  let maxConfidence = 0;
  let matchedLabel = '';

  for (const detection of detections) {
    const desc = detection.description;
    
    // Check for exact matches in item database
    for (const [key, itemData] of Object.entries(ITEM_DATABASE)) {
      if (desc.includes(key) || key.includes(desc)) {
        return {
          name: itemData.name,
          category: itemData.category,
          confidence: detection.score,
          preparation: itemData.preparation,
          upcyclingTip: itemData.upcyclingTip,
          contaminated: itemData.contaminated,
          detectedLabels: detections.slice(0, 5).map(d => d.description)
        };
      }
    }

    // Check category mapping
    for (const [keyword, category] of Object.entries(WASTE_CATEGORY_MAPPING)) {
      if (desc.includes(keyword) || keyword.includes(desc)) {
        if (detection.score > maxConfidence) {
          maxConfidence = detection.score;
          detectedCategory = category;
          matchedLabel = desc;
          detectedItem = capitalizeWords(desc);
        }
      }
    }
  }

  // Get default data for the detected category
  const defaultData = getDefaultItemData(detectedCategory, detectedItem);

  return {
    name: detectedItem,
    category: detectedCategory,
    confidence: maxConfidence,
    preparation: defaultData.preparation,
    upcyclingTip: defaultData.upcyclingTip,
    contaminated: defaultData.contaminated,
    detectedLabels: detections.slice(0, 5).map(d => d.description)
  };
};

/**
 * Get default item data based on category
 */
const getDefaultItemData = (category, itemName) => {
  const defaultData = {
    plastics: {
      preparation: [
        'Rinse and clean thoroughly',
        'Remove any labels or caps',
        'Dry completely',
        'Place in designated plastics bin'
      ],
      upcyclingTip: 'Consider reusing or repurposing before recycling',
      contaminated: false
    },
    paper: {
      preparation: [
        'Keep dry and clean',
        'Remove any non-paper materials',
        'Flatten if possible',
        'Place in paper recycling bin'
      ],
      upcyclingTip: 'Use for crafts, wrapping, or composting',
      contaminated: false
    },
    glass: {
      preparation: [
        'Rinse thoroughly',
        'Remove lids and caps',
        'Separate by color if required',
        'Handle carefully'
      ],
      upcyclingTip: 'Use for storage, decoration, or DIY projects',
      contaminated: false
    },
    bio: {
      preparation: [
        'Remove packaging',
        'Drain excess liquid',
        'Cut large items into smaller pieces',
        'Place in organic waste bin'
      ],
      upcyclingTip: 'Create compost for nutrient-rich garden soil',
      contaminated: false
    },
    ewaste: {
      preparation: [
        'Do NOT throw in regular bins',
        'Remove batteries if possible',
        'Delete personal data from devices',
        'Take to e-waste collection center'
      ],
      upcyclingTip: 'Donate working items or take to proper e-waste facility',
      contaminated: true
    },
    residual: {
      preparation: [
        'Check if item can be recycled',
        'Keep separate from recyclables',
        'Place in general waste bin'
      ],
      upcyclingTip: 'Consider if item can be reused before disposal',
      contaminated: false
    }
  };

  return defaultData[category] || defaultData.residual;
};

/**
 * Helper function to capitalize words
 */
const capitalizeWords = (str) => {
  return str.replace(/\b\w/g, char => char.toUpperCase());
};

export default analyzeWasteWithGoogleVision;