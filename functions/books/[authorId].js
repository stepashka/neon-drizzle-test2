import { drizzle } from 'drizzle-orm/neon-http';
import { neon } from '@neondatabase/serverless';
import { authors, books } from '../../src/schema';
import { eq } from 'drizzle-orm';

export const onRequestGet = async (context) => {
  const { DATABASE_URL } = context.env;
  const sql = neon(DATABASE_URL);
  const db = drizzle(sql);

  const authorId = context.params.authorId;
  const output = await db
    .select()
    .from(books)
    .where(eq(books.authorId, Number(authorId)));
    return new Response(
      JSON.stringify(output)
    )    
}