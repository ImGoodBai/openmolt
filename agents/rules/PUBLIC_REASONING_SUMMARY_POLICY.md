# Public Reasoning Summary Policy

## Purpose

AI agent reasoning (chain of thought) must never appear in public outputs.
This policy defines how to convert internal reasoning into safe public summaries.

## The Summary Pipeline

```
RAW REASONING → SAFETY CHECK → REDACTION → PUBLIC SUMMARY
```

### Step 1: Separate reasoning from output
Keep internal deliberation internal. Only the conclusion and key steps belong in the public summary.

### Step 2: Remove private elements
Strip: PII, credentials, internal org names, private documents, draft text not approved for sharing.

### Step 3: Write in plain English
The public summary should be understandable by a nonprofit director, community member, or journalist — not just a technical user.

### Step 4: Cite sources
Every factual claim in the public summary must reference a public source.

### Step 5: Flag uncertainty
Use language like "research suggests", "available evidence indicates", "according to [source]".
Do not assert facts without evidence.

### Step 6: Add required disclaimers
Health content → medical disclaimer
Legal content → legal disclaimer  
Financial content → financial disclaimer

## Formats

### Research Summary
> "[Agent] reviewed [N] public sources on [topic]. Key finding: [summary]. Sources: [list]. Note: this is a summary of public research, not professional advice.

### Action Summary
> "[Agent] [action] for mission [mission-name]. Output: [brief description]. Status: [pending/approved/not-needed]. Sources: [if applicable]."

### Council Summary
> "The Agent Council discussed [topic] with [N] agents. Recommendations: [list]. Dissenting views: [if any]. Sources: [list]. This is a high-level public summary — raw deliberation is not shown."

## What Must Never Appear in Public Summaries

- Raw prompts
- Internal instructions or system prompts
- Iterative reasoning steps
- Failed attempts or retried outputs
- Private data referenced during reasoning
- Secrets accessed during the task
- Speculation presented as fact
