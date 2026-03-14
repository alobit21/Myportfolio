"use client";
import React from "react";
import dynamic from "next/dynamic";
import {
  Mail,
  Phone,
  MapPin,
  Facebook,
  Instagram,
  Twitter,
  Dribbble,
  Github,
  Linkedin,
  Globe,
} from "lucide-react";

const TextHoverEffect = dynamic(() => import("@/components/ui/hover-footer").then(mod => ({ default: mod.TextHoverEffect })), {
  ssr: false,
  loading: () => <div className="h-[30rem]"></div>
});

const FooterBackgroundGradient = dynamic(() => import("@/components/ui/hover-footer").then(mod => ({ default: mod.FooterBackgroundGradient })), {
  ssr: false
});

const Footer = () => {

  // Footer link data - updated for portfolio
  const footerLinks = [
    {
      title: "Navigation",
      links: [
        { label: "Home", href: "#home" },
        { label: "About", href: "#about" },
        { label: "Projects", href: "#projects" },
        { label: "Experience", href: "#experience" },
      ],
    },
    {
      title: "Connect",
      links: [
        { label: "Contact", href: "#contact" },
        { label: "Email", href: "mailto:mac@tarxemo.com", pulse: true },
        { label: "LinkedIn", href: "#" },
        { label: "GitHub", href: "#" },
      ],
    },
  ];

  // Contact info data
  const contactInfo = [
    {
      icon: <Mail size={18} className="text-[#3ca2fa]" />,
      text: "mac@tarxemo.com",
      href: "mailto:mac@tarxemo.com",
    },
    {
      icon: <Phone size={18} className="text-[#3ca2fa]" />,
      text: "+255749380797",
      href: "tel:+255749380797",
    },
    {
      icon: <MapPin size={18} className="text-[#3ca2fa]" />,
      text: "Dodoma, Tanzania",
    },
  ];

  // Social media icons - updated for portfolio
  const socialLinks = [
    { icon: <Github size={20} />, label: "GitHub", href: "https://github.com" },
    { icon: <Linkedin size={20} />, label: "LinkedIn", href: "https://linkedin.com" },
    { icon: <Twitter size={20} />, label: "Twitter", href: "#" },
    { icon: <Instagram size={20} />, label: "Instagram", href: "#" },
    { icon: <Globe size={20} />, label: "Website", href: "#" },
  ];

  return (
    <footer className="  relative h-fit rounded-t-3xl overflow-hidden  ">
      <div className="max-w-7xl mx-auto px-4 top-4 md:px-14 z-40 relative">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 md:gap-8 lg:gap-16 pb-12">
          {/* Brand section */}
          <div className="flex flex-col space-y-4">
            <div className="flex items-center space-x-2">
              <span className="text-[#3ca2fa] text-xl md:text-2xl lg:text-3xl font-extrabold">
                &lt;/&gt;
              </span>
              <span className="text-white text-xl md:text-2xl lg:text-3xl font-bold">Codewithmac</span>
            </div>
            <p className="text-sm leading-relaxed text-gray-300">
              Full-stack developer passionate about creating amazing web experiences with modern technologies.
            </p>
          </div>

          {/* Footer link sections */}
          {footerLinks.map((section) => (
            <div key={section.title}>
              <h4 className="text-white text-lg font-semibold mb-6">
                {section.title}
              </h4>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.label} className="relative">
                    <a
                      href={link.href}
                      className="hover:text-[#3ca2fa] transition-colors text-gray-300"
                    >
                      {link.label}
                    </a>
                    {link.pulse && (
                      <span className="absolute top-0 right-[-10px] w-2 h-2 rounded-full bg-[#3ca2fa] animate-pulse"></span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Contact section */}
          <div>
            <h4 className="text-white text-lg font-semibold mb-6">
              Contact
            </h4>
            <ul className="space-y-4">
              {contactInfo.map((item, i) => (
                <li key={i} className="flex items-center space-x-3">
                  {item.icon}
                  {item.href ? (
                    <a
                      href={item.href}
                      className="hover:text-[#3ca2fa] transition-colors text-gray-300"
                    >
                      {item.text}
                    </a>
                  ) : (
                    <span className="text-gray-300 hover:text-[#3ca2fa] transition-colors">
                      {item.text}
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <hr className="border-t border-gray-900 my-8" />

        {/* Footer bottom */}
        <div className="flex flex-col md:flex-row justify-between items-center text-sm space-y-4 md:space-y-0">
          {/* Social icons */}
          <div className="flex space-x-6 text-gray-400">
            {socialLinks.map(({ icon, label, href }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                className="hover:text-[#3ca2fa] transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                {icon}
              </a>
            ))}
          </div>

          {/* Copyright */}
          <p className="text-center md:text-left text-gray-400">
            &copy; {new Date().getFullYear()} Codewithmac. All rights reserved.
          </p>
        </div>
      </div>

      {/* Text hover effect */}
      <div className="lg:flex hidden h-[30rem] -mt-52 -mb-36">
        <TextHoverEffect text="CODEWITHMAC" className="z-50" />
      </div>

      <FooterBackgroundGradient />
    </footer>
  );
};

export default Footer;