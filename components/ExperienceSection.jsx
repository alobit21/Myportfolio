"use client"; // Required for client-side libraries

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import * as THREE from 'three';

gsap.registerPlugin(ScrollTrigger);

const experiences = [
  {
    title: 'Final Year Project – AI Chatbot System',
    company: 'University Capstone',
    date: 'Sept 2023 – May 2024',
    description: [
      'Designed and developed an AI-powered chatbot for student inquiries using React and Node.js.',
      'Integrated OpenAI API to simulate real-time answers.',
      'Collaborated in a team of 3, handling frontend and backend integration.'
    ]
  },
  {
    title: 'Freelance Web Developer',
    company: 'Self-Employed',
    date: '2022 – Present',
    description: [
      'Built and deployed custom websites for small businesses and individuals using React, HTML/CSS, and Tailwind.',
      'Created responsive designs optimized for mobile and desktop.',
      'Used Git and GitHub for version control and deployment via Vercel.'
    ]
  },
  {
    title: 'Learning & Personal Projects',
    company: 'Ongoing',
    date: '2021 – Present',
    description: [
      'Built personal projects including portfolios, task managers, and blog templates.',
      'Learning modern tech stacks like React, Next.js, Tailwind CSS, Firebase, and Git.',
      'Actively improving problem-solving skills through LeetCode and building in public on GitHub.'
    ]
  }
];

// top remains the same...

export default function ExperienceSection() {
  const canvasRef = useRef(null);
  const cardRefs = useRef([]);
  const sphereRefs = useRef([]);
  const cursorRef = useRef(null);
  cardRefs.current = experiences.map((_, i) => cardRefs.current[i] ?? React.createRef());
  sphereRefs.current = experiences.map((_, i) => sphereRefs.current[i] ?? React.createRef());

  // GSAP & card animation useEffect (unchanged)...

  // === Earth & Three.js effect with realistic colors ===
 useEffect(() => {
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  const renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current, alpha: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  const textureLoader = new THREE.TextureLoader();

  const earthGeometry = new THREE.SphereGeometry(5, 64, 64);
  const earthMaterial = new THREE.MeshPhongMaterial({
    map: textureLoader.load('https://threejs.org/examples/textures/planets/earth_atmos_2048.jpg'),
    normalMap: textureLoader.load('https://threejs.org/examples/textures/planets/earth_normal_2048.jpg'),
    specularMap: textureLoader.load('https://threejs.org/examples/textures/planets/earth_specular_2048.jpg'),
    color: 0xffffff,
    shininess: 10,
  });
  const earth = new THREE.Mesh(earthGeometry, earthMaterial);
  scene.add(earth);

  const cloudGeometry = new THREE.SphereGeometry(5.05, 64, 64);
  const cloudMaterial = new THREE.MeshPhongMaterial({
    map: textureLoader.load('https://threejs.org/examples/textures/planets/earth_clouds_2048.png'),
    transparent: true,
    opacity: 0.6,
    color: 0xffffff,
    blending: THREE.AdditiveBlending,
  });
  const clouds = new THREE.Mesh(cloudGeometry, cloudMaterial);
  scene.add(clouds);

  const atmosphereGeometry = new THREE.SphereGeometry(5.1, 64, 64);
  const atmosphereMaterial = new THREE.MeshBasicMaterial({
    color: 0x66ccff,
    transparent: true,
    opacity: 0.25,
    blending: THREE.AdditiveBlending,
  });
  const atmosphere = new THREE.Mesh(atmosphereGeometry, atmosphereMaterial);
  scene.add(atmosphere);

  // Lighting and stars (if any)...

  // Timeline spheres
  const sphereGeometry = new THREE.SphereGeometry(0.2, 32, 32);
  const sphereMaterial = new THREE.MeshBasicMaterial({ color: 0x00e5ff });
  sphereRefs.current.forEach((ref, idx) => {
    const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
    sphere.position.set(-2, -idx * 10, 0);
    scene.add(sphere);
    ref.current = sphere;
  });

  camera.position.z = 15;

  // ✅ Define handlers in-scope
  let mouseX = 0;
  let mouseY = 0;
  const onMouseMove = (event) => {
    mouseX = (event.clientX / window.innerWidth) * 2 - 1;
    mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
  };
  const handleResize = () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  };

  window.addEventListener('mousemove', onMouseMove);
  window.addEventListener('resize', handleResize);

  const scrollTrigger = ScrollTrigger.create({
    trigger: canvasRef.current,
    start: 'top bottom',
    end: 'bottom top',
    scrub: 1,
    onUpdate: (self) => {
      earth.rotation.y = self.progress * Math.PI * 2;
      clouds.rotation.y = self.progress * Math.PI * 2 + 0.01;
      atmosphere.rotation.y = self.progress * Math.PI * 2;
    },
  });

  const animate = () => {
    requestAnimationFrame(animate);

    earth.rotation.y += (mouseX * 0.2 - (earth.rotation.y % (Math.PI * 2))) * 0.05;
    earth.rotation.x += (mouseY * 0.2 - earth.rotation.x) * 0.05;
    clouds.rotation.y += 0.001;
    clouds.rotation.x += (mouseY * 0.2 - clouds.rotation.x) * 0.05;
    atmosphere.rotation.y += (mouseX * 0.2 - (atmosphere.rotation.y % (Math.PI * 2))) * 0.05;
    atmosphere.rotation.x += (mouseY * 0.2 - atmosphere.rotation.x) * 0.05;

    renderer.render(scene, camera);
  };

  if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    animate();
  }

  // ✅ Cleanup
  return () => {
    window.removeEventListener('mousemove', onMouseMove);
    window.removeEventListener('resize', handleResize);
    scrollTrigger.kill();
    renderer.dispose();
  };
}, []);

  // Custom cursor useEffect (unchanged)...

  // === Updated JSX Return ===
  return (
    <section className="relative py-12 bg-gradient-to-b from-gray-900 to-gray-800 text-white overflow-hidden">
      <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full opacity-30" />
      <div
        ref={cursorRef}
        className="fixed w-6 h-6 bg-cyan-500 rounded-full pointer-events-none mix-blend-screen opacity-50 z-50"
      />
      <div className="container mx-auto px-4">
        <h2
          className="text-4xl font-bold mb-12 text-center bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-600"
          data-aos="fade-down"
        >
          Experience
        </h2>
        <div className="relative ml-4">
          {experiences.map((exp, idx) => (
            <div
              key={idx}
              ref={cardRefs.current[idx]}
              className={`mb-10 ml-6 p-6 rounded-xl transition-all duration-300
                bg-gray-900 text-[#ffe31a]
                ${idx % 2 === 0 ? 'border-r-4 border-white' : 'border-l-4 border-[#ffe31a]'}
                shadow-lg hover:shadow-cyan-500/50
              `}
              data-aos="fade-up"
              data-aos-delay={idx * 200}
            >
              <div className="absolute w-4 h-4 bg-transparent rounded-full -left-2 top-1.5 backdrop-blur-lg" />
              <h3 className="text-2xl font-semibold">{exp.title}</h3>
              <span className="text-sm text-white">{exp.company} • {exp.date}</span>
              <ul className="mt-4 list-disc list-inside text-white space-y-2">
                {exp.description.map((point, i) => (
                  <li key={i} className="opacity-90 hover:opacity-100 transition-opacity">
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
