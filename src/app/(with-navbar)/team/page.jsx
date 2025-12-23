'use client';

import React from 'react';

export default function TeamPage() {
  const [teamMembers, setTeamMembers] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    async function fetchTeam() {
      try {
        const res = await fetch('/api/team');
        if (res.ok) {
          setTeamMembers(await res.json());
        }
      } catch (err) {
        console.error('Failed to fetch team members:', err);
      }
      setLoading(false);
    }
    fetchTeam();
  }, []);

  // const faculty = [
  //   {
  //     name: "Faculty Coordinator",
  //     role: "Department of Production & Industrial Engineering",
  //   },
  //   {
  //     name: "Faculty Co-Coordinator",
  //     role: "Department of Production & Industrial Engineering",
  //   },
  // ];

  // const superCore = [
  //   { role: "President", members: ["Abhishek Bhoutkar"] },
  //   { role: "Vice President", members: ["Vivek Kumar Mondal", "Abhishek Pandey"] },
  //   { role: "General Secretary", members: ["Prasanna Mavuri"] },
  //   {
  //     role: "Joint Secretary",
  //     members: ["Athrav Pratap Singh", "Amit Chaurasia", "Rohit Jauhar"],
  //   },
  //   { role: "Team Manager", members: ["Shreshth Arya", "Sandeep Burh"] },
  //   { role: "Treasurer", members: ["Ankit Oraon"] },
  //   { role: "Joint Treasurer", members: ["Utsav Jaiswal"] },
  //   { role: "Event Head", members: ["Roshan Kumar Paswan"] },
  //   { role: "Joint Event Head", members: ["Sandeep Sharma", "Rani Sharma"] },
  //   { role: "Planning & Development Head", members: ["Aditya Rai"] },
  //   {
  //     role: "Joint Planning & Development Head",
  //     members: ["Ashish Kumar", "Shubham Kumar", "Himanshu Singh"],
  //   },
  //   { role: "Media & Creative Head", members: ["Ayush Rai"] },
  //   {
  //     role: "Joint Media Head",
  //     members: ["Kritivas Hembram", "Chandan Jadhav", "Animesh Kumar"],
  //   },
  //   { role: "Cultural Head", members: ["Shreya Barnwal"] },
  //   {
  //     role: "Joint Cultural Head",
  //     members: ["Rohan Kumar", "Swetha Madhuri"],
  //   },
  //   { role: "Corporate Affairs Head", members: ["Vedha Sharma"] },
  //   {
  //     role: "Joint Corporate Affairs Head",
  //     members: ["Chanchal Kumar Mondal", "Bhavya Jain"],
  //   },
  //   {
  //     role: "App & Web Head",
  //     members: ["Shubham Soni", "Priyanshi Mishra"],
  //   },
  //   { role: "Joint App & Web Head", members: ["Vishal Tiwari"] },
  // ];

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
      <section style={{ marginBottom: "3rem" }}>
        <h3 style={{ marginBottom: "1rem" }}>Team Members</h3>
        {loading ? (
          <p className="muted">Loading team members...</p>
        ) : teamMembers.length === 0 ? (
          <p className="muted">No team members available yet.</p>
        ) : (
          <div className="card-grid">
            {teamMembers.map((member) => (
              <article key={member.id} className="card">
                {member.photograph && (
                  <img
                    src={member.photograph}
                    alt={member.name}
                    style={{
                      width: '100%',
                      height: '200px',
                      objectFit: 'cover',
                      borderRadius: '0.5rem',
                      marginBottom: '0.8rem'
                    }}
                  />
                )}
                <h4 style={{ margin: "0 0 0.3rem 0" }}>{member.name}</h4>
                <p className="muted" style={{ margin: "0 0 0.5rem 0" }}>{member.position}</p>
                <div className="muted" style={{ fontSize: '0.875rem', marginBottom: '0.5rem' }}>
                  {member.email}
                </div>
                {member.linkedinProfile && (
                  <a
                    href={member.linkedinProfile}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn secondary"
                    style={{ display: 'inline-block', marginTop: '0.5rem' }}
                  >
                    LinkedIn Profile
                  </a>
                )}
              </article>
            ))}
          </div>
        )}
      </section>

      {/* Faculty Section */}
      {/* <section style={{ marginBottom: "3rem" }}>
        <h3 style={{ marginBottom: "1rem" }}>PIE Faculty Coordinators</h3>
        <div className="card-grid">
          {faculty.map((f, i) => (
            <article key={i} className="card">
              <h4 style={{ margin: "0 0 0.3rem 0" }}>{f.name}</h4>
              <p className="muted" style={{ margin: 0 }}>{f.role}</p>
            </article>
          ))}
        </div>
      </section> */}

      {/* Student Super Core */}
      {/* <section>
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
      </section> */}
    </main>
  );
}

