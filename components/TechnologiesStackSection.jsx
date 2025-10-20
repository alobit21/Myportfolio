'use client';
import React, { useEffect, useRef, useState } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';
import { FaReact, FaNodeJs, FaPython, FaGitAlt, FaDocker, FaAws } from 'react-icons/fa';
import {
  SiNextdotjs, SiTailwindcss, SiTypescript, SiMongodb,
  SiPostgresql, SiExpress, SiDjango, SiFirebase, SiGraphql
} from 'react-icons/si';

// Constants
const TECHNOLOGIES = [
  { name: 'React', icon: <FaReact className="w-8 h-8" />, color: '#61DAFB' },
  { name: 'Next.js', icon: <SiNextdotjs className="w-8 h-8" />, color: '#ffffff' },
  { name: 'TypeScript', icon: <SiTypescript className="w-8 h-8" />, color: '#3178C6' },
  { name: 'Tailwind CSS', icon: <SiTailwindcss className="w-8 h-8" />, color: '#38BDF8' },
  { name: 'Node.js', icon: <FaNodeJs className="w-8 h-8" />, color: '#339933' },
  { name: 'Express', icon: <SiExpress className="w-8 h-8" />, color: '#cccccc' },
  { name: 'Python', icon: <FaPython className="w-8 h-8" />, color: '#3776AB' },
  { name: 'Django', icon: <SiDjango className="w-8 h-8" />, color: '#092E20' },
  { name: 'MongoDB', icon: <SiMongodb className="w-8 h-8" />, color: '#47A248' },
  { name: 'PostgreSQL', icon: <SiPostgresql className="w-8 h-8" />, color: '#336791' },
  { name: 'GraphQL', icon: <SiGraphql className="w-8 h-8" />, color: '#E10098' },
  { name: 'AWS', icon: <FaAws className="w-8 h-8" />, color: '#FF9900' },
  { name: 'Firebase', icon: <SiFirebase className="w-8 h-8" />, color: '#FFCA28' },
  { name: 'Docker', icon: <FaDocker className="w-8 h-8" />, color: '#2496ED' },
  { name: 'Git', icon: <FaGitAlt className="w-8 h-8" />, color: '#F05032' },
];

const CATEGORIES = [
  { title: 'Frontend', tech: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS'] },
  { title: 'Backend', tech: ['Node.js', 'Express', 'Python', 'Django'] },
  { title: 'Database', tech: ['MongoDB', 'PostgreSQL', 'Firebase'] },
  { title: 'DevOps & Tools', tech: ['Docker', 'AWS', 'Git', 'GraphQL'] }
];

// Animation Variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { x: 50, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: 100,
      damping: 15
    }
  }
};

const TechnologiesStackSection = () => {
  // Refs and State
  const ref = useRef(null);
  const containerRef = useRef(null);
  const controls = useAnimation();
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const [techItems, setTechItems] = useState([...TECHNOLOGIES, ...TECHNOLOGIES]);

  // Effects
  useEffect(() => {
    if (isInView) {
      controls.start('visible');
      startAutoScroll();
    }
  }, [controls, isInView]);

  const startAutoScroll = () => {
    const container = containerRef.current;
    if (!container) return;

    let scrollPosition = 0;
    const scrollWidth = container.scrollWidth / 2;

    const scroll = () => {
      scrollPosition += 0.5;
      if (scrollPosition >= scrollWidth) {
        scrollPosition = 0;
      }
      container.scrollTo({
        left: scrollPosition,
        behavior: 'smooth'
      });
      requestAnimationFrame(scroll);
    };

    const scrollId = requestAnimationFrame(scroll);
    return () => cancelAnimationFrame(scrollId);
  };

  // Helper Functions
  const getTechDetails = (techName) => {
    return TECHNOLOGIES.find(t => t.name === techName);
  };

  // Render Functions
  const renderTechCategory = (category, index) => (
    <motion.div 
      key={index} 
      className="bg-gray-800/50 rounded-xl p-6 border border-gray-700/50 hover:border-yellow-500/30 transition-colors"
      variants={itemVariants}
    >
      <h3 className="text-xl font-semibold mb-6 text-yellow-400">{category.title}</h3>
      <div className="space-y-4">
        {category.tech.map((techName, techIndex) => {
          const tech = getTechDetails(techName);
          return (
            <motion.div 
              key={techIndex} 
              className="flex items-center space-x-3 p-3 bg-gray-700/30 rounded-lg hover:bg-gray-700/50 transition-colors"
              whileHover={{ scale: 1.02, x: 5 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <div className="p-2 rounded-lg" style={{ backgroundColor: `${tech.color}20` }}>
                {React.cloneElement(tech.icon, { className: 'w-6 h-6', style: { color: tech.color } })}
              </div>
              <span className="text-gray-100">{techName}</span>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );

  const renderTechItem = (tech, index) => (
    <motion.div
      key={`${tech.name}-${index}`}
      className="inline-flex items-center space-x-3 px-6 py-3 bg-gray-800/90 rounded-lg border border-gray-700/60 hover:border-yellow-500/60 transition-all duration-300 shadow-lg hover:shadow-yellow-500/10"
      whileHover={{ scale: 1.05, y: -3 }}
    >
      <div style={{ color: tech.color }} className="text-2xl">
        {tech.icon}
      </div>
      <span className="text-gray-100 font-medium">{tech.name}</span>
    </motion.div>
  );

  return (
    <section ref={ref} className="py-20 bg-gray-900 text-white overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-yellow-600">
            Technology Stack
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Technologies and tools I use to build modern, scalable applications
          </p>
        </motion.div>

        {/* Categories Grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate={controls}
        >
          {CATEGORIES.map(renderTechCategory)}
        </motion.div>

        {/* Scrolling Tech List */}
        <div className="mt-16">
          <motion.h3 
            className="text-2xl font-semibold text-center mb-8 text-gray-200"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            All Technologies
          </motion.h3>
          
          <div className="relative overflow-hidden py-4">
            <div className="relative h-48 flex items-center">
              <motion.div
                ref={containerRef}
                className="flex items-center gap-8 absolute whitespace-nowrap"
                animate={{
                  x: ['0%', '-50%'],
                }}
                transition={{
                  duration: 30,
                  ease: 'linear',
                  repeat: Infinity,
                }}
              >
                {techItems.map(renderTechItem)}
              </motion.div>
            </div>
            <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-gray-900 to-transparent z-10 pointer-events-none"></div>
            <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-gray-900 to-transparent z-10 pointer-events-none"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TechnologiesStackSection;