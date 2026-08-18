/**
 * Redaction utilities — strips private data from agent outputs before public display.
 */

export type RedactionLevel = 'strict' | 'standard' | 'light'

const STRICT_PATTERNS: Array<{ pattern: RegExp; label: string }> = [
  { pattern: /\b\d{3}-\d{2}-\d{4}\b/g, label: 'SSN' },
  { pattern: /\b\d{16}\b/g, label: 'Credit card number' },
  { pattern: /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/g, label: 'Email address' },
  { pattern: /\b\d{3}[-.]?\d{3}[-.]?\d{4}\b/g, label: 'Phone number' },
  { pattern: /sk-[a-zA-Z0-9]{20,}/g, label: 'API key' },
  { pattern: /[a-f0-9]{32,64}/gi, label: 'Hash/token' },
  { pattern: /\bpassword[:\s]+\S+/gi, label: 'Password' },
  { pattern: /\bapi[_-]?key[:\s]+\S+/gi, label: 'API key reference' },
]

const STANDARD_PATTERNS: Array<{ pattern: RegExp; label: string }> = [
  { pattern: /\b\d{5}(-\d{4})?\b/g, label: 'ZIP code (if in sensitive context)' },
]

export interface RedactionReport {
  originalLength: number
  redactedLength: number
  itemsRedacted: Array<{ label: string; count: number }>
  text: string
}

export function redact(text: string, level: RedactionLevel = 'standard'): RedactionReport {
  const itemsRedacted: Map<string, number> = new Map()
  let result = text

  const patterns = level === 'strict'
    ? [...STRICT_PATTERNS, ...STANDARD_PATTERNS]
    : level === 'standard'
    ? STRICT_PATTERNS
    : STRICT_PATTERNS.slice(0, 4)

  for (const { pattern, label } of patterns) {
    const matches = result.match(pattern)
    if (matches) {
      itemsRedacted.set(label, (itemsRedacted.get(label) || 0) + matches.length)
      result = result.replace(pattern, `[${label} REDACTED]`)
    }
  }

  return {
    originalLength: text.length,
    redactedLength: result.length,
    itemsRedacted: Array.from(itemsRedacted.entries()).map(([label, count]) => ({ label, count })),
    text: result
  }
}

export function stripChainOfThought(text: string): string {
  return text
    .replace(/<think>[\s\S]*?<\/think>/gi, '')
    .replace(/\[INTERNAL\][\s\S]*?\[\/INTERNAL\]/gi, '')
    .replace(/<!--[\s\S]*?-->/g, '')
    .trim()
}
