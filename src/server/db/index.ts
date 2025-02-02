import { env } from "~/env";
import { drizzle, NeonClient } from "drizzle-orm/neon-serverless";
import * as schema from "./schema";
import { Pool } from "@neondatabase/serverless";

/**
 * Cache the database connection in development. This avoids creating a new connection on every HMR
 * update.
 */
const globalForDb = globalThis as unknown as {
  client: NeonClient | undefined;
};

const pool = new Pool({
  connectionString: env.DATABASE_URL,
});

export const client = globalForDb.client ?? pool;
if (env.NODE_ENV !== "production") globalForDb.client = client;

export const db = drizzle(client, { schema });
