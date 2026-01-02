export default function Events() {
  const events = [
    {
      icon: "📦",
      title: "Chain Zenith",
      desc: "A flagship supply chain management event exploring real-world logistics challenges. Engage with strategic problem-solving, industry-inspired case studies, and decision-making under constraints.",
      category: "Competition",
    },
    {
      icon: "📊",
      title: "DataHackon",
      desc: "A data analytics challenge where participants dive into data-driven problem solving, uncover insights, and apply analytical techniques inspired by real industry use cases.",
      category: "Analytics",
    },
    {
      icon: "🗣️",
      title: "Talkathon",
      desc: "A group discussion event designed to enhance communication skills, articulation, clarity of thought, and collaborative reasoning through structured discussions.",
      category: "Discussion",
    },
    {
      icon: "🧩",
      title: "CATIA & 3D Modelling",
      desc: "A hands-on workshop and design challenge where participants create innovative models using CATIA and 3D printing concepts under defined constraints.",
      category: "Design",
    },
    {
      icon: "🎮",
      title: "Cyber Rush",
      desc: "An adrenaline-fueled BGMI campus championship where strategy, teamwork, and quick decision-making define the ultimate gaming showdown.",
      category: "Gaming",
    },
    {
      icon: "⚙️",
      title: "Machina Mystique",
      desc: "A multi-stage mechanical challenge starting with core concept workshops, followed by quizzes and hands-on model building to transform theory into reality.",
      category: "Mechanical",
    },
    {
      icon: "💰",
      title: "Wealth Wise",
      desc: "A financial literacy workshop focused on budgeting, investing, and money management, aimed at building long-term financial awareness and decision-making skills.",
      category: "Finance",
    },
    
    {
      icon: "💼",
      title: "Mini Shark Tank",
      desc: "A high-impact pitching competition where teams validate business ideas with functional prototypes and present them to a panel, simulating real startup environments.",
      category: "Entrepreneurship",
    },
    {
      icon: "🔩",
      title: "Metal Masterpiece",
      desc: "A lathe design challenge testing creativity, precision, and craftsmanship—where participants turn raw ideas into finely engineered metal solutions.",
      category: "Manufacturing",
    },
  ];

  return (
    <section id="events" className="events-section">
      <div className="events-container">
        <div className="events-header">
          <span className="section-badge">Featured Events</span>
          <h2 className="section-title">Major Events of PRODYOG</h2>
          <p className="events-description">
            A diverse lineup of technical, analytical, entrepreneurial, and fun events designed to challenge minds, build skills, and foster innovation.
          </p>
        </div>

        <div className="events-grid">
          {events.map((event, idx) => (
            <div key={idx} className="event-card">
              <h3 className="event-title">{event.title}</h3>
              <p className="event-description">{event.desc}</p>
            </div>
          ))}
        </div>

        <div className="events-footer">
          <a href="/events" className="btn-primary btn-large">
            <span>Explore All Events</span>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
