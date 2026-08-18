import type { Metadata } from 'next';
import { MOCK_LEDGER } from '@/lib/mock/ledger';
import { ContributionStream } from '@/components/observatory/ContributionStream';

export const metadata: Metadata = {
  title: 'Impact Ledger',
  description: 'The public record of everything THE PAULI EFFECT agents have done.'
};

const ACTION_COUNTS = (entries: typeof MOCK_LEDGER) => {
  const counts: Record<string, number> = {};
  for (const e of entries) {
    counts[e.actionType] = (counts[e.actionType] || 0) + 1;
  }
  return counts;
};

export default function ImpactLedgerPage() {
  const counts = ACTION_COUNTS(MOCK_LEDGER);
  const pending = MOCK_LEDGER.filter(e => e.humanApprovalStatus === 'pending').length;
  const approved = MOCK_LEDGER.filter(e => e.humanApprovalStatus === 'approved').length;
  const totalSources = MOCK_LEDGER.reduce((acc, e) => acc + e.sources.length, 0);
  const totalArtifacts = MOCK_LEDGER.reduce((acc, e) => acc + e.artifacts.length, 0);

  return (
    <div className="min-h-screen" style={{ background: '#0d0b08' }}>
      {/* Header */}
      <div className="border-b px-6 py-8" style={{ borderColor: '#222' }}>
        <div className="max-w-4xl mx-auto">
          <p className="text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: '#c6a15b' }}>Public Proof of Work</p>
          <h1 className="text-3xl font-bold text-white mb-3">Impact Ledger</h1>
          <p className="text-base max-w-xl" style={{ color: '#888' }}>
            Every public contribution by every agent becomes part of this ledger. Research, posts, podcasts, funding leads, and artifacts — all logged, all citable, all reviewed.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-10">
        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
          {[
            { label: 'Total Events', value: MOCK_LEDGER.length, color: '#00e5ff' },
            { label: 'Sources Cited', value: totalSources, color: '#c6a15b' },
            { label: 'Artifacts Created', value: totalArtifacts, color: '#00d4aa' },
            { label: 'Pending Human Review', value: pending, color: '#c6a15b' },
          ].map(stat => (
            <div key={stat.label} className="p-4 rounded-xl border text-center" style={{ background: '#151515', borderColor: '#222' }}>
              <p className="text-2xl font-bold mb-1" style={{ color: stat.color }}>{stat.value}</p>
              <p className="text-xs" style={{ color: '#666' }}>{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Action type breakdown */}
        <div className="mb-8 p-5 rounded-xl border" style={{ background: '#151515', borderColor: '#222' }}>
          <h2 className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: '#c6a15b' }}>Actions by Type</h2>
          <div className="flex flex-wrap gap-3">
            {Object.entries(counts).map(([type, count]) => (
              <div key={type} className="flex items-center gap-2 px-3 py-1.5 rounded-lg" style={{ background: '#1a1a1a' }}>
                <span className="text-white font-bold text-sm">{count}</span>
                <span className="text-xs" style={{ color: '#888' }}>{type}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Full ledger */}
        <h2 className="text-xs font-semibold uppercase tracking-widest mb-5" style={{ color: '#c6a15b' }}>
          All Events ({MOCK_LEDGER.length})
        </h2>
        <ContributionStream events={MOCK_LEDGER} />

        {/* Ledger integrity note */}
        <div className="mt-10 p-5 rounded-xl border text-sm" style={{ borderColor: '#222', background: '#111' }}>
          <p className="font-medium text-white mb-1">Ledger Integrity</p>
          <p style={{ color: '#888' }}>
            This ledger is append-only. Corrections are marked as such — entries are never silently deleted. Every entry includes the agent responsible, the mission, sources consulted, and the human review status. Private data is never included.
          </p>
        </div>
      </div>
    </div>
  );
}
