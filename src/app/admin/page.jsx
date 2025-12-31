'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { formatDateDDMMYYYY } from '@/lib/date';

export default function AdminEventsPage() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [teamData, setTeamData] = useState({});
  const [expandedEvent, setExpandedEvent] = useState(null);

  // Fetch all events
  async function fetchEvents() {
    setLoading(true);
    const res = await fetch('/api/admin/events', { cache: 'no-store' });
    const data = await res.json();
    setEvents(data);
    
    // Fetch teams for group events
    const newTeamData = {};
    for (const event of data) {
      if (event.isGroupEvent) {
        try {
          const teamRes = await fetch(`/api/admin/events/${event.id}/teams`);
          if (teamRes.ok) {
            newTeamData[event.id] = await teamRes.json();
          }
        } catch (err) {
          console.error(`Failed to fetch teams for ${event.id}:`, err);
        }
      }
    }
    setTeamData(newTeamData);
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

  // Export all teams from all group events as CSV
  function exportAllTeamsCSV() {
    const groupEvents = events.filter(e => e.isGroupEvent && teamData[e.id]?.length > 0);
    
    if (groupEvents.length === 0) {
      alert('No group event teams to export');
      return;
    }

    let csv = 'Event Name,Team Name,Leader Name,Leader Email,Total Members (incl. Leader),Member Names,Member Registration Numbers,Date Created\n';
    
    groupEvents.forEach(event => {
      const teams = teamData[event.id] || [];
      teams.forEach(team => {
        const memberNames = team.members.map(m => m.name).join(' | ');
        const memberRegNums = team.members.map(m => m.registrationNumber || 'N/A').join(' | ');
        const totalMembers = team.members.length + 1; // +1 for leader
        const createdDate = new Date(team.createdAt).toLocaleDateString();
        
        csv += `"${event.title}","${team.name}","${team.leader.name}","${team.leader.email}",${totalMembers},"${memberNames}","${memberRegNums}","${createdDate}"\n`;
      });
    });

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    
    link.setAttribute('href', url);
    link.setAttribute('download', `all-group-event-teams-${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  return (
    <div style={{ padding: '1.5rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
        <h1 style={{ margin: 0 }}>Manage Events</h1>
        {Object.keys(teamData).some(eventId => teamData[eventId]?.length > 0) && (
          <button
            onClick={exportAllTeamsCSV}
            style={{
              padding: '0.8rem 1.5rem',
              background: '#FFB703',
              color: '#0B090A',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              fontWeight: 'bold',
              fontSize: '1rem',
            }}
          >
            📥 Export All Teams (CSV)
          </button>
        )}
      </div>

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
          <div>
            <table border="1" cellPadding="8" cellSpacing="0" style={{ width: '100%', marginBottom: '2rem' }}>
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Type</th>
                  <th>Date</th>
                  <th>Venue</th>
                  <th>Teams</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {events.map(event => (
                  <tr key={event.id}>
                    <td>{event.title}</td>
                    <td>{event.isGroupEvent ? '👥 Group' : 'Individual'}</td>
                    <td>{formatDateDDMMYYYY(event.date)}</td>
                    <td>{event.venue}</td>
                    <td style={{ textAlign: 'center' }}>
                      {event.isGroupEvent ? (
                        <span style={{ fontWeight: 'bold', color: '#FFB703' }}>
                          {teamData[event.id]?.length || 0}
                        </span>
                      ) : (
                        '-'
                      )}
                    </td>
                    <td>
                      <Link href={`/admin/events/${event.id}/edit`}>
                        Edit
                      </Link>
                      {' | '}
                      {event.isGroupEvent && (
                        <>
                          <Link href={`/admin/events/${event.id}/teams`}>
                            Teams
                          </Link>
                          {' | '}
                        </>
                      )}
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

            {/* Group Events Teams Summary */}
            {Object.keys(teamData).length > 0 && (
              <div style={{ marginTop: '3rem' }}>
                <h2>Group Event Teams Summary</h2>
                <div style={{ display: 'grid', gap: '1.5rem' }}>
                  {events
                    .filter(event => event.isGroupEvent && teamData[event.id]?.length > 0)
                    .map(event => (
                      <div
                        key={event.id}
                        style={{
                          background: 'rgba(217, 4, 41, 0.05)',
                          border: '1px solid #D90429',
                          borderRadius: '8px',
                          padding: '1.5rem',
                        }}
                      >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                          <h3 style={{ margin: 0, color: '#FFB703' }}>
                            {event.title}
                          </h3>
                          <button
                            onClick={() => setExpandedEvent(expandedEvent === event.id ? null : event.id)}
                            style={{
                              padding: '0.5rem 1rem',
                              background: '#FFB703',
                              color: '#0B090A',
                              border: 'none',
                              borderRadius: '4px',
                              cursor: 'pointer',
                              fontWeight: 'bold',
                            }}
                          >
                            {expandedEvent === event.id ? 'Hide' : 'Show'} Teams ({teamData[event.id]?.length || 0})
                          </button>
                        </div>

                        {expandedEvent === event.id && (
                          <div style={{ marginTop: '1rem' }}>
                            {teamData[event.id] && teamData[event.id].length > 0 ? (
                              <div style={{ display: 'grid', gap: '1rem' }}>
                                {teamData[event.id].map((team, idx) => (
                                  <div
                                    key={team.id}
                                    style={{
                                      background: 'rgba(255, 183, 3, 0.05)',
                                      border: '1px solid rgba(255, 183, 3, 0.3)',
                                      borderRadius: '6px',
                                      padding: '1rem',
                                    }}
                                  >
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                                      <h4 style={{ margin: 0, color: '#FFB703' }}>
                                        {idx + 1}. {team.name}
                                      </h4>
                                      <span style={{ background: 'rgba(255, 183, 3, 0.2)', padding: '0.3rem 0.8rem', borderRadius: '4px', color: '#FFB703', fontSize: '0.85rem' }}>
                                        {team.members.length + 1} members (incl. leader)
                                      </span>
                                    </div>
                                    <p style={{ margin: '0.3rem 0', color: '#B1A7A6', fontSize: '0.9rem' }}>
                                      👤 Leader: <strong>{team.leader.name}</strong> ({team.leader.email})
                                    </p>
                                    <p style={{ margin: '0.3rem 0', color: '#B1A7A6', fontSize: '0.85rem' }}>
                                      Members: {team.members.map(m => `${m.name}${m.registrationNumber ? ' (' + m.registrationNumber + ')' : ''}`).join(', ')}
                                    </p>
                                  </div>
                                ))}
                              </div>
                            ) : (
                              <p style={{ color: '#B1A7A6' }}>No teams registered yet.</p>
                            )}
                          </div>
                        )}
                      </div>
                    ))}
                </div>
              </div>
            )}
          </div>
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
