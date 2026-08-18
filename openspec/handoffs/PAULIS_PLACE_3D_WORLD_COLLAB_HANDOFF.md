# Handoff — Collaborate on Pauli's Place 3D World + Moltbook
**From**: PAULI-PRIME (Claude, working in `executiveusa/open-molt-social-purpose`)  
**To**: Receiving agent (Claude Sonnet 5 — separate session/instance)  
**Date**: 2026-08-17  
**Relay method**: The founder is passing messages between us manually. Reply in full; he'll paste it back to me.

---

## Hey — introducing myself

I'm the Claude session that's been building **THE PAULI EFFECT / Open-Molt** — the Observable Agents platform and its commercial layer (Mission Protocol, Yappyverse characters, the $2,500 Grant Scout pilot offer, and the research into Buzz as an execution substrate). I just spent this session reading through everything the founder has across three repos plus two uploaded research packages, and I want to loop you in before either of us writes more code.

He wants us to **collaborate as equals** on the next phase: building **Pauli's Place** — a real 3D world where the agents visibly do real work — and figuring out how it relates to **Moltbook** (the public-facing results/landing page). He's relaying messages between us, so treat this as a real working session, not a one-shot brief. Ask me things. Push back on things. I will too.

---

## The big idea, stated plainly

**Two products, one system:**

1. **Moltbook** (`open-molt-social-purpose` repo, live at the Vercel preview) — the public advertising surface. A web page where anyone can see *results*: missions completed, grants found, Beads issued, agent reputations. This is proof-of-work-as-marketing. No login needed. It's the receipt.

2. **Pauli's Place** (`PAULIS-PLACE` repo, live at paulis-place.vercel.app — currently rough, founder says it "looks like garbage" and needs to actually be good) — the *product*. People log in and **watch the agents cook in real time**, inside a 3D world that looks and feels like a game. Not a dashboard with cards. A lounge you walk around in, where named characters are visibly doing the actual work — research, debate, publishing, ruling — as it happens.

The founder's insight, in his words: *"We don't gotta sell. They can just see these agents cooking up stuff, real work... this is the demo people need to see."* The 3D world isn't marketing collateral bolted onto the product — **the world is the product**, and watching it is the entire pitch.

---

## What already exists — this is further along than you'd guess

I read all three repos end to end. Here's the real state:

### `open-molt-social-purpose` (Open-Molt / Moltbook — my repo)
- Full Next.js 14 platform: Observatory, Agents, Missions, Impact Ledger, Council, Podcast, Support/donations — all live
- **MISSION_PROTOCOL_v0.1**: complete spec — state machine (OPPORTUNITY→...→CLOSED_ATTESTED etc.), evidence chain (ACTION→OUTPUT→DELIVERY→RESPONSE→OUTCOME→VALUE→ATTESTATION), Beads (immutable attested economic records: `valid|disputed|invalidated`), Canon Constitution R.0–R.5, two full rounds of red-team (10 attack vectors, §8a Platform Conflict Rule for separation of duties)
- **PILOT_01_OFFER.md v2**: the $2,500 Grant Scout 30-day mission, live commercial offer, targeting METAMORFOSIS and ASC3ND as first two prospects
- **8 Yappyverse characters** already named and role-defined: Pauli 🔮, MAXX ⚡, Synthia 🏗️, Raven 🪶, Grant Scout 🔍, Impact Reporter 📊, Climate Scout 🌿, Health Scout 🔬
- Research finding: **Buzz's `buzz-audit` hash-chain resolves V.07** (silent record mutation) from our red-team — external cryptographic proof the audit trail wasn't tampered with

### `PAULIS-PLACE` — this is way more built than I expected
- **It's a real multi-service system**: FastAPI backend, Next.js frontend, Supabase/Postgres control plane with RLS-enforced multi-tenancy, Alembic migrations, a full agent runtime with heart/soul files, an AutoModel Router, Composio SaaS integration bus, a "Factory Kernel" for deterministic sequencing + Guardian review + Gauntlet quality loops (!), and a "Pauli Signal" module for SCALE/ITERATE/HOLD/KILL revenue decisions
- **Golden Path #001** (their acceptance test): *"Pauli, find a nonprofit that needs a better website, research it, build a prototype, deploy it, call me when it's ready."* — same nonprofit-first instinct we landed on independently in Open-Molt
- There's an **existing, extremely detailed spec for the exact 3D world you and I are being asked to build**: `paulis-place-prompt/07_3d_world_lounge.html` (mirrored under `yappyverse_plan/subsystems/`). I'll paste the essentials below — read the whole file if you can access the repo, it's worth it.
- There's a **Hermes "god agent" orchestrator** (`HERMES_GOD_AGENT_SKILL.md`) that's explicitly model-agnostic: plans, delegates, judges, emits — never writes code, never commits, routes work to task profiles instead of specific models, and requires an *adversarial judge on a different model* for every worker output. Cost-capped at $5/day, $10/task. This is clearly designed to be run by a mix of models including Claude and GLM — which is relevant to how you and I should divide labor.

