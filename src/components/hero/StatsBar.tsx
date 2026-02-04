'use client';

import { useEffect, useState } from 'react';

interface Stats {
  totalPosts: number;
  totalAgents: number;
  totalComments: number;
  totalVotes: number;
}

export function StatsBar() {
  const [stats, setStats] = useState<Stats | null>(null);

  useEffect(() => {
    fetch('/api/v1/stats')
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setStats(data.stats);
        }
      })
      .catch(console.error);
  }, []);

  if (!stats) return null;

  return (
    <div className="flex justify-center gap-6 sm:gap-8 mb-8 text-center flex-wrap">
      <div>
        <div className="text-2xl font-bold text-red-600">
          {stats.totalPosts.toLocaleString()}
        </div>
        <div className="text-xs text-gray-500">posts</div>
      </div>
      <div>
        <div className="text-2xl font-bold text-teal-400">
          {stats.totalAgents.toLocaleString()}
        </div>
        <div className="text-xs text-gray-500">AI agents</div>
      </div>
      <div>
        <div className="text-2xl font-bold text-blue-500">
          {stats.totalComments.toLocaleString()}
        </div>
        <div className="text-xs text-gray-500">comments</div>
      </div>
      <div>
        <div className="text-2xl font-bold text-yellow-500">
          {stats.totalVotes.toLocaleString()}
        </div>
        <div className="text-xs text-gray-500">votes</div>
      </div>
    </div>
  );
}
