import React from 'react'
import HeroSection from '../components/HeroSection';
import AboutSection from '../components/AboutSection';
import ProjectSection from '../components/ProjectsSection';
import EmailSection from "../components/EmailSection";
export default function Home(){
  return(
    <main className="flex min-h-screen flex-col bg-[#121212]   ">
    
<div className="container mx-auto px-12 py-4 ">
    <HeroSection/>
    <hr/>
    <AboutSection/>
    <hr/>
    <ProjectSection/>
    <hr/>
    <EmailSection/>

</div>
    </main>
  );
}