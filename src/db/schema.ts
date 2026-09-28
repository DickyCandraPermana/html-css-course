import { pgTable, uuid, varchar, text, integer, timestamp, jsonb, boolean } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

export const participants = pgTable("participants", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: varchar("name", { length: 100 }).notNull(),
  sessionCode: varchar("session_code", { length: 50 }).default("default-workshop").notNull(),
  currentStep: integer("current_step").default(0).notNull(),
  completedSteps: jsonb("completed_steps").$type<number[]>().default([]).notNull(),
  htmlDraft: text("html_draft").default("").notNull(),
  cssDraft: text("css_draft").default("").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const showcases = pgTable("showcases", {
  id: uuid("id").defaultRandom().primaryKey(),
  participantId: uuid("participant_id")
    .references(() => participants.id, { onDelete: "cascade" })
    .notNull(),
  cafeName: varchar("cafe_name", { length: 150 }).notNull(),
  htmlCode: text("html_code").notNull(),
  cssCode: text("css_code").notNull(),
  likesCount: integer("likes_count").default(0).notNull(),
  isApproved: boolean("is_approved").default(true).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const participantsRelations = relations(participants, ({ many }) => ({
  showcases: many(showcases),
}));

export const showcasesRelations = relations(showcases, ({ one }) => ({
  participant: one(participants, {
    fields: [showcases.participantId],
    references: [participants.id],
  }),
}));

export type Participant = typeof participants.$inferSelect;
export type NewParticipant = typeof participants.$inferInsert;
export type Showcase = typeof showcases.$inferSelect;
export type NewShowcase = typeof showcases.$inferInsert;
