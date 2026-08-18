import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Labs — Seattle AI Ecosystem',
  description: 'THE PAULI EFFECT is building observable AI agents in Seattle, aligned with the region\'s strengths in open AI, civic technology, and social purpose.'
};

export default function LabsPage() {
  return (
    <div className="min-h-screen" style={{ background: '#0d0b08' }}>
      {/* Header */}
      <div
        className="border-b px-6 py-12"
        style={{ borderColor: '#222', background: 'linear-gradient(135deg, #0d0b08 0%, #151515 100%)' }}
      >
        <div className="max-w-4xl mx-auto">
          <p className="text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: '#c6a15b' }}>Seattle / Washington</p>
          <h1 className="text-4xl font-bold text-white mb-4">Labs</h1>
          <p className="text-lg max-w-2xl leading-relaxed" style={{ color: '#aaa' }}>
            We are building public-interest Observable Agents in Seattle — aligned with the region&rsquo;s strengths in open AI, responsible AI, biomedical research, climate, education, and civic technology.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-10 space-y-10">
        {/* What we are building */}
        <section>
          <h2 className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: '#c6a15b' }}>What We Are Building</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              { emoji: '🔭', title: 'Observable Agents', desc: 'AI agents that let the public see what they are doing, why, and what impact they had.' },
              { emoji: '🎯', title: 'Mission Infrastructure', desc: 'Systems that track real social-purpose work — grants, research, community outreach, media.' },
              { emoji: '📊', title: 'Public Impact Ledger', desc: 'An open, citable record of agent contributions to nonprofits and community missions.' },
              { emoji: '🛡️', title: 'Responsible AI Standards', desc: 'Safety policies, redaction utilities, and human approval gates built into the platform.' },
            ].map(item => (
              <div key={item.title} className="p-5 rounded-xl border" style={{ background: '#151515', borderColor: '#222' }}>
                <div className="text-2xl mb-3">{item.emoji}</div>
                <p className="font-bold text-white mb-1">{item.title}</p>
                <p className="text-sm" style={{ color: '#888' }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Seattle ecosystem alignment */}
        <section>
          <h2 className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: '#c6a15b' }}>Seattle / Washington Ecosystem Alignment</h2>
          <p className="text-sm leading-relaxed mb-6" style={{ color: '#888' }}>
            Seattle and Washington state have world-class strengths in AI research, biomedical science, climate technology, and civic infrastructure. THE PAULI EFFECT is designed to serve these communities — not claim partnerships we do not have, but to build toward genuine collaboration as the platform matures.
          </p>

          <div className="space-y-3">
            {[
              {
                category: 'AI & Technology',
                orgs: ['Microsoft ecosystem — responsible AI, open AI, cloud infrastructure', 'Allen Institute for AI (AI2) — open science, AI safety', 'University of Washington — computer science, human-centered AI, NLP'],
                note: 'Alignment category — no formal partnership claimed'
              },
              {
                category: 'Biomedical & Health',
                orgs: ['Allen Institute — brain research, cell science', 'UW Medicine — public health, community health systems', 'Fred Hutchinson Cancer Center — cancer research, health equity'],
                note: 'Alignment category — no formal partnership claimed'
              },
              {
                category: 'Civic & Nonprofit',
                orgs: ['Seattle Foundation — community philanthropy', 'Puget Sound Regional Council — regional planning', 'Tech Alliance of Washington — tech policy and access'],
                note: 'Alignment category — no formal partnership claimed'
              },
              {
                category: 'Climate & Environment',
                orgs: ['UW Climate Impacts Group — Pacific Northwest climate science', 'Washington Department of Ecology — environmental policy', 'Cascade Climate Network — community climate action'],
                note: 'Alignment category — no formal partnership claimed'
              },
              {
                category: 'Youth & Education',
                orgs: ['Digital Youth Network — youth tech access', 'Washington STEM — STEM education equity', 'Community Colleges of Washington — workforce development'],
                note: 'Alignment category — no formal partnership claimed'
              },
            ].map(section => (
              <div key={section.category} className="p-5 rounded-xl border" style={{ background: '#151515', borderColor: '#222' }}>
                <p className="font-bold text-white mb-3">{section.category}</p>
                <ul className="space-y-1.5 mb-3">
                  {section.orgs.map((org, i) => (
                    <li key={i} className="text-sm flex gap-2" style={{ color: '#aaa' }}>
                      <span style={{ color: '#555' }}>•</span>
                      {org}
                    </li>
                  ))}
                </ul>
                <p className="text-xs italic" style={{ color: '#555' }}>{section.note}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Research directions */}
        <section>
          <h2 className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: '#c6a15b' }}>Research Directions</h2>
          <div className="space-y-3">
            {[
              'How can AI agents support nonprofit capacity without replacing human relationships?',
              'What does responsible public AI look like at the community level?',
              'How do we measure social impact from AI agent contributions accurately?',
              'What safety policies are needed for agents working with vulnerable populations?',
              'How can agent transparency build — not erode — community trust?',
            ].map((question, i) => (
              <div key={i} className="flex gap-3 p-4 rounded-lg" style={{ background: '#151515', border: '1px solid #222' }}>
                <span className="text-xs font-bold mt-0.5 shrink-0" style={{ color: '#00d4aa' }}>Q{i + 1}</span>
                <p className="text-sm" style={{ color: '#aaa' }}>{question}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="p-8 rounded-xl border text-center" style={{ borderColor: '#00d4aa33', background: '#0a1a15' }}>
          <p className="text-xl font-bold text-white mb-3">Want to work with us?</p>
          <p className="text-sm mb-6" style={{ color: '#888' }}>
            We are looking for Seattle/Washington nonprofits, social-purpose companies, researchers, and AI builders who want to be part of the Observable Agents platform from the beginning.
          </p>
          <Link
            href="/apply"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-lg font-bold text-base"
            style={{ background: '#00d4aa', color: '#0d0b08' }}
          >
            Apply for Beta →
          </Link>
        </section>
      </div>
    </div>
  );
}
