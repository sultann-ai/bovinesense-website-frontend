import { useState, useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion, useScroll, useTransform } from 'framer-motion';
import { servicesService } from '../services/servicesService';
import { Service } from '../types';
import ServiceCard from '../components/services/ServiceCard';
import HeroBgWrapper from '../components/common/HeroBgWrapper';
import GradientHeading from '../components/reusables/GradientHeading';

const Services = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const data = await servicesService.getAll();
        setServices(data);
      } catch (error) {
        console.error('Error fetching services:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="animate-pulse">
            <div className="h-12 bg-gray-300 rounded w-1/3 mx-auto mb-4"></div>
            <div className="h-6 bg-gray-300 rounded w-1/2 mx-auto mb-12"></div>
            <div className="space-y-12">
              {[...Array(3)].map((_, index) => (
                <div key={index}>
                  <div className="h-8 bg-gray-300 rounded w-1/4 mb-8"></div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[...Array(3)].map((_, cardIndex) => (
                      <div key={cardIndex} className="h-64 bg-gray-300 rounded-xl"></div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Our Services - BovineSense</title>
        <meta name="description" content="Comprehensive AI-powered solutions and custom software development services by BovineSense." />
      </Helmet>

      <div ref={containerRef} className="overflow-hidden">
        {/* Enhanced Hero Section with Parallax */}
        <HeroBgWrapper>
          <motion.div
            style={{ y, opacity }}
            className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, type: "spring", stiffness: 100 }}
            >
              <motion.div
                initial={{ opacity: 0, y: 100 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.2 }}
              >
                <GradientHeading
                  highlightText="Services"
                  className="font-black mb-8"
                >
                  Our Services
                </GradientHeading>
              </motion.div>

              <motion.p
                className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-5xl mx-auto leading-relaxed mb-12"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.4 }}
              >
                Comprehensive solutions to transform your business with cutting-edge technology
              </motion.p>
            </motion.div>
          </motion.div>
        </HeroBgWrapper>

        {/* Services Sections */}
        <section className="py-20 pt-10 bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-blue-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {services.map((serviceCategory, categoryIndex) => (
              <motion.div
                key={serviceCategory._id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
                className="mb-16"
              >
                <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary-600 via-secondary-600 to-primary-700 bg-clip-text text-transparent mb-8 text-center">
                  {serviceCategory.category}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {serviceCategory.services.map((service, serviceIndex) => (
                    <ServiceCard
                      key={serviceIndex}
                      service={service}
                      delay={serviceIndex * 0.1}
                      features={service.features}
                    />
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      </div>
    </>
  );
};

export default Services;