"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { formatDateDDMMYYYY } from "@/lib/date";

export default function AdminDashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [expandedEvent, setExpandedEvent] = useState(null);

  useEffect(() => {
    async function fetchDashboardData() {
      try {
        const res = await fetch("/api/admin/dashboard");
        if (res.ok) {
          const dashboardData = await res.json();
          setData(dashboardData);
        }
      } catch (error) {
        console.error("Failed to fetch dashboard data:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchDashboardData();
  }, []);

  const toggleEventDetails = (eventId) => {
    setExpandedEvent(expandedEvent === eventId ? null : eventId);
  };

  const exportToExcel = (event) => {
    if (event.registeredUsers.length === 0) {
      alert('No registrations to export');
      return;
    }

    // Create CSV content - Only Name and Registration Number
    const headers = ['Name', 'Registration Number'];
    const rows = event.registeredUsers.map(user => [
      user.name,
      user.registrationNumber // Email is used as registration number
    ]);

    let csvContent = headers.join(',') + '\n';
    rows.forEach(row => {
      csvContent += row.map(cell => `"${cell}"`).join(',') + '\n';
    });

    // Create blob and download
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `${event.title.replace(/\s+/g, '_')}_registrations.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (loading) {
    return (
      <main className="page-shell">
        <p className="muted">Loading dashboard...</p>
      </main>
    );
  }

  return (
    <main className="page-shell">
      <section className="hero">
        <p className="chip">Admin Dashboard</p>
        <h1>Admin Portal</h1>
        <p className="muted">Manage the fest and view analytics.</p>
      </section>

      {data && (
        <section className="section">
          <div className="stats-grid">
            <div className="stat-card">
              <h3 className="stat-number">{data.totalUsers}</h3>
              <p className="stat-label">Total Users</p>
            </div>
            <div className="stat-card">
              <h3 className="stat-number">{data.totalRegistrations}</h3>
              <p className="stat-label">Total Registrations</p>
            </div>
            <div className="stat-card">
              <h3 className="stat-number">{data.events.length}</h3>
              <p className="stat-label">Total Events</p>
            </div>
          </div>
        </section>
      )}

      <section className="section">
        <h2 className="section-title">Event Registrations</h2>
        <div className="events-dashboard">
          {data?.events.map((event) => (
            <div key={event.id} className="event-card-dashboard">
              <div
                className="event-header-dashboard"
                onClick={() => toggleEventDetails(event.id)}
              >
                <div>
                  <h3>{event.title}</h3>
                  <div className="pill-row" style={{ marginTop: "0.5rem" }}>
                    <span className="chip-small">{formatDateDDMMYYYY(event.date)}</span>
                    <span className="chip-small">{event.venue || "TBA"}</span>
                  </div>
                </div>
                <div className="event-stats">
                  <button
                    className="btn-export"
                    onClick={(e) => {
                      e.stopPropagation();
                      exportToExcel(event);
                    }}
                    disabled={event.registrationCount === 0}
                    title="Export to Excel"
                  >
                    ↓ Export
                  </button>
                  <span className="registration-count">
                    {event.registrationCount} {event.registrationCount === 1 ? "Registration" : "Registrations"}
                  </span>
                  <span className="expand-icon">
                    {expandedEvent === event.id ? "−" : "+"}
                  </span>
                </div>
              </div>

              {expandedEvent === event.id && (
                <div className="event-details-dashboard">
                  {event.registeredUsers.length === 0 ? (
                    <p className="muted">No registrations yet.</p>
                  ) : (
                    <div className="users-table">
                      <table>
                        <thead>
                          <tr>
                            <th>Name</th>
                            <th>Registration Number</th>
                          </tr>
                        </thead>
                        <tbody>
                          {event.registeredUsers.map((user) => (
                            <tr key={user.id}>
                              <td>{user.name}</td>
                              <td>{user.registrationNumber}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}

          {data?.events.length === 0 && (
            <p className="muted">No events found.</p>
          )}
        </div>
      </section>
    </main>
  );
}
