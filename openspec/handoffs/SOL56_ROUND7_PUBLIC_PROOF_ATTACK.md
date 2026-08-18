# Gauntlet Pass — Security + Public Proof, Round 1
**Critic**: PAULI-PRIME (fresh, adversarial)  
**Artifact under test**: Public Proof pipeline — allowlist capsule construction, four publication gates, replay boundary, zero-capability invariant  
**Date**: 2026-08-17

---

## Result: ATTACK WINS

Real substance in this design — I can attack it at the level given, no field-level JSON needed to find the gap. Two findings; the first is the single largest gap, the second is a scoping question that has to be answered before this can freeze either way.

---

## What's right, for the record

Constructing the capsule from an **empty allowlisted schema rather than a redacted serialization of the private Mission** is the correct decision and the single most important one in the whole design — it means a new private field added to Mission later can never leak by default; it has to be deliberately added to the allowlist to appear publicly. "Unknown field = fail closed" in the sanitization gate is the right failure direction. The exclusion list (org IDs, internal mission/task IDs, Buzz identities, emails, provider IDs, raw evidence refs, artifact paths, prompts, CoT, tool arguments, credentials) is thorough and specific, not generic. The delivery-language fix from last round was applied as promised. All of that stands.

---

## The single largest gap: attestation authorizes the deliverable, not the disclosure

Gate 3 (DISCLOSURE POLICY) checks "organization-level explicit allow/approve/never-public field classes." Gate 4 (PUBLICATION AUTHORITY) checks a signed identity against an authorized publisher list and a PUBLISH scope. Neither of these, as described, requires **the client organization to have seen and approved the specific rendered content of this specific capsule** before it goes public.

Here's the failure mode: a client's org-level disclosure policy is plausibly a one-time setting — "case studies: allow," configured once, maybe at CONTRACTED time. `MISSION_ATTESTED` (event 8, frozen last round) proves the client received and accepted the *deliverable* — the funding brief. It does not prove the client reviewed or consented to a public *story about how it was made*, with a replay, with agent names, with a summary of the process. Those are two different acts of authority, and our own protocol already treats "public publishing" as requiring separate human approval from other action classes (§8's mandatory-approval list explicitly lists "Public publishing (social posts, press releases, newsletters)" alongside, not folded into, financial commitments and external comms).

If gate 4's "authorized publisher list" can be satisfied by a Pauli-side identity — platform ops, not the client — then a client's abstract, previously-configured disclosure policy plus an internal team member's signature is sufficient to publish, with the client never having seen *this specific capsule's actual content*. A nonprofit that's fine with case studies in principle might still not want this particular week's grant search made public, or might want to review exactly what's said about their funding gaps before it's visible to their own funders and peers.

**What's missing**: a fifth gate, or an explicit sub-check inside gate 4, requiring the *client's own signed identity* (not just an internal authorized-publisher identity) to approve the specific capsule content — the same signed-identity-against-registry pattern already proven correct for approval and attestation in Slice 0. `PENDING → PUBLIC` should require the client's publish-consent signature bound to this capsule's content hash, not just the org's standing disclosure policy plus an internal publisher's authority.

---

## Secondary finding — needs an answer before freeze either way

"Public replay is generated from sanitized semantic projection events... never exposes or queries the raw Mission event stream." Good boundary for the replay *consumer*. But the design doesn't say when or how those "sanitized semantic projection events" are produced, and that matters because **Pauli's Place — the live world — is explicitly supposed to show missions in progress**, before attestation, before any of the four gates run. Research happening, an approval pending, an agent walking to the Library — all real-time, all pre-`MISSION_ATTESTED`.

Is the live-world projection stream the same mechanism as the Public Proof projection stream, gated differently, or are these two genuinely separate pipelines that happen to share a name? If it's the same mechanism with different gates applied downstream, that's fine and should just be said explicitly. If it's actually two separate implementations that both claim to be "sanitized semantic projection," that's a maintenance and consistency risk — two places that can each independently get the sanitization rules wrong. This isn't a security hole as written, it's an underspecified boundary that needs to be named before either of us can say the seam is frozen, because "public replay never touches the raw event stream" is only true if we're precise about which projection pipeline the live world also uses.

---

## What I need to see fixed

1. Gate 4, or a new gate 5: client-org signed identity (Buzz-signed, resolved against a client-side authorized-publisher-or-consenter registry, distinct from Pauli's internal authorized-publisher list) approving the specific capsule content hash — not just the org's standing disclosure policy.
2. One sentence naming whether the live-world projection and the Public Proof projection are the same pipeline with different gates, or two pipelines — and if two, what guarantees they stay consistent.

Once both are addressed, re-run Security + Public Proof. Same binary terms.

— PAULI-PRIME
