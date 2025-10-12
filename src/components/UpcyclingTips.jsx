import React from 'react';
import { motion } from 'framer-motion';
import { upcyclingIdeas } from '../utils/wasteData';

const UpcyclingTips = () => {
  const difficultyColors = {
    Easy: 'bg-green-100 text-green-700',
    Medium: 'bg-yellow-100 text-yellow-700',
    Hard: 'bg-red-100 text-red-700'
  };

  return (
    <div className="min-h-screen pb-20">
      <motion.header
        className="sticky top-0 z-50 bg-white/90 backdrop-blur-md shadow-sm px-4 py-4"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
      >
        <h1 className="text-2xl font-bold text-primary">💡 Upcycling Ideas</h1>
        <p className="text-sm text-gray-600 mt-1">Turn waste into wonderful creations</p>
      </motion.header>

      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {upcyclingIdeas.map((idea, idx) => (
            <motion.div
              key={idea.id}
              className="bg-white rounded-2xl shadow-lg overflow-hidden"
              data-aos="fade-up"
              data-aos-delay={idx * 100}
              whileHover={{ y: -8, boxShadow: '0 20px 40px rgba(0,0,0,0.15)' }}
            >
              <div className="relative h-48 overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200">
                <img
                  src={idea.image}
                  alt={idea.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="p-5">
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  {idea.title}
                </h3>
                
                <p className="text-sm text-gray-600 mb-3">
                  Using: {idea.item}
                </p>

                <div className="flex gap-2 mb-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${difficultyColors[idea.difficulty]}`}>
                    {idea.difficulty}
                  </span>
                  <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-semibold">
                    ⏱️ {idea.duration}
                  </span>
                </div>

                <div className="space-y-2">
                  <p className="font-semibold text-gray-700 text-sm">Steps:</p>
                  <ol className="list-decimal list-inside space-y-1 text-sm text-gray-600">
                    {idea.steps.slice(0, 3).map((step, i) => (
                      <li key={i}>{step}</li>
                    ))}
                  </ol>
                  {idea.steps.length > 3 && (
                    <p className="text-xs text-gray-500 italic">
                      +{idea.steps.length - 3} more steps...
                    </p>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UpcyclingTips;
