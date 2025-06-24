'use client'
 import { FaReact, FaNodeJs, FaPython, FaGitAlt, FaDocker, FaAws } from 'react-icons/fa';
import { 
  SiNextdotjs, 
  SiTailwindcss, 
  SiTypescript, 
  SiMongodb, 
  SiPostgresql, 
  SiExpress, 
  SiDjango, 
 
  SiFirebase, 
  SiGraphql, 
  
} from 'react-icons/si';

const TechnologiesStackSection = () => {
 const technologies = [
  { name: 'React', icon: <FaReact className="text-4xl text-[#61DAFB]" />, percent: 90, color: '#61DAFB' },
  { name: 'Next.js', icon: <SiNextdotjs className="text-4xl text-white" />, percent: 85, color: '#ffffff' },
  { name: 'TypeScript', icon: <SiTypescript className="text-4xl text-[#3178C6]" />, percent: 80, color: '#3178C6' },
  { name: 'Tailwind CSS', icon: <SiTailwindcss className="text-4xl text-[#38BDF8]" />, percent: 95, color: '#38BDF8' },
  { name: 'Node.js', icon: <FaNodeJs className="text-4xl text-[#339933]" />, percent: 85, color: '#339933' },
  { name: 'Express', icon: <SiExpress className="text-4xl text-gray-300" />, percent: 80, color: '#cccccc' },
  { name: 'Python', icon: <FaPython className="text-4xl text-[#3776AB]" />, percent: 75, color: '#3776AB' },
  { name: 'Django', icon: <SiDjango className="text-4xl text-[#092E20]" />, percent: 70, color: '#092E20' },
//   { name: 'Flask', icon: <SiFlask className="text-4xl text-gray-400" />, percent: 65, color: '#bbbbbb' },
  { name: 'MongoDB', icon: <SiMongodb className="text-4xl text-[#47A248]" />, percent: 80, color: '#47A248' },
  { name: 'PostgreSQL', icon: <SiPostgresql className="text-4xl text-[#336791]" />, percent: 75, color: '#336791' },
  { name: 'GraphQL', icon: <SiGraphql className="text-4xl text-[#E10098]" />, percent: 70, color: '#E10098' },
  { name: 'AWS', icon: <FaAws className="text-4xl text-[#FF9900]" />, percent: 65, color: '#FF9900' },
  { name: 'Firebase', icon: <SiFirebase className="text-4xl text-[#FFCA28]" />, percent: 75, color: '#FFCA28' },
  { name: 'Docker', icon: <FaDocker className="text-4xl text-[#2496ED]" />, percent: 70, color: '#2496ED' },
//   { name: 'Redis', icon: <SiRedis className="text-4xl text-[#DC382D]" />, percent: 60, color: '#DC382D' },
  { name: 'Git', icon: <FaGitAlt className="text-4xl text-[#F05032]" />, percent: 90, color: '#F05032' },
];



  return (
    <section id="tech-stack" className="py-16 bg-gray-900">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-4 text-[#ffe31a]">Technologies Stack</h2>
        <p className="text-center text-white mb-12 max-w-2xl mx-auto">
          Here are the technologies I work with and my proficiency level in each.
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {technologies.map((tech, index) => (
            <div 
              key={index}
              className="bg-gray-800 rounded-xl p-6 flex flex-col items-center hover:scale-105 transition-transform duration-300 shadow-lg hover:shadow-xl border border-gray-700"
            >
              <div className="mb-4">
                {tech.icon}
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">{tech.name}</h3>
              
              {/* Progress Bar */}
            <div className="w-full bg-gray-700 rounded-full h-2.5 mb-2">
  <div 
    className="h-2.5 rounded-full"
    style={{ width: `${tech.percent}%`, backgroundColor: tech.color }}
  ></div>
</div>

              
              <span className="text-white font-bold">{tech.percent}%</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TechnologiesStackSection;