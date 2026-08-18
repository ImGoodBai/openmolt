# Tasks: THE PAULI EFFECT Build

## Phase 1: Foundation (Complete)
- [x] Create beads/ directory and protocol
- [x] Create openspec/ directory
- [x] Create agents/ directory structure
- [x] Create ops/ directory

## Phase 2: Brand & Layout (In Progress)
- [x] Update root layout metadata
- [x] Update Tailwind palette
- [x] Update globals.css
- [ ] Replace HeroSection with Pauli Effect hero

## Phase 3: Data Model
- [ ] Add Mission model to Prisma
- [ ] Add PauliAgentProfile model
- [ ] Add MissionEvent model
- [ ] Add SourceCitation model
- [ ] Add PublicArtifact model
- [ ] Add CouncilSession model
- [ ] Add SocialDispatch model

## Phase 4: Mock Data & Safety
- [ ] src/lib/mock/pauliAgents.ts
- [ ] src/lib/mock/missions.ts
- [ ] src/lib/mock/ledger.ts
- [ ] src/lib/mock/council.ts
- [ ] src/lib/mock/podcast.ts
- [ ] src/lib/safety/publicSummary.ts
- [ ] src/lib/safety/redaction.ts
- [ ] src/lib/safety/topicPolicy.ts
- [ ] src/lib/safety/medicalResearchPolicy.ts
- [ ] src/lib/safety/socialPostingPolicy.ts

## Phase 5: Pages
- [ ] / (new hero section)
- [ ] /observatory
- [ ] /agents
- [ ] /agents/[slug]
- [ ] /missions
- [ ] /missions/[slug]
- [ ] /council
- [ ] /impact-ledger
- [ ] /podcast
- [ ] /social
- [ ] /labs
- [ ] /apply

## Phase 6: API Routes
- [ ] GET /api/pauli/agents
- [ ] GET /api/pauli/agents/:slug
- [ ] GET /api/pauli/missions
- [ ] GET /api/pauli/missions/:slug
- [ ] GET /api/pauli/ledger
- [ ] POST /api/pauli/events
- [ ] POST /api/pauli/events/redact
- [ ] GET /api/pauli/council
- [ ] POST /api/pauli/council
- [ ] GET /api/pauli/social
- [ ] POST /api/pauli/social/draft
- [ ] POST /api/pauli/social/approve
- [ ] GET /api/pauli/podcast
- [ ] POST /api/pauli/apply

## Phase 7: Social & Podcast Adapters
- [ ] src/lib/social/agentReachAdapter.ts
- [ ] src/lib/social/postizAdapter.ts
- [ ] src/lib/social/socialQueue.ts
- [ ] src/lib/podcast/podcastTypes.ts
- [ ] src/lib/podcast/mockEpisodes.ts

## Phase 8: Observatory & Council Components
- [ ] src/components/observatory/ObservatoryRoom.tsx
- [ ] src/components/observatory/AgentOrb.tsx
- [ ] src/components/observatory/MissionPanel.tsx
- [ ] src/components/council/CouncilRoom.tsx
- [ ] src/components/council/CouncilSummaryCard.tsx
- [ ] src/components/podcast/PodcastEpisodeCard.tsx

## Phase 9: Agent Files
- [ ] agents/pauli/ - all required files
- [ ] agents/maxx/ - all required files
- [ ] agents/synthia/ - all required files
- [ ] agents/raven/ - all required files

## Phase 10: Handoff & Docs
- [ ] Update public/skill.md
- [ ] ops/handoff/THE-PAULI-EFFECT-OBSERVABLE-AGENTS-HANDOFF.md
- [ ] ops/reports/USED-REPOS.md

## Phase 11: Build & Verify
- [ ] npm run type-check
- [ ] npm run lint
- [ ] npm run build
- [ ] Browser verification
