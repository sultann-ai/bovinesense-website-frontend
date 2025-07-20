import { motion } from 'framer-motion';
import { FaArrowRight, FaPlay, FaStar, FaCode, FaBrain } from 'react-icons/fa';
import GradientHeading from './GradientHeading';
import CustomButton from './CustomButton';
import PerlinNoiseVisualizer from './PerlinNoiseVisualizer';

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-white via-primary-50 to-secondary-50 dark:from-gray-900 dark:via-blue-900 dark:to-purple-900">
      {/* Enhanced animated background elements */}
      <div className="absolute inset-0 bg-mesh-gradient opacity-30 dark:opacity-30"></div>
      
      {/* Floating particles */}
      <div className="absolute inset-0">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white/20 rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${3 + Math.random() * 4}s`
            }}
          />
        ))}
      </div>

      {/* Animated blobs */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-primary-500/20 to-secondary-500/20 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-3xl animate-bounce-slow" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-full blur-2xl animate-rotate-slow"></div>
      </div>

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px]"></div>
{/* @ts-ignore */}
      {/* <PerlinNoiseVisualizer
          red={0.21}
          green={0.4}
          blue={1.0}
          animationSpeed={1.5}
          noiseIntensity={25}
          bloomThreshold={0.4}
          bloomStrength={1.4}
          bloomRadius={0.08}
          showGUI={true} // Enable dat.gui controls
        /> */}

      {/* Content */}
      <div className="relative z-10 w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center px-4 py-2 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border border-gray-200 dark:border-gray-600 rounded-full text-primary-600 dark:text-primary-400 text-sm font-medium mb-8"
        >
          <FaStar className="mr-2 text-yellow-400" />
          Trusted by 50+ companies worldwide
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <GradientHeading highlightText="Future">
            Building the Future with AI
          </GradientHeading>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed">
            We specialize in AI-powered solutions, custom software development, and innovative digital experiences that <span className="text-primary-600 dark:text-primary-400 font-semibold">transform businesses</span>
          </p>
          
          {/* Enhanced CTA buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
            <CustomButton
              text="Get Started"
              rightIcon={<FaArrowRight />}
              href="/contact"
            />
            
            <CustomButton
              text="View Our Work"
              leftIcon={<FaPlay />}
              href="/work"
              outlined={true}
            />
          </div>

          {/* Tech stack icons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex justify-center items-center gap-8 mb-12"
          >
            {[FaCode, FaBrain].map((Icon, index) => (
              <div
                key={index}
                className="w-16 h-16 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border border-gray-200 dark:border-gray-600 rounded-2xl flex items-center justify-center group hover:bg-white dark:hover:bg-gray-700 transition-all duration-300"
              >
                <Icon className="text-2xl text-gray-600 dark:text-gray-300 group-hover:text-primary-600 dark:group-hover:text-primary-400 group-hover:scale-110 transition-all duration-300" />
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* Enhanced floating stats */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8"
        >
          {[
            { number: '50+', label: 'Projects Completed' },
            { number: '25+', label: 'Happy Clients' },
            { number: '5+', label: 'Years Experience' },
            { number: '10+', label: 'AI Solutions' }
          ].map((stat, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              className="group text-center bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border border-gray-200 dark:border-gray-600 rounded-2xl p-6 hover:bg-white dark:hover:bg-gray-700 transition-all duration-300"
            >
              <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent mb-2 group-hover:scale-110 transition-transform">
                {stat.number}
              </div>
              <div className="text-sm md:text-base text-gray-600 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white transition-colors">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-gray-50 dark:from-gray-900 to-transparent"></div>
    </section>
  );
};

export default Hero;