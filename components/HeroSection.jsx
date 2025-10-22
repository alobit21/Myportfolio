'use client'
import React from 'react';
import Image from "next/image";

const HeroSection = () => {
  const skills = ['Web Development', 'Mobile Apps', 'AI Solutions', 'Blockchain'];

  return (
    <section className="min-h-screen flex items-center justify-center  bg-gray-900 text-white py-16 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div className="text-center lg:text-left">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
              <span className="block text-gray-300">Hi, I'm</span>
              <span className="text-yellow-400">Aloyce Mtavangu</span>
            </h1>
            
            <h2 className="text-2xl sm:text-3xl font-semibold mb-6 text-gray-300">
              Full Stack Developer
            </h2>
            
            <p className="text-lg text-gray-300 mb-8 leading-relaxed max-w-2xl mx-auto lg:mx-0">
              I craft exceptional digital experiences with clean, efficient code and modern technologies. 
              Specializing in building responsive web applications and scalable solutions.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <a 
                href="#contact" 
                className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-semibold py-3 px-8 rounded-lg transition-colors duration-300"
              >
                Get In Touch
              </a>
              <a 
                href="/resume.pdf" 
                download
                className="border-2 border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:bg-opacity-10 font-semibold py-3 px-8 rounded-lg transition-colors duration-300"
              >
                View Resume
              </a>
            </div>

            <div className="mt-12">
              <p className="text-gray-400 mb-4">Technologies I work with:</p>
              <div className="flex flex-wrap gap-3 justify-center lg:justify-start">
                {skills.map((skill, index) => (
                  <span 
                    key={index}
                    className="bg-gray-800 text-yellow-400 text-sm font-medium px-4 py-2 rounded-full"
                  >
                    {skill}
                  </span>
                ))}
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