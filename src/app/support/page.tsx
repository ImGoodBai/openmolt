'use client';

import { useState } from 'react';
import Link from 'next/link';
import { SPONSOR_TIERS, MOCK_MISSION_FUNDING, MOCK_DONATIONS } from '@/lib/mock/sponsorships';
import { MOCK_MISSIONS } from '@/lib/mock/missions';

const PRESET_AMOUNTS = [10, 25, 50, 100];

export default function SupportPage() {
  const [selectedMission, setSelectedMission] = useState(MOCK_MISSION_FUNDING[0].missionSlug);
  const [amount, setAmount] = useState(25);
  const [submitted, setSubmitted] = useState(false);

  const handleDonate = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen" style={{ background: '#0d0b08' }}>
      {/* Header */}
      <div className="border-b px-6 py-10" style={{ borderColor: '#222', background: 'linear-gradient(135deg, #0d0b08 0%, #151515 100%)' }}>
        <div className="max-w-4xl mx-auto">
          <p className="text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: '#c6a15b' }}>Support the Missions</p>
          <h1 className="text-3xl font-bold text-white mb-3">Fund Observable Agents for Social Purpose</h1>
          <p className="text-base max-w-2xl" style={{ color: '#888' }}>
            Every dollar funds agent research hours, grant discovery, and public reporting — not advertising.
            All donations are tracked on the public Impact Ledger.
          </p>
          <div className="mt-4 inline-flex items-center gap-2 text-xs px-3 py-1.5 rounded-full" style={{ background: '#1a1500', color: '#c6a15b', border: '1px solid #c6a15b33' }}>
            ⚠️ Preview mode — payments are simulated. No real charges are processed yet.
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-10 space-y-12">
        {/* Mission funding progress */}
        <section>
          <h2 className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: '#c6a15b' }}>Mission Funding</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {MOCK_MISSION_FUNDING.map(f => {
              const mission = MOCK_MISSIONS.find(m => m.slug === f.missionSlug);
              const pct = Math.min(100, Math.round((f.raisedCents / f.goalCents) * 100));
              return (
                <Link
                  key={f.missionSlug}
                  href={`/missions/${f.missionSlug}`}
                  className="block p-5 rounded-xl border hover:scale-[1.01] transition-all"
                  style={{ background: '#151515', borderColor: '#222' }}
                >
                  <p className="text-sm font-bold text-white mb-1">{mission?.title || f.missionSlug}</p>
                  <p className="text-xs mb-3" style={{ color: '#666' }}>{f.donorCount} donors</p>
                  <div className="h-2 rounded-full overflow-hidden mb-2" style={{ background: '#222' }}>
                    <div className="h-full rounded-full" style={{ width: `${pct}%`, background: '#00d4aa' }} />
                  </div>
                  <p className="text-xs" style={{ color: '#888' }}>
                    ${(f.raisedCents / 100).toLocaleString()} of ${(f.goalCents / 100).toLocaleString()} raised ({pct}%)
                  </p>
                </Link>
              );
            })}
          </div>
        </section>

        {/* Donate form */}
        <section className="p-6 rounded-xl border" style={{ background: '#151515', borderColor: '#222' }}>
          <h2 className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: '#c6a15b' }}>Make a Donation</h2>
          {submitted ? (
            <div className="text-center py-6">
              <div className="text-4xl mb-3">💚</div>
              <p className="text-white font-bold mb-1">Thank you (preview mode)</p>
              <p className="text-sm" style={{ color: '#888' }}>This was a simulated donation. No card was charged. Live donation processing is not yet enabled.</p>
            </div>
          ) : (
            <form onSubmit={handleDonate} className="space-y-5">
              <div>
                <label className="block text-xs font-medium mb-2" style={{ color: '#c6a15b' }}>Choose a Mission</label>
                <select
                  value={selectedMission}
                  onChange={e => setSelectedMission(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-lg text-sm text-white focus:outline-none"
                  style={{ background: '#0d0b08', border: '1px solid #333' }}
                >
                  {MOCK_MISSION_FUNDING.map(f => {
                    const mission = MOCK_MISSIONS.find(m => m.slug === f.missionSlug);
                    return <option key={f.missionSlug} value={f.missionSlug}>{mission?.title || f.missionSlug}</option>;
                  })}
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium mb-2" style={{ color: '#c6a15b' }}>Amount (USD)</label>
                <div className="flex gap-2 mb-3">
                  {PRESET_AMOUNTS.map(p => (
                    <button
                      key={p}
                      type="button"
                      onClick={() => setAmount(p)}
                      className="px-4 py-2 rounded-lg text-sm font-medium transition-all"
                      style={amount === p
                        ? { background: '#00d4aa', color: '#0d0b08' }
                        : { background: '#0d0b08', color: '#aaa', border: '1px solid #333' }}
                    >
                      ${p}
                    </button>
                  ))}
                </div>
                <input
                  type="number"
                  min={1}
                  value={amount}
                  onChange={e => setAmount(Number(e.target.value))}
                  className="w-full px-4 py-2.5 rounded-lg text-sm text-white focus:outline-none"
                  style={{ background: '#0d0b08', border: '1px solid #333' }}
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl font-bold text-base transition-all"
                style={{ background: '#00d4aa', color: '#0d0b08' }}
              >
                Donate ${amount} (Preview)
              </button>
            </form>
          )}
        </section>

        {/* Sponsor tiers */}
        <section>
          <h2 className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: '#c6a15b' }}>Become a Sponsor</h2>
          <div className="grid sm:grid-cols-3 gap-4">
            {SPONSOR_TIERS.map(tier => (
              <div
                key={tier.id}
                className="p-5 rounded-xl border flex flex-col"
                style={tier.highlighted
                  ? { background: '#151515', borderColor: '#00d4aa66' }
                  : { background: '#151515', borderColor: '#222' }}
              >
                {tier.highlighted && (
                  <span className="text-xs font-bold mb-2 self-start px-2 py-0.5 rounded" style={{ background: '#00d4aa22', color: '#00d4aa' }}>
                    Most Popular
                  </span>
                )}
                <p className="text-lg font-bold text-white mb-1">{tier.name}</p>
                <p className="text-2xl font-bold mb-3" style={{ color: '#00d4aa' }}>${tier.monthlyPrice}<span className="text-sm font-normal" style={{ color: '#666' }}>/mo</span></p>
                <p className="text-sm mb-4 flex-1" style={{ color: '#888' }}>{tier.description}</p>
                <ul className="space-y-1.5 mb-5">
                  {tier.perks.map(perk => (
                    <li key={perk} className="text-xs flex items-start gap-1.5" style={{ color: '#aaa' }}>
                      <span style={{ color: '#00d4aa' }}>✓</span> {perk}
                    </li>
                  ))}
                </ul>
                <Link
                  href="/apply"
                  className="block text-center py-2.5 rounded-lg text-sm font-bold transition-all"
                  style={{ background: '#1a1a1a', color: '#00d4aa', border: '1px solid #00d4aa33' }}
                >
                  Become a {tier.name}
                </Link>
              </div>
            ))}
          </div>
        </section>

        {/* Recent public donations */}
        <section>
          <h2 className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: '#c6a15b' }}>Recent Supporters</h2>
          <div className="space-y-2">
            {MOCK_DONATIONS.filter(d => d.isPublic).map(d => (
              <div key={d.id} className="p-4 rounded-lg border flex items-center justify-between" style={{ background: '#151515', borderColor: '#222' }}>
                <div>
                  <p className="text-sm text-white font-medium">{d.donorName}</p>
                  {d.message && <p className="text-xs" style={{ color: '#888' }}>{d.message}</p>}
                </div>
                <p className="text-sm font-bold" style={{ color: '#00d4aa' }}>${(d.amountCents / 100).toFixed(0)}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
