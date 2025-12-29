"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav className="nav-bar">
      <div className="nav-inner">
        <Link href="/" className="nav-brand" onClick={closeMenu}>
          <span className="nav-logo">
            <img src="	https://i.postimg.cc/QxMBprrW/logo.png" alt="SPIE" className="nav-logo-img" />
          </span>
          {/* <div className="nav-brand-text">
            <span className="nav-title">Prodyog 2026</span>
            <span className="nav-sub">Prodyog</span>
          </div> */}
        </Link>

        {/* Hamburger Menu Button */}
        <button 
          className={`hamburger ${isMenuOpen ? 'active' : ''}`}
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        {/* Navigation Links */}
        <div className={`nav-menu ${isMenuOpen ? 'active' : ''}`}>
          <div className="nav-links">
            <Link
              className={`nav-link ${pathname.startsWith("/home") || pathname === "/" ? "active" : ""}`}
              href="/"
              onClick={closeMenu}
            >
              Plan
            </Link>

            {/*  NEW PRODYOG OPTION */}
           <Link className={`nav-link ${pathname.startsWith("/prodyog") ? "active" : ""}`}
              href="/prodyog"
              onClick={closeMenu}
            >
            OP Prodyog
            </Link>
          
            <Link
              className={`nav-link ${pathname.startsWith("/events") ? "active" : ""}`}
              href="/events"
              onClick={closeMenu}
            >
              Targets
            </Link>
            <Link
              className={`nav-link ${pathname.startsWith("/team") ? "active" : ""}`}
              href="/team"
              onClick={closeMenu}
            >
             Crew
            </Link>
            <Link
              className={`nav-link ${pathname.startsWith("/gallery") ? "active" : ""}`}
              href="/gallery"
              onClick={closeMenu}
            >
              Surveillance
            </Link>  

              {/* Contact Us */}
              <Link
                className={`nav-link sparkle-hover ${pathname.startsWith("/contact") ? "active" : ""}`}
                href="/contact"
                onClick={closeMenu}
              >
                Contact Us
              </Link>

              {/* Command Center */}
              <Link
                className={`nav-link ${pathname.startsWith("/command-center") ? "active" : ""}`}
                href="/command-center"
                onClick={closeMenu}
              >
                Command Center
              </Link>
          </div>

          <div className="nav-actions">
            {/* <Link className="btn secondary small" href="/events" onClick={closeMenu}>
              View Targets
            </Link> */}
            <Link className="btn primary small btn-heist" href="/register" onClick={closeMenu}>
              Join the Heist
            </Link>
          </div>
        </div>

        {/* Overlay for mobile menu */}
        {isMenuOpen && (
          <div className="nav-overlay" onClick={closeMenu}></div>
        )}
      </div>
    </nav>
  );
}




