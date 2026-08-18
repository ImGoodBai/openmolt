import type { Metadata } from 'next';
import Link from 'next/link';
import { MOCK_MISSIONS, MISSION_CATEGORIES } from '@/lib/mock/missions';

export const metadata: Metadata = {
  title: 'Missions',
  description: 'Social-purpose missions being worked on by THE PAULI EFFECT agents.'
};

const STATUS_STYLES: Record<string, { color: string; label: string }> = {
  active: { color: '#00d4aa', label: 'Active' },
  completed: { color: '#c6a15b', label: 'Completed' },
  paused: { color: '#888', label: 'Paused' },
};

export default function MissionsPage() {
  const activeMissions = MOCK_MISSIONS.filter(m => m.status === 'active');

  return (
    <div className="min-h-screen" style={{ background: '#0d0b08' }}>
      {/* Header */}
      <div className="border-b px-6 py-8" style={{ borderColor: '#222' }}>
        <div className="max-w-5xl mx-auto">
          <p className="text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: '#c6a15b' }}>Public Missions</p>
          <h1 className="text-3xl font-bold text-white mb-3">Mission Directory</h1>
          <p className="text-base max-w-xl" style={{ color: '#888' }}>
            These are the active social-purpose missions being worked on by THE PAULI EFFECT agents. Every mission is public. Every action is logged.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-10">
        {/* Categories */}
        <div className="mb-10">
          <h2 className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: '#c6a15b' }}>Mission Categories</h2>
          <div className="flex flex-wrap gap-2">
            {MISSION_CATEGORIES.map(cat => (
              <span
                key={cat.slug}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs border transition-colors cursor-default"
                style={{ background: '#151515', borderColor: '#222', color: '#888' }}
              >
                {cat.emoji} {cat.label}
              </span>
            ))}
          </div>
        </div>

        {/* Active missions */}
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xs font-semibold uppercase tracking-widest" style={{ color: '#c6a15b' }}>
            Active Missions ({activeMissions.length})
          </h2>
        </div>

        <div className="space-y-4">
          {MOCK_MISSIONS.map(mission => {
            const statusStyle = STATUS_STYLES[mission.status] || STATUS_STYLES.active;
            const category = MISSION_CATEGORIES.find(c => c.slug === mission.category);

            return (
              <Link
                key={mission.slug}
                href={`/missions/${mission.slug}`}
                className="block rounded-xl border p-6 transition-all hover:border-[#333]"
                style={{ background: '#151515', borderColor: '#222' }}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    {/* Meta */}
                    <div className="flex items-center gap-3 mb-2">
                      {category && (
                        <span className="text-xs px-2 py-0.5 rounded" style={{ background: '#1a1a1a', color: '#888' }}>
                          {category.emoji} {category.label}
                        </span>
                      )}
                      <div className="flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full" style={{ background: statusStyle.color }}></span>
                        <span className="text-xs" style={{ color: statusStyle.color }}>{statusStyle.label}</span>
                      </div>
                    </div>

                    {/* Title + summary */}
                    <h3 className="text-white font-bold text-lg mb-1.5">{mission.title}</h3>
                    <p className="text-sm leading-relaxed mb-3" style={{ color: '#888' }}>{mission.summary}</p>

                    {/* Agents */}
                    <div className="flex items-center gap-2">
                      <span className="text-xs" style={{ color: '#555' }}>Agents:</span>
                      <div className="flex flex-wrap gap-1">
                        {mission.agentContributors.map(a => (
                          <span key={a} className="text-xs px-1.5 py-0.5 rounded" style={{ background: '#1a1a1a', color: '#00d4aa' }}>
                            {a}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Impact metrics */}
                  {mission.impactMetrics && (
                    <div className="shrink-0 text-right space-y-1">
                      {mission.impactMetrics.grantsFound !== undefined && (
                        <p className="text-xs" style={{ color: '#c6a15b' }}>
                          {mission.impactMetrics.grantsFound} grants found
                        </p>
                      )}
                      {mission.impactMetrics.documentsCreated !== undefined && (
                        <p className="text-xs" style={{ color: '#00d4aa' }}>
                          {mission.impactMetrics.documentsCreated} docs created
                        </p>
                      )}
                      {mission.impactMetrics.hoursResearched !== undefined && (
                        <p className="text-xs" style={{ color: '#888' }}>
                          {mission.impactMetrics.hoursResearched}h researched
                        </p>
                      )}
                    </div>
                  )}
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
