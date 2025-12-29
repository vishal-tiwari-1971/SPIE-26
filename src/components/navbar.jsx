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
<<<<<<< HEAD
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
=======
      <div className="nav-inner">
        <Link href="/" className="nav-brand" onClick={closeMenu}>
          <span className="nav-logo">
            <img src="	https://i.postimg.cc/QxMBprrW/logo.png" alt="SPIE" className="nav-logo-img" />
          </span>
          {/* <div className="nav-brand-text">
            <span className="nav-title">Prodyog 2026</span>
            <span className="nav-sub">Prodyog</span>
          </div> */}
>>>>>>> f62d719e868fc107c95d3f775638c6c43efa60ad
        </Link>

        <Link
          className={`nav-link ${pathname.startsWith("/prodyog") ? "active" : ""}`}
          href="/prodyog"
          onClick={closeMenu}
        >
          OP Prodyog
        </Link>

<<<<<<< HEAD
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
=======
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
>>>>>>> f62d719e868fc107c95d3f775638c6c43efa60ad
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




