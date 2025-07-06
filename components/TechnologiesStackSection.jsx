'use client';
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import {
  FaReact, FaNodeJs, FaPython, FaGitAlt, FaDocker, FaAws
} from 'react-icons/fa';
import {
  SiNextdotjs, SiTailwindcss, SiTypescript, SiMongodb,
  SiPostgresql, SiExpress, SiDjango, SiFirebase, SiGraphql
} from 'react-icons/si';

const technologies = [
  { name: 'React', icon: <FaReact className="text-4xl" />, proficiency: 90, color: '#61DAFB' },
  { name: 'Next.js', icon: <SiNextdotjs className="text-4xl" />, proficiency: 85, color: '#ffffff' },
  { name: 'TypeScript', icon: <SiTypescript className="text-4xl" />, proficiency: 80, color: '#3178C6' },
  { name: 'Tailwind CSS', icon: <SiTailwindcss className="text-4xl" />, proficiency: 95, color: '#38BDF8' },
  { name: 'Node.js', icon: <FaNodeJs className="text-4xl" />, proficiency: 85, color: '#339933' },
  { name: 'Express', icon: <SiExpress className="text-4xl" />, proficiency: 80, color: '#cccccc' },
  { name: 'Python', icon: <FaPython className="text-4xl" />, proficiency: 75, color: '#3776AB' },
  { name: 'Django', icon: <SiDjango className="text-4xl" />, proficiency: 70, color: '#092E20' },
  { name: 'MongoDB', icon: <SiMongodb className="text-4xl" />, proficiency: 80, color: '#47A248' },
  { name: 'PostgreSQL', icon: <SiPostgresql className="text-4xl" />, proficiency: 75, color: '#336791' },
  { name: 'GraphQL', icon: <SiGraphql className="text-4xl" />, proficiency: 70, color: '#E10098' },
  { name: 'AWS', icon: <FaAws className="text-4xl" />, proficiency: 65, color: '#FF9900' },
  { name: 'Firebase', icon: <SiFirebase className="text-4xl" />, proficiency: 75, color: '#FFCA28' },
  { name: 'Docker', icon: <FaDocker className="text-4xl" />, proficiency: 70, color: '#2496ED' },
  { name: 'Git', icon: <FaGitAlt className="text-4xl" />, proficiency: 90, color: '#F05032' },
];

const shapes = [
  'polygon(50% 0%, 95% 25%, 95% 75%, 50% 100%, 5% 75%, 5% 25%)', // Hexagon
  'circle(50% at 50% 50%)', // Circle
  'polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)', // Octagon
];

