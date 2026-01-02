export default function Authority() {
  const missions = [
    {
      icon: "🏭",
      title: "Industry-Oriented Exposure",
      desc: "Expose students to real-world industrial challenges through case studies, simulations, and expert-led sessions."
    },
    {
      icon: "📊",
      title: "Analytical & Decision-Making Skills",
      desc: "Strengthen problem-solving, data interpretation, and strategic thinking required in modern production systems."
    },
    {
      icon: "🤝",
      title: "Collaboration & Teamwork",
      desc: "Promote interdisciplinary collaboration and teamwork through competitive and cooperative technical events."
    },
    {
      icon: "🚀",
      title: "Professional Readiness",
      desc: "Prepare students for careers in manufacturing, consulting, analytics, and operations management."
    },
  ];

  return (
    <section id="about" className="authority-section">
      <div className="authority-container">

        {/* HEADER */}
        <div className="authority-header">
          <span className="section-badge">About SPIE</span>
          <h2 className="section-title">Vision, Mission & Purpose</h2>
          <p className="section-description">
            The academic and professional body of the Production & Industrial Engineering Department,
            NIT Jamshedpur, dedicated to technical excellence and industry alignment.
          </p>
        </div>

        {/* VISION & MISSION */}
        <div className="vision-mission-combined">
          <div className="vm-header">
            <span className="vm-icon">🎯</span>
            <h3>Our Vision</h3>
            <p>
              To establish SPIE as a platform that nurtures technically competent,
              industry-ready engineers capable of leading innovation in production,
              operations, and industrial systems.
            </p>
          </div>

          <div className="vm-divider"></div>

          <div className="vm-header">
            <span className="vm-icon">🚀</span>
            <h3>Our Mission</h3>
            <p>
              To bridge academia and industry by organizing technical events,
              workshops, flagship competitions, and professional interactions that
              enhance practical knowledge, leadership skills, and ethical
              engineering practices.
            </p>
          </div>
        </div>

        {/* OPTIONAL MISSIONS GRID (READY IF NEEDED) */}
        {/*
        <div className="missions-grid">
          {missions.map((mission, idx) => (
            <div key={idx} className="mission-item">
              <div className="mission-icon">{mission.icon}</div>
              <h4>{mission.title}</h4>
              <p>{mission.desc}</p>
            </div>
          ))}
        </div>
        */}

        {/* TESTIMONIALS */}
        <div className="testimonials">
          <h3 className="testimonials-title">Faculty Perspectives</h3>

          {/* HOD */}
          <div className="testimonial-row">
            <div className="testimonial-image">
              <img src="/gallery/leader-image/hod.png" alt="Head of Department" />
            </div>

            <div className="testimonial-content">
              <p className="testimonial-text">
                “The Society of Production and Industrial Engineering plays a vital role
                in complementing academic learning with industry exposure. Through Prodyog
                and other initiatives, SPIE encourages students to apply engineering
                principles to practical and societal challenges.”
              </p>

              <div className="testimonial-author-pill">
                <span className="author-name">Prof. Raj Ballav</span>
                <span className="author-role">Head of Department</span>
              </div>
            </div>
          </div>

          {/* VICE CHAIRMAN */}
          <div className="testimonial-row reverse">
            <div className="testimonial-content">
              <p className="testimonial-text">
                “SPIE provides students with opportunities beyond the classroom by
                fostering participation in technical events, competitions, and
                leadership activities. These experiences help students develop
                confidence, clarity, and professional competence.”
              </p>

              <div className="testimonial-author-pill">
                <span className="author-name">Dr. Shubham Tripathi</span>
                <span className="author-role">Vice Chairman</span>
              </div>
            </div>

            <div className="testimonial-image">
              <img
                src="/gallery/leader-image/vice-chairman.png"
                alt="Vice Chairman"
              />
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
