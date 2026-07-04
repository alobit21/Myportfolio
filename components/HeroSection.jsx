'use client'
import React, { useState, useEffect } from 'react';
import Image from "next/image";

const HeroSection = () => {
  const [profile, setProfile] = useState(null);
  const [skills, setSkills] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [profRes, skillsRes] = await Promise.all([
          fetch('/api/profile'),
          fetch('/api/skills')
        ]);
        setProfile(await profRes.json());
        setSkills(await skillsRes.json());
      } catch (error) {
        console.error("Error fetching hero data:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center text-white py-16 px-4 sm:px-6 lg:px-8 overflow-hidden" 
             style={{
               backgroundImage: 'url(/images/hero-section/hero-section.jpeg)',
               backgroundSize: '100% 100%',
               backgroundPosition: 'center',
               backgroundRepeat: 'no-repeat',
               backgroundAttachment: 'fixed',
               width: '100vw',
               marginLeft: 'calc(-50vw + 50%)',
               marginRight: 'calc(-50vw + 50%)'
             }}>
      <div className="absolute inset-0 bg-gray-900/80"></div>
      <div className="relative z-10 container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div className="text-center lg:text-left">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
              <span className="block text-gray-300">Hi, I'm</span>
              <span className="text-[#3ca2fa]">{profile?.name || "Aloyce Mtavangu"}</span>
            </h1>
            
            <h2 className="text-2xl sm:text-3xl font-semibold mb-6 text-gray-300">
              {profile?.title || "Full Stack Developer"}
            </h2>
            
            <p className="text-lg text-gray-300 mb-8 leading-relaxed max-w-2xl mx-auto lg:mx-0">
              {profile?.bio || "I craft exceptional digital experiences with clean, efficient code and modern technologies. Specializing in building responsive web applications and scalable solutions."}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <a 
                href="#contact" 
                className="bg-[#3ca2fa] hover:bg-[#3ca2fa]/80 text-gray-900 font-semibold py-3 px-8 rounded-lg transition-colors duration-300"
              >
                Get In Touch
              </a>
              <a 
                href={profile?.cvUrl || "/resume.pdf"} 
                target="_blank"
                rel="noopener noreferrer"
                className="border-2 border-[#3ca2fa] text-[#3ca2fa] hover:bg-[#3ca2fa] hover:bg-opacity-10 font-semibold py-3 px-8 rounded-lg transition-colors duration-300"
              >
                View Resume
              </a>
            </div>

            <div className="mt-12">
              <p className="text-gray-400 mb-4">Technologies I work with:</p>
              <div className="flex flex-wrap gap-3 justify-center lg:justify-start">
                {skills.length > 0 ? skills.slice(0, 5).map((skill) => (
                  <span 
                    key={skill.id}
                    className="bg-gray-800 text-[#3ca2fa] text-sm font-medium px-4 py-2 rounded-full border border-gray-700"
                  >
                    {skill.name}
                  </span>
                )) : (
                  ['Web Development', 'Mobile Apps', 'AI Solutions', 'Blockchain'].map((skill, index) => (
                    <span 
                      key={index}
                      className="bg-gray-800 text-[#3ca2fa] text-sm font-medium px-4 py-2 rounded-full border border-gray-700"
                    >
                      {skill}
                    </span>
                  ))
                )}
              </div>
            </div>
          </div>

          {/* Image */}
          <div className="relative">
            <div className="relative w-full max-w-md mx-auto">
              <div className="relative z-10">
                <Image
                  src="/images/developer-dark.svg"
                  alt="Mac - Full Stack Developer"
                  width={500}
                  height={500}
                  className="w-full h-auto"
                  priority
                />
              </div>
             </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;