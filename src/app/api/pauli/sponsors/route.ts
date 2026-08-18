import { NextResponse } from 'next/server';
import { z } from 'zod';
import { SPONSOR_TIERS } from '@/lib/mock/sponsorships';
import { createMockCheckoutSession } from '@/lib/payments/mockPaymentProvider';

const SponsorSchema = z.object({
  tierId: z.string().min(1),
  donorName: z.string().min(1).max(100),
  donorEmail: z.string().email(),
});

export async function GET() {
  return NextResponse.json({ tiers: SPONSOR_TIERS });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validated = SponsorSchema.parse(body);

    const tier = SPONSOR_TIERS.find(t => t.id === validated.tierId);
    if (!tier) {
      return NextResponse.json({ error: 'Unknown sponsor tier' }, { status: 404 });
    }

    const session = createMockCheckoutSession({
      amountCents: tier.monthlyPrice * 100,
      sponsorTierId: tier.id,
      donorName: validated.donorName,
      donorEmail: validated.donorEmail,
      isPublic: true,
    });

    return NextResponse.json({
      success: true,
      message: 'Preview mode — no real charge was made. Live subscription billing is not yet enabled.',
      session,
    }, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: 'Validation error', details: error.errors }, { status: 400 });
    }
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
