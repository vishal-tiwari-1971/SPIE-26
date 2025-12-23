'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';

export default function EventLeaderboardPage() {
  const { id: eventId } = useParams();
  
  const [event, setEvent] = useState(null);
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

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

  if (loading) return <p className="muted page-shell">Loading...</p>;
  if (!event) return <p className="muted page-shell">Event not found</p>;

  return (
    <main className="page-shell">
      <section className="section-header" style={{ marginBottom: "1.5rem" }}>
        <div>
          <p className="chip">Leaderboard</p>
          <h2 className="section-title">{event.title}</h2>
          <p className="muted">Top performers for this event.</p>
        </div>
      </section>

      {error && <p className="form-error">{error}</p>}

      {leaderboard.length === 0 ? (
        <p className="muted">No leaderboard entries yet for this event.</p>
      ) : (
        <section className="section">
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid var(--color-border)', backgroundColor: 'var(--color-bg-secondary)' }}>
                  <th style={{ padding: '1rem', textAlign: 'left', fontWeight: 'bold' }}>Rank</th>
                  <th style={{ padding: '1rem', textAlign: 'left', fontWeight: 'bold' }}>Name</th>
                  <th style={{ padding: '1rem', textAlign: 'left', fontWeight: 'bold' }}>Registration Number</th>
                  <th style={{ padding: '1rem', textAlign: 'left', fontWeight: 'bold' }}>Score</th>
                </tr>
              </thead>
              <tbody>
                {leaderboard.map((entry, index) => (
                  <tr 
                    key={entry.id} 
                    style={{ 
                      borderBottom: '1px solid var(--color-border)',
                      backgroundColor: index % 2 === 0 ? 'transparent' : 'var(--color-bg-secondary)'
                    }}
                  >
                    <td style={{ padding: '1rem', fontWeight: 'bold', color: entry.rank === 1 ? 'gold' : entry.rank === 2 ? 'silver' : entry.rank === 3 ? '#CD7F32' : 'inherit' }}>
                      #{entry.rank}
                    </td>
                    <td style={{ padding: '1rem' }}>{entry.name}</td>
                    <td style={{ padding: '1rem' }}>{entry.registrationNumber || '—'}</td>
                    <td style={{ padding: '1rem' }}>{entry.score}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}
    </main>
  );
}
