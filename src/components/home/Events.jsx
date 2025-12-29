export default function Events() {
  const events = [
    {
      icon: "📦",
      title: "Chain-Zenith",
      desc: "An immersive supply-chain case study competition tailored for students interested in logistics, operations, and consultancy.",
      category: "Competition",
    },
    {
      icon: "🔧",
      title: "Metal Masterpiece",
      desc: "An exciting competition bringing together students passionate about machining, design, and precision craftsmanship.",
      category: "Competition",
    },
    {
      icon: "🎨",
      title: "Pratyush",
      desc: "Showcase optimal industrial design solutions using CATIA V5 software and creative thinking.",
      category: "Design",
    },
    {
      icon: "🧠",
      title: "Machina Mystique",
      desc: "A quiz-based challenge designed to assess participants' mechanical reasoning and problem-solving skills.",
      category: "Quiz",
    },
    {
      icon: "💼",
      title: "Mini Shark Tank",
      desc: "A dynamic platform for students to pitch and showcase entrepreneurial thinking and innovative business ideas.",
      category: "Innovation",
    },
    {
      icon: "📊",
      title: "DataHackon",
      desc: "Build strong foundations in data analytics and data science through hands-on challenges and expert guidance.",
      category: "Analytics",
    },
  ];

  return (
    <section id="events" className="events-section">
      <div className="events-container">
        <div className="events-header">
          <span className="section-badge">Featured Events</span>
          <h2 className="section-title">Major Events of PRODYOG</h2>
          <p className="events-description">
            Diverse competitions and workshops designed to challenge, inspire, and develop the next generation of engineers
          </p>
        </div>

        <div className="events-grid">
          {events.map((event, idx) => (
            <div key={idx} className="event-card">
              {/* <div className="event-header">
                <div className="event-icon">{event.icon}</div>
                <span className="event-category">{event.category}</span>
              </div> */}
              <h3 className="event-title">{event.title}</h3>
              <p className="event-description">{event.desc}</p>
              {/* <div className="event-footer">
                <a href="/events" className="event-link">Learn More →</a>
              </div> */}
            </div>
          ))}
        </div>

        <div className="events-footer">
          <a href="/events" className="btn-primary btn-large">
            <span>Explore All Events</span>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
