"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

export default function AdminNavbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [loggingOut, setLoggingOut] = useState(false);

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

  return (
    <nav className="nav-bar">
      <div className="nav-inner">
        <div className="nav-brand">
          <div className="nav-logo">SP</div>
          <div className="nav-brand-text">
            <span className="nav-title">SPIE Admin</span>
            <span className="nav-sub">Management Portal</span>
          </div>
        </div>

        <div className="nav-links">
          <Link 
            href="/admin/dashboard" 
            className={`nav-link ${pathname === "/admin/dashboard" ? "active" : ""}`}
          >
            Dashboard
          </Link>
          <Link 
            href="/admin/events" 
            className={`nav-link ${pathname.startsWith("/admin/events") ? "active" : ""}`}
          >
            Events
          </Link>
          <Link 
            href="/admin/team" 
            className={`nav-link ${pathname.startsWith("/admin/team") ? "active" : ""}`}
          >
            Team
          </Link>
        </div>

        <div className="nav-actions">
          <Link href="/home" className="btn secondary">
            Exit to Site
          </Link>
          <button 
            onClick={handleLogout} 
            className="btn primary"
            disabled={loggingOut}
          >
            {loggingOut ? 'Logging out...' : 'Logout'}
          </button>
        </div>
      </div>
    </nav>
  );
}
