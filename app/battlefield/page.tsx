import AttackPanel from "@/components/battlefield/AttackPanel";
import BattlefieldNavBar from "@/components/battlefield/BattlefieldNavbar";
import Mission from "@/components/battlefield/Mission";
import { db } from "@/src/db/db";
import { problems } from "@/src/db/schema";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import React from "react";

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
  const exampleCases = testCases.filter((tc) => tc.isExample);

  return (
    <main className="h-screen flex flex-col">
      <BattlefieldNavBar
        missionName={problem.title}
      />
      <section className="p-2 flex flex-1 flex-col gap-2">
        <Mission
          title={problem.title}
          description={problem.description}
          examples={exampleCases}
        />
        <AttackPanel />
      </section>
    </main>
  );
};

export default Battlefield;
