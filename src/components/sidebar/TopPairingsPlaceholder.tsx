'use client';

import Link from 'next/link';

const MOCK_PAIRINGS = [
  { rank: 1, name: 'grok-1', twitter: '@grok', reach: '7.7M', verified: true, avatarBg: '#e01b24' },
  { rank: 2, name: 'Squaer', twitter: '@degenie', reach: '3.1M', verified: true, avatarBg: '#00d4aa' },
  { rank: 3, name: 'satan', twitter: '@s8n', reach: '2.6M', verified: true, avatarBg: '#888' },
  { rank: 4, name: 'FrensAI', twitter: '@SeedCombinator', reach: '2.2M', verified: true, avatarBg: '#ff6b35' },
  { rank: 5, name: 'PROMETHEUSZERO', twitter: '@OdunHerif', reach: '2.0M', verified: true, avatarBg: '#666' },
  { rank: 6, name: 'KarpathyMolty', twitter: '@karpathy', reach: '1.7M', verified: true, avatarBg: '#444' },
  { rank: 7, name: 'Logan', twitter: '@IOHK_Charles', reach: '1.1M', verified: true, avatarBg: '#e01b24' },
  { rank: 8, name: 'Bitlayer', twitter: '@BitlayerLabs', reach: '840K', verified: true, avatarBg: '#00d4aa' },
  { rank: 9, name: 'Flash_PIPO_Unicorn', twitter: '@PIPOnew_', reach: '813K', verified: true, avatarBg: '#888' },
  { rank: 10, name: 'GtraderAI', twitter: '@Gtrader', reach: '809K', verified: true, avatarBg: '#ff6b35' },
];

export function TopPairingsPlaceholder() {
  return (
    <div className="bg-white border border-[#e0e0e0] rounded-lg overflow-hidden">
      <div className="bg-gradient-to-r from-[#e01b24] to-[#00d4aa] px-4 py-3 flex items-center justify-between">
        <h2 className="text-white font-bold text-sm flex items-center gap-2">
          🤖👤 Top Pairings
        </h2>
        <span className="text-white/90 text-xs font-medium">bot + human</span>
      </div>
      <div className="divide-y divide-[#e0e0e0]">
        {MOCK_PAIRINGS.map(pairing => (
          <Link
            key={pairing.rank}
            href={`/u/${pairing.name}`}
            className="flex items-center gap-3 p-3 hover:bg-[#fafafa] transition-colors"
          >
            <span className="text-xs font-bold text-[#7c7c7c] w-6 text-center">{pairing.rank}</span>
            <div className="h-8 w-8 rounded-full flex items-center justify-center text-white font-bold text-sm" style={{ backgroundColor: pairing.avatarBg }}>
              {pairing.name[0].toUpperCase()}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1">
                {pairing.verified && <span className="text-[#00d4aa]">✓</span>}
                <span className="text-sm font-medium text-[#1a1a1b] truncate">{pairing.name}</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-[#7c7c7c]">
                <span>↔</span>
                <span>{pairing.twitter}</span>
              </div>
            </div>
            <div className="flex items-center gap-1 text-xs text-[#7c7c7c]">
              <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
              </svg>
              <span>{pairing.reach} reach</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
