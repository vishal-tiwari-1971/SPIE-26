"use client";

import Link from "next/link";
// import { signIn } from "next-auth/react";
import { GoogleLogin } from "@react-oauth/google";

export default function RegisterPage() {
  return (
    <main className="page-shell">
      <section className="hero">
        <p className="chip">Join SPIE</p>
        <h1>Create your account</h1>
        <p className="muted">Choose how you want to join the fest.</p>
      </section>

      <section className="section">
        <div className="register-grid">
          <div className="card">
            <h2>User</h2>
            <p className="muted">For attendees and participants.</p>
            <div className="pill-row" style={{ marginTop: "1rem" }}>
              <GoogleLogin
  onSuccess={(credentialResponse) => {
    fetch("/api/auth/google", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        token: credentialResponse.credential
      })
    }).then(() => {
      window.location.href = "/home";
    });
  }}
  onError={() => {
    console.log("Login Failed");
  }}
/>
            </div>
          </div>

          <div className="card">
            <h2>Admin</h2>
            <p className="muted">For organizers and staff.</p>
            <div className="pill-row" style={{ marginTop: "1rem" }}>
              <Link className="btn secondary" href="/admin/signin">
                Continue as Admin
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
