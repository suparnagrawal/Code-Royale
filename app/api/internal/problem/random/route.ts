import { NextRequest, NextResponse } from "next/server";
import { db } from "@/src/db/db";
import { problems } from "@/src/db/schema";
import { lte, sql } from "drizzle-orm";

const INTERNAL_API_KEY = process.env.INTERNAL_API_KEY!;

export async function GET(request: NextRequest) {
  const internalKey = request.headers.get("req-internal-key");

  if (internalKey !== INTERNAL_API_KEY) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const avgElo = Number(request.nextUrl.searchParams.get("avgElo") ?? "0");
  const count = Number(request.nextUrl.searchParams.get("count") ?? "1");

  // Determine difficulty probabilities based on Elo
  let difficultyWeights = { easy: 100, medium: 0, hard: 0 };
  if (avgElo >= 2000) {
    difficultyWeights = { easy: 0, medium: 40, hard: 60 };
  } else if (avgElo >= 1800) {
    difficultyWeights = { easy: 0, medium: 70, hard: 30 };
  } else if (avgElo >= 1600) {
    difficultyWeights = { easy: 30, medium: 60, hard: 10 };
  } else if (avgElo >= 1400) {
    difficultyWeights = { easy: 70, medium: 30, hard: 0 };
  }

  // Roll a random number to select target difficulty
  const roll = Math.random() * 100;
  let targetDifficulty = "easy";
  if (roll < difficultyWeights.easy) {
    targetDifficulty = "easy";
  } else if (roll < difficultyWeights.easy + difficultyWeights.medium) {
    targetDifficulty = "medium";
  } else {
    targetDifficulty = "hard";
  }

  const result = await db
    .select()
    .from(problems)
    .where(sql`${problems.difficulty} = ${targetDifficulty}`)
    .orderBy(sql`RANDOM()`)
    .limit(count);

  if (result.length === 0) {
    return NextResponse.json({ error: "No problems found" }, { status: 404 });
  }

  return NextResponse.json(result);
}
