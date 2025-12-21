'use client';

import { useEffect, useState } from 'react';
import { formatDateDDMMYYYY } from '@/lib/date';

export default function EventsPage() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchEvents() {
      try {
        const res = await fetch('/api/admin/events');
        if (res.ok) {
          const data = await res.json();
          setEvents(data);
        }
      } catch (err) {
        console.error('Failed to fetch events:', err);
      }
      setLoading(false);
    }
    fetchEvents();
  }, []);

  return (
    <main className="page-shell">
      <section className="section-header" style={{ marginBottom: "1.5rem" }}>
        <div>
          <p className="chip">Events</p>
          <h2 className="section-title">What is happening at SPIE 2026</h2>
          <p className="muted" style={{ maxWidth: "640px" }}>
            Explore workshops, panels, and showcases led by students, faculty, and industry guests.
          </p>
        </div>
      </section>

      {loading ? (
        <p className="muted">Loading events...</p>
      ) : events.length === 0 ? (
        <p className="muted">No events available yet.</p>
      ) : (
        <div className="card-grid">
          {events.map((event) => (
            <article key={event.id} className="card">
              <div className="chip" style={{ marginBottom: "0.6rem" }}>
                {formatDateDDMMYYYY(event.date)}
              </div>
              <h3 style={{ margin: "0 0 0.4rem 0" }}>{event.title}</h3>
              <p className="muted" style={{ margin: "0 0 0.8rem 0" }}>
                {event.description}
              </p>
              <div className="muted">Venue: {event.venue}</div>
            </article>
          ))}
        </div>
      )}
    </main>
  );
}
