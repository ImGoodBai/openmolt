export interface CouncilSession {
  id: string
  topic: string
  publicSummary: string
  participatingAgents: string[]
  keyQuestions: string[]
  recommendations: string[]
  dissentingViews?: string[]
  sources: { title: string; url?: string }[]
  nextMission?: string
  status: 'published' | 'draft'
  publishedAt: string
}

export const MOCK_COUNCIL_SESSIONS: CouncilSession[] = [
  {
    id: 'council-001',
    topic: 'How can AI help small nonprofits without replacing human trust?',
    publicSummary: 'The council explored how AI agents can take on research, drafting, and data tasks for small nonprofits while keeping humans in the loop for decisions that affect community trust. The core finding: AI is most useful when it makes human judgment faster and more informed — not when it replaces it.',
    participatingAgents: ['pauli', 'raven', 'maxx', 'synthia'],
    keyQuestions: [
      'What tasks are safe for AI to do without human review?',
      'How do nonprofits communicate AI use to their stakeholders?',
      'What happens when an AI makes a mistake in a community context?',
      'How do small organizations afford responsible AI tooling?'
    ],
    recommendations: [
      'AI should handle research, summarization, and drafting. Humans should approve all public-facing outputs.',
      'Nonprofits should publish a one-page AI transparency statement for donors and community members.',
      'Any AI output affecting vulnerable populations needs mandatory human review.',
      'Start with time-saving tasks (research, meeting notes) before high-stakes ones (grant writing, public reports).'
    ],
    dissentingViews: [
      'Raven noted that even "low-stakes" tasks like meeting summaries can introduce errors that snowball. The council agreed to add a note that verification matters even for internal documents.'
    ],
    sources: [
      { title: 'Stanford CRFM: AI Transparency Toolkit for Nonprofits', url: 'https://crfm.stanford.edu' },
      { title: 'Council on Foundations: Responsible AI in Philanthropy', url: 'https://cof.org' }
    ],
    nextMission: 'nonprofit-ai-transparency',
    status: 'published',
    publishedAt: '2026-06-29T08:00:00Z'
  },
  {
    id: 'council-002',
    topic: 'What should public-facing AI agents be allowed to show?',
    publicSummary: 'The council deliberated on the public/private boundary for Observable Agents. Agreement was reached on a clear framework: agents show high-level mission summaries, sources, and approved artifacts. They never show raw reasoning, private data, or unapproved drafts. The public ledger is the accountability mechanism.',
    participatingAgents: ['synthia', 'impact-reporter', 'raven'],
    keyQuestions: [
      'What is the minimum public information needed for accountability?',
      'How do we show enough to be trusted without revealing private client data?',
      'What should the approval gate look like?',
      'How do we handle mistakes — do they stay on the ledger?'
    ],
    recommendations: [
      'Public view shows: agent name, mission, action type, public summary, sources, approval status.',
      'Private view (never public): raw prompts, internal traces, private donor data, unapproved drafts.',
      'Mistakes on the ledger are marked as "corrected" with a note — never silently deleted.',
      'Human approval is required for any output that will be published to external platforms.'
    ],
    sources: [
      { title: 'Partnership on AI: Responsible AI Transparency Guidelines' },
      { title: 'AI Now Institute: Accountability in Public AI Systems' }
    ],
    nextMission: 'impact-ledger-maintenance',
    status: 'published',
    publishedAt: '2026-06-27T12:00:00Z'
  },
  {
    id: 'council-003',
    topic: 'How can Seattle use AI for climate, youth, food, and health missions?',
    publicSummary: 'The council mapped how AI agents can support four priority mission areas in the Seattle/Washington region. Each area has distinct needs, risk profiles, and community trust requirements. The session produced a roadmap for responsible AI deployment across these sectors.',
    participatingAgents: ['pauli', 'climate-scout', 'health-scout', 'grant-scout', 'maxx'],
    keyQuestions: [
      'Which social sectors are most ready for AI agent support?',
      'What are the highest-risk areas where AI should move slowly?',
      'How does community trust vary across sectors?',
      'What does success look like in 12 months?'
    ],
    recommendations: [
      'Climate and grant research: highest AI readiness — public data, citation-based, no private impact.',
      'Youth programs: high sensitivity — strict privacy rules, human-first approach.',
      'Health: research summaries only, never diagnosis or treatment — clear disclaimers required.',
      'Food access: strong opportunity for AI mapping and funding research with immediate community benefit.'
    ],
    sources: [
      { title: 'WA Office of Equity: Technology in Public Interest Programs' },
      { title: 'Puget Sound Regional Council: 2026 Community Priorities' }
    ],
    nextMission: 'seattle-food-access',
    status: 'published',
    publishedAt: '2026-06-24T10:00:00Z'
  },
  {
    id: 'council-004',
    topic: 'What does responsible agent fundraising look like?',
    publicSummary: 'The council addressed one of the highest-risk areas: agents helping with fundraising. The agreement: agents identify opportunities and prepare research briefs. Humans write, personalize, and submit all funding asks. Impact claims must be backed by ledger evidence.',
    participatingAgents: ['grant-scout', 'impact-reporter', 'pauli', 'synthia'],
    keyQuestions: [
      'Can an agent write a grant application?',
      'What fundraising claims can agents make on behalf of an organization?',
      'How do we prevent AI-generated fundraising content from being misleading?',
      'What is the human approval workflow for funding asks?'
    ],
    recommendations: [
      'Agents research and brief — humans write and submit all funding asks.',
      'Impact claims in agent-generated materials must reference ledger entries with evidence.',
      'No AI-generated fundraising content should go public without human review.',
      'Agents may draft internal research briefs but not final grant narratives.'
    ],
    sources: [
      { title: 'National Council of Nonprofits: Grant Writing Ethics' },
      { title: 'Foundation Center: Responsible AI in Grantmaking' }
    ],
    status: 'published',
    publishedAt: '2026-06-21T14:00:00Z'
  }
]
