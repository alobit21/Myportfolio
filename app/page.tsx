import React from 'react'
import ProjectsSection from '@/components/ProjectsSection'
import About from '@/components/About'
import HeroSection from '@/components/HeroSection'
import Navbar from '@/components/Navbar'
import ContactSection from '@/components/ContactSection'
const page = () => {
  return (
<main className=' w-full flex min-h-screen flex-col bg-[#121212]  mx-auto px-12 py-4'>

  <div className=' w-full  lg:mt-10 sm:mt-40 mx-auto px-12 py-4'>
<HeroSection/>
<div className="border-t border-gray-300"></div>

<About/>
<div className="border-t border-gray-300"></div>

<ProjectsSection/>
<div className="border-t border-gray-300"></div>
<ContactSection/>
</div>
</main>

  )
}

export default page