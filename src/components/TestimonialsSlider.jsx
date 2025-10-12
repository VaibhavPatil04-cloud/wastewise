import React from 'react';
import { motion } from 'framer-motion';
import '../styles/TestimonialsSlider.css';

const TestimonialsSlider = () => {
  const testimonials = [
    {
      id: 1,
      name: 'Sarah Johnson',
      role: 'Environmental Activist',
      image: 'https://i.pravatar.cc/150?img=1',
      text: 'WasteWise has transformed how our community handles recycling. The AI recognition is incredibly accurate!',
      rating: 5
    },
    {
      id: 2,
      name: 'Michael Chen',
      role: 'Sustainability Manager',
      image: 'https://i.pravatar.cc/150?img=13',
      text: 'Finally, a tool that makes waste sorting simple. Our office recycling improved by 80% in just one month.',
      rating: 5
    },
    {
      id: 3,
      name: 'Priya Sharma',
      role: 'College Student',
      image: 'https://i.pravatar.cc/150?img=5',
      text: 'Perfect for students! I learned so much about proper disposal and even started upcycling projects.',
      rating: 5
    },
    {
      id: 4,
      name: 'James Wilson',
      role: 'Restaurant Owner',
      image: 'https://i.pravatar.cc/150?img=12',
      text: 'The upcycling tips are brilliant. We reduced our waste by 60% and saved money on disposal costs.',
      rating: 5
    },
    {
      id: 5,
      name: 'Maria Garcia',
      role: 'Mom & Blogger',
      image: 'https://i.pravatar.cc/150?img=9',
      text: 'Teaching my kids about recycling was never easier. They love scanning items and learning where they go!',
      rating: 5
    },
    {
      id: 6,
      name: 'David Kim',
      role: 'Tech Enthusiast',
      image: 'https://i.pravatar.cc/150?img=14',
      text: 'The AI technology behind this is impressive. Quick, accurate, and the UI is beautiful!',
      rating: 5
    },
  ];

  // Duplicate for infinite scroll effect
  const duplicatedTestimonials = [...testimonials, ...testimonials];

  return (
    <section className="testimonials-section">
      <motion.h2 
        className="testimonials-title"
        data-aos="fade-up"
      >
        Loved by Eco-Warriors Worldwide
      </motion.h2>

      <div className="testimonials-track-container">
        <motion.div
          className="testimonials-track"
          animate={{
            x: [0, -50 * testimonials.length + '%'],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: 'linear',
          }}
        >
          {duplicatedTestimonials.map((testimonial, idx) => (
            <div key={`${testimonial.id}-${idx}`} className="testimonial-card">
              <div className="testimonial-header">
                <img 
                  src={testimonial.image} 
                  alt={testimonial.name}
                  className="testimonial-avatar"
                />
                <div className="testimonial-info">
                  <h4 className="testimonial-name">{testimonial.name}</h4>
                  <p className="testimonial-role">{testimonial.role}</p>
                </div>
              </div>
              
              <div className="testimonial-stars">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <span key={i} className="star">★</span>
                ))}
              </div>
              
              <p className="testimonial-text">{testimonial.text}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default TestimonialsSlider;
