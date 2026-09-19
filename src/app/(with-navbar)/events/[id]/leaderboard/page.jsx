'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';

export default function EventLeaderboardPage() {
  const { id: eventId } = useParams();
  
  const [event, setEvent] = useState(null);
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchData() {
      setError('');
      setLoading(true);
      
      try {
        const eventRes = await fetch(`/api/admin/events/${eventId}`);
        if (!eventRes.ok) {
          setError('Event not found');
          setLoading(false);
          return;
        }
        const eventData = await eventRes.json();
        setEvent(eventData);

        const leaderboardRes = await fetch(`/api/leaderboard/${eventId}`);
        if (leaderboardRes.ok) {
          const leaderboardData = await leaderboardRes.json();
          setLeaderboard(leaderboardData);
        }
      } catch (err) {
        setError('Failed to load data');
      }
      setLoading(false);
    }
    fetchData();
  }, [eventId]);

  const getRankDisplay = (rank) => {
    if (rank === 1) return '👑';
    if (rank === 2) return '🥈';
    if (rank === 3) return '🥉';
    return `#${rank}`;
  };

  const getRankStyle = (rank) => {
    if (rank === 1) {
      return {
        background: 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)',
        boxShadow: '0 0 20px rgba(255, 215, 0, 0.4), inset 0 2px 4px rgba(255, 255, 255, 0.3)',
        border: '2px solid #FFD700',
      };
    }
    if (rank === 2) {
      return {
        background: 'linear-gradient(135deg, #C0C0C0 0%, #808080 100%)',
        boxShadow: '0 0 15px rgba(192, 192, 192, 0.3), inset 0 2px 4px rgba(255, 255, 255, 0.2)',
        border: '2px solid #C0C0C0',
      };
    }
    if (rank === 3) {
      return {
        background: 'linear-gradient(135deg, #CD7F32 0%, #8B4513 100%)',
        boxShadow: '0 0 15px rgba(205, 127, 50, 0.3), inset 0 2px 4px rgba(255, 255, 255, 0.2)',
        border: '2px solid #CD7F32',
      };
    }
    return {
      background: 'rgba(255, 183, 3, 0.05)',
      border: '1px solid rgba(255, 183, 3, 0.2)',
      boxShadow: 'none',
    };
  };

  if (loading) return <p className="muted page-shell">DECRYPTING RANKINGS...</p>;
  if (!event) return <p className="muted page-shell">Event not found</p>;

  return (
    <main className="page-shell">
      {/* Classified Banner */}
      <div className="confidential-banner">
        ⚠ CLASSIFIED: MISSION RANKINGS ⚠
      </div>
      
      <section className="section-header" style={{ marginBottom: "2rem" }}>
        <div>
          <p className="chip" style={{ 
            background: '#D90429', 
            color: '#F5F3F4',
            fontFamily: 'Bebas Neue, sans-serif',
            letterSpacing: '2px'
          }}>
            TOP PERFORMERS
          </p>
          <h2 className="section-title" style={{ 
            fontFamily: 'Bebas Neue, sans-serif',
            color: '#FFB703',
            fontSize: '3rem',
            letterSpacing: '3px',
            textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)'
          }}>
            {event.title} - LEADERBOARD
          </h2>
          <p className="muted" style={{ 
            fontFamily: 'Courier Prime, monospace',
            fontSize: '1rem',
            color: '#B1A7A6'
          }}>
            MISSION STATUS:AQUIRED // OPERATIVES RANKED BY PERFORMANCE
          </p>
        </div>
      </section>

      {error && <p className="form-error">{error}</p>}

      {leaderboard.length === 0 ? (
        <div style={{
          padding: '3rem',
          textAlign: 'center',
          background: 'rgba(217, 4, 41, 0.05)',
          border: '1px dashed #D90429',
          borderRadius: '12px',
          fontFamily: 'Courier Prime, monospace'
        }}>
          <p className="muted" style={{ fontSize: '1.1rem' }}>
            NO RANKINGS AVAILABLE // MISSION IN PROGRESS
          </p>
        </div>
      ) : (
        <section style={{ marginTop: '2rem' }}>
          {(() => {
            const getRankGroup = (rank) => leaderboard.filter(entry => entry.rank === rank);
            const rank1Group = getRankGroup(1);
            const rank2Group = getRankGroup(2);
            const rank3Group = getRankGroup(3);

            return (
          <>
          {/* Top 3 Podium */}
          {leaderboard.length >= 1 && (rank1Group.length > 0 || rank2Group.length > 0 || rank3Group.length > 0) && (
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'flex-end',
              gap: '1rem',
              marginBottom: '3rem',
              flexWrap: 'wrap'
            }}>
              {/* 2nd Place Group */}
              {rank2Group.length > 0 && (
                <div style={{
                  ...getRankStyle(2),
                  padding: 'clamp(1rem, 5vw, 1.5rem)',
                  borderRadius: '12px',
                  textAlign: 'center',
                  minWidth: 'clamp(140px, 40vw, 200px)',
                  transform: 'translateY(20px)',
                  transition: 'all 0.3s ease',
                }}
                onMouseEnter={(e) => {
                  if (window.innerWidth > 768) {
                    e.currentTarget.style.transform = 'translateY(10px) scale(1.05)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (window.innerWidth > 768) {
                    e.currentTarget.style.transform = 'translateY(20px)';
                  }
                }}
                onTouchStart={(e) => {
                  e.currentTarget.style.transform = 'translateY(10px) scale(1.05)';
                }}
                onTouchEnd={(e) => {
                  e.currentTarget.style.transform = 'translateY(20px)';
                }}>
                  <div style={{ 
                    fontSize: 'clamp(2rem, 8vw, 3rem)',
                    marginBottom: '0.5rem'
                  }}>🥈</div>
                  {rank2Group.map((entry, idx) => (
                    <div key={entry.id} style={{ marginBottom: idx < rank2Group.length - 1 ? '1rem' : '0' }}>
                      {entry.teamName && (
                        <p style={{ 
                          fontFamily: 'Bebas Neue, sans-serif',
                          fontSize: 'clamp(0.85rem, 3vw, 1rem)',
                          color: '#0B090A',
                          marginBottom: '0.2rem',
                          letterSpacing: '1px',
                          opacity: 0.8
                        }}>
                          {entry.teamName}
                        </p>
                      )}
                      <h3 style={{ 
                        fontFamily: 'Bebas Neue, sans-serif',
                        fontSize: 'clamp(1.1rem, 4vw, 1.5rem)',
                        color: '#0B090A',
                        marginBottom: '0.3rem',
                        letterSpacing: '1px',
                        textShadow: '0 1px 2px rgba(255, 255, 255, 0.35)'
                      }}>{entry.name || entry.teamName || 'N/A'}</h3>
                      <p style={{ 
                        fontFamily: 'Courier Prime, monospace',
                        color: '#1E1E1E',
                        fontSize: 'clamp(0.75rem, 2.5vw, 0.9rem)',
                        marginBottom: idx < rank2Group.length - 1 ? '0.3rem' : '0'
                      }}>{entry.registrationNumber || '—'}</p>
                      {entry.teamMembers && entry.teamMembers.length > 0 && (
                        <div style={{ 
                          marginTop: '0.5rem',
                          paddingTop: '0.5rem',
                          borderTop: '1px solid rgba(0,0,0,0.1)',
                          fontSize: 'clamp(0.7rem, 2vw, 0.8rem)',
                          color: '#2C1810'
                        }}>
                          {entry.teamMembers.map((member, mIdx) => (
                            <div key={mIdx} style={{ marginBottom: '0.2rem' }}>
                              • {member.name} {member.registrationNumber && `(${member.registrationNumber})`}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                  {rank2Group[0]?.score !== null && rank2Group[0]?.score !== undefined && (
                    <div style={{
                      background: 'rgba(0, 0, 0, 0.08)',
                      padding: '0.5rem 1rem',
                      borderRadius: '8px',
                      fontFamily: 'Bebas Neue, sans-serif',
                      fontSize: 'clamp(1.2rem, 4vw, 1.8rem)',
                      color: '#0B090A',
                      border: '1px solid rgba(0, 0, 0, 0.12)',
                      marginTop: '0.5rem'
                    }}>
                      {rank2Group[0]?.score} PTS
                    </div>
                  )}
                </div>
              )}

              {/* 1st Place Group */}
              {rank1Group.length > 0 && (
                <div style={{
                  ...getRankStyle(1),
                  padding: 'clamp(1.5rem, 5vw, 2rem)',
                  borderRadius: '12px',
                  textAlign: 'center',
                  minWidth: 'clamp(150px, 45vw, 220px)',
                  transform: 'scale(1.1)',
                  transition: 'all 0.3s ease',
                }}
                onMouseEnter={(e) => {
                  if (window.innerWidth > 768) {
                    e.currentTarget.style.transform = 'scale(1.15)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (window.innerWidth > 768) {
                    e.currentTarget.style.transform = 'scale(1.1)';
                  }
                }}
                onTouchStart={(e) => {
                  e.currentTarget.style.transform = 'scale(1.15)';
                }}
                onTouchEnd={(e) => {
                  e.currentTarget.style.transform = 'scale(1.1)';
                }}>
                  <div style={{ 
                    fontSize: 'clamp(2.5rem, 10vw, 4rem)',
                    marginBottom: '0.5rem',
                    animation: 'pulse 2s ease-in-out infinite'
                  }}>👑</div>
                  {rank1Group.map((entry, idx) => (
                    <div key={entry.id} style={{ marginBottom: idx < rank1Group.length - 1 ? '1rem' : '0' }}>
                      {entry.teamName && (
                        <p style={{ 
                          fontFamily: 'Bebas Neue, sans-serif',
                          fontSize: 'clamp(0.9rem, 3.5vw, 1.1rem)',
                          color: '#0B090A',
                          marginBottom: '0.2rem',
                          letterSpacing: '1.5px',
                          opacity: 0.8
                        }}>
                          {entry.teamName}
                        </p>
                      )}
                      <h3 style={{ 
                        fontFamily: 'Bebas Neue, sans-serif',
                        fontSize: 'clamp(1.3rem, 5vw, 2rem)',
                        color: '#0B090A',
                        marginBottom: '0.3rem',
                        letterSpacing: '2px'
                      }}>{entry.name}</h3>
                      <p style={{ 
                        fontFamily: 'Courier Prime, monospace',
                        color: '#2C1810',
                        fontSize: 'clamp(0.75rem, 2.5vw, 0.9rem)',
                        marginBottom: idx < rank1Group.length - 1 ? '0.3rem' : '0'
                      }}>{entry.registrationNumber || '—'}</p>
                      {entry.teamMembers && entry.teamMembers.length > 0 && (
                        <div style={{ 
                          marginTop: '0.5rem',
                          paddingTop: '0.5rem',
                          borderTop: '1px solid rgba(0,0,0,0.15)',
                          fontSize: 'clamp(0.75rem, 2.5vw, 0.85rem)',
                          color: '#2C1810'
                        }}>
                          {entry.teamMembers.map((member, mIdx) => (
                            <div key={mIdx} style={{ marginBottom: '0.2rem' }}>
                              • {member.name} {member.registrationNumber && `(${member.registrationNumber})`}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                  {rank1Group[0]?.score !== null && rank1Group[0]?.score !== undefined && (
                    <div style={{
                      background: 'rgba(0, 0, 0, 0.2)',
                      padding: '0.7rem 1.2rem',
                      borderRadius: '8px',
                      fontFamily: 'Bebas Neue, sans-serif',
                      fontSize: 'clamp(1.5rem, 5vw, 2.2rem)',
                      color: '#0B090A',
                      marginTop: '0.5rem'
                    }}>
                      {rank1Group[0]?.score} PTS
                    </div>
                  )}
                </div>
              )}

              {/* 3rd Place Group */}
              {rank3Group.length > 0 && (
                <div style={{
                  ...getRankStyle(3),
                  padding: 'clamp(1rem, 5vw, 1.5rem)',
                  borderRadius: '12px',
                  textAlign: 'center',
                  minWidth: 'clamp(140px, 40vw, 200px)',
                  transform: 'translateY(20px)',
                  transition: 'all 0.3s ease',
                }}
                onMouseEnter={(e) => {
                  if (window.innerWidth > 768) {
                    e.currentTarget.style.transform = 'translateY(10px) scale(1.05)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (window.innerWidth > 768) {
                    e.currentTarget.style.transform = 'translateY(20px)';
                  }
                }}
                onTouchStart={(e) => {
                  e.currentTarget.style.transform = 'translateY(10px) scale(1.05)';
                }}
                onTouchEnd={(e) => {
                  e.currentTarget.style.transform = 'translateY(20px)';
                }}>
                  <div style={{ 
                    fontSize: 'clamp(2rem, 8vw, 3rem)',
                    marginBottom: '0.5rem'
                  }}>🥉</div>
                  {rank3Group.map((entry, idx) => (
                    <div key={entry.id} style={{ marginBottom: idx < rank3Group.length - 1 ? '1rem' : '0' }}>
                      {entry.teamName && (
                        <p style={{ 
                          fontFamily: 'Bebas Neue, sans-serif',
                          fontSize: 'clamp(0.85rem, 3vw, 1rem)',
                          color: '#0B090A',
                          marginBottom: '0.2rem',
                          letterSpacing: '1px',
                          opacity: 0.8
                        }}>
                          {entry.teamName}
                        </p>
                      )}
                      <h3 style={{ 
                        fontFamily: 'Bebas Neue, sans-serif',
                        fontSize: 'clamp(1.1rem, 4vw, 1.5rem)',
                        color: '#0B090A',
                        marginBottom: '0.3rem',
                        letterSpacing: '1px',
                        textShadow: '0 1px 2px rgba(255, 255, 255, 0.35)'
                      }}>{entry.name || entry.teamName || 'N/A'}</h3>
                      <p style={{ 
                        fontFamily: 'Courier Prime, monospace',
                        color: '#1E1E1E',
                        fontSize: 'clamp(0.75rem, 2.5vw, 0.9rem)',
                        marginBottom: idx < rank3Group.length - 1 ? '0.3rem' : '0'
                      }}>{entry.registrationNumber || '—'}</p>
                      {entry.teamMembers && entry.teamMembers.length > 0 && (
                        <div style={{ 
                          marginTop: '0.5rem',
                          paddingTop: '0.5rem',
                          borderTop: '1px solid rgba(0,0,0,0.1)',
                          fontSize: 'clamp(0.7rem, 2vw, 0.8rem)',
                          color: '#2C1810'
                        }}>
                          {entry.teamMembers.map((member, mIdx) => (
                            <div key={mIdx} style={{ marginBottom: '0.2rem' }}>
                              • {member.name} {member.registrationNumber && `(${member.registrationNumber})`}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                  {rank3Group[0]?.score !== null && rank3Group[0]?.score !== undefined && (
                    <div style={{
                      background: 'rgba(0, 0, 0, 0.08)',
                      padding: '0.5rem 1rem',
                      borderRadius: '8px',
                      fontFamily: 'Bebas Neue, sans-serif',
                      fontSize: 'clamp(1.2rem, 4vw, 1.8rem)',
                      color: '#0B090A',
                      border: '1px solid rgba(0, 0, 0, 0.12)',
                      marginTop: '0.5rem'
                    }}>
                      {rank3Group[0]?.score} PTS
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
          </>
            );
          })()}

          {/* Rest of the Rankings */}
          {leaderboard.length > 3 && (
            <div style={{ marginTop: '3rem' }}>
              <h3 style={{
                fontFamily: 'Bebas Neue, sans-serif',
                color: '#FFB703',
                fontSize: '1.8rem',
                letterSpacing: '2px',
                marginBottom: '1.5rem',
                textAlign: 'center'
              }}>
                █ REMAINING OPERATIVES
              </h3>
              <div style={{ 
                display: 'grid',
                gap: '1rem',
                gridTemplateColumns: 'repeat(auto-fit, minmax(clamp(150px, 100%, 300px), 1fr))'
              }}>
                {leaderboard.filter(entry => entry.rank > 3).map((entry) => (
                  <div 
                    key={entry.id}
                    style={{
                      ...getRankStyle(entry.rank),
                      padding: '1.2rem',
                      borderRadius: '8px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      transition: 'all 0.3s ease',
                      cursor: 'pointer'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateX(5px)';
                      e.currentTarget.style.boxShadow = '0 4px 12px rgba(255, 183, 3, 0.2)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateX(0)';
                      e.currentTarget.style.boxShadow = 'none';
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                      <div style={{
                        fontFamily: 'Bebas Neue, sans-serif',
                        fontSize: '1.8rem',
                        color: '#FFB703',
                        minWidth: '50px'
                      }}>
                        #{entry.rank}
                      </div>
                      <div>
                        {entry.teamName && (
                          <p style={{
                            fontFamily: 'Bebas Neue, sans-serif',
                            fontSize: '0.75rem',
                            color: '#B1A7A6',
                            marginBottom: '0.2rem',
                            opacity: 0.8
                          }}>
                            {entry.teamName}
                          </p>
                        )}
                        <h4 style={{
                          fontFamily: 'Bebas Neue, sans-serif',
                          fontSize: '1.3rem',
                          color: '#F5F3F4',
                          marginBottom: '0.2rem',
                          letterSpacing: '1px'
                        }}>
                          {entry.name || entry.teamName || 'N/A'}
                        </h4>
                        <p style={{
                          fontFamily: 'Courier Prime, monospace',
                          fontSize: '0.85rem',
                          color: '#B1A7A6'
                        }}>
                          ID: {entry.registrationNumber || 'CLASSIFIED'}
                        </p>
                        {entry.teamMembers && entry.teamMembers.length > 0 && (
                          <div style={{ 
                            marginTop: '0.4rem',
                            paddingTop: '0.4rem',
                            borderTop: '1px solid rgba(255,255,255,0.2)',
                            fontSize: '0.8rem',
                            color: '#B1A7A6'
                          }}>
                            {entry.teamMembers.map((member, mIdx) => (
                              <div key={mIdx} style={{ marginBottom: '0.1rem' }}>
                                • {member.name} {member.registrationNumber && `(${member.registrationNumber})`}
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                    {entry.score !== null && entry.score !== undefined && (
                      <div style={{
                        background: 'rgba(255, 183, 3, 0.15)',
                        padding: '0.5rem 1rem',
                        borderRadius: '6px',
                        fontFamily: 'Bebas Neue, sans-serif',
                        fontSize: '1.5rem',
                        color: '#FFB703',
                        border: '1px solid rgba(255, 183, 3, 0.3)'
                      }}>
                        {entry.score}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </section>
      )}

      <style jsx>{`
        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.1); }
        }
      `}</style>
    </main>
  );
}
