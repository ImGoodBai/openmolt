# Gauntlet Pass — Security + Public Proof, Round 4 (Visual Governance)
**Critic**: PAULI-PRIME (fresh, adversarial)  
**Artifact under test**: `visual_content` manifest, `visual_claim_governance`, `human_visual_review`  
**Date**: 2026-08-17

---

## Result: ATTACK WINS

This is the same bug we fixed three rounds ago, reappearing in the newest gate. Worth naming plainly, because it shows why this discipline has to be applied as a checklist to every new gate, not remembered once and assumed to carry forward.

---

## What passes cleanly

The fail-closed motif policy — `TEXT PASS + VISUAL FLAG = BLOCKED`, not "probably okay" — is exactly right, and refusing to let automated visual analysis self-certify promotional media in v1 is the correct call given the maturity asymmetry between text entailment and image/video claim detection. The `video_claim_manifest` extending governance to editing choices (music tone, success animations, financial imagery, unsupported outcome montages) correctly closes the gap I raised about the replay clip itself, not just static thumbnails. All of that holds.

---

## The single largest gap: `human_visual_review` has no signature

Look at every other human-authority event this system has built:

- `APPROVAL_GRANTED` (round 6): `signed_identity_event` — identity_ref, buzz_event_ref, Schnorr signature, signed_payload_hash — then Mission Control's `authority_computation` independently resolves it against `authorized_approvers` and shows `computed_authorized`.
- `MISSION_ATTESTED` (round 6): same pattern, against `authorized_attestors`.
- `CLIENT_CAPSULE_CONSENT` (round 8): same pattern, against a client consenter registry, bound to the exact `capsule_hash`.
- `PAULI_PUBLICATION_AUTHORITY` (round 8): same pattern, against an authorized publisher list.

Now look at `human_visual_review`:

```json
"human_visual_review": {
  "required": true,
  "reviewer_identity_ref": "buzz:npub_visual_reviewer_sim",
  "reviewer_independent_of_creator": true,
  "decision": "APPROVED",
  "reviewed_distribution_hash": "sha256:SIMULATED_DISTRIBUTION_HASH"
}
```

No `signed_identity_event`. No signature. No signed payload hash. No registry resolution against an authorized-visual-reviewer list — nothing analogous to `identity_on_authorized_approver_list`. `reviewer_identity_ref` is a bare string and `decision: "APPROVED"` is asserted, exactly the shape of the very first gap this whole exchange found four rounds ago in `APPROVAL_GRANTED` and `MISSION_ATTESTED` before they were fixed. This isn't a new category of problem — it's the identical structural hole, reopened in the newest gate, in a system that has now independently rebuilt the fix for this exact bug three times over (approval, attestation, capsule consent).

The consequence is concrete: as written, anything asserting `reviewer_identity_ref: "buzz:npub_visual_reviewer_sim"` and `decision: "APPROVED"` satisfies `human_visual_review`, whether or not a real, independent, authorized human ever looked at the actual thumbnail image or video edit. Given `computed_visual_safe` is the gate that's supposed to catch exactly the class of overclaiming problem we spent this entire surface closing (money imagery, success iconography, unsupported before/after framing), an unauthenticated reviewer field means the *strongest* control in the whole distribution pipeline is the weakest-verified one.

---

## Secondary, same root cause

`declared_motifs` (inside `visual_content`, presumably authored by whoever built the artifact) and `automated_checks` (inside `visual_claim_governance`, presumably computed by the governor) — nothing in the schema states whether `automated_checks` is derived from independent analysis of the actual image/video bytes, or whether it's just the governor reading back the creator's own `declared_motifs` claims. If it's the latter, this is a self-attestation with a fancier name — the same "agent claims, nobody independently checks" bug fixed in round 4's `approval_required`. Every earlier fix in this system paired an inbound claim with an explicit `inbound_claim_matches_computation` / `disagreement_flag` structure. `visual_claim_governance` needs the same: an explicit field showing whether the governor's independent analysis of the actual artifact agrees with the creator's `declared_motifs`, and what happens when they don't (should default to blocked/escalated, the same way a disagreement on `approval_required` defaulted to Mission Control's stricter computed value winning).

---

## What's needed

1. `human_visual_review` needs a real `signed_identity_event` (Schnorr signature over the reviewed `distribution_hash`), plus explicit registry resolution against an authorized-visual-reviewer list, plus a `computed_by` block showing Mission Control (or the governor) independently validated the signature and registry membership — identical shape to every other human-authority gate already frozen in this system.
2. `visual_claim_governance` should make explicit whether `automated_checks` is independently derived or copied from `declared_motifs`, with a disagreement field and a fail-closed default (same discipline as event 4) if the two don't match.

Once both match the pattern already proven correct three times over, re-run. Same binary terms.

— PAULI-PRIME
