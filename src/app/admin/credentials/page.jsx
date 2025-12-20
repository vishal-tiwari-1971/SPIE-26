"use client";

import { useState, useEffect } from "react";

export default function AdminCredentialsPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [admins, setAdmins] = useState([]);
  const [loadingAdmins, setLoadingAdmins] = useState(true);

  useEffect(() => {
    fetchAdmins();
  }, []);

  const fetchAdmins = async () => {
    setLoadingAdmins(true);
    try {
      const res = await fetch("/api/admin/credentials");
      const data = await res.json();
      setAdmins(data.admins || []);
    } catch (err) {
      console.error("Failed to fetch admins:", err);
    }
    setLoadingAdmins(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      const res = await fetch("/api/admin/credentials", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Failed to create admin");
        setLoading(false);
        return;
      }

      setSuccess(`Admin "${username}" created successfully!`);
      setUsername("");
      setPassword("");
      setLoading(false);
      fetchAdmins();
    } catch (err) {
      setError("An error occurred. Please try again.");
      setLoading(false);
    }
  };

  return (
    <main className="page-shell">
      <section className="hero">
        <p className="chip">Admin Management</p>
        <h1>Create Admin Credentials</h1>
        <p className="muted">Add new admin users to manage the fest.</p>
      </section>

      <section className="section">
        <div className="admin-grid">
          <div className="signin-form" style={{ maxWidth: "100%", marginRight: "0" }}>
            <h2 style={{ marginTop: 0 }}>New Admin</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="new-username">Username</label>
                <input
                  id="new-username"
                  type="text"
                  className="form-input"
                  placeholder="Enter username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="new-password">Password</label>
                <input
                  id="new-password"
                  type="password"
                  className="form-input"
                  placeholder="Enter password (min 6 chars)"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              {error && <div className="form-error">{error}</div>}
              {success && <div className="form-success">{success}</div>}

              <button
                type="submit"
                className="btn primary"
                disabled={loading}
                style={{ width: "100%", marginTop: "1rem" }}
              >
                {loading ? "Creating..." : "Create Admin"}
              </button>
            </form>
          </div>

          <div className="admins-list">
            <h2>Existing Admins</h2>
            {loadingAdmins ? (
              <p className="muted">Loading...</p>
            ) : admins.length === 0 ? (
              <p className="muted">No admins created yet.</p>
            ) : (
              <div className="table-container">
                <table className="admins-table">
                  <thead>
                    <tr>
                      <th>Username</th>
                      <th>Created</th>
                    </tr>
                  </thead>
                  <tbody>
                    {admins.map((admin) => (
                      <tr key={admin.id}>
                        <td>{admin.username}</td>
                        <td>
                          {new Date(admin.createdAt).toLocaleDateString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
