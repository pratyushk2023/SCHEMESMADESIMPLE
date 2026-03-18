import { pgTable, text, serial, integer, timestamp, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const schemesTable = pgTable("schemes", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  category: text("category").notNull(),
  state: text("state").notNull(),
  ministry: text("ministry").notNull(),
  launchDate: text("launch_date").notNull(),
  deadline: text("deadline"),
  benefits: jsonb("benefits").notNull().$type<string[]>(),
  eligibility: jsonb("eligibility").notNull().$type<string[]>(),
  documents: jsonb("documents").notNull().$type<string[]>(),
  applicationUrl: text("application_url"),
  tags: jsonb("tags").notNull().$type<string[]>(),
  steps: jsonb("steps").notNull().$type<Array<{ stepNumber: number; title: string; description: string }>>(),
  faqs: jsonb("faqs").notNull().$type<Array<{ question: string; answer: string }>>(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertSchemeSchema = createInsertSchema(schemesTable).omit({ id: true, createdAt: true });
export type InsertScheme = z.infer<typeof insertSchemeSchema>;
export type Scheme = typeof schemesTable.$inferSelect;

export const chatHistoryTable = pgTable("chat_history", {
  id: serial("id").primaryKey(),
  userMessage: text("user_message").notNull(),
  botReply: text("bot_reply").notNull(),
  language: text("language").notNull().default("en"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertChatHistorySchema = createInsertSchema(chatHistoryTable).omit({ id: true, createdAt: true });
export type InsertChatHistory = z.infer<typeof insertChatHistorySchema>;
export type ChatHistory = typeof chatHistoryTable.$inferSelect;
