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

    {/* LEFT: BRAND */}
    <Link href="/" className="nav-brand" onClick={closeMenu}>
      <span className="nav-logo">SPIE</span>
      <div className="nav-brand-text">
        <span className="nav-title">Prodyog 2026</span>
      </div>
    </Link>

    {/* CENTER: NAV LINKS */}
    <div className={`nav-menu ${isMenuOpen ? "active" : ""}`}>
      <div className="nav-links">
        <Link
          className={`nav-link ${pathname === "/" ? "active" : ""}`}
          href="/"
          onClick={closeMenu}
        >
          The Plan
        </Link>

        <Link
          className={`nav-link ${pathname.startsWith("/prodyog") ? "active" : ""}`}
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
          The Targets
        </Link>

        <Link
          className={`nav-link ${pathname.startsWith("/team") ? "active" : ""}`}
          href="/team"
          onClick={closeMenu}
        >
          The Crew
        </Link>

        <Link
          className={`nav-link ${pathname.startsWith("/gallery") ? "active" : ""}`}
          href="/gallery"
          onClick={closeMenu}
        >
          Surveillance
        </Link>
      </div>
    </div>

    {/* RIGHT: ACTION BUTTONS */}
    <div className="nav-actions">
      <Link className="btn secondary small" href="/events" onClick={closeMenu}>
        View Targets
      </Link>
      <Link className="btn primary small btn-heist" href="/register" onClick={closeMenu}>
        Join the Heist
      </Link>
    </div>

    {/* HAMBURGER */}
    <button
      className={`hamburger ${isMenuOpen ? "active" : ""}`}
      onClick={toggleMenu}
      aria-label="Toggle menu"
    >
      <span></span>
      <span></span>
      <span></span>
    </button>

    {isMenuOpen && <div className="nav-overlay" onClick={closeMenu} />}
  </div>
</nav>

  );
}



