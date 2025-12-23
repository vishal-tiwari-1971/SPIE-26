'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { formatDateDDMMYYYY } from '@/lib/date';

export default function AdminEventsPage() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  // Fetch all events
  async function fetchEvents() {
    setLoading(true);
    const res = await fetch('/api/admin/events', { cache: 'no-store' });
    const data = await res.json();
    setEvents(data);
    setLoading(false);
  }

  useEffect(() => {
    fetchEvents();
  }, []);

  // Add new event
  async function handleAddEvent(e) {
    e.preventDefault();
    setSubmitting(true);

    const form = e.target;

    await fetch('/api/admin/events', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title: form.title.value,
        description: form.description.value,
        date: form.date.value,
        venue: form.venue.value,
      }),
    });

    form.reset();
    setSubmitting(false);
    fetchEvents();
  }

  // Delete event
  async function handleDelete(id) {
    const ok = confirm('Are you sure you want to delete this event?');
    if (!ok) return;

    await fetch(`/api/admin/events/${id}`, {
      method: 'DELETE',
    });

    fetchEvents();
  }

  return (
    <div style={{ padding: '1.5rem' }}>
      <h1>Manage Events</h1>

      {/* Add Event Form */}
      <section style={{ margin: '1.5rem 0' }}>
        <h2>Add New Event</h2>

        <form onSubmit={handleAddEvent} style={{ maxWidth: 500 }}>
          <input
            name="title"
            placeholder="Event Title"
            required
            style={inputStyle}
          />

          <textarea
            name="description"
            placeholder="Event Description"
            style={inputStyle}
          />

          <input
            name="date"
            type="datetime-local"
            required
            style={inputStyle}
          />

          <input
            name="venue"
            placeholder="Venue"
            required
            style={inputStyle}
          />

          <button type="submit" disabled={submitting}>
            {submitting ? 'Adding...' : 'Add Event'}
          </button>
        </form>
      </section>

      {/* Events List */}
      <section>
        <h2>All Events</h2>

        {loading ? (
          <p>Loading events...</p>
        ) : events.length === 0 ? (
          <p>No events found.</p>
        ) : (
          <table border="1" cellPadding="8" cellSpacing="0">
            <thead>
              <tr>
                <th>Title</th>
                <th>Date</th>
                <th>Venue</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {events.map(event => (
                <tr key={event.id}>
                  <td>{event.title}</td>
                  <td>{formatDateDDMMYYYY(event.date)}</td>
                  <td>{event.venue}</td>
                  <td>
                    <Link href={`/admin/events/${event.id}/edit`}>
                      Edit
                    </Link>
                    {' | '}
                    <button
                      onClick={() => handleDelete(event.id)}
                      style={{ color: 'red' }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>
    </div>
  );
}

/* ---------- Helpers ---------- */

// Removed local formatter; using shared util

const inputStyle = {
  display: 'block',
  width: '100%',
  marginBottom: '0.75rem',
  padding: '0.5rem',
};
