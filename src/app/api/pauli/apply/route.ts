import { NextResponse } from 'next/server';
import { z } from 'zod';

const ApplySchema = z.object({
  name: z.string().min(2).max(100),
  organization: z.string().min(2).max(200),
  city: z.string().min(2).max(100),
  mission: z.string().min(20).max(1000),
  type: z.string().min(2).max(50),
  website: z.string().url().optional().or(z.literal('')),
  email: z.string().email(),
  helpWith: z.string().min(20).max(2000),
  consent: z.boolean().refine(v => v === true, 'Consent is required'),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validated = ApplySchema.parse(body);

    return NextResponse.json({
      success: true,
      message: 'Beta application received. We will be in touch within 1-2 weeks.',
      applicationId: `app-${Date.now()}`,
    }, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: 'Validation error', details: error.errors }, { status: 400 });
    }
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
