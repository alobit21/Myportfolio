'use client'
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';

// Data will be fetched from API


// ProjectTag Component
const ProjectTag = ({ name, onClick, isSelected }) => {
  return (
    <button
      onClick={() => onClick(name)}
      className={`px-4 py-2 rounded-full font-semibold text-sm sm:text-base transition-all duration-300 ease-in-out mx-1 ${
        isSelected 
          ? 'bg-[#3ca2fa] text-gray-900 scale-105' 
          : 'bg-gray-900 text-[#3ca2fa] border-2 border-[#3ca2fa] hover:bg-[#3ca2fa] hover:text-gray-900'
      }`}
    >
      {name}
    </button>
  );
};

// ProjectCard Component with Image Gallery
const ProjectCard = ({ title, description, imgUrl, images = [], gitUrl, previewUrl }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const allImages = [imgUrl, ...(images || [])].filter(Boolean);
  const hasMultipleImages = allImages.length > 1;

  const nextImage = (e) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev + 1) % allImages.length);
  };

  const prevImage = (e) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev - 1 + allImages.length) % allImages.length);
  };

  return (
    <div className="bg-gray-900/90 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 ease-in-out hover:scale-105 hover:-translate-y-1 flex flex-col h-full backdrop-blur-sm border border-gray-700/50">
      <div className="relative w-full h-48 overflow-hidden group">
        <Image
          src={allImages[currentImageIndex] || imgUrl}
          alt={`${title} - Screenshot ${currentImageIndex + 1}`}
          fill
          className="object-cover transition-transform duration-700 ease-in-out group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"></div>

        {/* Image Navigation Arrows */}
        {hasMultipleImages && (
          <>
            <button
              onClick={prevImage}
              className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-gray-900/70 hover:bg-[#3ca2fa] text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-gray-900/70 hover:bg-[#3ca2fa] text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300"
            >
              <ChevronRight className="w-5 h-5" />
            </button>

            {/* Image Counter */}
            <div className="absolute bottom-2 right-2 bg-gray-900/70 px-2 py-1 rounded text-xs text-white">
              {currentImageIndex + 1} / {allImages.length}
            </div>

            {/* Image Dots */}
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
              {allImages.map((_, idx) => (
                <button
                  key={idx}
                  onClick={(e) => { e.stopPropagation(); setCurrentImageIndex(idx); }}
                  className={`w-2 h-2 rounded-full transition-all ${
                    idx === currentImageIndex ? 'bg-[#3ca2fa] w-4' : 'bg-white/50 hover:bg-white'
                  }`}
                />
              ))}
            </div>
          </>
        )}
      </div>
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-xl font-semibold text-[#3ca2fa] mb-2 transition-colors duration-300">{title}</h3>
        <p className="text-white/90 text-sm flex-grow leading-relaxed">{description}</p>
        <div className="mt-4 flex gap-2">
          <a
            href={gitUrl}
            className="px-4 py-2 rounded-full bg-[#3ca2fa] text-gray-900 hover:bg-white hover:scale-105 text-sm font-semibold transition-all duration-300 ease-in-out shadow-md hover:shadow-lg"
          >
            GitHub
          </a>
          <a
            href={previewUrl}
            className="px-4 py-2 rounded-full bg-transparent border-2 border-[#3ca2fa] text-[#3ca2fa] hover:bg-[#3ca2fa] hover:text-gray-900 hover:scale-105 text-sm font-semibold transition-all duration-300 ease-in-out"
          >
            Preview
          </a>
        </div>
      </div>
    </div>
  );
};

const ProjectsSection = () => {
  const [tag, setTag] = useState('All');
  const [projectsData, setProjectsData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch('/api/projects');
        const data = await response.json();
        setProjectsData(data);
      } catch (error) {
        console.error('Error fetching projects:', error);
      } finally {
        setLoading(true); // Keeping it simple for now, but usually false
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const handleTagChange = (newTag) => {
    setTag(newTag);
  };

  const filteredProjects = projectsData.filter((project) => project.tag?.includes(tag) || project.tags?.includes(tag));

  return (
    <section id="projects" className="relative py-12 text-white overflow-hidden" 
             style={{
               backgroundImage: 'url(/images/projects/projects-section.jpeg)',
               backgroundSize: 'cover',
               backgroundPosition: 'center',
               backgroundRepeat: 'no-repeat',
               backgroundAttachment: 'fixed',
               width: '100vw',
               marginLeft: 'calc(-50vw + 50%)',
               marginRight: 'calc(-50vw + 50%)'
             }}>
      <div className="absolute inset-0 bg-gray-900/70"></div>
      <div className="relative z-10">
        <h2 className="text-center text-4xl font-bold text-[#3ca2fa] mt-4 mb-8 md:mb-12">
          My Projects
        </h2>
        <div className="text-white flex flex-row justify-center items-center gap-2 mb-4 py-6 flex-wrap">
          <ProjectTag onClick={handleTagChange} name="All" isSelected={tag === 'All'} />
          <ProjectTag onClick={handleTagChange} name="Web" isSelected={tag === 'Web'} />
          <ProjectTag onClick={handleTagChange} name="Mobile" isSelected={tag === 'Mobile'} />
        </div>
        
        {/* Containerized Project Cards */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8 md:gap-12">
            {filteredProjects.map((project, index) => (
              <div
                key={project.id}
                className="animate-fadeIn"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <ProjectCard
                  title={project.title}
                  description={project.description}
                  imgUrl={project.image}
                  images={project.images}
                  gitUrl={project.gitUrl}
                  previewUrl={project.previewUrl}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;