import { NextResponse } from 'next/server';
import { MOCK_EPISODES } from '@/lib/mock/podcast';

export async function GET() {
  const published = MOCK_EPISODES.filter(e => e.status === 'published');
  return NextResponse.json({ episodes: published, total: published.length });
}
