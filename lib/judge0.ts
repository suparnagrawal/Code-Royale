const JUDGE0_URL =
  process.env.JUDGE0_URL || "http://localhost:2358";

// Detect if using self-hosted (no RapidAPI key) for optimized sync mode
const isLocalJudge0 = !process.env.JUDGE0_RAPIDAPI_KEY;

// Headers: supports both self-hosted (no auth) and RapidAPI (with key)
function getHeaders(): Record<string, string> {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  // If using RapidAPI, add the required headers
  const apiKey = process.env.JUDGE0_RAPIDAPI_KEY;
  if (apiKey) {
    headers["X-RapidAPI-Key"] = apiKey;
    headers["X-RapidAPI-Host"] = new URL(JUDGE0_URL).host;
  }

  return headers;
}

export const LANGUAGE_IDS: Record<string, number> = {
  python: 71,
  javascript: 63,
  cpp: 54,
};

type Judge0Status = {
  id: number;
  description: string;
};

type Judge0Result = {
  stdout: string | null;
  stderr: string | null;
  compile_output: string | null;
  status: Judge0Status;
  time: string | null;
  memory: number | null;
};

export type ExecuteResult = {
  stdout: string;
  stderr: string;
  compileOutput: string;
  status: Judge0Status;
  time: string;
  memory: number;
};

function decodeBase64(str: string | null): string {
  if (!str) return "";
  return Buffer.from(str, "base64").toString("utf-8");
}

function parseResult(result: Judge0Result): ExecuteResult {
  return {
    stdout: decodeBase64(result.stdout),
    stderr: decodeBase64(result.stderr),
    compileOutput: decodeBase64(result.compile_output),
    status: result.status,
    time: result.time ?? "0",
    memory: result.memory ?? 0,
  };
}

export async function executeCode({
  code,
  languageId,
  stdin,
}: {
  code: string;
  languageId: number;
  stdin: string;
}): Promise<ExecuteResult> {
  const headers = getHeaders();

  // For local Judge0: use synchronous wait=true (no polling needed)
  // For RapidAPI: use async + polling (wait=true is not reliable on RapidAPI)
  const useWait = isLocalJudge0;

  const submitRes = await fetch(
    `${JUDGE0_URL}/submissions?base64_encoded=true&wait=${useWait}`,
    {
      method: "POST",
      headers,
      body: JSON.stringify({
        source_code: Buffer.from(code).toString("base64"),
        language_id: languageId,
        stdin: Buffer.from(stdin).toString("base64"),
      }),
    },
  );

  if (!submitRes.ok) {
    const err = await submitRes.text();
    throw new Error(`Judge0 submission failed: ${submitRes.status} ${err}`);
  }

  const responseData = await submitRes.json();

  // Synchronous mode: result is returned directly
  if (useWait && responseData.status) {
    return parseResult(responseData as Judge0Result);
  }

  // Async mode: poll for result
  const { token } = responseData as { token: string };

  for (let i = 0; i < 30; i++) {
    await new Promise((r) => setTimeout(r, 1000));

    const pollRes = await fetch(
      `${JUDGE0_URL}/submissions/${token}?base64_encoded=true`,
      { headers },
    );

    if (!pollRes.ok) continue;

    const result = (await pollRes.json()) as Judge0Result;

    // Status 1 = In Queue, 2 = Processing
    if (result.status.id <= 2) continue;

    return parseResult(result);
  }

  throw new Error("Judge0 polling timeout");
}

export type TestCaseResult = {
  index: number;
  input: string;
  expected: string;
  actual: string;
  passed: boolean;
  time: string;
  statusDescription: string;
  isExample: boolean;
  compileOutput?: string;
  stderr?: string;
};

