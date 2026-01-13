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
  const [formData, setFormData] = useState({ rank: '', name: '', registrationNumber: '', score: '', teamName: '', teamMembers: [] });
  const [memberInput, setMemberInput] = useState({ name: '', registrationNumber: '' });

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
          registrationNumber: formData.registrationNumber || null,
          score: formData.score ? parseInt(formData.score) : null,
          teamName: formData.teamName || null,
          teamMembers: formData.teamMembers.length > 0 ? formData.teamMembers : null
        })
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Failed to add entry');
      }

      const newEntry = await res.json();
      setLeaderboard([...leaderboard, newEntry].sort((a, b) => a.rank - b.rank));
      setFormData({ rank: '', name: '', registrationNumber: '', score: '', teamName: '', teamMembers: [] });
      setMemberInput({ name: '', registrationNumber: '' });
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
          registrationNumber: formData.registrationNumber || null,
          score: formData.score ? parseInt(formData.score) : null,
          teamName: formData.teamName || null,
          teamMembers: formData.teamMembers.length > 0 ? formData.teamMembers : null
        })
      });

      if (!res.ok) {
        throw new Error('Failed to update entry');
      }

      const updated = await res.json();
      setLeaderboard(leaderboard.map(e => e.id === entryId ? updated : e).sort((a, b) => a.rank - b.rank));
      setEditingId(null);
      setFormData({ rank: '', name: '', registrationNumber: '', score: '', teamName: '', teamMembers: [] });
      setMemberInput({ name: '', registrationNumber: '' });
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
      score: entry.score?.toString() || '',
      teamName: entry.teamName || '',
      teamMembers: entry.teamMembers || []
    });
  }

  function cancelEdit() {
    setEditingId(null);
    setFormData({ rank: '', name: '', registrationNumber: '', score: '', teamName: '', teamMembers: [] });
    setMemberInput({ name: '', registrationNumber: '' });
  }

  function handleAddMember(e) {
    e.preventDefault();
    if (memberInput.name.trim()) {
      setFormData({
        ...formData,
        teamMembers: [...formData.teamMembers, { ...memberInput }]
      });
      setMemberInput({ name: '', registrationNumber: '' });
    }
  }

  function handleRemoveMember(index) {
    setFormData({
      ...formData,
      teamMembers: formData.teamMembers.filter((_, i) => i !== index)
    });
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
              <label htmlFor="name">Name {event?.isGroupEvent ? '(optional)' : '(required)'}</label>
              <input
                id="name"
                className="form-input"
                placeholder="Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required={!event?.isGroupEvent}
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
              />
            </div>

            <div className="form-group">
              <label htmlFor="score">Score (optional)</label>
              <input
                id="score"
                type="number"
                className="form-input"
                placeholder="Score"
                value={formData.score}
                onChange={(e) => setFormData({ ...formData, score: e.target.value })}
              />
            </div>

            {event?.isGroupEvent && (
              <>
                <div className="form-group">
                  <label htmlFor="teamName">Team Name (optional)</label>
                  <input
                    id="teamName"
                    className="form-input"
                    placeholder="Team Name"
                    value={formData.teamName}
                    onChange={(e) => setFormData({ ...formData, teamName: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label>Team Members</label>
                  <div style={{ border: '1px solid #333', padding: '1rem', borderRadius: '8px', marginBottom: '0.5rem' }}>
                    {formData.teamMembers.length === 0 ? (
                      <p className="muted" style={{ margin: 0, fontSize: '0.9rem' }}>No team members added yet</p>
                    ) : (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        {formData.teamMembers.map((member, index) => (
                          <div key={index} style={{ 
                            display: 'flex', 
                            justifyContent: 'space-between', 
                            alignItems: 'center',
                            padding: '0.5rem',
                            background: 'rgba(255, 183, 3, 0.05)',
                            borderRadius: '4px'
                          }}>
                            <div>
                              <strong>{member.name}</strong>
                              {member.registrationNumber && (
                                <span className="muted" style={{ marginLeft: '0.5rem' }}>
                                  ({member.registrationNumber})
                                </span>
                              )}
                            </div>
                            <button
                              type="button"
                              className="btn secondary small"
                              onClick={() => handleRemoveMember(index)}
                            >
                              Remove
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                  
                  <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                    <input
                      className="form-input"
                      placeholder="Member Name"
                      value={memberInput.name}
                      onChange={(e) => setMemberInput({ ...memberInput, name: e.target.value })}
                      style={{ flex: '1', minWidth: '150px' }}
                    />
                    <input
                      className="form-input"
                      placeholder="Registration No."
                      value={memberInput.registrationNumber}
                      onChange={(e) => setMemberInput({ ...memberInput, registrationNumber: e.target.value })}
                      style={{ flex: '1', minWidth: '150px' }}
                    />
                    <button
                      type="button"
                      className="btn secondary"
                      onClick={handleAddMember}
                      disabled={!memberInput.name.trim()}
                    >
                      Add Member
                    </button>
                  </div>
                </div>
              </>
            )}

            {error && <div className="form-error">{error}</div>}

            <div className="pill-row" style={{ marginTop: '0.5rem' }}>
              <button
                type="submit"
                className="btn primary"
                disabled={saving}
              >
                {saving ? 'Saving...' : editingId ? 'Update Entry' : 'Add Entry'}
              </button>
              {editingId && (
                <button
                  type="button"
                  className="btn secondary"
                  onClick={cancelEdit}
                >
                  Cancel Edit
                </button>
              )}
              <button
                type="button"
                className="btn secondary"
                onClick={() => router.push('/admin/events')}
              >
                Back to Events
              </button>
            </div>
          </form>
        </div>

        <div className="admins-list" style={{ marginTop: '2rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '1rem' }}>
            <div>
              <h3 style={{ margin: 0 }}>Current Leaderboard</h3>
              <p className="muted" style={{ margin: 0 }}>Edit or delete entries.</p>
            </div>
            <span className="chip">{leaderboard.length} entries</span>
          </div>

          {leaderboard.length === 0 ? (
            <p className="muted" style={{ marginTop: '1rem' }}>No entries yet.</p>
          ) : (
            <div className="card-grid" style={{ marginTop: '1rem' }}>
              {leaderboard
                .sort((a, b) => a.rank - b.rank)
                .map((entry) => (
                  <article key={entry.id} className="card">
                    <div className="pill-row" style={{ justifyContent: 'space-between', alignItems: 'center' }}>
                      <span className="chip">Rank {entry.rank}</span>
                      <div className="pill-row" style={{ gap: '0.6rem' }}>
                        <button className="btn secondary small" onClick={() => startEdit(entry)}>
                          Edit
                        </button>
                        <button className="btn secondary small" onClick={() => handleDeleteEntry(entry.id)}>
                          Delete
                        </button>
                      </div>
                    </div>
                    <h3 style={{ margin: '0.4rem 0' }}>{entry.name}</h3>
                    {entry.teamName && (
                      <p className="muted" style={{ margin: '0 0 0.3rem 0', fontStyle: 'italic' }}>
                        Team: {entry.teamName}
                      </p>
                    )}
                    <p className="muted" style={{ margin: '0 0 0.6rem 0' }}>
                      {entry.registrationNumber || 'No registration number'}
                    </p>
                    {entry.score !== null && entry.score !== undefined && (
                      <div className="muted">Score: {entry.score}</div>
                    )}
                    {entry.teamMembers && entry.teamMembers.length > 0 && (
                      <div style={{ marginTop: '0.8rem', paddingTop: '0.8rem', borderTop: '1px solid #333' }}>
                        <p style={{ fontSize: '0.85rem', fontWeight: 'bold', marginBottom: '0.4rem' }}>Team Members:</p>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
                          {entry.teamMembers.map((member, idx) => (
                            <div key={idx} style={{ fontSize: '0.85rem', paddingLeft: '0.5rem' }}>
                              • {member.name}
                              {member.registrationNumber && (
                                <span className="muted" style={{ marginLeft: '0.3rem' }}>
                                  ({member.registrationNumber})
                                </span>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </article>
                ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
