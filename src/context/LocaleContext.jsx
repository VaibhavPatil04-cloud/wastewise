import React, { createContext, useState, useEffect } from 'react';

export const LocaleContext = createContext();

const LOCALE_CONFIG = {
  germany: {
    name: 'Germany',
    flag: '🇩🇪',
    bins: {
      paper: { color: '#3b82f6', name: 'Blue Bin' },
      plastics: { color: '#fbbf24', name: 'Yellow Bin' },
      bio: { color: '#92400e', name: 'Brown Bin' },
      glass: { color: '#10b981', name: 'Green Igloo' },
      residual: { color: '#6b7280', name: 'Gray Bin' },
      ewaste: { color: '#ef4444', name: 'E-Waste Collection' },
    },
    pickupDays: {
      paper: 'Every 2nd Wednesday',
      plastics: 'Every Thursday',
      bio: 'Monday & Friday',
      residual: 'Tuesday',
    }
  },
  india: {
    name: 'India',
    flag: '🇮🇳',
    bins: {
      paper: { color: '#3b82f6', name: 'Blue Bin' },
      plastics: { color: '#fbbf24', name: 'Yellow Bin' },
      bio: { color: '#10b981', name: 'Green Bin (Wet)' },
      glass: { color: '#ffffff', name: 'White Bin' },
      residual: { color: '#000000', name: 'Black Bin (Dry)' },
      ewaste: { color: '#ef4444', name: 'E-Waste Center' },
    },
    pickupDays: {
      bio: 'Daily',
      residual: 'Daily',
      plastics: 'Tuesday & Friday',
      paper: 'Wednesday',
    }
  },
  usa: {
    name: 'USA',
    flag: '🇺🇸',
    bins: {
      paper: { color: '#3b82f6', name: 'Blue Recycling' },
      plastics: { color: '#3b82f6', name: 'Blue Recycling' },
      bio: { color: '#92400e', name: 'Brown Compost' },
      glass: { color: '#3b82f6', name: 'Blue Recycling' },
      residual: { color: '#000000', name: 'Black Trash' },
      ewaste: { color: '#ef4444', name: 'Special Pickup' },
    },
    pickupDays: {
      residual: 'Monday & Thursday',
      paper: 'Wednesday',
      bio: 'Friday',
    }
  }
};

export const LocaleProvider = ({ children }) => {
  const [locale, setLocale] = useState('germany');

  useEffect(() => {
    const saved = localStorage.getItem('wastewise_locale');
    if (saved && LOCALE_CONFIG[saved]) {
      setLocale(saved);
    }
  }, []);

  const changeLocale = (newLocale) => {
    if (LOCALE_CONFIG[newLocale]) {
      setLocale(newLocale);
      localStorage.setItem('wastewise_locale', newLocale);
    }
  };

  const getBinInfo = (category) => {
    return LOCALE_CONFIG[locale]?.bins[category] || { color: '#6b7280', name: 'Unknown Bin' };
  };

  const getPickupDay = (category) => {
    return LOCALE_CONFIG[locale]?.pickupDays[category] || 'Check local schedule';
  };

  const value = {
    locale,
    changeLocale,
    localeConfig: LOCALE_CONFIG[locale],
    getBinInfo,
    getPickupDay,
    availableLocales: Object.keys(LOCALE_CONFIG),
  };

  return (
    <LocaleContext.Provider value={value}>
      {children}
    </LocaleContext.Provider>
  );
};
