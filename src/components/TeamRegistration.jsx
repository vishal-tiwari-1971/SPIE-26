'use client';

import { useState, useEffect } from 'react';

export default function TeamRegistration({ eventId, userId, initialShowForm = false }) {
  const [event, setEvent] = useState(null);
  const [teamName, setTeamName] = useState('');
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [myTeam, setMyTeam] = useState(null);
  const [showForm, setShowForm] = useState(initialShowForm);
  const [leaderInfo, setLeaderInfo] = useState(null);

  // Update showForm when initialShowForm prop changes
  useEffect(() => {
    console.log('TeamRegistration: initialShowForm prop changed to', initialShowForm);
    setShowForm(initialShowForm);
  }, [initialShowForm]);

  // Fetch event team configuration
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      
      try {
        // Fetch event config
        const eventRes = await fetch(`/api/events/${eventId}/team-config`);
        if (eventRes.ok) {
          const eventData = await eventRes.json();
          setEvent(eventData);
        }
        
        // Fetch leader info from localStorage
        const user = localStorage.getItem('user');
        if (user) {
          const userData = JSON.parse(user);
          setLeaderInfo(userData);
          setMembers([{ name: userData.name || '', email: userData.email || '' }]);
        }
        
        // Fetch user's team if exists
        const teamRes = await fetch(`/api/events/${eventId}/teams?leaderId=${userId}`);
        if (teamRes.ok) {
          const teams = await teamRes.json();
          if (teams.length > 0) {
            setMyTeam(teams[0]);
            setTeamName(teams[0].name);
            setMembers(teams[0].members.map(m => ({ name: m.name, email: m.email || '' })));
          }
        }
      } catch (err) {
        console.error('Failed to fetch data:', err);
        setError('Failed to load team data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [eventId, userId]);

  const addMember = () => {
    setMembers([...members, { name: '', email: '' }]);
  };

  const removeMember = (index) => {
    if (members.length > 1 && index !== 0) {
      setMembers(members.filter((_, i) => i !== index));
    }
  };

  const updateMember = (index, field, value) => {
    const newMembers = [...members];
    newMembers[index][field] = value;
    setMembers(newMembers);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setSubmitting(true);

    try {
      if (!teamName.trim()) {
        setError('Team name is required');
        setSubmitting(false);
        return;
      }

      const validMembers = members.filter(m => m.name.trim());
      if (validMembers.length === 0) {
        setError('At least one member is required');
        setSubmitting(false);
        return;
      }

      const url = myTeam
        ? `/api/events/${eventId}/teams/${myTeam.id}`
        : `/api/events/${eventId}/teams`;

      const method = myTeam ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          teamName,
          userId,
          members: validMembers,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Failed to register team');
      } else {
        setSuccess(myTeam ? 'Team updated successfully!' : 'Team registered successfully!');
        setMyTeam(data.team);
        setShowForm(false);
        setTeamName('');
        setMembers(leaderInfo ? [{ name: leaderInfo.name || '', email: leaderInfo.email || '' }] : []);
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  // Debug logging
  console.log('TeamRegistration render - loading:', loading, 'myTeam:', !!myTeam, 'showForm:', showForm, 'initialShowForm:', initialShowForm);

  return (
    <div style={{
      background: 'rgba(217, 4, 41, 0.05)',
      border: '1px solid #D90429',
      borderRadius: '12px',
      padding: '2rem',
      marginTop: '2rem',
      fontFamily: 'Courier Prime, monospace',
    }}>
      <h3 style={{
        fontFamily: 'Bebas Neue, sans-serif',
        fontSize: '1.8rem',
        color: '#FFB703',
        marginBottom: '1rem',
        letterSpacing: '2px',
      }}>
        👥 TEAM REGISTRATION
      </h3>

      {loading && (
        <div style={{ color: '#FFB703', marginBottom: '1rem' }}>
          Loading team configuration...
        </div>
      )}

      {!loading && !myTeam && !showForm && (
        <button
          onClick={() => setShowForm(true)}
          style={{
            width: '100%',
            padding: '1rem',
            background: 'rgba(255, 183, 3, 0.2)',
            border: '1px solid #FFB703',
            color: '#FFB703',
            fontFamily: 'Bebas Neue, sans-serif',
            fontSize: '1.1rem',
            fontWeight: 'bold',
            borderRadius: '6px',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
          }}
          onMouseEnter={(e) => {
            e.target.style.transform = 'translateY(-2px)';
            e.target.style.boxShadow = '0 8px 20px rgba(255, 183, 3, 0.4)';
          }}
          onMouseLeave={(e) => {
            e.target.style.transform = 'translateY(0)';
            e.target.style.boxShadow = 'none';
          }}
        >
          + ADD TEAM
        </button>
      )}

      {!loading && myTeam && !showForm && (
        <div style={{
          background: 'rgba(76, 175, 80, 0.1)',
          border: '1px solid #4CAF50',
          borderRadius: '8px',
          padding: '1rem',
        }}>
          <p style={{ color: '#4CAF50', margin: 0, marginBottom: '0.5rem' }}>
            ✓ Team registered successfully!
          </p>
          <p style={{ color: '#B1A7A6', margin: 0, fontSize: '0.9rem' }}>
            Team: <strong>{myTeam.name}</strong> ({myTeam.members.length} members)
          </p>
          <button
            onClick={() => setShowForm(true)}
            style={{
              marginTop: '1rem',
              padding: '0.6rem 1.2rem',
              background: 'rgba(255, 183, 3, 0.2)',
              border: '1px solid #FFB703',
              color: '#FFB703',
              fontFamily: 'Courier Prime, monospace',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            EDIT TEAM
          </button>
        </div>
      )}

      {!loading && !showForm && !myTeam && (
        <div style={{ color: '#B1A7A6', fontSize: '0.9rem', marginTop: '1rem', padding: '1rem', background: 'rgba(255, 183, 3, 0.05)', borderRadius: '4px' }}>
          Ready to add your team. Click the button above.
        </div>
      )}

      {showForm && (
        <form onSubmit={handleSubmit}>
          {/* Team Name */}
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{
              display: 'block',
              marginBottom: '0.5rem',
              color: '#FFB703',
              fontWeight: 'bold',
            }}>
              Team Name
            </label>
            <input
              type="text"
              value={teamName}
              onChange={(e) => setTeamName(e.target.value)}
              placeholder="Enter team name"
              style={{
                width: '100%',
                padding: '0.8rem',
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 183, 3, 0.3)',
                borderRadius: '6px',
                color: '#F5F3F4',
                fontFamily: 'Courier Prime, monospace',
                boxSizing: 'border-box',
              }}
            />
          </div>

          {/* Members */}
          <div style={{ marginBottom: '1.5rem' }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '1rem',
            }}>
              <label style={{
                color: '#FFB703',
                fontWeight: 'bold',
              }}>
                Team Members
                {event?.minTeamSize && event?.maxTeamSize && (
                  <span style={{ 
                    color: '#B1A7A6', 
                    fontWeight: 'normal',
                    fontSize: '0.9rem',
                    marginLeft: '0.5rem'
                  }}>
                    ({event.minTeamSize}-{event.maxTeamSize} members)
                  </span>
                )}
              </label>
              <button
                type="button"
                onClick={addMember}
                style={{
                  background: 'rgba(255, 183, 3, 0.2)',
                  border: '1px solid #FFB703',
                  color: '#FFB703',
                  padding: '0.5rem 1rem',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontFamily: 'Courier Prime, monospace',
                  fontSize: '0.9rem',
                  fontWeight: 'bold',
                }}
              >
                + Add Member
              </button>
            </div>

            {members.map((member, index) => (
              <div
                key={index}
                style={{
                  display: 'grid',
                  gridTemplateColumns: index === 0 ? '1fr 1fr' : '1fr 1fr 40px',
                  gap: '1rem',
                  marginBottom: '1rem',
                  alignItems: 'flex-end',
                }}
              >
                <input
                  type="text"
                  placeholder="Member name"
                  value={member.name}
                  disabled={index === 0}
                  onChange={(e) => updateMember(index, 'name', e.target.value)}
                  style={{
                    padding: '0.8rem',
                    background: index === 0 ? 'rgba(255, 183, 3, 0.1)' : 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid rgba(255, 183, 3, 0.3)',
                    borderRadius: '6px',
                    color: '#F5F3F4',
                    fontFamily: 'Courier Prime, monospace',
                    boxSizing: 'border-box',
                    cursor: index === 0 ? 'not-allowed' : 'text',
                  }}
                />
                <input
                  type="email"
                  placeholder="Email (optional)"
                  value={member.email}
                  disabled={index === 0}
                  onChange={(e) => updateMember(index, 'email', e.target.value)}
                  style={{
                    padding: '0.8rem',
                    background: index === 0 ? 'rgba(255, 183, 3, 0.1)' : 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid rgba(255, 183, 3, 0.3)',
                    borderRadius: '6px',
                    color: '#F5F3F4',
                    fontFamily: 'Courier Prime, monospace',
                    boxSizing: 'border-box',
                    cursor: index === 0 ? 'not-allowed' : 'text',
                  }}
                />
                {index !== 0 && (
                  <button
                    type="button"
                    onClick={() => removeMember(index)}
                    style={{
                      background: 'rgba(217, 4, 41, 0.3)',
                      border: '1px solid #D90429',
                      color: '#D90429',
                      padding: '0.8rem',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      fontWeight: 'bold',
                    }}
                  >
                    ✕
                  </button>
                )}
              </div>
            ))}
            {members.length > 0 && (
              <p style={{ color: '#B1A7A6', fontSize: '0.85rem', marginTop: '0.5rem' }}>
                Leader (you) - cannot be removed
              </p>
            )}
          </div>

          {/* Error and Success Messages */}
          {error && (
            <div style={{
              background: 'rgba(217, 4, 41, 0.2)',
              border: '1px solid #D90429',
              color: '#FF6B6B',
              padding: '1rem',
              borderRadius: '6px',
              marginBottom: '1rem',
              fontSize: '0.9rem',
            }}>
              {error}
            </div>
          )}

          {success && (
            <div style={{
              background: 'rgba(76, 175, 80, 0.2)',
              border: '1px solid #4CAF50',
              color: '#4CAF50',
              padding: '1rem',
              borderRadius: '6px',
              marginBottom: '1rem',
              fontSize: '0.9rem',
            }}>
              {success}
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={submitting}
            style={{
              width: '100%',
              padding: '1rem',
              background: submitting
                ? 'rgba(255, 183, 3, 0.3)'
                : 'linear-gradient(135deg, #FFB703, #FFA500)',
              color: '#0B090A',
              border: 'none',
              borderRadius: '6px',
              fontFamily: 'Bebas Neue, sans-serif',
              fontSize: '1.1rem',
              fontWeight: 'bold',
              letterSpacing: '1px',
              cursor: submitting ? 'not-allowed' : 'pointer',
              transition: 'all 0.3s ease',
            }}
            onMouseEnter={(e) => {
              if (!submitting) {
                e.target.style.transform = 'translateY(-2px)';
                e.target.style.boxShadow = '0 8px 20px rgba(255, 183, 3, 0.4)';
              }
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = 'none';
            }}
          >
            {submitting
              ? 'REGISTERING...'
              : myTeam
                ? 'UPDATE TEAM'
                : 'REGISTER TEAM'}
          </button>
        </form>
      )}
    </div>
  );
}
