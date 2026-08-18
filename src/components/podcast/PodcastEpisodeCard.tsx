'use client';

import { useState } from 'react';
import type { PodcastEpisode } from '@/lib/mock/podcast';

interface Props {
  episode: PodcastEpisode;
}

export function PodcastEpisodeCard({ episode }: Props) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="rounded-xl border overflow-hidden" style={{ background: '#151515', borderColor: '#222' }}>
      {/* Header */}
      <div className="p-6">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs px-2 py-0.5 rounded font-medium" style={{ background: '#1a2a20', color: '#00d4aa', border: '1px solid #00d4aa22' }}>
                Published
              </span>
              {episode.duration && (
                <span className="text-xs" style={{ color: '#555' }}>{episode.duration}</span>
              )}
              {episode.publishedAt && (
                <span className="text-xs" style={{ color: '#555' }}>
                  {new Date(episode.publishedAt).toLocaleDateString()}
                </span>
              )}
            </div>
            <h3 className="text-white font-bold text-lg mb-1">{episode.title}</h3>
            <p className="text-sm mb-3" style={{ color: '#888' }}>{episode.topic}</p>

            <div className="flex flex-wrap gap-1.5">
              {episode.participatingAgents.map(a => (
                <span key={a} className="text-xs px-2 py-0.5 rounded" style={{ background: '#1a1a1a', color: '#00d4aa' }}>
                  {a}
                </span>
              ))}
            </div>
          </div>

          <div
            className="w-14 h-14 rounded-xl flex items-center justify-center text-2xl shrink-0"
            style={{ background: '#1a1a1a', border: '1px solid #222' }}
          >
            🎙️
          </div>
        </div>
      </div>

      {/* Summary + expand */}
      <div className="px-6 pb-2">
        <p className="text-sm leading-relaxed" style={{ color: '#aaa' }}>
          {episode.transcriptSummary}
        </p>
      </div>

      {/* Key moments */}
      {episode.keyMoments.length > 0 && expanded && (
        <div className="px-6 pb-4">
          <p className="text-xs font-semibold uppercase tracking-widest mb-2 mt-4" style={{ color: '#c6a15b' }}>Key Moments</p>
          <ul className="space-y-1.5">
            {episode.keyMoments.map((moment, i) => (
              <li key={i} className="text-xs" style={{ color: '#888' }}>⏱ {moment}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Social clips */}
      {episode.socialClips.length > 0 && expanded && (
        <div className="px-6 pb-4">
          <p className="text-xs font-semibold uppercase tracking-widest mb-2 mt-2" style={{ color: '#c6a15b' }}>Social Clips</p>
          <div className="space-y-2">
            {episode.socialClips.map((clip, i) => (
              <div key={i} className="text-xs p-3 rounded-lg italic" style={{ background: '#111', color: '#888', borderLeft: '2px solid #00d4aa44' }}>
                {clip}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Sources */}
      {episode.sources.length > 0 && expanded && (
        <div className="px-6 pb-4">
          <p className="text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: '#c6a15b' }}>Sources</p>
          <div className="flex flex-wrap gap-1.5">
            {episode.sources.map((s, i) => (
              <span key={i} className="text-xs px-2 py-0.5 rounded" style={{ background: '#1a1a1a', color: '#888', border: '1px solid #222' }}>
                📎 {s.title}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Footer */}
      <div className="px-6 py-4 border-t flex items-center justify-between" style={{ borderColor: '#1a1a1a' }}>
        <button
          onClick={() => setExpanded(!expanded)}
          className="text-xs hover:underline"
          style={{ color: '#00d4aa' }}
        >
          {expanded ? 'Show less' : 'Show transcript & sources'}
        </button>
        {episode.missionLink && (
          <a href={`/missions/${episode.missionLink}`} className="text-xs hover:underline" style={{ color: '#888' }}>
            View mission →
          </a>
        )}
      </div>
    </div>
  );
}
