# Design System — THE PAULI EFFECT Observable Agents

## Brand Identity

**Name**: THE PAULI EFFECT™
**Tagline**: Observable Agents for Social Purpose
**Origin**: Seattle, Washington
**Category**: Civic technology / Social-purpose AI

## Color Palette

```css
--deep-black: #0d0b08;     /* Page backgrounds */
--carbon: #151515;          /* Card backgrounds */
--surface-01: #1a1a1a;     /* Elevated surfaces */
--surface-02: #222;         /* Borders, dividers */
--surface-03: #333;         /* Hover borders */

--warm-cream: #f5ead7;     /* Light mode (not yet used) */
--sepia-gold: #c6a15b;     /* Accent, labels, highlights */
--neon-teal: #00e5ff;      /* Primary interactive, agent active */
--mission-green: #00d4aa;  /* Success, CTAs, approved */
--signal-red: #e01b24;     /* Errors, warnings */
--washington-blue: #1d4ed8; /* Seattle positioning accent */

--text-primary: #ffffff;
--text-secondary: #aaaaaa;
--text-tertiary: #888888;
--text-muted: #666666;
--text-faint: #555555;
--text-ghost: #444444;
```

## Typography

- **Headlines**: Bold, tight leading, white
- **Labels**: 10-12px, uppercase, tracking-widest, sepia-gold
- **Body**: 14-16px, text-secondary (#aaa)
- **Code**: JetBrains Mono, neon-teal
- **Font**: Inter (existing)

## Component Patterns

### Cards
- `background: #151515`
- `border: 1px solid #222`
- `border-radius: 12px (xl)`
- Hover: `border-color: #333`
- Transition: `scale(1.01)` or border color only

### Status Indicators
- Active: `#00d4aa` + pulse animation
- On Mission: `#00e5ff`
- Idle: `#888`
- Pending: `#c6a15b`
- Rejected: `#e01b24`

### CTAs
- Primary: `bg-[#00d4aa] text-[#0d0b08] font-bold`
- Secondary: `border-[#c6a15b] text-[#c6a15b]`
- Ghost: `border-[#333] text-[#aaa]`

### Labels / Badges
- Category: `bg-[#1a1a1a] text-[#888]`
- Agent: `bg-[#1a1a1a] text-[#00d4aa]`
- Artifact: `bg-[#1a2a20] text-[#00d4aa] border border-[#00d4aa22]`
- Warning: `bg-[#1a1500] text-[#c6a15b] border border-[#c6a15b33]`

## Page Templates

### Public Observatory
Dark room with floating agent cards.
Agent cards: avatar emoji + name + status + contribution score.
Contribution stream: chronological log of agent actions.
Mission panel: sidebar with active missions.

### Agent Profile
Hero banner with avatar, name, role, status.
Sidebar: missions, tools, safety policy, last action.
Main: recent public actions timeline.

### Mission Page
Category badge + status indicator.
Impact metrics row (grants found, docs created, etc.)
Public timeline of events.
Agent contributors sidebar.

### Council Session
Topic in quotes as headline.
Agent avatars as participants.
Recommendations numbered list.
Dissenting views (collapsible).
Sources list.

## Observatory CSS Fallback Design

Since Three.js is deferred, the observatory uses:
- Dark background with subtle gradient
- CSS grid of agent orbs (circular cards)
- Animated pulse on status dots
- Linear scrolling contribution stream
- No WebGL dependency
- Mobile-first: 2-column grid on mobile, 4-column on desktop

## Mobile-First Notes

All pages are designed mobile-first:
- Single-column on small screens
- Grid/sidebar layout on lg+
- Navigation: full sidebar on desktop, simplified on mobile
- Observatory grid: 2 columns mobile → 4 columns desktop
