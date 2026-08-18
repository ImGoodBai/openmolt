# Gauntlet Pass — Utility + Observability, Methodology Review (Pre-Render)
**Critic**: PAULI-PRIME  
**Artifact under test**: benchmark protocol and mockups, not a rendered artifact  
**Date**: 2026-08-17  
**Status**: Not a Truth/Governance-style binary verdict — no render exists yet. This is a methodology objection, raised before build effort is spent, same discipline as declining round 5's incomplete artifact.

---

## The five-question protocol, the frozen-trace control, and the mid-mission entry point are all correct

Starting the stranger's observation at `APPROVAL_REQUIRED` rather than `MISSION_STARTED` is the right call — "what happened while I was gone, what's happening now, what needs me" is the actual comprehension problem this product has to solve, and it's harder and more honest than watching a mission unfold from zero. Confidence calibration as an explicit measured metric, not just accuracy, is exactly right — "a prettier interface that makes people confidently wrong loses" is the correct standard and I'd hold you to it. "Location is compression" as the design law for whether a building deserves to exist is a strong, testable principle and I have no objection to it. All of that stands as designed.

---

## The methodology defect: Control A isn't the bar we already named

Round 1 named the reference for exactly this gate: *"Real work observability | AgentMomo | ability to understand tool calls, activity, idle state and handoffs immediately."* Round 6, proposing this exact next surface, referenced "benchmarked against AgentMomo specifically," and that framing went unchallenged.

What's been proposed now instead is a self-authored ASCII mockup — *"I would make the benchmark intentionally competent, not ugly... this should resemble a strong contemporary agent operations product."* That's not the same thing as using the actual named product. Gauntlet-loop's own core rule, the one this entire exercise is built on: *"A bar makes it compare against something that already exists and is undeniably good... Named. Fetchable. Comparable. If the agent cannot get the reference, it hallucinates the comparison and approves everything."*

Here's the concrete failure mode: **the same party building Control B (Pauli's Place, the thing meant to win) is also authoring Control A (the dashboard, the thing meant to lose).** Even with real good faith — and I don't doubt the good faith — an invented "competent" strawman built by someone who's spent five rounds designing the spatial alternative cannot be trusted not to be shaped, even unconsciously, toward the outcome you're trying to prove. This is the identical failure mode gauntlet-loop names for a *critic* who invents the comparison, recursed one level: here the *builder* is inventing both sides of it.

**Fix**: Control A should be built from the actual AgentMomo interface — real screenshots, real information architecture, faithfully reproduced with the same Slice 0 event data substituted in — not a fresh mockup competing against your own design intuition about what "competent" looks like. If AgentMomo's actual UI can't be accessed or faithfully reproduced, the fallback should be a *different* independent party building Control A (ideally one without a stake in Pauli's Place winning), not the same builder authoring both arms.

---

## Second, related gap: what evidence actually reaches the Gauntlet verdict

The five-question stranger protocol is well-designed, but it's not specified who runs it, on how many real people, or — critically — whether **actual test results** are what gets submitted to me for judgment, versus just the two renders themselves with an expectation that I estimate how a stranger would likely respond. If it's the latter, I'd be doing exactly what the skill warns against: inventing the comparison myself, based on my own read of two polished mockups, rather than judging real evidence. Given neither of us can blind ourselves to which artifact is the 3D world and which is the dashboard — that kind of blinding isn't achievable here by the nature of the medium — the actual stranger test data is what has to do the evidentiary work the blind-comparison mechanism normally does in this skill. Without it, "OURS WINS" or "ATTACK WINS" from me would be a guess dressed as a verdict.

**What I need before running Utility + Observability**: either real results from real strangers run through the five-question protocol against both controls, with the raw wrong-inference and comprehension-time numbers — or, if that's not practical before the first pass, an explicit acknowledgment that my verdict at that stage is provisional pending real user data, not a final freeze.

---

## What I'm not objecting to

Everything else — the frozen trace as the shared substrate, the mid-mission entry point, the retention mechanic (notification deep-links directly to Pauli, not a homepage), the metrics chosen, the binary win condition (faster + equal-or-better accuracy + fewer clicks + no increased false inference). Build against that. Just build Control A honestly, and bring real test data, not two renders and a guess.

— PAULI-PRIME
