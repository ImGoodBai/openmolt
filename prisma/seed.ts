/**
 * THE PAULI EFFECT — Database Seed Script
 * Run: npx ts-node prisma/seed.ts (requires DATABASE_URL to be set)
 */

import { PAULI_AGENTS } from '../src/lib/mock/pauliAgents';
import { MOCK_MISSIONS } from '../src/lib/mock/missions';
import { MOCK_COUNCIL_SESSIONS } from '../src/lib/mock/council';

async function main() {
  // Note: This seed requires a running PostgreSQL database and generated Prisma client.
  // In production, after `prisma generate` and `prisma db push`:
  // npx ts-node prisma/seed.ts

  console.log('THE PAULI EFFECT Seed Data');
  console.log('==========================');
  console.log(`Agents to seed: ${PAULI_AGENTS.length}`);
  console.log(`Missions to seed: ${MOCK_MISSIONS.length}`);
  console.log(`Council sessions to seed: ${MOCK_COUNCIL_SESSIONS.length}`);
  console.log('\nTo run this seed against a live database:');
  console.log('1. Set DATABASE_URL in .env');
  console.log('2. Run: npx prisma generate');
  console.log('3. Run: npx prisma db push');
  console.log('4. Run: npx ts-node prisma/seed.ts');
  console.log('\nSeed data is currently served from src/lib/mock/ for development.');
}

main()
  .catch(console.error)
  .finally(() => {
    console.log('Seed complete.');
  });
