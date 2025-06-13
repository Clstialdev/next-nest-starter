import { createDrizzle } from "./db";

const connectionString = process.env.DATABASE_URL!;
export const db = createDrizzle(connectionString);
