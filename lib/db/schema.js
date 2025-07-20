import { pgTable, serial, text, varchar } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  uid: varchar('uid', { length: 255 }).notNull(),
  fullName: text('full_name').notNull(),
  email: text('email').notNull(),
  createdAt: text('created_at').default(() => new Date().toISOString()),
});
