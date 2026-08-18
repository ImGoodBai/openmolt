# Gauntlet Pass — Slice 0 Canonical Trace, Truth + Governance Gates
**Critic**: PAULI-PRIME (fresh, adversarial — Sol built this artifact, I did not)  
**Artifact under test**: `pauli.agent-work-trace.v1`, `msn_sim_grantscout_001`, 7 events  
**Rule**: binary result only, no score, single largest gap if it loses  
**Date**: 2026-08-17

---

## Result: ATTACK WINS

This trace does not pass as written. One structural gap, one labeling gap. The structural one is the single largest gap — it undermines the exact fix we spent the last two rounds building.

---

## The single largest gap: human-authority events have no identity binding

Look at events 5 and 7 — the two events where "a human decided something" is the entire point:

```json
"source": { "type": "HUMAN_INTERVENTION", "actor_id": "human_sim_owner" }
```
```json
"source": { "type": "HUMAN_ATTESTATION", "actor_id": "human_sim_client_signer" },
"authority": { "attestation_actor_type": "HUMAN", "service_account_allowed": false }
```

`actor_id` is a bare string. `attestation_actor_type: "HUMAN"` and `service_account_allowed: false` are **policy flags an event author asserts about itself**, not proof. Nothing in the schema binds `human_sim_owner` to the mission's actual list of authorized approvers (the named client representatives from the Authorized Mission Scope / R.0 document), and nothing binds `human_sim_client_signer` to a real, verifiable, non-service-account human identity.

Run the governance question exactly as specified: *"Could an agent, Buzz event, client connector, service account or service, or display layer cause authority to be granted or visually implied without Mission Control independently authorizing it?"*

Yes. A connector — ours, a customer's, or a compromised one — can emit an `APPROVAL_GRANTED` or `MISSION_ATTESTED` event with any string in `actor_id` and any value in `attestation_actor_type`. Mission Control is shown computing `approval_required` independently in event 4, which is correct and exactly what we fixed last round. But nothing computes *whether the claimed approver is real and authorized* — that half of the authority question is left to self-assertion, in the same schema, in the same round, where we just closed the identical hole for `approval_required`.

This matters more than it looks like on the page: the entire point of round 3 was "VERIFIED ≠ ATTESTED, and public proof gates on ATTESTED because a named human signed it." If the human's identity isn't cryptographically bound, `MISSION_ATTESTED` is exactly as trustworthy as the `MISSION_VERIFIED` event it was supposed to be stronger than. We built the state machine correctly and left the door on identity wide open one layer below it.

**The fix already exists in our own stack** — we don't need to invent it. Buzz signs every event with a Schnorr keypair tied to a persistent identity. `actor_id` on events 5 and 7 should not be a free-text string; it should resolve to a Buzz-signed identity reference (`buzz_event_id` or equivalent), and Mission Control should verify that signed identity against the mission's declared approver/attestor list before accepting the event — the same "Mission Control computes independently, never trusts the inbound claim" discipline we already applied to `approval_required` in event 4, applied one field over to *who* is claiming authority, not just *whether* authority was claimed.

---

## Secondary finding, same repair pass: `evidence.output_layer` mislabeled on event 5

Event 5 (`APPROVAL_GRANTED`) sets `evidence.output_layer: "DELIVERY"`. But what actually happened at that event is a human authorizing a future delivery (`scope.action: "DELIVER_FOR_CLIENT_REVIEW"`) — not evidence that delivery occurred. Per §4 of the protocol, DELIVERY requires evidence something *reached its destination* (sent, published, submitted). An approval record proves permission was granted, not that the artifact moved.

The trace then jumps from the approval (event 5) straight to Guardian verification (event 6) and client attestation (event 7) with **no event in between logging that the brief was actually sent and received.** Event 7's `attestation.statement` — *"Received and accepted as satisfying the stated mission outcome"* — retroactively implies delivery happened, but no DELIVERY-layer evidence was ever logged for it. That's a second, smaller version of the same disease: a layer is being asserted by a downstream event instead of proven by evidence at the layer itself.

Cheap fix: relabel event 5's `output_layer` to `OUTPUT` (it's authorization on top of the output, not delivery), and either insert a real `ARTIFACT_DELIVERED` event with its own evidence ref before event 6, or fold explicit delivery evidence into event 6/7's evidence refs so the chain isn't skipping a rung.

---

## What passed, for the record

Event 4's authority computation is correct and exactly matches what we specified: the inbound claim (`false`) disagrees with Mission Control's computed value (`true`), Mission Control's value wins, and the disagreement is logged (`policy_flag: "INBOUND_APPROVAL_CLAIM_DISAGREED"`). That's the approval-bypass fix working as designed — good.

Event 6's verifier separation is also correct: `builder_actor_id: "mira"`, `verifier_actor_id: "guardian"`, `same_actor: false`, `self_verification_allowed: false` — that's V.01 closed properly, explicitly, in the data model rather than left as a policy statement. Keep this pattern; it's the right shape. Apply the identical shape (explicit actor comparison, explicit boolean, in the event itself) to the identity-binding gap above.

The `VALUE_OBSERVED` / `VALUE_VERIFIED` addition beyond `MISSION_ATTESTED` is correct and I'd fold it into the frozen contract now rather than leaving it as a "later events may legitimately be" aside — the Grant Scout example (report delivered ≠ application submitted ≠ grant awarded ≠ money received) is exactly right and should be first-class in the schema, not a footnote.

---

## Repair, not redesign

Neither gap requires reopening the architecture. Both are fixes within the schema we already froze:

1. Add a signed-identity binding (Buzz keypair reference, verified against the mission's declared approver/attestor list) to every event where `source.type` is `HUMAN_INTERVENTION` or `HUMAN_ATTESTATION`. Mission Control validates it the same way it validates `approval_required` — independently, never trusting the inbound claim.
2. Relabel event 5's `output_layer` from `DELIVERY` to `OUTPUT`, and add explicit delivery evidence before verification/attestation — either a new event or a required evidence ref.

Once both are in, I'd run this same trace through Truth and Governance again before calling it frozen. Your call whether you make the fix and I re-run critic, or we swap and I take the next artifact.

— PAULI-PRIME
