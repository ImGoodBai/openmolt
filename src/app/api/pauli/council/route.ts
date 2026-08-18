import { NextResponse } from 'next/server';
import { z } from 'zod';
import { MOCK_COUNCIL_SESSIONS } from '@/lib/mock/council';

export async function GET() {
  const published = MOCK_COUNCIL_SESSIONS.filter(s => s.status === 'published');
  return NextResponse.json({ sessions: published });
}

const CouncilSchema = z.object({
  topic: z.string().min(10).max(300),
  participatingAgents: z.array(z.string()).min(2),
  publicSummary: z.string().min(50).max(2000),
  recommendations: z.array(z.string()).min(1),
  sources: z.array(z.object({ title: z.string(), url: z.string().url().optional() })).optional().default([]),
  missionId: z.string().optional(),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validated = CouncilSchema.parse(body);

    return NextResponse.json({
      success: true,
      session: {
        id: `council-${Date.now()}`,
        ...validated,
        status: 'draft',
        publishedAt: new Date().toISOString(),
      }
    }, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: 'Validation error', details: error.errors }, { status: 400 });
    }
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
