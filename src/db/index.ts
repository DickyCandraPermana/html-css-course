import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "./schema";

const connectionString =
  process.env.DATABASE_URL ||
  "postgresql://mock_user:mock_pass@ep-mock-pooler.us-east-2.aws.neon.tech/neondb?sslmode=require";

// Neon HTTP query client - optimal for Vercel Serverless
const sql = neon(connectionString);

export const db = drizzle(sql, { schema });
export * from "./schema";
