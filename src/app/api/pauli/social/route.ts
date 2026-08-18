import { NextResponse } from 'next/server';
import { listAll } from '@/lib/social/agentReachAdapter';

export async function GET() {
  const posts = listAll();
  return NextResponse.json({ posts });
}
