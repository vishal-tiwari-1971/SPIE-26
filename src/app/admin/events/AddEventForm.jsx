'use client';

import { useState, useRef } from 'react';

export default function AddEventForm({ onAdd }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [imagePreview, setImagePreview] = useState(null);
  const [imageUploading, setImageUploading] = useState(false);
  const imageFileRef = useRef(null);

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setLoading(true);

    const form = e.target;

    // Upload image first if provided
    let imageUrl = null;
    const file = imageFileRef.current?.files?.[0] || null;
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
        setLoading(false);
        setImageUploading(false);
        return;
      } finally {
        setImageUploading(false);
      }
    }

    try {
      const res = await fetch('/api/admin/events', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: form.title.value,
          description: form.description.value,
          date: form.date.value,
          venue: form.venue.value,
          status: form.status.value,
          image: imageUrl,
          isGroupEvent: form.isGroupEvent.checked,
          minTeamSize: form.minTeamSize.value ? parseInt(form.minTeamSize.value) : null,
          maxTeamSize: form.maxTeamSize.value ? parseInt(form.maxTeamSize.value) : null
        })
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Failed to add event');
      }

      form.reset();
      setImagePreview(null);
      if (imageFileRef.current) imageFileRef.current.value = '';
      onAdd();
    } catch (err) {
      setError(err.message || 'Failed to add event');
    }

    setLoading(false);
  }

  return (
    <form className="signin-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="title">Title</label>
        <input
          id="title"
          name="title"
          className="form-input"
          placeholder="Enter event title"
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          name="description"
          className="form-input"
          placeholder="Add a short description"
          rows={3}
        />
      </div>

      <div className="form-group">
        <label htmlFor="image">Event Image</label>
        <input
          id="image"
          name="image"
          type="file"
          accept="image/*"
          className="form-input"
          ref={imageFileRef}
          onChange={(e) => {
            const f = e.target.files?.[0];
            if (f) {
              const reader = new FileReader();
              reader.onload = () => setImagePreview(reader.result);
              reader.readAsDataURL(f);
            } else {
              setImagePreview(null);
            }
          }}
        />
        {imagePreview && (
          <div style={{ marginTop: '0.5rem' }}>
            <img src={imagePreview} alt="Preview" style={{ width: '100%', maxHeight: 200, objectFit: 'cover', borderRadius: 8 }} />
          </div>
        )}
        {imageUploading && <p className="muted" style={{ marginTop: '0.5rem' }}>Uploading image...</p>}
      </div>

      <div className="form-group">
        <label htmlFor="date">Date & Time</label>
        <input
          id="date"
          name="date"
          type="datetime-local"
          className="form-input"
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="venue">Venue</label>
        <input
          id="venue"
          name="venue"
          className="form-input"
          placeholder="Enter venue"
        />
      </div>

      <div className="form-group">
        <label htmlFor="status">Status</label>
        <select
          id="status"
          name="status"
          className="form-input"
          defaultValue="UPCOMING"
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
          placeholder="e.g., 5 (leave empty for no maximum)"
        />
      </div>

      {error && <div className="form-error">{error}</div>}

      <button
        type="submit"
        className="btn primary"
        disabled={loading}
        style={{ width: '100%', marginTop: '0.5rem' }}
      >
        {loading ? 'Adding...' : 'Add Event'}
      </button>
    </form>
  );
}
