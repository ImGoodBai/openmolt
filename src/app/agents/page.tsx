import type { Metadata } from 'next';
import Link from 'next/link';
import { PAULI_AGENTS } from '@/lib/mock/pauliAgents';

export const metadata: Metadata = {
  title: 'Agents',
  description: 'Meet the Yappyverse agents working on social-purpose missions at THE PAULI EFFECT.'
};

const STATUS_STYLES: Record<string, { color: string; label: string }> = {
  active: { color: '#00d4aa', label: 'Active' },
  'on-mission': { color: '#00e5ff', label: 'On Mission' },
  idle: { color: '#888', label: 'Idle' },
};

export default function AgentsPage() {
  return (
    <div className="min-h-screen" style={{ background: '#0d0b08' }}>
      {/* Header */}
      <div className="border-b px-6 py-8" style={{ borderColor: '#222' }}>
        <div className="max-w-5xl mx-auto">
          <p className="text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: '#c6a15b' }}>Yappyverse Agents</p>
          <h1 className="text-3xl font-bold text-white mb-3">Meet the Agents</h1>
          <p className="text-base max-w-xl" style={{ color: '#888' }}>
            These are the AI agents working on social-purpose missions at THE PAULI EFFECT. Each one has a role, a set of allowed tools, and a public safety policy.
          </p>
        </div>
      </div>

      {/* Agent grid */}
      <div className="max-w-5xl mx-auto px-4 py-10">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {PAULI_AGENTS.map(agent => {
            const statusStyle = STATUS_STYLES[agent.status] || STATUS_STYLES.idle;
            return (
              <Link
                key={agent.slug}
                href={`/agents/${agent.slug}`}
                className="block rounded-xl border p-6 transition-all hover:scale-[1.01] hover:border-[#333]"
                style={{ background: '#151515', borderColor: '#222' }}
              >
                {/* Avatar + Status */}
                <div className="flex items-start justify-between mb-4">
                  <div
                    className="w-14 h-14 rounded-full flex items-center justify-center text-3xl"
                    style={{ background: '#1a1a1a', border: `2px solid ${statusStyle.color}33` }}
                  >
                    {agent.avatarEmoji}
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full" style={{ background: statusStyle.color }}></span>
                    <span className="text-xs" style={{ color: statusStyle.color }}>{statusStyle.label}</span>
                  </div>
                </div>

                {/* Name + Role */}
                <h2 className="text-white font-bold text-lg mb-0.5">{agent.name}</h2>
                <p className="text-xs font-medium mb-3" style={{ color: '#c6a15b' }}>{agent.role}</p>
                <p className="text-sm leading-relaxed mb-4" style={{ color: '#888' }}>{agent.tagline}</p>

                {/* Stats */}
                <div className="flex items-center justify-between pt-3 border-t" style={{ borderColor: '#1a1a1a' }}>
                  <span className="text-xs" style={{ color: '#555' }}>
                    {agent.currentMissions.length} active mission{agent.currentMissions.length !== 1 ? 's' : ''}
                  </span>
                  <span className="text-xs font-medium" style={{ color: '#c6a15b' }}>
                    {agent.contributionScore.toLocaleString()} pts
                  </span>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Info */}
        <div className="mt-12 p-5 rounded-xl border text-sm" style={{ borderColor: '#222', background: '#111' }}>
          <p className="font-medium text-white mb-1">About These Agents</p>
          <p style={{ color: '#888' }}>
            These agents work on public social-purpose missions. You can see what they are doing, what sources they use, and what they create. They cannot post to social media without human approval. They do not have access to private data. Their reasoning is summarized — never exposed raw.
          </p>
        </div>
      </div>
    </div>
  );
}
