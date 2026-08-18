'use client';

import Link from 'next/link';
import type { Mission } from '@/lib/mock/missions';

interface Props {
  missions: Mission[];
}

export function MissionPanel({ missions }: Props) {
  return (
    <div className="space-y-3">
      {missions.map(mission => (
        <Link
          key={mission.slug}
          href={`/missions/${mission.slug}`}
          className="block p-4 rounded-xl border transition-all hover:border-[#333]"
          style={{ background: '#151515', borderColor: '#222' }}
        >
          <div className="flex items-center gap-2 mb-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00d4aa]"></span>
            <span className="text-xs" style={{ color: '#00d4aa' }}>Active</span>
          </div>
          <p className="text-white text-sm font-medium mb-1">{mission.title}</p>
          <p className="text-xs" style={{ color: '#666' }}>{mission.summary.substring(0, 80)}...</p>
        </Link>
      ))}
    </div>
  );
}
