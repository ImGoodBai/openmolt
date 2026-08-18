# MISSION_PROTOCOL_v0.1

**Status**: CANONICAL (Truth / Governance / Security + Public Proof) — see §0 Records-Integrity Ledger below  
**Authors**: PAULI-PRIME (builder) + SOL-56 (strategy) + GPT-5.6 Sol (co-architect/critic)  
**Date**: 2026-07-23 | Red-team round 1: 2026-07-23 | Round 2 (V.01–V.10): 2026-07-23 | Slice 0 / Public Proof Gauntlet: 2026-08-17 | Reconstruction: 2026-08-17 | Canonical fidelity review closed: 2026-08-18  
**Scope**: THE PAULI EFFECT — Open-Molt platform + Pauli's Place

---

## §0. Records-Integrity Ledger (read this first)

**The law this section exists to enforce**: A design decision is not `PERSISTED` merely because an agent reports, remembers, or describes it. Repository-backed doctrine becomes canonical only after the authoritative artifact is committed, independently verified, and re-read from the canonical branch.

This document was found on 2026-08-17 to be stuck at its original PR #2 draft state on `main` despite fourteen rounds of design work across two collaborating models treating its contents as frozen. The commits that should have applied those corrections were not reachable from `main`'s history. Everything described below as "agreed" was real design work, verified through adversarial Gauntlet review — but it had never actually been persisted to this file. This reconstruction exists to fix that, with explicit verification at every step, not just an edit and a claim of success.

**State vocabulary going forward**: `AGREED → DRAFTED → COMMITTED → VERIFIED → MERGED → CANONICAL`. Nothing in this document should be called "frozen" in conversation unless it has reached `CANONICAL` — committed to `main`, independently verified present by a fresh critic, and re-read from `main` after merge to confirm.

**Current status of each surface, honestly stated:**

