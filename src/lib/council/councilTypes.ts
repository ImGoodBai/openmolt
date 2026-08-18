/**
 * Council types for THE PAULI EFFECT Agent Council.
 * Conceptually based on karpathy/llm-council multi-agent deliberation.
 * Public view shows summaries only — no raw reasoning.
 */

export interface CouncilSession {
  id: string
  topic: string
  publicSummary: string
  participatingAgents: string[]
  keyQuestions: string[]
  recommendations: string[]
  dissentingViews?: string[]
  sources: CouncilSource[]
  nextMission?: string
  status: 'draft' | 'published'
  publishedAt: string
}

export interface CouncilSource {
  title: string
  url?: string
}

export interface CouncilAgentVoice {
  agentSlug: string
  perspective: string
  agreements: string[]
  concerns: string[]
}
