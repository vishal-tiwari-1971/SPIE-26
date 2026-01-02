"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import Image from "next/image";

export default function AdminNavbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [loggingOut, setLoggingOut] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  async function handleLogout() {
    setLoggingOut(true);
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      router.push('/signin');
    } catch (err) {
      console.error('Logout failed:', err);
      setLoggingOut(false);
    }
  }

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav className="nav-bar">
      <div className="nav-inner">
        <div className="nav-brand">
          <Link href="/admin/dashboard" className="nav-logo-link">
           <img
            src="/spie-logo.png"
            alt="SPIE logo"
            className="nav-logo"
          />
          </Link>
          <div className="nav-brand-text">
            {/* <span className="nav-title">SPIE Admin</span> */}
            <span className="nav-sub">Management Portal</span>
          </div>
        </div>

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

        {/* Navigation Menu */}
        <div className={`nav-menu ${isMenuOpen ? 'active' : ''}`}>
          <div className="nav-links">
            <Link 
              href="/admin/dashboard" 
              className={`nav-link ${pathname === "/admin/dashboard" ? "active" : ""}`}
              onClick={closeMenu}
            >
              Dashboard
            </Link>
            <Link 
              href="/admin/events" 
              className={`nav-link ${pathname.startsWith("/admin/events") ? "active" : ""}`}
              onClick={closeMenu}
            >
              Events
            </Link>
            <Link 
              href="/admin/team" 
              className={`nav-link ${pathname.startsWith("/admin/team") ? "active" : ""}`}
              onClick={closeMenu}
            >
              Team
            </Link>
          </div>

          <div className="nav-actions">
            <Link href="/" className="btn secondary" onClick={closeMenu}>
              Exit to Site
            </Link>
            <button 
              onClick={() => {
                closeMenu();
                handleLogout();
              }} 
              className="btn primary"
              disabled={loggingOut}
            >
              {loggingOut ? 'Logging out...' : 'Logout'}
            </button>
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
