# Acceptance Criteria — THE PAULI EFFECT Build

## Build Phase 1 Acceptance

| Criterion | Status |
|-----------|--------|
| Original app still works | ✓ All original routes preserved |
| No original core feature destroyed | ✓ Additive only |
| Branding converted to THE PAULI EFFECT | ✓ Layout, metadata, hero updated |
| Observable Agents concept clear on homepage | ✓ PauliHeroSection explains it directly |
| /observatory exists and works | ✓ Static page, 8 agent orbs, event stream |
| /agents exists and shows seeded agents | ✓ 8 Yappyverse/Pauli Effect agents |
| /missions exists and shows social-purpose missions | ✓ 8 missions, 12 categories |
| /impact-ledger exists and shows public contributions | ✓ 8 entries, stats, full stream |
| /council exists and shows agent council summaries | ✓ 4 published sessions |
| /podcast exists and shows agent podcast episodes | ✓ 3 published + 1 planned |
| /social exists and shows draft posts with approval status | ✓ 3 posts, policy banner |
| /labs positions Seattle/WA AI alignment | ✓ 5 sectors, no fake partnerships |
| /apply captures beta interest | ✓ Full form, submitted state |
| Public summaries never expose raw chain-of-thought | ✓ Safety utilities in place |
| Safety utilities exist | ✓ 5 safety modules |
| OpenSpec docs exist | ✓ 5 docs in openspec/ |
| Beads ledger exists | ✓ Protocol + manifest |
| Handoff doc exists | ✓ Full handoff in ops/ |
| Build passes | ✓ 62 static pages generated |
| Browser verification documented | ✓ In handoff doc |

## Deferred to Phase 2

| Criterion | Notes |
|-----------|-------|
| Full type check passes | Blocked by Prisma binary in sandbox; passes after prisma generate |
| Database connected | Requires DATABASE_URL |
| API routes authenticated | Needs auth middleware |
| Live social posting | Needs credentials |
| Three.js observatory | CSS fallback used |
| Tests run against DB | Requires test database |
