import React, { useContext } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { LocaleContext } from '../context/LocaleContext';
import { wasteItems } from '../utils/wasteData';
import '../styles/FeaturedCards.css';

const FeaturedCards = () => {
  const { getBinInfo } = useContext(LocaleContext);
  const navigate = useNavigate();

  return (
    <section className="px-4 py-8 md:py-12 max-w-7xl mx-auto mb-20 md:mb-8">
      <motion.h3 
        className="text-2xl md:text-4xl font-bold text-emerald-400 mb-6 md:mb-8 text-center font-['Playfair_Display']"
        data-aos="fade-down"
        data-aos-duration="800"
      >
        Common Items
      </motion.h3>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
        {wasteItems.slice(0, 8).map((item, idx) => {
          const binInfo = getBinInfo(item.category);
          
          return (
            <motion.div
              key={item.id}
              className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl shadow-lg shadow-emerald-500/10 overflow-hidden cursor-pointer border border-gray-700 hover:border-emerald-500/50 transition-all"
              data-aos="fade-up"
              data-aos-delay={idx * 50}
              data-aos-duration="800"
              whileHover={{ 
                y: -10, 
                boxShadow: "0 25px 50px rgba(16, 185, 129, 0.2)",
                scale: 1.03,
                borderColor: "rgba(16, 185, 129, 0.8)"
              }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              onClick={() => navigate(`/item/${item.id}`)}
            >
              <div className="relative h-40 md:h-48 overflow-hidden bg-gradient-to-br from-gray-700 to-gray-800">
                <img 
                  src={item.image} 
                  alt={item.name}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-110 opacity-80"
                />
                <div className="absolute top-3 right-3 text-4xl md:text-5xl drop-shadow-lg filter brightness-110">
                  {item.icon}
                </div>
              </div>
              
              <div className="p-4 md:p-5">
                <h4 className="text-lg md:text-xl font-bold text-white mb-2 line-clamp-1 font-['Playfair_Display']">
                  {item.name}
                </h4>
                
                <motion.span
                  className="inline-block px-3 md:px-4 py-1.5 md:py-2 rounded-full text-white text-xs md:text-sm font-semibold shadow-md font-['Playfair_Display']"
                  style={{ backgroundColor: binInfo.color }}
                  whileHover={{ scale: 1.08 }}
                  transition={{ duration: 0.2 }}
                >
                  {binInfo.name}
                </motion.span>

                {item.contamination && (
                  <div className="mt-2 flex items-center gap-1 text-xs text-amber-400 font-['Playfair_Display']">
                    <span>⚠️</span>
                    <span className="font-medium">Special handling</span>
                  </div>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>

      <motion.div 
        className="text-center mt-8 md:mt-12"
        data-aos="fade-up"
        data-aos-delay="400"
        data-aos-duration="800"
      >
        <motion.button
          className="bg-gradient-to-r from-emerald-500 to-green-600 text-white px-6 md:px-8 py-3 md:py-4 rounded-full font-semibold text-sm md:text-base shadow-lg shadow-emerald-500/30 font-['Playfair_Display']"
          whileHover={{ 
            scale: 1.05, 
            boxShadow: "0 15px 30px rgba(16, 185, 129, 0.4)",
            backgroundImage: "linear-gradient(to right, #059669, #047857)"
          }}
          whileTap={{ scale: 0.95 }}
        >
          View All Items →
        </motion.button>
      </motion.div>
    </section>
  );
};

export default FeaturedCards;
