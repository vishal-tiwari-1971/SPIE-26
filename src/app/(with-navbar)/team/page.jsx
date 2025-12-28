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

  // Codenames for team members (cycling through cities)
  const codenames = [
    'Tokyo', 'Berlin', 'Nairobi', 'Rio', 'Denver', 'Helsinki', 
    'Oslo', 'Moscow', 'Stockholm', 'Lisbon', 'Marseille', 'Bogotá'
  ];

  return (
    <main className="page-shell">
      {/* Header */}
      <div className="confidential-banner">
        ⚠ CLASSIFIED: CREW PERSONNEL FILES ⚠
      </div>
      <section className="section-header" style={{ marginBottom: "2rem" }}>
        <div>
          <p className="chip" style={{ 
            background: '#D90429', 
            color: '#F5F3F4',
            fontFamily: 'Bebas Neue, sans-serif',
            letterSpacing: '2px'
          }}>OPERATION CREW</p>
          <h2 className="section-title" style={{ 
            fontFamily: 'Bebas Neue, sans-serif',
            color: '#D90429',
            fontSize: '3rem',
            letterSpacing: '3px'
          }}>
            THE CREW: SPIE 2026
          </h2>
          <p className="muted" style={{ 
            maxWidth: "640px",
            fontFamily: 'Courier Prime, monospace',
            fontSize: '1rem',
            color: '#B1A7A6'
          }}>
            CLASSIFIED PERSONNEL DOSSIERS // ACCESS LEVEL: RESTRICTED
          </p>
        </div>
      </section>
      <section style={{ marginBottom: "3rem" }}>
        <h3 style={{ 
          marginBottom: "1.5rem",
          fontFamily: 'Bebas Neue, sans-serif',
          color: '#FFB703',
          fontSize: '2rem',
          letterSpacing: '2px'
        }}>
          █ OPERATIVES DATABASE
        </h3>
        {loading ? (
          <p className="muted" style={{ fontFamily: 'Courier Prime, monospace' }}>
            DECRYPTING FILES...
          </p>
        ) : teamMembers.length === 0 ? (
          <p className="muted" style={{ fontFamily: 'Courier Prime, monospace' }}>
            NO ACTIVE OPERATIVES // AWAITING RECRUITMENT
          </p>
        ) : (
          <div className="card-grid">
            {teamMembers.map((member, index) => (
              <article key={member.id} className="team-member-card">
                {member.photograph && (
                  <div style={{ position: 'relative' }}>
                    <img
                      src={member.photograph}
                      alt={member.name}
                      className="team-member-image"
                      style={{
                        width: '100%',
                        height: '250px',
                        objectFit: 'cover',
                        borderRadius: '0',
                        marginBottom: '1rem',
                      }}
                    />
                    <div className="team-codename">
                      {codenames[index % codenames.length]}
                    </div>
                  </div>
                )}
                <div style={{ 
                  padding: '0.5rem',
                  background: 'rgba(217, 4, 41, 0.05)',
                  border: '1px solid #D90429',
                  fontFamily: 'Courier Prime, monospace'
                }}>
                  <h4 style={{ 
                    margin: "0 0 0.5rem 0",
                    fontFamily: 'Bebas Neue, sans-serif',
                    color: '#FFB703',
                    fontSize: '1.3rem',
                    letterSpacing: '1px'
                  }}>
                    {member.name}
                  </h4>
                  <p className="muted" style={{ 
                    margin: "0 0 0.5rem 0",
                    color: '#F5F3F4',
                    fontSize: '0.9rem',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px'
                  }}>
                    ROLE: {member.position}
                  </p>
                  <div className="muted" style={{ 
                    fontSize: '0.8rem', 
                    marginBottom: '0.8rem',
                    color: '#B1A7A6',
                    wordBreak: 'break-all'
                  }}>
                    CONTACT: {member.email}
                  </div>
                  {member.linkedinProfile && (
                    <a
                      href={member.linkedinProfile}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn secondary"
                      style={{ 
                        display: 'inline-block', 
                        marginTop: '0.5rem',
                        background: '#D90429',
                        color: '#F5F3F4',
                        border: 'none',
                        padding: '0.5rem 1rem',
                        fontFamily: 'Bebas Neue, sans-serif',
                        letterSpacing: '1px',
                        transition: 'all 0.3s ease'
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.background = '#FFB703';
                        e.target.style.color = '#0B090A';
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.background = '#D90429';
                        e.target.style.color = '#F5F3F4';
                      }}
                    >
                      INTEL FILE
                    </a>
                  )}
                </div>
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

