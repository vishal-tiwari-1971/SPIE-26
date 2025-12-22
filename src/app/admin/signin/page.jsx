'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminLogin() {
  const router = useRouter();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [popup, setPopup] = useState(null);

  const showPopup = (type, title, message) => {
    setPopup({ type, title, message });
  };

  const closePopup = () => {
    setPopup(null);
  };

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setLoading(true);

    const email = e.target.email.value;
    const password = e.target.password.value;

    const res = await fetch('/api/auth/admin', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });

    if (res.ok) {
      showPopup('success', 'Success', 'Successfully signed in! Redirecting...');
      setTimeout(() => {
        router.push('/admin/events');
      }, 1500);
    } else {
      const data = await res.json();
      setError(data.error || 'Invalid credentials');
      showPopup('error', 'Login Failed', data.error || 'Invalid credentials. Please try again.');
    }

    setLoading(false);
  }

  return (
    <main className="page-shell">
      <section className="hero">
        <p className="chip">Admin</p>
        <h1>Admin Login</h1>
        <p className="muted">Enter your credentials to access the admin portal.</p>
      </section>

      <section className="section">
        <div className="signin-container">
          <form className="signin-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                name="email"
                type="email"
                className="form-input"
                placeholder="Enter your email"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                className="form-input"
                placeholder="Enter your password"
                required
              />
            </div>

            {error && <div className="form-error">{error}</div>}

            <button
              type="submit"
              className="btn primary"
              disabled={loading}
              style={{ width: '100%', marginTop: '1rem' }}
            >
              {loading ? 'Signing in...' : 'Admin Login'}
            </button>
          </form>
        </div>
      </section>

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
}
