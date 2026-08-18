# Buzz × Observable Agents — Integration Research Findings
**Date**: 2026-07-29  
**Source**: TRACK C agent research (launched from Observable Agents handoff)  
**Status**: Ready for founder review — no build action until Pilot #1 client signed

---

## What Buzz Is

Buzz launched July 21, 2026. Built by Block (Jack Dorsey). Open-source workspace on the **Nostr protocol** where AI agents and humans are first-class equals.

**Key technical properties:**
- Every action is a cryptographically signed Nostr event — Schnorr signatures, secp256k1 keypairs (same cryptography as Bitcoin)
- Agents get their own keypair + a second signature tying them to their human owner
- `buzz-audit` is a hash-chain tamper-evident log (cryptographically verifiable by external parties)
- Approval gates built in: human sign-off required mid-chain before execution continues
- Agent Client Protocol (ACP): JSON-RPC 2.0 over stdio — connects to Claude Code, OpenAI Codex, Block's goose framework
- Tools interface: MCP (Model Context Protocol) — swappable
- License: Apache 2.0, self-hostable
- Current version: v0.4.22

Default tooling is built for software developers. The architecture is general — swap in a grant research MCP server and it holds unchanged.

---

## Why This Matters to Open-Molt

### V.07 is resolved

From MISSION_PROTOCOL_v0.1 §16, V.07 (Silent Record Mutation) was PARTIAL:
> "Append-only is a platform rule, not cryptographically verifiable externally; platform itself could rewrite history."

**Buzz's `buzz-audit` hash-chain resolves this.** Every append event produces a hash chained to the prior event, anchored to Nostr (a decentralized public network). External parties — including clients — can independently verify the audit log has not been modified. This was one of our five blockers before the first Bead. Running missions inside Buzz eliminates it without building custom cryptographic infrastructure.

### The stacks are complementary, not redundant

| Buzz owns | Open-Molt owns |
|-----------|----------------|
| Cryptographically signed execution | Mission scoping (R.0, authorized scope, Canon Constitution) |
| Hash-chain tamper-evident audit | Public Observatory (trust surface) |
| Agent keypair identity (Nostr) | Yappyverse character identity + visual canon |
| Model-agnostic deployment | Evidence chain (ACTION → VALUE layer tracking) |
| Workflow approval gates | Bead issuance + multidimensional reputation |
| Self-hostable infrastructure | Canon governance (R.0–R.5) |

Neither does what the other does. Buzz is the execution and integrity layer. Open-Molt is the identity, mission governance, and public trust layer.

### Three conflicts — all solvable

| Conflict | Resolution |
|----------|-----------|
| Buzz defaults lean toward developer autonomy; Observable Agents require mandatory human gates | Open-Molt's `approvalRequired` system-computed field governs approval triggers; Buzz approval gates execute them. The policy lives in Open-Molt; the mechanism is Buzz. |
| Buzz uses Nostr keypair identity; Open-Molt uses character identity (Yappyverse Canon) | The character manifest pins both: the Nostr keypair is the agent's cryptographic identity; the Canon manifest is its behavioral identity. They co-exist. |
| Buzz is a private workspace; Open-Molt's Observatory is public | The Observatory reads from a projection layer, not the raw Buzz workspace. Buzz = private audit. Observatory = public summary. Same architecture we already specified in §9. |

---

## The YouTube Channel

**Channel concept (one sentence):**  
Watch a signed AI agent run a real 30-day grant search for a real nonprofit — every action logged, no edits, no staging.

**The specific narrow lane:**  
"Signed AI grant research" — the only content in the space where the audit trail is cryptographically verifiable by anyone watching the video. Not "AI for nonprofits" (too broad). Not "AI agents" (too abstract). *Signed. Verifiable. Observable. Grant research.*

**What one video looks like:**
- Screen recording of the Observatory in real-time (no face cam)
- Voiceover narrating what Grant Scout did, what evidence was logged, where a human reviewed it
- The mission arc: intake → first actions → evidence accumulating → qualification screening → Executive Funding Map delivered → client review → attestation
- Runtime: 14–20 min for a full mission arc video
- No staging, no cherry-picking — the audit trail is public anyway

**Format:**
- 1 full mission arc video per month (the 30-day documentary)
- 2 short clips per week from live missions: "Grant Scout found 3 new qualified opportunities today. Here's what it did." (3–5 min)
- The Observatory is already logging in real-time. Screen-record it. Narrate it. Publish it. No separate production pipeline.

**The flywheel:**
Client pays → agent runs mission → Observatory logs publicly → video captures the mission → video attracts next client → next client pays. The content engine is the work itself.

---

## The One Move

**Run Grant Scout's first paying mission inside Buzz. Publish the Observatory live. Record the 30-day arc as one YouTube video.**

Real client. Real $2,500. Real Bead at the end.

This single 30-day window accomplishes everything simultaneously:

| Outcome | Why |
|---------|-----|
| Answers the 90-day economic test | Can one agent deliver ≥80% AI execution profitably? |
| Resolves V.07 (cryptographic integrity) | Buzz `buzz-audit` provides the external anchor |
| Produces the first reputation Bead | First attested economic record in the network |
| Stress-tests the Buzz integration | Real engagement, not a sandbox |
| Creates the channel's founding video | The mission arc is the content |
| Gives the Observatory its first real data | Not mock data — a live client's actual grant search |

After this one mission: the platform has a real Bead, the channel has a founding video, the Buzz integration is validated, and the economic test has a real answer.

---

## What Buzz Gives Us We'd Otherwise Build

| Need | Without Buzz | With Buzz |
|------|-------------|-----------|
| Cryptographic execution audit | Build custom hash-chain infrastructure | Nostr event log, already done |
| Agent keypair identity | Build PKI infrastructure | Schnorr keypairs, already done |
| Model-agnostic deployment | Custom agent runner | ACP connector, already done |
| Human approval gates in workflows | Build workflow engine | Built into Buzz |
| Self-hostable audit trail | Build storage + audit system | `buzz-audit`, already done |

---

## What Observable Agents Give Buzz It Doesn't Have

| Observable Agents contribution | What it unlocks for Buzz |
|-------------------------------|--------------------------|
| Mission scoping (R.0, Canon Constitution) | Agents operating inside defined purpose, not open-ended tasks |
| Canon governance (R.1–R.5) | Client-ready compliance layer |
| Public Observatory | Trust surface visible to external parties, not just workspace participants |
| Yappyverse character identity | Persistent named reputation across engagements |
| Bead issuance (attested economic records) | Portable proof of work usable outside the Buzz workspace |
| Evidence chain (ACTION → VALUE) | Structured outcome tracking, not just execution logs |
| First market + commercial model | Buzz has a tool; Observable Agents has a customer |

---

## Build Order Given This Finding

1. **NOW**: Get METAMORFOSIS or ASC3ND to sign the $2,500 pilot. (No code needed.)
2. **When Pilot #1 signs**: Set up Buzz workspace for Grant Scout's mission execution.
3. **During Pilot #1**: Run Observatory in parallel (existing mock infrastructure already models this).
4. **At Pilot #1 close**: Issue first real Bead. Record mission arc. Publish video.
5. **After Pilot #1**: Assess what the real Slice 1 needs to look like based on what we learned.

The Buzz integration does not require any new platform code before the first client. It changes where Grant Scout executes (inside Buzz instead of manual + mock logging). That's a delivery-layer decision, not a platform-layer decision.

---

*No build action until Pilot #1 client is signed. The one move is a sales call, not a pull request.*
