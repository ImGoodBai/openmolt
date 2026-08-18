import { NextResponse } from 'next/server';
import { z } from 'zod';
import { MOCK_DONATIONS, MOCK_MISSION_FUNDING } from '@/lib/mock/sponsorships';
import { MOCK_MISSIONS } from '@/lib/mock/missions';
import { createMockCheckoutSession } from '@/lib/payments/mockPaymentProvider';

const DonationSchema = z.object({
  amountCents: z.number().int().min(100).max(100000000),
  missionSlug: z.string().min(1),
  donorName: z.string().min(1).max(100),
  donorEmail: z.string().email(),
  isPublic: z.boolean(),
  message: z.string().max(500).optional(),
});

export async function GET() {
  const publicDonations = MOCK_DONATIONS.filter(d => d.isPublic);
  return NextResponse.json({ donations: publicDonations, funding: MOCK_MISSION_FUNDING });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validated = DonationSchema.parse(body);

    if (!MOCK_MISSIONS.some(m => m.slug === validated.missionSlug)) {
      return NextResponse.json({ error: 'Unknown mission' }, { status: 404 });
    }

    const session = createMockCheckoutSession({
      amountCents: validated.amountCents,
      missionSlug: validated.missionSlug,
      donorName: validated.donorName,
      donorEmail: validated.donorEmail,
      isPublic: validated.isPublic,
      message: validated.message,
    });

    return NextResponse.json({
      success: true,
      message: 'Preview mode — no real charge was made. Live donation processing is not yet enabled.',
      session,
    }, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: 'Validation error', details: error.errors }, { status: 400 });
    }
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
