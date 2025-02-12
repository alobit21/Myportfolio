"use client";
import { useTransition, useState } from "react";
import React from "react";
import TabButton from "../components/TabButton";
import Image from "next/image";

const TAB_DATA = [
  {
    title: "Skills",
    id: "skills",
    content: (
      <ul className="space-y-2">
        <li>
          Front-End:{" "}
          <span className="bg-gradient-to-r from-blue-500 to-green-500 text-transparent bg-clip-text font-bold">
            HTML, CSS, JavaScript, Tailwind, React, Next.js.
          </span>
        </li>
        <li>
          Back-End:{" "}
          <span className="bg-gradient-to-r from-purple-500 to-pink-500 text-transparent bg-clip-text font-bold">
            Django, Express, Spring Boot, Node.js, Nest.
          </span>
        </li>
        <li>
          Databases:{" "}
          <span className="bg-gradient-to-r from-yellow-500 to-red-500 text-transparent bg-clip-text font-bold">
            MySQL, PostgreSQL, MongoDB.
          </span>
        </li>
      </ul>
    ),
  },
  {
    title: "Education",
    id: "education",
    content: (
      <ul className="space-y-2">
        <li>
          Primary School:{" "}
          <span className="bg-gradient-to-r from-teal-500 to-blue-500 text-transparent bg-clip-text font-bold">
            Ikwega Primary School (2007-2015)
          </span>
        </li>
        <li>
          Secondary Level:{" "}
          <span className="bg-gradient-to-r from-indigo-500 to-purple-500 text-transparent bg-clip-text font-bold">
            Mkalala Secondary School (2016-2019)
          </span>
        </li>
        <li>
          Advanced Level:{" "}
          <span className="bg-gradient-to-r from-pink-500 to-red-500 text-transparent bg-clip-text font-bold">
            Njombe Secondary School (2020-2022)
          </span>
        </li>
        <li>
          University Level:{" "}
          <span className="bg-gradient-to-r from-orange-500 to-yellow-500 text-transparent bg-clip-text font-bold">
            University of Dodoma (2022-2026)
          </span>
        </li>
      </ul>
    ),
  },
  {
    title: "Certifications",
    id: "certification",
    content: (
      <ul className="space-y-2">
        <li>
          <span className="bg-gradient-to-r from-green-500 to-blue-500 text-transparent bg-clip-text font-bold">
            FreeCodeCamp Certification
          </span>
        </li>
        <li>
          <span className="bg-gradient-to-r from-purple-500 to-pink-500 text-transparent bg-clip-text font-bold">
            Udemy Academy Certification
          </span>
        </li>
      </ul>
    ),
  },
];

const AboutSection = () => {
  const [tab, setTab] = useState("skills");
  const [isPending, startTransition] = useTransition();

  const handleTabChange = (id) => {
    startTransition(() => {
      setTab(id);
    });
  };
  return (
    <section id="about" className="text-white">
      <div className="md:grid md:grid-cols-2 gap-8 items-center py-8 md:px-4 px-1  xl:gap-16 sm:py-16">
        <Image src="/images/imgpro.png" width={500} height={500} />
        <div>
          <h2 className="text-4xl font-bold text-white mb-4">About Me</h2>
              <p className="text-base md:text-lg text-justify">
      I am a <span className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-transparent bg-clip-text font-bold">full stack</span> web developer with a passion for creating
      interactive and responsive web applications. I have experience
      working with <span className="bg-gradient-to-r from-green-500 to-yellow-500 text-transparent bg-clip-text font-bold">JavaScript, React, Node.js</span>,
      <span className="bg-gradient-to-r from-red-500 to-orange-500 text-transparent bg-clip-text font-bold"> Express, PostgreSQL, Sequelize</span>,
      <span className="bg-gradient-to-r from-indigo-500 to-teal-500 text-transparent bg-clip-text font-bold"> HTML, CSS, and Git</span>. I am a quick learner and always
      looking to expand my knowledge and skill set. I am a 
      <span className="bg-gradient-to-r from-pink-500 to-red-500 text-transparent bg-clip-text font-bold">team player</span> and
      I am <span className="bg-gradient-to-r from-yellow-500 to-green-500 text-transparent bg-clip-text font-bold">excited</span> to work with others to create amazing applications.
    </p>

          <div className="flex flex-row mt-8">
            <TabButton
              selectTab={() => handleTabChange("skills")}
              active={tab === "skills"}
            >
              {" "}
              Skills{" "}
            </TabButton>

            <TabButton
              selectTab={() => handleTabChange("education")}
              active={tab === "education"}
            >
              {" "}
              Education{" "}
            </TabButton>
            <TabButton
              selectTab={() => handleTabChange("certification")}
              active={tab === "certification"}
            >
              {" "}
              Certification{" "}
            </TabButton>
          </div>
          <div>
            <div className="mt-8">
              {TAB_DATA.find((t) => t.id === tab).content}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
