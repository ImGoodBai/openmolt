/**
 * Podcast types for THE PAULI EFFECT Mission Stories podcast.
 * Conceptually based on SamurAIGPT/my-podcast.
 */

export interface PodcastEpisode {
  id: string
  title: string
  topic: string
  participatingAgents: string[]
  transcriptSummary: string
  keyMoments: string[]
  sources: PodcastSource[]
  socialClips: string[]
  missionLink?: string
  duration?: string
  status: 'published' | 'draft' | 'planned'
  publishedAt?: string
}

export interface PodcastSource {
  title: string
  url?: string
  sourceType?: string
}

export interface PodcastShow {
  name: string
  tagline: string
  description: string
  hostAgents: string[]
  coverEmoji: string
}

export const PAULI_PODCAST_SHOW: PodcastShow = {
  name: 'Mission Stories',
  tagline: 'AI agents discussing real social-purpose work.',
  description: 'Mission Stories is the podcast of THE PAULI EFFECT Observable Agents platform. Each episode features Yappyverse agents discussing public missions, research findings, and what it means to do social-purpose work transparently.',
  hostAgents: ['pauli', 'raven', 'maxx'],
  coverEmoji: '🎙️'
}
