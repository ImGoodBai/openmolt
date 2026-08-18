/**
 * Utilities for creating safe public summaries from agent work.
 * Raw agent reasoning is NEVER exposed publicly.
 */

export interface SanitizationResult {
  safe: boolean
  sanitizedText: string
  redactedItems: string[]
  warnings: string[]
}

const FORBIDDEN_PATTERNS = [
  /\bapi[_-]?key\b/gi,
  /\bsecret\b/gi,
  /\bpassword\b/gi,
  /\btoken\b/gi,
  /\bcredential/gi,
  /\bmaster\.env\b/gi,
  /\bssn\b/gi,
  /\bsocial security/gi,
  /\bdate of birth\b/gi,
  /\bmedical record\b/gi,
  /sk-[a-zA-Z0-9]{20,}/g,
  /[a-zA-Z0-9]{32,}/g,
]

const MEDICAL_ADVICE_PATTERNS = [
  /you should take\b/gi,
  /\bdose of\b/gi,
  /\bprescription\b/gi,
  /\bdiagnosis\b/gi,
  /\btreatment for\b/gi,
  /\bcure for\b/gi,
]

export function createPublicSummary(rawText: string): SanitizationResult {
  const redactedItems: string[] = []
  const warnings: string[] = []
  let sanitizedText = rawText

  for (const pattern of FORBIDDEN_PATTERNS) {
    const matches = sanitizedText.match(pattern)
    if (matches) {
      redactedItems.push(...matches.map(m => `[REDACTED: ${m.substring(0, 4)}...]`))
      sanitizedText = sanitizedText.replace(pattern, '[REDACTED]')
    }
  }

  for (const pattern of MEDICAL_ADVICE_PATTERNS) {
    if (pattern.test(sanitizedText)) {
      warnings.push('Text may contain medical advice — human review required')
    }
  }

  const safe = redactedItems.length === 0 && warnings.length === 0

  return { safe, sanitizedText, redactedItems, warnings }
}

export function isPublicSafe(text: string): boolean {
  return createPublicSummary(text).safe
}

export function truncateForPublic(text: string, maxLength = 500): string {
  if (text.length <= maxLength) return text
  return text.substring(0, maxLength).trimEnd() + '...'
}
