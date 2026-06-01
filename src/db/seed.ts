import { config } from "dotenv";
config({ path: ".env" });

import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { problems } from "./game-schema";
import { seedProblems } from "./problems-data";
import { seedProblemsBatch2 } from "./problems-data-batch2";
import { seedProblemsBatch3 } from "./problems-data-batch3";
import { seedProblemsBatch4 } from "./problems-data-batch4";
import { seedProblemsBatch5 } from "./problems-data-batch5";
import { seedProblemsBatch6 } from "./problems-data-batch6";
import { seedProblemsBatch7 } from "./problems-data-batch7";
import { seedProblemsBatch8 } from "./problems-data-batch8";
import { seedProblemsBatch9 } from "./problems-data-batch9";
import { seedProblemsBatch10 } from "./problems-data-batch10";
import { seedProblemsBatch11 } from "./problems-data-batch11";
import { seedProblemsBatch12 } from "./problems-data-batch12";
import { seedProblemsBatch13 } from "./problems-data-batch13";
import { seedProblemsBatch14 } from "./problems-data-batch14";
import { seedProblemsBatch15 } from "./problems-data-batch15";

const sql = neon(process.env.DATABASE_URL!);
const db = drizzle({ client: sql });

async function seed() {
  console.log("Seeding problems...");

  // Clear existing problems
  await db.delete(problems);

  const allProblems = [
    ...seedProblems, 
    ...seedProblemsBatch2, 
    ...seedProblemsBatch3, 
    ...seedProblemsBatch4,
    ...seedProblemsBatch5,
    ...seedProblemsBatch6,
    ...seedProblemsBatch7,
    ...seedProblemsBatch8,
    ...seedProblemsBatch9,
    ...seedProblemsBatch10,
    ...seedProblemsBatch11,
    ...seedProblemsBatch12,
    ...seedProblemsBatch13,
    ...seedProblemsBatch14,
    ...seedProblemsBatch15
  ];

  for (const p of allProblems) {
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

  console.log(`\nSeeded ${allProblems.length} problems.`);
}

seed()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error("Seed failed:", err);
    process.exit(1);
  });
