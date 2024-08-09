"use client";
import React from "react";
import Image from "next/image";
import { TypeAnimation } from "react-type-animation";
import { motion } from "framer-motion";
import Link from "next/link";

const HeroSection = () => {
  return (
    <section className="py-8 lg:py-16 pt-16">
      <div className="container mx-auto grid grid-cols-1 sm:grid-cols-12 gap-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="sm:col-span-7 lg:col-span-8 text-center sm:text-left flex flex-col justify-center items-center sm:items-start"
        >
          <h1 className="text-white mb-4 text-4xl sm:text-5xl lg:text-7xl font-extrabold leading-tight">
            <span className=" text-white bg-clip-text bg-gradient-to-r from-primary-400 to-secondary-600">
              Hello, My name is <span className="text-red-200">Mac</span>, I&apos;m{" "}
            </span>
            <br />
            <TypeAnimation
              sequence={[
                "Web Developer",
                1000,
                "Mobile Developer",
                1000,
                "UI/UX Designer",
                1000,
              ]}
              wrapper="span"
              speed={50}
              repeat={Infinity}
            />
          </h1>
          <p className="text-[#ADB7BE] text-base sm:text-lg mb-6 lg:text-xl">
  As a passionate and dedicated software engineer, I specialize in creating
  innovative and efficient solutions across a diverse range of technologies.
  With expertise in <span className="text-red-300 text-xl">JavaScript, PHP, Python, React, and Angular</span> , I bring a
  versatile skill set to every project. My portfolio highlights my ability to
  tackle complex challenges and deliver high-quality, user-centric applications.
  I am driven by a desire to push the boundaries of what's possible in
  technology.
</p>


         <div className="flex flex-col sm:flex-row gap-4">
  <Link
    href="/#contact"
    className="px-6 py-3 rounded-full bg-gradient-to-br from-primary-500 to-secondary-500 text-white text-center border-2 border-primary-500 hover:bg-slate-200 hover:text-primary-500 transition-all duration-300"
  >
    Hire Me
  </Link>
  <Link
    href="/"
    className="px-1 py-1 rounded-full bg-gradient-to-br from-primary-500 to-secondary-500 text-white text-center border-2 border-primary-500 transition-all duration-300"
  >
    <span className="block bg-[#121212] hover:bg-slate-800 rounded-full px-5 py-2 border-2 border-primary-500">
      Download CV
    </span>
  </Link>
</div>

        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="sm:col-span-5 lg:col-span-4 flex justify-center sm:justify-end items-center"
        >
          <div className="rounded-full bg-[#181818] w-[250px] h-[250px] lg:w-[350px] lg:h-[350px] relative">
            <Image
              src="/software.PNG"
              alt="hero image"
              className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
              width={300}
              height={300}
              layout="intrinsic"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
