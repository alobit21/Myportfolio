// components/ContactSection.js
import "daisyui/dist/full.css";
import { FaLinkedin, FaGithub } from "react-icons/fa";
import dynamic from "next/dynamic";
import ContactForm from "@/components/ContactForm";

// Fix: Move dynamic imports outside the component
const FaTwitter = dynamic(
  () => import("react-icons/fa").then((mod) => mod.FaTwitter),
  { ssr: false }
);
const FaFacebook = dynamic(
  () => import("react-icons/fa").then((mod) => mod.FaFacebook),
  { ssr: false }
);

const handleSubmit = async (event) => {
  event.preventDefault();
  const formData = new FormData(event.target);
  
  const response = await fetch("/api/contact", {
    method: "POST",
    body: JSON.stringify(Object.fromEntries(formData)),
    headers: { "Content-Type": "application/json" },
  });

  if (response.ok) alert("Email Sent Successfully!");
  else alert("Error sending email.");
};

const ContactSection = () => {
  return (
    <section id="contact" className="relative py-12 pt-16 text-white" 
             style={{
               backgroundImage: 'url(/images/footer/footer.jpeg)',
               backgroundSize: 'cover',
               backgroundPosition: 'center',
               backgroundRepeat: 'no-repeat',
               backgroundAttachment: 'fixed',
               width: '100vw',
               marginLeft: 'calc(-50vw + 50%)',
               marginRight: 'calc(-50vw + 50%)'
             }}>
      <div className="absolute inset-0 bg-black/80"></div>
      <div className="relative z-10 container mx-auto px-4 flex flex-col md:flex-row">
        {/* Social Media Links */}
        <div className="md:w-1/3 mb-8 md:mb-0">
          <h2 className="text-3xl font-bold text-white mb-4">Connect with me</h2>
          <ul className="space-y-4">
            <li>
              <a
                href="https://twitter.com/yourprofile"
                className="text-gray-400 hover:text-white flex items-center"
              >
                <FaTwitter className="mr-2" /> Twitter
              </a>
            </li>
            
            <li>
              <a
                href="https://facebook.com/yourprofile"
                className="text-gray-400 hover:text-white flex items-center"
              >
                <FaFacebook className="mr-2" /> Facebook
              </a>
            </li>
          </ul>
        </div>

        {/* Contact Form */}
        <div className="md:w-2/3 flex items-center justify-center">
          <ContactForm />
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
