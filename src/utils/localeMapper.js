export const getBinColor = (category, locale = 'germany') => {
  const binColors = {
    germany: {
      paper: '#3b82f6',
      plastics: '#fbbf24',
      bio: '#92400e',
      glass: '#10b981',
      residual: '#6b7280',
      ewaste: '#ef4444',
    },
    india: {
      paper: '#3b82f6',
      plastics: '#fbbf24',
      bio: '#10b981',
      glass: '#ffffff',
      residual: '#000000',
      ewaste: '#ef4444',
    },
    usa: {
      paper: '#3b82f6',
      plastics: '#3b82f6',
      bio: '#92400e',
      glass: '#3b82f6',
      residual: '#000000',
      ewaste: '#ef4444',
    }
  };

  return binColors[locale]?.[category] || '#6b7280';
};

export const getBinName = (category, locale = 'germany') => {
  const binNames = {
    germany: {
      paper: 'Blue Bin',
      plastics: 'Yellow Bin',
      bio: 'Brown Bin',
      glass: 'Green Igloo',
      residual: 'Gray Bin',
      ewaste: 'E-Waste Collection',
    },
    india: {
      paper: 'Blue Bin',
      plastics: 'Yellow Bin',
      bio: 'Green Bin (Wet)',
      glass: 'White Bin',
      residual: 'Black Bin (Dry)',
      ewaste: 'E-Waste Center',
    },
    usa: {
      paper: 'Blue Recycling',
      plastics: 'Blue Recycling',
      bio: 'Brown Compost',
      glass: 'Blue Recycling',
      residual: 'Black Trash',
      ewaste: 'Special Pickup',
    }
  };

  return binNames[locale]?.[category] || 'Unknown Bin';
};
