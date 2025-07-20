import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { partnersService } from '../services/partnersService';
import { Partner } from '../types';
import SectionHeading from './SectionHeading';

const PartnersCarousel = () => {
  const [partners, setPartners] = useState<Partner[]>([]);
  const [loading, setLoading] = useState(true);
  

  useEffect(() => {
    const fetchPartners = async () => {
      try {
        const data = await partnersService.getAll();
        setPartners(data);
      } catch (error) {
        console.error('Error fetching partners:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPartners();
  }, []);

  if (loading || partners.length === 0) {
    return null;
  }

  return (
    <section className="py-20 bg-transparent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading 
          title="Strategic Partners"
          tagline="Trusted by leading organizations worldwide"
          highlightText="Strategic"
        />

        <div className="relative overflow-hidden">
          <motion.div
            className="flex space-x-12"
            animate={{
              x: ['0%', '-50%'],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: 'linear',
            }}
          >
            {[...partners, ...partners].map((partner, index) => (
              <div
                key={`${partner._id}-${index}`}
                className="flex-shrink-0 w-48 h-24 bg-transparent dark:bg-gray-900 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 flex items-center justify-center group"
              >
                <img
                  src={partner.logo}
                  alt={partner.name}
                  className="max-w-full max-h-full object-contain filter grayscale group-hover:grayscale-0 transition-all duration-300"
                />
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default PartnersCarousel;