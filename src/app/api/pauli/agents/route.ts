import { NextResponse } from 'next/server';
import { PAULI_AGENTS } from '@/lib/mock/pauliAgents';

export async function GET() {
  return NextResponse.json({
    agents: PAULI_AGENTS.map(a => ({
      slug: a.slug,
      name: a.name,
      role: a.role,
      tagline: a.tagline,
      avatarEmoji: a.avatarEmoji,
      status: a.status,
      contributionScore: a.contributionScore,
      currentMissions: a.currentMissions,
      safetyLevel: a.safetyLevel,
      lastPublicAction: a.lastPublicAction,
    }))
  });
}
