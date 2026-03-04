'use client'
import React, { useState } from 'react';
import Image from 'next/image';

const projectsData = [
  {
    id: 1,
    title: "Expenses Tracking System",
    description: "The Expense Tracker System is a full-stack web application built with React and NestJS, designed to help users efficiently record, categorize, and analyze their personal expenses. It features a responsive user interface, secure JWT-based authentication, and data visualization for insightful financial tracking. The system is fully containerized with Docker and integrated with a CI/CD pipeline for automated builds and deployments to AWS, ensuring scalability, reliability, and smooth continuous delivery in a modern cloud environment.",
     image: "/images/projects/expenses.png",
    tag: ["All", "Web"],
    gitUrl: "/",
    previewUrl: "https://expenses.seranise.co.tz/",
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
    title: "Blog Application",
    description: "The Blog Application is a modern, full-stack platform built with Next.js and PostgreSQL, allowing users to create, edit, and share blog posts with a clean and responsive interface. It features dynamic routing, SEO optimization, and a secure backend for managing posts and user data efficiently. Deployed on Vercel for high performance and scalability, the application delivers a seamless publishing experience with fast load times, server-side rendering, and automatic deployment from version control.",
     image: "/images/projects/blog.png",
    tag: ["All", "Web"],
    gitUrl: "/",
    previewUrl: "https://macblog.tarxemo.com/",
  },
  {
    id: 7,
    title: "Django-React Jwt Application",
    description: "A full-stack app with Django and React for note management and QR code generation, featuring a modern and dynamic interface.",
    image: "/images/projects/djreact.png",
    tag: ["All", "Web"],
    gitUrl: "/",
    previewUrl: "https://github.com/alobit21/Django-React-Jwt",
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
  return (
    <button
      onClick={() => onClick(name)}
      className={`px-4 py-2 rounded-full font-semibold text-sm sm:text-base transition-all duration-300 ease-in-out mx-1 ${
        isSelected 
          ? 'bg-[#ffe31a] text-gray-900 scale-105' 
          : 'bg-gray-900 text-[#ffe31a] border-2 border-[#ffe31a] hover:bg-[#ffe31a] hover:text-gray-900'
      }`}
    >
      {name}
    </button>
  );
};

// ProjectCard Component
const ProjectCard = ({ title, description, imgUrl, gitUrl, previewUrl }) => {
  return (
    <div className="bg-gray-900/90 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 ease-in-out hover:scale-105 hover:-translate-y-1 flex flex-col h-full backdrop-blur-sm border border-gray-700/50">
      <div className="relative w-full h-48 overflow-hidden">
        <Image
          src={imgUrl}
          alt={title}
          layout="fill"
          objectFit="cover"
          className="transition-transform duration-700 ease-in-out hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
      </div>
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-xl font-semibold text-[#ffe31a] mb-2 transition-colors duration-300">{title}</h3>
        <p className="text-white/90 text-sm flex-grow leading-relaxed">{description}</p>
        <div className="mt-4 flex gap-2">
          <a
            href={gitUrl}
            className="px-4 py-2 rounded-full bg-[#ffe31a] text-gray-900 hover:bg-white hover:scale-105 text-sm font-semibold transition-all duration-300 ease-in-out shadow-md hover:shadow-lg"
          >
            GitHub
          </a>
          <a
            href={previewUrl}
            className="px-4 py-2 rounded-full bg-transparent border-2 border-[#ffe31a] text-[#ffe31a] hover:bg-[#ffe31a] hover:text-gray-900 hover:scale-105 text-sm font-semibold transition-all duration-300 ease-in-out"
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

  const handleTagChange = (newTag) => {
    setTag(newTag);
  };

  const filteredProjects = projectsData.filter((project) => project.tag.includes(tag));

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
        <h2 className="text-center text-4xl font-bold text-[#ffe31a] mt-4 mb-8 md:mb-12">
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