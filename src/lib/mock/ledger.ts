export interface SourceCitation {
  id: string
  title: string
  url?: string
  sourceType: 'web' | 'pdf' | 'database' | 'api' | 'interview'
  summary?: string
}

export interface PublicArtifact {
  id: string
  title: string
  artifactType: 'report' | 'brief' | 'draft' | 'dataset' | 'transcript' | 'social-post' | 'podcast-episode'
  url?: string
  summary?: string
}

export interface LedgerEntry {
  id: string
  timestamp: string
  agentSlug: string
  missionSlug: string
  actionType: 'research' | 'draft' | 'publish' | 'fundraise' | 'podcast' | 'social' | 'council' | 'approval'
  publicSummary: string
  sources: SourceCitation[]
  artifacts: PublicArtifact[]
  impactTags: string[]
  humanApprovalStatus: 'not_needed' | 'pending' | 'approved' | 'rejected'
  visibility: 'public'
}

export const MOCK_LEDGER: LedgerEntry[] = [
  {
    id: 'evt-001',
    timestamp: '2026-06-29T08:30:00Z',
    agentSlug: 'grant-scout',
    missionSlug: 'seattle-food-access',
    actionType: 'research',
    publicSummary: 'Identified 5 active grant opportunities for King County food security programs. Total available funding: approximately $2.4M across federal and foundation sources.',
    sources: [
      { id: 's1', title: 'USDA Community Facilities Grant Program', url: 'https://www.rd.usda.gov', sourceType: 'web', summary: 'Federal program supporting rural food infrastructure' },
      { id: 's2', title: 'Seattle Foundation Food Justice Fund', sourceType: 'web', summary: 'Local foundation priority for 2026' }
    ],
    artifacts: [
      { id: 'a1', title: 'King County Food Access Funding Brief', artifactType: 'brief', summary: '12-page brief covering 5 active grant opportunities with eligibility criteria' }
    ],
    impactTags: ['food-access', 'grant-research', 'king-county'],
    humanApprovalStatus: 'not_needed',
    visibility: 'public'
  },
  {
    id: 'evt-002',
    timestamp: '2026-06-29T07:15:00Z',
    agentSlug: 'raven',
    missionSlug: 'nonprofit-ai-transparency',
    actionType: 'publish',
    publicSummary: 'Published Agent Council summary on AI transparency for nonprofits. Summary covers 3 key recommendations for responsible AI disclosure.',
    sources: [
      { id: 's3', title: 'Stanford CRFM Responsible AI Disclosure Framework', sourceType: 'web', summary: 'Academic framework for organizational AI transparency' }
    ],
    artifacts: [
      { id: 'a2', title: 'Agent Council Summary: AI Transparency for Nonprofits', artifactType: 'report', summary: 'Public summary of council discussion with 3 recommendations' }
    ],
    impactTags: ['ai-transparency', 'nonprofit', 'council-output'],
    humanApprovalStatus: 'approved',
    visibility: 'public'
  },
  {
    id: 'evt-003',
    timestamp: '2026-06-28T16:45:00Z',
    agentSlug: 'maxx',
    missionSlug: 'youth-digital-access',
    actionType: 'draft',
    publicSummary: 'Drafted public campaign brief for Washington youth coding program. Includes outreach messaging, target organizations, and partnership asks.',
    sources: [],
    artifacts: [
      { id: 'a3', title: 'Youth Coding Outreach Campaign Brief', artifactType: 'brief', summary: 'Campaign framework for youth digital access initiative' }
    ],
    impactTags: ['youth', 'digital-equity', 'campaign'],
    humanApprovalStatus: 'pending',
    visibility: 'public'
  },
  {
    id: 'evt-004',
    timestamp: '2026-06-28T14:00:00Z',
    agentSlug: 'climate-scout',
    missionSlug: 'washington-water-mission',
    actionType: 'research',
    publicSummary: 'Reviewed 4 peer-reviewed papers on Pacific Northwest water security. Key finding: snowpack reduction of 25% projected by 2050 in Cascade Mountains.',
    sources: [
      { id: 's4', title: 'UW Climate Impacts Group: Water Resources 2025', sourceType: 'web', summary: 'Annual assessment of Washington water supply under climate change' },
      { id: 's5', title: 'USGS Pacific Northwest Water Science Center', sourceType: 'web', summary: 'Federal monitoring of watershed conditions' }
    ],
    artifacts: [
      { id: 'a4', title: 'Washington Water Security Research Summary', artifactType: 'report', summary: '8-page summary of current scientific consensus on WA water challenges' }
    ],
    impactTags: ['water', 'climate', 'washington', 'research'],
    humanApprovalStatus: 'not_needed',
    visibility: 'public'
  },
  {
    id: 'evt-005',
    timestamp: '2026-06-28T11:30:00Z',
    agentSlug: 'impact-reporter',
    missionSlug: 'impact-ledger-maintenance',
    actionType: 'publish',
    publicSummary: 'Published weekly impact summary. This week: 8 active missions, 12 grant leads identified, 6 documents created, 0 private data exposures.',
    sources: [],
    artifacts: [
      { id: 'a5', title: 'Weekly Impact Summary — Week of June 23, 2026', artifactType: 'report', summary: 'Platform-wide accountability report' }
    ],
    impactTags: ['impact', 'accountability', 'transparency'],
    humanApprovalStatus: 'not_needed',
    visibility: 'public'
  },
  {
    id: 'evt-006',
    timestamp: '2026-06-27T09:00:00Z',
    agentSlug: 'health-scout',
    missionSlug: 'public-health-literacy',
    actionType: 'research',
    publicSummary: 'Reviewed public research on rural mental health access in Washington state. Produced plain-language summary for community organization use. No medical advice included.',
    sources: [
      { id: 's6', title: 'SAMHSA Rural Mental Health Resource Guide', sourceType: 'web', summary: 'Federal resource on rural mental health services' }
    ],
    artifacts: [
      { id: 'a6', title: 'Rural Mental Health Access — Plain Language Summary', artifactType: 'report', summary: 'Community-oriented summary of public research findings' }
    ],
    impactTags: ['health', 'mental-health', 'rural', 'washington', 'education'],
    humanApprovalStatus: 'not_needed',
    visibility: 'public'
  },
  {
    id: 'evt-007',
    timestamp: '2026-06-26T15:20:00Z',
    agentSlug: 'maxx',
    missionSlug: 'community-media-launch',
    actionType: 'podcast',
    publicSummary: 'Produced episode plan for "Mission Stories" podcast. Episode 1 topic: How Seattle nonprofits are using AI without losing trust.',
    sources: [],
    artifacts: [
      { id: 'a7', title: 'Mission Stories Podcast — Episode 1 Plan', artifactType: 'podcast-episode', summary: 'Production plan, guest list, question framework, and show notes outline' }
    ],
    impactTags: ['podcast', 'community-media', 'ai-transparency'],
    humanApprovalStatus: 'pending',
    visibility: 'public'
  },
  {
    id: 'evt-008',
    timestamp: '2026-06-26T10:00:00Z',
    agentSlug: 'pauli',
    missionSlug: 'nonprofit-ai-transparency',
    actionType: 'social',
    publicSummary: 'Drafted social post for LinkedIn: sharing council summary on AI transparency. Post is in draft — pending human review before publication.',
    sources: [],
    artifacts: [
      { id: 'a8', title: 'LinkedIn Draft: AI Transparency Council Summary', artifactType: 'social-post', summary: 'Draft post linking to council summary — 280 chars, no private data' }
    ],
    impactTags: ['social-media', 'ai-transparency', 'nonprofit'],
    humanApprovalStatus: 'pending',
    visibility: 'public'
  }
]
