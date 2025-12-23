'use client';

import { useEffect, useState } from 'react';
import { formatDateDDMMYYYY } from '@/lib/date';

export default function EventsPage() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('ALL');

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

  const filteredEvents = statusFilter === 'ALL' 
    ? events 
    : events.filter(event => event.status === statusFilter);

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

      <section style={{ marginBottom: "1.5rem" }}>
        <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
          <button
            onClick={() => setStatusFilter('ALL')}
            className={`btn ${statusFilter === 'ALL' ? 'primary' : 'secondary'}`}
          >
            All Events
          </button>
          <button
            onClick={() => setStatusFilter('UPCOMING')}
            className={`btn ${statusFilter === 'UPCOMING' ? 'primary' : 'secondary'}`}
          >
            Upcoming
          </button>
          <button
            onClick={() => setStatusFilter('ONGOING')}
            className={`btn ${statusFilter === 'ONGOING' ? 'primary' : 'secondary'}`}
          >
            Ongoing
          </button>
          <button
            onClick={() => setStatusFilter('COMPLETED')}
            className={`btn ${statusFilter === 'COMPLETED' ? 'primary' : 'secondary'}`}
          >
            Completed
          </button>
        </div>
      </section>

      {loading ? (
        <p className="muted">Loading events...</p>
      ) : filteredEvents.length === 0 ? (
        <p className="muted">No events available for the selected filter.</p>
      ) : (
        <div className="card-grid">
          {filteredEvents.map((event) => (
            <article key={event.id} className="card">
              <div style={{ display: "flex", gap: "0.5rem", marginBottom: "0.6rem" }}>
                <div className="chip">
                  {formatDateDDMMYYYY(event.date)}
                </div>
                <div className="chip" style={{ 
                  backgroundColor: event.status === 'UPCOMING' ? '#4CAF50' : event.status === 'ONGOING' ? '#FF9800' : '#9E9E9E'
                }}>
                  {event.status}
                </div>
              </div>
              <h3 style={{ margin: "0 0 0.4rem 0" }}>{event.title}</h3>
              <p className="muted" style={{ margin: "0 0 0.8rem 0" }}>
                {event.description}
              </p>
              <div className="muted">Venue: {event.venue}</div>
              <div className="pill-row" style={{ marginTop: "0.8rem" }}>
                <a className="btn secondary" href={`/events/${event.id}`}>View Details</a>
                <a className="btn primary" href={`/events/${event.id}`}>Register</a>
              </div>
            </article>
          ))}
        </div>
      )}
    </main>
  );
}
