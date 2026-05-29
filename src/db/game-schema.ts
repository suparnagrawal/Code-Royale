import {
  pgTable,
  pgEnum,
  text,
  integer,
  jsonb,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";

export const difficultyEnum = pgEnum("difficulty", [
  "easy",
  "medium",
  "hard",
]);

export const problems = pgTable("problems", {
  id: uuid("id").defaultRandom().primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  difficulty: difficultyEnum("difficulty").notNull(),
  testCases: jsonb("test_cases").notNull(),
  starterCode: jsonb("starter_code").notNull(),
  driverCode: jsonb("driver_code").$type<Record<string, string>>().default({}).notNull(),
  minElo: integer("min_elo").default(0).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

import { user } from "./auth-schema";

export const battles = pgTable("battles", {
  id: uuid("id").defaultRandom().primaryKey(),
  playerAId: text("player_a_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  playerBId: text("player_b_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  winnerId: text("winner_id").references(() => user.id, { onDelete: "set null" }),
  problemId: uuid("problem_id")
    .notNull()
    .references(() => problems.id, { onDelete: "cascade" }),
  language: text("language").notNull(),
  eloChangeA: integer("elo_change_a").notNull(),
  eloChangeB: integer("elo_change_b").notNull(),
  eloBeforeA: integer("elo_before_a").notNull(),
  eloBeforeB: integer("elo_before_b").notNull(),
  startedAt: timestamp("started_at").notNull(),
  endedAt: timestamp("ended_at").defaultNow().notNull(),
});
