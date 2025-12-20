"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { verifyAdminCredentials } from "./actions";

export default function AdminSignInPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const result = await verifyAdminCredentials(username, password);

    if (result.success) {
      // Store admin session (in production, use proper session/cookie handling)
      localStorage.setItem("adminSession", JSON.stringify({ username }));
      router.push("/admin");
    } else {
      setError(result.error);
    }

    setLoading(false);
  };

  return (
    <main className="page-shell">
      <section className="hero">
        <p className="chip">Admin</p>
        <h1>Sign in to Admin Portal</h1>
        <p className="muted">Enter your credentials to continue.</p>
      </section>

      <section className="section">
        <div className="signin-container">
          <form className="signin-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input
                id="username"
                type="text"
                className="form-input"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                id="password"
                type="password"
                className="form-input"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {error && <div className="form-error">{error}</div>}

            <button
              type="submit"
              className="btn primary"
              disabled={loading}
              style={{ width: "100%", marginTop: "1rem" }}
            >
              {loading ? "Signing in..." : "Continue"}
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}
