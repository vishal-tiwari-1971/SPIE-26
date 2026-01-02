"use client";

import Link from "next/link";
import { useState } from "react";
import { GoogleLogin } from "@react-oauth/google";

export default function RegisterPage() {
  const [popup, setPopup] = useState(null);

  const showPopup = (type, title, message) => {
    setPopup({ type, title, message });
  };

  const closePopup = () => {
    setPopup(null);
  };

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
             <p className="muted">Only use official college email</p>
            <div className="pill-row" style={{ marginTop: "1rem" }}>
              <GoogleLogin
  onSuccess={(credentialResponse) => {
    fetch("/api/auth/google", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        token: credentialResponse.credential
      })
    }).then(async (res) => {
      const data = await res.json();
      if (res.ok) {
        showPopup("success", "Success", "Successfully signed in! Redirecting...");
        setTimeout(() => {
          window.location.href = "/events";
        }, 1500);
      } else if (data.message && data.message.includes('not a SPIE member')) {
        // Redirect to Google Form for PI students
        showPopup("warning", "Not a SPIE Member", "You need to register for SPIE membership first. Redirecting to registration form...");
        setTimeout(() => {
          window.location.href = data.redirectUrl || "https://forms.google.com/your-form-url";
        }, 2000);
      } else if (data.message && data.message.includes('official college email')) {
        showPopup("warning", "Invalid Email", "Please use your official @nitjsr.ac.in email to register.");
      } else {
        showPopup("error", "Registration Failed", data.message || "An error occurred during registration.");
      }
    }).catch((error) => {
      showPopup("error", "Google Auth Error", error.message);
    });
  }}
  onError={() => {
    showPopup("error", "Login Failed", "Failed to sign in with Google. Please try again.");
  }}
/>
            </div>
          </div>

          <div className="card">
            <h2>Admin</h2>
            <p className="muted">For organizers and staff.</p>
            <div className="pill-row" style={{ marginTop: "1rem" }}>
              <Link className="btn secondary" href="/signin">
                Continue as Admin
              </Link>
            </div>
          </div>
        </div>
      </section>

      {popup && (
        <div className="popup-overlay" onClick={closePopup}>
          <div className={`popup popup-${popup.type}`} onClick={(e) => e.stopPropagation()}>
            <h3 className="popup-title">{popup.title}</h3>
            <p className="popup-message">{popup.message}</p>
            <div className="popup-actions">
              <button className="btn secondary" onClick={closePopup}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
