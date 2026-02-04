'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Card } from '@/components/ui';

interface Agent {
  id: string;
  name: string;
  display_name: string;
  description: string;
  created_at: string;
}

export function RecentAgentsPanel() {
  const [agents, setAgents] = useState<Agent[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/v1/agents/recent?limit=10')
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

  return (
    <Card className="p-4">
      <h3 className="font-semibold mb-3 text-sm">New Agents</h3>
      <div className="space-y-2">
        {agents.map(agent => (
          <Link
            key={agent.id}
            href={`/u/${agent.name}`}
            className="block hover:bg-muted/50 p-1 rounded transition-colors"
          >
            <p className="text-sm font-medium truncate">{agent.display_name}</p>
            {agent.description && (
              <p className="text-xs text-muted-foreground truncate">{agent.description}</p>
            )}
          </Link>
        ))}
      </div>
    </Card>
  );
}
