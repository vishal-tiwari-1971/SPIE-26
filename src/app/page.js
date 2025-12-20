import Link from "next/link";

export default function LandingPage() {
  return (
    <main className="landing-full">
      <div className="landing-video" aria-hidden="true">
        <video
          className="landing-video-el"
          autoPlay
          muted
          loop
          playsInline
          poster="/media/landing-poster.jpg"
        >
          <source src="https://video-previews.elements.envatousercontent.com/d3391191-35a4-441b-9fd6-3688f45197ed/watermarked_preview/watermarked_preview.mp4" type="video/mp4" />
        </video>
        <div className="video-overlay" />
      </div>

      <div className="landing-content">
         <div className="page-shell">
         {/* <section className="landing-hero"> */}
            {/* <div className="hero-grid"> */}
              {/* <div className="hero-copy">
                <p className="chip">Welcome to SPIE 2026</p>
                <h1>Innovate, collaborate, and build what is next.</h1>
                <p>
                  A modern branch fest experience featuring labs, speaker sessions, and community
                  showcases. Start here, then jump into the full site.
                </p>

                <div className="pill-row" style={{ marginTop: "1.25rem" }}>
                  <Link className="btn primary" href="/home">
                    Explore the site
                  </Link>
                  <Link className="btn secondary" href="/events">
                    View Events
                  </Link>
                </div>

                <div className="stat-row">
                  <div className="stat">
                    <div className="value">30+</div>
                    <div className="label">Events & Workshops</div>
                  </div>
                  <div className="stat">
                    <div className="value">15</div>
                    <div className="label">Sponsors</div>
                  </div>
                  <div className="stat">
                    <div className="value">2k+</div>
                    <div className="label">Expected Attendees</div>
                  </div>
                </div>
              </div> */}

              {/* <div className="hero-panel">
                <div className="panel-badge">Edition 2026</div>
                <p className="hero-panel-title">Your entry point to SPIE.</p>
                <ul className="hero-list">
                  <li>Preview the highlights</li>
                  <li>Meet the team and speakers</li>
                  <li>Jump into the full schedule</li>
                </ul>
              </div> */}
            {/* </div> */}

            <Link className="explore-btn" href="/home" aria-label="Go to the home page">
              Explore
              <span className="right-arrow">→</span>
            </Link>
          {/* </section>*/}
        </div> 
      </div>
    </main>
  );
}
