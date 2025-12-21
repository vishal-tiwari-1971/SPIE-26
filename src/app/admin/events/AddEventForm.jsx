'use client';

import { useState } from 'react';

export default function AddEventForm({ onAdd }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setLoading(true);

    const form = e.target;

    try {
      const res = await fetch('/api/admin/events', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: form.title.value,
          description: form.description.value,
          date: form.date.value,
          venue: form.venue.value
        })
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Failed to add event');
      }

      form.reset();
      onAdd();
    } catch (err) {
      setError(err.message || 'Failed to add event');
    }

    setLoading(false);
  }

  return (
    <form className="signin-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="title">Title</label>
        <input
          id="title"
          name="title"
          className="form-input"
          placeholder="Enter event title"
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          name="description"
          className="form-input"
          placeholder="Add a short description"
          rows={3}
        />
      </div>

      <div className="form-group">
        <label htmlFor="date">Date & Time</label>
        <input
          id="date"
          name="date"
          type="datetime-local"
          className="form-input"
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="venue">Venue</label>
        <input
          id="venue"
          name="venue"
          className="form-input"
          placeholder="Enter venue"
        />
      </div>

      {error && <div className="form-error">{error}</div>}

      <button
        type="submit"
        className="btn primary"
        disabled={loading}
        style={{ width: '100%', marginTop: '0.5rem' }}
      >
        {loading ? 'Adding...' : 'Add Event'}
      </button>
    </form>
  );
}
