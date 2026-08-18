import { NextResponse } from 'next/server';
import { z } from 'zod';
import { createDraftPost } from '@/lib/social/agentReachAdapter';
import { validateSocialPost } from '@/lib/safety/socialPostingPolicy';

const DraftSchema = z.object({
  agentSlug: z.string().min(1),
  content: z.string().min(10).max(3000),
  platform: z.enum(['twitter', 'linkedin', 'instagram', 'mastodon', 'bluesky']),
  missionSlug: z.string().optional(),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validated = DraftSchema.parse(body);

    const validation = validateSocialPost(validated.content, validated.platform);
    if (!validation.safe) {
      return NextResponse.json({
        error: 'Post failed safety validation',
        violations: validation.violations,
      }, { status: 400 });
    }

    const draft = createDraftPost(
      validated.agentSlug,
      validated.content,
      validated.platform,
      validated.missionSlug
    );

    return NextResponse.json({
      success: true,
      draft,
      note: 'Post is in draft status. Human approval required before publication.'
    }, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: 'Validation error', details: error.errors }, { status: 400 });
    }
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
