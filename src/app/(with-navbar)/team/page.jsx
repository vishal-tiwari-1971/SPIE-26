export default function TeamPage() {
  const faculty = [
    {
      name: "Faculty Coordinator",
      role: "Department of Production & Industrial Engineering",
    },
    {
      name: "Faculty Co-Coordinator",
      role: "Department of Production & Industrial Engineering",
    },
  ];

  const superCore = [
    { role: "President", members: ["Abhishek Bhoutkar"] },
    { role: "Vice President", members: ["Vivek Kumar Mondal", "Abhishek Pandey"] },
    { role: "General Secretary", members: ["Prasanna Mavuri"] },
    {
      role: "Joint Secretary",
      members: ["Athrav Pratap Singh", "Amit Chaurasia", "Rohit Jauhar"],
    },
    { role: "Team Manager", members: ["Shreshth Arya", "Sandeep Burh"] },
    { role: "Treasurer", members: ["Ankit Oraon"] },
    { role: "Joint Treasurer", members: ["Utsav Jaiswal"] },
    { role: "Event Head", members: ["Roshan Kumar Paswan"] },
    { role: "Joint Event Head", members: ["Sandeep Sharma", "Rani Sharma"] },
    { role: "Planning & Development Head", members: ["Aditya Rai"] },
    {
      role: "Joint Planning & Development Head",
      members: ["Ashish Kumar", "Shubham Kumar", "Himanshu Singh"],
    },
    { role: "Media & Creative Head", members: ["Ayush Rai"] },
    {
      role: "Joint Media Head",
      members: ["Kritivas Hembram", "Chandan Jadhav", "Animesh Kumar"],
    },
    { role: "Cultural Head", members: ["Shreya Barnwal"] },
    {
      role: "Joint Cultural Head",
      members: ["Rohan Kumar", "Swetha Madhuri"],
    },
    { role: "Corporate Affairs Head", members: ["Vedha Sharma"] },
    {
      role: "Joint Corporate Affairs Head",
      members: ["Chanchal Kumar Mondal", "Bhavya Jain"],
    },
    {
      role: "App & Web Head",
      members: ["Shubham Soni", "Priyanshi Mishra"],
    },
    { role: "Joint App & Web Head", members: ["Vishal Tiwari"] },
  ];

  return (
    <main className="page-shell">
      {/* Header */}
      <section className="section-header" style={{ marginBottom: "2rem" }}>
        <div>
          <p className="chip">Team</p>
          <h2 className="section-title">Meet the crew behind SPIE 2026</h2>
          <p className="muted" style={{ maxWidth: "640px" }}>
            Faculty mentors and student leaders working together to bring SPIE 2026 to life.
          </p>
        </div>
      </section>

      {/* Faculty Section */}
      <section style={{ marginBottom: "3rem" }}>
        <h3 style={{ marginBottom: "1rem" }}>PIE Faculty Coordinators</h3>
        <div className="card-grid">
          {faculty.map((f, i) => (
            <article key={i} className="card">
              <h4 style={{ margin: "0 0 0.3rem 0" }}>{f.name}</h4>
              <p className="muted" style={{ margin: 0 }}>{f.role}</p>
            </article>
          ))}
        </div>
      </section>

      {/* Student Super Core */}
      <section>
        <h3 style={{ marginBottom: "1.5rem" }}>Student Super Core</h3>

        {superCore.map((block, i) => (
          <div key={i} style={{ marginBottom: "2rem" }}>
            <h4 style={{ marginBottom: "0.8rem" }}>{block.role}</h4>

            <div className="card-grid">
              {block.members.map((name, idx) => (
                <article key={idx} className="card">
                  <p style={{ margin: 0 }}>{name}</p>
                </article>
              ))}
            </div>
          </div>
        ))}
      </section>
    </main>
  );
}
