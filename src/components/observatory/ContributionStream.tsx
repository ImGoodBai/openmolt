'use client';

import type { LedgerEntry } from '@/lib/mock/ledger';

const ACTION_STYLES: Record<string, { emoji: string; color: string }> = {
  research: { emoji: '🔍', color: '#00e5ff' },
  draft: { emoji: '✍️', color: '#c6a15b' },
  publish: { emoji: '📢', color: '#00d4aa' },
  fundraise: { emoji: '💰', color: '#c6a15b' },
  podcast: { emoji: '🎙️', color: '#00e5ff' },
  social: { emoji: '📣', color: '#00d4aa' },
  council: { emoji: '🏛️', color: '#c6a15b' },
  approval: { emoji: '✅', color: '#00d4aa' },
};

const APPROVAL_LABELS: Record<string, { label: string; color: string }> = {
  not_needed: { label: 'No review needed', color: '#888' },
  pending: { label: 'Pending human review', color: '#c6a15b' },
  approved: { label: 'Human approved', color: '#00d4aa' },
  rejected: { label: 'Rejected', color: '#e01b24' },
};

interface Props {
  events: LedgerEntry[];
}

export function ContributionStream({ events }: Props) {
  return (
    <div className="space-y-3">
      {events.map(event => {
        const actionStyle = ACTION_STYLES[event.actionType] || { emoji: '📋', color: '#888' };
        const approvalStyle = APPROVAL_LABELS[event.humanApprovalStatus];

        return (
          <div
            key={event.id}
            className="rounded-xl border p-5"
            style={{ background: '#151515', borderColor: '#222' }}
          >
            {/* Header row */}
            <div className="flex items-start justify-between gap-3 mb-3">
              <div className="flex items-center gap-2">
                <span className="text-lg">{actionStyle.emoji}</span>
                <div>
                  <span className="text-xs font-medium" style={{ color: actionStyle.color }}>
                    {event.actionType.toUpperCase()}
                  </span>
                  <span className="text-xs mx-2" style={{ color: '#555' }}>by</span>
                  <span className="text-xs text-white font-medium">{event.agentSlug}</span>
                </div>
              </div>
              <span className="text-xs shrink-0" style={{ color: '#555' }}>
                {new Date(event.timestamp).toLocaleString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
              </span>
            </div>

            {/* Summary */}
            <p className="text-sm mb-3 leading-relaxed" style={{ color: '#ccc' }}>
              {event.publicSummary}
            </p>

            {/* Sources */}
            {event.sources.length > 0 && (
              <div className="mb-3">
                <p className="text-xs font-medium mb-1.5" style={{ color: '#666' }}>Sources used:</p>
                <div className="flex flex-wrap gap-1.5">
                  {event.sources.map(source => (
                    <span key={source.id} className="text-xs px-2 py-0.5 rounded" style={{ background: '#1a1a1a', color: '#888', border: '1px solid #222' }}>
                      {source.title}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Artifacts */}
            {event.artifacts.length > 0 && (
              <div className="mb-3">
                <p className="text-xs font-medium mb-1.5" style={{ color: '#666' }}>Artifacts created:</p>
                <div className="flex flex-wrap gap-1.5">
                  {event.artifacts.map(artifact => (
                    <span key={artifact.id} className="text-xs px-2 py-0.5 rounded" style={{ background: '#1a2a20', color: '#00d4aa', border: '1px solid #00d4aa22' }}>
                      {artifact.title}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Footer */}
            <div className="flex items-center justify-between pt-3 border-t" style={{ borderColor: '#1a1a1a' }}>
              <div className="flex gap-1.5">
                {event.impactTags.map(tag => (
                  <span key={tag} className="text-xs px-1.5 py-0.5 rounded" style={{ background: '#111', color: '#555' }}>
                    #{tag}
                  </span>
                ))}
              </div>
              <span className="text-xs" style={{ color: approvalStyle.color }}>
                {approvalStyle.label}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
