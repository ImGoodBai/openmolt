# BEADS PROTOCOL
## THE PAULI EFFECT Observable Agents Platform

Beads are immutable audit records of every major decision, file change, and deployment action.

## Format

```yaml
id: bead-NNNN
timestamp: ISO8601
actor: builder-agent
phase: explore | scaffold | build | test | deploy
repo: executiveusa/open-molt-social-purpose
branch: claude/pauli-effect-platform-0yhglf
files_changed: []
decision: what was decided
reason: why this decision was made
rollback_command: how to undo
risks: []
next_action: what happens next
human_needed: true | false
```

## Rules

1. Every major file creation or modification writes a Bead.
2. Every deployment step writes a Bead.
3. Every Bead gets a sequential ID.
4. Human-needed flags must be reviewed before production.
5. Beads are never deleted — only superseded.
