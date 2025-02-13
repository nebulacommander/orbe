// src/db/schema.ts
import { pgTable, serial, varchar, timestamp, integer, text } from "drizzle-orm/pg-core";

export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  email: varchar('email').notNull().unique(),
  name: varchar('name').notNull(),
  imageUrl: varchar('image_url'),
  clerkId: varchar('clerk_id').notNull().unique(),
  storageUsed: integer('storage_used').default(0).notNull(), // in bytes
  storageLimit: integer('storage_limit').default(5368709120).notNull(), // 5GB in bytes
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const userFiles = pgTable('user_files', {
  id: serial('id').primaryKey(),
  userId: integer('user_id').references(() => users.id).notNull(),
  name: varchar('name').notNull(),
  size: integer('size').notNull(),
  type: varchar('type').notNull(),
  url: text('url').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type UserFile = typeof userFiles.$inferSelect;
