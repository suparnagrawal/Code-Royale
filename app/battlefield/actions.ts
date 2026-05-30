"use server";

import { db } from "@/src/db/db";
import { problems } from "@/src/db/schema";
import { inArray } from "drizzle-orm";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export async function getBattleProblems(ids: string[]) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  console.log("getBattleProblems session user:", session?.user?.id);
  if (!session?.user) return null;

  if (!ids || ids.length === 0) return [];

  const results = await db
    .select()
    .from(problems)
    .where(inArray(problems.id, ids));

  // Preserve the order of the IDs
  const orderedProblems = ids.map(id => results.find(p => p.id === id)).filter(Boolean);

  console.log(`getBattleProblems returning ${orderedProblems.length} problems for ids ${ids}`);
  return orderedProblems.map((problem) => ({
    id: problem!.id,
    title: problem!.title,
    description: problem!.description,
    testCases: problem!.testCases,
    starterCode: problem!.starterCode,
  }));
}
