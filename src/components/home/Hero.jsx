export default function Hero() {
  return (
    <section className="hero-section">
      <div className="hero-content">
        <div className="hero-badge">🚀 Welcome to SPIE 2026</div>
        <h1 className="hero-title">Society of Production & Industrial Engineering</h1>
        <p className="hero-subtitle">
          Bridging Academia & Industry Through Innovation, Excellence, and Leadership
        </p>
        <p className="hero-description">
          The official student society of the PIE Department at NIT Jamshedpur, dedicated to developing technically sound, industry-ready engineers with exceptional leadership and entrepreneurial spirit.
        </p>
        
        <div className="hero-actions">
          <a href="#about" className="btn-primary">
            <span>Explore More</span>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </a>
          <a href="/events" className="btn-secondary">
            Discover Events
          </a>
        </div>

        <div className="hero-stats">
          <div className="stat-item">
            <div className="stat-number">1000+</div>
            <div className="stat-label">Active Members</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">50+</div>
            <div className="stat-label">Annual Events</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">10+</div>
            <div className="stat-label">Years of Excellence</div>
          </div>
        </div>
      </div>
      
      <div className="hero-visual">
        <div className="gradient-orb orb-1"></div>
        <div className="gradient-orb orb-2"></div>
        <div className="hero-illustration">
          <div className="tech-icon">⚙️</div>
        </div>
      </div>
    </section>
  );
}
