export interface SponsorTier {
  id: string
  name: string
  monthlyPrice: number
  description: string
  perks: string[]
  highlighted?: boolean
}

export interface MissionFunding {
  missionSlug: string
  goalCents: number
  raisedCents: number
  donorCount: number
}

export interface Donation {
  id: string
  missionSlug: string
  donorName: string
  amountCents: number
  message?: string
  isPublic: boolean
  createdAt: string
}

export const SPONSOR_TIERS: SponsorTier[] = [
  {
    id: 'community',
    name: 'Community Sponsor',
    monthlyPrice: 25,
    description: 'Back the Observatory and keep the Impact Ledger public for everyone.',
    perks: [
      'Name listed on the Impact Ledger supporters wall',
      'Monthly mission digest email',
    ],
  },
  {
    id: 'mission-partner',
    name: 'Mission Partner',
    monthlyPrice: 150,
    description: 'Fund a specific mission category and get agent-sourced reporting back.',
    perks: [
      'Choose a mission category to fund',
      'Quarterly impact report from Impact Reporter agent',
      'Name + logo listed on Mission pages',
    ],
    highlighted: true,
  },
  {
    id: 'org-partner',
    name: 'Organization Partner',
    monthlyPrice: 500,
    description: 'For nonprofits and foundations funding multiple missions at scale.',
    perks: [
      'Dedicated Mission Room with agent support',
      'Priority Agent Council review for your sector',
      'Co-branded podcast episode opportunity',
    ],
  },
]

export const MOCK_MISSION_FUNDING: MissionFunding[] = [
  { missionSlug: 'seattle-food-access', goalCents: 500000, raisedCents: 218000, donorCount: 34 },
  { missionSlug: 'youth-digital-access', goalCents: 300000, raisedCents: 96000, donorCount: 19 },
  { missionSlug: 'climate-research-fund', goalCents: 750000, raisedCents: 412500, donorCount: 58 },
  { missionSlug: 'public-health-literacy', goalCents: 200000, raisedCents: 145000, donorCount: 27 },
]

export const MOCK_DONATIONS: Donation[] = [
  {
    id: 'don-1',
    missionSlug: 'seattle-food-access',
    donorName: 'Jane R.',
    amountCents: 5000,
    message: 'Keep mapping the food deserts!',
    isPublic: true,
    createdAt: '2026-06-27T14:00:00Z',
  },
  {
    id: 'don-2',
    missionSlug: 'climate-research-fund',
    donorName: 'Anonymous',
    amountCents: 25000,
    isPublic: true,
    createdAt: '2026-06-26T09:30:00Z',
  },
  {
    id: 'don-3',
    missionSlug: 'youth-digital-access',
    donorName: 'Cedar Foundation',
    amountCents: 50000,
    message: 'Proud to back digital equity work in WA.',
    isPublic: true,
    createdAt: '2026-06-20T17:15:00Z',
  },
]

export function getMissionFunding(missionSlug: string): MissionFunding | undefined {
  return MOCK_MISSION_FUNDING.find(f => f.missionSlug === missionSlug)
}

export function getDonationsForMission(missionSlug: string): Donation[] {
  return MOCK_DONATIONS.filter(d => d.missionSlug === missionSlug && d.isPublic)
}
