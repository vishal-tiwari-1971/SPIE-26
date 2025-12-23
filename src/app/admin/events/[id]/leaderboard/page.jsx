'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';

export default function LeaderboardManagementPage() {
  const { id: eventId } = useParams();
  const router = useRouter();
  
  const [event, setEvent] = useState(null);
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({ rank: '', name: '', registrationNumber: '', score: '' });

  useEffect(() => {
    async function fetchData() {
      setError('');
      setLoading(true);
      
      try {
        const eventRes = await fetch(`/api/admin/events/${eventId}`);
        if (!eventRes.ok) {
          setError('Event not found');
          setLoading(false);
          return;
        }
        const eventData = await eventRes.json();
        setEvent(eventData);

        const leaderboardRes = await fetch(`/api/leaderboard/${eventId}`);
        if (leaderboardRes.ok) {
          const leaderboardData = await leaderboardRes.json();
          setLeaderboard(leaderboardData);
        }
      } catch (err) {
        setError('Failed to load data');
      }
      setLoading(false);
    }
    fetchData();
  }, [eventId]);

  async function handleAddEntry(e) {
    e.preventDefault();
    setSaving(true);
    setError('');

    try {
      const res = await fetch(`/api/leaderboard/${eventId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          rank: parseInt(formData.rank),
          name: formData.name,
          registrationNumber: formData.registrationNumber,
          score: parseInt(formData.score)
        })
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Failed to add entry');
      }

      const newEntry = await res.json();
      setLeaderboard([...leaderboard, newEntry].sort((a, b) => a.rank - b.rank));
      setFormData({ rank: '', name: '', registrationNumber: '', score: '' });
    } catch (err) {
      setError(err.message || 'Failed to add entry');
    }
    setSaving(false);
  }

  async function handleUpdateEntry(entryId) {
    setSaving(true);
    setError('');

    try {
      const res = await fetch(`/api/leaderboard/${eventId}/${entryId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          rank: parseInt(formData.rank),
          name: formData.name,
          registrationNumber: formData.registrationNumber,
          score: parseInt(formData.score)
        })
      });

      if (!res.ok) {
        throw new Error('Failed to update entry');
      }

      const updated = await res.json();
      setLeaderboard(leaderboard.map(e => e.id === entryId ? updated : e).sort((a, b) => a.rank - b.rank));
      setEditingId(null);
      setFormData({ rank: '', name: '', registrationNumber: '', score: '' });
    } catch (err) {
      setError(err.message || 'Failed to update entry');
    }
    setSaving(false);
  }

  async function handleDeleteEntry(entryId) {
    if (!confirm('Are you sure you want to delete this entry?')) return;

    setError('');
    try {
      const res = await fetch(`/api/leaderboard/${eventId}/${entryId}`, {
        method: 'DELETE'
      });

      if (!res.ok) {
        throw new Error('Failed to delete entry');
      }

      setLeaderboard(leaderboard.filter(e => e.id !== entryId));
    } catch (err) {
      setError(err.message || 'Failed to delete entry');
    }
  }

  function startEdit(entry) {
    setEditingId(entry.id);
    setFormData({
      rank: entry.rank.toString(),
      name: entry.name,
      registrationNumber: entry.registrationNumber || '',
      score: entry.score.toString()
    });
  }

  function cancelEdit() {
    setEditingId(null);
    setFormData({ rank: '', name: '', registrationNumber: '', score: '' });
  }

  if (loading) return <p className="muted page-shell">Loading...</p>;
  if (!event) return <p className="muted page-shell">Event not found</p>;

  return (
    <main className="page-shell">
      <section className="hero">
        <p className="chip">Admin</p>
        <h1>Leaderboard: {event.title}</h1>
        <p className="muted">Manage leaderboard entries for this event.</p>
      </section>

      <section className="section">
        <div className="signin-container">
          <h2 style={{ marginBottom: '1rem' }}>
            {editingId ? 'Edit Entry' : 'Add New Entry'}
          </h2>
          <form 
            className="signin-form" 
            onSubmit={(e) => {
              e.preventDefault();
              if (editingId) {
                handleUpdateEntry(editingId);
              } else {
                handleAddEntry(e);
              }
            }}
          >
            <div className="form-group">
              <label htmlFor="rank">Rank</label>
              <input
                id="rank"
                type="number"
                className="form-input"
                placeholder="Rank"
                value={formData.rank}
                onChange={(e) => setFormData({ ...formData, rank: e.target.value })}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                id="name"
                className="form-input"
                placeholder="Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="registrationNumber">Registration Number</label>
              <input
                id="registrationNumber"
                className="form-input"
                placeholder="Registration Number"
                value={formData.registrationNumber}
                onChange={(e) => setFormData({ ...formData, registrationNumber: e.target.value })}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="score">Score</label>
              <input
                id="score"
                type="number"
                className="form-input"
                placeholder="Score"
                value={formData.score}
                onChange={(e) => setFormData({ ...formData, score: e.target.value })}
                required
              />
            </div>

            {error && <div className="form-error">{error}</div>}

            <div className="pill-row" style={{ marginTop: '0.5rem' }}>
              <button
                type="submit"
                className="btn primary"
                disabled={saving}
              >
                {saving ? 'Saving...' : (editingId ? 'Update Entry' : 'Add Entry')}
              </button>
              {editingId && (
                <button
                  type="button"
                  className="btn secondary"
                  onClick={cancelEdit}
                  disabled={saving}
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>
      </section>

      <section className="section">
        <h2 style={{ marginBottom: '1rem' }}>Leaderboard Entries</h2>
        {leaderboard.length === 0 ? (
          <p className="muted">No entries yet. Add one to get started.</p>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid var(--color-border)' }}>
                  <th style={{ padding: '0.75rem', textAlign: 'left' }}>Rank</th>
                  <th style={{ padding: '0.75rem', textAlign: 'left' }}>Name</th>
                  <th style={{ padding: '0.75rem', textAlign: 'left' }}>Registration #</th>
                  <th style={{ padding: '0.75rem', textAlign: 'left' }}>Score</th>
                  <th style={{ padding: '0.75rem', textAlign: 'left' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {leaderboard.map((entry) => (
                  <tr key={entry.id} style={{ borderBottom: '1px solid var(--color-border)' }}>
                    <td style={{ padding: '0.75rem' }}>{entry.rank}</td>
                    <td style={{ padding: '0.75rem' }}>{entry.name}</td>
                    <td style={{ padding: '0.75rem' }}>{entry.registrationNumber || '—'}</td>
                    <td style={{ padding: '0.75rem' }}>{entry.score}</td>
                    <td style={{ padding: '0.75rem' }}>
                      <div className="pill-row">
                        <button
                          className="btn secondary"
                          onClick={() => startEdit(entry)}
                          style={{ fontSize: '0.875rem', padding: '0.4rem 0.8rem' }}
                        >
                          Edit
                        </button>
                        <button
                          className="btn secondary"
                          onClick={() => handleDeleteEntry(entry.id)}
                          style={{ fontSize: '0.875rem', padding: '0.4rem 0.8rem', color: 'var(--color-error)' }}
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      <section className="section">
        <button
          className="btn secondary"
          onClick={() => router.back()}
        >
          Back
        </button>
      </section>
    </main>
  );
}
