import React, { useContext } from 'react';
import { motion } from 'framer-motion';
import { useParams, useNavigate } from 'react-router-dom';
import { LocaleContext } from '../context/LocaleContext';
import { wasteItems } from '../utils/wasteData';

const ItemDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getBinInfo, getPickupDay } = useContext(LocaleContext);
  
  const item = wasteItems.find(i => i.id === parseInt(id));

  if (!item) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl text-gray-600">Item not found</p>
      </div>
    );
  }

  const binInfo = getBinInfo(item.category);
  const pickupDay = getPickupDay(item.category);

  return (
    <div className="min-h-screen pb-8">
      <motion.div
        className="sticky top-0 z-50 bg-white/90 backdrop-blur-md shadow-sm px-4 py-3 flex items-center gap-4"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
      >
        <motion.button
          onClick={() => navigate(-1)}
          className="text-2xl"
          whileHover={{ scale: 1.1, x: -4 }}
          whileTap={{ scale: 0.9 }}
        >
          ←
        </motion.button>
        <h1 className="text-xl font-bold text-gray-800">Item Details</h1>
      </motion.div>

      <div className="max-w-4xl mx-auto px-4 py-6">
        <motion.div
          className="relative h-64 md:h-96 rounded-3xl overflow-hidden mb-6 shadow-xl"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
        >
          <img 
            src={item.image} 
            alt={item.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-4 right-4 text-6xl drop-shadow-lg">
            {item.icon}
          </div>
        </motion.div>

        <motion.h2 
          className="text-3xl md:text-4xl font-bold text-gray-800 mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          {item.name}
        </motion.h2>

        <motion.div
          className="flex flex-wrap gap-3 mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <span
            className="px-5 py-2.5 rounded-full text-white font-semibold shadow-md"
            style={{ backgroundColor: binInfo.color }}
          >
            {binInfo.name}
          </span>
          <span className="px-5 py-2.5 rounded-full bg-gray-100 text-gray-700 font-medium">
            {item.category.charAt(0).toUpperCase() + item.category.slice(1)}
          </span>
          {item.contamination && (
            <span className="px-5 py-2.5 rounded-full bg-amber-100 text-amber-700 font-medium">
              ⚠️ Special Handling
            </span>
          )}
        </motion.div>

        <motion.div
          className="bg-blue-50 border-l-4 border-blue-500 p-5 rounded-r-xl mb-6"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
        >
          <p className="font-semibold text-blue-800 mb-1">Pickup Schedule</p>
          <p className="text-blue-700">{pickupDay}</p>
        </motion.div>

        <motion.div
          className="bg-white rounded-2xl shadow-lg p-6 mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <h3 className="text-xl font-bold text-primary mb-4 flex items-center gap-2">
            <span>📋</span>
            Preparation Steps
          </h3>
          <ul className="space-y-3">
            {item.preparation.map((step, idx) => (
              <motion.li
                key={idx}
                className="flex items-start gap-3 bg-gray-50 p-4 rounded-lg"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 + idx * 0.1 }}
              >
                <span className="text-primary font-bold text-xl">✓</span>
                <span className="text-gray-700 flex-1">{step}</span>
              </motion.li>
            ))}
          </ul>
        </motion.div>

        {item.upcyclingTip && (
          <motion.div
            className="bg-gradient-to-br from-emerald-50 to-green-50 rounded-2xl shadow-lg p-6 border-2 border-emerald-200"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
          >
            <h3 className="text-xl font-bold text-emerald-700 mb-3 flex items-center gap-2">
              <span className="text-2xl">💡</span>
              Upcycling Idea
            </h3>
            <p className="text-gray-700 leading-relaxed text-lg">
              {item.upcyclingTip}
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default ItemDetail;
