import Link from "next/link";

export default function AdminNavbar() {
  return (
    <nav className="nav-bar">
      <div className="nav-inner">
        <Link href="/" className="nav-brand">
          <span className="nav-logo">SPIE</span>
          <div className="nav-brand-text">
            <span className="nav-title">SPIE 2026</span>
            <span className="nav-sub">Prodyog</span>
          </div>
        </Link>

        <div className="nav-links">
          <Link className="nav-link" href="/admin/events">
            Events
          </Link>
          <Link className="nav-link" href="/admin/team">
            Team
          </Link>
        </div>

        <div className="nav-actions">
          <Link className="btn secondary small" href="">
            View Schedule
          </Link>
          <Link className="btn primary small" href="/home">
            Logout
          </Link>
        </div>
      </div>
    </nav>
  );
}
