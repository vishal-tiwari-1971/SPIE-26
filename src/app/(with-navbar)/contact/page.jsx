'use client';

export default function ContactPage() {
  return (
    <main className="page-shell tech-grid">
      <div className="confidential-banner">
        ▸ CLASSIFIED OPERATION ▸ AUTHORIZED PERSONNEL ONLY ▸
      </div>
{/* 
      <section className="section-header" style={{ marginBottom: "1.5rem", marginTop: "1.5rem" }}>
        <div>
          <p className="chip" style={{ backgroundColor: '#D90429', color: '#0B090A', fontWeight: 'bold' }}>CONTACT US</p>
          <h2 className="section-title" style={{ fontFamily: 'Bebas Neue, sans-serif', color: '#FFB703' }}>Get in Touch</h2>
          <p className="muted" style={{ maxWidth: "640px", fontFamily: 'Courier Prime, monospace' }}>
            Reach out to our team for any questions or inquiries about SPIE NIT Jamshedpur.
          </p>
        </div>
      </section> */}

      <section className="contact-section">
        <div className="contact-box">
          <div className="contact-person">
            <h3 className="contact-name">President</h3>
            <p className="contact-info">
              <span className="contact-icon">👤</span>
              Name: Abhishek Bhoutkar
            </p>
            <p className="contact-info">
              <span className="contact-icon">✉️</span>
              Email: 2022ugpi037@nitjsr.ac.in
            </p>
            <p className="contact-info">
              <span className="contact-icon">📞</span>
              Phone: +91 8434818576
            </p>
          </div>
        </div>

         <div className="contact-box">
          <div className="contact-person">
            <h3 className="contact-name">General Secretary</h3>
            <p className="contact-info">
              <span className="contact-icon">👤</span>
              Name: Mavuri Gowri Prasanna
            </p>
            <p className="contact-info">
              <span className="contact-icon">✉️</span>
              Email: mavurigp@gmail.com
            </p>
            <p className="contact-info">
              <span className="contact-icon">📞</span>
              Phone: +91  9182306921
            </p>
          </div>
        </div>

         <div className="contact-box">
          <div className="contact-person">
            <h3 className="contact-name">General Secretary</h3>
            <p className="contact-info">
              <span className="contact-icon">👤</span>
              Name: Athrav Pratap Singh
            </p>
            <p className="contact-info">
              <span className="contact-icon">✉️</span>
              Email: 2022ugpi055@nitjsr.ac.in
            </p>
            <p className="contact-info">
              <span className="contact-icon">📞</span>
              Phone: +91 9532271235
            </p>
          </div>
        </div>

        <div className="contact-box">
          <div className="contact-person">
            <h3 className="contact-name">Treasurer</h3>
            <p className="contact-info">
              <span className="contact-icon">👤</span>
              Name: Ankit Oraon
            </p>
            <p className="contact-info">
              <span className="contact-icon">✉️</span>
              Email: ankitoraon75419608@gmail.com
            </p>
            <p className="contact-info">
              <span className="contact-icon">📞</span>
              Phone: +91 6203281703
            </p>
          </div>
        </div>
      </section>


      <section className="links-section">
        <div className="contact-box">
          <div className="link-item">
            <h3 className="link-title">
              <span className="link-icon">🌐</span>
              Website
            </h3>
            <a href="https://www.spienitjsr.in" target="_blank" rel="noopener noreferrer" className="link-url">
              https://www.spienitjsr.in
            </a>
          </div>
        </div>

        <div className="contact-box">
          <div className="link-item">
            <h3 className="link-title">
              <span className="link-icon">✉️</span>
              Email
            </h3>
            <a href="mailto:spie@nitjsr.ac.in" className="link-url">
              spie@nitjsr.ac.in
            </a>
          </div>
        </div>

        <div className="contact-box">
          <div className="link-item">
            <h3 className="link-title">
              <span className="link-icon">📷</span>
              Instagram
            </h3>
            <a href="https://www.instagram.com/prodyog_nitjsr/" target="_blank" rel="noopener noreferrer" className="link-url">
              @prodyog_nitjsr
            </a>
          </div>
        </div>

        <div className="contact-box">
          <div className="link-item">
            <h3 className="link-title">
              <span className="link-icon">📘</span>
              Facebook
            </h3>
            <a href="https://facebook.com/spie.nitjsr" target="_blank" rel="noopener noreferrer" className="link-url">
              SPIE NIT Jamshedpur
            </a>
          </div>
        </div>
      </section>

      <section className="additional-info">
        <h3 className="info-title">Additional Information</h3>
        <p className="muted">
          For any urgent matters or detailed inquiries, please contact us through the above channels.
        </p>
      </section>
    </main>
  );
}