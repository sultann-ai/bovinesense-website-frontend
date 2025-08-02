import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { FaArrowRight, FaCode, FaBrain, FaRocket } from 'react-icons/fa';
import Hero from '../components/Hero';
import FoundersSection from '../components/about/FoundersSection';
import PartnersCarousel from '../components/PartnersCarousel';
import ServicesPreview from '../components/services/ServicesPreview';
import GradientHeading from '../components/reusables/GradientHeading';
import SectionHeading from '../components/reusables/SectionHeading';
import ValueCard from '../components/reusables/ValueCard';
import CustomButton from '../components/reusables/CustomButton';
import CTAWrapper from '../components/reusables/CTAWrapper';

const featuresData = [
  {
    title: 'Expert Development',
    description: 'Full-stack expertise in modern technologies and frameworks',
    icon: <FaCode className="w-8 h-8" />,
    gradient: 'from-blue-500 to-cyan-500',
    bgGradient: 'from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20'
  },
  {
    title: 'AI-Powered Solutions',
    description: 'Leveraging artificial intelligence to solve complex problems',
    icon: <FaBrain className="w-8 h-8" />,
    gradient: 'from-purple-500 to-pink-500',
    bgGradient: 'from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20'
  },
  {
    title: 'Scalable Architecture',
    description: 'Building solutions that grow with your business needs',
    icon: <FaRocket className="w-8 h-8" />,
    gradient: 'from-emerald-500 to-teal-500',
    bgGradient: 'from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20'
  }
];

const Home = () => {
  return (
    <>
      <Helmet>
        <title>ZyninLabs - AI-Powered Software Solutions</title>
        <meta name="description" content="Leading software company specializing in AI-powered solutions, custom development, and innovative digital experiences." />
      </Helmet>

      <div className="min-h-screen">
        {/* Hero Section */}
        <Hero />

        {/* Features Section */}
        <section className="py-20 ">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeading 
              title="Why Choose ZyninLabs?"
              tagline="We combine cutting-edge technology with creative innovation to deliver exceptional results"
              highlightText="ZyninLabs"
            />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {featuresData.map((feature, index) => (
                <ValueCard
                  key={index}
                  title={feature.title}
                  description={feature.description}
                  icon={feature.icon}
                  gradient={feature.gradient}
                  bgGradient={feature.bgGradient}
                  index={index}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Services Preview */}
        <ServicesPreview />

        {/* Founders Section */}
        <FoundersSection />

        {/* Partners Section */}
        <PartnersCarousel />

        {/* Enhanced CTA Section */}
        <CTAWrapper variant="home">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            {/* Glowing badge */}
            <div className="inline-flex items-center px-6 py-3 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border border-gray-200 dark:border-gray-600 rounded-full text-primary-600 dark:text-primary-400 text-sm font-medium">
              ✨ Transform Your Business Today
            </div>
            
            <GradientHeading 
              highlightText="Transform" 
              className="text-2xl md:text-3xl lg:text-4xl mb-6"
            >
              Ready to Transform Your Ideas?
            </GradientHeading>
            
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
              Let's collaborate to build innovative solutions that drive your business forward and unlock new possibilities
            </p>
            
            {/* Enhanced CTA button */}
            <CustomButton
              text="Get Started Today"
              rightIcon={<FaArrowRight />}
              href="/contact"
            />
            
            {/* Additional info */}
            <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-8 text-gray-500 dark:text-gray-400">
              <div className="flex items-center">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-3 animate-pulse"></div>
                Free consultation available
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-primary-500 rounded-full mr-3 animate-pulse" style={{ animationDelay: '0.5s' }}></div>
                24/7 support included
              </div>
            </div>
          </motion.div>
        </CTAWrapper>
      </div>
    </>
  );
};

export default Home;