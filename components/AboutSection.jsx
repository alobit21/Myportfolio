'use client'
import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { FaGraduationCap, FaSchool, FaUniversity } from "react-icons/fa";

const skills = [
  { name: "HTML", level: 90, color: "#E44D26" },
  { name: "CSS", level: 85, color: "#264DE4" },
  { name: "JavaScript", level: 80, color: "#F0DB4F" },
  { name: "React", level: 75, color: "#61DAFB" },
  { name: "Node.js", level: 70, color: "#68A063" },
  { name: "Python", level: 65, color: "#3776AB" },
];

const education = [
  {
    id: 1,
    title: "University of Dodoma",
    type: "University",
    date: "2022 - Present",
    icon: <FaUniversity className="text-yellow-400 text-xl" />,
    description: "Pursuing a degree in Computer Science. Actively participating in coding competitions and open source projects."
  },
  {
    id: 2,
    title: "Njombe Secondary School",
    type: "Advanced Level",
    date: "2020 - 2022",
    icon: <FaSchool className="text-yellow-400 text-xl" />,
    description: "Completed Advanced Level Education with focus on Physics, Chemistry, and Mathematics (PCM)."
  },
  {
    id: 3,
    title: "Mkalala Secondary School",
    type: "Ordinary Level",
    date: "2016 - 2019",
    icon: <FaSchool className="text-yellow-400 text-xl" />,
    description: "Completed Ordinary Level Education. Active participant in science and mathematics competitions."
  },
  {
    id: 4,
    title: "Ikwega Primary School",
    type: "Primary Education",
    date: "2007 - 2015",
    icon: <FaGraduationCap className="text-yellow-400 text-xl" />,
    description: "Completed primary education with excellent academic performance. Developed strong foundation in core subjects."
  }
];

const expertise = [
  { name: "Web Development", level: 90 },
  { name: "UI/UX Design", level: 80 },
  { name: "Mobile Development", level: 75 },
  { name: "Backend Development", level: 85 },
  { name: "Database Design", level: 80 },
  { name: "DevOps", level: 70 },
];

const CircularProgress = ({ percentage, color = "#F59E0B", size = 120, strokeWidth = 10 }) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
      <svg className="transform -rotate-90" width={size} height={size}>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="transparent"
          stroke="#374151"
          strokeWidth={strokeWidth}
          className="opacity-30"
        />
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="transparent"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
          className="drop-shadow-glow"
          style={{
            filter: `drop-shadow(0 0 5px ${color}40)`
          }}
        />
      </svg>
      <div className="absolute text-center">
        <span className="text-2xl font-bold text-white">{percentage}%</span>
      </div>
    </div>
  );
};

const TimelineItem = ({ item, isLast }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  return (
    <div 
      ref={ref}
      className={`relative pl-8 pb-8 border-l-2 border-gray-700 ${isLast ? '' : 'border-opacity-50'}`}
    >
      <div className="absolute w-4 h-4 bg-yellow-400 rounded-full -left-2 top-1"></div>
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={isVisible ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.5 }}
        className="bg-gray-800/50 p-6 rounded-lg border border-gray-700/50 hover:border-yellow-400/30 transition-all duration-300"
      >
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-gray-700/50 rounded-full">
            {item.icon}
          </div>
          <div>
            <h4 className="text-lg font-semibold text-yellow-400">{item.title}</h4>
            <p className="text-sm text-gray-400">{item.type} • {item.date}</p>
          </div>
        </div>
        <p className="text-gray-300 mt-2">{item.description}</p>
      </motion.div>
    </div>
  );
};

