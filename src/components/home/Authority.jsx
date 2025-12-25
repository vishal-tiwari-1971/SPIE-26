export default function Authority() {
  const missions = [
    { icon: "🌈", title: "Bridge Academia & Industry", desc: "Connect theoretical knowledge with real-world applications" },
    { icon: "🛠️", title: "Hands-On Learning", desc: "Practical experience through workshops and competitions" },
    { icon: "👥", title: "Leadership Development", desc: "Build professional skills and entrepreneurial mindset" },
    { icon: "💡", title: "Innovation Focus", desc: "Foster creative thinking and problem-solving approach" },
  ];

  return (
    <section id="about" className="authority-section">
      <div className="authority-container">
        <div className="authority-header">
          <span className="section-badge">About SPIE</span>
          <h2 className="section-title">Our Vision & Mission</h2>
          <p className="section-description">
            Empowering the next generation of engineers through innovation, collaboration, and excellence
          </p>
        </div>

        <div className="vision-mission-grid">
          <div className="vision-card">
            <div className="card-icon">🎯</div>
            <h3>Our Vision</h3>
            <p>
              To develop technically sound, industry-ready engineers with exceptional leadership, ethical values, and innovative mindset.
            </p>
          </div>

          <div className="mission-card">
            <div className="card-icon">🚀</div>
            <h3>Our Mission</h3>
            <p>
              Foster technical excellence, bridge the gap between academia and industry, and cultivate future leaders through experiential learning and professional development.
            </p>
          </div>
        </div>

        <div className="missions-grid">
          {missions.map((mission, idx) => (
            <div key={idx} className="mission-item">
              <div className="mission-icon">{mission.icon}</div>
              <h4>{mission.title}</h4>
              <p>{mission.desc}</p>
            </div>
          ))}
        </div>

        <div className="testimonials">
          <h3 className="testimonials-title">What They Say</h3>
          <div className="testimonials-grid">
            <div className="testimonial-card">
              <div className="testimonial-quote">"</div>
              <p className="testimonial-text">
                SPIE plays a critical role in strengthening the academic and professional ecosystem of the PIE department.
              </p>
              <div className="testimonial-author">— Head of Department, PIE</div>
            </div>

            <div className="testimonial-card">
              <div className="testimonial-quote">"</div>
              <p className="testimonial-text">
                Our objective is to build competence, character, and contribution in every engineer we nurture.
              </p>
              <div className="testimonial-author">— Faculty In-Charge, SPIE</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
