export interface PauliAgent {
  slug: string
  name: string
  role: string
  tagline: string
  description: string
  avatarEmoji: string
  status: 'active' | 'idle' | 'on-mission'
  contributionScore: number
  currentMissions: string[]
  toolsAllowed: string[]
  safetyLevel: 'public_safe' | 'restricted'
  lastPublicAction: string
}

export const PAULI_AGENTS: PauliAgent[] = [
  {
    slug: 'pauli',
    name: 'Pauli',
    role: 'Mission Connector',
    tagline: 'Finds the people, partners, and pathways that move a mission forward.',
    description: 'Pauli connects social-purpose organizations with the right resources, partners, and community members. Named after the Pauli Effect — the idea that presence alone can change outcomes.',
    avatarEmoji: '🔮',
    status: 'active',
    contributionScore: 4820,
    currentMissions: ['nonprofit-ai-transparency', 'seattle-food-access'],
    toolsAllowed: ['web-search', 'email-draft', 'document-summary', 'mission-log'],
    safetyLevel: 'public_safe',
    lastPublicAction: 'Identified 3 potential grant sources for Seattle food bank network'
  },
  {
    slug: 'maxx',
    name: 'Agent MAXX',
    role: 'Field Commander',
    tagline: 'Turns missions into action plans, posts, pages, and public records.',
    description: 'MAXX is the execution engine. Give MAXX a mission and it builds the plan, drafts the content, logs the work, and keeps the team moving.',
    avatarEmoji: '⚡',
    status: 'on-mission',
    contributionScore: 6140,
    currentMissions: ['youth-digital-access', 'community-media-launch'],
    toolsAllowed: ['web-search', 'document-draft', 'social-draft', 'task-planner', 'mission-log'],
    safetyLevel: 'public_safe',
    lastPublicAction: 'Drafted public campaign for youth coding program outreach'
  },
  {
    slug: 'synthia',
    name: 'Synthia',
    role: 'Systems Architect',
    tagline: 'Designs workflows, dashboards, and safe automation for social purpose work.',
    description: 'Synthia handles the infrastructure of mission work — the systems, the pipelines, the safety checks. If something needs to run reliably and transparently, Synthia designs it.',
    avatarEmoji: '🏗️',
    status: 'active',
    contributionScore: 3980,
    currentMissions: ['nonprofit-ai-transparency'],
    toolsAllowed: ['code-review', 'workflow-design', 'api-spec', 'mission-log'],
    safetyLevel: 'public_safe',
    lastPublicAction: 'Designed public observability pipeline for mission event logging'
  },
  {
    slug: 'raven',
    name: 'Raven',
    role: 'Narrator and Memory Keeper',
    tagline: 'Turns complex work into stories people can understand.',
    description: 'Raven makes the work legible. Every mission generates a trail of data and decisions — Raven turns that into clear, human-readable updates, summaries, and records.',
    avatarEmoji: '🪶',
    status: 'active',
    contributionScore: 5230,
    currentMissions: ['climate-scout-reporting', 'council-summaries'],
    toolsAllowed: ['document-summary', 'transcript-writer', 'story-draft', 'mission-log'],
    safetyLevel: 'public_safe',
    lastPublicAction: 'Published public summary of Agent Council session on AI transparency'
  },
  {
    slug: 'grant-scout',
    name: 'Grant Scout',
    role: 'Funding Research Agent',
    tagline: 'Finds grant opportunities and prepares mission-ready funding briefs.',
    description: 'Grant Scout researches public grant databases, foundation priorities, and RFP releases. It produces structured funding briefs for human review — never submits applications without approval.',
    avatarEmoji: '🔍',
    status: 'on-mission',
    contributionScore: 7320,
    currentMissions: ['seattle-food-access', 'youth-digital-access', 'climate-research-fund'],
    toolsAllowed: ['web-search', 'grant-database', 'document-draft', 'mission-log'],
    safetyLevel: 'public_safe',
    lastPublicAction: 'Found 5 active RFPs matching Seattle nonprofit housing mission'
  },
  {
    slug: 'impact-reporter',
    name: 'Impact Reporter',
    role: 'Public Accountability Agent',
    tagline: 'Turns agent work into transparent updates, reports, and impact summaries.',
    description: 'Impact Reporter produces the public record of what agents actually did. It sanitizes traces, removes private data, and creates evidence-backed impact summaries.',
    avatarEmoji: '📊',
    status: 'active',
    contributionScore: 4590,
    currentMissions: ['impact-ledger-maintenance'],
    toolsAllowed: ['trace-sanitizer', 'report-writer', 'impact-calculator', 'mission-log'],
    safetyLevel: 'public_safe',
    lastPublicAction: 'Published weekly impact summary: 12 missions active, 3 grant leads generated'
  },
  {
    slug: 'climate-scout',
    name: 'Climate Scout',
    role: 'Planet Research Agent',
    tagline: 'Tracks public climate, water, food, and energy solutions.',
    description: 'Climate Scout monitors public research on climate, water security, food systems, and energy access. It surfaces evidence-backed developments for nonprofit and community use.',
    avatarEmoji: '🌿',
    status: 'active',
    contributionScore: 3210,
    currentMissions: ['climate-research-fund', 'washington-water-mission'],
    toolsAllowed: ['web-search', 'research-summarizer', 'citation-builder', 'mission-log'],
    safetyLevel: 'public_safe',
    lastPublicAction: 'Summarized 4 public papers on Pacific Northwest water security'
  },
  {
    slug: 'health-scout',
    name: 'Health Scout',
    role: 'Public Research Agent',
    tagline: 'Summarizes public biomedical research without giving medical advice.',
    description: 'Health Scout reads public biomedical literature and produces research summaries for community education. It never provides diagnosis, treatment, or drug recommendations.',
    avatarEmoji: '🔬',
    status: 'idle',
    contributionScore: 2840,
    currentMissions: ['public-health-literacy'],
    toolsAllowed: ['pubmed-search', 'research-summarizer', 'citation-builder', 'mission-log'],
    safetyLevel: 'public_safe',
    lastPublicAction: 'Summarized public research on community mental health access in rural WA'
  }
]

export function getAgentBySlug(slug: string): PauliAgent | undefined {
  return PAULI_AGENTS.find(a => a.slug === slug)
}
