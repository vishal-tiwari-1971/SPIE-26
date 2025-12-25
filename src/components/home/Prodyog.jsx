export default function Prodyog() {
  return (
    <section id="prodyog" className="prodyog-section">
      <div className="prodyog-container">
        <div className="prodyog-header">
          <div className="prodyog-badge">🎉 Flagship Event</div>
          <h2 className="prodyog-title">PRODYOG 2026</h2>
          <p className="prodyog-subtitle">The Ultimate Technical Fest Experience</p>
        </div>

        <div className="prodyog-content">
          <div className="prodyog-info">
            <div className="info-section">
              <h3>Annual Technical Fest of SPIE</h3>
              <p>
                Organised by the Society of Production & Industrial Engineering, NIT Jamshedpur, PRODYOG is the premier platform where innovation meets competition, ideas transform into reality, and students showcase their technical excellence.
              </p>
            </div>

            <div className="info-section">
              <h3>What Awaits You</h3>
              <ul className="prodyog-features">
                <li>🏆 Challenging technical competitions</li>
                <li>💼 Industry mentorship and networking</li>
                <li>🎓 Expert-led workshops and panels</li>
                <li>🚀 Innovation showcase platform</li>
              </ul>
            </div>

            <div className="prodyog-actions">
              <a href="/prodyog" className="btn-primary">
                <span>Explore PRODYOG</span>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </a>
              <a href="/brochure.pdf" className="btn-secondary">
                📄 Download Brochure
              </a>
            </div>
          </div>

          <div className="prodyog-visual">
            <div className="gradient-orb orb-3"></div>
            <div className="prodyog-illustration">
              <div className="fest-icon">🎪</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
