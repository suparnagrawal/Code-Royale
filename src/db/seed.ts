import { config } from "dotenv";
config({ path: ".env" });

import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { problems } from "./game-schema";
import { seedProblems } from "./problems-data";

const sql = neon(process.env.DATABASE_URL!);
const db = drizzle({ client: sql });

async function seed() {
  console.log("Seeding problems...");

  // Clear existing problems
  await db.delete(problems);

  for (const p of seedProblems) {
    await db.insert(problems).values({
      title: p.title,
      description: p.description,
      difficulty: p.difficulty,
      testCases: p.testCases,
      starterCode: p.starterCode,
      driverCode: p.driverCode,
      minElo: p.minElo,
    });
    console.log(`  ✓ ${p.title}`);
  }

  console.log(`\nSeeded ${seedProblems.length} problems.`);
}

seed()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error("Seed failed:", err);
    process.exit(1);
  });
