"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { GoogleLogin } from "@react-oauth/google";
import { formatDateDDMMYYYY } from "@/lib/date";

const SECTION_LABELS = {
  OVERVIEW: 'Overview',
  ELIGIBILITY: 'Eligibility',
  TEAM_COMPOSITION: 'Team Composition',
  EVENT_FLOW: 'Event Flow',
  JUDGING_CRITERIA: 'Judging Criteria',
  DURATION: 'Duration',
  PRIZE: 'Prize',
  PRECAUTION: 'Precaution'
};

export default function EventDetailPage() {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [rules, setRules] = useState([]);
  const [loading, setLoading] = useState(true);
  const [registering, setRegistering] = useState(false);
  const [registerError, setRegisterError] = useState("");
  const [registerSuccess, setRegisterSuccess] = useState(false);
  const [popup, setPopup] = useState(null);
  const [openSection, setOpenSection] = useState(null);
  const [showGoogleLogin, setShowGoogleLogin] = useState(false);
  const [userId, setUserId] = useState(null);
  
  // Team management states
  const [teamName, setTeamName] = useState("");
  const [teamMembers, setTeamMembers] = useState([{ name: "", email: "" }]);
  const [myTeam, setMyTeam] = useState(null);
  const [teamLoading, setTeamLoading] = useState(false);
  const [teamError, setTeamError] = useState("");
  const [teamSuccess, setTeamSuccess] = useState("");
  const [editTeamMode, setEditTeamMode] = useState(false);

  const showPopup = (type, title, message) => {
    setPopup({ type, title, message });
  };

  const closePopup = () => {
    setPopup(null);
  };

  useEffect(() => {
    async function fetchEvent() {
      setLoading(true);
      try {
        const res = await fetch(`/api/admin/events/${id}`, { cache: "no-store" });
        if (!res.ok) {
          setEvent(null);
        } else {
          const data = await res.json();
          setEvent(data);
        }
      } catch (err) {
        setEvent(null);
      } finally {
        setLoading(false);
      }
    }

    async function fetchRules() {
      try {
        const res = await fetch(`/api/admin/events/${id}/rules`);
        if (res.ok) {
          const data = await res.json();
          setRules(data);
        }
      } catch (err) {
        console.error('Failed to fetch rules:', err);
      }
    }

    if (id) {
      fetchEvent();
      fetchRules();
    }
  }, [id]);

  // Separate useEffect to load user ID from localStorage
  useEffect(() => {
    // Get user ID from localStorage
    try {
      const user = localStorage.getItem('user');
      console.log('Loading user from localStorage:', user);
      if (user) {
        const userData = JSON.parse(user);
        console.log('Parsed user data:', userData);
        setUserId(userData.id);
      } else {
        console.log('No user found in localStorage');
      }
    } catch (err) {
      console.error('Failed to get user from localStorage:', err);
    }
  }, [registerSuccess]); // Re-run when registration succeeds

  // Fetch user's team if they registered for a group event
  useEffect(() => {
    async function fetchMyTeam() {
      if (!userId || !event?.isGroupEvent || !registerSuccess) return;
      
      setTeamLoading(true);
      setTeamError("");
      try {
        const res = await fetch(`/api/events/${id}/teams?leaderId=${userId}`);
        if (res.ok) {
          const teams = await res.json();
          console.log('Fetched teams:', teams);
          if (teams && teams.length > 0) {
            const team = teams[0];
            setMyTeam(team);
            setTeamName(team.name);
            setTeamMembers(team.members.map(m => ({ name: m.name, registrationNumber: m.registrationNumber || "" })));
          } else {
            // Initialize with leader's info from localStorage
            try {
              const userStr = localStorage.getItem('user');
              const userData = userStr ? JSON.parse(userStr) : {};
              console.log('Initializing with user data:', userData);
              
              // Extract registration number from email by removing @nitjsr.ac.in
              const registrationNumber = userData.email ? userData.email.replace('@nitjsr.ac.in', '') : '';
              
              // Ensure leader name is properly set
              const leaderName = userData.name || '';
              console.log('Setting leader name:', leaderName, 'Registration:', registrationNumber);
              
              setTeamMembers([{ name: leaderName, registrationNumber: registrationNumber }]);
            } catch (err) {
              console.error('Failed to parse user data:', err);
              setTeamMembers([{ name: "", registrationNumber: "" }]);
            }
          }
        } else {
          const errData = await res.json();
          console.error('Failed to fetch teams:', errData);
          setTeamError(errData.error || "Failed to load team data");
        }
      } catch (err) {
        console.error('Failed to fetch team:', err);
        setTeamError("Failed to load team data");
      } finally {
        setTeamLoading(false);
      }
    }

    fetchMyTeam();
  }, [userId, event, registerSuccess, id]);

  const addTeamMember = () => {
    setTeamMembers([...teamMembers, { name: "", registrationNumber: "" }]);
  };

  const removeTeamMember = (index) => {
    if (teamMembers.length > 1 && index !== 0) {
      setTeamMembers(teamMembers.filter((_, i) => i !== index));
    }
  };

  const updateTeamMember = (index, field, value) => {
    const updated = [...teamMembers];
    updated[index][field] = value;
    setTeamMembers(updated);
  };

  const handleTeamSubmit = async (e) => {
    e.preventDefault();
    setTeamError("");
    setTeamSuccess("");
    setTeamLoading(true);

    try {
      if (!teamName.trim()) {
        setTeamError("Team name is required");
        setTeamLoading(false);
        return;
      }

      // Count additional members (excluding leader at index 0)
      const additionalMembers = teamMembers.slice(1).filter(m => m.name.trim());
      // Always include the leader (index 0) in total count
      const totalMembers = 1 + additionalMembers.length;
      
      console.log('Team submission - Members breakdown:');
      console.log('Total members (1 leader + additional):', totalMembers);
      console.log('Additional members:', additionalMembers.length);
      teamMembers.forEach((m, idx) => {
        console.log(`  Member ${idx}: name="${m.name}", regNum="${m.registrationNumber}"`);
      });
      
      // Validation: check min/max team size
      if (event.minTeamSize && totalMembers < event.minTeamSize) {
        const requiredAdditional = event.minTeamSize - 1;
        setTeamError(`Team requires minimum ${event.minTeamSize} members total. You have 1 leader + ${additionalMembers.length} additional = ${totalMembers} total. Need ${requiredAdditional - additionalMembers.length} more member(s).`);
        setTeamLoading(false);
        return;
      }

      if (event.maxTeamSize && totalMembers > event.maxTeamSize) {
        setTeamError(`Team can have maximum ${event.maxTeamSize} members total. You have 1 leader + ${additionalMembers.length} additional = ${totalMembers} total. Please remove ${totalMembers - event.maxTeamSize} member(s).`);
        setTeamLoading(false);
        return;
      }

      // Prepare members for submission (always include leader even if name is empty)
      const membersToSubmit = teamMembers.map((m, idx) => ({
        name: m.name || (idx === 0 ? 'Team Leader' : ''),
        registrationNumber: m.registrationNumber
      })).filter(m => m.name.trim());
      
      if (membersToSubmit.length === 0) {
        setTeamError("At least one team member is required");
        setTeamLoading(false);
        return;
      }

      const method = myTeam ? "PUT" : "POST";
      const url = myTeam ? `/api/events/${id}/teams/${myTeam.id}` : `/api/events/${id}/group-register`;

      console.log(`Submitting team to ${url} with method ${method}:`, { teamName, members: membersToSubmit });

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          teamName: teamName,
          members: membersToSubmit,
        }),
      });

      const data = await res.json();
      console.log('Team submission response:', { status: res.status, data });

      if (!res.ok) {
        setTeamError(data.error || "Failed to save team");
        setTeamLoading(false);
        return;
      }

      setMyTeam(data.team || data);
      setTeamSuccess(myTeam ? "Team updated successfully!" : "Team created successfully!");
      setTimeout(() => setTeamSuccess(""), 3000);
    } catch (err) {
      console.error('Team submission error:', err);
      setTeamError("Failed to save team. Please try again.");
    } finally {
      setTeamLoading(false);
    }
  };

  async function handleRegister() {
    setRegisterError("");
    setRegisterSuccess(false);
    setRegistering(true);
    try {
      const res = await fetch(`/api/events/${id}/register`, {
        method: "POST",
      });
      if (res.status === 401) {
        setRegisterError("Please sign in to register.");
        setShowGoogleLogin(true);
      } else if (res.status === 409) {
        setRegisterError("You are already registered for this event.");
        showPopup("warning", "Already Registered", "You are already registered for this event.");
      } else if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setRegisterError(data.message || "Registration failed. Try again.");
        showPopup("error", "Registration Failed", data.message || "Registration failed. Please try again.");
      } else {
        // Fetch user info if not in localStorage
        if (!userId) {
          try {
            const userRes = await fetch('/api/auth/me');
            if (userRes.ok) {
              const userData = await userRes.json();
              localStorage.setItem('user', JSON.stringify(userData));
              setUserId(userData.id);
            }
          } catch (err) {
            console.error('Failed to fetch user info:', err);
          }
        }
        
        setRegisterSuccess(true);
        showPopup("success", "Success", "Registration successful! You are now registered for this event.");
      }
    } catch (err) {
      setRegisterError("Network error. Please try again.");
    } finally {
      setRegistering(false);
    }
  }

  if (loading) return <p className="muted page-shell">Loading event...</p>;
  if (!event) return <p className="muted page-shell">Event not found.</p>;

  const toggleSection = (section) => {
    setOpenSection(openSection === section ? null : section);
  };

  return (
    <main className="page-shell">
      <section className="section-header" style={{ marginBottom: "1.5rem" }}>
        <div>
          <p className="chip">Event</p>
          <h2 className="section-title">{event.title}</h2>
          <p className="muted" style={{ maxWidth: 640 }}>
            {event.description}
          </p>
        </div>
      </section>

      <section className="card" style={{ padding: "1rem" }}>
        <div className="pill-row" style={{ marginBottom: "0.8rem" }}>
          <span className="chip">{formatDateDDMMYYYY(event.date)}</span>
          <span className="chip">Venue: {event.venue || "TBA"}</span>
        </div>

        <div className="pill-row" style={{ marginTop: "0.8rem" }}>
          {!event.isGroupEvent ? (
            <button
              className="btn primary"
              onClick={handleRegister}
              disabled={registering || registerSuccess}
            >
              {registerSuccess ? "Registered" : registering ? "Registering..." : "Register"}
            </button>
          ) : (
            <button
              className="btn primary"
              onClick={handleRegister}
              disabled={registering || registerSuccess}
            >
              {registerSuccess ? "Registered as Leader" : registering ? "Registering..." : "Register as Team Leader"}
            </button>
          )}
          <Link className="btn secondary" href={`/events/${id}/leaderboard`}>View Leaderboard</Link>
        </div>

        {registerError && (
          <div className="form-error" style={{ marginTop: "0.8rem" }}>{registerError}</div>
        )}
        {registerSuccess && (
          <div className="form-success" style={{ marginTop: "0.8rem" }}>
            {event.isGroupEvent ? "Registered! Add your team below." : "You have successfully registered!"}
          </div>
        )}
      </section>

      {/* Team Creation Section - Only for group events after registration */}
      {event.isGroupEvent && registerSuccess && userId && (
        <section className="card" style={{ padding: "2rem", marginTop: "1.5rem" }}>
          {myTeam ? (
            <>
              <h3 style={{ margin: "0 0 1rem 0", color: "#FFB703" }}>👥 Your Team</h3>
              {!editTeamMode && (
                <>
                  <div style={{ background: "rgba(255, 183, 3, 0.05)", border: "1px solid rgba(255, 183, 3, 0.2)", borderRadius: "8px", padding: "1.5rem", marginBottom: "1.5rem" }}>
                    <h4 style={{ margin: "0 0 1rem 0", color: "#FFB703" }}>{myTeam.name}</h4>
                    <p style={{ margin: "0.5rem 0", color: "#B1A7A6" }}>
                      <strong>Team Leader:</strong> {myTeam.leader?.name}
                    </p>
                    <p style={{ margin: "0.5rem 0", color: "#B1A7A6" }}>
                      <strong>Members:</strong> {myTeam.members?.length || 0} additional member{myTeam.members?.length !== 1 ? 's' : ''}
                    </p>
                    {myTeam.members && myTeam.members.length > 0 && (
                      <div style={{ marginTop: "1rem", paddingTop: "1rem", borderTop: "1px solid rgba(255, 183, 3, 0.2)" }}>
                        <p style={{ margin: "0 0 0.5rem 0", color: "#FFB703", fontSize: "0.9rem" }}>Team Members:</p>
                        <ul style={{ margin: "0", paddingLeft: "1.5rem", color: "#B1A7A6" }}>
                          {myTeam.members.map((m, idx) => (
                            <li key={idx} style={{ marginBottom: "0.3rem" }}>
                              {m.name}
                              {m.registrationNumber && <span style={{ color: "#999", fontSize: "0.9rem" }}> ({m.registrationNumber})</span>}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                  <button
                    type="button"
                    onClick={() => setEditTeamMode(true)}
                    style={{
                      padding: "0.8rem 1.5rem",
                      background: "#FFB703",
                      color: "#0B090A",
                      border: "none",
                      borderRadius: "6px",
                      cursor: "pointer",
                      fontWeight: "bold",
                      fontSize: "1rem",
                    }}
                  >
                    ✏️ Edit Team
                  </button>
                </>
              )}
              {editTeamMode && (
                <>
                  <p style={{ margin: "0 0 1.5rem 0", color: "#B1A7A6" }}>
                    Update your team information below.
                  </p>
                  <button
                    type="button"
                    onClick={() => setEditTeamMode(false)}
                    style={{
                      padding: "0.5rem 1rem",
                      background: "rgba(217, 4, 41, 0.2)",
                      border: "1px solid #D90429",
                      borderRadius: "4px",
                      color: "#D90429",
                      cursor: "pointer",
                      fontWeight: "bold",
                      marginBottom: "1.5rem",
                    }}
                  >
                    ✕ Cancel
                  </button>
                  {renderTeamForm()}
                </>
              )}
            </>
          ) : (
            <>
              <h3 style={{ margin: "0 0 1rem 0", color: "#FFB703" }}>👥 Create Your Team</h3>
              <p style={{ margin: "0 0 1.5rem 0", color: "#B1A7A6" }}>
                Add your team members below. You (the leader) will be added automatically.
              </p>
              {renderTeamForm()}
            </>
          )}
        </section>
      )}

      {/* Rulebook Section */}
      {rules.length > 0 && (
        <section className="card" style={{ padding: "1rem", marginTop: "1.5rem" }}>
          <h3 style={{ margin: "0 0 1rem 0" }}>📖 Event Rulebook</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
            {rules.map((rule) => (
              <div key={rule.id} className="card" style={{ padding: "0.8rem" }}>
                <button
                  onClick={() => toggleSection(rule.section)}
                  style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    padding: 0,
                    color: "inherit",
                    fontSize: "1rem",
                    fontWeight: "600"
                  }}
                >
                  <span>{SECTION_LABELS[rule.section] || rule.section}</span>
                  <span style={{ fontSize: "1.2rem" }}>
                    {openSection === rule.section ? "▲" : "▼"}
                  </span>
                </button>
                {openSection === rule.section && (
                  <div 
                    style={{ 
                      marginTop: "0.8rem", 
                      paddingTop: "0.8rem", 
                      borderTop: "1px solid rgba(255,255,255,0.1)",
                      whiteSpace: "pre-wrap",
                      lineHeight: "1.6",
                      color: "#B1A7A6"
                    }}
                  >
                    {rule.content.split(/(\*\*[^*]+\*\*)/g).map((part, idx) => {
                      if (part.startsWith('**') && part.endsWith('**')) {
                        return (
                          <strong key={idx} style={{ color: "#FFB703", fontWeight: "700" }}>
                            {part.slice(2, -2)}
                          </strong>
                        );
                      }
                      return <span key={idx}>{part}</span>;
                    })}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Google Login Modal */}
      {showGoogleLogin && (
        <div className="popup-overlay" onClick={() => setShowGoogleLogin(false)}>
          <div className="popup popup-warning" onClick={(e) => e.stopPropagation()}>
            <h3 className="popup-title">Sign In Required</h3>
            <p className="popup-message">Please sign in with your official email to register for this event.</p>
            <div style={{ marginTop: "1.5rem", display: "flex", justifyContent: "center" }}>
              <GoogleLogin
                onSuccess={(credentialResponse) => {
                  setShowGoogleLogin(false);
                  fetch("/api/auth/google", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                      token: credentialResponse.credential
                    })
                  }).then(async (res) => {
                    const data = await res.json();
                    if (data.error === "Not an official email") {
                      showPopup("warning", "Invalid Email", "This is not an official mail ID. Please use your official email to register.");
                    } else if (res.ok) {
                      showPopup("success", "Success", "Successfully signed in! Registering for event...");
                      setTimeout(() => {
                        handleRegister();
                      }, 1000);
                    }
                  });
                }}
                onError={() => {
                  showPopup("error", "Login Failed", "Failed to sign in with Google. Please try again.");
                }}
              />
            </div>
            <div className="popup-actions">
              <button className="btn secondary" onClick={() => setShowGoogleLogin(false)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {popup && (
        <div className="popup-overlay" onClick={closePopup}>
          <div className={`popup popup-${popup.type}`} onClick={(e) => e.stopPropagation()}>
            <h3 className="popup-title">{popup.title}</h3>
            <p className="popup-message">{popup.message}</p>
            <div className="popup-actions">
              <button className="btn primary" onClick={closePopup}>
                OK
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );

  function renderTeamForm() {
    return (
      <>
        {teamLoading ? (
          <div style={{ padding: "2rem", textAlign: "center", color: "#FFB703" }}>
            Loading team data...
          </div>
        ) : (
          <form onSubmit={handleTeamSubmit}>
            {/* Team Name */}
            <div style={{ marginBottom: "1.5rem" }}>
              <label style={{ display: "block", marginBottom: "0.5rem", color: "#FFB703", fontWeight: "bold" }}>
                Team Name *
              </label>
              <input
                type="text"
                value={teamName}
                onChange={(e) => setTeamName(e.target.value)}
                placeholder="Enter your team name"
                style={{
                  width: "100%",
                  padding: "0.8rem",
                  background: "rgba(255, 255, 255, 0.05)",
                  border: "1px solid rgba(255, 183, 3, 0.3)",
                  borderRadius: "6px",
                  color: "#F5F3F4",
                  fontSize: "1rem",
                }}
                required
              />
            </div>

            {/* Team Members */}
            <div style={{ marginBottom: "1.5rem" }}>
              <label style={{ display: "block", marginBottom: "0.8rem", color: "#FFB703", fontWeight: "bold" }}>
                Team Members *
              </label>
              {teamMembers.map((member, index) => (
                <div key={index} style={{ marginBottom: "1rem", padding: "1rem", background: "rgba(255, 183, 3, 0.05)", borderRadius: "6px", border: "1px solid rgba(255, 183, 3, 0.2)" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.5rem" }}>
                    <span style={{ color: "#FFB703", fontWeight: "bold" }}>
                      {index === 0 ? "👑 Leader (You)" : `Member ${index + 1}`}
                    </span>
                    {index !== 0 && (
                      <button
                        type="button"
                        onClick={() => removeTeamMember(index)}
                        style={{
                          padding: "0.3rem 0.8rem",
                          background: "rgba(217, 4, 41, 0.2)",
                          border: "1px solid #D90429",
                          borderRadius: "4px",
                          color: "#D90429",
                          cursor: "pointer",
                          fontSize: "0.85rem",
                        }}
                      >
                        Remove
                      </button>
                    )}
                  </div>
                  <input
                    type="text"
                    value={member.name}
                    onChange={(e) => updateTeamMember(index, "name", e.target.value)}
                    placeholder="Full Name"
                    disabled={index === 0}
                    style={{
                      width: "100%",
                      padding: "0.6rem",
                      marginBottom: "0.5rem",
                      background: index === 0 ? "rgba(255, 255, 255, 0.02)" : "rgba(255, 255, 255, 0.05)",
                      border: "1px solid rgba(255, 183, 3, 0.3)",
                      borderRadius: "4px",
                      color: "#F5F3F4",
                      cursor: index === 0 ? "not-allowed" : "text",
                    }}
                  />
                  {index === 0 && !member.name?.trim() && (
                    <p style={{ margin: "0.3rem 0 0.5rem 0", color: "#D90429", fontSize: "0.8rem" }}>⚠️ Leader name not loaded. Please refresh the page.</p>
                  )}
                  <input
                    type="text"
                    value={member.registrationNumber}
                    onChange={(e) => updateTeamMember(index, "registrationNumber", e.target.value)}
                    placeholder="Registration Number (optional)"
                    disabled={index === 0}
                    style={{
                      width: "100%",
                      padding: "0.6rem",
                      background: index === 0 ? "rgba(255, 255, 255, 0.02)" : "rgba(255, 255, 255, 0.05)",
                      border: "1px solid rgba(255, 183, 3, 0.3)",
                      borderRadius: "4px",
                      color: "#F5F3F4",
                      cursor: index === 0 ? "not-allowed" : "text",
                    }}
                  />
                </div>
              ))}
              <button
                type="button"
                onClick={addTeamMember}
                disabled={event?.maxTeamSize && teamMembers.length >= event.maxTeamSize}
                style={{
                  width: "100%",
                  padding: "0.8rem",
                  background: event?.maxTeamSize && teamMembers.length >= event.maxTeamSize ? "rgba(255, 183, 3, 0.05)" : "rgba(255, 183, 3, 0.1)",
                  border: "1px dashed #FFB703",
                  borderRadius: "6px",
                  color: event?.maxTeamSize && teamMembers.length >= event.maxTeamSize ? "#999" : "#FFB703",
                  cursor: event?.maxTeamSize && teamMembers.length >= event.maxTeamSize ? "not-allowed" : "pointer",
                  fontSize: "1rem",
                }}
              >
                + Add Member {event?.maxTeamSize ? `(${teamMembers.length}/${event.maxTeamSize})` : ""}
              </button>
            </div>

            {/* Error/Success Messages */}
            {teamError && (
              <div style={{ padding: "0.8rem", marginBottom: "1rem", background: "rgba(217, 4, 41, 0.1)", border: "1px solid #D90429", borderRadius: "6px", color: "#D90429" }}>
                {teamError}
              </div>
            )}
            {teamSuccess && (
              <div style={{ padding: "0.8rem", marginBottom: "1rem", background: "rgba(76, 175, 80, 0.1)", border: "1px solid #4CAF50", borderRadius: "6px", color: "#4CAF50" }}>
                {teamSuccess}
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={teamLoading}
              style={{
                width: "100%",
                padding: "1rem",
                background: "#FFB703",
                border: "none",
                borderRadius: "6px",
                color: "#0B090A",
                fontSize: "1.1rem",
                fontWeight: "bold",
                cursor: teamLoading ? "not-allowed" : "pointer",
                opacity: teamLoading ? 0.6 : 1,
              }}
            >
              {teamLoading ? "Saving..." : myTeam ? "Update Team" : "Create Team"}
            </button>
            {myTeam && editTeamMode && (
              <button
                type="button"
                onClick={() => setEditTeamMode(false)}
                style={{
                  width: "100%",
                  padding: "0.8rem",
                  marginTop: "0.5rem",
                  background: "rgba(217, 4, 41, 0.2)",
                  border: "1px solid #D90429",
                  borderRadius: "6px",
                  color: "#D90429",
                  cursor: "pointer",
                  fontWeight: "bold",
                }}
              >
                ✕ Cancel
              </button>
            )}
          </form>
        )}
      </>
    );
  }
}
