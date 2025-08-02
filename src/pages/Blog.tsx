import { useState, useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion, useScroll, useTransform } from 'framer-motion';
import { blogService } from '../services/blogService';
import { BlogPost } from '../types';
import BlogCard from '../components/blog/BlogCard';
import HeroBgWrapper from '../components/common/HeroBgWrapper';
import GradientHeading from '../components/reusables/GradientHeading';
import CustomButton from '../components/reusables/CustomButton';

const Blog = () => {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  useEffect(() => {
    const fetchBlogPosts = async () => {
      try {
        const data = await blogService.getAll();
        setBlogPosts(data);
      } catch (error) {
        console.error('Error fetching blog posts:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogPosts();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="animate-pulse">
            <div className="h-12 bg-gray-300 rounded w-1/3 mx-auto mb-4"></div>
            <div className="h-6 bg-gray-300 rounded w-1/2 mx-auto mb-12"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, index) => (
                <div key={index} className="h-96 bg-gray-300 rounded-xl"></div>
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
        <title>Blog - ZyninLabs</title>
        <meta name="description" content="Stay updated with the latest insights, tutorials, and news from ZyninLabs." />
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
                  highlightText="Blog"
                  className="font-black mb-8"
                >
                  Our Blog
                </GradientHeading>
              </motion.div>

              <motion.p
                className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-5xl mx-auto leading-relaxed mb-12"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.4 }}
              >
                Insights, tutorials, and the latest news from the world of AI and software development
              </motion.p>
{/* 
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="flex flex-wrap justify-center gap-6"
              >
                <CustomButton
                  text="Subscribe"
                  className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full text-lg"
                />
              </motion.div> */}
            </motion.div>
          </motion.div>
        </HeroBgWrapper>

        {/* Blog Posts Grid */}
        <section className="py-20 bg-white dark:bg-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogPosts.map((post, index) => (
                <BlogCard
                  key={post._id}
                  post={post}
                  delay={index * 0.1}
                />
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Blog;