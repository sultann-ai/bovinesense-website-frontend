import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaMoon, FaSun, FaBars, FaTimes } from 'react-icons/fa';
import { useTheme } from '../../contexts/ThemeContext';

const Navbar = () => {
  const { theme, toggleTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Services', path: '/services' },
    { name: 'Work', path: '/work' },
    { name: 'Products', path: '/products' },
    { name: 'Blog', path: '/blog' },
    { name: 'Recognitions', path: '/recognitions' },
    { name: 'Contact', path: '/contact' }
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled 
          ? 'bg-white/70 dark:bg-[#0a1b33]/90 backdrop-blur-xl border-b border-white/20 dark:border-[#1b3a61] shadow-2xl shadow-black/5 dark:shadow-black/30' 
          : 'bg-white/30 dark:bg-[#071426]/85 backdrop-blur-2xl border-b border-white/10 dark:border-[#1b3a61]/70'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, type: "spring", stiffness: 100, damping: 20 }}
    >
      {/* Glassmorphism Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-pink-500/5 dark:from-[#163b68]/40 dark:via-[#0d2b4f]/30 dark:to-[#071426]/20" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="flex justify-between items-center py-3 md:py-5 ">
          {/* Enhanced Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <motion.div 
              className="relative w-[8.5rem] rounded-xl flex items-center justify-center "
              whileHover={{ 
                scale: 1.1, 
                rotate: 5
              }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <img 
                src={theme === 'light' ? '/blackLogo.png' : '/whiteLogo.png'}
                alt="BovineSense Logo"
                className="w-full h-full object-contain "
              />
            </motion.div>
          </Link>

          {/* Enhanced Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-2">
            {navItems.map((item, index) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Link
                  to={item.path}
                  className={`relative px-6 py-3 text-sm font-semibold transition-all duration-300 rounded-xl group focus:outline-none ${
                    location.pathname === item.path
                      ? 'text-blue-600 dark:text-blue-400'
                      : 'text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-300 hover:bg-white/20 dark:hover:bg-[#102746]/70 hover:backdrop-blur-md hover:shadow-md hover:border hover:border-white/20 dark:hover:border-[#2b527e]'
                  }`}
                >
                  <span className="relative z-10">{item.name}</span>

                  {/* Hover effect background (only for non-active items) */}
                  {location.pathname !== item.path && (
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-pink-500/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  )}
                  
                  {/* Active underline indicator */}
                  {location.pathname === item.path && (
                    <motion.div
                      layoutId="activeIndicator"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500"
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Enhanced Theme Toggle & Mobile Menu */}
          <div className="flex items-center space-x-3">
            <motion.button
              onClick={toggleTheme}
                  className="p-3 rounded-xl bg-white/30 dark:bg-[#102746]/80 backdrop-blur-md border border-white/20 dark:border-[#1b3a61] text-gray-700 dark:text-gray-300 hover:bg-white/50 dark:hover:bg-[#17345a] hover:shadow-lg transition-all duration-300 group"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div
                initial={false}
                animate={{ rotate: theme === 'light' ? 0 : 180 }}
                transition={{ duration: 0.5, type: "spring" }}
              >
                {theme === 'light' ? 
                  <FaMoon size={18} className="group-hover:text-blue-500 transition-colors" /> : 
                  <FaSun size={18} className="group-hover:text-yellow-500 transition-colors" />
                }
              </motion.div>
            </motion.button>

            {/* Enhanced Mobile Menu Button */}
            <motion.button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-3 rounded-xl bg-white/30 dark:bg-[#102746]/80 backdrop-blur-md border border-white/20 dark:border-[#1b3a61] text-gray-700 dark:text-gray-300 hover:bg-white/50 dark:hover:bg-[#17345a] hover:shadow-lg transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div
                initial={false}
                animate={{ rotate: isMenuOpen ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                {isMenuOpen ? <FaTimes size={18} /> : <FaBars size={18} />}
              </motion.div>
            </motion.button>
          </div>
        </div>
      </div>
      {/* Enhanced Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0, y: -20 }}
            animate={{ opacity: 1, height: 'auto', y: 0 }}
            exit={{ opacity: 0, height: 0, y: -20 }}
            transition={{ duration: 0.4, type: "spring", stiffness: 100 }}
            className="md:hidden bg-white/80 dark:bg-[#0a1b33]/95 backdrop-blur-xl border-t border-white/20 dark:border-[#1b3a61] shadow-2xl"
          >
            {/* Mobile menu gradient background */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-pink-500/5 dark:from-[#163b68]/40 dark:via-[#0d2b4f]/30 dark:to-[#071426]/20" />
            
            <div className="px-6 py-6 space-y-2 relative">
              {navItems.map((item, index) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <Link
                    to={item.path}
                    onClick={() => setIsMenuOpen(false)}
                    className={`block px-6 py-4 text-lg font-semibold rounded-xl transition-all duration-300 focus:outline-none ${
                      location.pathname === item.path
                        ? 'text-blue-600 dark:text-blue-400 bg-white/50 dark:bg-gray-800/50 backdrop-blur-md shadow-lg border border-white/30 dark:border-gray-700/30'
                        : 'text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-white/30 dark:hover:bg-gray-800/30 hover:backdrop-blur-md hover:shadow-md'
                    }`}
                  >
                    <span className="relative z-10">{item.name}</span>
                    {location.pathname === item.path && (
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 rounded-xl" />
                    )}
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;