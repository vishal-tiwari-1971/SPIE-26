
"use client";

import { motion } from "framer-motion";

export default function ProdyogPage() {
  return (
    <main className="prodyog-page">

      

      {/* ================= HERO : PRODYOG ================= */}
<section className="prodyog-hero-new">
  <div className="hero-bg-grid"></div>

  <div className="hero-content">
    <span className="hero-pill">
      Flagship Techno-Industrial Initiative of PIE
    </span>

    <h1 className="hero-title">
      <span>P</span><span>R</span><span>O</span><span>D</span><span>Y</span><span>O</span><span>G</span>
    </h1>

    <p className="hero-tagline">
      Where industry meets innovation, and engineers are forged through
      real-world problem solving, systems thinking, and leadership.
    </p>

    <div className="hero-status">
      <span className="dot"></span>
      OPERATION LIVE · SYSTEM CONTROLLED
    </div>
  </div>
</section>



      {/* ================= ABOUT : PRODYOG ================= */}
<section className="about-prodyog">
  <div className="about-wrapper">

    <div className="about-header">
      <span className="about-tag">MISSION BRIEF</span>
      <h2 className="about-title">About Prodyog</h2>
      <div className="about-divider"></div>
    </div>

    <div className="about-content">
      <p className="about-text">
        <strong>PRODYOG</strong> is the flagship techno-industrial initiative of the
        <strong> Production & Industrial Engineering Department, NIT Jamshedpur</strong>.
        It is designed to bridge the gap between academic theory and real-world
        industrial execution through hands-on learning.
      </p>

      <p className="about-text">
        The initiative focuses on building engineers who think in systems, execute
        with precision, and lead with confidence — exactly what modern industry
        demands.
      </p>

      <ul className="about-points">
        <li>Industry-driven problem solving</li>
        <li>Manufacturing & operations exposure</li>
        <li>Leadership & professional skill development</li>
        <li>Innovation backed by systems thinking</li>
      </ul>
    </div>

    <div className="about-status">
      <span className="pulse-dot"></span>
      MISSION STATUS: ACTIVE
    </div>

  </div>
</section>


     
{/* ================= GALLERY : PRODYOG ================= */}

<section className="prodyog-gallery flex flex-col items-center">

  <div className="gallery-header">
    <span className="gallery-tag">OPERATION ARCHIVE</span>
    <h2 className="gallery-title">Gallery</h2>
    <p className="gallery-subtitle">
      Classified surveillance footage from ongoing operations.
    </p>
  </div>

  <div className="gallery-snap-wrapper w-full flex justify-center">
    <div className="gallery-snap-track">

      {[
        "gallery1.jpg",
        "gallery2.jpg",
        "gallery3.jpg",
        "gallery4.jpg",
        "gallery5.jpg",
        "gallery6.jpg",
        "gallery7.jpg",
        "gallery8.jpg",
        "gallery9.jpg",
        "gallery10.jpg",
        "gallery11.jpg",
        "gallery12.jpg",
        "gallery13.jpg",
        "gallery14.jpg",

        /* 🔁 DUPLICATE FOR INFINITE FEEL */
        "gallery1.jpg",
        "gallery2.jpg",
        "gallery3.jpg",
        "gallery4.jpg",
        "gallery5.jpg",
        "gallery6.jpg",
        "gallery7.jpg",
        "gallery8.jpg",
        "gallery9.jpg",
        "gallery10.jpg",
        "gallery11.jpg",
        "gallery12.jpg",
        "gallery13.jpg",
        "gallery14.jpg",


         "gallery1.jpg",
        "gallery2.jpg",
        "gallery3.jpg",
        "gallery4.jpg",
        "gallery5.jpg",
        "gallery6.jpg",
        "gallery7.jpg",
        "gallery8.jpg",
        "gallery9.jpg",
        "gallery10.jpg",
        "gallery11.jpg",
        "gallery12.jpg",
        "gallery13.jpg",
        "gallery14.jpg",


         "gallery1.jpg",
        "gallery2.jpg",
        "gallery3.jpg",
        "gallery4.jpg",
        "gallery5.jpg",
        "gallery6.jpg",
        "gallery7.jpg",
        "gallery8.jpg",
        "gallery9.jpg",
        "gallery10.jpg",
        "gallery11.jpg",
        "gallery12.jpg",
        "gallery13.jpg",
        "gallery14.jpg",

      ].map((img, index) => (
        <div className="gallery-snap-card" key={index}>
          <img src={`/gallery/${img}`} alt="Prodyog Gallery" />

          <div className="snap-overlay">
            <span className="snap-label">
              ACCESS GRANTED · LIVE FEED
            </span>
          </div>

          <span className="laser"></span>
        </div>
      ))}

    </div>
  </div>

  <div className="gallery-hint">
    ← Swipe to browse mission footage →
  </div>

</section>







      
{/* ================= PRODYOG EVENTS ================= */}
<section className="prodyog-events flex flex-col items-center">

  <div className="events-header text-center">
    <span className="events-tag">OPERATION BRIEFING</span>
    <h2 className="events-title">Prodyog Events</h2>
    <p className="events-subtitle">
      Seven high-intensity operations where creativity, logic, leadership, and execution are tested under pressure.
    </p>
  </div>

  <div className="events-container">

    {/* EVENT 1 */}
    <div className="event-card">
      <div className="event-index">01</div>

      <div className="event-content">
        <span className="event-type">TECHNICAL SHOWDOWN</span>
        <h3 className="event-name">Metal Masterpiece</h3>
        <p className="event-desc">
          Where raw metal meets human precision. Metal Masterpiece challenges participants
          to transform basic materials into functional brilliance using machining logic,
          craftsmanship, and accuracy under pressure.
        </p>

        <ul className="event-points">
          <li>Precision-driven execution</li>
          <li>Hands-on industrial thinking</li>
          <li>Craftsmanship under time pressure</li>
        </ul>
      </div>

      <div className="event-image">
  <img
    src="/gallery/metal-masterpiece.jpeg"
    alt="Metal Masterpiece Event"
    className="event-img"
  />
  <span className="event-laser"></span>
</div>

    </div>

    {/* EVENT 2 */}
    <div className="event-card reverse">
      <div className="event-index">02</div>

      <div className="event-content">
        <span className="event-type">QUIZ OPERATION</span>
        <h3 className="event-name">Machina Mystique</h3>
        <p className="event-desc">
          A battle of logic, reasoning, and mechanical intuition.
          Machina Mystique pushes your brain into overdrive as you analyze,
          deduce, and solve complex engineering puzzles.
        </p>

        <ul className="event-points">
          <li>High-pressure analytical rounds</li>
          <li>Mechanical reasoning challenges</li>
          <li>Speed + accuracy combined</li>
        </ul>
      </div>

     <div className="event-image">
  <img
    src="/gallery/machina-mystique.jpeg"
    alt="Machina Mystique Event"
    className="event-img"
  />
  <span className="event-laser"></span>
</div>

    </div>

    {/* EVENT 3 */}
    <div className="event-card">
      <div className="event-index">03</div>

      <div className="event-content">
        <span className="event-type">STRATEGY HEIST</span>
        <h3 className="event-name">Chain Zenith</h3>
        <p className="event-desc">
          Chain Zenith throws you into the chaos of supply chains.
          Solve bottlenecks, manage uncertainty, and take strategic decisions
          where every move impacts the entire system.
        </p>

        <ul className="event-points">
          <li>Real-world supply chain logic</li>
          <li>Decision-making under constraints</li>
          <li>Systems-thinking mastery</li>
        </ul>
      </div>

      <div className="event-image">
  <img
    src="/gallery/chain_zenith.jpeg"
    alt="Chain Zenith Event"
    className="event-img"
  />
  <span className="event-laser"></span>
</div>

    </div>

    {/* EVENT 4 */}
    <div className="event-card reverse">
      <div className="event-index">04</div>

      <div className="event-content">
        <span className="event-type">DATA RAID</span>
        <h3 className="event-name">Data Hackon</h3>
        <p className="event-desc">
          Enter the data vault. Data Hackon challenges teams to extract insights
          from raw information, uncover hidden patterns, and build logic-driven
          solutions using analytical thinking.
        </p>

        <ul className="event-points">
          <li>Data-driven problem solving</li>
          <li>Analytical & logical reasoning</li>
          <li>Insight extraction under pressure</li>
        </ul>
      </div>

     <div className="event-image">
  <img
    src="/gallery/data-hackon.jpeg"
    alt="Data Hackon Event"
    className="event-img"
  />
  <span className="event-laser"></span>
</div>

    </div>

    {/* EVENT 5 */}
    <div className="event-card">
      <div className="event-index">05</div>

      <div className="event-content">
        <span className="event-type">STARTUP HEIST</span>
        <h3 className="event-name">Mini Shark Tank</h3>
        <p className="event-desc">
          Ideas are your weapons. Mini Shark Tank is where innovation,
          business sense, and confidence collide. Pitch bold ideas,
          defend your vision, and think like a future industry leader.
        </p>

        <ul className="event-points">
          <li>Startup & innovation mindset</li>
          <li>Business strategy pitching</li>
          <li>Confidence & clarity testing</li>
        </ul>
      </div>

     <div className="event-image">
  <img
    src="/gallery/mini-shark-tank.jpeg"
    alt="Mini Shark Tank Event"
    className="event-img"
  />
  <span className="event-laser"></span>
</div>

    </div>

    {/* EVENT 6 */}
    <div className="event-card reverse">
      <div className="event-index">06</div>

      <div className="event-content">
        <span className="event-type">VOICE OPERATION</span>
        <h3 className="event-name">Talkathon</h3>
        <p className="event-desc">
          Talkathon is the battlefield of ideas and expression.
          Participants communicate, debate, and present perspectives
          on impactful topics where clarity of thought becomes power.
        </p>

        <ul className="event-points">
          <li>Communication under spotlight</li>
          <li>Critical thinking & articulation</li>
          <li>Confidence-driven expression</li>
        </ul>
      </div>

      <div className="event-image">
  <img
    src="/gallery/talkathon.jpeg"
    alt="Talkathon Event"
    className="event-img"
  />
  <span className="event-laser"></span>
</div>

    </div>


    <div className="event-card">
      <div className="event-index">07</div>

      <div className="event-content">
        <span className="event-type">SIDE OPERATION</span>
        <h3 className="event-name">Fun Events</h3>
        <p className="event-desc">
          A high-energy zone where strategy takes a backseat and spontaneity
          takes control. These events are designed to refresh minds, ignite
          laughter, and bring teams together through interactive games and
          challenges.
        </p>

        <ul className="event-points">
          <li>Team-based interactive games</li>
          <li>Fast-paced & laughter-driven challenges</li>
          <li>Perfect break between intense events</li>
        </ul>
      </div>

      <div className="event-image">
  <img
    src="/gallery/fun-events.jpg"
    alt="Metal Masterpiece Event"
    className="event-img"
  />
  <span className="event-laser"></span>
</div>

    </div>

  </div>
</section>




      {/* ================= STYLES ================= */}
      <style jsx>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        body {
          background: #000;
        }







/* = GLOBAL RESPONSIVE ======= */

@media (max-width: 1024px) {
  .prodyog-page {
    overflow-x: hidden;
  }
}

/*====== HERO ===== */

@media (max-width: 768px) {
  .hero-title {
    font-size: clamp(3.2rem, 12vw, 5rem);
    letter-spacing: 0.12em;
  }

  .hero-tagline {
    font-size: 16px;
    padding: 0 10px;
  }

  .hero-pill {
    font-size: 11px;
    padding: 8px 16px;
  }
}

/* ==== ABOUT ========*/

@media (max-width: 768px) {
  .about-prodyog {
    padding: 100px 16px;
  }

  .about-content {
    padding: 26px 20px;
  }

  .about-title {
    font-size: 2.2rem;
  }

  .about-text {
    font-size: 16px;
  }

  .about-points li {
    font-size: 15px;
  }
}

/* ====== GALLERY ==== */

@media (max-width: 768px) {
  .gallery-snap-track {
    padding: 0 16px;
    gap: 20px;
  }

  .gallery-snap-card {
    flex: 0 0 88vw;
    height: 42vh;
    max-height: 360px;
    border-radius: 20px;
  }

  .gallery-title {
    font-size: 2.4rem;
  }

  .gallery-subtitle {
    font-size: 15px;
    padding: 0 12px;
  }

  .snap-label {
    font-size: 10px;
    letter-spacing: 0.25em;
    padding: 6px 14px;
  }
}

/* ===== EVENTS ===*/

@media (max-width: 1024px) {
  .event-card {
    width: 100%;
    height: auto;
    padding: 50px 40px;
    gap: 40px;
  }
}

@media (max-width: 768px) {
  .events-container {
    gap: 120px;
  }

  .event-card,
  .event-card.reverse {
    flex-direction: column;
    width: 100%;
    padding: 32px 20px;
    gap: 28px;
  }

  .event-index {
    font-size: 72px;
    top: -32px;
  }

  .event-name {
    font-size: 2.4rem;
  }

  .event-type {
    font-size: 12px;
  }

  .event-desc {
    font-size: 16px;
    line-height: 1.7;
    max-width: 100%;
  }

  .event-points li {
    font-size: 15px;
  }

  .event-image {
    width: 100%;
    height: 240px;
    border-radius: 20px;
  }
}

/*  SMALL PHONES */

@media (max-width: 480px) {
  .hero-title {
    font-size: 3rem;
  }

  .gallery-snap-card {
    height: 36vh;
  }

  .event-name {
    font-size: 2rem;
  }
}




        /* ================= PRODYOG HERO ================= */

.prodyog-hero-new {
  position: relative;
  min-height: 100vh;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: radial-gradient(circle at center, #0f172a 0%, #020617 70%);
  overflow: hidden;
}

/* Grid background */
.hero-bg-grid {
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px);
  background-size: 80px 80px;
  opacity: 0.25;
  pointer-events: none;
}

/* Content */
.hero-content {
  position: relative;
  z-index: 2;
  max-width: 1100px;
  padding: 0 20px;
  text-align: center;
}

/* Pill */
.hero-pill {
  display: inline-block;
  margin-bottom: 22px;
  padding: 10px 24px;
  border-radius: 999px;
  font-size: 14px;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: #fecaca;
  background: rgba(220, 38, 38, 0.15);
  border: 1px solid rgba(220, 38, 38, 0.4);
}

/* PRODYOG TITLE */
.hero-title {
  font-size: clamp(4.5rem, 12vw, 9rem);
  font-weight: 900;
  letter-spacing: 0.18em;
  margin: 0;
  line-height: 1;
}

.hero-title span {
  display: inline-block;
  background: linear-gradient(
    135deg,
    #22d3ee,
    #a78bfa,
    #fca5a5,
    #fde68a
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  filter: drop-shadow(0 0 35px rgba(248,113,113,0.6));
  animation: glowPulse 2.8s ease-in-out infinite;
}

@keyframes glowPulse {
  0%, 100% {
    filter: drop-shadow(0 0 25px rgba(248,113,113,0.4));
  }
  50% {
    filter: drop-shadow(0 0 45px rgba(248,113,113,0.9));
  }
}

/* Tagline */
.hero-tagline {
  max-width: 850px;
  margin: 30px auto 0;
  font-size: 20px;
  line-height: 1.7;
  color: #cbd5f5;
}

/* Status */
.hero-status {
  margin-top: 28px;
  font-size: 13px;
  letter-spacing: 0.2em;
  color: #86efac;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
}

.hero-status .dot {
  width: 10px;
  height: 10px;
  background: #22c55e;
  border-radius: 50%;
  box-shadow: 0 0 15px rgba(34,197,94,0.9);
  animation: blink 1.4s infinite;
}

@keyframes blink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.3; }
}

/* MOBILE FIX */
@media (max-width: 640px) {
  .hero-title {
    letter-spacing: 0.12em;
  }

  .hero-tagline {
    font-size: 16px;
  }
}






        .prodyog-page {
          background: radial-gradient(circle at top, #0b0b0b, #000000);
          color: #f5f5f5;
          overflow-x: hidden;
        }

        /* HERO */
        .prodyog-hero {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          text-align: center;
          position: relative;
          padding: 0 20px;
        }

        .hero-overlay {
          position: absolute;
          inset: 0;
          background:
            radial-gradient(circle at center, rgba(220,38,38,0.15), transparent 60%),
            linear-gradient(180deg, rgba(0,0,0,0.7), rgba(0,0,0,1));
          pointer-events: none;
        }

        .prodyog-title {
          font-size: clamp(5rem, 12vw, 10rem);
          font-weight: 900;
          letter-spacing: 0.2em;
          background: linear-gradient(
            90deg,
            #dc2626,
            #ef4444,
            #facc15
          );
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          text-shadow: 0 0 40px rgba(220,38,38,0.4);
          z-index: 1;
        }

        .prodyog-badge {
          margin-top: 30px;
          padding: 14px 30px;
          border-radius: 999px;
          border: 1px solid rgba(220,38,38,0.6);
          font-size: 15px;
          letter-spacing: 0.15em;
          color: #fca5a5;
          z-index: 1;
        }

        .prodyog-tagline {
          max-width: 900px;
          margin-top: 40px;
          font-size: 24px;
          line-height: 1.7;
          color: #e5e7eb;
          z-index: 1;
        }

        /* ABOUT */
        .prodyog-about {
          max-width: 1200px;
          margin: auto;
          padding: 140px 20px;
        }

        .prodyog-about h2 {
          font-size: 56px;
          margin-bottom: 32px;
          background: linear-gradient(90deg, #dc2626, #facc15);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .prodyog-about p {
          font-size: 22px;
          line-height: 1.9;
          margin-bottom: 40px;
          color: #d1d5db;
        }

        .prodyog-about ul li {
          font-size: 22px;
          margin-bottom: 16px;
          color: #fca5a5;
        }









        /* ================= ABOUT : PRODYOG ================= */

.about-prodyog {
  position: relative;
  padding: 140px 20px;
  background: linear-gradient(
    to bottom,
    #020617 0%,
    #030712 100%
  );
  overflow: hidden;
}

/* Subtle red ambient glow */
.about-prodyog::before {
  content: "";
  position: absolute;
  top: -200px;
  left: 50%;
  transform: translateX(-50%);
  width: 700px;
  height: 700px;
  background: radial-gradient(
    circle,
    rgba(220,38,38,0.25),
    transparent 70%
  );
  filter: blur(120px);
  pointer-events: none;
}

.about-wrapper {
  max-width: 1000px;
  margin: auto;
  position: relative;
  z-index: 2;
}

/* Header */
.about-header {
  text-align: center;
  margin-bottom: 50px;
}

.about-tag {
  display: inline-block;
  margin-bottom: 16px;
  padding: 8px 20px;
  font-size: 12px;
  letter-spacing: 0.25em;
  color: #fecaca;
  background: rgba(220,38,38,0.15);
  border: 1px solid rgba(220,38,38,0.4);
  border-radius: 999px;
}

/* Title */
.about-title {
  font-size: clamp(2.8rem, 6vw, 4rem);
  font-weight: 800;
  margin: 0;
  background: linear-gradient(
    135deg,
    #fca5a5,
    #fde68a
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-shadow: 0 0 25px rgba(248,113,113,0.5);
}

/* Divider (laser cut style) */
.about-divider {
  width: 140px;
  height: 3px;
  margin: 24px auto 0;
  background: linear-gradient(
    to right,
    transparent,
    #ef4444,
    transparent
  );
  box-shadow: 0 0 15px rgba(239,68,68,0.9);
}

/* Content box */
.about-content {
  margin-top: 60px;
  padding: 50px;
  background: rgba(2,6,23,0.85);
  border: 1px solid rgba(255,255,255,0.08);
  border-radius: 18px;
  backdrop-filter: blur(10px);
}

/* Text */
.about-text {
  font-size: 18px;
  line-height: 1.8;
  color: #cbd5f5;
  margin-bottom: 22px;
}

/* Bullet points */
.about-points {
  margin-top: 30px;
  list-style: none;
  padding: 0;
}

.about-points li {
  position: relative;
  padding-left: 26px;
  margin-bottom: 14px;
  font-size: 17px;
  color: #e5e7eb;
}

.about-points li::before {
  content: "▸";
  position: absolute;
  left: 0;
  color: #ef4444;
  font-size: 18px;
}

/* Status */
.about-status {
  margin-top: 40px;
  text-align: center;
  font-size: 13px;
  letter-spacing: 0.25em;
  color: #86efac;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
}

.pulse-dot {
  width: 10px;
  height: 10px;
  background: #22c55e;
  border-radius: 50%;
  box-shadow: 0 0 12px rgba(34,197,94,0.9);
  animation: pulse 1.6s infinite;
}

@keyframes pulse {
  0% { transform: scale(1); opacity: 1; }
  50% { transform: scale(1.6); opacity: 0.5; }
  100% { transform: scale(1); opacity: 1; }
}

/* Mobile */
@media (max-width: 640px) {
  .about-content {
    padding: 30px 22px;
  }

  .about-text {
    font-size: 16px;
  }

  .about-points li {
    font-size: 15px;
  }
}





/* ================= PRODYOG GALLERY ================= */

.prodyog-gallery {
  padding: 120px 0 140px;
  background: radial-gradient(circle at top, #020617, #020617);
  position: relative;
  overflow: hidden;
}

/* Red fog ambience */
.prodyog-gallery::before {
  content: "";
  position: absolute;
  top: -220px;
  left: 50%;
  transform: translateX(-50%);
  width: 900px;
  height: 600px;
  background: radial-gradient(
    circle,
    rgba(220,38,38,0.35),
    transparent 70%
  );
  filter: blur(180px);
  pointer-events: none;
}

/* ================= HEADER ================= */

.gallery-header {
  text-align: center;
  margin-bottom: 60px;
}

.gallery-tag {
  display: inline-block;
  padding: 8px 26px;
  font-size: 12px;
  letter-spacing: 0.35em;
  color: #fecaca;
  background: rgba(220,38,38,0.18);
  border: 1px solid rgba(220,38,38,0.55);
  border-radius: 999px;
}

.gallery-title {
  margin-top: 22px;
  font-size: clamp(3.2rem, 6vw, 4.8rem);
  font-weight: 900;
  background: linear-gradient(135deg, #f87171, #fde68a);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-shadow: 0 0 40px rgba(239,68,68,0.7);
}

.gallery-subtitle {
  margin-top: 18px;
  font-size: 18px;
  color: #cbd5f5;
  max-width: 760px;
  margin-inline: auto;
}

/* ================= SNAP SCROLL ================= */

.gallery-snap-wrapper {
  overflow-x: auto;
  overflow-y: hidden;
  scroll-snap-type: x mandatory;
  scrollbar-width: none;
}

.gallery-snap-wrapper::-webkit-scrollbar {
  display: none;
}

.gallery-snap-track {
  display: flex;
  gap: 56px;
  padding: 0 12vw;
  width: max-content; 
}

/* ================= CARD ================= */

.gallery-snap-card {
  scroll-snap-align: center;
  flex: 0 0 62vw;
  max-width: 780px;
  height: 65vh;
  max-height: 520px;

  position: relative;
  border-radius: 26px;
  overflow: hidden;

  background: #020617;

  border: 2px solid rgba(239,68,68,0.6);

  box-shadow:
    0 0 35px rgba(239,68,68,0.45),
    0 0 90px rgba(239,68,68,0.35),
    inset 0 0 50px rgba(0,0,0,0.8);

  transition: transform 0.6s ease, box-shadow 0.6s ease;
}

.gallery-snap-card:hover {
  transform: scale(1.04);
  box-shadow:
    0 0 55px rgba(239,68,68,0.8),
    0 0 120px rgba(239,68,68,0.5),
    inset 0 0 60px rgba(0,0,0,0.85);
}

.gallery-snap-card img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: contrast(1.1) saturate(1.08);
}

/* ================= OVERLAY ================= */

.snap-overlay {
  position: absolute;
  bottom: 30px;
  left: 30px;
  z-index: 4;
}

.snap-label {
  font-size: 12px;
  letter-spacing: 0.35em;
  color: #fecaca;
  background: rgba(0,0,0,0.65);
  padding: 8px 18px;
  border-radius: 999px;
  border: 1px solid rgba(239,68,68,0.45);
}

/* ================= LASER ================= */

.gallery-snap-card .laser {
  position: absolute;
  top: -70%;
  left: -40%;
  width: 220%;
  height: 4px;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(255, 0, 0, 1),
    rgba(255, 120, 120, 0.9),
    rgba(255, 0, 0, 1),
    transparent
  );
  transform: rotate(-12deg);
  animation: laser-scan 4s infinite ease-in-out;
  z-index: 6;
}

@keyframes laser-scan {
  0% {
    transform: translateX(-120%) rotate(-12deg);
    opacity: 0;
  }
  20% {
    opacity: 1;
  }
  100% {
    transform: translateX(120%) rotate(-12deg);
    opacity: 0;
  }
}

/* ================= HINT ================= */

.gallery-hint {
  margin-top: 22px;
  text-align: center;
  font-size: 12px;
  letter-spacing: 0.35em;
  color: #9ca3af;
  opacity: 0.85;
}

/* ================= MOBILE ================= */

@media (max-width: 768px) {
  .gallery-snap-track {
    gap: 24px;
    padding: 0 24px;
  }

  .gallery-snap-card {
    flex: 0 0 85vw;
    height: 45vh;
    border-radius: 22px;
  }

  .snap-overlay {
    bottom: 18px;
    left: 18px;
  }

  .snap-label {
    font-size: 11px;
  }
}



          /* ================= PRODYOG EVENTS ================= */

.prodyog-events {
  padding: 140px 1.5vw;
  background: radial-gradient(circle at top, #020617, #000000);
  position: relative;
   width: 100%;
}

/* red ambient glow */
.prodyog-events::before {
  content: "";
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 1000px;
  height: 600px;
  background: radial-gradient(
    circle,
    rgba(220,38,38,0.25),
    transparent 70%
  );
  filter: blur(160px);
  pointer-events: none;
}

/* Header */
.events-header {
  text-align: center;
  margin-bottom: 90px;
}

.events-tag {
  display: inline-block;
  padding: 10px 26px;
  font-size: 12px;
  letter-spacing: 0.32em;
  color: #fecaca;
  border: 1px solid rgba(220,38,38,0.45);
  background: rgba(220,38,38,0.18);
  border-radius: 999px;
}

.events-title {
  margin-top: 20px;
  font-size: clamp(3.5rem, 7vw, 5rem);
  font-weight: 900;
  background: linear-gradient(135deg, #f87171, #fde68a);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-shadow: 0 0 40px rgba(239,68,68,0.6);
}

.events-subtitle {
  margin-top: 18px;
  font-size: 20px;
  color: #cbd5f5;
  max-width: 800px;
  margin-inline: auto;
}




.events-container {
  width: 100%;
  max-width: 100%;
  margin: 0;
  padding: 0;

  display: flex;
  flex-direction: column;
  gap: 160px;
}




.event-card {
  position: relative;
  display: flex;
  align-items: center;
  gap: 7px;
  height: 60vw;
  width: 90vw;
  max-width: none;      
  margin: 0;            

  padding: 0px 90px;

  border-radius: 36px;
  border: 2px solid rgba(96,165,250,0.45);

  background: linear-gradient(
    145deg,
    rgba(2,6,23,0.96),
    rgba(8,15,40,0.92)
  );

  box-shadow:
    0 0 60px rgba(59,130,246,0.25),
    0 0 160px rgba(37,99,235,0.18);
}



/* Reverse layout */
.event-card.reverse {
  flex-direction: row-reverse;
}

/* Index */
.event-index {
  position: absolute;
  top: -60px;
  left: 0;
  font-size: 140px;
  font-weight: 900;
  color: rgba(255,255,255,0.05);
  pointer-events: none;
}

/* Content */
.event-content {
  flex: 1;
}

.event-type {
  display: inline-block;
  margin-bottom: 16px;
  font-size: 17px;
  letter-spacing: 0.25em;
  color: #fca5a5;
}

.event-name {
  font-size: clamp(4rem, 7vw, 5rem); //2.8rem, 5vw, 3.6rem
  font-weight: 800;
  margin-bottom: 18px;
  color: #f8fafc;
}

.event-desc {
  font-size: 22px;
  line-height: 1.8;
  color: #cbd5f5;
  max-width: 720px;
}

/* Points */
.event-points {
  margin-top: 22px;
  list-style: none;
  padding: 0;
}

.event-points li {
  margin-bottom: 5px;
  position: relative;
  padding-left: 20px;
  color: #e5e7eb;
  
  font-size: 20px;
}

.event-points li::before {
  content: "▸";
  position: absolute;
  left: 0;
  color: #ef4444;
}



.event-image {
  position: relative;
  width: 640px;
  height: 550px;

  border-radius: 28px;
  overflow: hidden;

  border: 2px solid rgba(239,68,68,0.45);
  box-shadow:
    0 0 40px rgba(239,68,68,0.45),
    0 0 90px rgba(239,68,68,0.25);
}


.event-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: contrast(1.05);
}

/* Laser scan */
.event-laser {
  position: absolute;
  top: -120%;
  left: -20%;
  width: 140%;
  height: 10px;
  background: linear-gradient(
    to right,
    transparent,
    rgba(239,68,68,0.95),
    transparent
  );
  transform: rotate(-12deg);
  animation: event-laser 6s infinite ease-in-out;
}

@keyframes event-laser {
  0% { top: -120%; }
  50% { top: 120%; }
  100% { top: 120%; }
}




/* ================= MOBILE FIX : PRODYOG EVENTS ================= */
@media (max-width: 768px) {

  /* Section padding */
  .prodyog-events {
    padding: 90px 4vw;
  }

  /* Event container spacing */
  .events-container {
    gap: 90px;
  }

  
  .event-card,
  .event-card.reverse {
    flex-direction: column;
    width: 100%;
    height: auto;

    padding: 28px 20px;
    gap: 26px;

    margin: 0 auto;
    border-radius: 26px;
  }

  /* REMOVE DESKTOP HEIGHT LOGIC */
  .event-card {
    height: auto;
  }

  /* EVENT IMAGE — MOBILE FRIENDLY */
  .event-image {
    width: 100%;
    height: 220px;
    border-radius: 20px;
  }

  .event-image img {
    object-fit: cover;
  }

  /* TEXT BLOCK */
  .event-content {
    width: 100%;
    text-align: left;
  }

  .event-type {
    font-size: 12px;
    letter-spacing: 0.28em;
  }

  .event-name {
    font-size: 2.1rem;
    line-height: 1.2;
  }

  .event-desc {
    font-size: 15.5px;
    line-height: 1.65;
    max-width: 100%;
  }

  /* POINTS */
  .event-points li {
    font-size: 15px;
  }

  /* BIG INDEX — SOFT & SAFE */
  .event-index {
    font-size: 70px;
    top: -30px;
    left: 12px;
  }

  /* LASER — SLOWER ON MOBILE */
  .event-laser {
    height: 6px;
    animation-duration: 8s;
  }
}









          

          .prodyog-title {
            letter-spacing: 0.1em;
          }
        }
      `}</style>
    </main>
  );
}

