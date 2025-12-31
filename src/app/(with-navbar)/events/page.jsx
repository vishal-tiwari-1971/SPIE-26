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
    <main className="page-shell tech-grid">
      <div className="confidential-banner">
        ▸ CLASSIFIED OPERATION ▸ AUTHORIZED PERSONNEL ONLY ▸
      </div>
      
      <section className="section-header" style={{ marginBottom: "1.5rem", marginTop: "1.5rem" }}>
        <div>
          <p className="chip" style={{ backgroundColor: '#D90429', color: '#0B090A', fontWeight: 'bold' }}>TARGET DOSSIERS</p>
          <h2 className="section-title" style={{ fontFamily: 'Bebas Neue, sans-serif', color: '#FFB703' }}>Operation Prodyog26: Mission Objectives</h2>
          <p className="muted" style={{ maxWidth: "640px", fontFamily: 'Courier Prime, monospace' }}>
            Classified intelligence on upcoming infiltration operations, tactical workshops, and strategic briefings. Each target represents a high-value opportunity.
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
            <article key={event.id} className="card dossier-card">
              {/* Stamp based on status */}
              {event.status === 'ONGOING' && (
                <div className="stamp stamp-infiltration">INFILTRATION</div>
              )}
              {event.status === 'COMPLETED' && (
                <div className="stamp stamp-acquired">TARGET ACQUIRED</div>
              )}
              {event.status === 'UPCOMING' && (
                <div className="stamp stamp-classified">CLASSIFIED</div>
              )}
              
              <div className="dossier-header">
                TARGET FILE #{event.id.toString().padStart(4, '0')}
              </div>
              
              {event.image && (
                <div style={{ marginBottom: '0.8rem', overflow: 'hidden', borderRadius: 4, border: '1px solid #D90429' }}>
                  <img 
                    src={event.image} 
                    alt={event.title} 
                    style={{ width: '100%', height: 200, objectFit: 'cover', filter: 'grayscale(50%) contrast(1.2)' }} 
                  />
                </div>
              )}
              <div style={{ display: "flex", gap: "0.5rem", marginBottom: "0.6rem" }}>
                <div className="chip" style={{ 
                  backgroundColor: '#D90429',
                  color: '#0B090A',
                  fontWeight: 'bold'
                }}>
                  {formatDateDDMMYYYY(event.date)}
                </div>
                <div className="chip" style={{ 
                  backgroundColor: event.status === 'UPCOMING' ? '#666' : event.status === 'ONGOING' ? '#D90429' : '#FFB703',
                  color: '#0B090A',
                  fontWeight: 'bold'
                }}>
                  {event.status}
                </div>
              </div>
              <h3 style={{ margin: "0 0 0.4rem 0", fontFamily: 'Bebas Neue, sans-serif', letterSpacing: '0.08em', color: '#FFB703' }}>{event.title}</h3>
              <p className="muted" style={{ margin: "0 0 0.8rem 0", fontFamily: 'Courier Prime, monospace' }}>
                {event.description}
              </p>
              <div className="muted" style={{ fontFamily: 'Courier Prime, monospace' }}>LOCATION: {event.venue}</div>
              <div className="pill-row" style={{ marginTop: "0.8rem", justifyContent: "center" }}>
                <a className="btn primary" href={`/events/${event.id}`}>Details</a>
              </div>
            </article>
          ))}
        </div>
      )}
    </main>
  );
}
