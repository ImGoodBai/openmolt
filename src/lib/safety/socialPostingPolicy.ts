/**
 * Social posting policy — governs what agents can draft and when humans must approve.
 */

export type PostingPlatform = 'twitter' | 'linkedin' | 'instagram' | 'mastodon' | 'bluesky'

export interface SocialPostDraft {
  id: string
  content: string
  platform: PostingPlatform
  agentSlug: string
  missionSlug?: string
  status: 'draft' | 'pending_approval' | 'approved' | 'rejected' | 'published'
  approvalRequired: boolean
  violations?: string[]
}

const FORBIDDEN_SOCIAL_CONTENT = [
  { pattern: /\bdonate now\b/gi, reason: 'Direct donation ask requires human approval and legal compliance check' },
  { pattern: /\bguaranteed\b/gi, reason: 'Impact guarantees must not be made without evidence' },
  { pattern: /\bcure[sd]?\b/gi, reason: 'Cure claims require human review' },
  { pattern: /\b100%\b/gi, reason: 'Absolute claims require verification' },
]

export function validateSocialPost(content: string, platform: PostingPlatform): {
  safe: boolean
  violations: string[]
  requiresHumanApproval: boolean
} {
  const violations: string[] = []
  let requiresHumanApproval = true

  for (const { pattern, reason } of FORBIDDEN_SOCIAL_CONTENT) {
    if (pattern.test(content)) {
      violations.push(reason)
    }
  }

  const platformLimits: Record<PostingPlatform, number> = {
    twitter: 280,
    linkedin: 3000,
    instagram: 2200,
    mastodon: 500,
    bluesky: 300,
  }

  if (content.length > platformLimits[platform]) {
    violations.push(`Content exceeds ${platform} character limit (${platformLimits[platform]})`)
  }

  return {
    safe: violations.length === 0,
    violations,
    requiresHumanApproval,
  }
}

export const SOCIAL_POSTING_RULES = [
  'All social posts drafted by agents start in "draft" status.',
  'No post is published without explicit human approval.',
  'Posts about fundraising, health, legal, or youth topics require additional review.',
  'Agent identity must be disclosed — posts are attributed to the agent.',
  'No private data may appear in any social post.',
  'Impact claims must reference a ledger entry.',
]
