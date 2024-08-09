'use client'
// components/ProjectsSection.js
import { useState } from 'react';
import 'daisyui/dist/full.css';

const ProjectList = ({ projects }) => (
  <ul className="space-y-4">
    {projects.map((project, index) => (
      <li key={index} className="bg-gray-800 p-4 shadow-lg rounded">
        <h3 className="text-xl font-semibold text-white">{project.title}</h3>
        <p className="text-gray-400">{project.description}</p>
        {project.url && (
          <a href={project.url} className="text-blue-400 hover:text-blue-300" target="_blank" rel="noopener noreferrer">
            View Project
          </a>
        )}
      </li>
    ))}
  </ul>
);

const ProjectsSection = () => {
  const [open, setOpen] = useState(null);

  const toggleAccordion = (index) => {
    setOpen(open === index ? null : index);
  };

  const javascriptProjects = [
    { title: 'JavaScript Project 1', description: 'Description of the JavaScript project.', url: 'https://example.com/js1' },
    { title: 'JavaScript Project 2', description: 'Description of another JavaScript project.', url: 'https://example.com/js2' },
  ];

  const phpProjects = [
    { title: 'PHP Project 1', description: 'Description of the PHP project.', url: 'https://example.com/php1' },
    { title: 'PHP Project 2', description: 'Description of another PHP project.', url: 'https://example.com/php2' },
  ];

  const pythonProjects = [
    { title: 'Python Project 1', description: 'Description of the Python project.', url: 'https://example.com/python1' },
    { title: 'Python Project 2', description: 'Description of another Python project.', url: 'https://example.com/python2' },
  ];

  const reactProjects = [
    { title: 'Recipe App', description: 'Use can Learn how to cook various Food stuffs by just typing a food name on the search bar.', url: 'https://macmtavangu-recipes.netlify.app/' },
    { title: 'Joke Generator App', description: 'This app generates random jokes ', url: 'https://aloyce-reactjs-project.netlify.app/' },
    { title: 'Weather App', description: 'This app user ia able to know the current weather information of a certain place by typing a recognizable place name', url: 'https://macmtavangu-weatherapp-reactjs.netlify.app/' },

  ];

  const angularProjects = [
    { title: 'Angular Project 1', description: 'Description of the Angular project.', url: 'https://example.com/angular1' },
    { title: 'Angular Project 2', description: 'Description of another Angular project.', url: 'https://example.com/angular2' },
  ];

  return (
    <section id="projects" className="lg:py-12 bg-black pt-16 ">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-white mb-8">My Projects</h2>

        <div className="accordion">
          <div className="accordion-item">
            <h2 className="accordion-header">
              <button
                className={`accordion-button ${open === 0 ? 'bg-gray-700 text-white' : 'bg-gray-900 text-gray-400'} w-full text-left py-2 px-4 rounded-t-lg`}
                onClick={() => toggleAccordion(0)}
              >
                JavaScript Projects
              </button>
            </h2>
            {open === 0 && (
              <div className="accordion-body bg-gray-900 rounded-b-lg p-4">
                <ProjectList projects={javascriptProjects} />
              </div>
            )}
          </div>

          <div className="accordion-item mt-4">
            <h2 className="accordion-header">
              <button
                className={`accordion-button ${open === 1 ? 'bg-gray-700 text-white' : 'bg-gray-900 text-gray-400'} w-full text-left py-2 px-4 rounded-t-lg`}
                onClick={() => toggleAccordion(1)}
              >
                PHP Projects
              </button>
            </h2>
            {open === 1 && (
              <div className="accordion-body bg-gray-900 rounded-b-lg p-4">
                <ProjectList projects={phpProjects} />
              </div>
            )}
          </div>

          <div className="accordion-item mt-4">
            <h2 className="accordion-header">
              <button
                className={`accordion-button ${open === 2 ? 'bg-gray-700 text-white' : 'bg-gray-900 text-gray-400'} w-full text-left py-2 px-4 rounded-t-lg`}
                onClick={() => toggleAccordion(2)}
              >
                Python Projects
              </button>
            </h2>
            {open === 2 && (
              <div className="accordion-body bg-gray-900 rounded-b-lg p-4">
                <ProjectList projects={pythonProjects} />
              </div>
            )}
          </div>

          <div className="accordion-item mt-4">
            <h2 className="accordion-header">
              <button
                className={`accordion-button ${open === 3 ? 'bg-gray-700 text-white' : 'bg-gray-900 text-gray-400'} w-full text-left py-2 px-4 rounded-t-lg`}
                onClick={() => toggleAccordion(3)}
              >
                React Projects
              </button>
            </h2>
            {open === 3 && (
              <div className="accordion-body bg-gray-900 rounded-b-lg p-4">
                <ProjectList projects={reactProjects} />
              </div>
            )}
          </div>

          <div className="accordion-item mt-4">
            <h2 className="accordion-header">
              <button
                className={`accordion-button ${open === 4 ? 'bg-gray-700 text-white' : 'bg-gray-900 text-gray-400'} w-full text-left py-2 px-4 rounded-t-lg`}
                onClick={() => toggleAccordion(4)}
              >
                Angular Projects
              </button>
            </h2>
            {open === 4 && (
              <div className="accordion-body bg-gray-900 rounded-b-lg p-4">
                <ProjectList projects={angularProjects} />
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
