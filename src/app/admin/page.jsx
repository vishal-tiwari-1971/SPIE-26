import Link from "next/link";

export default function AdminPage() {
  return (
    <main className="page-shell">
      <section className="hero">
        <p className="chip">Admin</p>
        <h1>Admin Portal</h1>
        <p className="muted">Manage the fest and admin credentials.</p>
      </section>

      <section className="section">
        <div className="card-grid">
          <Link href="/admin/credentials" className="card card-link">
            <h3>Manage Credentials</h3>
            <p className="muted">Create and view admin accounts.</p>
          </Link>
          <div className="card">
            <h3>Events Management</h3>
            <p className="muted">Coming soon.</p>
          </div>
          <div className="card">
            <h3>Settings</h3>
            <p className="muted">Coming soon.</p>
          </div>
        </div>
      </section>
    </main>
  );
}