const TechnologiesStackSection = () => {
  const cardRefs = useRef([]);
  const sectionRef = useRef(null);
  const percentRefs = useRef([]);

  useEffect(() => {
    // Intersection Observer for entrance animation
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          // Card entrance animation
          gsap.fromTo(
            cardRefs.current,
            { opacity: 0, y: 50 },
            {
              opacity: 1,
              y: 0,
              stagger: 0.15,
              duration: 0.8,
              ease: 'power3.out',
            }
          );

          // Battery bar animation
          cardRefs.current.forEach((card, index) => {
            const bars = card.querySelectorAll('.battery-bar');
            const numBarsToFill = Math.ceil((technologies[index].proficiency / 100) * 5); // 5 bars, each ~20%
            bars.forEach((bar, barIndex) => {
              if (barIndex < numBarsToFill) {
                gsap.fromTo(
                  bar,
                  { scaleX: 0, opacity: 0 },
                  {
                    scaleX: 1,
                    opacity: 1,
                    duration: 0.5,
                    ease: 'power2.out',
                    delay: index * 0.15 + barIndex * 0.1,
                  }
                );
              }
            });
          });

          // Percentage counter animation
          percentRefs.current.forEach((percent, index) => {
            gsap.fromTo(
              percent,
              { innerHTML: 0 },
              {
                innerHTML: technologies[index].proficiency,
                duration: 1.5,
                ease: 'power2.out',
                snap: { innerHTML: 1 },
                delay: index * 0.15,
                onUpdate: function () {
                  percent.innerHTML = Math.round(this.targets()[0].innerHTML) + '%';
                },
              }
            );
          });

          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    // Shape-changing, border, and tilt animations
    cardRefs.current.forEach((card, index) => {
      if (!card) return;

      // Shape-changing and border animation
      let shapeIndex = 0;
      const animateShape = () => {
        gsap.to(card, {
          '--card-shape': shapes[shapeIndex],
          '--card-border-radius': '12px',
          boxShadow: '0 0 20px rgba(255, 227, 26, 0.5)',
          duration: 0.5,
          ease: 'power2.inOut',
          onComplete: () => {
            gsap.to(card, {
              '--card-border-radius': '0px',
              boxShadow: '0 4px 16px rgba(255, 227, 26, 0.1)',
              duration: 0.5,
              ease: 'power2.out',
            });
            shapeIndex = (shapeIndex + 1) % shapes.length;
            setTimeout(animateShape, 5000);
          },
        });
      };
      setTimeout(animateShape, index * 200);

      // Tilt effect
      const handleMouseMove = (e) => {
        const bounds = card.getBoundingClientRect();
        const x = e.clientX - bounds.left;
        const y = e.clientY - bounds.top;
        const rotateY = ((x / bounds.width) - 0.5) * 10;
        const rotateX = ((y / bounds.height) - 0.5) * -10;

        gsap.to(card, {
          rotationY: rotateY,
          rotationX: rotateX,
          duration: 0.3,
          ease: 'power2.out',
          transformPerspective: 1200,
          transformOrigin: 'center',
        });
      };

      const handleMouseLeave = () => {
        gsap.to(card, {
          rotationY: 0,
          rotationX: 0,
          duration: 0.4,
          ease: 'power2.out',
        });
      };

      card.addEventListener('mousemove', handleMouseMove);
      card.addEventListener('mouseleave', handleMouseLeave);

      return () => {
        card.removeEventListener('mousemove', handleMouseMove);
        card.removeEventListener('mouseleave', handleMouseLeave);
      };
    });

    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current);
    };
  }, []);

  return (
    <section
      id="tech-stack"
      ref={sectionRef}
      className="relative py-24 bg-gradient-to-b from-gray-900 to-gray-800 text-white"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-yellow-600">
            Technology Stack
          </h2>
          <p className="mt-4 text-lg text-gray-300 max-w-3xl mx-auto">
            A curated collection of tools and technologies I leverage to build robust, scalable applications.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {technologies.map((tech, index) => (
            <div
              key={tech.name}
              ref={(el) => (cardRefs.current[index] = el)}
              className="hex-card group relative bg-gray-800/80 p-6 rounded-lg flex flex-col items-center text-center shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-700/50 backdrop-blur-sm"
              role="listitem"
              aria-label={`Technology: ${tech.name}, Proficiency: ${tech.proficiency}%`}
              style={{ '--card-shape': shapes[0], '--card-border-radius': '0px' }}
            >
              <div className="mb-4 text-5xl" style={{ color: tech.color }}>
                {tech.icon}
              </div>
              <h3 className="text-lg font-semibold text-white">{tech.name}</h3>
              <div className="w-20 h-8 mt-3 mb-2 relative bg-gray-700 rounded border-2 border-gray-500 flex items-center">
                <div className="flex flex-1 h-5 mx-1 gap-1">
                  {Array.from({ length: 5 }).map((_, barIndex) => (
                    <div
                      key={barIndex}
                      className="battery-bar flex-1 h-full rounded-sm opacity-0"
                      style={{ backgroundColor: tech.color }}
                    />
                  ))}
                </div>
                <div className="absolute -right-1 top-1/2 -translate-y-1/2 w-1 h-3 bg-gray-500" />
              </div>
              <span
                ref={(el) => (percentRefs.current[index] = el)}
                className="text-lg font-mono font-bold text-yellow-400"
              >
                {tech.proficiency}%
              </span>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .hex-card {
          clip-path: var(--card-shape);
          border-radius: var(--card-border-radius);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          will-change: transform, box-shadow, clip-path, border-radius;
        }

        .hex-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 8px 32px rgba(255, 227, 26, 0.2);
        }

        .hex-card:focus-within {
          outline: 2px solid rgba(255, 227, 26, 0.5);
          outline-offset: 2px;
        }

        .battery-bar {
          transform: scaleX(0);
          transform-origin: left;
        }
      `}</style>
    </section>
  );
};

export default TechnologiesStackSection;