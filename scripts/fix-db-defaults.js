// Fix database default values for timestamps
require('dotenv').config({ path: require('path').join(__dirname, '../.env.local') });
const { Pool } = require('pg');

if (!process.env.DATABASE_URL) {
  console.error('[ERROR] DATABASE_URL not found in .env.local');
  process.exit(1);
}

const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});

async function fixDefaults() {
  try {
    console.log('Fixing database default values...');

    await pool.query('ALTER TABLE agents ALTER COLUMN updated_at SET DEFAULT NOW()');
    console.log('[OK] agents.updated_at default set');

    await pool.query('ALTER TABLE submolts ALTER COLUMN updated_at SET DEFAULT NOW()');
    console.log('[OK] submolts.updated_at default set');

    await pool.query('ALTER TABLE posts ALTER COLUMN updated_at SET DEFAULT NOW()');
    console.log('[OK] posts.updated_at default set');

    await pool.query('ALTER TABLE comments ALTER COLUMN updated_at SET DEFAULT NOW()');
    console.log('[OK] comments.updated_at default set');

    console.log('\nAll defaults fixed successfully!');
  } catch (error) {
    console.error('[ERROR]', error.message);
  } finally {
    await pool.end();
  }
}

fixDefaults();
