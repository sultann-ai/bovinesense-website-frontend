import React, { useRef, ReactNode } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion, useScroll, useTransform} from 'framer-motion';
import FoundersSection from '../components/about/FoundersSection';
import TeamSection from '../components/about/TeamSection';
import GradientHeading from '../components/reusables/GradientHeading';
import SectionHeading from '../components/reusables/SectionHeading';
import CustomButton from '../components/reusables/CustomButton';
import HeroBgWrapper from '../components/common/HeroBgWrapper';
import ValueCard from '../components/reusables/ValueCard';
import CTAWrapper from '../components/reusables/CTAWrapper';

// Type definitions
interface FloatingCardProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

// Custom components for enhanced design
const FloatingCard: React.FC<FloatingCardProps> = ({ children, className = "", delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 50, rotateX: 20 }}
    whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
    whileHover={{
      y: -10,
      rotateX: 5,
      rotateY: 5,
      transition: { duration: 0.3 }
    }}
    transition={{
      duration: 0.8,
      delay,
      type: "spring",
      stiffness: 100,
      damping: 20
    }}
    className={`bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border border-white/20 dark:border-gray-700/30 rounded-3xl shadow-2xl shadow-black/20 dark:shadow-black/40 hover:shadow-3xl hover:shadow-black/30 dark:hover:shadow-black/60 transform-gpu ${className}`}
  >
    {children}
  </motion.div>
);


