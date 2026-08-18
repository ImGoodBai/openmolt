import { NextResponse } from 'next/server';
import { MOCK_MISSIONS } from '@/lib/mock/missions';

export async function GET() {
  const publicMissions = MOCK_MISSIONS.filter(m => m.visibility === 'public');
  return NextResponse.json({ missions: publicMissions });
}
