import { drizzle } from 'drizzle-orm/neon-http';
import { neon } from '@neondatabase/serverless';
import { authors, books } from '../src/schema';

export const onRequestGet = async (context) => {
  const { DATABASE_URL } = context.env;
  const sql = neon(DATABASE_URL);
  const db = drizzle(sql);

  const output = await db.select().from(authors);
  return new Response(
    JSON.stringify(output)
	)
}