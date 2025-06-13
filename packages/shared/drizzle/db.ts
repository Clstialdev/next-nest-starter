import { Pool } from "pg";
import { drizzle } from "drizzle-orm/node-postgres";
import { schema } from "./schema";
import { DrizzleDB } from "./drizzle";

export function createDrizzle(connectionString: string): DrizzleDB {
  const pool = new Pool({ connectionString });
  return drizzle(pool, { schema }) as DrizzleDB;
}