const AboutSection = () => {
  const [activeTab, setActiveTab] = useState("about");
  const aboutRef = useRef(null);
  const skillsRef = useRef(null);
  const educationRef = useRef(null);

  const scrollToSection = (ref) => {
    ref.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="about" className="py-20 bg-gray-900 text-white overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-3">About Me</h2>
          <div className="w-24 h-1 bg-yellow-400 mx-auto rounded-full"></div>
        </div>

        <div className="flex flex-col lg:flex-row gap-12 items-start">
          <motion.div 
            className="lg:w-1/3"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <div className="relative w-64 h-64 mx-auto lg:mx-0">
              <Image
                src="/images/imgpro.png"
                alt="Profile"
                fill
                className="rounded-full border-4 border-yellow-400 object-cover"
              />
            </div>
          </motion.div>

          <div className="lg:w-2/3 w-full">
            <div className="flex flex-wrap gap-1 bg-gray-800/50 p-1 rounded-lg border border-gray-700/50 w-full mb-8">
              <button 
                onClick={() => setActiveTab("about")}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-300 ${
                  activeTab === "about" 
                    ? 'bg-yellow-400 text-gray-900' 
                    : 'text-gray-300 hover:bg-gray-700/50 hover:text-white'
                }`}
              >
                About
              </button>
              <button 
                onClick={() => setActiveTab("education")}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-300 ${
                  activeTab === "education" 
                    ? 'bg-yellow-400 text-gray-900' 
                    : 'text-gray-300 hover:bg-gray-700/50 hover:text-white'
                }`}
              >
                Education
              </button>
              <button 
                onClick={() => setActiveTab("expertise")}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-300 ${
                  activeTab === "expertise" 
                    ? 'bg-yellow-400 text-gray-900' 
                    : 'text-gray-300 hover:bg-gray-700/50 hover:text-white'
                }`}
              >
                Expertise
              </button>
              <button 
                onClick={() => setActiveTab("skills")}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-300 ${
                  activeTab === "skills" 
                    ? 'bg-yellow-400 text-gray-900' 
                    : 'text-gray-300 hover:bg-gray-700/50 hover:text-white'
                }`}
              >
                Skills
              </button>
            </div>

            <div className="mt-6">
              {activeTab === "about" && (
                <div ref={aboutRef}>
                  <h3 className="text-2xl font-bold text-yellow-400 mb-4">Get to know me!</h3>
                  <p className="text-gray-300 mb-4">
                    I'm a passionate Full Stack Developer with expertise in building modern web applications.
                    With a strong foundation in both front-end and back-end technologies, I create seamless
                    user experiences and robust server-side solutions.
                  </p>
                  <p className="text-gray-300 mb-6">
                    My journey in web development started with a curiosity about how things work, which led me
                    to pursue a career in technology. I'm constantly learning and staying up-to-date with the
                    latest industry trends and best practices.
                  </p>
                  <button className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-medium py-2 px-6 rounded-md transition-all duration-300">
                    Download CV
                  </button>
                </div>
              )}

              {activeTab === "education" && (
                <div ref={educationRef} className="w-full">
                  <h3 className="text-2xl font-bold text-yellow-400 mb-6">Education Timeline</h3>
                  <div className="relative">
                    {education.map((item, index) => (
                      <TimelineItem 
                        key={item.id} 
                        item={item} 
                        isLast={index === education.length - 1} 
                      />
                    ))}
                  </div>
                </div>
              )}

              {activeTab === "expertise" && (
                <div className="w-full">
                  <h3 className="text-2xl font-semibold text-yellow-400 mb-8">My Expertise</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {expertise.map((item, index) => (
                      <motion.div 
                        key={index}
                        className="flex flex-col items-center p-6 bg-gray-800/50 rounded-2xl border border-gray-700/50 hover:border-yellow-500/30 transition-colors"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                      >
                        <div className="mb-4">
                          <CircularProgress 
                            percentage={item.level} 
                            color={index % 2 === 0 ? "#F59E0B" : "#3B82F6"}
                            size={120}
                            strokeWidth={10}
                          />
                        </div>
                        <h4 className="text-xl font-semibold text-white mb-2">{item.name}</h4>
                        <p className="text-gray-400 text-center">
                          {item.level}% Mastery
                        </p>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === "skills" && (
                <div ref={skillsRef} className="w-full">
                  <h3 className="text-2xl font-semibold text-yellow-400 mb-8">My Skills</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {skills.map((skill, index) => (
                      <motion.div 
                        key={index} 
                        className="space-y-3 bg-gray-800/50 p-4 rounded-xl border border-gray-700/50 hover:border-yellow-500/30 transition-colors"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                      >
                        <div className="flex justify-between items-center">
                          <span className="text-gray-100 font-medium">{skill.name}</span>
                          <span className="text-sm text-yellow-400 font-medium">{skill.level}%</span>
                        </div>
                        <div className="w-full bg-gray-700/80 rounded-full h-2.5 overflow-hidden">
                          <motion.div
                            className="h-full rounded-full"
                            style={{ background: skill.color }}
                            initial={{ width: 0 }}
                            whileInView={{ width: `${skill.level}%` }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, delay: index * 0.1, type: 'spring', stiffness: 100, damping: 10 }}
                          ></motion.div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;