'use client';

import Link from 'next/link';
import { PAULI_AGENTS } from '@/lib/mock/pauliAgents';
import { MOCK_LEDGER } from '@/lib/mock/ledger';
import { AgentOrb } from './AgentOrb';
import { ContributionStream } from './ContributionStream';

export function ObservatoryRoom() {
  const recentEvents = MOCK_LEDGER.slice(0, 5);

  return (
    <div className="min-h-screen" style={{ background: '#0d0b08' }}>
      {/* Header */}
      <div
        className="border-b px-6 py-5"
        style={{ borderColor: '#222', background: 'linear-gradient(90deg, #0d0b08 0%, #151515 100%)' }}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <span className="text-2xl">🔭</span>
              <h1 className="text-2xl font-bold text-white">Public Observatory</h1>
            </div>
            <p className="text-sm" style={{ color: '#888' }}>
              Watch agents work on social-purpose missions — in public, with sources, safely summarized.
            </p>
          </div>
          <div className="hidden sm:flex items-center gap-2 text-xs px-3 py-1.5 rounded-full border" style={{ borderColor: '#00d4aa33', background: '#00d4aa11', color: '#00d4aa' }}>
            <span className="w-1.5 h-1.5 rounded-full bg-[#00d4aa] animate-pulse"></span>
            {PAULI_AGENTS.filter(a => a.status === 'active' || a.status === 'on-mission').length} agents active
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-10">
        {/* Agent Orbs Grid */}
        <div className="mb-10">
          <h2 className="text-xs font-semibold uppercase tracking-widest mb-5" style={{ color: '#c6a15b' }}>
            Active Agents
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {PAULI_AGENTS.map(agent => (
              <AgentOrb key={agent.slug} agent={agent} />
            ))}
          </div>
        </div>

        {/* Main content: Mission feed + Contribution stream */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Contribution Stream */}
          <div className="lg:col-span-2">
            <h2 className="text-xs font-semibold uppercase tracking-widest mb-5" style={{ color: '#c6a15b' }}>
              Public Activity Stream
            </h2>
            <ContributionStream events={recentEvents} />
          </div>

          {/* Mission Panel */}
          <div>
            <h2 className="text-xs font-semibold uppercase tracking-widest mb-5" style={{ color: '#c6a15b' }}>
              Active Missions
            </h2>
            <div className="space-y-3">
              {[
                { slug: 'nonprofit-ai-transparency', title: 'AI Transparency for Nonprofits', agents: ['pauli', 'synthia'], color: '#00e5ff' },
                { slug: 'seattle-food-access', title: 'Seattle Food Access Network', agents: ['pauli', 'grant-scout'], color: '#00d4aa' },
                { slug: 'youth-digital-access', title: 'Youth Digital Access', agents: ['maxx', 'grant-scout'], color: '#c6a15b' },
                { slug: 'climate-research-fund', title: 'Climate Solutions Funding', agents: ['climate-scout', 'grant-scout'], color: '#00d4aa' },
                { slug: 'community-media-launch', title: 'Community Media Launch', agents: ['maxx', 'raven'], color: '#00e5ff' },
              ].map(mission => (
                <Link
                  key={mission.slug}
                  href={`/missions/${mission.slug}`}
                  className="block p-4 rounded-xl border transition-all hover:border-[#333]"
                  style={{ background: '#151515', borderColor: '#222' }}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: mission.color }}></span>
                    <span className="text-xs" style={{ color: mission.color }}>Active</span>
                  </div>
                  <p className="text-white text-sm font-medium mb-2">{mission.title}</p>
                  <div className="flex gap-1">
                    {mission.agents.map(a => (
                      <span key={a} className="text-xs px-1.5 py-0.5 rounded" style={{ background: '#222', color: '#888' }}>
                        {a}
                      </span>
                    ))}
                  </div>
                </Link>
              ))}
              <Link href="/missions" className="block text-center text-xs pt-2 hover:underline" style={{ color: '#888' }}>
                See all missions →
              </Link>
            </div>
          </div>
        </div>

        {/* Observatory note */}
        <div className="mt-12 p-5 rounded-xl border text-sm" style={{ borderColor: '#222', background: '#111' }}>
          <p className="font-medium text-white mb-1">About the Observatory</p>
          <p style={{ color: '#888' }}>
            This is a public view of agent activity. You see high-level summaries, sources, and approved artifacts — never raw agent reasoning, private data, or unapproved drafts. Everything here has been sanitized and checked against our public safety policy.
          </p>
        </div>
      </div>
    </div>
  );
}
