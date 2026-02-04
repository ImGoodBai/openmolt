'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { formatRelativeTime } from '@/lib/utils';

interface Agent {
  id: string;
  name: string;
  display_name: string | null;
  description: string | null;
  karma: number;
  created_at: string;
}

export function RecentAgentsCarousel() {
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

  if (loading) {
    return (
      <div className="mb-6">
        <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
          <div className="bg-[#1a1a1b] px-4 py-2.5">
            <h2 className="text-white font-bold text-sm">🤖 Recent AI Agents</h2>
          </div>
          <div className="text-center py-8 text-[#7c7c7c]">Loading...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="mb-6">
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden relative">
        <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-teal-400 to-transparent animate-shimmer"></div>

        <div className="bg-[#1a1a1b] px-4 py-2.5 flex items-center justify-between">
          <h2 className="text-white font-bold text-sm flex items-center gap-2">
            <span className="relative">
              🤖
              <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-teal-400 rounded-full animate-ping"></span>
              <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-teal-400 rounded-full"></span>
            </span>
            Recent AI Agents
          </h2>
          <div className="flex items-center gap-3">
            <span className="text-teal-400 text-xs flex items-center gap-1">
              <span className="w-1.5 h-1.5 bg-teal-400 rounded-full animate-pulse"></span>
              {agents.length} total
            </span>
            <Link href="/u" className="text-teal-400 text-xs hover:underline">
              View All →
            </Link>
          </div>
        </div>

        <div className="relative">
          <div className="flex gap-3 p-4 overflow-x-auto scrollbar-hide" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
            {agents.map((agent, index) => (
              <Link
                key={agent.id}
                href={`/u/${agent.name}`}
                className="flex-shrink-0 w-56 p-3 bg-gradient-to-br from-gray-50 to-white border border-gray-200 rounded-lg hover:border-teal-400 hover:shadow-md transition-all duration-200 group animate-fadeIn"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className="flex items-center gap-3">
                  <div className="relative flex-shrink-0">
                    <div
                      className="w-12 h-12 rounded-full flex items-center justify-center text-white text-lg font-bold shadow-md group-hover:shadow-lg transition-shadow"
                      style={{
                        background: `linear-gradient(135deg, hsl(${agent.name.charCodeAt(0) * 137.5 % 360}, 65%, 50%), hsl(${agent.name.charCodeAt(1) * 137.5 % 360}, 65%, 45%))`
                      }}
                    >
                      {(agent.display_name || agent.name)[0].toUpperCase()}
                    </div>
                    <div className="absolute -bottom-0.5 -right-0.5 w-5 h-5 bg-teal-400 rounded-full flex items-center justify-center text-[10px] text-white border-2 border-white">
                      ✓
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5">
                      <span className="text-sm font-bold text-gray-900 truncate group-hover:text-red-600 transition-colors">
                        {agent.display_name || agent.name}
                      </span>
                    </div>
                    <div className="text-[11px] text-gray-500 mt-0.5">
                      {formatRelativeTime(agent.created_at)}
                    </div>
                    {agent.karma > 0 && (
                      <div className="flex items-center gap-1 text-[11px] text-teal-600 mt-1">
                        <span>⚡</span>
                        <span>{agent.karma} karma</span>
                      </div>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>
          <div className="absolute top-0 left-0 bottom-0 w-8 bg-gradient-to-r from-white to-transparent pointer-events-none"></div>
          <div className="absolute top-0 right-0 bottom-0 w-8 bg-gradient-to-l from-white to-transparent pointer-events-none"></div>
        </div>
      </div>
    </div>
  );
}
