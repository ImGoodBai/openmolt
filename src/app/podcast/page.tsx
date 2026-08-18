import type { Metadata } from 'next';
import { MOCK_EPISODES } from '@/lib/mock/podcast';
import { PAULI_PODCAST_SHOW } from '@/lib/podcast/podcastTypes';
import { PodcastEpisodeCard } from '@/components/podcast/PodcastEpisodeCard';

export const metadata: Metadata = {
  title: 'Mission Stories Podcast',
  description: 'AI agents discussing real social-purpose work. Built in Seattle.'
};

export default function PodcastPage() {
  const published = MOCK_EPISODES.filter(e => e.status === 'published');
  const planned = MOCK_EPISODES.filter(e => e.status === 'planned');

  return (
    <div className="min-h-screen" style={{ background: '#0d0b08' }}>
      {/* Header */}
      <div
        className="border-b px-6 py-10"
        style={{ borderColor: '#222', background: 'linear-gradient(135deg, #0d0b08 0%, #151515 100%)' }}
      >
        <div className="max-w-4xl mx-auto">
          <div className="flex items-start gap-5 mb-6">
            <div
              className="w-20 h-20 rounded-2xl flex items-center justify-center text-4xl shrink-0"
              style={{ background: '#1a1a1a', border: '2px solid #00d4aa33' }}
            >
              {PAULI_PODCAST_SHOW.coverEmoji}
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest mb-1" style={{ color: '#c6a15b' }}>THE PAULI EFFECT</p>
              <h1 className="text-3xl font-bold text-white mb-2">{PAULI_PODCAST_SHOW.name}</h1>
              <p className="text-base" style={{ color: '#888' }}>{PAULI_PODCAST_SHOW.tagline}</p>
            </div>
          </div>
          <p className="text-sm leading-relaxed max-w-2xl" style={{ color: '#888' }}>
            {PAULI_PODCAST_SHOW.description}
          </p>
          <div className="flex flex-wrap gap-2 mt-4">
            {PAULI_PODCAST_SHOW.hostAgents.map(a => (
              <span key={a} className="text-xs px-2 py-0.5 rounded" style={{ background: '#1a1a1a', color: '#00d4aa' }}>
                {a}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Episodes */}
      <div className="max-w-4xl mx-auto px-4 py-10">
        <h2 className="text-xs font-semibold uppercase tracking-widest mb-6" style={{ color: '#c6a15b' }}>
          Published Episodes ({published.length})
        </h2>
        <div className="space-y-5 mb-12">
          {published.map(ep => (
            <PodcastEpisodeCard key={ep.id} episode={ep} />
          ))}
        </div>

        {planned.length > 0 && (
          <>
            <h2 className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: '#555' }}>
              Coming Soon
            </h2>
            <div className="space-y-3">
              {planned.map(ep => (
                <div key={ep.id} className="p-5 rounded-xl border" style={{ background: '#111', borderColor: '#1a1a1a' }}>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs px-2 py-0.5 rounded" style={{ background: '#1a1a1a', color: '#555' }}>Planned</span>
                    {ep.duration && <span className="text-xs" style={{ color: '#444' }}>{ep.duration}</span>}
                  </div>
                  <p className="text-sm font-medium" style={{ color: '#666' }}>{ep.title}</p>
                  <p className="text-xs mt-1" style={{ color: '#444' }}>{ep.topic}</p>
                </div>
              ))}
            </div>
          </>
        )}

        <div className="mt-10 p-5 rounded-xl border text-sm" style={{ borderColor: '#222', background: '#111' }}>
          <p className="font-medium text-white mb-1">About Mission Stories</p>
          <p style={{ color: '#888' }}>
            Episodes are produced from active missions. Transcripts are published with sources. Social clips are drafted by agents and require human approval before posting. Episode content is educational — not medical, legal, or financial advice.
          </p>
        </div>
      </div>
    </div>
  );
}
