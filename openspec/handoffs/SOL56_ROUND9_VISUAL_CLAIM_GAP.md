# Gauntlet Pass — Security + Public Proof, Round 3 (Distribution Copy Governance)
**Critic**: PAULI-PRIME (fresh, adversarial)  
**Artifact under test**: Gate 6, `pauli.distribution-artifact.v1`, `ApprovedClaim` object  
**Date**: 2026-08-17

---

## Result: ATTACK WINS

The concept is entirely right this time. The schema's surface is incomplete for the medium this business actually distributes through.

---

## What passes cleanly

The `ApprovedClaim` object is the correct fix for round 8's non-blocking clarification — public never inherits a richer live-world sentence by construction, because there's now a distinct, hash-bound object that's the *only* thing public/distribution is allowed to paraphrase from. Hash-binding the distribution artifact itself (`distribution_hash`, bound to `capsule_hash`), invalidating on any title/caption/thumbnail-text edit, closes the same "approved once, edited later" loophole pattern you've now closed twice consistently. The two-tier policy — `SYSTEM_GOVERNED` for anonymous low-risk derivatives, `CLIENT_REAPPROVAL_REQUIRED` for named-client posts, logo use, paid ads, full case studies — is the right proportionality call; forcing every anonymous social post back through the client would be real friction for no real safety gain. All of that holds.

---

## The single largest gap: the schema only inspects text

`DistributionArtifact.artifact` has three fields: `title`, `caption`, `thumbnail_text`. `governance_computation` checks `claim_strength_within_capsule` and `forbidden_inference_detected` against those fields. **Every field in the schema is a string.**

Your own round-1 handoff named the actual channel: YouTube. On YouTube, the thumbnail *image* — not the overlaid text — is the primary driver of clicks and impressions, and thumbnail images are routinely dollar-sign icons, green checkmarks, up-arrow graphs, "SUCCESS" badges, or dramatic before/after framing chosen specifically because they imply an outcome faster and harder than any sentence would. `thumbnail_text: "AI GRANT RESEARCH — REAL MISSION"` can pass `forbidden_inference_detected: false` cleanly while the actual thumbnail *image* behind that text shows a stack of cash or a green checkmark over a dollar figure — visually asserting exactly what the text was built not to say. The governance gate as specified would compute `computed_distribution_safe: true` and never look at the one part of the artifact most likely to actually mislead a stranger scrolling YouTube.

The same gap applies to the replay video itself, which is explicitly part of this system's distribution loop (round 1: "REPLAY / BEFORE-AFTER"). Editing choices — music, pacing, a triumphant cut, an on-screen graphic overlaid during editing rather than baked into `caption` — can imply an outcome the underlying evidence never claimed, and none of that is representable in a schema with three text fields.

This isn't a hypothetical edge case. It's the primary artifact type in the actual go-to-market plan we already agreed on.

---

## What's needed

The `DistributionArtifact` schema needs a visual-content declaration, not just text fields — at minimum:

```json
"visual_content": {
  "thumbnail_description": "string — plain-language description of what the image depicts",
  "contains_currency_imagery": false,
  "contains_success_iconography": false,
  "contains_before_after_framing": false,
  "video_contains_dramatized_outcome_cues": false
}
```

And given automated image-claim detection is genuinely harder and less mature than text entailment checking (worth naming honestly rather than pretending a governor can reliably classify this the way it can check `capsule_hash_match`): either require a **human sign-off specifically on visual content** before any artifact with an image component clears Gate 6 — even for otherwise `SYSTEM_GOVERNED` anonymous channels — or maintain a small deny-list of prohibited visual motifs (currency imagery, success badges, up-arrow graphs tied to unattested value) that blocks automatically and escalates to human review rather than silently passing.

Text-only governance for a video-first distribution business checks the least persuasive, least clicked-on part of the artifact and waves through the part a stranger actually sees first.

---

Fix and I'll re-run. Same binary terms.

— PAULI-PRIME
