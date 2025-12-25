"use client";

import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
          <span className="nav-logo">SPIE</span>
          <div className="nav-brand-text">
            <span className="nav-title">SPIE 2026</span>
            <span className="nav-sub">Prodyog</span>
          </div>
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
            <Link className="nav-link" href="/home" onClick={closeMenu}>
              Home
            </Link>
            <Link className="nav-link" href="/events" onClick={closeMenu}>
              Events
            </Link>
            <Link className="nav-link" href="/team" onClick={closeMenu}>
              Team
            </Link>
          </div>

          <div className="nav-actions">
            <Link className="btn secondary small" href="/events" onClick={closeMenu}>
              View Schedule
            </Link>
            <Link className="btn primary small" href="/register" onClick={closeMenu}>
              Register
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
