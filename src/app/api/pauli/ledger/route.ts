import { NextResponse } from 'next/server';
import { MOCK_LEDGER } from '@/lib/mock/ledger';

export async function GET() {
  const publicEntries = MOCK_LEDGER.filter(e => e.visibility === 'public');
  return NextResponse.json({
    entries: publicEntries,
    meta: {
      total: publicEntries.length,
      pending: publicEntries.filter(e => e.humanApprovalStatus === 'pending').length,
      approved: publicEntries.filter(e => e.humanApprovalStatus === 'approved').length,
    }
  });
}
