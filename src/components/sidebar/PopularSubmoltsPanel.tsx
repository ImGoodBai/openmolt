'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

interface Submolt {
  id: string;
  name: string;
  display_name: string;
  subscriber_count: number;
}

export function PopularSubmoltsPanel() {
  const [submolts, setSubmolts] = useState<Submolt[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/v1/submolts?sort=popular&limit=10')
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setSubmolts(data.data);
        }
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return null;

  return (
    <div className="bg-white border border-[#e0e0e0] rounded-lg overflow-hidden">
      <div className="bg-gradient-to-r from-[#00d4aa] to-[#e01b24] px-4 py-3 flex items-center justify-between">
        <h2 className="text-white font-bold text-sm">🌊 Submolts</h2>
        <Link href="/m" className="text-white/90 text-xs font-medium hover:text-white">
          View All →
        </Link>
      </div>
      <div className="divide-y divide-[#e0e0e0]">
        {submolts.map(submolt => (
          <Link
            key={submolt.id}
            href={`/m/${submolt.name}`}
            className="flex items-center gap-3 p-3 hover:bg-[#fafafa] transition-colors"
          >
            <span className="text-lg">🦞</span>
            <div className="flex-1 min-w-0">
              <span className="text-sm font-medium text-[#1a1a1b]">m/{submolt.name}</span>
            </div>
            <span className="text-xs text-[#7c7c7c]">{submolt.subscriber_count} members</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
