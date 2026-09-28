import React from 'react';
import { Link } from 'react-router-dom';
import { FaLinkedin, FaTwitter, FaGithub, FaEnvelope } from 'react-icons/fa';
import { useTheme } from '../../contexts/ThemeContext';

const Footer = () => {
  const { theme } = useTheme();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-charcoal text-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-[8.5rem] rounded-lg flex items-center justify-center">
                <img 
                  src={'/whiteLogo.png'}
                  alt="BovineSense Logo"
                  className="w-full h-full object-contain"
                />
              </div>
            </div>
            <p className="text-cream mb-4 max-w-md">
              Pioneering AI-powered solutions and custom software development. 
              We transform ideas into innovative digital experiences.
            </p>
            <div className="flex space-x-4">
              <Link to={'https://www.linkedin.com/company/zynin/'} target='_blank' className="text-cream hover:underline underline-offset-4">
                <FaLinkedin size={20} />
              </Link>
              {/* <a href="#" className="text-cream hover:underline underline-offset-4">
                <FaTwitter size={20} />
              </a>
              <a href="#" className="text-cream hover:underline underline-offset-4">
                <FaGithub size={20} />
              </a> */}
                  <a href="mailto:info@bovinehq.com" className="text-cream hover:underline underline-offset-4">
                <FaEnvelope size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/about" className="text-cream hover:underline underline-offset-4">About Us</Link></li>
              <li><Link to="/services" className="text-cream hover:underline underline-offset-4">Services</Link></li>
              <li><Link to="/work" className="text-cream hover:underline underline-offset-4">Our Work</Link></li>
              <li><Link to="/products" className="text-cream hover:underline underline-offset-4">Products</Link></li>
              <li><Link to="/blog" className="text-cream hover:underline underline-offset-4">Blog</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <ul className="space-y-2 text-cream">
              <li>info@bovinehq.com</li>
              <li>+92 307 9911776</li>
              <li>+92 329 2775557</li>
              <li>Islamabad, Pakistan</li>
              {/* <li>Tech City, TC 12345</li> */}
            </ul>
          </div>
        </div>

        <div className="border-t border-hairline-dark mt-8n pt-8 text-center text-cream">
          <p>&copy; {currentYear} BovineSense. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;