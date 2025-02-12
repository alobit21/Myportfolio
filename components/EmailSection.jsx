'use client'
import "daisyui/dist/full.css";
import { FaLinkedin, FaGithub, FaWhatsapp } from "react-icons/fa";
import dynamic from "next/dynamic";
import ContactForm from "@/components/ContactForm";
const FaTwitter = dynamic(() => import("react-icons/fa").then((mod) => mod.FaTwitter), { ssr: false });
const FaFacebook = dynamic(() => import("react-icons/fa").then((mod) => mod.FaFacebook), { ssr: false });

const ContactSection = () => {
  return (
    <section id="contact" className="py-12 bg-black pt-16 mt-6">
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-stretch">
        {/* Left Section - Social Media */}
        <div className="md:w-1/3 flex flex-col justify-between bg-gray-900 p-8 rounded shadow-lg">
          <div>
            <h2 className="text-3xl font-bold text-white mb-4">Connect with Me</h2>
            <p className="text-gray-400 mb-6">
              Let's connect on social media. Feel free to reach out for collaborations, job opportunities, or just a chat!
            </p>
          </div>
          <div className="flex space-x-4">
            <a href="https://linkedin.com/in/yourprofile" className="text-gray-400 hover:text-white">
              <FaLinkedin className="text-blue-400 text-2xl" />
            </a>
            <a href="https://github.com/yourprofile" className="text-gray-400 hover:text-white">
              <FaGithub className="text-gray-400 text-2xl" />
            </a>
            <a href="https://www.facebook.com/profile.php?id=100089129044121" className="text-gray-400 hover:text-white">
              <FaFacebook className="text-blue-600 text-2xl" />
            </a>
            <a href="https://wa.me/+255688051469" className="text-gray-400 hover:text-white">
              <FaWhatsapp className="text-[#0d7c66] text-2xl" />
            </a>
          </div>
        </div>

        {/* Right Section - Contact Form */}
        <div className="md:w-2/3 bg-gray-900 p-2 md:p-8 rounded shadow-lg flex flex-col justify-center">
          <h2 className="text-3xl font-bold text-white mb-4 justify-center text-center">Contact Me</h2>
          {/* <form className="h-full flex flex-col justify-center">
            <div className="mb-4">
              <label className="block text-gray-400 mb-2" htmlFor="name">
                Name
              </label>
              <input
                type="text"
                id="name"
                className="w-full p-2 bg-gray-900 text-white rounded border border-gray-700 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-400 mb-2" htmlFor="email">
                Email
              </label>
              <input
                type="email"
                id="email"
                className="w-full p-2 bg-gray-900 text-white rounded border border-gray-700 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-400 mb-2" htmlFor="message">
                Message
              </label>
              <textarea
                id="message"
                className="w-full p-2 bg-gray-900 text-white rounded border border-gray-700 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                rows="4"
                required
              ></textarea>
            </div>
            <button type="submit" className="w-full py-2 bg-gray-700 text-white rounded hover:bg-blue-700">
              Send Message
            </button>
          </form> */}
    <ContactForm />

        </div>
      </div>

    </section>

  );
};

export default ContactSection;
