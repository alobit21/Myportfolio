'use client'
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

import { Boxes } from "@/components/ui/background-boxes";
import ImageLightbox from './ImageLightbox';

const CaseStudyCard = ({ project }) => {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);
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

  return (
    <div className="flex flex-col lg:flex-row items-stretch gap-8 lg:gap-16 bg-[#0B1120]/90 backdrop-blur-xl rounded-none md:rounded-3xl p-5 md:p-8 lg:p-12 border-y md:border border-white/10 shadow-2xl w-full mx-auto min-h-[500px] lg:min-h-[600px]">
      {/* Left Content */}
      <div className="flex-1 space-y-4 md:space-y-6 flex flex-col justify-center order-2 lg:order-1 px-4 md:px-0">
        <div className="inline-block px-3 py-1 rounded-md bg-[#10B981]/10 text-[#10B981] text-[10px] md:text-xs font-bold tracking-widest uppercase border border-[#10B981]/20 self-start">
          {project.tags?.[0] || 'Web Development'}
        </div>
        
        <h3 className="text-2xl md:text-3xl lg:text-5xl font-bold text-white tracking-tight">
          {project.title}
        </h3>
        
        <p className="text-gray-400 text-sm md:text-base lg:text-lg leading-relaxed max-w-xl">
          {project.description}
        </p>
        
        <div className="border-l-4 border-yellow-500 pl-4 py-2 bg-yellow-500/5 rounded-r-lg">
          <p className="text-yellow-500 text-xs md:text-sm italic font-medium">
            {project.achievements?.[0] || "Provided a modern robust solution that significantly reduced operational costs and increased efficiency by 70%."}
          </p>
        </div>
        
        <div className="pt-4 flex flex-wrap items-center gap-4 md:gap-6">
          <a 
            href={project.previewUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-2 text-white text-sm md:text-base font-semibold hover:text-[#3ca2fa] transition-colors"
          >
            Read More
            <div className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center group-hover:border-[#3ca2fa] group-hover:bg-[#3ca2fa] group-hover:text-white transition-all">
              <ArrowRight className="w-4 h-4" />
            </div>
          </a>
          
          <a 
            href={project.gitUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-500 hover:text-white transition-colors text-xs md:text-sm font-medium"
          >
            View Code
          </a>
        </div>
      </div>

      {/* Right Image Carousel */}
      <div className="flex-1 w-full flex items-center justify-center order-1 lg:order-2 px-1 md:px-0">
        <div 
          className="relative w-full h-[250px] md:h-[400px] lg:h-[500px] rounded-2xl overflow-hidden shadow-2xl group border border-white/10 bg-black/40 cursor-pointer"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onClick={() => setLightboxOpen(true)}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={activeImageIndex}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="absolute inset-0 w-full h-full p-2 md:p-4"
            >
              <Image
                src={allImages[activeImageIndex]}
                alt={`${project.title} screenshot ${activeImageIndex + 1}`}
                fill
                className="object-contain"
              />
            </motion.div>
          </AnimatePresence>

          {/* Internal Navigation Arrows */}
          {allImages.length > 1 && (
            <>
              <button
                onClick={prevImage}
                className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 md:w-10 md:h-10 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-[#3ca2fa] transition-all lg:opacity-0 lg:group-hover:opacity-100 z-10"
              >
                <ChevronLeft className="w-4 h-4 md:w-6 md:h-6" />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 md:w-10 md:h-10 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-[#3ca2fa] transition-all lg:opacity-0 lg:group-hover:opacity-100 z-10"
              >
                <ChevronRight className="w-4 h-4 md:w-6 md:h-6" />
              </button>

              {/* Internal Pagination Dots */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
                {allImages.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={(e) => { e.stopPropagation(); setActiveImageIndex(idx); }}
                    className={`w-1.5 h-1.5 rounded-full transition-all ${
                      idx === activeImageIndex ? 'bg-[#3ca2fa] w-3' : 'bg-white/30'
                    }`}
                  />
                ))}
              </div>
            </>
          )}

          <div className="absolute inset-0 bg-gradient-to-tr from-[#0B1120]/40 to-transparent pointer-events-none"></div>
          
          {/* Fullscreen icon indicator */}
          <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-md p-2 rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity z-20 pointer-events-none border border-white/10 shadow-lg">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M8 3H5a2 2 0 0 0-2 2v3"/><path d="M21 8V5a2 2 0 0 0-2-2h-3"/><path d="M3 16v3a2 2 0 0 0 2 2h3"/><path d="M16 21h3a2 2 0 0 0 2-2v-3"/></svg>
          </div>
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

      <div className="relative z-20 w-full md:max-w-7xl mx-auto space-y-10 md:space-y-16">
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
        <div className="relative w-full md:px-20">
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
              className="w-full flex justify-center"
            >
              <CaseStudyCard project={projects[currentIndex]} />
            </motion.div>
          </AnimatePresence>

          {/* Navigation Arrows - Repositioned and Restyled */}
          <div className="flex justify-center items-center gap-10 mt-8 lg:mt-0">
            <button
              onClick={() => paginate(-1)}
              className="lg:absolute lg:left-0 lg:top-1/2 lg:-translate-y-1/2 w-12 h-12 md:w-14 md:h-14 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-[#3ca2fa] hover:border-[#3ca2fa] transition-all z-30 shadow-xl backdrop-blur-md"
            >
              <ChevronLeft className="w-6 h-6 md:w-8 md:h-8" />
            </button>
            
            <button
              onClick={() => paginate(1)}
              className="lg:absolute lg:right-0 lg:top-1/2 lg:-translate-y-1/2 w-12 h-12 md:w-14 md:h-14 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-[#3ca2fa] hover:border-[#3ca2fa] transition-all z-30 shadow-xl backdrop-blur-md"
            >
              <ChevronRight className="w-6 h-6 md:w-8 md:h-8" />
            </button>
          </div>
        </div>

        {/* Pagination Dots */}
        <div className="flex justify-center gap-3 md:gap-4">
          {projects.map((_, idx) => (
            <button
              key={idx}
              onClick={() => {
                setDirection(idx > currentIndex ? 1 : -1);
                setCurrentIndex(idx);
              }}
              className={`h-1.5 md:h-2.5 rounded-full transition-all duration-300 ${
                idx === currentIndex ? 'w-6 md:w-10 bg-[#10B981]' : 'w-1.5 md:w-2.5 bg-white/20 hover:bg-white/40'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;