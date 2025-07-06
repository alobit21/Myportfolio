'use client';
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import * as THREE from 'three';
import { FaCheckCircle } from 'react-icons/fa';

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

export default function ExperienceSection() {
  const canvasRef = useRef(null);
  const cardRefs = useRef([]);
  const sphereRefs = useRef([]);
  const cursorRef = useRef(null);
  const carouselRef = useRef(null);

  // Placeholder for custom effects: GSAP Timeline, SVG shapes, or Three.js enhancements
  // Example customization:
  // - Use clip-path: polygon(...) for hexagonal cards
  // - Add <svg> blobs inside cards with animated shapes
  // - Wrap each card in <motion.div> for Timeline animation
  // - Replace canvasRef rendering with 3D cards from Three.js scene

  // The JSX structure remains similar to what you provided
  // The key change is responsiveness fix via tailwind and better layout control below

  return (
    <section className="relative py-16 bg-gradient-to-b from-gray-900 to-gray-800 text-white overflow-hidden font-sans">
      <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full opacity-20 pointer-events-none" />
      <div
        ref={cursorRef}
        className="fixed w-6 h-6 bg-[#ffe31a] rounded-full pointer-events-none mix-blend-screen opacity-50 z-50"
      />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center bg-clip-text text-transparent bg-gradient-to-r from-[#ffe31a] to-[#ffd700] drop-shadow-md">
          Experience
        </h2>

        {/* Large Devices Grid Layout */}
        <div className="hidden lg:grid grid-cols-2 gap-6" role="list" aria-label="Work and project experience">
          {experiences.map((exp, idx) => (
            <div
              key={idx}
              ref={(el) => (cardRefs.current[idx] = el)}
              className="relative bg-gray-800/80 p-6 rounded-xl shadow-lg hover:shadow-[#ffe31a]/50 transition-all duration-300 border border-gray-700/50 backdrop-blur-sm"
              role="listitem"
              aria-label={`Experience: ${exp.title}, ${exp.company}, ${exp.date}`}
            >
              <h3 className="text-xl md:text-2xl font-semibold text-[#ffe31a]">{exp.title}</h3>
              <span className="text-sm text-white">{exp.company} • {exp.date}</span>
              <ul className="mt-4 space-y-2">
                {exp.description.map((point, i) => (
                  <li key={i} className="flex items-start text-white opacity-90 hover:opacity-100 transition-opacity">
                    <FaCheckCircle className="checkmark text-[#ffe31a] mr-2 mt-1 flex-shrink-0" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

       {/* Carousel for small devices only */}
<div
  className="lg:hidden flex overflow-x-auto space-x-4 px-4 py-2 scroll-smooth snap-x snap-mandatory"
  ref={carouselRef}
  role="list"
  aria-label="Experience carousel"
>
  {experiences.map((exp, idx) => (
    <div
      key={idx}
      ref={cardRefs.current[idx]}
      className="snap-center flex-shrink-0 min-w-[85%] max-w-[90%] bg-gray-800/90 p-5 rounded-xl shadow-lg border border-gray-700/50 backdrop-blur-sm text-sm break-words"
      role="listitem"
    >
      <h3 className="text-lg font-semibold text-[#ffe31a] mb-1">{exp.title}</h3>
      <span className="block text-white text-xs mb-2">
        {exp.company} • {exp.date}
      </span>
      <ul className="space-y-2">
        {exp.description.map((point, i) => (
          <li key={i} className="flex items-start text-white opacity-90 hover:opacity-100">
            <FaCheckCircle className="checkmark text-[#ffe31a] mr-2 mt-1 flex-shrink-0" />
            <span className="break-words">{point}</span>
          </li>
        ))}
      </ul>
    </div>
  ))}
</div>


        {/* Carousel Controls for Small Devices */}
        <div className="lg:hidden flex justify-center mt-6 space-x-4">
          <button
            className="px-4 py-2 bg-[#ffe31a] text-white rounded-full hover:bg-[#ffd700] transition"
            onClick={() => {
              carouselRef.current.scrollBy({ left: -300, behavior: 'smooth' });
            }}
            aria-label="Previous experience"
          >
            Previous
          </button>
          <button
            className="px-4 py-2 bg-[#ffe31a] text-white rounded-full hover:bg-[#ffd700] transition"
            onClick={() => {
              carouselRef.current.scrollBy({ left: 300, behavior: 'smooth' });
            }}
            aria-label="Next experience"
          >
            Next
          </button>
        </div>
      </div>
    </section>
  );
}
