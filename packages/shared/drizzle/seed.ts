import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import { schema } from "./schema";
import "dotenv/config";
import { faker } from "@faker-js/faker";
import { DrizzleDB } from "./drizzle";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const db = drizzle(pool, { schema }) as DrizzleDB;

async function main() {
  await Promise.all(
    Array(50)
      .fill("")
      .map(async () => {
        const user = await db
          .insert(schema.users)
          .values({
            name: faker.person.fullName(),
            password: faker.internet.password(),
            email: faker.internet.email(),
          })
          .returning();
        return user[0];
      })
  );

  await pool.end();
  console.log("🌱  Seed completed");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
