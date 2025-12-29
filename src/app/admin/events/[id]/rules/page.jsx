'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import RulebookManager from '../../RulebookManager';

export default function EventRulesPage() {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchEvent() {
      try {
        const res = await fetch(`/api/admin/events/${id}`);
        if (res.ok) {
          const data = await res.json();
          setEvent(data);
        }
      } catch (err) {
        console.error('Failed to fetch event:', err);
      } finally {
        setLoading(false);
      }
    }

    if (id) fetchEvent();
  }, [id]);

  if (loading) {
    return (
      <main className="page-shell">
        <p className="muted">Loading...</p>
      </main>
    );
  }

  if (!event) {
    return (
      <main className="page-shell">
        <p className="muted">Event not found.</p>
        <Link href="/admin/events" className="btn secondary">Back to Events</Link>
      </main>
    );
  }

  return (
    <main className="page-shell">
      <section className="hero">
        <p className="chip">Admin</p>
        <h1>Manage Rules: {event.title}</h1>
        <p className="muted">Configure the rulebook for this event.</p>
      </section>

      <section className="section">
        <div style={{ maxWidth: 800, margin: '0 auto' }}>
          <RulebookManager eventId={id} />
          
          <div style={{ marginTop: '2rem', display: 'flex', gap: '0.5rem', justifyContent: 'center' }}>
            <Link href="/admin/events" className="btn secondary">
              Back to Events
            </Link>
            <Link href={`/admin/events/${id}/leaderboard`} className="btn secondary">
              Manage Leaderboard
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
