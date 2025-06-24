'use client'
import React, { useEffect, useRef } from "react";
import { TypeAnimation } from 'react-type-animation';
import * as THREE from 'three';
import { gsap } from 'gsap';
import Image from "next/image";

const HeroSection = () => {
  const canvasRef = useRef(null);
  const textRef = useRef(null);
  const buttonRef = useRef(null);
  const imageRef = useRef(null);

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

    for (let i = 0; i < 2000; i++) {
      const x = (Math.random() - 0.5) * 400;
      const y = (Math.random() - 0.5) * 400;
      const z = (Math.random() - 0.5) * 400;
      vertices.push(x, y, z);
      colors.push(1, 227 / 255, 26 / 255); // #ffe31a
    }

    geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
    geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({ size: 2, vertexColors: true });
    const particles = new THREE.Points(geometry, material);
    scene.add(particles);

    camera.position.z = 200;

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      particles.rotation.y += 0.002;
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
      buttonRef.current,
      { opacity: 0, scale: 0.8 },
      { opacity: 1, scale: 1, duration: 1, delay: 1, ease: "elastic.out(1, 0.5)" }
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

  return (
    <section className="lg:py-16 mt-20   relative overflow-hidden w-full">
      <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full opacity-50" />
      <div className="grid grid-cols-1 sm:grid-cols-12 relative z-10">
        {/* Text content section */}
        <div className="col-span-7 place-self-center text-center sm:text-left order-2 sm:order-1" ref={textRef}>
          <h1 className="mb-4 text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white">
            <span className="text-[#ffe31a]">
              Hello, I'm
            </span>
            <br />
            <TypeAnimation
              sequence={[
                'Mac',
                1000,
                'Web developer',
                1000,
                'Mobile Developer',
                1000,
                'AI Developer',
                1000,
                'Blockchain Developer',
                1000,
              ]}
              wrapper="span"
              speed={50}
              repeat={Infinity}
              className="text-[#ffe31a]"
            />
          </h1>
          <p className="text-white text-base sm:text-lg mb-6 lg:text-xl text-justify">
            I am a <span className="text-[#ffe31a]">passionate</span> and 
            <span className="text-[#ffe31a]">innovative</span> developer 
            dedicated to building <span className="text-[#ffe31a]">dynamic</span>, 
            <span className="text-[#ffe31a]">user-friendly</span>, and 
            <span className="text-[#ffe31a]">high-performance</span> applications. 
            With expertise in <span className="text-[#ffe31a]">web</span>, 
            <span className="text-[#ffe31a]">mobile</span>, 
            <span className="text-[#ffe31a]">AI</span>, and 
            <span className="text-[#ffe31a]">blockchain</span> development, 
            I thrive on solving complex problems and transforming ideas into reality. 
            My journey is driven by 
            <span className="text-[#ffe31a]">continuous learning</span>, 
            <span className="text-[#ffe31a]">collaboration</span>, and the pursuit of 
            <span className="text-[#ffe31a]">cutting-edge</span> technology 
            to create <span className="text-[#ffe31a]">impactful</span> 
            digital experiences.
          </p>
          <div ref={buttonRef}>
            <button className="w-full sm:w-fit px-6 py-3 rounded-full mr-4 bg-[#ffe31a] text-gray-900 hover:bg-white transition-all duration-300">
              Hire Me
            </button>
            <button className="w-full sm:w-fit px-6 py-3 rounded-full bg-transparent border-2 border-[#ffe31a] text-[#ffe31a] hover:bg-[#ffe31a] hover:text-gray-900 transition-all duration-300 mt-3 sm:mt-0">
              Download CV
            </button>
          </div>
        </div>
        {/* Image section */}
        <div className="col-span-5 place-self-center order-1 sm:order-2 mt-4 lg:mt-0" ref={imageRef}>
          <div className="rounded-full bg-[#181818] w-[250px] h-[250px] lg:w-[400px] lg:h-[400px] relative">
            <Image
              src="/images/developer-dark.svg"
              alt="hero-image"
              className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
              width={300}
              height={300}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;