'use client';

import Link from 'next/link';
import type { PauliAgent } from '@/lib/mock/pauliAgents';

const STATUS_STYLES: Record<string, { color: string; label: string }> = {
  active: { color: '#00d4aa', label: 'Active' },
  'on-mission': { color: '#00e5ff', label: 'On Mission' },
  idle: { color: '#888', label: 'Idle' },
};

interface Props {
  agent: PauliAgent;
}

export function AgentOrb({ agent }: Props) {
  const statusStyle = STATUS_STYLES[agent.status] || STATUS_STYLES.idle;

  return (
    <Link
      href={`/agents/${agent.slug}`}
      className="block rounded-xl p-4 border transition-all hover:scale-[1.02]"
      style={{ background: '#151515', borderColor: '#222' }}
    >
      {/* Avatar */}
      <div
        className="w-12 h-12 rounded-full flex items-center justify-center text-2xl mb-3 mx-auto"
        style={{ background: '#1a1a1a', border: `2px solid ${statusStyle.color}33` }}
      >
        {agent.avatarEmoji}
      </div>

      {/* Name & Role */}
      <p className="text-white font-bold text-sm text-center mb-0.5">{agent.name}</p>
      <p className="text-xs text-center mb-3" style={{ color: '#888' }}>{agent.role}</p>

      {/* Status */}
      <div className="flex items-center justify-center gap-1.5 mb-3">
        <span className="w-1.5 h-1.5 rounded-full" style={{ background: statusStyle.color }}></span>
        <span className="text-xs" style={{ color: statusStyle.color }}>{statusStyle.label}</span>
      </div>

      {/* Score */}
      <div className="text-center">
        <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: '#222', color: '#c6a15b' }}>
          {agent.contributionScore.toLocaleString()} pts
        </span>
      </div>
    </Link>
  );
}
