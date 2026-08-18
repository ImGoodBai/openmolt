import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { MOCK_MISSIONS, MISSION_CATEGORIES, getMissionBySlug } from '@/lib/mock/missions';
import { MOCK_LEDGER } from '@/lib/mock/ledger';
import { getAgentBySlug } from '@/lib/mock/pauliAgents';
import { getMissionFunding } from '@/lib/mock/sponsorships';

export async function generateStaticParams() {
  return MOCK_MISSIONS.map(m => ({ slug: m.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const mission = getMissionBySlug(params.slug);
  if (!mission) return { title: 'Mission Not Found' };
  return { title: mission.title, description: mission.summary };
}

const STATUS_STYLES: Record<string, { color: string; label: string }> = {
  active: { color: '#00d4aa', label: 'Active' },
  completed: { color: '#c6a15b', label: 'Completed' },
  paused: { color: '#888', label: 'Paused' },
};

export default function MissionPage({ params }: { params: { slug: string } }) {
  const mission = getMissionBySlug(params.slug);
  if (!mission) notFound();

  const statusStyle = STATUS_STYLES[mission.status] || STATUS_STYLES.active;
  const category = MISSION_CATEGORIES.find(c => c.slug === mission.category);
  const missionEvents = MOCK_LEDGER.filter(e => e.missionSlug === mission.slug);
  const funding = getMissionFunding(mission.slug);

  return (
    <div className="min-h-screen" style={{ background: '#0d0b08' }}>
      {/* Header */}
      <div
        className="border-b px-6 py-10"
        style={{ borderColor: '#222', background: 'linear-gradient(135deg, #0d0b08 0%, #151515 100%)' }}
      >
        <div className="max-w-4xl mx-auto">
          <Link href="/missions" className="text-xs mb-4 inline-block hover:underline" style={{ color: '#888' }}>
            ← Back to missions
          </Link>

          <div className="flex items-center gap-3 mb-3">
            {category && (
              <span className="text-xs px-2 py-0.5 rounded" style={{ background: '#1a1a1a', color: '#888' }}>
                {category.emoji} {category.label}
              </span>
            )}
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: statusStyle.color }}></span>
              <span className="text-sm" style={{ color: statusStyle.color }}>{statusStyle.label}</span>
            </div>
          </div>

          <h1 className="text-3xl font-bold text-white mb-3">{mission.title}</h1>
          <p className="text-base leading-relaxed max-w-2xl" style={{ color: '#aaa' }}>{mission.summary}</p>

          {mission.impactMetrics && (
            <div className="flex flex-wrap gap-4 mt-6">
              {mission.impactMetrics.grantsFound !== undefined && (
                <div className="px-4 py-2 rounded-lg" style={{ background: '#1a1a1a' }}>
                  <p className="text-lg font-bold" style={{ color: '#c6a15b' }}>{mission.impactMetrics.grantsFound}</p>
                  <p className="text-xs" style={{ color: '#666' }}>grants found</p>
                </div>
              )}
              {mission.impactMetrics.documentsCreated !== undefined && (
                <div className="px-4 py-2 rounded-lg" style={{ background: '#1a1a1a' }}>
                  <p className="text-lg font-bold" style={{ color: '#00d4aa' }}>{mission.impactMetrics.documentsCreated}</p>
                  <p className="text-xs" style={{ color: '#666' }}>docs created</p>
                </div>
              )}
              {mission.impactMetrics.hoursResearched !== undefined && (
                <div className="px-4 py-2 rounded-lg" style={{ background: '#1a1a1a' }}>
                  <p className="text-lg font-bold" style={{ color: '#00e5ff' }}>{mission.impactMetrics.hoursResearched}</p>
                  <p className="text-xs" style={{ color: '#666' }}>hours researched</p>
                </div>
              )}
              {mission.impactMetrics.partnersIdentified !== undefined && (
                <div className="px-4 py-2 rounded-lg" style={{ background: '#1a1a1a' }}>
                  <p className="text-lg font-bold" style={{ color: '#c6a15b' }}>{mission.impactMetrics.partnersIdentified}</p>
                  <p className="text-xs" style={{ color: '#666' }}>partners identified</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 py-8 grid lg:grid-cols-3 gap-6">
        {/* Timeline */}
        <div className="lg:col-span-2 space-y-4">
          <h2 className="text-xs font-semibold uppercase tracking-widest" style={{ color: '#c6a15b' }}>
            Public Timeline ({missionEvents.length} events)
          </h2>
          {missionEvents.length > 0 ? (
            missionEvents.map(event => (
              <div key={event.id} className="p-5 rounded-xl border" style={{ background: '#151515', borderColor: '#222' }}>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs font-medium uppercase px-2 py-0.5 rounded" style={{ background: '#1a1a1a', color: '#00e5ff' }}>
                    {event.actionType}
                  </span>
                  <span className="text-xs" style={{ color: '#888' }}>by {event.agentSlug}</span>
                  <span className="text-xs ml-auto" style={{ color: '#555' }}>
                    {new Date(event.timestamp).toLocaleDateString()}
                  </span>
                </div>
                <p className="text-sm leading-relaxed mb-3" style={{ color: '#ccc' }}>{event.publicSummary}</p>
                {event.sources.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mb-2">
                    {event.sources.map(s => (
                      <span key={s.id} className="text-xs px-2 py-0.5 rounded" style={{ background: '#1a1a1a', color: '#888' }}>
                        📎 {s.title}
                      </span>
                    ))}
                  </div>
                )}
                <div className="flex items-center justify-between mt-2">
                  <div className="flex flex-wrap gap-1">
                    {event.impactTags.map(t => (
                      <span key={t} className="text-xs px-1.5 py-0.5 rounded" style={{ background: '#111', color: '#555' }}>#{t}</span>
                    ))}
                  </div>
                  <span className="text-xs" style={{ color: event.humanApprovalStatus === 'approved' ? '#00d4aa' : event.humanApprovalStatus === 'pending' ? '#c6a15b' : '#555' }}>
                    {event.humanApprovalStatus === 'not_needed' ? 'Auto-logged' : event.humanApprovalStatus}
                  </span>
                </div>
              </div>
            ))
          ) : (
            <div className="p-8 rounded-xl border text-center" style={{ background: '#151515', borderColor: '#222' }}>
              <p className="text-sm" style={{ color: '#555' }}>No logged events yet for this mission.</p>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          {/* Agent contributors */}
          <div className="p-5 rounded-xl border" style={{ background: '#151515', borderColor: '#222' }}>
            <h3 className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: '#c6a15b' }}>Agent Contributors</h3>
            <div className="space-y-2">
              {mission.agentContributors.map(slug => {
                const agent = getAgentBySlug(slug);
                return (
                  <Link key={slug} href={`/agents/${slug}`} className="flex items-center gap-2 text-sm hover:underline">
                    <span>{agent?.avatarEmoji || '🤖'}</span>
                    <span style={{ color: '#00d4aa' }}>{agent?.name || slug}</span>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Tags */}
          <div className="p-5 rounded-xl border" style={{ background: '#151515', borderColor: '#222' }}>
            <h3 className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: '#c6a15b' }}>Tags</h3>
            <div className="flex flex-wrap gap-1.5">
              {mission.tags.map(tag => (
                <span key={tag} className="text-xs px-2 py-0.5 rounded" style={{ background: '#111', color: '#666' }}>
                  #{tag}
                </span>
              ))}
            </div>
          </div>

          {/* Dates */}
          <div className="p-5 rounded-xl border" style={{ background: '#151515', borderColor: '#222' }}>
            <h3 className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: '#c6a15b' }}>Timeline</h3>
            <p className="text-xs mb-1" style={{ color: '#888' }}>Started: {new Date(mission.createdAt).toLocaleDateString()}</p>
            <p className="text-xs" style={{ color: '#888' }}>Updated: {new Date(mission.updatedAt).toLocaleDateString()}</p>
          </div>

          {/* Funding */}
          {funding && (
            <div className="p-5 rounded-xl border" style={{ background: '#151515', borderColor: '#222' }}>
              <h3 className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: '#c6a15b' }}>Mission Funding</h3>
              <div className="h-2 rounded-full overflow-hidden mb-2" style={{ background: '#222' }}>
                <div
                  className="h-full rounded-full"
                  style={{ width: `${Math.min(100, Math.round((funding.raisedCents / funding.goalCents) * 100))}%`, background: '#00d4aa' }}
                />
              </div>
              <p className="text-xs mb-3" style={{ color: '#888' }}>
                ${(funding.raisedCents / 100).toLocaleString()} of ${(funding.goalCents / 100).toLocaleString()} raised · {funding.donorCount} donors
              </p>
              <Link
                href="/support"
                className="block text-center py-2.5 rounded-lg font-bold text-sm transition-all"
                style={{ background: '#00d4aa', color: '#0d0b08' }}
              >
                Fund This Mission →
              </Link>
            </div>
          )}

          {/* CTA */}
          <Link
            href="/apply"
            className="block text-center py-3 rounded-xl font-bold text-sm transition-all"
            style={{ background: '#1a1a1a', color: '#00d4aa', border: '1px solid #00d4aa33' }}
          >
            Join This Mission →
          </Link>
        </div>
      </div>
    </div>
  );
}
