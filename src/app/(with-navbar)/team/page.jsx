'use client';

import React from 'react';

export default function TeamPage() {
  const [teamMembers, setTeamMembers] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [selectedBatch, setSelectedBatch] = React.useState('2022');
  const [batches, setBatches] = React.useState([]);
  const [domains, setDomains] = React.useState([]);

  React.useEffect(() => {
    async function fetchTeam() {
      try {
        const res = await fetch('/api/team');
        if (res.ok) {
          const data = await res.json();
          setTeamMembers(data);
          
          // Extract unique batches and sort them
          const uniqueBatches = [...new Set(data.map(member => member.batch).filter(Boolean))].sort((a, b) => a.localeCompare(b));
          setBatches(uniqueBatches);
          
          // Extract unique domains and sort them
          const uniqueDomains = [...new Set(data.map(member => member.domain).filter(Boolean))].sort();
          setDomains(uniqueDomains);
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

  // Get headline based on batch
  const getBatchHeadline = (batch) => {
    if (batch === '2022') return 'Supercore';
    if (batch === '2023') return 'Joint Core';
    if (batch === '2024') return 'Coordinator';
    return null;
  };

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
          }}>OPERATION Prodyog</p>
          <h2 className="section-title" style={{ 
            fontFamily: 'Bebas Neue, sans-serif',
            color: '#D90429',
            fontSize: '3rem',
            letterSpacing: '3px'
          }}>
            THE CREW: Prodyog 2026
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
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: "1.5rem", flexWrap: 'wrap', gap: '1rem' }}>
          <h3 style={{ 
            fontFamily: 'Bebas Neue, sans-serif',
            color: '#FFB703',
            fontSize: '2rem',
            letterSpacing: '2px',
            margin: 0
          }}>
            █ OPERATIVES DATABASE
          </h3>
          
          {/* Batch Filter Dropdown */}
          {batches.length > 0 && (
            <select 
              value={selectedBatch} 
              onChange={(e) => setSelectedBatch(e.target.value)}
              style={{
                padding: '0.6rem 1rem',
                borderRadius: '8px',
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 183, 3, 0.3)',
                color: '#F5F3F4',
                fontFamily: 'Bebas Neue, sans-serif',
                fontSize: '1rem',
                letterSpacing: '1px',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={(e) => {
                e.target.style.background = 'rgba(255, 183, 3, 0.1)';
                e.target.style.borderColor = 'rgba(255, 183, 3, 0.6)';
              }}
              onMouseLeave={(e) => {
                e.target.style.background = 'rgba(255, 255, 255, 0.05)';
                e.target.style.borderColor = 'rgba(255, 183, 3, 0.3)';
              }}
            >
              {batches.map(batch => (
                <option key={batch} value={batch} style={{ background: '#0B090A', color: '#F5F3F4' }}>
                  {batch}
                </option>
              ))}
            </select>
          )}
        </div>
        {loading ? (
          <p className="muted" style={{ fontFamily: 'Courier Prime, monospace' }}>
            DECRYPTING FILES...
          </p>
        ) : teamMembers.length === 0 ? (
          <p className="muted" style={{ fontFamily: 'Courier Prime, monospace' }}>
            NO ACTIVE OPERATIVES // AWAITING RECRUITMENT
          </p>
        ) : (
          <>
            {/* Batch Headline Section */}
            {getBatchHeadline(selectedBatch) && (
              <h3 style={{
                fontFamily: 'Bebas Neue, sans-serif',
                color: '#D90429',
                fontSize: '2.5rem',
                letterSpacing: '3px',
                margin: '0 0 2rem 0',
                textAlign: 'center',
                textTransform: 'uppercase',
                borderBottom: '2px solid rgba(217, 4, 41, 0.3)',
                paddingBottom: '1rem'
              }}>
                {getBatchHeadline(selectedBatch)}
              </h3>
            )}
            <div className="card-grid">
              {teamMembers
                .filter(member => member.batch === selectedBatch)
                .sort((a, b) => (a.batch || '').localeCompare(b.batch || ''))
                .map((member, index) => {
                  return (
              <article key={member.id} className="team-member-card">
                {member.photograph && (
                  <div style={{ position: 'relative', paddingBottom: '100%', overflow: 'hidden', borderRadius: '0', marginBottom: '1rem', background: '#000' }}>
                    <img
                      src={member.photograph}
                      alt={member.name}
                      className="team-member-image"
                      style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        borderRadius: '0',
                        filter: 'saturate(1.2) contrast(1.05)',
                        transition: 'filter 0.3s ease'
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
                  {member.batch === '2024' && member.domain && (
                    <p className="muted" style={{ 
                      margin: "0 0 0.5rem 0",
                      color: '#B1A7A6',
                      fontSize: '0.85rem',
                      textTransform: 'capitalize',
                      letterSpacing: '0.5px'
                    }}>
                      {member.domain}
                    </p>
                  )}
                  {member.batch !== '2024' && (
                    <>
                      <p className="muted" style={{ 
                        margin: "0 0 0.5rem 0",
                        color: '#F5F3F4',
                        fontSize: '0.9rem',
                        textTransform: 'uppercase',
                        letterSpacing: '0.5px'
                      }}>
                        ROLE: {member.position}
                      </p>
                      {member.batch && member.batch !== '2022' && member.batch !== '2023' && (
                        <div className="muted" style={{ 
                          fontSize: '0.8rem', 
                          marginBottom: '0.8rem',
                          color: '#B1A7A6'
                        }}>
                          BATCH: {member.batch}
                        </div>
                      )}
                    </>
                  )}
                  
                  {/* Email and LinkedIn Icons */}
                  <div style={{ 
                    display: 'flex', 
                    gap: '0.6rem', 
                    marginTop: '1.2rem',
                    paddingTop: '1rem',
                    borderTop: '1px solid rgba(255, 183, 3, 0.2)'
                  }}>
                    {member.email && (
                      <a
                        href={`mailto:${member.email}`}
                        title={`Email: ${member.email}`}
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          width: '44px',
                          height: '44px',
                          background: 'rgba(217, 4, 41, 0.2)',
                          border: '2px solid #D90429',
                          borderRadius: '50%',
                          cursor: 'pointer',
                          fontSize: '1.4rem',
                          transition: 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
                          transform: 'scale(1)',
                          position: 'relative',
                          overflow: 'hidden'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.transform = 'scale(1.15) rotate(5deg)';
                          e.currentTarget.style.background = 'linear-gradient(135deg, #D90429, #FFB703)';
                          e.currentTarget.style.boxShadow = '0 8px 20px rgba(217, 4, 41, 0.6), inset 0 0 10px rgba(255, 255, 255, 0.2)';
                          e.currentTarget.style.borderColor = '#FFB703';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.transform = 'scale(1) rotate(0deg)';
                          e.currentTarget.style.background = 'rgba(217, 4, 41, 0.2)';
                          e.currentTarget.style.boxShadow = 'none';
                          e.currentTarget.style.borderColor = '#D90429';
                        }}
                      >
                        ✉
                      </a>
                    )}
                    
                    {member.linkedinProfile && (
                      <a
                        href={member.linkedinProfile}
                        target="_blank"
                        rel="noopener noreferrer"
                        title="LinkedIn Profile"
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          width: '44px',
                          height: '44px',
                          background: 'rgba(0, 119, 181, 0.2)',
                          border: '2px solid #0077B5',
                          borderRadius: '50%',
                          cursor: 'pointer',
                          fontSize: '1.4rem',
                          transition: 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
                          transform: 'scale(1)',
                          position: 'relative',
                          overflow: 'hidden'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.transform = 'scale(1.15) rotate(-5deg)';
                          e.currentTarget.style.background = 'linear-gradient(135deg, #0077B5, #005885)';
                          e.currentTarget.style.boxShadow = '0 8px 20px rgba(0, 119, 181, 0.6), inset 0 0 10px rgba(255, 255, 255, 0.2)';
                          e.currentTarget.style.borderColor = '#005885';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.transform = 'scale(1) rotate(0deg)';
                          e.currentTarget.style.background = 'rgba(0, 119, 181, 0.2)';
                          e.currentTarget.style.boxShadow = 'none';
                          e.currentTarget.style.borderColor = '#0077B5';
                        }}
                      >
                        <span style={{ fontSize: '0.9rem', fontWeight: 'bold', letterSpacing: '0.5px' }}>in</span>
                      </a>
                    )}
                  </div>
                </div>
              </article>
                );
              })}
            </div>
          </>
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

