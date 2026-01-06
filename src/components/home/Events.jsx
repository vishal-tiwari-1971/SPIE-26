// export default function Events() {
//   const events = [
//     {
//       icon: "📦",
//       title: "Chain Zenith",
//       desc: "A flagship supply chain management event exploring real-world logistics challenges. Engage with strategic problem-solving, industry-inspired case studies, and decision-making under constraints.",
//       category: "Competition",
//     },
//     {
//       icon: "📊",
//       title: "DataHackon",
//       desc: "A data analytics challenge where participants dive into data-driven problem solving, uncover insights, and apply analytical techniques inspired by real industry use cases.",
//       category: "Analytics",
//     },
//     {
//       icon: "🗣️",
//       title: "Talkathon",
//       desc: "A group discussion event designed to enhance communication skills, articulation, clarity of thought, and collaborative reasoning through structured discussions.",
//       category: "Discussion",
//     },
//     {
//       icon: "🧩",
//       title: "CATIA & 3D Modelling",
//       desc: "A hands-on workshop and design challenge where participants create innovative models using CATIA and 3D printing concepts under defined constraints.",
//       category: "Design",
//     },
//     {
//       icon: "🎮",
//       title: "Cyber Rush",
//       desc: "An adrenaline-fueled BGMI campus championship where strategy, teamwork, and quick decision-making define the ultimate gaming showdown.",
//       category: "Gaming",
//     },
//     {
//       icon: "⚙️",
//       title: "Machina Mystique",
//       desc: "A multi-stage mechanical challenge starting with core concept workshops, followed by quizzes and hands-on model building to transform theory into reality.",
//       category: "Mechanical",
//     },
//     {
//       icon: "💰",
//       title: "Wealth Wise",
//       desc: "A financial literacy workshop focused on budgeting, investing, and money management, aimed at building long-term financial awareness and decision-making skills.",
//       category: "Finance",
//     },
    
//     {
//       icon: "💼",
//       title: "Mini Shark Tank",
//       desc: "A high-impact pitching competition where teams validate business ideas with functional prototypes and present them to a panel, simulating real startup environments.",
//       category: "Entrepreneurship",
//     },
//     {
//       icon: "🔩",
//       title: "Metal Masterpiece",
//       desc: "A lathe design challenge testing creativity, precision, and craftsmanship—where participants turn raw ideas into finely engineered metal solutions.",
//       category: "Manufacturing",
//     },
//   ];

//   return (
//     <section id="events" className="events-section">
//       <div className="events-container">
//         <div className="events-header">
//           <span className="section-badge">Featured Events</span>
//           <h2 className="section-title">Major Events of PRODYOG</h2>
//           <p className="events-description">
//             A diverse lineup of technical, analytical, entrepreneurial, and fun events designed to challenge minds, build skills, and foster innovation.
//           </p>
//         </div>

//         <div className="events-grid">
//           {events.map((event, idx) => (
//             <div key={idx} className="event-card">
//               <h3 className="event-title">{event.title}</h3>
//               <p className="event-description">{event.desc}</p>
//             </div>
//           ))}
//         </div>

//         <div className="events-footer">
//           <a href="/events" className="btn-primary btn-large">
//             <span>Explore All Events</span>
//             <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//               <path d="M5 12h14M12 5l7 7-7 7" />
//             </svg>
//           </a>
//         </div>
//       </div>
//     </section>
//   );
// }


"use client";

