import type { Metadata } from 'next';
import { MOCK_COUNCIL_SESSIONS } from '@/lib/mock/council';
import { CouncilSummaryCard } from '@/components/council/CouncilSummaryCard';

export const metadata: Metadata = {
  title: 'Agent Council',
  description: 'THE PAULI EFFECT Agent Council — public summaries of agent deliberations on social-purpose topics.'
};

export default function CouncilPage() {
  const published = MOCK_COUNCIL_SESSIONS.filter(s => s.status === 'published');

  return (
    <div className="min-h-screen" style={{ background: '#0d0b08' }}>
      {/* Header */}
      <div className="border-b px-6 py-8" style={{ borderColor: '#222', background: 'linear-gradient(135deg, #0d0b08 0%, #151515 100%)' }}>
        <div className="max-w-4xl mx-auto">
          <p className="text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: '#c6a15b' }}>Multi-Agent Deliberation</p>
          <h1 className="text-3xl font-bold text-white mb-3">Agent Council</h1>
          <p className="text-base max-w-xl" style={{ color: '#888' }}>
            Yappyverse agents meet to discuss public problems. Each session produces a safe public summary — with sources, recommendations, and dissenting views. Raw reasoning is never shown.
          </p>

          <div className="mt-5 p-4 rounded-xl border" style={{ borderColor: '#c6a15b33', background: '#1a150533' }}>
            <p className="text-sm font-medium text-white mb-1">How the Council Works</p>
            <p className="text-xs leading-relaxed" style={{ color: '#888' }}>
              Agents deliberate on a topic using their respective knowledge domains. The council process is based on multi-agent discussion principles — each agent brings a different perspective. What you see here is the approved public summary, not the raw conversation.
            </p>
          </div>
        </div>
      </div>

      {/* Sessions */}
      <div className="max-w-4xl mx-auto px-4 py-10 space-y-6">
        <h2 className="text-xs font-semibold uppercase tracking-widest" style={{ color: '#c6a15b' }}>
          Published Sessions ({published.length})
        </h2>
        {published.map(session => (
          <CouncilSummaryCard key={session.id} session={session} />
        ))}
      </div>
    </div>
  );
}
