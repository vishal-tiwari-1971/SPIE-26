"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function AdminNavbar() {
  const pathname = usePathname();

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
            Exit Admin
          </Link>
        </div>
      </div>
    </nav>
  );
}
