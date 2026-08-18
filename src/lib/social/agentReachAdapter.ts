/**
 * Agent Reach Adapter — social dispatch interface.
 * Conceptually based on Panniantong/Agent-Reach.
 * Returns mock data until real credentials exist.
 * All posts require human approval before publication.
 */

export interface SocialPost {
  id: string
  agentSlug: string
  missionSlug?: string
  platform: string
  content: string
  status: 'draft' | 'pending_approval' | 'approved' | 'published' | 'rejected'
  publicUrl?: string
  approvedBy?: string
  createdAt: string
  approvedAt?: string
  scheduledAt?: string
}

const MOCK_POSTS: SocialPost[] = [
  {
    id: 'post-001',
    agentSlug: 'pauli',
    missionSlug: 'nonprofit-ai-transparency',
    platform: 'linkedin',
    content: 'THE PAULI EFFECT Agent Council just published a new summary on AI transparency for nonprofits. Key finding: trust is built through transparency, not perfection. Full summary on the platform. #SeattleAI #SocialPurpose',
    status: 'pending_approval',
    createdAt: '2026-06-29T08:00:00Z'
  },
  {
    id: 'post-002',
    agentSlug: 'grant-scout',
    missionSlug: 'seattle-food-access',
    platform: 'twitter',
    content: 'Grant Scout found 5 active funding opportunities for King County food access programs. ~$2.4M available. Research brief ready for human review. #FoodAccess #Seattle',
    status: 'pending_approval',
    createdAt: '2026-06-28T14:00:00Z'
  },
  {
    id: 'post-003',
    agentSlug: 'raven',
    missionSlug: 'nonprofit-ai-transparency',
    platform: 'linkedin',
    content: 'Published: Agent Council Summary on AI transparency for small nonprofits. See what we found about trust, disclosure, and responsible automation. Read the full public summary at THE PAULI EFFECT.',
    status: 'approved',
    approvedBy: 'human-reviewer',
    createdAt: '2026-06-27T10:00:00Z',
    approvedAt: '2026-06-27T11:30:00Z'
  }
]

export function createDraftPost(
  agentSlug: string,
  content: string,
  platform: string,
  missionSlug?: string
): SocialPost {
  return {
    id: `post-${Date.now()}`,
    agentSlug,
    missionSlug,
    platform,
    content,
    status: 'draft',
    createdAt: new Date().toISOString()
  }
}

export function approveDraftPost(postId: string, approvedBy: string): SocialPost | null {
  const post = MOCK_POSTS.find(p => p.id === postId)
  if (!post) return null
  return { ...post, status: 'approved', approvedBy, approvedAt: new Date().toISOString() }
}

export function schedulePost(postId: string, scheduledAt: string): SocialPost | null {
  const post = MOCK_POSTS.find(p => p.id === postId)
  if (!post || post.status !== 'approved') return null
  return { ...post, scheduledAt }
}

export function listDrafts(): SocialPost[] {
  return MOCK_POSTS.filter(p => p.status === 'draft' || p.status === 'pending_approval')
}

export function listPublished(): SocialPost[] {
  return MOCK_POSTS.filter(p => p.status === 'published' || p.status === 'approved')
}

export function listAll(): SocialPost[] {
  return MOCK_POSTS
}
