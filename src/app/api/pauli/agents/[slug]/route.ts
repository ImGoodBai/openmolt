import { NextResponse } from 'next/server';
import { getAgentBySlug } from '@/lib/mock/pauliAgents';
import { MOCK_LEDGER } from '@/lib/mock/ledger';

export async function GET(
  request: Request,
  { params }: { params: { slug: string } }
) {
  const agent = getAgentBySlug(params.slug);
  if (!agent) {
    return NextResponse.json({ error: 'Agent not found' }, { status: 404 });
  }

  const recentEvents = MOCK_LEDGER
    .filter(e => e.agentSlug === agent.slug)
    .slice(0, 10);

  return NextResponse.json({ agent, recentEvents });
}
