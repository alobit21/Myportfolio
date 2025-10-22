'use client'
import "daisyui/dist/full.css";
import { FaLinkedin, FaGithub, FaWhatsapp } from "react-icons/fa";
import dynamic from "next/dynamic";
import ContactForm from "@/components/ContactForm";
const FaTwitter = dynamic(() => import("react-icons/fa").then((mod) => mod.FaTwitter), { ssr: false });
const FaFacebook = dynamic(() => import("react-icons/fa").then((mod) => mod.FaFacebook), { ssr: false });

const ContactSection = () => {
  return (
    <section id="contact" className="py-12 bg-gray-900 pt-16 mt-6">
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-stretch">
        {/* Left Section - Social Media */}
        <div className="md:w-1/3 flex flex-col justify-between bg-gray-900 p-8 rounded shadow-lg">
          <div>
            <h2 className="text-3xl font-bold text-[#ffe31a] mb-4">Connect with Me</h2>
            <p className="text-white mb-6">
              Let's connect on social media. Feel free to reach out for collaborations, job opportunities, or just a chat!
            </p>
          </div>
          <div className="flex space-x-4">
            <a href="/www.linkedin.com/in/aloyce-mtavangu-5932652a0/" className="text-white hover:text-[#ffe31a]">
              <FaLinkedin className="text-2xl" />
            </a>
            <a href="/https://github.com/alobit21" className="text-white hover:text-[#ffe31a]">
              <FaGithub className="text-2xl" />
            </a>
            <a href="https://www.facebook.com/profile.php?id=100089129044121" className="text-white hover:text-[#ffe31a]">
              <FaFacebook className="text-2xl" />
            </a>
            <a href="https://wa.me/+255749380797" className="text-white hover:text-[#ffe31a]">
              <FaWhatsapp className="text-2xl" />
            </a>
          </div>
        </div>

        {/* Right Section - Contact Form */}
        <div className="md:w-2/3 bg-gray-900 p-2 md:p-8 rounded shadow-lg flex flex-col justify-center">
          <h2 className="text-3xl font-bold text-[#ffe31a] mb-4 justify-center text-center">Contact Me</h2>
          <ContactForm />
        </div>
      </div>
    </section>
  );
};

export default ContactSection;