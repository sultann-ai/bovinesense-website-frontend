import React, { useState, useEffect } from 'react';
import { foundersService } from '../../services/foundersService';
import { Founder } from '../../types';
import SectionHeading from '../reusables/SectionHeading';
import FounderCard from './FounderCard';

const FoundersSection = () => {
  const [founders, setFounders] = useState<Founder[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFounders = async () => {
      try {
        const data = await foundersService.getAll();
        setFounders(data);
      } catch (error) {
        console.error('Error fetching founders:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFounders();
  }, []);

  if (loading) {
    return (
      <section className="py-20 bg-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-300 rounded w-1/3 mx-auto mb-4"></div>
              <div className="h-4 bg-gray-300 rounded w-1/2 mx-auto mb-8"></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {[...Array(4)].map((_, index) => (
                <div key={index} className="animate-pulse">
                  <div className="w-32 h-32 bg-gray-300 rounded-full mx-auto mb-4"></div>
                  <div className="h-4 bg-gray-300 rounded w-3/4 mx-auto mb-2"></div>
                  <div className="h-3 bg-gray-300 rounded w-1/2 mx-auto mb-4"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-transparent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading 
          title="Meet Our Founders"
          tagline="Visionary leaders driving innovation in AI and software development"
          highlightText="Founders"
        />

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {founders.map((founder, index) => (
            <FounderCard
              key={founder._id}
              founder={founder}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FoundersSection;