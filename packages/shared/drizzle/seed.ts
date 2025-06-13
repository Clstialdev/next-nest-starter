import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import { schema } from "./schema";
import "dotenv/config";
import { faker } from "@faker-js/faker";
import { DrizzleDB } from "./drizzle";
import * as bcrypt from "bcrypt";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const db = drizzle(pool, { schema }) as DrizzleDB;

async function main() {
  const saltRounds = 10; // Standard bcrypt cost factor

  console.log("🌱  Starting seed...");

  await Promise.all(
    Array(50)
      .fill("")
      .map(async () => {
        const plainPassword =
          process.env.FAKE_USERS_PASSWORD ?? faker.internet.password();
        const hashedPassword = await bcrypt.hash(plainPassword, saltRounds);
        const user = await db
          .insert(schema.users)
          .values({
            name: faker.person.fullName(),
            password: hashedPassword,
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
