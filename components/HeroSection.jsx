'use client'
import React from "react";
import { TypeAnimation } from 'react-type-animation';
import Image from "next/image";

const HeroSection = () => {
  return (
    <section className="lg:py-16 mt-20">
      <div className="grid grid-cols-1 sm:grid-cols-12">
        {/* Image section first on small devices */}
        <div className="col-span-5 place-self-center order-1 sm:order-2 mt-4 lg:mt-0">
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
        
        {/* Text content section */}
        <div className="col-span-7 place-self-center text-center sm:text-left order-2 sm:order-1">
          <h1 className="mb-4 text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white ">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
              {" "}Hello, I'm{" "}
            </span>
            <br></br>
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
            />
          </h1>
          <p className="text-[#ADB7BE] text-base sm:text-lg mb-6 lg:text-xl text-justify">
            I am a <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-green-400 px-1">passionate</span> and 
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500 ">innovative</span> developer 
            dedicated to building <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500">dynamic</span>, 
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-pink-500">user-friendly</span>, and 
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-blue-500">high-performance</span> applications. 
            With expertise in <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-teal-500">web</span>, 
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">mobile</span>, 
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500">AI</span>, and 
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-pink-500">blockchain</span> development, 
            I thrive on solving complex problems and transforming ideas into reality. My journey is driven by 
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500">continuous learning</span>, 
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">collaboration</span>, and the pursuit of 
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500">cutting-edge</span> technology 
            to create <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-green-500">impactful</span> 
            digital experiences.
          </p>
          <div>
            <button className="w-full sm:w-fit px-6 py-3 rounded-full mr-4 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 hover:bg-slate-200 text-black">
              Hire Me
            </button>
            <button
              className="w-full sm:w-fit px-1 py-1 rounded-full bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500
            hover:bg-slate-800 text-white  mt-3 "
            >
              <span className="block bg-[#121212] hover:bg-slate-800 rounded-full px-5 py-2">Download CV</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
