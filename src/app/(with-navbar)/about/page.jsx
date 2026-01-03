export default function AboutPage() {
  return (
    <section className="px-6 py-14 max-w-6xl mx-auto text-[#F5F3F4]">
      
      {/* HEADER */}
      <div className="text-center mb-12">
        <span className="section-badge">ABOUT SPIE</span>
        <h1
          style={{
            fontFamily: "Bebas Neue, sans-serif",
            fontSize: "3rem",
            letterSpacing: "0.2em",
            color: "#FFB703",
            marginTop: "1rem",
          }}
        >
          SOCIETY OF PRODUCTION & INDUSTRIAL ENGINEERING
        </h1>
        <p
          style={{
            fontFamily: "Courier Prime, monospace",
            color: "#B1A7A6",
            marginTop: "1rem",
            maxWidth: "700px",
            marginInline: "auto",
          }}
        >
          Official technical society of the Production & Industrial Engineering
          Department, NIT Jamshedpur.
        </p>
      </div>

      {/* WHO WE ARE */}
      <div className="mb-14 dossier-card">
        <div className="dossier-header">CLASSIFIED DOSSIER</div>
        <h2 className="section-title mb-3">Who We Are</h2>
        <p className="text-[#B1A7A6] leading-relaxed font-['Courier Prime']">
          SPIE is a student-driven technical society dedicated to nurturing
          industry-ready engineers. We work at the intersection of academia,
          innovation, and industry exposure to equip students with technical
          excellence, leadership skills, and professional confidence.
        </p>
      </div>

      {/* VISION + MISSION */}
      <div className="grid md:grid-cols-2 gap-8 mb-14">
        <div className="dossier-card">
          <div className="stamp stamp-acquired">VISION</div>
          <h3 className="section-title mb-2">Our Vision</h3>
          <p className="text-[#B1A7A6] font-['Courier Prime'] leading-relaxed">
            To develop technically sound, ethically strong, and industry-ready
            engineers capable of leading innovation and driving impact.
          </p>
        </div>

        <div className="dossier-card">
          <div className="stamp stamp-infiltration">MISSION</div>
          <h3 className="section-title mb-2">Our Mission</h3>
          <p className="text-[#B1A7A6] font-['Courier Prime'] leading-relaxed">
            To bridge the gap between classroom learning and real-world
            applications through workshops, industrial interactions,
            competitions, and flagship events like PRODYOG.
          </p>
        </div>
      </div>

      {/* WHAT WE DO */}
      <div className="mb-14">
        <h2 className="section-title text-center mb-8">Our Operations</h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { title: "Industry Exposure", desc: "Industrial visits, expert talks & collaborations" },
            { title: "Technical Events", desc: "Workshops, competitions & case studies" },
            { title: "Leadership", desc: "Teamwork, management & professional growth" },
            { title: "Flagship Fest", desc: "PRODYOG – our annual techno-industrial fest" },
          ].map((item, i) => (
            <div key={i} className="card dossier-card text-center">
              <h4 className="section-title mb-2">{item.title}</h4>
              <p className="text-[#B1A7A6] font-['Courier Prime'] text-sm">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* WHY SPIE */}
      <div className="heist-alert">
        SPIE operates with one objective — producing engineers who are not just
        degree holders, but problem solvers, leaders, and innovators.
      </div>
    </section>
  );
}
