export default function Bridge() {
  const initiatives = [
    { icon: "🎓", title: "Workshops", count: "20+" },
    { icon: "🏆", title: "Competitions", count: "15+" },
    { icon: "🏭", title: "Industrial Visits", count: "8+" },
    { icon: "💡", title: "Innovation Projects", count: "30+" },
  ];

  return (
    <section className="bridge-section">
      <div className="bridge-container">
        <div className="bridge-header">
          <h2 className="section-title">How We Engage</h2>
          <p className="bridge-description">
            SPIE actively bridges the gap between academic learning and industrial practice through diverse initiatives that empower students to excel.
          </p>
        </div>

        <div className="initiatives-grid">
          {initiatives.map((initiative, idx) => (
            <div key={idx} className="initiative-card">
              <div className="initiative-icon">{initiative.icon}</div>
              <h4>{initiative.title}</h4>
              <div className="initiative-count">{initiative.count}</div>
            </div>
          ))}
        </div>

        <div className="bridge-highlight">
          <div className="highlight-content">
            <h3>Transforming Theory Into Practice</h3>
            <p>
              From cutting-edge technical workshops to real industrial partnerships, SPIE ensures every student gains practical experience and professional skills needed in the modern engineering landscape.
            </p>
            <a href="/events" className="btn-tertiary">Explore All Initiatives →</a>
          </div>
        </div>
      </div>
    </section>
  );
}
