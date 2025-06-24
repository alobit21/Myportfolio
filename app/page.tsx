import React from 'react'
import HeroSection from '../components/HeroSection';
import AboutSection from '../components/AboutSection';
import ProjectSection from '../components/ProjectsSection';
import EmailSection from "../components/EmailSection";
import ContactSection from '../components/EmailSection';
import TechnologiesStackSection from '../components/TechnologiesStackSection'
export default function Home(){
  return(
    <main className="flex min-h-screen flex-col">
    
<div className="container mx-auto px-4 md:px-12 py-4 mt-6 bg-gray-900">
    <HeroSection/>
    <hr/>
    <AboutSection/>
    <hr/>
    <TechnologiesStackSection/>
    <hr/>
    <ProjectSection/>
    <hr/>
    <EmailSection/>

</div>
    </main>
  );
}