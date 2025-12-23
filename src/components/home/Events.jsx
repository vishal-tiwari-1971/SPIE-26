export default function Events() {
  const events = [
    {
      title: "Chain-Zenith",
      desc: "This event is designed as an immersive supply-chain case study competition tailored for students interested in logistics, operations, and consultancy.",
    },
    {
      title: "Metal Masterpiece",
      desc: "An exciting competition that brings together students with a passion for machining, design, and precision craftsmanship.",
    },
    {
      title: "Pratyush",
      desc: "An opportunity for designers to showcase optimal industrial design solutions using CATIA V5 software.",
    },
    {
      title: "Machina Mystique",
      desc: "A quiz-based challenge designed to assess participants’ mechanical reasoning skills.",
    },
    {
      title: "Mini Shark Tank",
      desc: "A platform for students to showcase entrepreneurial thinking and innovative ideas.",
    },
    {
      title: "DataHackon",
      desc: "Focused on building foundations in data analytics and data science.",
    },
  ];

  return (
    <section id="events" className="events-section">
      <div className="events-container">
        <h2 className="section-title text-center mb-12">
          Major Events
        </h2>

        <div className="events-grid">
          {events.map((event, idx) => (
            <div key={idx} className="event-card">
              <h3>{event.title}</h3>
              <p>{event.desc}</p>
            </div>
          ))}
        </div>

        <div className="text-center mt-10">
          <a href="/events" className="know-more-btn">
            &gt; Know More ...
          </a>
        </div>
      </div>
    </section>
  );
}
