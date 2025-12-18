export default function TeamPage() {
  const team = [
    {
      id: 1,
      title: "SUPER CORE",
      description: "Short description of the event.",
    },
    {
      id: 2,
      title: "JOINT CORE",
      description: "Another example event to show the layout.",
      
    },
  ];

  return (
    <main className="page-shell">
      <section className="section-header" style={{ marginBottom: "1.5rem" }}>
        <div>
          <p className="chip">Team</p>
          <h2 className="section-title">Meet the crew behind SPIE 2026</h2>
          <p className="muted" style={{ maxWidth: "640px" }}>
            Student leaders, coordinators, and partners working together to bring the festival to life.
          </p>
        </div>
      </section>

      {team.length === 0 ? (
        <p className="muted">No team available yet.</p>
      ) : (
        <div className="card-grid">
          {team.map((member) => (
            <article key={member.id} className="card">
              <h3 style={{ margin: "0 0 0.4rem 0" }}>{member.title}</h3>
              <p className="muted" style={{ margin: 0 }}>{member.description}</p>
            </article>
          ))}
        </div>
      )}
    </main>
  );
}
