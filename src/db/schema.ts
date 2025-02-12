// src/db/schema.ts
import { pgTable, boolean, serial, varchar, timestamp, json, integer } from "drizzle-orm/pg-core";

export const Users = pgTable('users', {
    id: serial('id').primaryKey(),
    name: varchar('name').notNull(),
    email: varchar('email').notNull().unique(),
    imageUrl: varchar('imageUrl'),
})

export type Users = typeof Users.$inferSelect;