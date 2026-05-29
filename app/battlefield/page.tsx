import BattlefieldClient from "@/components/battlefield/BattlefieldClient";
import { db } from "@/src/db/db";
import { problems } from "@/src/db/schema";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import { LANGUAGE_IDS } from "@/lib/judge0";

type TestCase = {
  input: string;
  expectedOutput: string;
  isExample: boolean;
};

import { inArray } from "drizzle-orm";

const Battlefield = async ({
  searchParams,
}: {
  searchParams: Promise<{ problemIds?: string; problemId?: string }>;
}) => {
  const { problemIds: rawProblemIds, problemId } = await searchParams;
  
  // Fallback for older problemId
  const idsString = rawProblemIds || problemId;

  if (!idsString) {
    redirect("/controlBooth");
  }

  const ids = idsString.split(",").map(id => id.trim()).filter(Boolean);

  if (ids.length === 0) {
    redirect("/controlBooth");
  }

  const results = await db
    .select()
    .from(problems)
    .where(inArray(problems.id, ids));

  if (results.length === 0) {
    redirect("/controlBooth");
  }

  // Preserve the order of the IDs as passed in the URL
  const orderedProblems = ids.map(id => results.find(p => p.id === id)).filter(Boolean) as typeof results;

  const formattedProblems = orderedProblems.map((problem) => ({
    id: problem.id,
    title: problem.title,
    description: problem.description,
    testCases: problem.testCases as TestCase[],
    starterCode: problem.starterCode as Record<string, string>,
  }));

  return (
    <BattlefieldClient
      problems={formattedProblems}
      languageId={LANGUAGE_IDS.cpp}
    />
  );
};

export default Battlefield;
