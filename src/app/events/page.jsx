export default function EventsPage() {
  const events = [
    {
      id: 1,
      title: "Sample Event A",
      description: "Short description of the event.",
      venue: "Main Hall",
      date: "2025-12-25",
    },
    {
      id: 2,
      title: "Sample Event B",
      description: "Another example event to show the layout.",
      venue: "Conference Room 2",
      date: "2026-01-05",
    },
  ];

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

      {events.length === 0 ? (
        <p className="muted">No events available yet.</p>
      ) : (
        <div className="card-grid">
          {events.map((event) => (
            <article key={event.id} className="card">
              <div className="chip" style={{ marginBottom: "0.6rem" }}>
                {new Date(event.date).toDateString()}
              </div>
              <h3 style={{ margin: "0 0 0.4rem 0" }}>{event.title}</h3>
              <p className="muted" style={{ margin: "0 0 0.8rem 0" }}>
                {event.description}
              </p>
              <div className="muted">Venue: {event.venue}</div>
            </article>
          ))}
        </div>
      )}
    </main>
  );
}
