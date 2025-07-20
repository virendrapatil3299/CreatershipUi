import { drizzle } from 'drizzle-orm/neon-http';
import { neon } from '@neondatabase/serverless';
import * as schema from './schema';

const sql = neon({ url: 'postgresql://CreaterShip_owner:npg_lS4tcb0qRZuL@ep-still-flower-a63j7jq9-pooler.us-west-2.aws.neon.tech/CreaterShip?sslmode=require' });
export const db = drizzle(sql, { schema });
