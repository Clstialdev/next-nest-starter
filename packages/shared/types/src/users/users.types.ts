import { schema } from "@shared/drizzle";

export type TUser = Omit<typeof schema.users.$inferSelect, "password">;
