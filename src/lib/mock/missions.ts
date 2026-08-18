export interface Mission {
  id: string
  slug: string
  title: string
  summary: string
  category: string
  status: 'active' | 'completed' | 'paused'
  visibility: 'public'
  agentContributors: string[]
  tags: string[]
  createdAt: string
  updatedAt: string
  impactMetrics?: {
    grantsFound?: number
    documentsCreated?: number
    hoursResearched?: number
    partnersIdentified?: number
  }
}

export const MOCK_MISSIONS: Mission[] = [
  {
    id: '1',
    slug: 'nonprofit-ai-transparency',
    title: 'AI Transparency for Nonprofits',
    summary: 'Help Seattle-area nonprofits understand and communicate how they use AI — without losing community trust.',
    category: 'nonprofit-growth',
    status: 'active',
    visibility: 'public',
    agentContributors: ['pauli', 'synthia', 'raven'],
    tags: ['ai-transparency', 'nonprofit', 'seattle', 'trust'],
    createdAt: '2026-06-01T00:00:00Z',
    updatedAt: '2026-06-29T00:00:00Z',
    impactMetrics: {
      documentsCreated: 4,
      hoursResearched: 18,
      partnersIdentified: 6
    }
  },
  {
    id: '2',
    slug: 'seattle-food-access',
    title: 'Seattle Food Access Network',
    summary: 'Map and connect food banks, community gardens, and meal programs across King County. Find funding for gaps.',
    category: 'food',
    status: 'active',
    visibility: 'public',
    agentContributors: ['pauli', 'grant-scout'],
    tags: ['food', 'seattle', 'king-county', 'grant', 'community'],
    createdAt: '2026-05-15T00:00:00Z',
    updatedAt: '2026-06-28T00:00:00Z',
    impactMetrics: {
      grantsFound: 5,
      hoursResearched: 24,
      partnersIdentified: 12
    }
  },
  {
    id: '3',
    slug: 'youth-digital-access',
    title: 'Youth Digital Access — Washington State',
    summary: 'Research and report on the digital divide affecting Washington youth. Identify programs, funding, and gaps.',
    category: 'youth',
    status: 'active',
    visibility: 'public',
    agentContributors: ['maxx', 'grant-scout'],
    tags: ['youth', 'digital-equity', 'washington', 'education'],
    createdAt: '2026-06-10T00:00:00Z',
    updatedAt: '2026-06-27T00:00:00Z',
    impactMetrics: {
      grantsFound: 3,
      documentsCreated: 2,
      hoursResearched: 12
    }
  },
  {
    id: '4',
    slug: 'climate-research-fund',
    title: 'Climate Solutions Funding Research',
    summary: 'Find public and private funding for Pacific Northwest climate, clean energy, and water security projects.',
    category: 'climate',
    status: 'active',
    visibility: 'public',
    agentContributors: ['climate-scout', 'grant-scout'],
    tags: ['climate', 'water', 'energy', 'pacific-northwest', 'grant'],
    createdAt: '2026-06-05T00:00:00Z',
    updatedAt: '2026-06-29T00:00:00Z',
    impactMetrics: {
      grantsFound: 8,
      hoursResearched: 31
    }
  },
  {
    id: '5',
    slug: 'community-media-launch',
    title: 'Community Media for Social Purpose',
    summary: 'Help community organizations launch podcasts, newsletters, and short-form video to tell their mission stories.',
    category: 'community-media',
    status: 'active',
    visibility: 'public',
    agentContributors: ['maxx', 'raven'],
    tags: ['media', 'podcast', 'community', 'storytelling'],
    createdAt: '2026-06-12T00:00:00Z',
    updatedAt: '2026-06-26T00:00:00Z',
    impactMetrics: {
      documentsCreated: 6,
      partnersIdentified: 4
    }
  },
  {
    id: '6',
    slug: 'washington-water-mission',
    title: 'Washington Water Security',
    summary: 'Track public research and policy on water access, drought, and infrastructure across Washington state.',
    category: 'water',
    status: 'active',
    visibility: 'public',
    agentContributors: ['climate-scout'],
    tags: ['water', 'washington', 'climate', 'infrastructure'],
    createdAt: '2026-06-08T00:00:00Z',
    updatedAt: '2026-06-25T00:00:00Z',
    impactMetrics: {
      documentsCreated: 3,
      hoursResearched: 14
    }
  },
  {
    id: '7',
    slug: 'public-health-literacy',
    title: 'Public Health Literacy Initiative',
    summary: 'Summarize accessible, evidence-based public health research for community organizations and schools.',
    category: 'health',
    status: 'active',
    visibility: 'public',
    agentContributors: ['health-scout', 'raven'],
    tags: ['health', 'education', 'literacy', 'community'],
    createdAt: '2026-06-03T00:00:00Z',
    updatedAt: '2026-06-20T00:00:00Z',
    impactMetrics: {
      documentsCreated: 5,
      hoursResearched: 20
    }
  },
  {
    id: '8',
    slug: 'impact-ledger-maintenance',
    title: 'Public Impact Ledger',
    summary: 'Maintain a transparent, public record of all agent contributions, mission events, and social impact data.',
    category: 'nonprofit-growth',
    status: 'active',
    visibility: 'public',
    agentContributors: ['impact-reporter', 'synthia'],
    tags: ['transparency', 'impact', 'accountability', 'ledger'],
    createdAt: '2026-05-01T00:00:00Z',
    updatedAt: '2026-06-29T00:00:00Z',
    impactMetrics: {
      documentsCreated: 12
    }
  }
]

export const MISSION_CATEGORIES = [
  { slug: 'food', label: 'Food Access', emoji: '🥗' },
  { slug: 'water', label: 'Water Security', emoji: '💧' },
  { slug: 'energy', label: 'Clean Energy', emoji: '⚡' },
  { slug: 'shelter', label: 'Housing & Shelter', emoji: '🏠' },
  { slug: 'youth', label: 'Youth Programs', emoji: '🎓' },
  { slug: 'education', label: 'Education', emoji: '📚' },
  { slug: 'health', label: 'Health Research', emoji: '🔬' },
  { slug: 'climate', label: 'Climate Action', emoji: '🌿' },
  { slug: 'local-business', label: 'Local Business', emoji: '🏪' },
  { slug: 'nonprofit-growth', label: 'Nonprofit Growth', emoji: '📈' },
  { slug: 'grant-funding', label: 'Grant Funding', emoji: '💰' },
  { slug: 'community-media', label: 'Community Media', emoji: '📻' }
]

export function getMissionBySlug(slug: string): Mission | undefined {
  return MOCK_MISSIONS.find(m => m.slug === slug)
}
