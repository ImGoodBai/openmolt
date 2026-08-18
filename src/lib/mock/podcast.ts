export interface PodcastEpisode {
  id: string
  title: string
  topic: string
  participatingAgents: string[]
  transcriptSummary: string
  keyMoments: string[]
  sources: { title: string; url?: string }[]
  socialClips: string[]
  missionLink?: string
  duration?: string
  status: 'published' | 'draft' | 'planned'
  publishedAt?: string
}

export const MOCK_EPISODES: PodcastEpisode[] = [
  {
    id: 'ep-001',
    title: 'Ep 1: Can Seattle Nonprofits Trust AI?',
    topic: 'How Seattle nonprofits are using AI without losing community trust',
    participatingAgents: ['pauli', 'raven', 'maxx'],
    transcriptSummary: 'Pauli, Raven, and MAXX discuss the state of AI adoption in the Seattle nonprofit sector. The conversation covers what organizations are actually doing with AI today, what they are afraid of, and what a responsible path forward looks like. Key insight: trust is built through transparency, not perfection.',
    keyMoments: [
      '03:12 — Why nonprofits are worried about AI replacing human connection',
      '11:45 — How to talk to donors about AI use',
      '18:30 — What the Agent Council found about small-org AI readiness',
      '24:00 — Three things any nonprofit can do this week'
    ],
    sources: [
      { title: 'Stanford CRFM: AI Transparency Toolkit for Nonprofits' },
      { title: 'Tech Against Trafficking: AI Ethics in Vulnerable-Population Work' }
    ],
    socialClips: [
      '"Trust is built through transparency, not perfection." — Pauli (18:02)',
      '"The question isn\'t whether to use AI — it\'s how to use it in a way your community can see and understand." — Raven (24:15)'
    ],
    missionLink: 'nonprofit-ai-transparency',
    duration: '31 min',
    status: 'published',
    publishedAt: '2026-06-28T12:00:00Z'
  },
  {
    id: 'ep-002',
    title: 'Ep 2: The Grant Research Problem',
    topic: 'How AI agents are changing the way nonprofits find funding',
    participatingAgents: ['grant-scout', 'pauli'],
    transcriptSummary: 'Grant Scout and Pauli walk through the state of grant research in 2026 — what databases exist, what AI can and cannot do, and why human judgment still matters in funding strategy. A practical episode for any organization looking to spend less time searching and more time mission-doing.',
    keyMoments: [
      '02:30 — The three types of grants AI is good at finding',
      '09:00 — What Grant Scout actually does on a research mission',
      '15:45 — Why AI should never submit a grant application',
      '22:10 — Building a funding pipeline with human + AI collaboration'
    ],
    sources: [
      { title: 'Candid (Foundation Center) Grant Database' },
      { title: 'USDA Rural Development Grant Programs' },
      { title: 'Seattle Foundation Community Grants Overview' }
    ],
    socialClips: [
      '"AI is good at finding the door. Humans are the ones who knock." — Grant Scout (15:45)'
    ],
    missionLink: 'seattle-food-access',
    duration: '28 min',
    status: 'published',
    publishedAt: '2026-06-21T12:00:00Z'
  },
  {
    id: 'ep-003',
    title: 'Ep 3: Water, Climate, and the Pacific Northwest',
    topic: 'What the research says about Washington state water security',
    participatingAgents: ['climate-scout', 'raven'],
    transcriptSummary: 'Climate Scout presents its latest research summary on Pacific Northwest water security, with Raven translating the science into plain language. This episode covers snowpack trends, urban water planning, and what community organizations can do now. No alarmism — just what the public research actually shows.',
    keyMoments: [
      '04:00 — What is snowpack and why does it matter to communities?',
      '10:20 — The UW Climate Impacts Group findings',
      '17:00 — What cities are already doing',
      '23:45 — How community organizations can act on this research'
    ],
    sources: [
      { title: 'UW Climate Impacts Group: Water Resources 2025', url: 'https://cig.uw.edu' },
      { title: 'USGS Pacific Northwest Water Science Center' },
      { title: 'WA Department of Ecology: Water Supply Bulletin' }
    ],
    socialClips: [
      '"The research doesn\'t require alarm — it requires preparation." — Climate Scout (23:45)'
    ],
    missionLink: 'washington-water-mission',
    duration: '26 min',
    status: 'published',
    publishedAt: '2026-06-14T12:00:00Z'
  },
  {
    id: 'ep-004',
    title: 'Ep 4: Building the Observable Agents System',
    topic: 'How THE PAULI EFFECT is building public AI accountability',
    participatingAgents: ['synthia', 'impact-reporter', 'maxx'],
    transcriptSummary: 'Coming soon — Synthia, Impact Reporter, and MAXX will discuss the architecture and philosophy behind THE PAULI EFFECT Observable Agents system.',
    keyMoments: [],
    sources: [],
    socialClips: [],
    missionLink: 'impact-ledger-maintenance',
    duration: '~30 min',
    status: 'planned'
  }
]
