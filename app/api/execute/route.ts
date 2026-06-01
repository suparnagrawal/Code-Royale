import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { runTestCases, LANGUAGE_IDS } from "@/lib/judge0";
import { db } from "@/src/db/db";
import { problems } from "@/src/db/schema";
import { eq } from "drizzle-orm";

type TestCase = {
  input: string;
  expectedOutput: string;
  isExample: boolean;
};

export async function POST(request: NextRequest) {
  // Auth check
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const { problemId, code, languageId, testCases, runAll } = body as {
    problemId: string;
    code: string;
    languageId: number;
    testCases: TestCase[];
    runAll: boolean;
  };

  if (!code || !languageId || !testCases || !problemId) {
    return NextResponse.json(
      { error: "Missing required fields: code, languageId, testCases, problemId" },
      { status: 400 },
    );
  }

  // Fetch problem to get driver code
  const problem = await db.query.problems.findFirst({
    where: eq(problems.id, problemId),
  });

  if (!problem) {
    return NextResponse.json({ error: "Problem not found" }, { status: 404 });
  }

  // Map languageId to key
  // 54 = cpp, 63 = javascript, 71 = python
  let langKey = "";
  if (languageId === 54) langKey = "cpp";
  else if (languageId === 63) langKey = "javascript";
  else if (languageId === 71) langKey = "python";

  let finalCode = code;
  if (langKey === "cpp") {
    finalCode = `#include <bits/stdc++.h>\nusing namespace std;\n\n// Standard definitions for Linked Lists and Trees\nstruct ListNode {\n    int val;\n    ListNode *next;\n    ListNode() : val(0), next(nullptr) {}\n    ListNode(int x) : val(x), next(nullptr) {}\n    ListNode(int x, ListNode *next) : val(x), next(next) {}\n};\n\nstruct TreeNode {\n    int val;\n    TreeNode *left;\n    TreeNode *right;\n    TreeNode() : val(0), left(nullptr), right(nullptr) {}\n    TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}\n    TreeNode(int x, TreeNode *left, TreeNode *right) : val(x), left(left), right(right) {}\n};\n\n` + finalCode;
  }

  const driverCodes = problem.driverCode as Record<string, string>;
  if (langKey && driverCodes && driverCodes[langKey]) {
    finalCode = finalCode + "\n" + driverCodes[langKey];
  }

  // Filter test cases based on runAll flag
  const casesToRun = runAll
    ? testCases
    : testCases.filter((tc) => tc.isExample);

  try {
    const results = await runTestCases({
      code: finalCode,
      languageId,
      testCases: casesToRun,
    });

    return NextResponse.json({ results });
  } catch (err) {
    console.error("Execution error:", err);
    return NextResponse.json(
      { error: "Code execution failed" },
      { status: 500 },
    );
  }
}
