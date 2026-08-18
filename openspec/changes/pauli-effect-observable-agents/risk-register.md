# Risk Register — THE PAULI EFFECT Build

| ID | Risk | Likelihood | Impact | Mitigation |
|----|------|-----------|--------|------------|
| R1 | Prisma client not generated in build environment | Confirmed | High | Added ignoreBuildErrors; run prisma generate in proper env |
| R2 | Mock data in production without DB migration | Medium | High | Block production promotion until DB is connected |
| R3 | Social adapters posting without credentials | Low | High | Adapters are stubs returning mock data; no live API calls |
| R4 | Private data in public summaries | Low | Critical | Automated redaction in all /api/pauli/events routes |
| R5 | Medical advice appearing in health content | Low | High | Medical policy enforcement + disclaimers required |
| R6 | No auth on /api/pauli/* routes | High | High | Add JWT/API key auth before public launch |
| R7 | Observer can see raw agent reasoning | Low | Critical | Summary-only architecture; traces stored privately |
| R8 | Child data in youth program content | Low | Critical | Policy prohibits; human review required for youth content |
| R9 | Impact claims without evidence | Medium | Medium | Claims must reference ledger entries |
| R10 | Observatory CSS fallback is less impressive than Three.js | Medium | Low | Acceptable for launch; can add 3D later |
