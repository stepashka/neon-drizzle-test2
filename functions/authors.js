import { drizzle } from 'drizzle-orm/neon-http';
import { neon } from '@neondatabase/serverless';
import { authors, books } from './schema';

export const onRequestGet = () => {
  const { DATABASE_URL } = env<{ DATABASE_URL: string }>(c);
  const sql = neon(DATABASE_URL);
  const db = drizzle(sql);

  const output = await db.select().from(authors);
  return new Response(c.json(output))
}