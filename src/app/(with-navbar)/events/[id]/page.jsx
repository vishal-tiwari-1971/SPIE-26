"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { GoogleLogin } from "@react-oauth/google";
import { formatDateDDMMYYYY } from "@/lib/date";

const SECTION_LABELS = {
  OVERVIEW: 'Overview',
  ELIGIBILITY: 'Eligibility',
  TEAM_COMPOSITION: 'Team Composition',
  EVENT_FLOW: 'Event Flow',
  JUDGING_CRITERIA: 'Judging Criteria',
  DURATION: 'Duration',
  PRIZE: 'Prize',
  PRECAUTION: 'Precaution'
};

export default function EventDetailPage() {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [rules, setRules] = useState([]);
  const [loading, setLoading] = useState(true);
  const [registering, setRegistering] = useState(false);
  const [registerError, setRegisterError] = useState("");
  const [registerSuccess, setRegisterSuccess] = useState(false);
  const [popup, setPopup] = useState(null);
  const [openSection, setOpenSection] = useState(null);
  const [showGoogleLogin, setShowGoogleLogin] = useState(false);

  const showPopup = (type, title, message) => {
    setPopup({ type, title, message });
  };

  const closePopup = () => {
    setPopup(null);
  };

  useEffect(() => {
    async function fetchEvent() {
      setLoading(true);
      try {
        const res = await fetch(`/api/admin/events/${id}`, { cache: "no-store" });
        if (!res.ok) {
          setEvent(null);
        } else {
          const data = await res.json();
          setEvent(data);
        }
      } catch (err) {
        setEvent(null);
      } finally {
        setLoading(false);
      }
    }

    async function fetchRules() {
      try {
        const res = await fetch(`/api/admin/events/${id}/rules`);
        if (res.ok) {
          const data = await res.json();
          setRules(data);
        }
      } catch (err) {
        console.error('Failed to fetch rules:', err);
      }
    }

    if (id) {
      fetchEvent();
      fetchRules();
    }
  }, [id]);

  async function handleRegister() {
    setRegisterError("");
    setRegisterSuccess(false);
    setRegistering(true);
    try {
      const res = await fetch(`/api/events/${id}/register`, {
        method: "POST",
      });
      if (res.status === 401) {
        setRegisterError("Please sign in to register.");
        setShowGoogleLogin(true);
      } else if (res.status === 409) {
        setRegisterError("You are already registered for this event.");
        showPopup("warning", "Already Registered", "You are already registered for this event.");
      } else if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setRegisterError(data.message || "Registration failed. Try again.");
        showPopup("error", "Registration Failed", data.message || "Registration failed. Please try again.");
      } else {
        setRegisterSuccess(true);
        showPopup("success", "Success", "Registration successful! You are now registered for this event.");
      }
    } catch (err) {
      setRegisterError("Network error. Please try again.");
    } finally {
      setRegistering(false);
    }
  }

  if (loading) return <p className="muted page-shell">Loading event...</p>;
  if (!event) return <p className="muted page-shell">Event not found.</p>;

  const toggleSection = (section) => {
    setOpenSection(openSection === section ? null : section);
  };

  return (
    <main className="page-shell">
      <section className="section-header" style={{ marginBottom: "1.5rem" }}>
        <div>
          <p className="chip">Event</p>
          <h2 className="section-title">{event.title}</h2>
          <p className="muted" style={{ maxWidth: 640 }}>
            {event.description}
          </p>
        </div>
      </section>

      <section className="card" style={{ padding: "1rem" }}>
        <div className="pill-row" style={{ marginBottom: "0.8rem" }}>
          <span className="chip">{formatDateDDMMYYYY(event.date)}</span>
          <span className="chip">Venue: {event.venue || "TBA"}</span>
        </div>

        <div className="pill-row" style={{ marginTop: "0.8rem" }}>
          <button
            className="btn primary"
            onClick={handleRegister}
            disabled={registering || registerSuccess}
          >
            {registerSuccess ? "Registered" : registering ? "Registering..." : "Register"}
          </button>
          <Link className="btn secondary" href={`/events/${id}/leaderboard`}>View Leaderboard</Link>
        </div>

        {registerError && (
          <div className="form-error" style={{ marginTop: "0.8rem" }}>{registerError}</div>
        )}
        {registerSuccess && (
          <div className="form-success" style={{ marginTop: "0.8rem" }}>
            You have successfully registered!
          </div>
        )}
      </section>

      {/* Rulebook Section */}
      {rules.length > 0 && (
        <section className="card" style={{ padding: "1rem", marginTop: "1.5rem" }}>
          <h3 style={{ margin: "0 0 1rem 0" }}>📖 Event Rulebook</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
            {rules.map((rule) => (
              <div key={rule.id} className="card" style={{ padding: "0.8rem" }}>
                <button
                  onClick={() => toggleSection(rule.section)}
                  style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    padding: 0,
                    color: "inherit",
                    fontSize: "1rem",
                    fontWeight: "600"
                  }}
                >
                  <span>{SECTION_LABELS[rule.section] || rule.section}</span>
                  <span style={{ fontSize: "1.2rem" }}>
                    {openSection === rule.section ? "▲" : "▼"}
                  </span>
                </button>
                {openSection === rule.section && (
                  <div 
                    className="muted" 
                    style={{ 
                      marginTop: "0.8rem", 
                      paddingTop: "0.8rem", 
                      borderTop: "1px solid rgba(255,255,255,0.1)",
                      whiteSpace: "pre-wrap",
                      lineHeight: "1.6"
                    }}
                  >
                    {rule.content}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Google Login Modal */}
      {showGoogleLogin && (
        <div className="popup-overlay" onClick={() => setShowGoogleLogin(false)}>
          <div className="popup popup-warning" onClick={(e) => e.stopPropagation()}>
            <h3 className="popup-title">Sign In Required</h3>
            <p className="popup-message">Please sign in with your official email to register for this event.</p>
            <div style={{ marginTop: "1.5rem", display: "flex", justifyContent: "center" }}>
              <GoogleLogin
                onSuccess={(credentialResponse) => {
                  setShowGoogleLogin(false);
                  fetch("/api/auth/google", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                      token: credentialResponse.credential
                    })
                  }).then(async (res) => {
                    const data = await res.json();
                    if (data.error === "Not an official email") {
                      showPopup("warning", "Invalid Email", "This is not an official mail ID. Please use your official email to register.");
                    } else if (res.ok) {
                      showPopup("success", "Success", "Successfully signed in! Registering for event...");
                      setTimeout(() => {
                        handleRegister();
                      }, 1000);
                    }
                  });
                }}
                onError={() => {
                  showPopup("error", "Login Failed", "Failed to sign in with Google. Please try again.");
                }}
              />
            </div>
            <div className="popup-actions">
              <button className="btn secondary" onClick={() => setShowGoogleLogin(false)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {popup && (
        <div className="popup-overlay" onClick={closePopup}>
          <div className={`popup popup-${popup.type}`} onClick={(e) => e.stopPropagation()}>
            <h3 className="popup-title">{popup.title}</h3>
            <p className="popup-message">{popup.message}</p>
            <div className="popup-actions">
              <button className="btn primary" onClick={closePopup}>
                OK
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
