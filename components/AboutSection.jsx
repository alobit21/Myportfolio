'use client'
import React, { useEffect, useRef, useState, useTransition } from "react";
import * as THREE from 'three';
import { gsap } from 'gsap';
import Image from "next/image";

const TAB_DATA = [
  {
    title: "Skills",
    id: "skills",
    content: (
      <ul className="space-y-2 text-white">
        <li>
          ✅ Front-End:{" "}
          <span className="text-[#ffe31a] font-bold">
            HTML, CSS, JavaScript, Tailwind, React, Next.js.
          </span>
        </li>
        <li>
          ✅ Back-End:{" "}
          <span className="text-[#ffe31a] font0-bold">
            Django, Express, Spring Boot, Node.js, Nest.
          </span>
        </li>
        <li>
          ✅ Databases:{" "}
          <span className="text-[#ffe31a] font-bold">
            MySQL, PostgreSQL, MongoDB.
          </span>
        </li>
      </ul>
    ),
  },
  {
    title: "Education",
    id: "education",
    content: (
      <ul className="space-y-2 text-white">
        <li>
          ✅ Primary School:{" "}
          <span className="text-[#ffe31a] font-bold">
            Ikwega Primary School (2007-2015)
          </span>
        </li>
        <li>
          ✅ Secondary Level:{" "}
          <span className="text-[#ffe31a] font-bold">
            Mkalala Secondary School (2016-2019)
          </span>
        </li>
        <li>
          ✅ Advanced Level:{" "}
          <span className="text-[#ffe31a] font-bold">
            Njombe Secondary School (2020-2022)
          </span>
        </li>
        <li>
          ✅ University Level:{" "}
          <span className="text-[#ffe31a] font-bold">
            University of Dodoma (2022-2026)
          </span>
        </li>
      </ul>
    ),
  },
  {
    title: "Certifications",
    id: "certification",
    content: (
      <ul className="space-y-2 text-white">
        <li>
          ✅{" "}
          <span className="text-[#ffe31a] font-bold">
            FreeCodeCamp Certification
          </span>
        </li>
        <li>
          ✅{" "}
          <span className="text-[#ffe31a] font-bold">
            Udemy Academy Certification
          </span>
        </li>
      </ul>
    ),
  },
];

// Sample TabButton Component
const TabButton = ({ children, active, selectTab }) => {
  const buttonRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      buttonRef.current,
      { scale: 0.9, opacity: 0.7 },
      { scale: active ? 1.1 : 1, opacity: active ? 1 : 0.7, duration: 0.3, ease: "power2.out" }
    );
  }, [active]);

  return (
    <button
      ref={buttonRef}
      onClick={selectTab}
      className={`mr-3 px-4 py-2 rounded-full font-semibold ${
        active ? 'bg-[#ffe31a] text-gray-900' : 'bg-gray-900 text-[#ffe31a] border-2 border-[#ffe31a]'
      } hover:bg-[#ffe31a] hover:text-gray-900 transition-all duration-300`}
    >
      {children}
    </button>
  );
};

const AboutSection = () => {
  const [tab, setTab] = useState("skills");
  const [isPending, startTransition] = useTransition();
  const canvasRef = useRef(null);
  const textRef = useRef(null);
  const imageRef = useRef(null);
  const tabContentRef = useRef(null);

  useEffect(() => {
    // Three.js Scene Setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);

    // Create a sphere with particles
    const geometry = new THREE.BufferGeometry();
    const vertices = [];
    const colors = [];

    for (let i = 0; i < 1000; i++) {
      const x = (Math.random() - 0.5) * 400;
      const y = (Math.random() - 0.5) * 400;
      const z = (Math.random() - 0.5) * 400;
      vertices.push(x, y, z);
      colors.push(1, 227 / 255, 26 / 255); // #ffe31a
    }

    geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
    geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({ size: 1.5, vertexColors: true });
    const particles = new THREE.Points(geometry, material);
    scene.add(particles);

    camera.position.z = 200;

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      particles.rotation.y += 0.001;
      renderer.render(scene, camera);
    };
    animate();

    // GSAP Animations
    gsap.fromTo(
      textRef.current,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1.5, ease: "power3.out" }
    );
    gsap.fromTo(
      imageRef.current,
      { opacity: 0, scale: 0.5 },
      { opacity: 1, scale: 1, duration: 1.5, delay: 0.5, ease: "bounce.out" }
    );

    // Handle window resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
    };
  }, []);

  useEffect(() => {
    // Animate tab content change
    gsap.fromTo(
      tabContentRef.current,
      { opacity: 0, x: -20 },
      { opacity: 1, x: 0, duration: 0.5, ease: "power2.out" }
    );
  }, [tab]);

  const handleTabChange = (id) => {
    startTransition(() => {
      setTab(id);
    });
  };

  return (
    <section id="about" className="text-white bg-gray-900 relative overflow-hidden">
      <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full opacity-30" />
      <div className="md:grid md:grid-cols-2 gap-8 items-center py-8 md:px-4 px-1 xl:gap-16 sm:py-16 relative z-10">
        <div ref={imageRef}>
          <Image src="/images/imgpro.png" width={500} height={500} alt="About image" />
        </div>
        <div ref={textRef}>
          <h2 className="text-4xl font-bold text-[#ffe31a] mb-4">About Me</h2>
          <p className="text-base md:text-lg text-white text-justify">
            I am a <span className="text-[#ffe31a] font-bold">full stack</span> web developer with a passion for creating
            interactive and responsive web applications. I have experience
            working with <span className="text-[#ffe31a] font-bold">JavaScript, React, Node.js</span>,
            <span className="text-[#ffe31a] font-bold">Express, PostgreSQL, Sequelize</span>,
            <span className="text-[#ffe31a] font-bold">HTML, CSS, and Git</span>. I am a quick learner and always
            looking to expand my knowledge and skill set. I am a 
            <span className="text-[#ffe31a] font-bold">team player</span> and
            I am <span className="text-[#ffe31a] font-bold">excited</span> to work with others to create amazing applications.
          </p>
          <div className="flex flex-row mt-8">
            <TabButton selectTab={() => handleTabChange("skills")} active={tab === "skills"}>
              Skills
            </TabButton>
            <TabButton selectTab={() => handleTabChange("education")} active={tab === "education"}>
              Education
            </TabButton>
            <TabButton selectTab={() => handleTabChange("certification")} active={tab === "certification"}>
              Certifications
            </TabButton>
          </div>
          <div ref={tabContentRef} className="mt-8">
            {TAB_DATA.find((t) => t.id === tab).content}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;