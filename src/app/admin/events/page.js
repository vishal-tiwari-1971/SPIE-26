'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import AddEventForm from './AddEventForm';
import { formatDateDDMMYYYY } from '@/lib/date';

export default function AdminEvents() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  async function fetchEvents() {
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/admin/events');
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Failed to load events');
      }
      setEvents(await res.json());
    } catch (err) {
      setError(err.message || 'Failed to load events');
    }
    setLoading(false);
  }

  async function deleteEvent(id) {
    setError('');
    try {
      const res = await fetch(`/api/admin/events/${id}`, {
        method: 'DELETE'
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Failed to delete');
      }
      fetchEvents();
    } catch (err) {
      setError(err.message || 'Failed to delete');
    }
  }

  useEffect(() => {
    fetchEvents();
  }, []);

  return (
    <main className="page-shell">
      <section className="hero">
        <p className="chip">Admin</p>
        <h1>Manage Events</h1>
        <p className="muted">Create, view, and remove events for the fest.</p>
      </section>

      <section className="section">
        <div className="admin-grid">
          <div>
            <h3 style={{ margin: '0 0 1rem 0' }}>Add Event</h3>
            <AddEventForm onAdd={fetchEvents} />
          </div>

          <div className="admins-list">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '1rem' }}>
              <div>
                <h3 style={{ margin: 0 }}>Existing Events</h3>
                <p className="muted" style={{ margin: 0 }}>Click delete to remove an event.</p>
              </div>
              <span className="chip">{events.length} total</span>
            </div>

            {error && <div className="form-error" style={{ marginTop: '1rem' }}>{error}</div>}

            {loading ? (
              <p className="muted" style={{ marginTop: '1rem' }}>Loading events...</p>
            ) : events.length === 0 ? (
              <p className="muted" style={{ marginTop: '1rem' }}>No events found.</p>
            ) : (
              <div className="card-grid" style={{ marginTop: '1rem' }}>
                {events.map((event) => (
                  <article key={event.id} className="card">
                    {event.image && (
                      <div style={{ marginBottom: '0.8rem', overflow: 'hidden', borderRadius: 8 }}>
                        <img 
                          src={event.image} 
                          alt={event.title} 
                          style={{ width: '100%', height: 200, objectFit: 'cover' }} 
                        />
                      </div>
                    )}
                    <div className="chip" style={{ marginBottom: '0.6rem' }}>
                      {event.date ? formatDateDDMMYYYY(event.date) : 'No date'}
                    </div>
                    <h3 style={{ margin: '0 0 0.4rem 0' }}>{event.title}</h3>
                    <p className="muted" style={{ margin: '0 0 0.8rem 0' }}>
                      {event.description || 'No description provided.'}
                    </p>
                    <div className="muted" style={{ marginBottom: '0.8rem' }}>
                      Venue: {event.venue || 'TBA'}
                    </div>
                    <div className="pill-row">
                        <Link
                          className="btn secondary small"
                          href={`/admin/events/${event.id}/edit`}
                        >
                          Edit
                        </Link>
                        <Link
                          className="btn secondary small"
                          href={`/admin/events/${event.id}/leaderboard`}
                        >
                          Leaderboard
                        </Link>
                      <button
                        className="btn secondary small"
                        onClick={() => deleteEvent(event.id)}
                      >
                        Delete
                      </button>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
