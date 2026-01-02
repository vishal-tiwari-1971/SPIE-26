'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';

export default function EditEventPage() {
  const { id } = useParams();
  const router = useRouter();
  
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [imagePreview, setImagePreview] = useState(null);
  const [imageUploading, setImageUploading] = useState(false);

  useEffect(() => {
    async function fetchEvent() {
      setError('');
      setLoading(true);
      const res = await fetch(`/api/admin/events/${id}`);
      if (!res.ok) {
        setError('Event not found');
        setLoading(false);
        return;
      }
      const data = await res.json();
      setEvent(data);
      setLoading(false);
    }
    fetchEvent();
  }, [id]);

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setSaving(true);

    // Handle image upload first if there's a file
    const fileInput = document.getElementById('imageFile');
    const file = fileInput?.files?.[0];
    let imageUrl = event.image || null;

    if (file) {
      try {
        setImageUploading(true);
        const fd = new FormData();
        fd.append('file', file);
        fd.append('folder', 'spie/events');
        const uploadRes = await fetch('/api/uploads/image', { method: 'POST', body: fd });
        const uploadData = await uploadRes.json();
        if (!uploadRes.ok) throw new Error(uploadData.error || 'Image upload failed');
        imageUrl = uploadData.url;
      } catch (err) {
        setError(err.message || 'Image upload failed');
        setSaving(false);
        setImageUploading(false);
        return;
      } finally {
        setImageUploading(false);
      }
    }

    const payload = {
      title: e.target.title.value,
      description: e.target.description.value,
      date: e.target.date.value,
      venue: e.target.venue.value,
      status: e.target.status.value,
      isGroupEvent: e.target.isGroupEvent.checked,
      minTeamSize: e.target.minTeamSize.value ? parseInt(e.target.minTeamSize.value) : null,
      maxTeamSize: e.target.maxTeamSize.value ? parseInt(e.target.maxTeamSize.value) : null,
      image: imageUrl
    };

    const res = await fetch(`/api/admin/events/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    if (!res.ok) {
      const data = await res.json();
      setError(data.error || 'Failed to update');
      setSaving(false);
      return;
    }

    router.push('/admin/events');
  }

  if (loading) return <p className="muted page-shell">Loading event...</p>;
  if (!event) return <p className="muted page-shell">Event not found</p>;

  return (
    <main className="page-shell">
      <section className="hero">
        <p className="chip">Admin</p>
        <h1>Edit Event</h1>
        <p className="muted">Update details and save changes.</p>
      </section>

      <section className="section">
        <div className="signin-container">
          <form className="signin-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="title">Title</label>
              <input
                id="title"
                name="title"
                className="form-input"
                defaultValue={event.title}
                placeholder="Title"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="description">Description</label>
              <textarea
                id="description"
                name="description"
                className="form-input"
                defaultValue={event.description}
                placeholder="Description"
                rows={3}
              />
            </div>

            <div className="form-group">
              <label htmlFor="date">Date & Time</label>
              <input
                id="date"
                name="date"
                type="datetime-local"
                className="form-input"
                defaultValue={formatDate(event.date)}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="venue">Venue</label>
              <input
                id="venue"
                name="venue"
                className="form-input"
                defaultValue={event.venue}
                placeholder="Venue"
              />
            </div>

            <div className="form-group">
              <label htmlFor="imageFile">Event Image</label>
              <input
                id="imageFile"
                name="imageFile"
                type="file"
                accept="image/*"
                className="form-input"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    const reader = new FileReader();
                    reader.onload = () => setImagePreview(reader.result);
                    reader.readAsDataURL(file);
                  } else {
                    setImagePreview(null);
                  }
                }}
              />
              {(imagePreview || event.image) && (
                <div style={{ marginTop: '0.75rem' }}>
                  <img 
                    src={imagePreview || event.image} 
                    alt="Preview" 
                    style={{ 
                      width: '100%', 
                      maxHeight: 250, 
                      objectFit: 'cover', 
                      borderRadius: 8,
                      border: '1px solid var(--panel-strong)'
                    }} 
                  />
                </div>
              )}
              {imageUploading && <p className="muted" style={{ marginTop: '0.5rem' }}>Uploading image...</p>}
            </div>

            <div className="form-group">
              <label htmlFor="status">Status</label>
              <select
                id="status"
                name="status"
                className="form-input"
                defaultValue={event.status}
                required
              >
                <option value="UPCOMING">Upcoming</option>
                <option value="ONGOING">Ongoing</option>
                <option value="COMPLETED">Completed</option>
              </select>
            </div>

            <div className="form-group">
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                <input
                  id="isGroupEvent"
                  name="isGroupEvent"
                  type="checkbox"
                  defaultChecked={event.isGroupEvent}
                  style={{ width: 'auto', cursor: 'pointer' }}
                />
                <span>Is Group Event (Team Registration)</span>
              </label>
            </div>

            <div className="form-group">
              <label htmlFor="minTeamSize">Minimum Team Size</label>
              <input
                id="minTeamSize"
                name="minTeamSize"
                type="number"
                min="1"
                className="form-input"
                defaultValue={event.minTeamSize || ''}
                placeholder="e.g., 2 (leave empty for no minimum)"
              />
            </div>

            <div className="form-group">
              <label htmlFor="maxTeamSize">Maximum Team Size</label>
              <input
                id="maxTeamSize"
                name="maxTeamSize"
                type="number"
                min="1"
                className="form-input"
                defaultValue={event.maxTeamSize || ''}
                placeholder="e.g., 5 (leave empty for no maximum)"
              />
            </div>

            {error && <div className="form-error">{error}</div>}

            <div className="pill-row" style={{ marginTop: '0.5rem' }}>
              <button
                type="submit"
                className="btn primary"
                disabled={saving}
              >
                {saving ? 'Saving...' : 'Update Event'}
              </button>
              <button
                type="button"
                className="btn secondary"
                onClick={() => router.back()}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </section>
    </main>
  );
}

// Convert ISO date → datetime-local format
function formatDate(dateString) {
  const d = new Date(dateString);
  const pad = n => n.toString().padStart(2, '0');

  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
}
