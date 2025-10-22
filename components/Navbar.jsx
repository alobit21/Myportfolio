"use client";
import Link from "next/link";
import React, { useState } from "react";
import NavLink from "./NavLink";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/solid";
import MenuOverlay from "./MenuOverlay";
import Image from "next/image";

const navLinks = [
  {
    title: "About",
    path: "#about",
  },
  {
    title: "Projects",
    path: "#projects",
  },
  {
    title: "Contact",
    path: "#contact",
  },
];

const Navbar = () => {
  const [navbarOpen, setNavbarOpen] = useState(false);

  const handleLinkClick = () => {
    setNavbarOpen(false); // Close menu when link is clicked in mobile
  };

  return (
    <nav className="fixed w-full border border-gray-700 top-0 left-0 right-0 z-10 bg-gray-900 bg-opacity-100">
      <div className="container mx-auto flex items-center justify-between px-4 py-2 lg:py-4">
        <Link href="/">
        
          <span className="text-yellow-400 font-bold">CODEWITHMAC</span>
        </Link>
        <div className="mobile-menu md:hidden">
          {!navbarOpen ? (
            <button
              onClick={() => setNavbarOpen(true)}
              className="flex items-center px-3 py-2 border rounded border-gray-400 text-gray-400 hover:text-white hover:border-white"
              aria-label="Open menu"
            >
              <Bars3Icon className="h-5 w-5" />
            </button>
          ) : (
            <button
              onClick={() => setNavbarOpen(false)}
              className="flex items-center px-3 py-2 border rounded border-gray-400 text-gray-400 hover:text-white hover:border-white"
              aria-label="Close menu"
            >
              <XMarkIcon className="h-5 w-5" />
            </button>
          )}
        </div>
        <div className="hidden md:flex md:items-center md:w-auto w-full" id="navbar">
          <ul className="flex md:flex-row md:space-x-8 p-4 md:p-0 mt-4 md:mt-0">
            {navLinks.map((link) => (
              <li key={link.path} className="md:my-0 my-2">
                <NavLink href={link.path} title={link.title} onClick={handleLinkClick} />
              </li>
            ))}
          </ul>
        </div>
      </div>
      {navbarOpen && (
        <div className="absolute top-16 left-0 w-full bg-gray-900 border-t border-gray-700 md:hidden">
          <ul className="flex flex-col p-4">
            {navLinks.map((link) => (
              <li key={link.path} className="py-2 border-b border-gray-700">
                <NavLink href={link.path} title={link.title} onClick={handleLinkClick} />
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
