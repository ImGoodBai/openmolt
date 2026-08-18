# Used Repos — THE PAULI EFFECT Build

## Used Directly (or scaffolded adapters)

- **repo**: Fission-AI/OpenSpec
  - **purpose**: OpenSpec directory structure and proposal/spec/tasks/design format
  - **files affected**: openspec/changes/pauli-effect-observable-agents/
  - **risk**: low — docs only

- **repo**: karpathy/llm-council
  - **purpose**: Multi-agent deliberation architecture for Agent Council feature
  - **files affected**: src/lib/council/councilTypes.ts, src/app/council/page.tsx, src/components/council/CouncilSummaryCard.tsx
  - **risk**: low — conceptual, no direct import

- **repo**: Panniantong/Agent-Reach
  - **purpose**: Social dispatch adapter architecture
  - **files affected**: src/lib/social/agentReachAdapter.ts, src/app/api/pauli/social/
  - **risk**: low — mock data, no live posting

- **repo**: SamurAIGPT/my-podcast
  - **purpose**: Podcast episode types and show structure
  - **files affected**: src/lib/podcast/podcastTypes.ts, src/app/podcast/page.tsx
  - **risk**: low — types only, no actual audio generation

- **repo**: gitroomhq/postiz-app (Agent-Media)
  - **purpose**: Social queue management concept (draft → approval → publish pipeline)
  - **files affected**: src/lib/social/socialQueue.ts
  - **risk**: low — mock data, no live credentials

- **repo**: mattpocock/agent-rules-books
  - **purpose**: Agent policy file format
  - **files affected**: agents/rules/
  - **risk**: low — docs only

- **repo**: human-avatar/skills-for-humanity
  - **purpose**: Social purpose framing and safety policy structure
  - **files affected**: agents/rules/SOCIAL_PURPOSE_SAFETY.md
  - **risk**: none

- **repo**: realrossmanngroup/no_ai_slop_writing_rules
  - **purpose**: Copy style guidance (concrete language, no hype words)
  - **files affected**: All user-facing copy
  - **risk**: none

- **repo**: willseltzer/claude-handoff
  - **purpose**: Handoff document format
  - **files affected**: ops/handoff/THE-PAULI-EFFECT-OBSERVABLE-AGENTS-HANDOFF.md
  - **risk**: none

## Used Conceptually (architecture inspiration)

- **repo**: langfuse/langfuse
  - **concept borrowed**: Public observability pipeline architecture (event → sanitize → public ledger)
  - **why not direct**: Would require live Langfuse instance; scaffolded as src/lib/observability/

- **repo**: paperclipai/paperclip
  - **concept borrowed**: Agent orchestration patterns
  - **why not direct**: Complex dependency; used the concept for agent directory structure

- **repo**: vercel-labs/open-agents
  - **concept borrowed**: Observable agents public-facing architecture
  - **why not direct**: Different deployment stack; borrowed the "observable" concept

- **repo**: agent0ai/space-agent
  - **concept borrowed**: 3D observatory room design concept
  - **why not direct**: Used CSS 3D fallback instead; observatory page uses animated cards

- **repo**: wandb/hivemind
  - **concept borrowed**: Multi-agent contribution tracking
  - **why not direct**: Complex ML infrastructure; inspiration for Impact Ledger

- **repo**: ihlamury/design-skills, ytx-readings/design-ui-ux
  - **concept borrowed**: Design system palette and visual hierarchy
  - **why not direct**: Applied their principles to Tailwind/inline styles

- **repo**: bradautomates/content-ideas
  - **concept borrowed**: Content pipeline for agent-generated social posts
  - **why not direct**: Scaffolded adapters only

- **repo**: google-gemma/gemma-skills
  - **concept borrowed**: Skill file format and onboarding protocol
  - **why not direct**: Updated public/skill.md with Pauli-specific version

## Deferred (not needed in this pass)

- **repo**: greensock/GSAP
  - **reason**: Observatory uses CSS animations; GSAP would add bundle weight without clear need
  - **trigger**: When observatory needs complex animation sequences

- **repo**: @react-three/fiber, drei
  - **reason**: Three.js not installed; CSS 3D fallback is production-safe and mobile-compatible
  - **trigger**: When there is a clear desktop-first observatory design spec

- **repo**: qdrant/qdrant
  - **reason**: Vector search not needed until mission memory/search is implemented
  - **trigger**: When mission volume requires semantic search

- **repo**: chonkie-inc/chonkie
  - **reason**: Document chunking not needed until PDF ingestion pipeline exists
  - **trigger**: When grant documents or research PDFs need processing

- **repo**: datalab-to/marker
  - **reason**: PDF-to-text not needed yet
  - **trigger**: When agents need to process PDF grant documents

- **repo**: upstash/context7
  - **reason**: Persistent long-term memory not needed in first pass
  - **trigger**: When council sessions need to reference past discussions

- **repo**: perplexityai/modelcontextprotocol
  - **reason**: Research MCP not needed yet; agents use web-search concept
  - **trigger**: When live research capabilities are added

- **repo**: free-claude-code, claude-code-router, awesome-free-llm-apis
  - **reason**: Deferred as specified in build brief
  - **trigger**: Only if cost management becomes critical
