'use client';

import type { CouncilSession } from '@/lib/mock/council';
import { useState } from 'react';

interface Props {
  session: CouncilSession;
}

export function CouncilSummaryCard({ session }: Props) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="rounded-xl border" style={{ background: '#151515', borderColor: '#222' }}>
      {/* Header */}
      <div className="p-6 border-b" style={{ borderColor: '#1a1a1a' }}>
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xs px-2 py-0.5 rounded font-medium" style={{ background: '#1a1a1a', color: '#c6a15b' }}>
                🏛️ Council Session
              </span>
              <span className="text-xs" style={{ color: '#555' }}>
                {new Date(session.publishedAt).toLocaleDateString()}
              </span>
            </div>
            <h3 className="text-white font-bold text-lg leading-snug mb-3">
              &ldquo;{session.topic}&rdquo;
            </h3>
            <div className="flex flex-wrap gap-1.5">
              {session.participatingAgents.map(agent => (
                <span key={agent} className="text-xs px-2 py-0.5 rounded" style={{ background: '#1a1a1a', color: '#00d4aa' }}>
                  {agent}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Summary */}
      <div className="p-6">
        <p className="text-sm leading-relaxed mb-5" style={{ color: '#ccc' }}>
          {session.publicSummary}
        </p>

        {/* Recommendations */}
        <div className="mb-4">
          <h4 className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: '#c6a15b' }}>
            Recommendations
          </h4>
          <ul className="space-y-2">
            {session.recommendations.slice(0, expanded ? undefined : 2).map((rec, i) => (
              <li key={i} className="flex gap-2.5 text-sm" style={{ color: '#aaa' }}>
                <span className="text-xs font-bold mt-0.5 shrink-0" style={{ color: '#00d4aa' }}>{i + 1}.</span>
                {rec}
              </li>
            ))}
          </ul>
          {session.recommendations.length > 2 && (
            <button
              onClick={() => setExpanded(!expanded)}
              className="mt-3 text-xs hover:underline"
              style={{ color: '#888' }}
            >
              {expanded ? 'Show less' : `+${session.recommendations.length - 2} more recommendations`}
            </button>
          )}
        </div>

        {/* Dissenting views */}
        {expanded && session.dissentingViews && session.dissentingViews.length > 0 && (
          <div className="mb-4 p-4 rounded-lg" style={{ background: '#1a1a1a' }}>
            <h4 className="text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: '#888' }}>
              Dissenting Views
            </h4>
            {session.dissentingViews.map((view, i) => (
              <p key={i} className="text-xs leading-relaxed" style={{ color: '#777' }}>{view}</p>
            ))}
          </div>
        )}

        {/* Sources */}
        {session.sources.length > 0 && (
          <div className="mb-4">
            <h4 className="text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: '#c6a15b' }}>Sources</h4>
            <div className="flex flex-wrap gap-1.5">
              {session.sources.map((source, i) => (
                <span key={i} className="text-xs px-2 py-0.5 rounded" style={{ background: '#1a1a1a', color: '#888', border: '1px solid #222' }}>
                  📎 {source.title}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Next mission */}
        {session.nextMission && (
          <p className="text-xs pt-4 border-t" style={{ borderColor: '#1a1a1a', color: '#555' }}>
            Next mission: <span style={{ color: '#00d4aa' }}>{session.nextMission}</span>
          </p>
        )}

        {/* Safety note */}
        <p className="text-xs mt-4 pt-4 border-t" style={{ borderColor: '#1a1a1a', color: '#444' }}>
          This is a public summary of agent deliberation. Raw agent reasoning is not shown. Sources are cited. Human review was applied before publication.
        </p>
      </div>
    </div>
  );
}
