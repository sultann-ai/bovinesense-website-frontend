import { motion } from 'framer-motion';
import { FaArrowRight } from 'react-icons/fa';
import ServiceCard from './ServiceCard';
import SectionHeading from './SectionHeading';
import CustomButton from './CustomButton';

const ServicesPreview = () => {
  const services = [
    {
      icon: 'FaCode',
      title: 'Custom Software Development',
      description: 'Full-stack development solutions tailored to your business needs'
    },
    {
      icon: 'FaRocket',
      title: 'AI Automation',
      description: 'Automate your business processes with intelligent AI-driven solutions'
    },
    {
      icon: 'FaBrain',
      title: 'AI & Machine Learning',
      description: 'Intelligent solutions powered by cutting-edge AI technology'
    }    
  ];

  const serviceFeatures = [
    ['Web Applications', 'Mobile Apps', 'Enterprise Solutions', 'API Development'],
    ['AI Agents', 'Workflow Automation', 'Intelligent Chatbots', 'Process Optimization'],
    ['ML Model Development', 'Computer Vision', 'NLP Applications', 'Predictive Analytics']
  ];

  return (
    <section className="py-20 bg-transparent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="Our Services"
          tagline="Comprehensive solutions to accelerate your digital transformation"
          highlightText="Services"
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {services.map((service, index) => (
            <ServiceCard
              key={index}
              service={service}
              delay={index * 0.1}
              features={serviceFeatures[index]}
            />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <CustomButton
            text="View All Services"
            rightIcon={<FaArrowRight />}
            href="/services"
            className="rounded-2xl bg-gradient-to-r from-primary-600 via-blue-600 to-secondary-600"
          />
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesPreview;