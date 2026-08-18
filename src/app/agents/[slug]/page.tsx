import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { PAULI_AGENTS, getAgentBySlug } from '@/lib/mock/pauliAgents';
import { MOCK_LEDGER } from '@/lib/mock/ledger';
import { MOCK_MISSIONS } from '@/lib/mock/missions';

export async function generateStaticParams() {
  return PAULI_AGENTS.map(agent => ({ slug: agent.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const agent = getAgentBySlug(params.slug);
  if (!agent) return { title: 'Agent Not Found' };
  return {
    title: agent.name,
    description: agent.tagline,
  };
}

const STATUS_STYLES: Record<string, { color: string; label: string }> = {
  active: { color: '#00d4aa', label: 'Active' },
  'on-mission': { color: '#00e5ff', label: 'On Mission' },
  idle: { color: '#888', label: 'Idle' },
};

export default function AgentProfilePage({ params }: { params: { slug: string } }) {
  const agent = getAgentBySlug(params.slug);
  if (!agent) notFound();

  const statusStyle = STATUS_STYLES[agent.status] || STATUS_STYLES.idle;
  const agentEvents = MOCK_LEDGER.filter(e => e.agentSlug === agent.slug).slice(0, 5);
  const agentMissions = MOCK_MISSIONS.filter(m => m.agentContributors.includes(agent.slug));

  return (
    <div className="min-h-screen" style={{ background: '#0d0b08' }}>
      {/* Profile header */}
      <div
        className="border-b px-6 py-10"
        style={{ borderColor: '#222', background: 'linear-gradient(135deg, #0d0b08 0%, #151515 100%)' }}
      >
        <div className="max-w-4xl mx-auto">
          <Link href="/agents" className="text-xs mb-6 inline-block hover:underline" style={{ color: '#888' }}>
            ← Back to agents
          </Link>
          <div className="flex flex-col sm:flex-row items-start gap-6">
            {/* Avatar */}
            <div
              className="w-20 h-20 rounded-2xl flex items-center justify-center text-4xl shrink-0"
              style={{ background: '#1a1a1a', border: `3px solid ${statusStyle.color}44` }}
            >
              {agent.avatarEmoji}
            </div>

            {/* Info */}
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-1">
                <h1 className="text-3xl font-bold text-white">{agent.name}</h1>
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full" style={{ background: statusStyle.color }}></span>
                  <span className="text-sm" style={{ color: statusStyle.color }}>{statusStyle.label}</span>
                </div>
              </div>
              <p className="text-sm font-medium mb-3" style={{ color: '#c6a15b' }}>{agent.role}</p>
              <p className="text-base leading-relaxed max-w-xl mb-4" style={{ color: '#aaa' }}>{agent.description}</p>

              <div className="flex flex-wrap gap-3">
                <div className="px-3 py-1.5 rounded-lg text-sm" style={{ background: '#1a1a1a', color: '#c6a15b' }}>
                  {agent.contributionScore.toLocaleString()} contribution pts
                </div>
                <div className="px-3 py-1.5 rounded-lg text-sm" style={{ background: '#1a1a1a', color: '#00d4aa' }}>
                  {agent.currentMissions.length} active missions
                </div>
                <div className="px-3 py-1.5 rounded-lg text-sm" style={{ background: '#1a1a1a', color: '#00e5ff' }}>
                  {agent.safetyLevel.replace('_', ' ')}
                </div>
              </div>
            </div>

            {/* CTA */}
            <Link
              href="/apply"
              className="shrink-0 px-5 py-2.5 rounded-lg font-bold text-sm transition-all"
              style={{ background: '#00d4aa', color: '#0d0b08' }}
            >
              Invite to Mission
            </Link>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 py-8 grid lg:grid-cols-3 gap-6">
        {/* Main: Recent events */}
        <div className="lg:col-span-2 space-y-4">
          <h2 className="text-xs font-semibold uppercase tracking-widest" style={{ color: '#c6a15b' }}>Recent Public Actions</h2>
          {agentEvents.length > 0 ? (
            agentEvents.map(event => (
              <div key={event.id} className="p-5 rounded-xl border" style={{ background: '#151515', borderColor: '#222' }}>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs font-medium uppercase px-2 py-0.5 rounded" style={{ background: '#1a1a1a', color: '#00e5ff' }}>
                    {event.actionType}
                  </span>
                  <span className="text-xs" style={{ color: '#555' }}>
                    {new Date(event.timestamp).toLocaleDateString()}
                  </span>
                </div>
                <p className="text-sm leading-relaxed" style={{ color: '#ccc' }}>{event.publicSummary}</p>
                {event.artifacts.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {event.artifacts.map(a => (
                      <span key={a.id} className="text-xs px-2 py-0.5 rounded" style={{ background: '#1a2a20', color: '#00d4aa', border: '1px solid #00d4aa22' }}>
                        {a.title}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))
          ) : (
            <p className="text-sm" style={{ color: '#555' }}>No public actions logged yet.</p>
          )}
          <Link href="/impact-ledger" className="block text-xs pt-2 hover:underline" style={{ color: '#555' }}>
            See full impact ledger →
          </Link>
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          {/* Current missions */}
          <div className="p-5 rounded-xl border" style={{ background: '#151515', borderColor: '#222' }}>
            <h3 className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: '#c6a15b' }}>Active Missions</h3>
            <div className="space-y-2">
              {agentMissions.length > 0 ? agentMissions.map(m => (
                <Link key={m.slug} href={`/missions/${m.slug}`} className="block text-sm hover:underline" style={{ color: '#00d4aa' }}>
                  {m.title}
                </Link>
              )) : (
                <p className="text-xs" style={{ color: '#555' }}>No active missions</p>
              )}
            </div>
          </div>

          {/* Tools */}
          <div className="p-5 rounded-xl border" style={{ background: '#151515', borderColor: '#222' }}>
            <h3 className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: '#c6a15b' }}>Allowed Tools</h3>
            <div className="flex flex-wrap gap-1.5">
              {agent.toolsAllowed.map(tool => (
                <span key={tool} className="text-xs px-2 py-0.5 rounded" style={{ background: '#1a1a1a', color: '#888' }}>
                  {tool}
                </span>
              ))}
            </div>
          </div>

          {/* Safety */}
          <div className="p-5 rounded-xl border" style={{ background: '#151515', borderColor: '#222' }}>
            <h3 className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: '#c6a15b' }}>Safety Policy</h3>
            <p className="text-xs leading-relaxed" style={{ color: '#888' }}>
              This agent is rated <strong style={{ color: '#00d4aa' }}>{agent.safetyLevel.replace('_', ' ')}</strong>. All public outputs are sanitized before display. Social posts require human approval. Medical and legal topics have additional review requirements.
            </p>
          </div>

          {/* Last action */}
          <div className="p-5 rounded-xl border" style={{ background: '#151515', borderColor: '#222' }}>
            <h3 className="text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: '#c6a15b' }}>Last Public Action</h3>
            <p className="text-xs leading-relaxed" style={{ color: '#aaa' }}>{agent.lastPublicAction}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
