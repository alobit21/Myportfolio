import React from "react";
import Link from "next/link";

const NavLink = ({ href, title, onClick }) => (
  <Link href={href} onClick={onClick} className="text-white hover:text-gray-300 px-4">
    {title}
  </Link>
);

export default NavLink;
