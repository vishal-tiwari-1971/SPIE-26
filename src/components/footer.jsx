import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer-modern">
      <div className="footer-gradient"></div>
      
      <div className="footer-container">
        {/* FOOTER TOP */}
        <div className="footer-top">
          <div className="footer-brand">
            <div className="brand-logo">
              <img src="/logo.png" alt="SPIE Logo" className="logo-img" />
            </div>
            <div className="brand-info">
              <h3 className="brand-title">SPIE</h3>
              <p className="brand-subtitle">
                Society of Production & Industrial Engineering<br />
                NIT Jamshedpur
              </p>
              <p className="brand-description">
                Empowering engineers through innovation, excellence, and professional growth.
              </p>
            </div>
          </div>

          <div className="footer-links-grid">
            {/* EXPLORE */}
            <div className="footer-column">
              <h4 className="footer-title">Explore</h4>
              <ul className="footer-links">
                <li>
                  <Link href="/about" className="footer-link">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="/team" className="footer-link">
                    Team
                  </Link>
                </li>
                <li>
                  <Link href="/events" className="footer-link">
                    Events
                  </Link>
                </li>
              </ul>
            </div>

            {/* EVENTS */}
            <div className="footer-column">
              <h4 className="footer-title">Events</h4>
              <ul className="footer-links">
                <li>
                  <Link href="/prodyog" className="footer-link">
                    PRODYOG 2026
                  </Link>
                </li>
                <li>
                  <Link href="/gallery" className="footer-link">
                    Gallery
                  </Link>
                </li>
                <li>
                  <Link href="/blog" className="footer-link">
                    Blog
                  </Link>
                </li>
              </ul>
            </div>

            {/* LEGAL */}
            <div className="footer-column">
              <h4 className="footer-title">Legal</h4>
              <ul className="footer-links">
                <li>
                  <Link href="/privacy" className="footer-link">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="footer-link">
                    Terms & Conditions
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="footer-link">
                    Contact Us
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* FOOTER DIVIDER */}
        <div className="footer-divider" />

        {/* FOOTER BOTTOM */}
        <div className="footer-bottom">
          <div className="footer-copyright">
            <p>
              © {currentYear} <span className="brand-highlight">SPIE™</span>, NIT Jamshedpur. All rights reserved.
            </p>
          </div>

          {/* SOCIAL ICONS */}
          <div className="footer-socials">
            <a
              href="https://www.facebook.com/prodyog24/"
              target="_blank"
              rel="noopener noreferrer"
              title="Follow us on Facebook"
            >
              <img
                src="/icons/facebook.svg"
                alt="Facebook"
              />
            </a>

            <a
              href="https://www.instagram.com/prodyog_nitjsr/"
              target="_blank"
              rel="noopener noreferrer"
              title="Follow us on Instagram"
            >
              <img
                src="/icons/instagram.svg"
                alt="Instagram"
              />
            </a>

            <a
              href="https://www.linkedin.com/company/society-of-production-and-industrial-engineering-nit-jamshedpur"
              target="_blank"
              rel="noopener noreferrer"
              title="Connect with us on LinkedIn"
            >
              <img
                src="/icons/linkedin.svg"
                alt="LinkedIn"
              />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
