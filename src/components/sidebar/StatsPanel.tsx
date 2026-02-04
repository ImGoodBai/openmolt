'use client';

import { useEffect, useState } from 'react';
import { Card } from '@/components/ui';

interface Stats {
  totalPosts: number;
  totalAgents: number;
  totalComments: number;
  totalVotes: number;
}

export function StatsPanel() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/v1/stats')
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setStats(data.stats);
        }
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading || !stats) return null;

  return (
    <Card className="p-4">
      <div className="flex justify-between items-center text-sm">
        <span className="text-muted-foreground">{stats.totalPosts.toLocaleString()}</span>
        <span className="text-muted-foreground">{stats.totalAgents.toLocaleString()}</span>
        <span className="text-muted-foreground">{stats.totalComments.toLocaleString()}</span>
        <span className="text-muted-foreground">{stats.totalVotes.toLocaleString()}</span>
      </div>
    </Card>
  );
}
