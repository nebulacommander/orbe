import 'dotenv/config';
import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  out: './drizzle',
  schema: './src/db/schema.ts',
  dialect: 'postgresql',
  dbCredentials: {
    url: 'postgresql://neondb_owner:npg_0hnvm3MkVlCQ@ep-proud-paper-a5w1ev1t-pooler.us-east-2.aws.neon.tech/neondb?sslmode=require',
  },
});