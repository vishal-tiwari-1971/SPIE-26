export default function HomePage() {
  const highlights = [
    "Flagship tech symposium of 2026",
    "Workshops, panels, and student showcases",
    "Built for innovators, designers, and researchers",
  ];

  return (
    <main className="page-shell">
      <section className="hero">
        <p className="chip">Welcome to SPIE 2026</p>
        <h1>Innovate, collaborate, and build what is next.</h1>
        <p>
          A modern branch fest festival experience featuring hands-on labs, speaker sessions,
          and community showcases. Find your team, submit projects, and explore what our branch is
          creating.
        </p>

        <div className="stat-row">
          <div className="stat">
            <div className="value">30+</div>
            <div className="label">Events & Workshops</div>
          </div>
          <div className="stat">
            <div className="value">15</div>
            <div className="label">Sponsors</div>
          </div>
          <div className="stat">
            <div className="value">2k+</div>
            <div className="label">Expected Attendees</div>
          </div>
        </div>

        <div className="pill-row" style={{ marginTop: "1.25rem" }}>
          <a className="btn primary" href="/events">
            View Events
          </a>
          <a className="btn secondary" href="/team">
            Meet the Team
          </a>
        </div>
      </section>

      <section className="section">
        <div className="section-header">
          <div>
            <p className="subtitle">Why join</p>
            <h2 className="section-title">Experience the SPIE advantage</h2>
          </div>
        </div>

        <div className="card-grid">
          {highlights.map((text, index) => (
            <div key={index} className="card list-item">
              <span className="list-accent" />
              <span>{text}</span>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
