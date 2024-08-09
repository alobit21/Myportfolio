"use client";
import React from "react";
import { motion } from "framer-motion";

const cardVariants = {
  initial: { opacity: 0, scale: 0.95 },
  animate: { opacity: 1, scale: 1 },
  hover: { scale: 1.05, boxShadow: "0px 20px 30px rgba(0,0,0,0.2)" },
};

const AboutSection = () => {
  return (
    <section id="about" className="mt-24 py-16 bg-black pt-18">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-extrabold mb-4 text-primary">About Me</h2>
          <p className="text-lg text-white text">
            I&apos;m a passionate software developer with a love for creating intuitive and efficient solutions. With expertise in web and mobile development, I strive to build applications that not only meet but exceed user expectations.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <motion.div
            variants={cardVariants}
            initial="initial"
            animate="animate"
            whileHover="hover"
            className="card bg-base-100 shadow-lg transform transition-transform duration-300"
          >
            <figure className="p-4">
            </figure>
            <div className="card-body p-6">
              <h3 className="text-2xl font-semibold mb-4 text-primary">Who I Am</h3>
              <p className="text-base-content mb-4">
                With a background in computer science and hands-on experience in various projects, I excel in developing scalable web applications and mobile apps. My goal is to leverage my skills in coding, problem-solving, and UX/UI design to create impactful digital experiences.
              </p>
              <p className="text-base-content">
                Whether working on a team or independently, I am committed to delivering high-quality work and continuously learning new technologies to stay ahead in the ever-evolving tech landscape.
              </p>
            </div>
          </motion.div>

          <motion.div
            variants={cardVariants}
            initial="initial"
            animate="animate"
            whileHover="hover"
            className="card bg-base-100 shadow-lg transform transition-transform duration-300"
          >
            <figure className="p-4">
            </figure>
            <div className="card-body p-6">
              <h3 className="text-2xl font-semibold mb-4 text-primary">Skills & Expertise</h3>
              <ul className="list-disc list-inside text-base-content space-y-2">
                <li><strong>Languages:</strong> JavaScript, TypeScript, Python, Java</li>
                <li><strong>Frameworks:</strong> React, Next.js, Tailwind CSS, Node.js</li>
                <li><strong>Tools:</strong> Git, Docker, Firebase, REST APIs</li>
                <li><strong>Design:</strong> UI/UX Design, Figma, Adobe XD</li>
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
