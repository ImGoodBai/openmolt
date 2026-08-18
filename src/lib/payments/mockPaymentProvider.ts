/**
 * Stub payment provider — THE PAULI EFFECT is in preview mode.
 * No real card data or payment processor credentials touch this code path.
 * Swap this module for a real Stripe Checkout Session call once
 * STRIPE_SECRET_KEY is configured in production and donations are approved
 * for launch (see ops/handoff — Phase 2/3 checklist).
 */

export interface CheckoutSessionRequest {
  amountCents: number
  missionSlug?: string
  sponsorTierId?: string
  donorName: string
  donorEmail: string
  isPublic: boolean
  message?: string
}

export interface CheckoutSessionResult {
  sessionId: string
  status: 'preview_mode'
  amountCents: number
  createdAt: string
}

export function createMockCheckoutSession(req: CheckoutSessionRequest): CheckoutSessionResult {
  return {
    sessionId: `preview_session_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
    status: 'preview_mode',
    amountCents: req.amountCents,
    createdAt: new Date().toISOString(),
  }
}
