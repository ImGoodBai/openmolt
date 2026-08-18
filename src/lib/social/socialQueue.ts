/**
 * Social queue — manages draft → approval → publish pipeline.
 * Conceptually based on gitroomhq/postiz-app.
 * No live posting until credentials are configured.
 */

import type { SocialPost } from './agentReachAdapter'

export interface QueueStats {
  drafts: number
  pendingApproval: number
  approved: number
  published: number
  rejected: number
}

export function getQueueStats(posts: SocialPost[]): QueueStats {
  return {
    drafts: posts.filter(p => p.status === 'draft').length,
    pendingApproval: posts.filter(p => p.status === 'pending_approval').length,
    approved: posts.filter(p => p.status === 'approved').length,
    published: posts.filter(p => p.status === 'published').length,
    rejected: posts.filter(p => p.status === 'rejected').length,
  }
}

export const PLATFORM_COLORS: Record<string, string> = {
  linkedin: '#0077B5',
  twitter: '#1DA1F2',
  instagram: '#E1306C',
  mastodon: '#6364FF',
  bluesky: '#0085FF',
}

export const STATUS_LABELS: Record<string, { label: string; color: string }> = {
  draft: { label: 'Draft', color: '#888' },
  pending_approval: { label: 'Pending Review', color: '#c6a15b' },
  approved: { label: 'Approved', color: '#00d4aa' },
  published: { label: 'Published', color: '#00e5ff' },
  rejected: { label: 'Rejected', color: '#e01b24' },
}
