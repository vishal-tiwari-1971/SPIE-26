"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  // Close menu when pathname changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  const handleNavClick = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav className="nav-bar">
      <div className="nav-inner">
        {/* BRAND */}
        <Link href="/" className="nav-brand">
          <span className="nav-logo">SPIE</span>
          {/* <div className="nav-brand-text">
            <span className="nav-title">Prodyog 2026</span>
          </div> */}
        </Link>

        {/* NAV MENU */}
        <div className={`nav-menu ${isMenuOpen ? "active" : ""}`}>
          <Link href="/" className="nav-link" onClick={handleNavClick}>
            Home
          </Link>
          <Link href="/prodyog" className="nav-link" onClick={handleNavClick}>
            Prodyog
          </Link>
          <Link href="/events" className="nav-link" onClick={handleNavClick}>
            Events
          </Link>
          <Link href="/team" className="nav-link" onClick={handleNavClick}>
            Team
          </Link>
          <Link href="/gallery" className="nav-link" onClick={handleNavClick}>
            Gallery
          </Link>
          <Link href="/contact" className="nav-link sparkle-hover" onClick={handleNavClick}>
            Contact Us
          </Link>
          
          {/* MOBILE: Join Button */}
          <Link href="/register" className="btn primary small btn-heist nav-mobile-btn" onClick={handleNavClick}>
            Join
          </Link>
        </div>

        {/* DESKTOP: Join Button */}
        <div className="nav-actions">
          <Link href="/register" className="btn primary small btn-heist">
            Join
          </Link>
        </div>

        {/* HAMBURGER */}
        <button
          className={`hamburger ${isMenuOpen ? "active" : ""}`}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        {/* OVERLAY */}
        {isMenuOpen && (
          <div className="nav-overlay" onClick={() => setIsMenuOpen(false)} />
        )}
      </div>
    </nav>
  );
}



