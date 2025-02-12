"use client";
import React, { useState, useRef } from "react";
import ProjectCard from "./ProjectCard";
import ProjectTag from "./ProjectTag";
import { motion, useInView } from "framer-motion";

const projectsData = [

  {
    id: 1,
    title: "Django E-commerce Application",
    description: "A fully-functional e-commerce platform built with Django, enabling users to buy and sell items online. The application features a user-friendly interface for browsing products, adding them to the cart, and securely completing transactions. Key functionalities include user authentication, product management, and order tracking. Built with Django on the backend and using a modern frontend, this app aims to provide a seamless shopping experience for both customers and sellers.",
    image: "/images/projects/django-ecom.png",
    tag: ["All", "Web"],
    gitUrl: "/",
    previewUrl: "/",
  },
  
  {
    id: 3,
    title: "Next.js Portfolio",
    description: "A personal portfolio built with Next.js, showcasing my web development projects and skills. The site features a responsive design with smooth transitions, and it’s optimized for performance and SEO. Built with React, Next.js, and Tailwind CSS, this project highlights my ability to create clean, modern, and user-friendly web applications.",
    image: "/images/projects/nextjsportifolio.png",
    tag: ["All", "Web"],
    gitUrl: "/",
    previewUrl: "/",
  },
  
  {
    id: 2,
    title: "Django Tourism Site",
    description: "Gates-of-Zanzibar Tourism site is a dynamic platform built with Django, providing users with a comprehensive guide to Zanzibar's tourist attractions. The site allows visitors to explore destinations, book safaris, and get detailed information about tours, accommodations, and local culture. It features a responsive and user-friendly interface, ensuring a seamless experience across all devices. Powered by Django for the backend and with a modern frontend, the site aims to offer an engaging and informative experience for travelers.",
    image: "/images/projects/goz2.png",
    tag: ["All", "Web"],
    gitUrl: "/",
    previewUrl: "https://www.gatesofzanzibarsafaris.com/",
  },
  
  {
    id: 4,
    title: "Django School Management System",
    description: "A comprehensive School Management System built with Django, designed to streamline administrative tasks like student enrollment, grading, attendance tracking, and scheduling. This project features a user-friendly dashboard for both teachers and administrators, allowing for easy management of student data, class schedules, and academic records. The backend is powered by Django, while the frontend uses HTML, CSS, and JavaScript for a responsive interface.",
    image: "/images/projects/schoolmns.png",
    tag: ["All", "Mobile"],
    gitUrl: "/",
    previewUrl: "/",
  },
  
  // {
  //   id: 5,
  //   title: " Django Blog App",
  //   description: "Authentication and CRUD operations",
  //   image: "/images/projects/ui-project-1.jpg",
  //   tag: ["All", "Web"],
  //   gitUrl: "/",
  //   previewUrl: "/",
  // },
  // {
  //   id: 6,
  //   title: "Django-React Notes Application",
  //   description: "Project 5 description",
  //   image: "/images/projects/web-project-1.jpg",
  //   tag: ["All", "Web"],
  //   gitUrl: "/",
  //   previewUrl: "/",
  // },

  {
    id: 7,
    title: "Django-React Notes Application",
    description: "A full-stack application combining Django and React, allowing users to create, manage, and store notes. This application enables users to generate QR codes for their notes, making it easy to share or store information in a scannable format. The app provides a clean and modern interface for adding, editing, and deleting notes, while the backend is powered by Django to handle data storage and user management. The frontend is built with React, offering a dynamic and responsive user experience.",
    image: "/images/projects/djreact.png",
    tag: ["All", "Web"],
    gitUrl: "/",
    previewUrl: "/",
  },
  
  {
    id: 8,
    title: "Mobile Application",
    description: "A cross-platform mobile application built to provide users with an intuitive and seamless experience. The app allows users to perform various tasks such as browsing content, managing accounts, or tracking activities. Built with modern frameworks like React Native or Flutter, the app is optimized for both iOS and Android devices, offering fast performance, user-friendly design, and offline functionality.",
    image: "/images/projects/mobile-project-1.jpg",
    tag: ["All", "Web"],
    gitUrl: "/",
    previewUrl: "/",
  }
  
];

const ProjectsSection = () => {
  const [tag, setTag] = useState("All");
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const handleTagChange = (newTag) => {
    setTag(newTag);
  };

  const filteredProjects = projectsData.filter((project) =>
    project.tag.includes(tag)
  );

  const cardVariants = {
    initial: { y: 50, opacity: 0 },
    animate: { y: 0, opacity: 1 },
  };

  return (
    <section id="projects">
      <h2 className="text-center text-4xl font-bold text-white mt-4 mb-8 md:mb-12">
        My Projects
      </h2>
      <div className="text-white flex flex-row justify-center items-center gap-2 mb-4 py-6">
        <ProjectTag
          onClick={handleTagChange}
          name="All"
          isSelected={tag === "All"}
        />
        <ProjectTag
          onClick={handleTagChange}
          name="Web"
          isSelected={tag === "Web"}
        />
        <ProjectTag
          onClick={handleTagChange}
          name="Mobile"
          isSelected={tag === "Mobile"}
        />
      </div>
      <ul ref={ref} className="grid md:grid-cols-3 gap-8 md:gap-12">
        {filteredProjects.map((project, index) => (
          <motion.li
            key={index}
            variants={cardVariants}
            initial="initial"
            animate={isInView ? "animate" : "initial"}
            transition={{ duration: 0.3, delay: index * 0.4 }}
          >
            <ProjectCard
              key={project.id}
              title={project.title}
              description={project.description}
              imgUrl={project.image}
              gitUrl={project.gitUrl}
              previewUrl={project.previewUrl}
            />
          </motion.li>
        ))}
      </ul>
    </section>
  );
};

export default ProjectsSection;
