// src/db/index.ts
import { neon, neonConfig } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';

// For development debugging
if (!process.env.DATABASE_URL) {
  console.warn('Warning: DATABASE_URL is not defined');
}

const DATABASE_URL = process.env.DATABASE_URL || 'postgresql://neondb_owner:npg_0hnvm3MkVlCQ@ep-proud-paper-a5w1ev1t-pooler.us-east-2.aws.neon.tech/neondb?sslmode=require';

neonConfig.fetchConnectionCache = true;

const sql = neon(DATABASE_URL);
export const db = drizzle(sql);