"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { formatDateDDMMYYYY } from "@/lib/date";

export default function EventDetailPage() {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [registering, setRegistering] = useState(false);
  const [registerError, setRegisterError] = useState("");
  const [registerSuccess, setRegisterSuccess] = useState(false);
  const [popup, setPopup] = useState(null);

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
    if (id) fetchEvent();
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
        showPopup("error", "Unauthorized", "Please sign in to register for this event.");
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
          <Link className="btn secondary" href="/events">Back to Events</Link>
          <Link className="btn secondary" href="/register">Sign in</Link>
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
