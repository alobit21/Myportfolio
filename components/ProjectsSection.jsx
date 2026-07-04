'use client'
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, ArrowRight, Eye, Github, Info } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

import { Boxes } from "@/components/ui/background-boxes";
import ImageLightbox from './ImageLightbox';

const CaseStudyCard = ({ project }) => {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const allImages = [project.image, ...(project.images || [])].filter(Boolean);

  useEffect(() => {
    if (allImages.length <= 1 || isPaused) return;

    const interval = setInterval(() => {
      setActiveImageIndex((prev) => (prev + 1) % allImages.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [allImages.length, isPaused]);

  const nextImage = (e) => {
    e?.stopPropagation();
    setActiveImageIndex((prev) => (prev + 1) % allImages.length);
  };

  const prevImage = (e) => {
    e?.stopPropagation();
    setActiveImageIndex((prev) => (prev - 1 + allImages.length) % allImages.length);
  };

  const maxDescLength = 150;
  const shouldTruncate = project.description?.length > maxDescLength;
  const displayDescription = isExpanded 
    ? project.description 
    : (shouldTruncate ? project.description.slice(0, maxDescLength) + "..." : project.description);

  return (
    <div className="flex flex-col lg:flex-row bg-[#020817]/90 backdrop-blur-xl rounded-xl border border-slate-800 shadow-2xl overflow-hidden w-full h-full">
      {/* Right Image Carousel (Moved to top on mobile, left on desktop) */}
      <div className="w-full lg:w-[55%] relative bg-slate-900/30 flex items-center justify-center border-b lg:border-b-0 lg:border-r border-slate-800">
        <div 
          className="relative w-full h-[250px] md:h-[350px] lg:absolute lg:inset-0 cursor-pointer group"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onClick={() => setLightboxOpen(true)}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={activeImageIndex}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0 w-full h-full"
            >
              <Image
                src={allImages[activeImageIndex]}
                alt={`${project.title} screenshot ${activeImageIndex + 1}`}
                fill
                className="object-cover object-top filter transition-transform duration-700 group-hover:scale-[1.03]"
              />
            </motion.div>
          </AnimatePresence>

          {/* Internal Navigation Arrows */}
          {allImages.length > 1 && (
            <>
              <button
                onClick={prevImage}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-slate-950/60 border border-slate-800 text-slate-300 flex items-center justify-center hover:bg-slate-800 hover:text-white transition-all opacity-0 group-hover:opacity-100 z-10"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-slate-950/60 border border-slate-800 text-slate-300 flex items-center justify-center hover:bg-slate-800 hover:text-white transition-all opacity-0 group-hover:opacity-100 z-10"
              >
                <ChevronRight className="w-4 h-4" />
              </button>

              {/* Internal Pagination Dots */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
                {allImages.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={(e) => { e.stopPropagation(); setActiveImageIndex(idx); }}
                    className={`h-1.5 rounded-full transition-all ${
                      idx === activeImageIndex ? 'bg-[#3ca2fa] w-4' : 'bg-slate-600 w-1.5'
                    }`}
                  />
                ))}
              </div>
            </>
          )}
          
          {/* Fullscreen icon indicator */}
          <div className="absolute top-4 right-4 bg-slate-950/60 backdrop-blur-md p-2 rounded-full border border-slate-800 text-slate-300 opacity-0 group-hover:opacity-100 transition-opacity z-20 pointer-events-none">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M8 3H5a2 2 0 0 0-2 2v3"/><path d="M21 8V5a2 2 0 0 0-2-2h-3"/><path d="M3 16v3a2 2 0 0 0 2 2h3"/><path d="M16 21h3a2 2 0 0 0 2-2v-3"/></svg>
          </div>
        </div>
      </div>

      {/* Left Content (Text) */}
      <div className="flex flex-col w-full lg:w-[45%] p-6 md:p-8 lg:p-10 justify-center">
        <div className="space-y-4">
          <div className="inline-flex items-center rounded-full border border-slate-800 bg-slate-900/50 px-3 py-1 text-xs font-medium text-[#3ca2fa]">
            {project.tags?.[0] || 'Web Development'}
          </div>
          
          <h3 className="text-2xl md:text-3xl font-bold tracking-tight text-slate-50">
            {project.title}
          </h3>
          
          <div className="text-sm md:text-base text-slate-400 leading-relaxed">
            {isExpanded && (
              <div className="mb-4 text-slate-300">
                {project.description}
              </div>
            )}
            <button 
              onClick={() => setIsExpanded(!isExpanded)} 
              className="inline-flex items-center gap-2 text-xs font-medium text-[#3ca2fa] hover:text-blue-400 transition-colors bg-blue-950/30 px-3 py-1.5 rounded-full border border-blue-900/50 focus:outline-none"
            >
              <Info className="w-3.5 h-3.5" />
              {isExpanded ? "Hide Description" : "View Description"}
            </button>
          </div>
          
          {project.achievements?.[0] && (
            <div className="rounded-lg bg-blue-950/20 p-4 border border-blue-900/30">
              <p className="text-blue-200/80 text-sm font-medium flex gap-2.5 items-start">
                <span className="text-[#3ca2fa] mt-0.5">✦</span>
                {project.achievements[0]}
              </p>
            </div>
          )}
        </div>
        
        <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-6 border-t border-slate-800/60">
          <a 
            href={project.previewUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-10 items-center justify-center gap-2 rounded-md bg-slate-50 px-5 text-sm font-medium text-slate-900 shadow hover:bg-slate-200 transition-colors whitespace-nowrap"
          >
            <Eye className="w-4 h-4" />
            Live Preview
          </a>
          
          <a 
            href={project.gitUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-10 items-center justify-center gap-2 rounded-md border border-slate-700 bg-transparent px-5 text-sm font-medium text-slate-300 shadow-sm hover:bg-slate-800 hover:text-slate-50 transition-colors whitespace-nowrap"
          >
            <Github className="w-4 h-4" />
            Source Code
          </a>
        </div>
      </div>

      {lightboxOpen && (
        <ImageLightbox 
          images={allImages} 
          initialIndex={activeImageIndex} 
          onClose={() => setLightboxOpen(false)} 
        />
      )}
    </div>
  );
};

const ProjectsSection = () => {
  const [projects, setProjects] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset, velocity) => {
    return Math.abs(offset) * velocity;
  };

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch('/api/projects');
        const data = await response.json();
        setProjects(data);
      } catch (error) {
        console.error('Error fetching projects:', error);
      }
    };
    fetchProjects();
  }, []);

  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0
    })
  };

  const paginate = (newDirection) => {
    setDirection(newDirection);
    setCurrentIndex((prevIndex) => (prevIndex + newDirection + projects.length) % projects.length);
  };

  if (projects.length === 0) return null;

  return (
    <section id="projects" className="relative min-h-screen py-16 flex flex-col items-center justify-center bg-slate-900 overflow-hidden">
      {/* Background Boxes Component */}
      <div className="absolute inset-0 w-full h-full bg-slate-900 z-0">
        <Boxes />
      </div>
      
      {/* Gradient Mask for Background */}
      <div className="absolute inset-0 w-full h-full bg-slate-900 [mask-image:radial-gradient(transparent,white)] pointer-events-none z-10" />

      <div className="relative z-20 w-[98%] mx-auto space-y-10 md:space-y-16">
        {/* Header */}
        <div className="text-center space-y-4 md:space-y-6 px-4">
          <div className="flex items-center justify-center gap-3">
            <div className="h-[2px] w-6 md:w-8 bg-[#10B981]"></div>
            <span className="text-[#10B981] text-[10px] md:text-sm font-bold tracking-[0.2em] md:tracking-[0.3em] uppercase">My Success Stories</span>
          </div>
          
          <h2 className="text-4xl md:text-6xl lg:text-8xl font-black text-white tracking-tighter">
            CASE <span className="text-gray-500">STUDIES</span>
          </h2>
          
          <p className="text-gray-400 text-[10px] md:text-sm lg:text-lg font-medium tracking-widest uppercase max-w-3xl mx-auto px-4">
            Discover the many ways in which our clients have embraced modern engineering
          </p>
        </div>

        {/* Carousel Container */}
        <div className="relative w-full">
          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.div
              key={currentIndex}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 }
              }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={1}
              onDragEnd={(e, { offset, velocity }) => {
                const swipe = swipePower(offset.x, velocity.x);

                if (swipe < -swipeConfidenceThreshold) {
                  paginate(1);
                } else if (swipe > swipeConfidenceThreshold) {
                  paginate(-1);
                }
              }}
              className="w-full flex justify-center touch-pan-y"
            >
              <CaseStudyCard project={projects[currentIndex]} />
            </motion.div>
          </AnimatePresence>

        {/* Bottom Controls */}
        <div className="flex flex-row justify-between items-center w-[98%] mx-auto px-4 mt-8 md:mt-10">
          {/* Pagination Dots */}
          <div className="flex gap-3 md:gap-4">
            {projects.map((_, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setDirection(idx > currentIndex ? 1 : -1);
                  setCurrentIndex(idx);
                }}
                className={`h-1.5 md:h-2.5 rounded-full transition-all duration-300 ${
                  idx === currentIndex ? 'w-6 md:w-10 bg-[#3ca2fa]' : 'w-1.5 md:w-2.5 bg-slate-700 hover:bg-slate-500'
                }`}
              />
            ))}
          </div>

          {/* Navigation Arrows */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => paginate(-1)}
              className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-[#020817] border border-slate-800 flex items-center justify-center text-slate-300 hover:bg-slate-800 hover:text-white hover:border-slate-600 transition-all shadow-lg focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-[#0B1120]"
            >
              <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
            </button>
            <button
              onClick={() => paginate(1)}
              className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-[#020817] border border-slate-800 flex items-center justify-center text-slate-300 hover:bg-slate-800 hover:text-white hover:border-slate-600 transition-all shadow-lg focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-[#0B1120]"
            >
              <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
            </button>
          </div>
        </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;