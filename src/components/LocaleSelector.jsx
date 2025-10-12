import React, { useContext } from 'react';
import { motion } from 'framer-motion';
import { LocaleContext } from '../context/LocaleContext';

const LocaleSelector = () => {
  const { locale, changeLocale } = useContext(LocaleContext);

  const locales = [
    { id: 'germany', name: 'Germany', flag: '🇩🇪' },
    { id: 'india', name: 'India', flag: '🇮🇳' },
    { id: 'usa', name: 'USA', flag: '🇺🇸' }
  ];

  return (
    <motion.select
      className="bg-gray-800/80 backdrop-blur-sm border-2 border-gray-700 rounded-full px-3 md:px-4 py-2 font-medium text-white cursor-pointer text-sm md:text-base focus:outline-none focus:border-emerald-500 transition-colors font-['Playfair_Display']"
      value={locale}
      onChange={(e) => changeLocale(e.target.value)}
      whileHover={{ scale: 1.05, borderColor: '#10b981' }}
      whileTap={{ scale: 0.95 }}
    >
      {locales.map((loc) => (
        <option key={loc.id} value={loc.id} className="bg-gray-900">
          {loc.flag} {loc.name}
        </option>
      ))}
    </motion.select>
  );
};

export default LocaleSelector;