const About = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <>
      <Helmet>
        <title>About Us - ZyninLabs | Innovation at its Core</title>
        <meta name="description" content="Discover ZyninLabs' revolutionary approach to AI-powered solutions, our visionary team, and the cutting-edge technology that's reshaping the future of business." />
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
                  highlightText="ZyninLabs"
                  className="font-black mb-8"
                >
                  About ZyninLabs
                </GradientHeading>
              </motion.div>

              <motion.p
                className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-5xl mx-auto leading-relaxed mb-12"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.4 }}
              >
                We're not just innovators—we're digital architects crafting the future of technology,
                one revolutionary solution at a time
              </motion.p>

              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="flex flex-wrap justify-center gap-6"
              >
                <CustomButton
                  text="Discover Our Story"
                  className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-full "
                />
                <CustomButton
                  text="Meet the Team"
                  outlined={true}
                  className="rounded-full "
                />
              </motion.div>
            </motion.div>
          </motion.div>
        </HeroBgWrapper>

        {/* Rest of the sections */}
        <div className="bg-transparent">
          {/* Enhanced Mission & Vision */}
          <section className="py-32 relative">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <SectionHeading
                  title="Our Purpose"
                  tagline="Driving transformation through innovation and excellence"
                  highlightText="Purpose"
                />
              </motion.div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                <FloatingCard className="p-12 h-full" delay={0.2}>
                  <div className="flex max-sm:flex-col max-sm:items-center max-sm:gap-5 items-start sm:space-x-6">
                    <div className="flex-shrink-0">
                      <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-2xl">
                        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-3xl max-sm:text-center font-bold text-gray-900 dark:text-white mb-6">Our Mission</h3>
                      <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
                        To revolutionize the digital landscape by empowering businesses with cutting-edge AI solutions,
                        custom software development, and innovative technologies that drive unprecedented growth and efficiency.
                      </p>
                      <div className="space-y-3">
                        {[
                          "AI-Powered Innovation",
                          "Custom Solutions",
                          "Digital Transformation",
                          "Business Growth"
                        ].map((item, index) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="flex items-center space-x-3"
                          >
                            <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full"></div>
                            <span className="text-gray-700 dark:text-gray-300 font-medium">{item}</span>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </div>
                </FloatingCard>

                <FloatingCard className="p-6 sm:p-12 h-full" delay={0.4}>
                  <div className="flex items-start sm:space-x-6 max-sm:flex-col max-sm:items-center max-sm:gap-5 ">
                    <div className="flex-shrink-0">
                      <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center shadow-2xl">
                        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-3xl max-sm:text-center font-bold text-gray-900 dark:text-white mb-6">Our Vision</h3>
                      <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
                        To become the global leader in AI-driven software development, setting new industry standards
                        for innovation, quality, and transformative technology solutions that shape the future.
                      </p>
                      <div className="space-y-3">
                        {[
                          "Global Technology Leadership",
                          "Future-Ready Solutions",
                          "Industry Innovation",
                          "Sustainable Impact"
                        ].map((item, index) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="flex items-center space-x-3"
                          >
                            <div className="w-2 h-2 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full"></div>
                            <span className="text-gray-700 dark:text-gray-300 font-medium">{item}</span>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </div>
                </FloatingCard>
              </div>
            </div>
          </section>

          {/* Enhanced Values Section */}
          <section className="py-32 relative">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <SectionHeading
                  title="Core Values That Drive Us"
                  tagline="The fundamental principles that shape our culture, guide our decisions, and define our commitment to excellence"
                  highlightText="Drive"
                />
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {coreValuesData.map((value, index) => (
                  <ValueCard
                    key={index}
                    title={value.title}
                    description={value.description}
                    icon={value.icon}
                    gradient={value.gradient}
                    bgGradient={value.bgGradient}
                    index={index}
                  />
                ))}
              </div>
            </div>
          </section>


          {/* Founders Section */}
          <FoundersSection />

          {/* Journey Timeline Section */}
          {/* <OurJourney /> */}

          {/* Call to Action Section */}
          <CTAWrapper variant="about">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <GradientHeading
                highlightText="Transform"
                className="text-2xl md:text-3xl lg:text-4xl font-black mb-8"
              >
                Ready to Transform Your Business?
              </GradientHeading>
              <p className="text-lg md:text-2xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto mb-12 leading-relaxed">
                Join hundreds of satisfied clients who have revolutionized their operations with our innovative solutions.
                Let's build the future together.
              </p>

              <div className="flex flex-wrap justify-center gap-6">
                <CustomButton
                  text="Start Your Journey"
                  className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-full "
                />
                <CustomButton
                  text="Schedule Consultation"
                  outlined={true}
                  className="rounded-full "
                />
              </div>
            </motion.div>
          </CTAWrapper>


          {/* Team Section */}
          <TeamSection />
        </div>
      </div>
    </>
  );
};

export default About;

const coreValuesData = [
  {
    title: 'Innovation Excellence',
    description: 'We push the boundaries of what\'s possible, embracing cutting-edge technologies and creative solutions to deliver revolutionary results.',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    ),
    gradient: 'from-blue-500 to-cyan-500',
    bgGradient: 'from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20'
  },
  {
    title: 'Quality Obsession',
    description: 'We maintain uncompromising standards in every aspect of our work, ensuring perfection that exceeds expectations and drives success.',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
      </svg>
    ),
    gradient: 'from-purple-500 to-pink-500',
    bgGradient: 'from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20'
  },
  {
    title: 'Collaborative Spirit',
    description: 'We believe in the power of partnership, working closely with clients and team members to achieve extraordinary outcomes together.',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
    gradient: 'from-green-500 to-emerald-500',
    bgGradient: 'from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20'
  },
  {
    title: 'Continuous Learning',
    description: 'We foster a culture of growth and curiosity, constantly evolving our skills and knowledge to stay ahead of industry trends.',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    ),
    gradient: 'from-orange-500 to-red-500',
    bgGradient: 'from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20'
  },
  {
    title: 'Client Success',
    description: 'Your success is our mission. We go above and beyond to ensure every project delivers measurable value and lasting impact.',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
      </svg>
    ),
    gradient: 'from-indigo-500 to-purple-500',
    bgGradient: 'from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20'
  },
  {
    title: 'Future Vision',
    description: 'We think beyond today, anticipating tomorrow\'s challenges and opportunities to build solutions that stand the test of time.',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
      </svg>
    ),
    gradient: 'from-teal-500 to-blue-500',
    bgGradient: 'from-teal-50 to-blue-50 dark:from-teal-900/20 dark:to-blue-900/20'
  }
];
