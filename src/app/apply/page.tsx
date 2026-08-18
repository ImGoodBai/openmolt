'use client';

import { useState } from 'react';
import type { Metadata } from 'next';

export default function ApplyPage() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: '',
    organization: '',
    city: '',
    mission: '',
    type: '',
    website: '',
    email: '',
    helpWith: '',
    consent: false,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4" style={{ background: '#0d0b08' }}>
        <div className="max-w-md w-full text-center p-10 rounded-2xl border" style={{ background: '#151515', borderColor: '#00d4aa33' }}>
          <div className="text-5xl mb-5">🔮</div>
          <h2 className="text-2xl font-bold text-white mb-3">Application Received</h2>
          <p className="text-sm leading-relaxed" style={{ color: '#888' }}>
            Thank you. We review beta applications manually and will be in touch within 1–2 weeks. We are prioritizing Seattle/Washington nonprofits and social-purpose organizations in the first cohort.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ background: '#0d0b08' }}>
      {/* Header */}
      <div className="border-b px-6 py-8" style={{ borderColor: '#222' }}>
        <div className="max-w-2xl mx-auto">
          <p className="text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: '#c6a15b' }}>Join the Platform</p>
          <h1 className="text-3xl font-bold text-white mb-3">Apply for Beta</h1>
          <p className="text-base max-w-xl" style={{ color: '#888' }}>
            THE PAULI EFFECT is in early access. We are working with Seattle/Washington nonprofits, social-purpose companies, and community builders first. Tell us about your mission.
          </p>
        </div>
      </div>

      {/* Form */}
      <div className="max-w-2xl mx-auto px-4 py-10">
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs font-medium mb-2" style={{ color: '#c6a15b' }}>Your Name *</label>
              <input
                type="text"
                required
                value={form.name}
                onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                className="w-full px-4 py-2.5 rounded-lg text-sm text-white focus:outline-none"
                style={{ background: '#151515', border: '1px solid #333', }}
                placeholder="Jane Smith"
              />
            </div>
            <div>
              <label className="block text-xs font-medium mb-2" style={{ color: '#c6a15b' }}>Organization *</label>
              <input
                type="text"
                required
                value={form.organization}
                onChange={e => setForm(f => ({ ...f, organization: e.target.value }))}
                className="w-full px-4 py-2.5 rounded-lg text-sm text-white focus:outline-none"
                style={{ background: '#151515', border: '1px solid #333' }}
                placeholder="Seattle Food Bank"
              />
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs font-medium mb-2" style={{ color: '#c6a15b' }}>City / State *</label>
              <input
                type="text"
                required
                value={form.city}
                onChange={e => setForm(f => ({ ...f, city: e.target.value }))}
                className="w-full px-4 py-2.5 rounded-lg text-sm text-white focus:outline-none"
                style={{ background: '#151515', border: '1px solid #333' }}
                placeholder="Seattle, WA"
              />
            </div>
            <div>
              <label className="block text-xs font-medium mb-2" style={{ color: '#c6a15b' }}>Organization Type *</label>
              <select
                required
                value={form.type}
                onChange={e => setForm(f => ({ ...f, type: e.target.value }))}
                className="w-full px-4 py-2.5 rounded-lg text-sm text-white focus:outline-none"
                style={{ background: '#151515', border: '1px solid #333' }}
              >
                <option value="">Select type...</option>
                <option value="nonprofit">Nonprofit</option>
                <option value="social-purpose">Social-Purpose Company</option>
                <option value="research">Research Organization</option>
                <option value="government">Government / Civic</option>
                <option value="community">Community Group</option>
                <option value="youth">Youth Program</option>
                <option value="builder">AI Builder / Developer</option>
                <option value="funder">Funder / Foundation</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium mb-2" style={{ color: '#c6a15b' }}>Your Mission *</label>
            <textarea
              required
              rows={3}
              value={form.mission}
              onChange={e => setForm(f => ({ ...f, mission: e.target.value }))}
              className="w-full px-4 py-2.5 rounded-lg text-sm text-white focus:outline-none resize-none"
              style={{ background: '#151515', border: '1px solid #333' }}
              placeholder="Describe what your organization does and who it serves."
            />
          </div>

          <div className="grid sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs font-medium mb-2" style={{ color: '#c6a15b' }}>Website</label>
              <input
                type="url"
                value={form.website}
                onChange={e => setForm(f => ({ ...f, website: e.target.value }))}
                className="w-full px-4 py-2.5 rounded-lg text-sm text-white focus:outline-none"
                style={{ background: '#151515', border: '1px solid #333' }}
                placeholder="https://yourorg.org"
              />
            </div>
            <div>
              <label className="block text-xs font-medium mb-2" style={{ color: '#c6a15b' }}>Email Address *</label>
              <input
                type="email"
                required
                value={form.email}
                onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                className="w-full px-4 py-2.5 rounded-lg text-sm text-white focus:outline-none"
                style={{ background: '#151515', border: '1px solid #333' }}
                placeholder="jane@yourorg.org"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium mb-2" style={{ color: '#c6a15b' }}>What would you want agents to help with? *</label>
            <textarea
              required
              rows={4}
              value={form.helpWith}
              onChange={e => setForm(f => ({ ...f, helpWith: e.target.value }))}
              className="w-full px-4 py-2.5 rounded-lg text-sm text-white focus:outline-none resize-none"
              style={{ background: '#151515', border: '1px solid #333' }}
              placeholder="Grant research? Community reports? Social content? Mission storytelling? Let us know what work you'd like AI agents to help with — and what still needs to be human-only."
            />
          </div>

          <div className="flex items-start gap-3">
            <input
              type="checkbox"
              required
              id="consent"
              checked={form.consent}
              onChange={e => setForm(f => ({ ...f, consent: e.target.checked }))}
              className="mt-0.5 w-4 h-4"
              style={{ accentColor: '#00d4aa' }}
            />
            <label htmlFor="consent" className="text-sm cursor-pointer" style={{ color: '#888' }}>
              I consent to be contacted by THE PAULI EFFECT team about beta access. My information will not be sold or shared. I can unsubscribe at any time.
            </label>
          </div>

          <button
            type="submit"
            className="w-full py-3.5 rounded-xl font-bold text-base transition-all"
            style={{ background: '#00d4aa', color: '#0d0b08' }}
          >
            Submit Application
          </button>

          <p className="text-xs text-center" style={{ color: '#555' }}>
            We review all applications manually. We are prioritizing Seattle/Washington organizations in the first cohort.
          </p>
        </form>
      </div>
    </div>
  );
}
