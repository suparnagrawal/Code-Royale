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
