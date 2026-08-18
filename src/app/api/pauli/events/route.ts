import { NextResponse } from 'next/server';
import { z } from 'zod';
import { createPublicSummary } from '@/lib/safety/publicSummary';

const EventSchema = z.object({
  missionSlug: z.string().min(1),
  agentSlug: z.string().min(1),
  actionType: z.enum(['research', 'draft', 'publish', 'fundraise', 'podcast', 'social', 'council', 'approval']),
  publicSummary: z.string().min(10).max(1000),
  sources: z.array(z.object({
    title: z.string(),
    url: z.string().url().optional(),
    sourceType: z.string(),
    summary: z.string().optional(),
  })).optional().default([]),
  impactTags: z.array(z.string()).optional().default([]),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validated = EventSchema.parse(body);

    const sanitized = createPublicSummary(validated.publicSummary);
    if (!sanitized.safe) {
      return NextResponse.json({
        error: 'Public summary failed safety check',
        redactedItems: sanitized.redactedItems,
        warnings: sanitized.warnings,
      }, { status: 400 });
    }

    return NextResponse.json({
      success: true,
      event: {
        id: `evt-${Date.now()}`,
        ...validated,
        publicSummary: sanitized.sanitizedText,
        visibility: 'public',
        humanApprovalStatus: 'not_needed',
        createdAt: new Date().toISOString(),
      }
    }, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: 'Validation error', details: error.errors }, { status: 400 });
    }
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
