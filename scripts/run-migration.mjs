// Script to run the database migration against Supabase
import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables from .env file
const envPath = path.join(__dirname, '..', '.env');
const envContent = fs.readFileSync(envPath, 'utf-8');
const envVars = {};

envContent.split('\n').forEach(line => {
  const trimmed = line.trim();
  if (trimmed && !trimmed.startsWith('#')) {
    const [key, ...valueParts] = trimmed.split('=');
    if (key) {
      let value = valueParts.join('=');
      // Remove quotes
      value = value.replace(/^["']|["']$/g, '');
      envVars[key.trim()] = value;
    }
  }
});

const supabaseUrl = envVars.SUPABASE_URL || envVars.NEXT_PUBLIC_SUPABASE_URL;
const serviceRoleKey = envVars.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !serviceRoleKey) {
  console.error('Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in .env');
  process.exit(1);
}

console.log('Connecting to Supabase:', supabaseUrl);

const supabase = createClient(supabaseUrl, serviceRoleKey);

// Read the migration SQL file
const migrationPath = path.join(__dirname, '..', 'supabase', 'migrations', '001_initial_schema.sql');
const migrationSQL = fs.readFileSync(migrationPath, 'utf-8');

// Split into individual statements (simple approach - split by semicolons not in strings)
const statements = migrationSQL
  .split(/;\s*$/m)
  .map(s => s.trim())
  .filter(s => s.length > 0 && !s.startsWith('--'));

async function runMigration() {
  console.log(`Running migration with ${statements.length} statements...\n`);
  
  for (let i = 0; i < statements.length; i++) {
    const statement = statements[i];
    const preview = statement.substring(0, 80).replace(/\n/g, ' ') + '...';
    
    try {
      const { error } = await supabase.rpc('exec_sql', { sql: statement + ';' });
      
      if (error) {
        // If rpc doesn't exist, try using the REST API directly
        console.log(`Statement ${i + 1}: ${preview}`);
        console.log(`  Note: Need to run via Supabase SQL Editor\n`);
      } else {
        console.log(`✓ Statement ${i + 1}: ${preview}\n`);
      }
    } catch (err) {
      console.log(`Statement ${i + 1}: ${preview}`);
      console.log(`  Result: Needs manual execution\n`);
    }
  }
  
  console.log('\n========================================');
  console.log('Migration SQL needs to be run manually in Supabase SQL Editor.');
  console.log('Go to: https://supabase.com/dashboard/project/qithnlzcqdeserpyfgqq/sql');
  console.log('========================================\n');
}

runMigration();
