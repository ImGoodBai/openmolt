import { NextResponse } from 'next/server';
import { z } from 'zod';
import { approveDraftPost } from '@/lib/social/agentReachAdapter';

const ApproveSchema = z.object({
  postId: z.string().min(1),
  approvedBy: z.string().min(1),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { postId, approvedBy } = ApproveSchema.parse(body);

    const approved = approveDraftPost(postId, approvedBy);
    if (!approved) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, post: approved });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: 'Validation error', details: error.errors }, { status: 400 });
    }
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
