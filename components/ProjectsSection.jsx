'use client'
import React, { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import Image from 'next/image';

const projectsData = [
  {
    id: 1,
    title: "Django E-commerce Application",
    description: "A fully-functional e-commerce platform built with Django, enabling users to buy and sell items online. Features user authentication, product management, and order tracking.",
    image: "/images/projects/django-ecom.png",
    tag: ["All", "Web"],
    gitUrl: "/",
    previewUrl: "/",
  },
  {
    id: 2,
    title: "Django Tourism Site",
    description: "A dynamic tourism platform for Zanzibar, built with Django. Users can explore destinations, book safaris, and access tour information with a responsive interface.",
    image: "/images/projects/goz2.png",
    tag: ["All", "Web"],
    gitUrl: "/",
    previewUrl: "https://www.gatesofzanzibarsafaris.com/",
  },
  {
    id: 3,
    title: "Next.js Portfolio",
    description: "A personal portfolio built with Next.js, showcasing projects and skills with a responsive design, optimized for performance and SEO.",
    image: "/images/projects/nextjsportifolio.png",
    tag: ["All", "Web"],
    gitUrl: "/",
    previewUrl: "/",
  },
  {
    id: 4,
    title: "Django School Management System",
    description: "A Django-based system for managing student enrollment, grading, and scheduling with a user-friendly dashboard for teachers and administrators.",
    image: "/images/projects/schoolmns.png",
    tag: ["All", "Web"],
    gitUrl: "/",
    previewUrl: "/",
  },
  {
    id: 7,
    title: "Django-React Notes Application",
    description: "A full-stack app with Django and React for note management and QR code generation, featuring a modern and dynamic interface.",
    image: "/images/projects/djreact.png",
    tag: ["All", "Web"],
    gitUrl: "/",
    previewUrl: "/",
  },
  {
    id: 8,
    title: "Mobile Application",
    description: "A cross-platform mobile app built with React Native or Flutter, optimized for iOS and Android with a seamless user experience.",
    image: "/images/projects/mobile-project-1.jpg",
    tag: ["All", "Mobile"],
    gitUrl: "/",
    previewUrl: "/",
  },
];

// ProjectTag Component
const ProjectTag = ({ name, onClick, isSelected }) => {
  const tagRef = useRef(null);

  useEffect(() => {
    gsap.to(tagRef.current, {
      scale: isSelected ? 1.1 : 1,
      opacity: isSelected ? 1 : 0.7,
      duration: 0.3,
      ease: 'power2.out',
    });
  }, [isSelected]);

  return (
    <button
      ref={tagRef}
      onClick={() => onClick(name)}
      className={`px-4 py-2 rounded-full font-semibold text-sm sm:text-base ${
        isSelected ? 'bg-[#ffe31a] text-gray-900' : 'bg-gray-900 text-[#ffe31a] border-2 border-[#ffe31a]'
      } hover:bg-[#ffe31a] hover:text-gray-900 transition-all duration-300 mx-1`}
    >
      {name}
    </button>
  );
};

// ProjectCard Component
const ProjectCard = ({ title, description, imgUrl, gitUrl, previewUrl }) => {
  const cardRef = useRef(null);

  useEffect(() => {
    const card = cardRef.current;

    // GSAP Hover Tilt Effect
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = (y - centerY) / 20;
      const rotateY = (centerX - x) / 20;

      gsap.to(card, {
        rotationX: -rotateX,
        rotationY: -rotateY,
        transformPerspective: 500,
        ease: 'power2.out',
        duration: 0.2,
      });
    });

    card.addEventListener('mouseleave', () => {
      gsap.to(card, {
        rotationX: 0,
        rotationY: 0,
        ease: 'power2.out',
        duration: 0.3,
      });
    });

    return () => {
      card.removeEventListener('mousemove', () => {});
      card.removeEventListener('mouseleave', () => {});
    };
  }, []);

  return (
    <div
      ref={cardRef}
      className="bg-gray-900 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col h-full"
    >
      <div className="relative w-full h-48">
        <Image
          src={imgUrl}
          alt={title}
          layout="fill"
          objectFit="cover"
          className="transition-transform duration-500 hover:scale-105"
        />
      </div>
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-xl font-semibold text-[#ffe31a] mb-2">{title}</h3>
        <p className="text-white text-sm flex-grow">{description}</p>
        <div className="mt-4 flex gap-2">
          <a
            href={gitUrl}
            className="px-4 py-2 rounded-full bg-[#ffe31a] text-gray-900 hover:bg-white text-sm font-semibold transition-all duration-300"
          >
            GitHub
          </a>
          <a
            href={previewUrl}
            className="px-4 py-2 rounded-full bg-transparent border-2 border-[#ffe31a] text-[#ffe31a] hover:bg-[#ffe31a] hover:text-gray-900 text-sm font-semibold transition-all duration-300"
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
  const containerRef = useRef(null);

  const handleTagChange = (newTag) => {
    setTag(newTag);
    // Animate card transition
    gsap.to(containerRef.current.children, {
      opacity: 0,
      y: 50,
      duration: 0.3,
      onComplete: () => {
        gsap.fromTo(
          containerRef.current.children,
          { opacity: 0, y: -50 },
          { opacity: 1, y: 0, duration: 0.5, stagger: 0.1, ease: 'power3.out' }
        );
      },
    });
  };

  const filteredProjects = projectsData.filter((project) => project.tag.includes(tag));

  useEffect(() => {
    // Initial card animation
    gsap.fromTo(
      containerRef.current.children,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 0.8, stagger: 0.2, ease: 'power3.out', delay: 0.2 }
    );
  }, []);

  return (
    <section id="projects" className="bg-gray-900 py-12">
      <h2 className="text-center text-4xl font-bold text-[#ffe31a] mt-4 mb-8 md:mb-12">
        My Projects
      </h2>
      <div className="text-white flex flex-row justify-center items-center gap-2 mb-4 py-6 flex-wrap">
        <ProjectTag onClick={handleTagChange} name="All" isSelected={tag === 'All'} />
        <ProjectTag onClick={handleTagChange} name="Web" isSelected={tag === 'Web'} />
        <ProjectTag onClick={handleTagChange} name="Mobile" isSelected={tag === 'Mobile'} />
      </div>
      <div
        ref={containerRef}
        className="grid md:grid-cols-3 gap-8 md:gap-12 px-4 md:px-8 overflow-x-auto flex flex-nowrap md:flex-wrap snap-x snap-mandatory scrollbar-hide md:scrollbar-default"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {filteredProjects.map((project, index) => (
          <div
            key={project.id}
            className="flex-shrink-0 w-[90%] sm:w-[80%] md:w-auto snap-center md:snap-none"
          >
            <ProjectCard
              title={project.title}
              description={project.description}
              imgUrl={project.image}
              gitUrl={project.gitUrl}
              previewUrl={project.previewUrl}
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProjectsSection;