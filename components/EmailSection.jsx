'use client'
import "daisyui/dist/full.css";
import { FaLinkedin, FaGithub, FaWhatsapp } from "react-icons/fa";
import dynamic from "next/dynamic";
import ContactForm from "@/components/ContactForm";
const FaTwitter = dynamic(() => import("react-icons/fa").then((mod) => mod.FaTwitter), { ssr: false });
const FaFacebook = dynamic(() => import("react-icons/fa").then((mod) => mod.FaFacebook), { ssr: false });

const ContactSection = () => {
  return (
    <section id="contact" className="py-24 bg-gray-900 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center space-y-6 mb-16">
          <div className="flex items-center justify-center gap-3">
            <div className="h-[2px] w-8 bg-[#10B981]"></div>
            <span className="text-[#10B981] text-sm font-bold tracking-[0.3em] uppercase">Get In Touch</span>
          </div>
          
          <h2 className="text-5xl lg:text-7xl font-black text-white tracking-tighter">
            CONTACT <span className="text-gray-500">ME</span>
          </h2>
          
          <p className="text-gray-400 text-sm lg:text-lg font-medium tracking-widest uppercase max-w-3xl mx-auto">
            Have a project in mind or just want to say hi? Feel free to reach out!
          </p>
        </div>

        <div className="flex flex-col md:flex-row items-stretch">
        {/* Left Section - Social Media */}
        <div className="md:w-1/3 flex flex-col justify-between bg-gray-900 p-8 rounded shadow-lg">
          <div className="space-y-4">
            <p className="text-white mb-6">
              Let's connect on social media. Feel free to reach out for collaborations, job opportunities, or just a chat!
            </p>
          </div>
          <div className="flex space-x-4">
            <a href="/www.linkedin.com/in/aloyce-mtavangu-5932652a0/" className="text-white hover:text-[#3ca2fa]">
              <FaLinkedin className="text-2xl" />
            </a>
            <a href="/https://github.com/alobit21" className="text-white hover:text-[#3ca2fa]">
              <FaGithub className="text-2xl" />
            </a>
            <a href="https://www.facebook.com/profile.php?id=100089129044121" className="text-white hover:text-[#3ca2fa]">
              <FaFacebook className="text-2xl" />
            </a>
            <a href="https://wa.me/+255749380797" className="text-white hover:text-[#3ca2fa]">
              <FaWhatsapp className="text-2xl" />
            </a>
          </div>
        </div>

        {/* Right Section - Contact Form */}
        <div className="md:w-2/3 bg-gray-800/50 p-2 md:p-8 rounded shadow-lg flex flex-col justify-center border border-gray-700/50 backdrop-blur-sm">
          <ContactForm />
        </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;