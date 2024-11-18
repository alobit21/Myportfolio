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
      <ul>
        <li>
          Front-End:{" "}
          <span className="text-green-500">
            HTML,CSS,JavaScript,Tailwind,React and Nextjs.
          </span>
        </li>
        <li>
          Back-End:{" "}
          <span className="text-green-500">
            Django,Express,Springboot,Node.js and Nest.
          </span>
        </li>

        <li>
          Databases:{" "}
          <span className="text-green-500">
            MYSQL,PostgreSQL,MongoDB.
          </span>
        </li>
      </ul>
    ),
  },
  {
    title: "Education",
    id: "education",
    content: (
      <ul>
        <li>
          Primary School:{" "}
          <span className="text-green-500">
            Ikwega Primary School 2007-2015
          </span>
        </li>
        <li>
          Secondary Level:{" "}
          <span className="text-green-500">
            Mkalala Secondary School 2016-2019
          </span>
        </li>
        <li>
          Advanced level:{" "}
          <span className="text-green-500">
            Njombe Secondary School 2020-2022
          </span>
        </li>
        <li>
          Universty Level:{" "}
          <span className="text-green-500">University of Dodoma 2022-2026</span>
        </li>
      </ul>
    ),
  },
  {
    title: "certification",
    id: "certification",
    content: (
      <ul>
        <li>FreeCodeCamp certification</li>
        <li>Udemy academy certification</li>
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
      <div className="md:grid md:grid-cols-2 gap-8 items-center py-8 px-4 xl:gap-16 sm:py-16">
        <Image src="/images/about-image.png" width={500} height={500} />
        <div>
          <h2 className="text-4xl font-bold text-white mb-4">About Me</h2>
          <p className="text-base md:text-lg">
            I am a full stack web developer with a passion for creating
            interactive and responsive web applications. I have experence
            working with JavaScript, React, Node.js Express, PostgressSQL,
            Sequelize, HTML, CSS, and Git. I am a quick learner and I am always
            looking to expand my knowledge and skill set. I am a team player and
            I am xcited to work with others to create amazing applications.
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
