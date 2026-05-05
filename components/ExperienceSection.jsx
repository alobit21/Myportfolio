'use client';
import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FaCheckCircle, FaBriefcase, FaGraduationCap, FaCode, FaMapMarkerAlt, FaCalendar } from 'react-icons/fa';

gsap.registerPlugin(ScrollTrigger);

export default function ExperienceSection() {
  const [experiences, setExperiences] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchExperiences = async () => {
      try {
        const response = await fetch('/api/experience');
        const data = await response.json();
        console.log('Frontend: Received experiences:', data.length, data);
        setExperiences(data);
      } catch (error) {
        console.error('Error fetching experiences:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchExperiences();
  }, []);

  const canvasRef = useRef(null);
  const cardRefs = useRef([]);
  const cursorRef = useRef(null);
  const carouselRef = useRef(null);

  // Ensure cardRefs array is properly sized
  useEffect(() => {
    cardRefs.current = cardRefs.current.slice(0, experiences.length);
  }, [experiences]);

  useEffect(() => {
    if (loading || experiences.length === 0) return;

    // Initialize animations - TEMPORARILY DISABLED FOR DEBUG
    // gsap.from(cardRefs.current.filter(Boolean), {
    //   y: 50,
    //   opacity: 0,
    //   duration: 0.8,
    //   stagger: 0.2,
    //   ease: 'power3.out',
    //   scrollTrigger: {
    //     trigger: '#experience-section',
    //     start: 'top 80%',
    //   }
    // });
  }, [loading, experiences]);

  if (loading) return <div className="py-20 text-center text-white">Loading Experiences...</div>;

  return (
    <section id="experience-section" className="relative py-20 bg-gray-900 overflow-hidden">
      <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full opacity-20 pointer-events-none" />
      <div
        ref={cursorRef}
        className="fixed w-6 h-6 bg-[#3ca2fa] rounded-full pointer-events-none mix-blend-screen opacity-50 z-50"
      />
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center bg-clip-text text-transparent bg-gradient-to-r from-[#3ca2fa] to-[#3ca2fa]/80 drop-shadow-md">
          Experience
        </h2>
       
        {/* Large Devices Grid Layout */}
        <div className="hidden lg:grid grid-cols-2 gap-6 auto-rows-min" role="list" aria-label="Work and project experience">
          {experiences.map((exp, idx) => (
            <div
              key={exp.id || idx}
              ref={(el) => (cardRefs.current[idx] = el)}
              className="relative bg-gray-800/80 p-6 rounded-xl shadow-lg hover:shadow-[#3ca2fa]/50 transition-all duration-300 border border-gray-700/50 backdrop-blur-sm"
              role="listitem"
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl md:text-2xl font-semibold text-[#3ca2fa]">{exp.title}</h3>
                  <p className="text-white font-medium">{exp.company}</p>
                </div>
                <span className="text-sm text-gray-400">{exp.date}</span>
              </div>
              
              <div className="flex items-center space-x-2 text-xs text-gray-500 mb-4">
                <FaMapMarkerAlt className="text-[#3ca2fa]" />
                <span>{exp.location}</span>
                <span className="px-2 py-0.5 bg-gray-700 rounded-full">{exp.type}</span>
              </div>

              <ul className="mt-4 space-y-2">
                {exp.description.map((point, i) => (
                  <li key={i} className="flex items-start text-white opacity-90 hover:opacity-100 transition-opacity">
                    <FaCheckCircle className="text-[#3ca2fa] mr-2 mt-1 flex-shrink-0" />
                    <span className="text-sm">{point}</span>
                  </li>
                ))}
              </ul>

              {exp.technologies && exp.technologies.length > 0 && (
                <div className="mt-6 flex flex-wrap gap-2">
                  {exp.technologies.map((tech, i) => (
                    <span key={i} className="px-2 py-1 bg-[#3ca2fa]/10 text-[#3ca2fa] text-[10px] rounded-md border border-[#3ca2fa]/20">
                      {tech}
                    </span>
                  ))}
                </div>
              )}
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
              key={exp.id || idx}
              className="snap-center flex-shrink-0 min-w-[85%] max-w-[90%] bg-gray-800/90 p-5 rounded-xl shadow-lg border border-gray-700/50 backdrop-blur-sm text-sm break-words"
              role="listitem"
            >
              <h3 className="text-lg font-semibold text-[#3ca2fa] mb-1">{exp.title}</h3>
              <p className="text-white text-xs mb-1">{exp.company}</p>
              <span className="block text-gray-400 text-[10px] mb-3">{exp.date}</span>
              
              <ul className="space-y-2">
                {exp.description.map((point, i) => (
                  <li key={i} className="flex items-start text-white opacity-90">
                    <FaCheckCircle className="text-[#3ca2fa] mr-2 mt-1 flex-shrink-0" />
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
            className="px-4 py-2 bg-[#3ca2fa] text-white rounded-full hover:bg-[#3ca2fa]/80 transition"
            onClick={() => {
              carouselRef.current.scrollBy({ left: -300, behavior: 'smooth' });
            }}
          >
            Prev
          </button>
          <button
            className="px-4 py-2 bg-[#3ca2fa] text-white rounded-full hover:bg-[#3ca2fa]/80 transition"
            onClick={() => {
              carouselRef.current.scrollBy({ left: 300, behavior: 'smooth' });
            }}
          >
            Next
          </button>
        </div>
      </div>
    </section>
  );
}