export default function Events() {
  const events = [
    {
      code: "OP-01",
      title: "CHAIN ZENITH",
      line: "Supply Chain Breakdown Simulation",
      desc: "A high-pressure operational case file simulating real-world logistics collapse, resource constraints, and executive-level decision making.",
    },
    {
      code: "OP-02",
      title: "DATAHACKON",
      line: "Industrial Intelligence Analysis",
      desc: "Participants interrogate raw datasets, extract signals, and build insight-backed narratives inspired by real industry analytics.",
    },
    {
      code: "OP-03",
      title: "TALKATHON",
      line: "Communication & Influence Protocol",
      desc: "A controlled discussion chamber testing articulation, persuasion, clarity of thought, and strategic argument building.",
    },
    {
      code: "OP-04",
      title: "CATIA & 3D MODELLING",
      line: "Design Execution File",
      desc: "Industrial-grade component modelling using CATIA V5 under dimensional, functional, and optimization constraints.",
    },
    {
      code: "OP-05",
      title: "CYBER RUSH",
      line: "Tactical Gaming Operation",
      desc: "A campus-wide BGMI battleground where coordination, reaction time, and strategy define dominance.",
    },
    {
      code: "OP-06",
      title: "MACHINA MYSTIQUE",
      line: "Mechanical Reasoning Trial",
      desc: "Conceptual interrogation of mechanical fundamentals through quizzes and applied analytical challenges.",
    },
    {
      code: "OP-07",
      title: "WEALTH WISE",
      line: "Financial Intelligence Briefing",
      desc: "Budgeting, investing, markets, and decision frameworks distilled into a strategic financial mission.",
    },
    {
      code: "OP-08",
      title: "MINI SHARK TANK",
      line: "Startup Evaluation Chamber",
      desc: "Pitch execution under investor-style scrutiny, simulating real startup funding environments.",
    },
    {
      code: "OP-09",
      title: "METAL MASTERPIECE",
      line: "Manufacturing Precision Test",
      desc: "A lathe-based operation converting raw metal into engineered solutions with accuracy and craftsmanship.",
    },
  ];

  return (
    <section className="events-section">
      <div className="events-container">

        {/* ===== HEADER ===== */}
        <span className="events-badge">SIMULATION ZONES</span>

        <h2 className="events-title">PRODYOG COMMAND ARCHIVE</h2>

        <p className="events-subtitle">
           These are not competitions.
          <br />
          These are MISSIONS designed to test execution,discipline,industrial thinking,leadership under pressure.
        </p>

        {/* ===== DOSSIER CARDS ===== */}
        <div className="dossier-list">
          {events.map((e, i) => (
            <div className="dossier" key={i}>
              <div className="dossier-left">
                <span className="file-code">{e.code}</span>
                <span className="status">ACTIVE</span>
              </div>

              <div className="dossier-body">
                <h3>{e.title}</h3>
                <p className="line">{e.line}</p>
                <p className="desc">{e.desc}</p>
              </div>

              <div className="redact" />
            </div>
          ))}
        </div>

        {/* ===== FOOTER CTA ===== */}
        <div className="events-footer">
          <a href="/events" className="events-btn">
            ACCESS FULL OPERATION LOG →
          </a>
        </div>
      </div>

      {/* ================= STYLES ================= */}
      <style jsx>{`
        .events-section {
          // background:
          //   radial-gradient(140% 140% at 10% 10%, rgba(180,0,0,0.22), rgba(0,0,0,0.95)),
          //   #050508;
          padding: 180px 20px;
        }

        .events-container {
          max-width: 1200px;
          margin: auto;
        }

        /* ===== HEADER ===== */
        .events-badge {
          display: inline-block;
        text-align: center;
          
          padding: 10px 34px;
          border-radius: 999px;
          font-size: 14px;
          letter-spacing: 0.45em;
          color: #fecaca;
          background: rgba(220,38,38,0.18);
          border: 1px solid rgba(220,38,38,0.65);
          box-shadow: 0 0 25px rgba(255,0,0,0.25);
          margin-bottom: 24px;
        }

        .events-title {
          font-size: clamp(3.2rem, 6vw, 4.8rem);
       text-align: center;
          font-weight: 900;
          margin-bottom: 24px;
          background: linear-gradient(135deg, #ff3b3b, #ffd166);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          text-shadow: 0 0 50px rgba(255,0,0,0.6);
        }

        .events-subtitle {
          max-width: 1320px;
          margin-bottom: 120px;
          font-size: 18px;
           text-align: center;
          color: #cbd5f5;
          line-height: 1.9;
        }

        /* ===== DOSSIER LIST ===== */
        .dossier-list {
          display: flex;
          flex-direction: column;
          gap: 36px;
        }

        .dossier {
          position: relative;
          display: grid;
          grid-template-columns: 120px 1fr;
          gap: 32px;
          padding: 38px;
          border: 1px solid rgba(255,255,255,0.12);
          background: rgba(255,255,255,0.03);
          overflow: hidden;
        }

        .dossier-left {
          display: flex;
          flex-direction: column;
          gap: 14px;
        }

        .file-code {
          font-size: 14px;
          letter-spacing: 0.3em;
          color: #ffd166;
        }

        .status {
          font-size: 11px;
          padding: 4px 12px;
          background: #ff4d4d;
          color: #000;
          width: fit-content;
          letter-spacing: 0.15em;
          font-weight: 900;
        }

        .dossier-body h3 {
          font-size: 26px;
          font-weight: 900;
          color: #ffffff;
          margin-bottom: 10px;
        }

        .line {
          font-size: 13px;
          letter-spacing: 0.25em;
          color: #fca5a5;
          margin-bottom: 14px;
        }

        .desc {
          font-size: 16px;
          line-height: 1.9;
          color: #d1d5db;
          max-width: 760px;
        }

        /* ===== RED SCAN EFFECT ===== */
        .redact {
          position: absolute;
          left: -100%;
          top: 0;
          width: 60%;
          height: 100%;
          background: linear-gradient(
            120deg,
            transparent,
            rgba(255,0,0,0.22),
            transparent
          );
          transition: left 0.6s ease;
        }

        .dossier:hover .redact {
          left: 120%;
        }

        /* ===== FOOTER ===== */
        .events-footer {
          margin-top: 130px;
        }

        .events-btn {
          display: inline-block;
          padding: 22px 64px;
          border-radius: 999px;
          font-weight: 900;
          letter-spacing: 0.25em;
          background: linear-gradient(135deg, #ff3b3b, #ffd166);
          color: #000;
          text-decoration: none;
          box-shadow: 0 0 60px rgba(255,0,0,0.7);
        }

        /* ===== MOBILE ===== */
        @media (max-width: 768px) {
          .dossier {
            grid-template-columns: 1fr;
            gap: 22px;
          }

          .events-subtitle {
            font-size: 16px;
          }
        }
      `}</style>
    </section>
  );
}
