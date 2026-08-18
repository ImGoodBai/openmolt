# Gauntlet Pass — Security + Public Proof, Round 2 (Client Consent + Projector)
**Critic**: PAULI-PRIME (fresh, adversarial)  
**Artifact under test**: five-gate pipeline with client capsule consent, shared Semantic Projector  
**Date**: 2026-08-17

---

## Result: ATTACK WINS

The consent mechanism itself is correctly built. The gap is one layer downstream of it — exactly where this system's own business model lives.

---

## What passes cleanly

Gate ordering (client consent before Pauli's own publish authority) is right, and the two questions are correctly kept separate — "may this exact representation be public" vs. "may our system execute the publish action" — with the same discipline as approval/attestation: signed identity, resolved against a registry, computed field showing the check, not asserted. Exact-hash binding plus automatic invalidation on any capsule change (`capsule_hash_match`) closes the "approved v1, quietly shipped v4" attack precisely. Per-dimension consent scoping (`allows_client_name`, `allows_agent_display_names`, `allows_artifact_preview`) is a real, useful granularity beyond what I asked for — a client can consent to an anonymous story without consenting to their name attached. The shared Semantic Projector with split downstream disclosure policies correctly answers the round-7 scoping question — one grammar, two policies, no drifting duplicate engines. All of that holds.

One small clarification, not a gap: the example shows the projector emitting `"claim": "Research activity began."` — generic enough to be safe either way. Confirm explicitly that the *public* policy resolves an independently-approved claim string that's part of the consented capsule, not a reused field from whatever richer claim the live-world (tenant-authenticated) policy renders for the same event. If public inherits the same claim field by default and only the *other* fields (identity, artifact refs) get filtered, a future richer live-world claim could leak untried through the shared field. Worth one explicit sentence; not blocking.

---

## The single largest gap: consent covers the capsule, not the publication

The revised invariant: *"A public proof object is publishable only when the exact immutable disclosure artifact has passed automated security/privacy checks, the affected client organization has cryptographically consented to that exact content hash, and Pauli has separately authorized the publication action."*

That's true of the **capsule object**. It is not true of **what a human actually encounters when this gets published** — and your own round-1 handoff already committed this system to exactly that distribution path: *"PUBLIC PROOF POST → SHARING / SEARCH / SOCIAL → 'Watch this team work' → PAULI'S PLACE."* Publication in this business isn't "an object enters a database with `status: PUBLIC`" — it's a social post, a headline, a video title, a homepage teaser, a search-result snippet. None of that wrapper content is part of `capsule_hash`.

Concretely: the client signs consent for `capsule_hash: sha256:...` — the funding brief story, scoped exactly, `allows_client_name: false`. Nothing in the five gates governs the headline a Pauli marketing operator writes for the social post announcing it, the title on the YouTube clip built from the replay, or the caption on the homepage "LIVE NOW" feed. A wrapper reading *"This nonprofit just landed $50K thanks to AI"* could misstate the outcome (recall: `MISSION_ATTESTED`'s own `must_not_imply` explicitly forbids implying grant awards or financial value) — and because that copy lives outside the consented, hashed object, publishing it doesn't touch `capsule_hash_match`, doesn't invalidate consent, and isn't blocked by any of the five gates. The client consented to a specific story. The thing a stranger actually sees on social media or YouTube could say something else entirely, and the pipeline as specified has no opinion about that.

This isn't scope creep — it's the same failure mode as the `must_not_imply` fields you built for `MISSION_ATTESTED`, one layer further out: **a downstream surface asserting something the underlying evidence doesn't support.** We already agreed the display layer can't outrun what evidence proves inside the capsule. The same rule has to reach the marketing surface built from the capsule, or the whole discipline stops exactly where the actual public gets to see it.

---

## What's needed

Either: (a) any external promotional artifact (post copy, video title, thumbnail caption) derived from a `PublicProofCapsule` must itself be hash-bound to that capsule and pass through the same `must_not_imply` constraint set as the capsule's own display object, with its own lightweight consent or at minimum an automated claim-consistency check against the capsule's evidence — or (b) explicitly scope this out of the Security + Public Proof surface and name a separate, still-required gate ("Distribution Copy Governance" or similar) that has to exist before the go-to-market plan we already agreed on (faceless YouTube, social sharing loop) is safe to run. Either is acceptable. Leaving it unnamed is not — it's the exact seam where a real client's real trust gets spent.

---

Fix or explicitly scope it out with a named follow-up gate, and I'll re-run. Same binary terms.

— PAULI-PRIME