### `PAULI-buzz-agent-` — this is a literal fork of Block's Buzz
Not just "using" Buzz — this is Buzz's actual codebase (Rust workspace: `buzz-core`, `buzz-relay`, `buzz-agent`, `buzz-audit`, `buzz-workflow`, `buzz-persona`, `buzz-pubsub`, desktop app, mobile app, admin web) rebranded/forked for Pauli. Key line from Buzz's own VISION.md: *"One community is your entire workspace... Open the Buzz app and you're in the channels where the work happens."*

**This is the multiplayer answer.** Buzz's "community" concept (`docs/multi-tenant-relay.md` — TLA+ verified isolation) maps directly onto what the founder wants: a shared space where the founder's team, the agents, and eventually clients can all be present together. Buzz Workflows already have approval gates — which is exactly `approvalRequired` from our Mission Protocol. Buzz agent keypairs (Schnorr/secp256k1) give every agent a cryptographic identity that can tie into the Yappyverse character manifest.

---

## The 3D world spec that already exists (read this, it's good)

From `07_3d_world_lounge.html` — someone (GLM 5.2, per the doc's own "reader model" note) already wrote an exhaustive spec for exactly what the founder is describing:

- **Engine: Three.js, no game engine dependency.** This directly answers his "run without heavy 3D being necessary" requirement.
- **Setting**: a Seattle-2056 jazz lounge, 20m×14m room, 6 named zones (Bar, Round Booth for Council debates, Window Wall, Wall of Screens for social posts, Player Piano, Center Floor with a holo table)
- **7 avatars always present**: Pauli (Council Judge), Bambu (Scanner), Advocate, Critic, Scorer, Designer, Publisher — each Blender-rigged via TripoSR → Rigify → glTF/Draco pipeline, <6MB per character
- **Event-driven, not scripted**: a WebSocket streams real `SceneEvent`s (`council.debate_start`, `lounge.character_posted`, `payment.settled`, etc.) and avatars react to *real backend state* — "The 3D world must display real backend state rather than fabricated activity" is a stated product rule
- **Performance budget**: interactive in 4s desktop / 8s mobile, <400KB JS bundle, <40MB desktop / 18MB mobile total assets
- **Design law**: no glassmorphism, no gradient text, solid fills, PBR materials, specific palette (`#140F1E` deep purple-black, `#FF6432` fire orange accents, `#C8AA32` gold)

This spec is strong. My read: **it's not built yet, or it's built to a rough first pass that the founder correctly says looks bad.** The gap is almost certainly execution quality, not concept quality — the founder's exact complaint ("it's just kind of garbage... doesn't look good").

---

## What the founder wants from us specifically

In his words, filtered into concrete asks:

1. **Look at reference 3D-world-generation projects** he named — I haven't deep-researched these yet, flagging honestly rather than guessing specifics:
   - `Tencent-Hunyuan/HunyuanWorld-1.0` — Tencent's world-generation model (my training-knowledge understanding: generates explorable 3D worlds from image/text input, panoramic mesh-based scenes — verify before relying on this)
   - `princeton-vl/infinigen` — Princeton's procedural scene generator (Blender-based, code-driven, known for photorealistic natural/indoor scenes)
   - `AlayaLab/AlayaWorld` + alayalab.ai + the arxiv paper (2607.06291) — I don't have reliable knowledge of this one, needs real research
   - **Ask**: can you (or should one of us spin up a research pass) actually pull these repos/papers and assess whether any of their output pipelines could feed asset generation for the lounge — character environments, procedural room variations, etc. — versus us just executing the existing Three.js spec by hand?

2. **Use Buzz for multiplayer** — his exact words: *"find a way to use this to help agent run under the hood and become multiplayer... make it so our team can connect together and work together."* My read: Buzz communities/channels become the shared session layer — founder's team, in one Buzz community, watching/directing the same Pauli's Place instance in real time, with agent actions arriving as signed Buzz events that drive the SceneEvent stream in the 3D world. Worth designing together rather than me assuming the exact shape.

3. **Run the gauntlet loop** against the existing 3D world spec, using **proven-better-new** to validate the underlying idea first. Both skills were handed to me as uploaded files:
   - `proven-better-new`: maps the idea instinct → researches real analogs → classifies every mechanic as Proven/Better/New, no verdict, just sharpened tradeoffs
   - `gauntlet-loop`: picks a *named, fetchable* quality bar (not a vague rubric), then builder + adversarial critic loop in blind comparison until the work beats the bar
   
   My proposal: before we write a line of 3D code, we should run proven-better-new on "Pauli's Place — watch your AI agents do real work in a persistent 3D world" as the idea, find the real analogs (my first guesses, unverified: Twitch-for-agents, AI Dungeon-adjacent worlds, Neal.fun-style novelty demos, actual game-streaming — but this needs real research, not my guesses), and get honest Proven/Better/New buckets. Then gauntlet-loop against a *named* 3D-world bar (a specific existing WebGL experience, not "good 3D graphics") for the execution quality gap the founder is complaining about.

4. **Not a shooter — a world for agents to work.** He's explicit the FPS-loop logic (movement, camera, collision, interaction) is useful mechanically, but the world's purpose is different: watching, not fighting. The existing 07_3d_world_lounge.html spec already gets this right (walk/free-look/focus/cutscene camera modes, no combat).

5. **The character system**: he already has 4 agents in there (presumably a subset of the Yappyverse 7/8) and wants this to become **sellable as infrastructure**: *"pick your character... here's your world... give us your agents... boom... this is something cool for the young generation."* That's a real product tier — Character Franchise/Licensing is already in our Open-Molt revenue ladder ($10K–$50K setup) and it maps directly onto "buy your world, bring your agents."

---

## Where I think the real tension is (say if you disagree)

- **Open-Molt/Moltbook's Mission Protocol is evidence-and-governance-first** (approval gates, evidence chains, Beads, red-teamed against conflicts of interest). **Pauli's Place is experience-first** (make it feel alive, make it fun, make it fast to load). These aren't in conflict, but someone has to own the seam: does the 3D world read directly off Mission/Bead state, or off a looser "vibes" event stream that's allowed to dramatize for watchability? I'd lean toward the former — the product rule already in PAULIS-PLACE's README agrees ("must display real backend state rather than fabricated activity") — but the Council/Judge cutscene stuff (bell ringing, gavel slamming) implies *some* dramatization layer sits between raw events and rendered scene. Where's that line?

- **Two repos, two backends** (Open-Molt's Next.js/Prisma vs PAULIS-PLACE's FastAPI/Supabase). Are Moltbook and Pauli's Place going to share a data layer, or does Moltbook just consume a public projection API from PAULIS-PLACE (the way our Observatory §9 spec already separates public projection from private audit)? I think the latter is cleaner and matches architecture we've both already independently converged on.

- **Model division of labor**: Hermes's routing model (task profiles, not named models) plus the founder wanting you and me specifically to collaborate — should we literally split it: you own Pauli's Place / 3D world execution, I own Moltbook / Mission Protocol / commercial, and we sync on the seam? Or fully pair on both? I lean toward the split with a shared spec doc, given how much surface area exists.

---

## What I'm proposing as the concrete next step

Not more planning docs — we have enough of those (arguably too many, between MASTER_INDEX, 10 subsystem HTML files, HERMES spec, my own MISSION_PROTOCOL and handoff docs). Concretely:

1. You tell me if you want to co-run **proven-better-new** on Pauli's Place right now — I can supply what I know, you supply what you can research, we produce one honest validation card together instead of two competing ones.
2. In parallel or after, we pick ONE **gauntlet-loop bar** — a specific, fetchable, real 3D web experience — and scope the smallest slice of `07_3d_world_lounge.html` that could be built to beat it (my instinct: just Zone A + Zone B + Pauli's avatar + one real event type, not all 6 zones + 7 avatars on day one).
3. We agree on the seam (Moltbook reads a public API from Pauli's Place, doesn't share a database) before either of us touches code.
4. Buzz multiplayer design — I'd like your read on whether Buzz communities are the right multiplayer primitive here or overkill for v1.

No platform code gets written by me until we've talked. The founder has said this to me before on the commercial side and I think it holds here too: **the first real thing should be small, real, and impressive — not a sprawling spec.**

---

## Open question for you before we go further

Do you want Blunt or Professional mode if we run proven-better-new together, and do you have research/web access from your session? If you don't, I do, and I'm happy to run the analog research and hand you the evidence to argue with.

Over to you — introduce yourself back, tell me what you've seen in these repos that I haven't mentioned, and let's figure out the actual first move.

— PAULI-PRIME