export async function runTestCases({
  code,
  languageId,
  testCases,
}: {
  code: string;
  languageId: number;
  testCases: { input: string; expectedOutput: string; isExample: boolean }[];
}): Promise<TestCaseResult[]> {
  const headers = getHeaders();

  // For local Judge0: use batch submission API (enabled in judge0.conf)
  if (isLocalJudge0 && testCases.length > 1) {
    try {
      const submissions = testCases.map((tc) => ({
        source_code: Buffer.from(code).toString("base64"),
        language_id: languageId,
        stdin: Buffer.from(tc.input).toString("base64"),
      }));

      const batchRes = await fetch(
        `${JUDGE0_URL}/submissions/batch?base64_encoded=true`,
        {
          method: "POST",
          headers,
          body: JSON.stringify({ submissions }),
        },
      );

      if (!batchRes.ok) {
        throw new Error(`Batch submission failed: ${batchRes.status}`);
      }

      const tokens = (await batchRes.json()) as { token: string }[];
      const tokenStr = tokens.map((t) => t.token).join(",");

      // Poll batch results until all are done
      for (let attempt = 0; attempt < 60; attempt++) {
        await new Promise((r) => setTimeout(r, 1000));

        const pollRes = await fetch(
          `${JUDGE0_URL}/submissions/batch?tokens=${tokenStr}&base64_encoded=true`,
          { headers },
        );

        if (!pollRes.ok) continue;

        const data = (await pollRes.json()) as {
          submissions: Judge0Result[];
        };

        // Check if all submissions are done (status > 2)
        const allDone = data.submissions.every(
          (s) => s.status && s.status.id > 2,
        );
        if (!allDone) continue;

        const mappedResults = data.submissions.map((result, idx) => {
          const actual = decodeBase64(result.stdout).trim();
          const expected = testCases[idx].expectedOutput.trim();
          const compileOutput = decodeBase64(result.compile_output).trim();
          const stderr = decodeBase64(result.stderr).trim();

          return {
            index: idx,
            input: testCases[idx].input,
            expected,
            actual,
            passed: result.status.id === 3 && actual === expected,
            time: result.time ?? "0",
            statusDescription: result.status.description,
            isExample: testCases[idx].isExample,
            compileOutput,
            stderr,
          };
        });

        const truncatedResults: TestCaseResult[] = [];
        for (const res of mappedResults) {
          truncatedResults.push(res);
          if (!res.passed) break;
        }
        return truncatedResults;
      }

      throw new Error("Judge0 batch polling timeout");
    } catch (err) {
      // Fall through to sequential execution on batch failure
      console.warn("Batch submission failed, falling back to sequential:", err);
    }
  }

  // Fallback: run test cases in parallel (batches of 5)
  const results: TestCaseResult[] = [];
  const batchSize = 5;

  for (let i = 0; i < testCases.length; i += batchSize) {
    const batch = testCases.slice(i, i + batchSize);
    const batchResults = await Promise.all(
      batch.map(async (tc, batchIdx) => {
        const globalIdx = i + batchIdx;
        try {
          const result = await executeCode({
            code,
            languageId,
            stdin: tc.input,
          });
          const actual = result.stdout.trim();
          const expected = tc.expectedOutput.trim();

          return {
            index: globalIdx,
            input: tc.input,
            expected,
            actual,
            passed: result.status.id === 3 && actual === expected,
            time: result.time,
            statusDescription: result.status.description,
            isExample: tc.isExample,
            compileOutput: result.compileOutput?.trim(),
            stderr: result.stderr?.trim(),
          };
        } catch {
          return {
            index: globalIdx,
            input: tc.input,
            expected: tc.expectedOutput.trim(),
            actual: "",
            passed: false,
            time: "0",
            statusDescription: "Error",
            isExample: tc.isExample,
            compileOutput: "",
            stderr: "",
          };
        }
      }),
    );
    const failedIndex = batchResults.findIndex((r) => !r.passed);
    if (failedIndex !== -1) {
      results.push(...batchResults.slice(0, failedIndex + 1));
      break;
    }
    results.push(...batchResults);
  }

  return results;
}
