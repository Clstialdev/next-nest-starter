/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { drizzle, type NodePgDatabase } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import * as schema from './schema'; // adjust the path if needed
import 'dotenv/config';
import { faker } from '@faker-js/faker';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const db = drizzle(pool, { schema }) as NodePgDatabase<typeof schema>;

async function main() {
  await Promise.all(
    Array(50)
      .fill('')
      .map(async () => {
        const user = await db
          .insert(schema.users)
          .values({
            name: faker.person.fullName() as string,
            password: faker.internet.password() as string,
            email: faker.internet.email() as string,
          })
          .returning();
        return user[0];
      }),
  );

  await pool.end();
  console.log('🌱  Seed completed');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
