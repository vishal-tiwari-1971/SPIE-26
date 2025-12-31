'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';

export default function EventTeamsPage() {
  const { id } = useParams();
  const [teams, setTeams] = useState([]);
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchTeams() {
      setLoading(true);
      setError('');
      try {
        // Fetch event details
        const eventRes = await fetch(`/api/admin/events/${id}`, { cache: 'no-store' });
        if (eventRes.ok) {
          const eventData = await eventRes.json();
          setEvent(eventData);
        }

        // Fetch teams
        const res = await fetch(`/api/admin/events/${id}/teams`);
        if (res.ok) {
          const data = await res.json();
          setTeams(data);
        } else {
          const err = await res.json();
          setError(err.error || 'Failed to fetch teams');
        }
      } catch (err) {
        console.error('Error fetching teams:', err);
        setError('Failed to load teams');
      } finally {
        setLoading(false);
      }
    }

    if (id) fetchTeams();
  }, [id]);

  const exportTeamsCSV = () => {
    if (teams.length === 0) {
      alert('No teams to export');
      return;
    }

    // Prepare CSV data with detailed member info
    let csv = 'Team Name,Leader Name,Leader Email,Leader Registration Number,Total Members,All Member Names,All Member Registration Numbers\n';
    
    teams.forEach(team => {
      // Extract leader registration number from email if not in database
      const leaderRegNum = team.leader.registrationNumber || 
        (team.leader.email ? team.leader.email.replace('@nitjsr.ac.in', '') : 'N/A');
      
      // Filter out duplicate leader from members array (first member is usually the leader)
      const uniqueMembers = team.members.filter((m, idx) => 
        idx === 0 ? false : true // Skip first member as it's the leader
      );
      
      // All members including leader (without duplicates)
      const allMemberNames = [team.leader.name, ...uniqueMembers.map(m => m.name)].join(' | ');
      const allMemberRegNums = [leaderRegNum, ...uniqueMembers.map(m => m.registrationNumber || 'N/A')].join(' | ');
      
      const totalMembers = 1 + uniqueMembers.length; // 1 leader + additional members
      
      csv += `"${team.name}","${team.leader.name}","${team.leader.email}","${leaderRegNum}",${totalMembers},"${allMemberNames}","${allMemberRegNums}"\n`;
    });

    // Show team info in alert
    const totalTeams = teams.length;
    const totalMembers = teams.reduce((sum, team) => sum + team.members.length + 1, 0);
    console.log(`Exporting ${totalTeams} teams with ${totalMembers} total members`);

    // Create blob and download
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    
    link.setAttribute('href', url);
    link.setAttribute('download', `${event?.title || 'event'}_registrations.csv`);
    link.style.visibility = 'hidden';
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const exportTeamsJSON = () => {
    if (teams.length === 0) {
      alert('No teams to export');
      return;
    }

    const data = teams.map(team => ({
      name: team.name,
      leader: {
        name: team.leader.name,
        email: team.leader.email
      },
      additionalMembers: team.members.map(m => ({
        name: m.name,
        registrationNumber: m.registrationNumber || 'N/A'
      })),
      totalMemberCount: team.members.length + 1, // includes leader
      additionalMemberCount: team.members.length,
      createdAt: team.createdAt
    }));

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    
    link.setAttribute('href', url);
    link.setAttribute('download', `teams-${event?.name || id}.json`);
    link.style.visibility = 'hidden';
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (loading) {
    return (
      <div style={{ padding: '2rem', color: '#FFB703' }}>
        Loading teams...
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ padding: '2rem' }}>
        <div style={{ background: 'rgba(217, 4, 41, 0.1)', border: '1px solid #D90429', borderRadius: '8px', padding: '1rem', color: '#D90429' }}>
          {error}
        </div>
        <Link href="/admin/events" style={{ marginTop: '1rem', display: 'inline-block', color: '#FFB703' }}>
          ← Back to Events
        </Link>
      </div>
    );
  }

  return (
    <div style={{ padding: '2rem' }}>
      {/* Header */}
      <div style={{ marginBottom: '2rem' }}>
        <Link href="/admin/events" style={{ color: '#FFB703', textDecoration: 'none', marginBottom: '1rem', display: 'inline-block' }}>
          ← Back to Events
        </Link>
        <h1 style={{ margin: '1rem 0 0 0', color: '#FFB703' }}>
          Teams for: {event?.name || 'Loading...'}
        </h1>
        <p style={{ color: '#B1A7A6', marginTop: '0.5rem' }}>
          Total Teams: {teams.length}
        </p>
      </div>

      {/* Export Buttons */}
      <div style={{ marginBottom: '2rem', display: 'flex', gap: '1rem' }}>
        <button
          onClick={exportTeamsCSV}
          style={{
            padding: '0.8rem 1.5rem',
            background: '#FFB703',
            color: '#0B090A',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            fontWeight: 'bold',
            fontSize: '1rem',
          }}
        >
          📥 Export as CSV
        </button>
        <button
          onClick={exportTeamsJSON}
          style={{
            padding: '0.8rem 1.5rem',
            background: 'rgba(255, 183, 3, 0.2)',
            color: '#FFB703',
            border: '1px solid #FFB703',
            borderRadius: '6px',
            cursor: 'pointer',
            fontWeight: 'bold',
            fontSize: '1rem',
          }}
        >
          📥 Export as JSON
        </button>
      </div>

      {/* Teams List */}
      {teams.length === 0 ? (
        <div style={{ padding: '2rem', background: 'rgba(255, 183, 3, 0.05)', borderRadius: '8px', textAlign: 'center', color: '#B1A7A6' }}>
          No teams registered for this event yet.
        </div>
      ) : (
        <div style={{ display: 'grid', gap: '1.5rem' }}>
          {teams.map((team) => (
            <div
              key={team.id}
              style={{
                background: 'rgba(217, 4, 41, 0.05)',
                border: '1px solid #D90429',
                borderRadius: '8px',
                padding: '1.5rem',
              }}
            >
              <div style={{ marginBottom: '1rem' }}>
                <h3 style={{ margin: '0 0 0.5rem 0', color: '#FFB703' }}>
                  {team.name}
                </h3>
                <p style={{ margin: '0.25rem 0', color: '#B1A7A6', fontSize: '0.9rem' }}>
                  👤 Leader: <strong>{team.leader.name}</strong> ({team.leader.email})
                  {(team.leader.registrationNumber || team.leader.email) && (
                    <span style={{ marginLeft: '0.5rem', color: '#FFB703' }}>
                      Reg: {team.leader.registrationNumber || team.leader.email.replace('@nitjsr.ac.in', '')}
                    </span>
                  )}
                </p>
                <p style={{ margin: '0.25rem 0', color: '#B1A7A6', fontSize: '0.9rem' }}>
                  📅 Created: {new Date(team.createdAt).toLocaleDateString('en-IN')}
                </p>
              </div>

              <div>
                <h4 style={{ margin: '1rem 0 0.5rem 0', color: '#FFB703', fontSize: '0.95rem' }}>
                  Team Members ({team.members.length + 1} total - {team.members.length} additional)
                </h4>
                <div style={{ background: 'rgba(255, 255, 255, 0.02)', borderRadius: '4px', padding: '1rem' }}>
                  {team.members.map((member, idx) => (
                    <div
                      key={member.id}
                      style={{
                        padding: '0.5rem 0',
                        borderBottom: idx < team.members.length - 1 ? '1px solid rgba(255, 183, 3, 0.1)' : 'none',
                        color: '#F5F3F4',
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span>
                          {idx === 0 && '👑 '}{member.name}
                        </span>
                        {member.registrationNumber && (
                          <span style={{ color: '#B1A7A6', fontSize: '0.85rem' }}>
                            Reg: {member.registrationNumber}
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
