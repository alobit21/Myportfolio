'use client';
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FaCheckCircle, FaBriefcase, FaGraduationCap, FaCode, FaMapMarkerAlt, FaCalendar, FaExternalLinkAlt } from 'react-icons/fa';

gsap.registerPlugin(ScrollTrigger);

export default function ExperienceSection() {
  const [experiences, setExperiences] = React.useState({ professional: [], academic: [], technical: [] });
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchExperiences = async () => {
      try {
        const response = await fetch('/api/experience');
        const data = await response.json();
        
        // Group data by type
        const grouped = {
          professional: data.filter(e => e.type === 'Freelance' || e.type === 'Professional'),
          academic: data.filter(e => e.type === 'Academic'),
          technical: data.filter(e => e.type === 'Skills Development' || e.type === 'Technical')
        };
        setExperiences(grouped);
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
  const sphereRefs = useRef([]);
  const cursorRef = useRef(null);
  const carouselRef = useRef(null);

  // Shadcn-style Card Component
  const ExperienceCard = ({ exp, category }) => {
    const getCategoryIcon = () => {
      switch (category) {
        case 'professional': return <FaBriefcase className="w-5 h-5 text-blue-400" />;
        case 'academic': return <FaGraduationCap className="w-5 h-5 text-green-400" />;
        case 'technical': return <FaCode className="w-5 h-5 text-purple-400" />;
        default: return <FaBriefcase className="w-5 h-5 text-blue-400" />;
      }
    };

    const getCategoryColor = () => {
      switch (category) {
        case 'professional': return 'border-blue-500/20 hover:border-blue-500/40';
        case 'academic': return 'border-green-500/20 hover:border-green-500/40';
        case 'technical': return 'border-purple-500/20 hover:border-purple-500/40';
        default: return 'border-blue-500/20 hover:border-blue-500/40';
      }
    };

    return (
      <div className={`group relative bg-gray-900/50 backdrop-blur-sm rounded-xl border ${getCategoryColor()} p-6 transition-all duration-300 hover:shadow-lg hover:shadow-[#ffe31a]/10 hover:-translate-y-1`}>
        {/* Card Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-gray-800/50 rounded-lg border border-gray-700/50">
              {getCategoryIcon()}
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white group-hover:text-[#ffe31a] transition-colors">
                {exp.title}
              </h3>
              <p className="text-gray-400 text-sm font-medium">{exp.company}</p>
            </div>
          </div>
        </div>

        {/* Meta Info */}
        <div className="flex items-center justify-between mb-4 text-xs text-gray-500">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              <FaMapMarkerAlt className="w-3 h-3" />
              <span>{exp.location}</span>
            </div>
            <div className="flex items-center space-x-1">
              <FaCalendar className="w-3 h-3" />
              <span>{exp.date}</span>
            </div>
          </div>
          <span className="px-2 py-1 bg-gray-800/50 rounded-full text-xs text-gray-400">
            {exp.type}
          </span>
        </div>

        {/* Achievements */}
        <div className="mb-4">
          <div className="flex flex-wrap gap-1">
            {exp.achievements.map((achievement, i) => (
              <span key={i} className="px-2 py-1 bg-[#ffe31a]/10 text-[#ffe31a] text-xs rounded-full border border-[#ffe31a]/20">
                {achievement}
              </span>
            ))}
          </div>
        </div>

        {/* Description */}
        <div className="mb-4">
          <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Key Responsibilities</h4>
          <ul className="space-y-2">
            {exp.description.map((point, i) => (
              <li key={i} className="flex items-start text-gray-300 text-sm">
                <FaCheckCircle className="text-[#ffe31a] mr-2 mt-0.5 flex-shrink-0 w-3 h-3" />
                <span className="leading-relaxed">{point}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Technologies */}
        <div className="border-t border-gray-800/50 pt-4">
          <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Technologies</h4>
          <div className="flex flex-wrap gap-1">
            {exp.technologies.map((tech, i) => (
              <span key={i} className="px-2 py-1 bg-gray-800/50 text-gray-300 text-xs rounded border border-gray-700/50 hover:border-[#ffe31a]/30 hover:text-[#ffe31a] transition-colors">
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Hover Effect Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#ffe31a]/5 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
      </div>
    );
  };

  return (
    <section className="relative py-16 bg-gray-900 text-white overflow-hidden font-sans min-h-screen" 
             style={{
               backgroundImage: 'url(/images/experience/experience-section.jpeg)',
               backgroundSize: '100% 100%',
               backgroundPosition: 'center',
               backgroundRepeat: 'no-repeat',
               backgroundAttachment: 'fixed',
               width: '100vw',
               marginLeft: 'calc(-50vw + 50%)',
               marginRight: 'calc(-50vw + 50%)'
             }}>
      <div className="absolute inset-0 bg-gray-900/80"></div>
      <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full opacity-20 pointer-events-none" />
      <div
        ref={cursorRef}
        className="fixed w-6 h-6 bg-[#3ca2fa] rounded-full pointer-events-none mix-blend-screen opacity-50 z-50"
      />
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
<<<<<<< HEAD
        <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center bg-clip-text text-transparent bg-gradient-to-r from-[#3ca2fa] to-[#3ca2fa]/80 drop-shadow-md">
          Experience
        </h2>

        {/* Large Devices Grid Layout */}
        <div className="hidden lg:grid grid-cols-2 gap-6" role="list" aria-label="Work and project experience">
          {experiences.map((exp, idx) => (
            <div
              key={idx}
              ref={(el) => (cardRefs.current[idx] = el)}
              className="relative bg-gray-800/80 p-6 rounded-xl shadow-lg hover:shadow-[#3ca2fa]/50 transition-all duration-300 border border-gray-700/50 backdrop-blur-sm"
              role="listitem"
              aria-label={`Experience: ${exp.title}, ${exp.company}, ${exp.date}`}
            >
              <h3 className="text-xl md:text-2xl font-semibold text-[#3ca2fa]">{exp.title}</h3>
              <span className="text-sm text-white">{exp.company} • {exp.date}</span>
              <ul className="mt-4 space-y-2">
                {exp.description.map((point, i) => (
                  <li key={i} className="flex items-start text-white opacity-90 hover:opacity-100 transition-opacity">
                    <FaCheckCircle className="checkmark text-[#3ca2fa] mr-2 mt-1 flex-shrink-0" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
=======
        <h2 className="text-4xl md:text-5xl font-bold mb-16 text-center bg-clip-text text-transparent bg-gradient-to-r from-[#ffe31a] to-[#ffd700] drop-shadow-md">
          Professional Experience
        </h2>

        {/* All Experience Cards in Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {/* Professional Experience Card */}
          {experiences.professional.map((exp, idx) => (
            <div key={idx} ref={(el) => (cardRefs.current[idx] = el)}>
              <ExperienceCard exp={exp} category="professional" />
            </div>
          ))}
          
          {/* Academic Project Card */}
          {experiences.academic.map((exp, idx) => (
            <div key={idx} ref={(el) => (cardRefs.current[idx + experiences.professional.length] = el)}>
              <ExperienceCard exp={exp} category="academic" />
            </div>
          ))}
          
          {/* Technical Skills Card */}
          {experiences.technical.map((exp, idx) => (
            <div key={idx} ref={(el) => (cardRefs.current[idx + experiences.professional.length + experiences.academic.length] = el)}>
              <ExperienceCard exp={exp} category="technical" />
>>>>>>> 3603f10 (added backend part)
            </div>
          ))}
        </div>

<<<<<<< HEAD
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
      <h3 className="text-lg font-semibold text-[#3ca2fa] mb-1">{exp.title}</h3>
      <span className="block text-white text-xs mb-2">
        {exp.company} • {exp.date}
      </span>
      <ul className="space-y-2">
        {exp.description.map((point, i) => (
          <li key={i} className="flex items-start text-white opacity-90 hover:opacity-100">
            <FaCheckCircle className="checkmark text-[#3ca2fa] mr-2 mt-1 flex-shrink-0" />
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
            aria-label="Previous experience"
          >
            Previous
          </button>
          <button
            className="px-4 py-2 bg-[#3ca2fa] text-white rounded-full hover:bg-[#3ca2fa]/80 transition"
            onClick={() => {
              carouselRef.current.scrollBy({ left: 300, behavior: 'smooth' });
            }}
            aria-label="Next experience"
          >
            Next
          </button>
=======
        {/* Category Summary Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
          <div className="text-center p-6 bg-blue-500/10 rounded-xl border border-blue-500/20">
            <FaBriefcase className="w-8 h-8 text-blue-400 mx-auto mb-3" />
            <h3 className="text-lg font-semibold text-blue-400 mb-2">Professional</h3>
            <p className="text-gray-400 text-sm">Real-world freelance projects and client work</p>
          </div>
          <div className="text-center p-6 bg-green-500/10 rounded-xl border border-green-500/20">
            <FaGraduationCap className="w-8 h-8 text-green-400 mx-auto mb-3" />
            <h3 className="text-lg font-semibold text-green-400 mb-2">Academic</h3>
            <p className="text-gray-400 text-sm">University projects and research work</p>
          </div>
          <div className="text-center p-6 bg-purple-500/10 rounded-xl border border-purple-500/20">
            <FaCode className="w-8 h-8 text-purple-400 mx-auto mb-3" />
            <h3 className="text-lg font-semibold text-purple-400 mb-2">Technical</h3>
            <p className="text-gray-400 text-sm">Continuous learning and skill development</p>
          </div>
>>>>>>> 3603f10 (added backend part)
        </div>
      </div>
    </section>
  );
}
