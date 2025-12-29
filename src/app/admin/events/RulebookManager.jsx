'use client';

import { useState, useEffect } from 'react';

const RULE_SECTIONS = [
  'OVERVIEW',
  'ELIGIBILITY',
  'TEAM_COMPOSITION',
  'EVENT_FLOW',
  'JUDGING_CRITERIA',
  'DURATION',
  'PRIZE',
  'PRECAUTION'
];

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

export default function RulebookManager({ eventId }) {
  const [rules, setRules] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    fetchRules();
  }, [eventId]);

  async function fetchRules() {
    setLoading(true);
    setError('');
    try {
      const res = await fetch(`/api/admin/events/${eventId}/rules`);
      if (res.ok) {
        const data = await res.json();
        // Convert to a map for easier editing
        const rulesMap = {};
        data.forEach(rule => {
          rulesMap[rule.section] = rule.content;
        });
        setRules(rulesMap);
      } else {
        setRules({});
      }
    } catch (err) {
      setError('Failed to load rules');
      setRules({});
    } finally {
      setLoading(false);
    }
  }

  async function handleSave() {
    setError('');
    setSuccess('');
    setSaving(true);

    try {
      // Convert rules map to array
      const rulesArray = Object.entries(rules)
        .filter(([_, content]) => content.trim())
        .map(([section, content], index) => ({
          section,
          content,
          order: index
        }));

      const res = await fetch(`/api/admin/events/${eventId}/rules`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ rules: rulesArray })
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Failed to save rules');
      }

      setSuccess('Rules saved successfully!');
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError(err.message || 'Failed to save rules');
    } finally {
      setSaving(false);
    }
  }

  function updateRule(section, content) {
    setRules(prev => ({ ...prev, [section]: content }));
  }

  if (loading) {
    return <p className="muted">Loading rules...</p>;
  }

  return (
    <div className="rulebook-manager">
      <div style={{ marginBottom: '1rem' }}>
        <h3 style={{ margin: '0 0 0.5rem 0' }}>Event Rulebook</h3>
        <p className="muted">Add rules for each section. Leave blank to exclude a section.</p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {RULE_SECTIONS.map((section) => (
          <div key={section} className="form-group">
            <label htmlFor={section}>{SECTION_LABELS[section]}</label>
            <textarea
              id={section}
              className="form-input"
              rows={4}
              placeholder={`Enter ${SECTION_LABELS[section].toLowerCase()} details...`}
              value={rules[section] || ''}
              onChange={(e) => updateRule(section, e.target.value)}
            />
          </div>
        ))}
      </div>

      {error && <div className="form-error" style={{ marginTop: '1rem' }}>{error}</div>}
      {success && <div className="form-success" style={{ marginTop: '1rem' }}>{success}</div>}

      <button
        className="btn primary"
        onClick={handleSave}
        disabled={saving}
        style={{ width: '100%', marginTop: '1rem' }}
      >
        {saving ? 'Saving...' : 'Save Rulebook'}
      </button>
    </div>
  );
}
