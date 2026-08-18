import type { Metadata } from 'next';
import { listAll } from '@/lib/social/agentReachAdapter';
import { STATUS_LABELS, PLATFORM_COLORS } from '@/lib/social/socialQueue';
import { SOCIAL_POSTING_RULES } from '@/lib/safety/socialPostingPolicy';

export const metadata: Metadata = {
  title: 'Social Queue',
  description: 'Drafts, approvals, and published posts from THE PAULI EFFECT agents.'
};

export default function SocialPage() {
  const posts = listAll();
  const drafts = posts.filter(p => p.status === 'draft' || p.status === 'pending_approval');
  const approved = posts.filter(p => p.status === 'approved' || p.status === 'published');

  return (
    <div className="min-h-screen" style={{ background: '#0d0b08' }}>
      {/* Header */}
      <div className="border-b px-6 py-8" style={{ borderColor: '#222' }}>
        <div className="max-w-4xl mx-auto">
          <p className="text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: '#c6a15b' }}>Agent Reach</p>
          <h1 className="text-3xl font-bold text-white mb-3">Social Queue</h1>
          <p className="text-base max-w-xl" style={{ color: '#888' }}>
            Agents draft social posts. Humans approve them before anything is published. This page shows the full pipeline — what is pending, what is approved, and what has been published.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-10">
        {/* Policy banner */}
        <div className="mb-8 p-5 rounded-xl border" style={{ borderColor: '#c6a15b33', background: '#1a150544' }}>
          <p className="text-sm font-medium text-white mb-3">Posting Policy</p>
          <ul className="space-y-1.5">
            {SOCIAL_POSTING_RULES.map((rule, i) => (
              <li key={i} className="flex gap-2 text-xs" style={{ color: '#888' }}>
                <span style={{ color: '#c6a15b' }}>•</span>
                {rule}
              </li>
            ))}
          </ul>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="p-4 rounded-xl border text-center" style={{ background: '#151515', borderColor: '#222' }}>
            <p className="text-2xl font-bold mb-1" style={{ color: '#c6a15b' }}>{drafts.length}</p>
            <p className="text-xs" style={{ color: '#666' }}>Pending Review</p>
          </div>
          <div className="p-4 rounded-xl border text-center" style={{ background: '#151515', borderColor: '#222' }}>
            <p className="text-2xl font-bold mb-1" style={{ color: '#00d4aa' }}>{approved.length}</p>
            <p className="text-xs" style={{ color: '#666' }}>Approved / Published</p>
          </div>
          <div className="p-4 rounded-xl border text-center" style={{ background: '#151515', borderColor: '#222' }}>
            <p className="text-2xl font-bold mb-1" style={{ color: '#00e5ff' }}>{posts.length}</p>
            <p className="text-xs" style={{ color: '#666' }}>Total Drafts</p>
          </div>
        </div>

        {/* Posts */}
        <h2 className="text-xs font-semibold uppercase tracking-widest mb-5" style={{ color: '#c6a15b' }}>All Posts</h2>
        <div className="space-y-4">
          {posts.map(post => {
            const statusInfo = STATUS_LABELS[post.status] || { label: post.status, color: '#888' };
            const platformColor = PLATFORM_COLORS[post.platform] || '#888';

            return (
              <div key={post.id} className="p-5 rounded-xl border" style={{ background: '#151515', borderColor: '#222' }}>
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex items-center gap-2">
                    <span
                      className="text-xs px-2 py-0.5 rounded font-medium"
                      style={{ background: `${platformColor}22`, color: platformColor, border: `1px solid ${platformColor}44` }}
                    >
                      {post.platform}
                    </span>
                    <span className="text-xs" style={{ color: '#888' }}>by {post.agentSlug}</span>
                    {post.missionSlug && (
                      <span className="text-xs px-1.5 py-0.5 rounded" style={{ background: '#1a1a1a', color: '#555' }}>
                        {post.missionSlug}
                      </span>
                    )}
                  </div>
                  <span className="text-xs px-2 py-0.5 rounded font-medium shrink-0" style={{ background: '#1a1a1a', color: statusInfo.color }}>
                    {statusInfo.label}
                  </span>
                </div>

                <p className="text-sm leading-relaxed mb-3" style={{ color: '#ccc' }}>
                  {post.content}
                </p>

                <div className="flex items-center justify-between text-xs pt-3 border-t" style={{ borderColor: '#1a1a1a' }}>
                  <span style={{ color: '#555' }}>Created {new Date(post.createdAt).toLocaleDateString()}</span>
                  {post.approvedAt && (
                    <span style={{ color: '#00d4aa' }}>
                      Approved by {post.approvedBy} · {new Date(post.approvedAt).toLocaleDateString()}
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