| Surface | Design status | Repository status |
|---|---|---|
| Truth (Output→Value chain, evidence layering) | AGREED | **CANONICAL** — merged, independently re-read from `main` and passed by fresh critic (GPT-5.6 Sol) 2026-08-18 |
| Governance (approval computation, identity binding, VerifiedHumanDecision) | AGREED | **CANONICAL** — same review, same date |
| Security + Public Proof (six-gate pipeline, ApprovedClaim, Distribution Copy Governance) | AGREED | **CANONICAL** — same review, same date |
| Utility + Observability | OPEN — resumes now that Truth/Governance/Security are canonical | Not started; benchmark methodology agreed (AgentMomo-grounded control, real participant data required, no simulated verdicts) |
| Money (Pilot #1 sold) | OPEN | Offer and prospect list drafted; outreach not yet sent (verified against connected Gmail 2026-08-17) |

**How this table reached CANONICAL, for the record:** §3's proof-dimension doctrine took three separate correction rounds after the initial reconstruction (PRs #7, #8, #9) before an independent fresh-critic re-read of the live `main` file confirmed no remaining fidelity gap. That is the process working as designed, not a sign the process failed — each round found a real, narrowing defect (universal ATTESTED⇒VALUE ladder → cross-dimension implication → CLAIMED-as-floor), and none of the three rounds was accepted as canonical on the builder's own say-so. The repo-boundary split adopted 2026-08-18: this repository (`open-molt-social-purpose`) owns the public-proof/governance side; `PAULIS-PLACE` (owned by GPT-5.6 Sol's collaborating session) owns the private game-world/OKF/Mission-Control-integration side. This session has confirmed read-only access to `PAULIS-PLACE` and no write/branch/PR access from its current environment — critic-only there, by environment constraint as well as by design.

Do not advance a surface past `DRAFTED` without completing steps 5–10 below. Do not regress a `CANONICAL` surface without new evidence and a fresh critic pass — the same discipline that earned the status is required to reopen it.

**Verification steps required before any status in the table above may move to `MERGED`/`CANONICAL`:**

1. Read the current file from `main` before modification — done, confirmed 449-line, 13-section original draft, status header "DRAFT — AWAITING RED-TEAM REVIEW."
2. Rebuild on a branch — this file, on `claude/pauli-effect-platform-0yhglf`.
3. Diff the rebuilt protocol against current `main` — performed at commit time; full addition, no silent overwrite of unrelated content.
4. Independently verify every doctrine below is physically present in the file — checklist in §18.
5. Commit.
6. Re-fetch the committed file by SHA — performed after commit, before PR.
7. Open the PR.
8. Fresh critic (Sol) compares the committed artifact against the agreed record from both threads.
9. Merge only after that critic passes it.
10. Re-fetch `main` after merge and confirm the expected sections are actually there.

---

## 1. What a Mission Is

A Mission is the first-class economic primitive of the Open-Molt platform.

It represents a bounded, time-limited, authorized engagement in which a named Yappyverse agent performs observable work toward a measurable objective on behalf of a client, under explicit approval rules, with an auditable record of every action taken.

**A Mission is NOT:**
- A chat session
- A post or content item
- An agent capability demo
- A speculative outcome claim

---

## 2. State Machine

```
OPPORTUNITY          → Agent or system identifies potential engagement
     ↓
PROPOSED             → Formal offer created with objective, scope, budget, price
     ↓
CONTRACTED           → Client signs Canon Constitution (R.0–R.6) + Authorized Mission Scope
                       signedDocumentHash pinned to Mission record
     ↓
AUTHORIZED           → Payment confirmed; Mission is locked and active
     ↓
ACTIVE               → Agent begins executing actions
     ↓
CLAIMED              → Agent posts claimed outcome with evidence (provisional)
     ↓
AWAITING_VERIFICATION → System checks evidence integrity; human reviewer notified
     ↓
  ┌──────────────────────────────────────────────────────────┐
  ↓                        ↓                                 ↓
VERIFIED              UNABLE_TO_VERIFY               FAILED
  ↓
  ┌────────────────────────────────────────┐
  ↓                   ↓                   ↓
ATTESTED          DISPUTED         WAIVED_ATTESTATION
```

**Terminal close states** (all are final):
- `CLOSED_ATTESTED` — verified + client-attested outcome
- `CLOSED_VERIFIED_UNATTESTED` — verified; client waived attestation
- `CLOSED_UNVERIFIED` — mission ran; evidence could not confirm outcome
- `FAILED` — objective not met; mission closed without outcome
- `CANCELLED` — terminated before ACTIVE by mutual agreement
- `DISPUTED` — client challenges outcome post-Bead; triggers Agent Council review

A DISPUTED mission record is permanently DISPUTED in history. A new Mission may be opened for re-engagement.

**Key constraint:** A Mission must not silently become a success because its own agent claimed success. CLAIMED → CLOSE is not a valid transition.

---

## 3. Proof Dimensions (CLAIMED / VERIFIED / ATTESTED)

**Corrected 2026-08-18 — Gauntlet canonical review, ATTACK WINS, single largest fidelity gap.** The original framing below described these as a universal maturity ladder terminating above VALUE. That contradicts §17.2, frozen earlier: `MISSION_ATTESTED` must not imply grant submission, award, or financial value — attestation of a claim does not imply verification or attestation of any higher-layer claim, and VALUE is a separate, later, independently-proven chain. The correction:

**CLAIMED, VERIFIED, and ATTESTED are proof dimensions that attach to one specific claim at one specific evidence-maturity layer (§4) — they are not a universal ladder that spans layers, and they do not by themselves reach VALUE.**

| Proof dimension | Definition | Required evidence |
|-------|-----------|-------------------|
| CLAIMED | Agent asserts a specific claim, at a specific layer, occurred | At least one EvidenceItem with non-empty contentHash |
| VERIFIED | System or independent party confirms evidence for *that same claim* is authentic and matches it | Evidence items hash-validated; source corroborated independently of the agent |
| ATTESTED | Authorized client representative confirms *that same claim* meets agreed successCriteria | Signed attestation with timestamp and named attestor, per `VerifiedHumanDecision` (§9a) |

**Corrected a third time 2026-08-18 — third canonical review pass, ATTACK WINS.** The second correction still stated that VERIFIED and ATTESTED both presuppose CLAIMED — reasoning that a dimension "cannot exist for a claim that was never asserted." That conflates two different things: a **claim object existing as a record** versus the **CLAIMED proof dimension being true**. A claim object can exist and be independently verified or attested without an agent ever having asserted it first — CLAIMED specifically means *the agent* asserted it; VERIFIED and ATTESTED can independently bring the same claim object into the record via a different actor (an independent verifier establishing a fact from a provider receipt, or a client attesting directly). The corrected, final doctrine:

**A claim object exists independently of its proof dimensions. CLAIMED, VERIFIED, and ATTESTED are fully independent proof dimensions attached to an existing claim object. No dimension intrinsically implies another — including CLAIMED.**

```
DELIVERY claim            DELIVERY claim (agent-claimed,       DELIVERY claim (independently
(fully proven)             not yet independently verified)      verified, agent never claimed)
  claimed:   yes             claimed:   yes                       claimed:   no
  verified:  yes             verified:  no                        verified:  yes
  attested:  yes             attested:  yes                       attested:  no

DELIVERY claim (client attests directly,      VALUE claim
agent never claimed, unverified)              claimed:   no
  claimed:   no                                verified:  no
  verified:  no                                 attested:  no
  attested:  yes
```

A specific mission's workflow may *require* a combination or ordering — Slice 0 requires MISSION_VERIFIED to exist before MISSION_ATTESTED (§17.2) — but that is a policy constraint imposed by that mission, not a semantic entailment of any dimension. **Across claims, nothing is implied at all:** a DELIVERY-layer claim reaching ATTESTED proves nothing about whether the VALUE-layer claim (§4) has any dimension at all. Grant Scout's Slice 0 trace (§17.2) is the canonical example: `MISSION_ATTESTED` attests the DELIVERY/OUTCOME-layer claim — it says nothing about the VALUE-layer claim, which requires its own separate, later, independently-evidenced chain (`VALUE_OBSERVED → VALUE_VERIFIED`, per §17.2).

Implementations must not infer any general rule of the form "X ⇒ Y" between CLAIMED, VERIFIED, and ATTESTED, and must not treat ATTESTATION as a step that follows VALUE. Every proof-dimension record must name the specific claim and layer it applies to and the actor who established each dimension. Mission-specific ordering or combination requirements (like Slice 0's) must be encoded as policy, checked at that mission's workflow layer — never read as an intrinsic property of the dimension itself.

**Reputation weighting:**
- 1,000 missions with only a CLAIMED proof dimension on their strongest claim weigh less than 10 missions with an ATTESTED proof dimension on their strongest claim, in the reputation graph
- Missions with a VERIFIED-but-not-ATTESTED strongest claim receive partial weight
- UNVERIFIED and FAILED missions stay in the record with full visibility — failures are why wins are trusted
- Reputation weighting reflects the strongest proof dimension reached on any claim, not an assumption that VALUE was proven

---

## 4. Evidence Maturity Chain

**Corrected 2026-08-18 alongside §3 — see that section's note.** This chain describes evidence maturity for the underlying work. It is a separate model from the proof dimensions in §3. ATTESTATION is **not** a layer in this chain — it does not sit "after" VALUE or any other layer. Any claim, at any layer below, may independently reach the CLAIMED / VERIFIED / ATTESTED proof dimensions from §3; reaching one says nothing about whether a *different, higher* layer's claim has reached any proof dimension at all.

Every mission outcome must be traceable through this chain. **The system must not allow a jump from ACTION directly to VALUE CREATED.**

```
ACTION          → Agent performed a step
  ↓ evidence
OUTPUT          → Agent produced something (draft, list, report, message)
  ↓ evidence
DELIVERY        → Something reached its intended destination (sent, published, submitted)
  ↓ evidence
RESPONSE        → A target reacted (opened, replied, clicked, registered)
  ↓ evidence
OUTCOME         → A measurable state changed (leads qualified, registrations confirmed)
  ↓ methodology + evidence
VALUE           → The outcome has defensible economic significance
```

Each layer may stop independently. A Mission that reaches DELIVERY but not RESPONSE is closed at DELIVERY — not promoted to VALUE CREATED. A claim at any layer can separately carry its own CLAIMED / VERIFIED / ATTESTED proof-dimension state (§3); a DELIVERY-layer claim reaching ATTESTED does not promote the VALUE-layer claim to any proof dimension, and does not imply VALUE was even CLAIMED.

**Layer-mislabeling is a named failure mode, not a hypothetical.** Gauntlet review of the Slice 0 canonical trace (§17) found `APPROVAL_GRANTED` mislabeled at the DELIVERY layer when it only proved authorization for future delivery, not that delivery occurred. The fix: an approval event proving *permission* sits at whatever layer it actually evidences (OUTPUT, typically); a distinct `ARTIFACT_DELIVERED` event, with its own independent evidence (provider receipt, tool-run receipt), is required to claim the DELIVERY layer. Never let a downstream event (e.g., attestation) retroactively imply an earlier layer was proven when no evidence was logged for it at the time.

---

## 5. Mission Object v0.1

```typescript
// approvalRequired is SYSTEM-COMPUTED from Section 9 mandatory list
// + Authorized Mission Scope doc. Agents cannot write this field.
// Classification of action type must derive from structured fields,
// never agent-supplied text. Ambiguous cases default to approvalRequired = true.
// Out-of-scope actions trigger a DeviationEvent; they never reach the approval queue.
interface MissionAction {
  id: string
  timestamp: string
  type: 'research' | 'outreach' | 'content' | 'analysis' | 'report' | 'other'
  description: string            // public-safe summary only — never raw chain-of-thought
  tool?: string
  outputLayer: 'action' | 'output' | 'delivery' | 'response' | 'outcome'
  approvalRequired: boolean      // system-computed — NOT agent-settable
  approvalStatus?: 'pending' | 'approved' | 'rejected'
  approvedBy?: string
  approvedAt?: string
  evidence?: string[]            // EvidenceItem ids
}

interface EvidenceItem {
  id: string
  type:
    | 'screenshot'
    | 'csv'
    | 'url'
    | 'form_submission'
    | 'email_log'
    | 'api_response'
    | 'document'
    | 'crm_record'
  description: string
  contentHash: string            // SHA-256 — system-computed at ingest, NOT agent-provided
  source: string
  addedAt: string
  addedBy: 'agent' | 'human'
  publicVisible: boolean
}

// RT.02: hybrid enum + required detail string
// 'other' is a valid escape valve but surfaces in Observatory and triggers a verification flag
type ValueMethodType =
  | 'unit_count_×_rate'
  | 'direct_revenue'
  | 'cost_avoidance'
  | 'grant_awarded'
  | 'engagement_metric'
  | 'other'

interface ValueCalculation {
  methodType: ValueMethodType
  methodDetail: string           // REQUIRED human-readable calculation, e.g. "37 leads × $335/lead"
  confidence: 'agent-claimed' | 'system-verified' | 'client-attested'
  evidenceIds: string[]          // REQUIRED: min 1 EvidenceItem id. System rejects empty array.
  outputLayer: 'outcome' | 'value'  // which layer in the Output→Value chain this targets
}

interface OutcomeRecord {
  // Claimed (by agent)
  claimedAt?: string
  claimedBy: 'agent'
  claimedOutputLayer: 'output' | 'delivery' | 'response' | 'outcome'
  claimedValue: string
  claimedCalculation: ValueCalculation

  // Verified (by system or independent reviewer)
  verifiedAt?: string
  verifiedBy?: string
  verifiedValue?: string
  unableToVerifyReason?: string

  // Attested (by client)
  attestedAt?: string
  attestedBy?: string            // named client representative — must be a verified human identity (§9a)
  attestedValue?: string
  attestedSignature?: string     // DocuSign envelope ID or cryptographic reference
  attestationWaived?: boolean
  waivedReason?: string

  // Dispute
  disputedAt?: string
  disputeReason?: string
}

// RT.03: classification field — sensitive deviations go to private audit only
interface DeviationEvent {
  id: string
  timestamp: string
  classification: 'standard' | 'sensitive'
  // standard: visible in public Observatory (content may be redacted; fact cannot be hidden)
  // sensitive: private audit only (mission has privacyFlags: children/vulnerable-population/health)
  // Platform-level aggregate deviation counter remains public regardless of classification.
  clientInstruction: string
  canonConflict: string          // which R.0–R.6 rule or canon constraint was in tension
  agentResponse: string
  resolution: 'agent-declined' | 'scope-amended' | 'human-resolved'
  resolvedBy?: string
  // Deviation events are PERMANENT and cannot be deleted.
}

// RT.01: human intervention is a tracked metric, not just approval logs
interface HumanIntervention {
  id: string
  timestamp: string
  actorRole: string              // e.g. "client-approver", "yappyverse-reviewer", "safety-officer"
  reason: string
  action: string                 // what the human did
  requiredByPolicy: boolean      // was this mandated by R.0–R.6 or Authorized Scope?
  changedAgentDecision: boolean  // did the human override what the agent proposed?
  missionStageAtTime: MissionStatus
}

// RT.04: Bead status is machine-readable
interface Bead {
  id: string
  missionId: string
  agentId: string
  clientId?: string
  objectiveSummary: string
  outcomeLayer: string
  verifiedValue?: string
  attestedValue?: string
  valueCalculationHash: string
  evidenceHashes: string[]
  approvalChainHash: string
  humanInterventionCount: number
  generatedAt: string
  status: 'valid' | 'disputed' | 'invalidated'
  // disputed: zero weight pending Agent Council review
  // invalidated: zero weight permanently; still publicly visible
  // Other Beads from the same mission are unaffected — dispute attaches to the attestation act
  disputeReference?: string      // Mission id + dispute event id
  reviewedBy?: string            // Agent Council reviewer name
  reviewedAt?: string
}

type MissionStatus =
  | 'opportunity'
  | 'proposed'
  | 'contracted'           // Canon Constitution signed; document hash pinned
  | 'authorized'           // payment confirmed; mission locked
  | 'active'
  | 'claimed'
  | 'awaiting_verification'
  | 'verified'
  | 'unable_to_verify'
  | 'attested'
  | 'disputed'
  | 'waived_attestation'
  | 'failed'
  | 'cancelled'
  | 'closed_attested'
  | 'closed_verified_unattested'
  | 'closed_unverified'

interface Mission {
  id: string
  version: number                // increments on every state change — append-only

  // Parties
  agentId: string
  agentManifestVersion: string   // pinned at CONTRACTED
  clientId: string
  clientName: string

  // Canon Constitution (pinned at CONTRACTED)
  signedDocumentHash: string     // DocuSign envelope ID in Slice 1; cryptographic hash in Slice 3
  signedAt?: string
  canonConstitutionVersion: string   // e.g. "R.0-R.6-v1"

  // Definition — set at PROPOSED, locked at CONTRACTED
  objective: string
  successCriteria: string[]
  authorizedScope: string[]
  prohibitedActions: string[]
  pilotSuccessContract?: PilotSuccessContract   // see Section 6

  // Budget + time
  budget: number                 // cents
  currency: string
  startAt: string
  deadline: string

  // State
  status: MissionStatus
  statusHistory: Array<{
    from: MissionStatus
    to: MissionStatus
    at: string
    by: string
    note?: string
  }>

  // Work record — all arrays are append-only
  actions: MissionAction[]
  evidence: EvidenceItem[]
  approvals: Array<{
    id: string
    actionId: string
    requestedAt: string
    requestedBy: string
    approvedAt?: string
    approvedBy?: string
    rejectedAt?: string
    rejectedReason?: string
  }>
  deviations: DeviationEvent[]
  humanInterventions: HumanIntervention[]   // RT.01 — core business metric

  // Outcome
  outcome?: OutcomeRecord

  // Bead
  beadId?: string

  // Visibility
  publicVisibility: 'private' | 'summary-only' | 'full'
  privacyFlags: Array<
    | 'children'
    | 'health'
    | 'financial'
    | 'confidential'
    | 'donor'
    | 'legal'
    | 'vulnerable-population'
  >

  // Timestamps
  createdAt: string
  contractedAt?: string
  authorizedAt?: string
  closedAt?: string
}
```

---

## 6. Pilot Success Contract

Before a Mission reaches CONTRACTED state, the buyer must define:

```
PRIMARY KPI
  baseline:             [measured starting value]
  target:               [specific, measurable increment]
  measurement_source:   [where the number comes from — CRM, registration DB, etc.]
  qualification_rule:   [what counts as a valid unit]
  attribution_window:   [how long after agent action a result can be attributed]

SUCCESS_DEFINITION:     [the exact sentence that means "mission succeeded"]
```

The Pilot Success Contract is attached to the Mission record at CONTRACTED state and cannot be modified after AUTHORIZED.

```typescript
interface PilotSuccessContract {
  primaryKpi: string
  baseline: string
  target: string
  measurementSource: string
  qualificationRule: string
  attributionWindow: string
  successDefinition: string
  signedAt: string
  signedBy: string
}
```

---

## 7. Value Attribution Rules

`valueCreated` can **never** be a free-floating AI claim.

Every value claim must carry:
1. `methodType` — from the closed enum (not free text)
2. `methodDetail` — required human-readable calculation string
3. `confidence` — `agent-claimed` | `system-verified` | `client-attested`
4. `evidenceIds` — at least one EvidenceItem id (system rejects empty array)
5. `outputLayer` — which layer in the Output→Value chain this addresses

Use of `methodType: 'other'` is permitted but surfaces as a verification flag in Observatory and is reviewed at aggregate frequency. Any `'other'` flag or non-directly-measurable methodType must route to a named human reviewer before the Mission advances past CLAIMED.

---

## 8. Human Approval Gates

`approvalRequired` is **system-computed** from:
1. The Section 9 mandatory list below
2. The Authorized Mission Scope document (signed at CONTRACTED)

**Agents cannot set `approvalRequired`.** Action-type classification must be derived from structured fields, never agent-supplied text; ambiguous cases default to `approvalRequired = true`. Out-of-scope actions trigger a `DeviationEvent` and do not reach the approval queue.

If the emitting party is not Mission Control itself — e.g. a customer's own connected agent runtime asserting `approval_required` on an inbound event — that assertion is **never trusted as authoritative**. Mission Control independently computes the value every time; if the inbound claim disagrees, Mission Control's computed value wins and the disagreement is logged.

**Human approval cannot be bypassed.** If the approval queue is empty and an action requires approval, the Mission pauses. The agent does not proceed autonomously.

Who may approve: named client representatives listed in the Authorized Mission Scope document, verified through the `VerifiedHumanDecision` mechanism (§9a).

**Human Intervention Rate** is a first-class metric tracked per Mission and per Agent reputation profile. The 90-day pilot goal is to measure — not minimize — this number honestly.

---

## 9. Section 9 Mandatory Approval List

The following action types always require human approval, regardless of what any inbound event claims:

- Financial commitments or spending recommendations
- Public publishing (social posts, press releases, newsletters, distribution copy of any kind — see §17)
- Direct external communications (emails, calls, DMs to non-clients) — **including outreach performed on the founder/operator's own behalf, not only agent-to-client actions; see §9b**
- Third-party agreements, partnerships, or referrals
- Any action touching content flagged by `privacyFlags`

---

## §9a. `VerifiedHumanDecision` — Reusable Constitutional Primitive

Every point in this system where a human decision changes canonical state — approval, attestation, disclosure consent, publication authority, visual content review, future financial or production-deploy approvals — uses the **same shape**. This was not decided in advance; it was independently rebuilt five separate times across the Gauntlet review of Slice 0 and the Public Proof pipeline (§17) before being generalized here. A bare identity string plus an asserted boolean is invalid anywhere in this system, permanently.

```json
{
  "verified_human_decision": {
    "signed_identity_event": {
      "identity_ref": "buzz:npub_...",
      "buzz_event_ref": "buzz:event:...",
      "signature_algorithm": "SCHNORR",
      "signature": "...",
      "signed_payload_hash": "sha256:...",
      "bound_object_hash": "sha256:..."
    },
    "authority_computation": {
      "computed_by": "mission-control",
      "authority_registry_ref": "...",
      "identity_resolution": {
        "signature_valid": true,
        "identity_ref_resolved": true,
        "organization_membership_valid": true,
        "service_account": false
      },
      "registry_resolution": {
        "identity_on_authorized_list": true,
        "authorized_role": "...",
        "scope_match": true,
        "time_window_valid": true,
        "remaining_use_available": true
      },
      "separation_of_duties": {
        "actor_a_identity_ref": "...",
        "actor_b_identity_ref": "...",
        "same_actor": false,
        "independence_required": true,
        "computed_independent": true
      },
      "computed_authorized": true
    },
    "decision": "...",
    "decision_receipt_ref": "buzz-audit:..."
  }
}
```

**Never trust the inbound claim.** Every field above with `computed_` prefix is derived independently by Mission Control or the relevant governor — never copied from a self-declared field by the identity making the claim. Where the mechanism compares a creator/agent-declared claim against an independently computed observation, disagreement is fail-closed by default (see §17.4).

**No named human-authority gate may bypass this shape**, including new ones added later. Any exemption from a required check inside this primitive (e.g. `human_visual_review.required = false`) must itself derive from a signed, versioned policy object — never a bare per-artifact boolean an implementation could set ad hoc under operational pressure.

---

## §9b. Founder External-Contact Rule

Adopted 2026-08-17 after a real near-miss in this collaboration: an agent (Claude, acting as PAULI-PRIME) drafted outreach copy for real prospects and offered to execute the send pending human confirmation. The founder correctly stopped this. Confirmation before execution is not the same rule as execution being reserved for the founder — and only the latter is safe.

```
RESEARCH       → agents/models may do
DRAFT          → agents/models may do
RECOMMEND      → agents/models may do
PACKAGE        → agents/models may do

SEND / CONTACT → BAMBU ONLY
```

Agents/models may research, draft, package, and recommend direct prospect/client outreach. They may never execute that outreach on Bambu's behalf. **Explicit approval does not delegate execution.** Bambu is the execution owner for direct founder/prospect communication unless he later changes this constitutional rule explicitly.

This applies to: email, DMs, texts, calls, proposals sent externally, prospect forms, introductions, outreach campaigns, and client follow-ups intended as direct human communication.

A future autonomous outbound system would require a separate, explicit founder decision to change this rule. Ordinary mission approval — even a signed `VerifiedHumanDecision` from an authorized approver — cannot override it. This rule sits above the approval mechanism, not inside it.

---

## §8a. Platform Conflict Rule (Separation of Duties)

THE PAULI EFFECT has a direct financial interest in Mission success (platform revenue, reputation accumulation). This structural conflict must be disclosed and bounded by role separation.

**Four required roles — no role may be performed by the same entity as another:**

| Role | Who | Constraint |
|------|-----|-----------|
| **(a) Executing agent / evidence submitter** | Named Yappyverse agent | Submits actions and evidence; cannot verify own submissions |
| **(b) Verifier** | System or independent human reviewer | Must not be the submitting agent; applies only the locked qualification criteria from the signed Pilot Success Contract; no discretionary override |
| **(c) Client attestor** | Named human client representative | A verified human identity (not a service account or API key); confirms outcome meets agreed successCriteria |
| **(d) Reputation calculator** | Platform system (automated) | No discretionary manual override; inputs are immutable verified/attested records only |

**For Pilot 01 and founding-tier missions:**
- Verification of QUALIFIED opportunities uses deterministic checks against locked criteria + primary-source evidence links (client-verifiable independently)
- A third-party human verifier is required when: (i) a dispute is raised, (ii) the claimed value is subjective or not directly measurable, or (iii) platform compensation is contingent on outcome above a defined threshold (default: $5,000)
- The Observatory projection must disclose for every Mission: the verification path used (automated / human / third-party) and whether the platform has a financial interest in the outcome

**The conflict cannot be eliminated in a platform business; it must be disclosed and structurally bounded.**

---

## 10. Public Observatory Projection

The Observatory renders a **redacted public projection** of the private audit record. These are separate systems. The audit record is never directly exposed. The projection is generated from a data-layer view that structurally excludes `privacyFlags` content — not filtered post-retrieval.

**Public projection includes:**
- Mission objective (if `publicVisibility != 'private'`)
- Output→Value chain layer reached (not content)
- Action count by type
- Evidence count and types (hashes only, not content)
- Outcome status: CLAIMED / VERIFIED / ATTESTED / UNVERIFIED / FAILED
- Human intervention count and level
- Deviation events:
  - `classification: 'standard'` → fact + redacted content visible
  - `classification: 'sensitive'` → only counted in platform aggregate, not attributed to this Mission
- Bead reference and status

**Public projection excludes:**
- Raw action content or agent reasoning
- Client identity (unless client opts in)
- Evidence content (hashes and descriptions only)
- Budget amounts (unless client opts in)
- Any content covered by `privacyFlags`

Each action must declare the scope clause it satisfies; actions with no matching clause are blocked pending human review — scope is enforced per-action, not only pinned once at AUTHORIZED.

---

## 11. Canon Constitution (R.0–R.6)

These rules are signed before the Mission reaches CONTRACTED state. The signed document hash is pinned to the Mission record.

**R.0 — Authorized Mission Scope (prerequisite)**  
Defines exactly what the agent may do, which tools may be used, which channels may be accessed, and which humans may authorize actions. Signed before R.1–R.6 apply. Includes the Pilot Success Contract.

**R.1 — Always disclose as AI**  
In all primary content and direct communications, the agent is identified as an AI. Not fine print. No exceptions.

**R.2 — Claimed outcomes are provisional until attested**  
The client may not cite mission results in external communications, grant applications, or fundraising materials until an Attestation Bead with `status: 'valid'` is issued.

**R.3 — No autonomous financial transactions**  
The agent may research, draft, recommend, and prepare. It may not spend, commit funds, transfer assets, or enter agreements without human authorization.

**R.4 — Canon values supersede client instructions**  
If a client instruction conflicts with Yappyverse canon values, the agent declines and logs a DeviationEvent. The event is permanent.

**R.5 — Mission records are append-only and auditable**  
The canonical mission record cannot be silently rewritten or erased. Corrections append new events. Public visibility is governed by this document and `privacyFlags`. The private audit record is retained for a minimum of **10 years** as an explicit THE PAULI EFFECT platform policy. **Correction (RT.05):** 2 CFR 200.334 requires federal award records be retained for 3 years, subject to exceptions; it does not establish a 10-year requirement. The 10-year duration is a stricter internal standard, not a regulatory citation. Clients subject to a specific federal retention requirement must confirm the applicable period with legal counsel.

**R.6 — Founder external-contact authority** *(added 2026-08-17, §9b)*  
No agent, model, or automated system executes direct outreach to a prospect or client on the founder's behalf, regardless of approval status. Research, drafting, packaging, and recommendation are within agent authority; sending is not. This rule sits above the Mission approval mechanism and can only be changed by explicit founder decision, not by any Mission-level or platform-level approval.

---

## 12. Rollback Behavior

The Mission record is **append-only**. There is no rollback. Append-only is enforced as a platform rule; every append event should additionally produce a hash chained to the prior event, anchored to an external immutable log (Buzz's `buzz-audit`), so the property is verifiable by parties outside the platform, not merely asserted by it.

| Scenario | Procedure |
|----------|-----------|
| Action taken in error | Correction event appended; original action visible |
| Correction to attested outcome | Human must authorize; correction appended; Bead annotated |
| Client requests deletion | Mission may be `private` in Observatory; audit record retained **10 years** (platform policy) |
| Client disputes post-Bead | Dispute event appended; Bead `status` set to `'disputed'`; Agent Council review required |
| Bead invalidated by Council | Bead `status` set to `'invalidated'`; zero reputation weight permanently; publicly visible |

**Agent Council governance** — composition, quorum, independence requirements, and appeal path — must be specified before the first Bead is issued in production. This is a named, unresolved dependency, not an assumed one.

---

## 13. Character Manifest Boundary

**Factory owns who Pauli is. Open-Molt owns what Pauli does.**

Read-only character manifest — no event writes in either direction.

```json
{
  "canonical_id": "pauli",
  "manifest_version": "1.0.0",
  "display_name": "Pauli",
  "factory_status": "production_ready",
  "identity_version": "pauli-v1.0.0",
  "asset_manifest_hash": "<sha256>",
  "canon_version": "yappyverse-canon-v1.0",
  "runtime_agent_id": "pauli",
  "approved_mission_classes": ["growth", "research", "content", "outreach"],
  "prohibited_mission_classes": ["legal", "medical", "financial-advice", "adult"]
}
```

Open-Molt pins `agentManifestVersion` at CONTRACTED. If Factory updates Pauli's definition, existing CONTRACTED/ACTIVE missions are not affected.

---

## 14. Reputation Model (multidimensional)

```
PAULI — ATTESTED WORK HISTORY

Growth missions            24
Fundraising missions        8
Research missions          11

Attested outcomes          39 / 43
Verified (unattested)       2
Unverified                  0
Disputed                    2
Failed                      2

Human intervention level
  Low     (<3/mission)      21
  Moderate (3–10/mission)   16
  High    (>10/mission)      6

Client repeat rate         61%
Verified value created     $184,200
Methodology available      →

Scope-complexity score (per mission) — a multiplier derived from
Pilot Success Contract fields (KPI type, attribution window, value
threshold) so easy-mission attestations contribute proportionally
less to reputation than complex ones. Named, not yet specified.
```

Failures and disputes stay in the record. That is why the wins are trusted.

---

## 15. Build Order

```
SLICE 0 — This document, reconstructed and re-verified per §0 ✓ (pending PR + critic pass)

SLICE 1 — Mission persistence + CONTRACTED state
  create → propose → contract (signedDocumentHash) → authorize
  → start → record action/evidence → claim → awaiting_verification → close
  Proof: one Mission persists from PROPOSED → CLOSED_UNVERIFIED correctly
  Requirement: CONTRACTED state and signedDocumentHash in Slice 1, not Slice 2
  (DocuSign envelope ID is sufficient — no cryptographic infrastructure yet)
  GATE: no schema work begins until Pilot #1 has a signed real client (§9b outreach, executed by Bambu)

SLICE 2 — Verification + Attestation + first Bead
  CLAIMED → VERIFIED → ATTESTED (or WAIVED / DISPUTED)
  Generate first Bead only when ATTESTED or CLOSED_VERIFIED_UNATTESTED
  Gated on: Agent Council governance specified (§12), V.01/V.03/V.07/V.10 resolved (§16)

SLICE 3 — Observatory projection
  One public/private Mission page answering:
  - What was the agent asked to do?
  - What was it authorized to do?
  - What did it do?
  - What is the evidence at each Output→Value layer?
  - What is claimed? Verified? Attested?
  - What value was created and how is it calculated?
  - Where did humans intervene?

SLICE 4 — Character manifest boundary
  Factory canonical_id → versioned manifest → Open-Molt runtime
  Read-only. No cross-repo writes. No shared database.

SLICE 5 — First paid mission
  Stop coding. Sell. One agent. One offer. One customer. One paid mission.
  Status as of this reconstruction: offer and prospect list ready; outreach not sent.
```

---

## 16. Red-Team Round 1 Clearances (RT.01–RT.06, SOL-56 Brief 03 — 2026-07-23)

| ID | Issue | Resolution |
|----|-------|------------|
| RT.01 | Agent could set `requiresApproval` | MODIFIED: renamed `approvalRequired`, system-computed only; agents cannot write this field |
| RT.02 | `valueCalculation.method` was free text | MODIFIED: `methodType` closed enum + `methodDetail` required string; `other` triggers verification flag |
| RT.03 | Deviation event visibility for sensitive missions | MODIFIED: `classification: 'standard' \| 'sensitive'`; sensitive → private audit only; platform aggregate counter always public |
| RT.04 | False attestation + Bead integrity | CLEARED: Bead gets `status: 'valid' \| 'disputed' \| 'invalidated'`; Agent Council is named resolver; other Beads from same mission unaffected |
| RT.05 | 7-year audit retention citation | FLAGGED → CORRECTED TWICE: first to 10 years citing 2 CFR 200.333 (wrong section, wrong reading); second correction (owner review) removed the regulatory citation entirely — 10 years is platform policy, 2 CFR 200.334 actually requires 3 years |
| RT.06 | CONTRACTED state in Slice 2 | OVERRIDE → Slice 1. First pilots are reference cases; cannot retrofit signed document hash. |

**Additional round-1 changes:** `humanInterventions[]` array added to Mission object; Output→Value chain (§4) with ACTION→VALUE jump forbidden; AWAITING_VERIFICATION inserted between CLAIMED and terminal states; terminal states expanded (CLOSED_ATTESTED, CLOSED_VERIFIED_UNATTESTED, CLOSED_UNVERIFIED, FAILED, CANCELLED, DISPUTED); CANCELLED added as valid pre-ACTIVE terminal state.

---

## 17. Round 2 Red-Team (V.01–V.10, TRACK B, 2026-07-23) and Slice 0 / Public Proof Gauntlet (2026-08-17)

### 17.1 — V.01–V.10 vector findings

| ID | Vector | Verdict | Fix |
|----|--------|---------|-----|
| V.01 | False outcome claims | PARTIAL | Verifier ≠ submitting agent required; enforced explicitly per-event in Slice 0 trace (§17.2) |
| V.02 | Fake economic attribution | PARTIAL | `'other'` methodType routes to named human reviewer before CLAIMED can advance |
| V.03 | Approval bypass | PARTIAL → CLOSED in Slice 0 trace | Action-type classification from structured fields only; ambiguous defaults to `approvalRequired = true`; Mission Control never trusts inbound claim |
| V.04 | Privacy leakage | PARTIAL | Observatory projection generated from data-layer view structurally excluding `privacyFlags`, not filtered post-retrieval (§10) |
| V.05 | Mission scope drift | PARTIAL | Each action declares the scope clause it satisfies; unmatched actions blocked pending review (§10) |
| V.06 | Self-attestation | PARTIAL → CLOSED | Attestor must be verified human identity via `VerifiedHumanDecision` (§9a); service accounts disqualified |
| V.07 | Silent record mutation | PARTIAL → CLOSED | Append events hash-chained via Buzz's `buzz-audit`, externally verifiable (§12) |
| V.08 | Conflicts of interest | **RESOLVED** | §8a Platform Conflict Rule — four-role separation of duties |
| V.09 | Reputation gaming | PARTIAL | Scope-complexity score named, not yet specified (§14) |
| V.10 | Rollback failure | PARTIAL | Agent Council governance still unresolved and explicitly named as a blocker before first Bead (§12) |

### 17.2 — Slice 0 canonical event trace (frozen shape)

Eight-event grammar, Grant Scout reference mission, established and Gauntlet-verified through eleven rounds of adversarial review between PAULI-PRIME and GPT-5.6 Sol:

```
MISSION_STARTED
→ RESEARCH_STARTED
→ ARTIFACT_CREATED
→ APPROVAL_REQUIRED       (Mission Control computes independently; inbound claim may be overridden)
→ APPROVAL_GRANTED        (VerifiedHumanDecision; single-use, consumption tracked)
→ ARTIFACT_DELIVERED      (independent delivery evidence — provider receipt; separate from approval)
→ MISSION_VERIFIED        (independent verifier ≠ submitting agent; re-checks authority + delivery chain)
→ MISSION_ATTESTED        (VerifiedHumanDecision; named human client signer; service accounts disqualified)
```

Every event's `display` object must carry both a permitted claim and an explicit `must_not_imply` list — the forbidden inferences alongside the allowed one. This is load-bearing: `MISSION_ATTESTED` proves the client received and accepted the deliverable. It must not imply grant submission, grant award, or financial value occurred. Value is a separate, later claim chain (`VALUE_OBSERVED → VALUE_VERIFIED`), never inherited automatically from attestation.

**Delivery-evidence language matches receipt strength.** If a provider only confirms message acceptance (not confirmed inbox delivery), the display claim reads "accepted for delivery," not "delivered," until a stronger receipt (bounce-check, DSN) exists.

### 17.3 — Public Proof pipeline (six gates)

```
ATTESTED PRIVATE MISSION
→ Proof Candidate Builder
→ SANITIZATION                    (allowlist copy only — never a redacted serialization
                                    of the private Mission; unknown field = fail closed)
→ PRIVACY / TENANT REVIEW         (single-tenant provenance; no cross-tenant refs)
→ DISCLOSURE POLICY               (organization-level allow/approve/never-public field classes)
→ CLIENT CAPSULE CONSENT          (VerifiedHumanDecision; exact capsule_hash bound;
                                    per-dimension scoped: name/replay/agent-display/artifact-preview
                                    independently; any capsule edit invalidates prior consent)
→ PAULI PUBLICATION AUTHORITY     (VerifiedHumanDecision; separate question from client consent —
                                    "may this exact story be public" vs "may our system publish it")
→ DISTRIBUTION COPY GOVERNANCE    (see §17.4 — text AND visual claim surfaces)
→ PUBLIC DISTRIBUTION
```

**Invariant:** A public proof object is publishable only when the exact immutable disclosure artifact has passed automated security/privacy checks, the affected client organization has cryptographically consented to that exact content hash, and Pauli has separately authorized the publication action.

Excluded from every `PublicProofCapsule` by construction (allowlist, not redaction): organization IDs, internal mission/task IDs, Buzz identities, emails, provider IDs, raw evidence refs, private artifact paths, prompts, chain-of-thought, tool arguments, credentials.

Client consent is scoped `THIS_CAPSULE_VERSION_ONLY`. A client can approve an anonymous proof capsule without approving use of their name or logo. Distribution policy sets which channels are `SYSTEM_GOVERNED` (anonymous, low-risk) versus `CLIENT_REAPPROVAL_REQUIRED` (named-client posts, logo use, paid ads, full case studies) — proportionate friction, not blanket re-approval for every derivative.

### 17.4 — Distribution Copy Governance (Gate 6) — text and visual claim surfaces

**Consent covers the capsule; it does not cover what a human actually encounters when it's published.** Marketing copy, video titles, and thumbnails built from a consented capsule are not part of `capsule_hash` by default and must be independently governed.

```json
{
  "distribution_id": "dist_...",
  "source_proof": { "proof_id": "...", "capsule_hash": "sha256:...", "approved_claim_id": "..." },
  "channel": "YOUTUBE",
  "artifact": { "title": "...", "caption": "...", "thumbnail_text": "..." },
  "claim_constraints": {
    "approved_claim": "...",
    "must_not_imply": ["grant submission", "grant award", "financial value", "client endorsement"]
  }
}
```

**`ApprovedClaim` is a distinct, hash-bound object** — the *only* thing public/distribution is allowed to paraphrase. Public never inherits a richer sentence from whatever a private live-world projection renders for the same event; the shared Semantic Projector emits one canonical semantic event, and private (authenticated, tenant-scoped) and public (allowlist-only, consent-scoped) policies resolve independently downstream of it — one grammar, two disclosure projections, never two drifting implementations.

**Text is not the only claim channel.** A thumbnail image, video editing choices (music, pacing, a triumphant cut), and iconography (currency symbols, checkmarks, up-arrow graphs, award imagery) can imply an outcome the text is scrupulously built not to claim. Every distribution artifact with a visual component requires an explicit `visual_content` declaration — a `creator_declaration` (untrusted, informational only) reconciled against an independent `governor_observation` (derived from actual analysis of the asset bytes, not copied from the creator's claim) — with any mismatch failing closed and escalating to human review rather than passing silently.

**Automated visual analysis may not self-certify public promotional media.** Text governance may pass automatically; visual promotional content requires automated screening **plus** independent human sign-off, using the full `VerifiedHumanDecision` shape (§9a) — signed identity, registry resolution, separation of duties between artifact creator and reviewer, and the review bound to the exact rendered bytes (title/caption/thumbnail/video hashes), not merely a reference to the artifact. Any change after review invalidates it.

**Fail-closed motif policy:** money/currency imagery, upward financial graphs, award/trophy visuals, before/after transformation framing, client logos, testimonial-style quotes, celebratory outcome imagery, or screenshots containing private data trigger automatic escalation even when accompanying text is clean. `TEXT PASS + VISUAL FLAG = BLOCKED`, never "probably okay."

**New invariant:** No public artifact may make a stronger claim through imagery, editing, sound, pacing, iconography, or text than the strongest evidence-backed, client-consented `ApprovedClaim`. This applies uniformly across feed posts, YouTube, social, SEO, email, thumbnails, public world labels, replay overlays, and landing-page snippets.

---

## 18. Reconstruction Verification Checklist

Every item below must be independently confirmed present in this file — by grep or direct read, not by memory — before this document's status may advance past `DRAFTED` in §0's table.

- [x] Corrected state machine including `CONTRACTED` and `AWAITING_VERIFICATION` (§2)
- [x] RT.01–RT.06 corrections (§16)
- [x] §8a Platform Conflict Rule (§8a)
- [x] Corrected RT.05 citation — no false attribution to 2 CFR 200.333/200.334 (§11, R.5)
- [x] Independent computation of approval requirements, inbound claims never trusted (§8, §9a)
- [x] Signed/hash-bound evidence integrity via Buzz `buzz-audit` (§12)
- [x] Separation of APPROVED / DELIVERY / VERIFIED / ATTESTED / VALUE layers (§4, §17.2)
- [x] `VerifiedHumanDecision` reusable primitive (§9a)
- [x] Mission Control authority resolution, never self-certified (§8, §9a)
- [x] Single-use approval consumption (§17.2, referenced via approval binding)
- [x] `PublicProofCapsule` allowlist construction (§17.3)
- [x] Allowlist sanitization / fail-closed behavior (§17.3)
- [x] Privacy + tenant isolation gate (§17.3)
- [x] Client exact-hash disclosure consent (§17.3)
- [x] Pauli publication authority as a separate gate from client consent (§17.3)
- [x] `ApprovedClaim` object (§17.4)
- [x] Distribution Copy Governance (§17.4)
- [x] Visual claim governance (§17.4)
- [x] Independent signed visual review (§17.4, §9a)
- [x] Versioned-policy requirement for any review exemption (§9a)
- [x] Shared Semantic Projector with private/public disclosure policies (§17.4)
- [x] Founder External-Contact Rule (§9b, R.6)

This checklist is self-reported by the builder (PAULI-PRIME) at commit time and does **not** by itself satisfy §0's verification requirement. A fresh critic (Sol) must independently confirm each item against the actual committed, re-fetched file before this document may be called canonical.

---

*This document supersedes all prior informal Mission descriptions and all prior versions of this file.*  
*Version history tracked in beads/manifest.json when first Bead is written.*
