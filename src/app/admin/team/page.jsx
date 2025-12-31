'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminTeamPage() {
  const router = useRouter();

  const [teamMembers, setTeamMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    position: '',
    batch: '',
    domain: '',
    email: '',
    linkedinProfile: '',
    photograph: ''
  });
  const [photoPreview, setPhotoPreview] = useState(null);
  const [photoUploading, setPhotoUploading] = useState(false);

  useEffect(() => {
    fetchTeamMembers();
  }, []);

  async function fetchTeamMembers() {
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/team');
      if (!res.ok) throw new Error('Failed to load team members');
      setTeamMembers(await res.json());
    } catch (err) {
      setError(err.message || 'Failed to load team members');
    }
    setLoading(false);
  }

  async function handleAddMember(e) {
    e.preventDefault();
    setSaving(true);
    setError('');

    // If a file is chosen in the file input, upload it first
    const fileInput = document.getElementById('photographFile');
    const file = fileInput?.files?.[0] || null;
    let photoUrl = formData.photograph || null;
    if (file) {
      try {
        setPhotoUploading(true);
        const fd = new FormData();
        fd.append('file', file);
        fd.append('folder', 'spie/team');
        const uploadRes = await fetch('/api/uploads/image', { method: 'POST', body: fd });
        const uploadData = await uploadRes.json();
        if (!uploadRes.ok) throw new Error(uploadData.error || 'Image upload failed');
        photoUrl = uploadData.url;
      } catch (err) {
        setError(err.message || 'Image upload failed');
        setSaving(false);
        setPhotoUploading(false);
        return;
      } finally {
        setPhotoUploading(false);
      }
    }

    try {
      const res = await fetch('/api/team', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, photograph: photoUrl })
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Failed to add team member');
      }

      const newMember = await res.json();
      setTeamMembers([newMember, ...teamMembers]);
      resetForm();
      setPhotoPreview(null);
      if (fileInput) fileInput.value = '';
    } catch (err) {
      setError(err.message || 'Failed to add team member');
    }
    setSaving(false);
  }

  async function handleUpdateMember(memberId) {
    setSaving(true);
    setError('');

    const fileInput = document.getElementById('photographFile');
    const file = fileInput?.files?.[0] || null;
    let photoUrl = formData.photograph || null;
    if (file) {
      try {
        setPhotoUploading(true);
        const fd = new FormData();
        fd.append('file', file);
        fd.append('folder', 'spie/team');
        const uploadRes = await fetch('/api/uploads/image', { method: 'POST', body: fd });
        const uploadData = await uploadRes.json();
        if (!uploadRes.ok) throw new Error(uploadData.error || 'Image upload failed');
        photoUrl = uploadData.url;
      } catch (err) {
        setError(err.message || 'Image upload failed');
        setSaving(false);
        setPhotoUploading(false);
        return;
      } finally {
        setPhotoUploading(false);
      }
    }

    try {
      const res = await fetch(`/api/team/${memberId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, photograph: photoUrl })
      });

      if (!res.ok) throw new Error('Failed to update team member');

      const updated = await res.json();
      setTeamMembers(teamMembers.map(m => m.id === memberId ? updated : m));
      resetForm();
      setPhotoPreview(null);
      if (fileInput) fileInput.value = '';
    } catch (err) {
      setError(err.message || 'Failed to update team member');
    }
    setSaving(false);
  }

  async function handleDeleteMember(memberId) {
    if (!confirm('Are you sure you want to delete this team member?')) return;

    setError('');
    try {
      const res = await fetch(`/api/team/${memberId}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed to delete');
      setTeamMembers(teamMembers.filter(m => m.id !== memberId));
    } catch (err) {
      setError(err.message || 'Failed to delete team member');
    }
  }

  function startEdit(member) {
    setEditingId(member.id);
    setFormData({
      name: member.name,
      position: member.position,
      batch: member.batch || '',
      domain: member.domain || '',
      email: member.email,
      linkedinProfile: member.linkedinProfile || '',
      photograph: member.photograph || ''
    });
  }

  function resetForm() {
    setEditingId(null);
    setFormData({
      name: '',
      position: '',
      batch: '',
      domain: '',
      email: '',
      linkedinProfile: '',
      photograph: ''
    });
    };
  

  return (
    <main className="page-shell">
      <section className="hero">
        <p className="chip">Admin</p>
        <h1>Manage Team</h1>
        <p className="muted">Add, edit, or remove team members.</p>
      </section>

      <section className="section">
        <div className="admin-grid">
          <div>
            <h3 style={{ margin: '0 0 1rem 0' }}>
              {editingId ? 'Edit Team Member' : 'Add Team Member'}
            </h3>
            <form className="signin-form" onSubmit={(e) => {
              e.preventDefault();
              if (editingId) {
                handleUpdateMember(editingId);
              } else {
                handleAddMember(e);
              }
            }}>
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                  id="name"
                  className="form-input"
                  placeholder="Full Name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="position">Position</label>
                <input
                  id="position"
                  className="form-input"
                  placeholder="Job Title/Position"
                  value={formData.position}
                  onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email ID</label>
                <input
                  id="email"
                  type="email"
                  className="form-input"
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  
                />
              </div>

              <div className="form-group">
                <label htmlFor="batch">Batch</label>
                <input
                  id="batch"
                  className="form-input"
                  placeholder="e.g., 2024, 2025"
                  value={formData.batch}
                  onChange={(e) => setFormData({ ...formData, batch: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label htmlFor="domain">Domain</label>
                <input
                  id="domain"
                  className="form-input"
                  placeholder="e.g., Design, Development, Marketing"
                  value={formData.domain}
                  onChange={(e) => setFormData({ ...formData, domain: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label htmlFor="linkedinProfile">LinkedIn Profile</label>
                <input
                  id="linkedinProfile"
                  type="url"
                  className="form-input"
                  placeholder="LinkedIn Profile URL"
                  value={formData.linkedinProfile}
                  onChange={(e) => setFormData({ ...formData, linkedinProfile: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label htmlFor="photograph">Photograph</label>
                <input
                  id="photographFile"
                  type="file"
                  accept="image/*"
                  className="form-input"
                  onChange={(e) => {
                    const f = e.target.files?.[0];
                    if (f) {
                      const reader = new FileReader();
                      reader.onload = () => setPhotoPreview(reader.result);
                      reader.readAsDataURL(f);
                    } else {
                      setPhotoPreview(null);
                    }
                  }}
                />
                <input
                  id="photograph"
                  type="url"
                  className="form-input"
                  placeholder="Or paste an image URL"
                  value={formData.photograph}
                  onChange={(e) => setFormData({ ...formData, photograph: e.target.value })}
                  style={{ marginTop: '0.5rem' }}
                />
                {photoPreview && (
                  <div style={{ marginTop: '0.5rem' }}>
                    <img src={photoPreview} alt="Preview" style={{ width: '100%', maxHeight: 200, objectFit: 'cover', borderRadius: 8 }} />
                  </div>
                )}
                {photoUploading && <p className="muted" style={{ marginTop: '0.5rem' }}>Uploading image...</p>}
              </div>

              {error && <div className="form-error">{error}</div>}

              <div className="pill-row" style={{ marginTop: '0.5rem' }}>
                <button
                  type="submit"
                  className="btn primary"
                  disabled={saving}
                >
                  {saving ? 'Saving...' : (editingId ? 'Update Member' : 'Add Member')}
                </button>
                {editingId && (
                  <button
                    type="button"
                    className="btn secondary"
                    onClick={resetForm}
                    disabled={saving}
                  >
                    Cancel
                  </button>
                )}
              </div>
            </form>
          </div>

          <div className="admins-list">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '1rem' }}>
              <div>
                <h3 style={{ margin: 0 }}>Team Members</h3>
                <p className="muted" style={{ margin: 0 }}>Click edit or delete to manage members.</p>
              </div>
              <span className="chip">{teamMembers.length} total</span>
            </div>

            {error && <div className="form-error" style={{ marginTop: '1rem' }}>{error}</div>}

            {loading ? (
              <p className="muted" style={{ marginTop: '1rem' }}>Loading...</p>
            ) : teamMembers.length === 0 ? (
              <p className="muted" style={{ marginTop: '1rem' }}>No team members yet.</p>
            ) : (
              <div style={{ marginTop: '1rem', overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead>
                    <tr style={{ borderBottom: '2px solid var(--color-border)' }}>
                      <th style={{ padding: '0.75rem', textAlign: 'left' }}>Name</th>
                      <th style={{ padding: '0.75rem', textAlign: 'left' }}>Position</th>
                      <th style={{ padding: '0.75rem', textAlign: 'left' }}>Email</th>
                      <th style={{ padding: '0.75rem', textAlign: 'left' }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {teamMembers.map((member) => (
                      <tr key={member.id} style={{ borderBottom: '1px solid var(--color-border)' }}>
                        <td style={{ padding: '0.75rem' }}>{member.name}</td>
                        <td style={{ padding: '0.75rem' }}>{member.position}</td>
                        <td style={{ padding: '0.75rem' }}>{member.email}</td>
                        <td style={{ padding: '0.75rem' }}>
                          <div className="pill-row">
                            <button
                              className="btn secondary"
                              onClick={() => startEdit(member)}
                              style={{ fontSize: '0.875rem', padding: '0.4rem 0.8rem' }}
                            >
                              Edit
                            </button>
                            <button
                              className="btn secondary"
                              onClick={() => handleDeleteMember(member.id)}
                              style={{ fontSize: '0.875rem', padding: '0.4rem 0.8rem', color: 'var(--color-error)' }}
                            >
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
