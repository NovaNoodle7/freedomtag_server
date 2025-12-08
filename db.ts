import { Pool, neonConfig } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-serverless';
import ws from "ws";
import * as schema from "./shared/schema";
import { supabase } from './supabase';

neonConfig.webSocketConstructor = ws;

// if (!process.env.SUPABASE_URL && !process.env.DATABASE_URL) {
//   throw new Error("DATABASE_URL or SUPABASE_URL must be set.");
// }

export const pool = process.env.DATABASE_URL 
  ? new Pool({ connectionString: process.env.DATABASE_URL }) 
  : undefined;

export const db = process.env.DATABASE_URL 
  ? drizzle({ client: pool!, schema }) 
  : undefined;

export { supabase };

