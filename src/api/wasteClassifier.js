// Placeholder for AI classification API integration
// Replace with actual Azure Computer Vision, OpenAI Vision, or Google Cloud Vision calls

export const classifyWaste = async (imageBase64, locale) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1500));

  // Mock AI response - Replace with actual API call
  // Example:
  // const response = await fetch('YOUR_AI_ENDPOINT', {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify({ image: imageBase64, locale })
  // });
  // return await response.json();

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

  // Return random mock result
  return mockResults[Math.floor(Math.random() * mockResults.length)];
};

export const lookupBarcode = async (barcode, locale) => {
  // Simulate database lookup
  await new Promise(resolve => setTimeout(resolve, 800));

  const barcodeDatabase = {
    '5449000000996': {
      name: 'Coca-Cola Bottle',
      category: 'plastics',
      contaminated: false,
      preparation: ['Rinse bottle', 'Remove cap', 'Recycle cap separately'],
      upcyclingTip: 'Use as water bottle holder or craft material'
    },
    '012000161551': {
      name: 'Sprite Can',
      category: 'plastics',
      contaminated: false,
      preparation: ['Rinse can', 'Crush to save space'],
      upcyclingTip: 'Use for small storage or craft projects'
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

// Integration example for Azure Computer Vision
export const classifyWithAzure = async (imageBase64) => {
  const endpoint = 'YOUR_AZURE_ENDPOINT';
  const key = 'YOUR_AZURE_KEY';

  try {
    const response = await fetch(`${endpoint}/vision/v3.2/analyze?visualFeatures=Tags,Description`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Ocp-Apim-Subscription-Key': key
      },
      body: JSON.stringify({ url: imageBase64 })
    });

    const data = await response.json();
    // Process Azure response and map to waste categories
    return data;
  } catch (error) {
    console.error('Azure classification error:', error);
    throw error;
  }
};
