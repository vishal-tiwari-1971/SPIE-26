export default function Gallery() {
  return (
    <section id="gallery" className="gallery-section">
      <div className="gallery-container">
        <div className="gallery-header">
          <span className="section-badge">Our Community</span>
          <h2 className="section-title">Student Activities & Memories</h2>
          <p className="gallery-description">
            Capturing moments of innovation, collaboration, and excellence from our vibrant community
          </p>
        </div>

        <div className="gallery-grid">
          {/* Placeholder for images - will be populated with actual images */}
          <div className="gallery-item placeholder">
            <div className="placeholder-content">
              <div className="placeholder-icon">📸</div>
              <p>Workshop Highlights</p>
            </div>
          </div>
          <div className="gallery-item placeholder">
            <div className="placeholder-content">
              <div className="placeholder-icon">🏆</div>
              <p>Competition Moments</p>
            </div>
          </div>
          <div className="gallery-item placeholder">
            <div className="placeholder-content">
              <div className="placeholder-icon">👥</div>
              <p>Team Activities</p>
            </div>
          </div>
          <div className="gallery-item placeholder">
            <div className="placeholder-content">
              <div className="placeholder-icon">🚀</div>
              <p>Project Showcases</p>
            </div>
          </div>
          <div className="gallery-item placeholder">
            <div className="placeholder-content">
              <div className="placeholder-icon">🎓</div>
              <p>Learning Sessions</p>
            </div>
          </div>
          <div className="gallery-item placeholder">
            <div className="placeholder-content">
              <div className="placeholder-icon">⭐</div>
              <p>Success Stories</p>
            </div>
          </div>
        </div>

        <div className="gallery-footer">
          <a href="/gallery" className="btn-secondary">
            View Full Gallery →
          </a>
        </div>
      </div>
    </section>
  );
}
