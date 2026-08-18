/**
 * Medical research safety policy for public-facing agent outputs.
 * Agents may summarize public biomedical research.
 * Agents must NEVER provide diagnosis, treatment, or drug recommendations.
 */

export const MEDICAL_DISCLAIMER = `This is a summary of publicly available research for educational purposes only.
It is not medical advice and should not be used to make health decisions.
Always consult a qualified healthcare provider for personal health questions.`

export const FORBIDDEN_MEDICAL_PHRASES = [
  'you should take',
  'recommended dose',
  'treat your',
  'cure for',
  'diagnoses',
  'you have',
  'symptoms indicate',
  'this drug',
  'take mg of',
  'prescription required',
]

export function validateMedicalContent(text: string): { safe: boolean; violations: string[] } {
  const violations: string[] = []

  for (const phrase of FORBIDDEN_MEDICAL_PHRASES) {
    if (text.toLowerCase().includes(phrase.toLowerCase())) {
      violations.push(`Forbidden phrase detected: "${phrase}"`)
    }
  }

  return { safe: violations.length === 0, violations }
}

export function addMedicalDisclaimer(content: string): string {
  return `${content}\n\n---\n${MEDICAL_DISCLAIMER}`
}

export const ALLOWED_HEALTH_SOURCES = [
  'pubmed.ncbi.nlm.nih.gov',
  'who.int',
  'cdc.gov',
  'nih.gov',
  'samhsa.gov',
  'healthdata.gov',
]

export function isAllowedHealthSource(url: string): boolean {
  return ALLOWED_HEALTH_SOURCES.some(domain => url.includes(domain))
}
