import Image from "next/image";

export default function Prodyog() {
  return (
    <section id="prodyog" className="prodyog-section">
      <div className="prodyog-container">
        <div className="prodyog-header">
          
          <h2 className="prodyog-title prody"
          style={{
      fontSize: "clamp(3rem, 8vw, 6.5rem)",
      background: "linear-gradient(135deg, #fca5a5, #fde68a)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      textShadow: "0 0 25px rgba(248,113,113,0.5)",
    }} >PRODYOG 2026</h2>
          <p className="prodyog-subtitle">9th Jan - 11th Jan</p>
          {/* <p className="prodyog-subtitle">The Ultimate Technical Fest of SPIE</p> */}
            <h3 className="prodyog-tagline">Annual Technical Fest of Production and Industrial Engineering Department</h3>
          <div className="prodyog-hero-image">
            <Image
              src="/gallery/prodyog-25/IMG_1194.JPG"
              alt="Prodyog 2026 Hero"
              width={1000}
              height={600}
            />
          </div>
          <div className="prodyog-hero-buttons">
            <a href="/brochure/Prodyog-2026-Brochure.pdf"
  download
   className="btn-secondary download-btn">
              📄 Download Brochure
            </a>
            <a href="/prodyog" className="btn-primary">
              <span>Explore Prodyog</span>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </a>
          </div>
        </div>

        <div className="prodyog-content">
          {/* <div className="prodyog-info">
            <div className="info-section">
              <h3>Annual Technical Fest of SPIE</h3>
              
            </div>

            

          </div> */}

          {/* <div className="prodyog-visual">
            <div className="gradient-orb orb-3"></div>
            <div className="prodyog-illustration">
              
            </div>
          </div> */}
        </div>
      </div>
    </section>
  );
}






