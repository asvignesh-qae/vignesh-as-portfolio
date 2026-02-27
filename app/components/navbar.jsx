'use client';
import Link from "next/link";
import { useState } from "react";

const navLinks = [
  { href: "/#about", label: "ABOUT" },
  { href: "/#experience", label: "EXPERIENCE" },
  { href: "/#skills", label: "SKILLS" },
  { href: "/#education", label: "EDUCATION" },
  { href: "/#certifications", label: "CERTIFICATIONS" },
  { href: "/#blogs", label: "BLOGS" },
  { href: "/#projects", label: "PROJECTS" },
  { href: "/#contact", label: "CONTACT" },
];

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav
      className="sticky top-0 z-50 w-full backdrop-blur-md bg-[#0d1224]/90 border-b border-[#1b2c68]/40"
      aria-label="Main navigation"
    >
      <div className="mx-auto flex items-center justify-between px-6 py-4 sm:px-12 lg:max-w-[70rem] xl:max-w-[76rem] 2xl:max-w-[92rem]">
        <Link
          href="/"
          className="text-[#16f2b3] text-lg sm:text-2xl font-bold rounded focus:outline focus:outline-2 focus:outline-offset-2 focus:outline-[#16f2b3]"
          aria-label="Vignesh Ambalam Suresh - Home"
        >
          VIGNESH AMBALAM SURESH
        </Link>

        {/* Desktop nav */}
        <ul className="hidden md:flex md:items-center md:space-x-1" role="list">
          {navLinks.map(({ href, label }) => (
            <li key={href}>
              <Link
                href={href}
                className="block px-3 py-2 text-sm text-white transition-colors duration-300 hover:text-pink-500 focus:outline focus:outline-2 focus:outline-offset-2 focus:outline-[#16f2b3] rounded"
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Hamburger button */}
        <button
          className="md:hidden text-white p-2 rounded focus:outline focus:outline-2 focus:outline-offset-2 focus:outline-[#16f2b3]"
          onClick={() => setMenuOpen((open) => !open)}
          aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            {menuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <ul
          id="mobile-menu"
          className="md:hidden border-t border-[#1b2c68]/40 px-6 py-2 space-y-1"
          role="list"
        >
          {navLinks.map(({ href, label }) => (
            <li key={href}>
              <Link
                href={href}
                onClick={() => setMenuOpen(false)}
                className="block px-4 py-2 text-sm text-white transition-colors duration-300 hover:text-pink-500 focus:outline focus:outline-2 focus:outline-offset-2 focus:outline-[#16f2b3] rounded"
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </nav>
  );
}

export default Navbar;
