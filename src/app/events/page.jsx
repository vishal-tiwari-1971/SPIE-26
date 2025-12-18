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
    <div style={{ padding: "2rem" }}>
      <h2>Events</h2>

      {events.length === 0 ? (
        <p>No events available yet.</p>
      ) : (
        events.map((event) => (
          <div key={event.id} style={{ marginBottom: "1rem" }}>
            <h3>{event.title}</h3>
            <p>
              {event.description} — {event.venue}
            </p>
            <p>{new Date(event.date).toDateString()}</p>
          </div>
        ))
      )}
    </div>
  );
}
