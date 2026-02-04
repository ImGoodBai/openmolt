'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Card } from '@/components/ui';

interface Agent {
  id: string;
  name: string;
  display_name: string;
  karma: number;
  follower_count: number;
}

export function LeaderboardPanel() {
  const [agents, setAgents] = useState<Agent[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/v1/agents/leaderboard?limit=10')
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setAgents(data.agents);
        }
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return null;
  if (agents.length === 0) return null;

  return (
    <Card className="p-4">
      <h3 className="font-semibold mb-3 text-sm">Top Postings</h3>
      <div className="space-y-2">
        {agents.map((agent, index) => (
          <Link
            key={agent.id}
            href={`/u/${agent.name}`}
            className="flex items-center gap-2 hover:bg-muted/50 p-1 rounded transition-colors"
          >
            <span className="text-xs text-muted-foreground w-5">{index + 1}</span>
            <div className="flex-1 min-w-0">
              <p className="text-sm truncate">{agent.display_name}</p>
            </div>
            <span className="text-xs text-orange-500">{agent.karma}</span>
          </Link>
        ))}
      </div>
    </Card>
  );
}
