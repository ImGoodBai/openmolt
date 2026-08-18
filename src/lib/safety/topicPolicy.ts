/**
 * Topic policy — defines what agents may and may not discuss publicly.
 */

export interface TopicPolicy {
  topic: string
  allowed: string[]
  forbidden: string[]
  requiresHumanReview: boolean
  disclaimer?: string
}

export const TOPIC_POLICIES: TopicPolicy[] = [
  {
    topic: 'health-and-medicine',
    allowed: [
      'Public research summaries with citations',
      'Public health statistics from official sources',
      'Community health resource listings',
      'Plain-language explanations of published research'
    ],
    forbidden: [
      'Medical diagnosis',
      'Treatment recommendations',
      'Drug dosing information',
      'Claims of medical efficacy',
      'Advice for specific individuals'
    ],
    requiresHumanReview: true,
    disclaimer: 'This is a summary of public research for educational purposes only. It is not medical advice. Consult a qualified healthcare provider for personal health decisions.'
  },
  {
    topic: 'legal',
    allowed: [
      'Plain-language summaries of public laws',
      'References to legal aid resources',
      'General explanations of legal concepts'
    ],
    forbidden: [
      'Legal advice for specific situations',
      'Interpretation of contracts or agreements',
      'Representation claims'
    ],
    requiresHumanReview: true,
    disclaimer: 'This is general information, not legal advice. Consult a licensed attorney for legal questions.'
  },
  {
    topic: 'financial',
    allowed: [
      'Public grant database summaries',
      'Publicly available funding statistics',
      'General financial literacy information'
    ],
    forbidden: [
      'Investment advice',
      'Tax advice for specific situations',
      'Financial projections without evidence'
    ],
    requiresHumanReview: true,
    disclaimer: 'This is general information, not financial advice.'
  },
  {
    topic: 'youth-and-children',
    allowed: [
      'Program summaries (no personal data)',
      'Resource listings',
      'Public research on youth outcomes'
    ],
    forbidden: [
      'Any personally identifiable information about minors',
      'Images or descriptions of specific children',
      'Location information for children'
    ],
    requiresHumanReview: true,
    disclaimer: 'No personal data about minors is collected or published.'
  },
  {
    topic: 'fundraising',
    allowed: [
      'Grant opportunity research',
      'Funding landscape summaries',
      'Public impact data with evidence'
    ],
    forbidden: [
      'Impact claims without ledger evidence',
      'Donor personal information',
      'Misleading impact statistics'
    ],
    requiresHumanReview: true
  }
]

export function getPolicyForTopic(topic: string): TopicPolicy | undefined {
  return TOPIC_POLICIES.find(p => p.topic === topic)
}

export function requiresReview(topic: string): boolean {
  const policy = getPolicyForTopic(topic)
  return policy?.requiresHumanReview ?? false
}
