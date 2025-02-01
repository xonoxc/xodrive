import { env } from "~/env";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "./schema";
import { neon, NeonQueryFunction } from "@neondatabase/serverless";

/**
 * Cache the database connection in development. This avoids creating a new connection on every HMR
 * update.
 */
const globalForDb = globalThis as unknown as {
  client: NeonQueryFunction<false, false> | undefined;
};

const sql = neon(env.DATABASE_URL);

export const client = globalForDb.client ?? sql;
if (env.NODE_ENV !== "production") globalForDb.client = client;

export const db = drizzle(client, { schema });
