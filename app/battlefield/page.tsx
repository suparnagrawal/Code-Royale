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

const Battlefield = async ({
  searchParams,
}: {
  searchParams: Promise<{ problemId?: string }>;
}) => {
  const { problemId } = await searchParams;

  if (!problemId) {
    redirect("/controlBooth");
  }

  const result = await db
    .select()
    .from(problems)
    .where(eq(problems.id, problemId))
    .limit(1);

  if (result.length === 0) {
    redirect("/controlBooth");
  }

  const problem = result[0];
  const testCases = problem.testCases as TestCase[];

  return (
    <BattlefieldClient
      problem={{
        id: problem.id,
        title: problem.title,
        description: problem.description,
        testCases,
        starterCode: problem.starterCode as Record<string, string>,
      }}
      languageId={LANGUAGE_IDS.cpp}
    />
  );
};

export default Battlefield;
