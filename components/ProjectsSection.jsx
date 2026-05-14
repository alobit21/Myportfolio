'use client'
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

import { Boxes } from "@/components/ui/background-boxes";

const CaseStudyCard = ({ project }) => {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const allImages = [project.image, ...(project.images || [])].filter(Boolean);

  useEffect(() => {
    if (allImages.length <= 1 || isPaused) return;

    const interval = setInterval(() => {
      setActiveImageIndex((prev) => (prev + 1) % allImages.length);
    }, 4000); // Change image every 4 seconds

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
    <div className="flex flex-col lg:flex-row items-stretch gap-8 lg:gap-16 bg-[#0B1120]/80 backdrop-blur-md rounded-3xl p-8 lg:p-12 border border-white/5 shadow-2xl max-w-6xl mx-auto min-h-[600px]">
      {/* Left Content */}
      <div className="flex-1 space-y-6 flex flex-col justify-center">
        <div className="inline-block px-4 py-1 rounded-md bg-[#0D2B2B] text-[#10B981] text-xs font-bold tracking-widest uppercase border border-[#10B981]/20 self-start">
          {project.tags?.[0] || 'Web Development'}
        </div>
        
        <h3 className="text-3xl lg:text-5xl font-bold text-white tracking-tight">
          {project.title}
        </h3>
        
        <p className="text-gray-400 text-sm lg:text-lg leading-relaxed max-w-xl">
          {project.description}
        </p>
        
        <div className="border-l-4 border-yellow-500 pl-4 py-2 bg-yellow-500/5 rounded-r-lg">
          <p className="text-yellow-500 text-sm italic font-medium">
            {project.achievements?.[0] || "Provided a modern robust solution that significantly reduced operational costs and increased efficiency by 70%."}
          </p>
        </div>
        
        <div className="pt-4 flex items-center gap-6">
          <a 
            href={project.previewUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-2 text-white font-semibold hover:text-[#3ca2fa] transition-colors"
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
            className="text-gray-500 hover:text-white transition-colors text-sm font-medium"
          >
            View Code
          </a>
        </div>
      </div>

      {/* Right Image Carousel */}
      <div className="flex-1 w-full lg:w-auto flex items-center justify-center">
        <div 
          className="relative w-full h-[400px] lg:h-[500px] min-h-[400px] rounded-2xl overflow-hidden shadow-2xl group border border-white/10 bg-black/20"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={activeImageIndex}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="absolute inset-0 w-full h-full p-4"
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
                className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/40 text-white flex items-center justify-center hover:bg-[#3ca2fa] transition-all opacity-0 group-hover:opacity-100 z-10"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/40 text-white flex items-center justify-center hover:bg-[#3ca2fa] transition-all opacity-0 group-hover:opacity-100 z-10"
              >
                <ChevronRight className="w-6 h-6" />
              </button>

              {/* Internal Pagination Dots */}
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                {allImages.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={(e) => { e.stopPropagation(); setActiveImageIndex(idx); }}
                    className={`w-2 h-2 rounded-full transition-all ${
                      idx === activeImageIndex ? 'bg-[#3ca2fa] w-4' : 'bg-white/30 hover:bg-white/50'
                    }`}
                  />
                ))}
              </div>

              {/* Image Counter */}
              <div className="absolute top-6 right-6 bg-black/50 backdrop-blur-sm px-3 py-1 rounded-full text-xs text-white/80 font-medium border border-white/5">
                {activeImageIndex + 1} / {allImages.length}
              </div>
            </>
          )}

          <div className="absolute inset-0 bg-gradient-to-tr from-[#0B1120]/20 to-transparent pointer-events-none"></div>
        </div>
      </div>
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
    <section id="projects" className="relative min-h-screen py-24 px-4 flex flex-col items-center justify-center bg-slate-900 overflow-hidden">
      {/* Background Boxes Component */}
      <div className="absolute inset-0 w-full h-full bg-slate-900 z-0">
        <Boxes />
      </div>
      
      {/* Gradient Mask for Background */}
      <div className="absolute inset-0 w-full h-full bg-slate-900 [mask-image:radial-gradient(transparent,white)] pointer-events-none z-10" />

      <div className="relative z-20 w-full max-w-7xl mx-auto space-y-16">
        {/* Header */}
        <div className="text-center space-y-6">
          <div className="flex items-center justify-center gap-3">
            <div className="h-[2px] w-8 bg-[#10B981]"></div>
            <span className="text-[#10B981] text-sm font-bold tracking-[0.3em] uppercase">My Success Stories</span>
          </div>
          
          <h2 className="text-6xl lg:text-8xl font-black text-white tracking-tighter">
            CASE <span className="text-gray-500">STUDIES</span>
          </h2>
          
          <p className="text-gray-400 text-sm lg:text-lg font-medium tracking-widest uppercase max-w-3xl mx-auto">
            Discover the many ways in which our clients have embraced modern engineering
          </p>
        </div>

        {/* Carousel Container */}
        <div className="relative px-4 lg:px-20">
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
              className="w-full"
            >
              <CaseStudyCard project={projects[currentIndex]} />
            </motion.div>
          </AnimatePresence>

          {/* Navigation Arrows */}
          <button
            onClick={() => paginate(-1)}
            className="absolute left-0 top-1/2 -translate-y-1/2 w-14 h-14 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-[#3ca2fa] hover:border-[#3ca2fa] transition-all z-30 shadow-xl backdrop-blur-sm"
          >
            <ChevronLeft className="w-8 h-8" />
          </button>
          
          <button
            onClick={() => paginate(1)}
            className="absolute right-0 top-1/2 -translate-y-1/2 w-14 h-14 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-[#3ca2fa] hover:border-[#3ca2fa] transition-all z-30 shadow-xl backdrop-blur-sm"
          >
            <ChevronRight className="w-8 h-8" />
          </button>
        </div>

        {/* Pagination Dots */}
        <div className="flex justify-center gap-4">
          {projects.map((_, idx) => (
            <button
              key={idx}
              onClick={() => {
                setDirection(idx > currentIndex ? 1 : -1);
                setCurrentIndex(idx);
              }}
              className={`h-2.5 rounded-full transition-all duration-300 ${
                idx === currentIndex ? 'w-10 bg-[#10B981]' : 'w-2.5 bg-white/20 hover:bg-white/40'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;