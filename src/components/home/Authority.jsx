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

        <div className="vision-mission-combined">
          <div className="vm-header">
            <span className="vm-icon">🎯</span>
            <h3>Our Vision</h3>
            <p>
              To develop technically sound, industry-ready engineers with exceptional
              leadership, ethical values, and innovative mindset.
            </p>
          </div>

          <div className="vm-divider"></div>

          <div className="vm-header">
            <span className="vm-icon">🚀</span>
            <h3>Our Mission</h3>
            <p>
              Foster technical excellence, bridge the gap between academia and industry,
              and cultivate future leaders through experiential learning and professional
              development.
            </p>
          </div>
        </div>


        {/* <div className="missions-grid">
          {missions.map((mission, idx) => (
            <div key={idx} className="mission-item">
              <div className="mission-icon">{mission.icon}</div>
              <h4>{mission.title}</h4>
              <p>{mission.desc}</p>
            </div>
          ))}
        </div> */}

        <div className="testimonials">
          <h3 className="testimonials-title">What They Say</h3>

          <div className="testimonial-row">
            {/* LEFT IMAGE */}
            <div className="testimonial-image">
              <img src="/gallery/leader-image/hod.png" alt="Head of Department" />
            </div>

            {/* RIGHT CONTENT */}
            <div className="testimonial-content">
              <p className="testimonial-text">
                “Welcome to the Society of Production and Industrial Engineering, NIT Jamshedpur,
                where excellence meets innovation. With expert faculty and accomplished alumni,
                we foster cutting-edge research and transformative education.”
              </p>

              <div className="testimonial-author-pill">
                <span className="author-name">Prof. Raj Ballav</span>
                <span className="author-role">Head of Department</span>
              </div>
            </div>
          </div>

          <div className="testimonial-row reverse">
            {/* LEFT CONTENT */}
            <div className="testimonial-content">
              <p className="testimonial-text">
                “Join the Society of Production and Industrial Engineering at NIT Jamshedpur to gain
                skills, industry exposure, and a vibrant community. Engage in events, competitions,
                and activities from B.Tech to Ph.D. levels.”
              </p>

              <div className="testimonial-author-pill">
                <span className="author-name">Dr. Shubham Tripathi</span>
                <span className="author-role">Vice Chairman</span>
              </div>
            </div>

            {/* RIGHT IMAGE */}
            <div className="testimonial-image">
              <img src="/gallery/leader-image/vice-chairman.png" alt="Vice Chairman" />
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
