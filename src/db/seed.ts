import { config } from "dotenv";
config({ path: ".env" });

import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { problems, difficultyEnum } from "./game-schema";

const sql = neon(process.env.DATABASE_URL!);
const db = drizzle({ client: sql });

type TestCase = { input: string; expectedOutput: string; isExample: boolean };
type StarterCode = { python: string; javascript: string; cpp: string };
type DriverCode = { python: string; javascript: string; cpp: string };

type Problem = {
  title: string;
  description: string;
  difficulty: "easy" | "medium" | "hard";
  testCases: TestCase[];
  starterCode: StarterCode;
  driverCode: DriverCode;
  minElo: number;
};

// Python and JS remain CP-style for now
const pythonBase = `import sys\n\ndef solve():\n    input_data = sys.stdin.read().split()\n    if not input_data: return\n    pass\n\nif __name__ == '__main__':\n    solve()`;
const jsBase = `const fs = require('fs');\n\nfunction solve() {\n    const input = fs.readFileSync('/dev/stdin', 'utf-8').trim().split(/\\s+/);\n    if (!input[0]) return;\n}\n\nsolve();`;

const seedProblems: Problem[] = [
  {
    title: "FizzBuzz",
    description: `# FizzBuzz

Given an integer \`n\`, return a space-separated sequence where:

- \`FizzBuzz\` if \`i\` is divisible by 3 and 5.
- \`Fizz\` if \`i\` is divisible by 3.
- \`Buzz\` if \`i\` is divisible by 5.
- \`i\` (as a string) if none of the above conditions are true.

## Examples

**Input:** 15
**Output:** 1 2 Fizz 4 Buzz Fizz 7 8 Fizz Buzz 11 Fizz 13 14 FizzBuzz

**Input:** 5
**Output:** 1 2 Fizz 4 Buzz

## Constraints
- 1 <= n <= 10^4`,
    difficulty: "easy",
    testCases: [
      { input: "15", expectedOutput: "1 2 Fizz 4 Buzz Fizz 7 8 Fizz Buzz 11 Fizz 13 14 FizzBuzz", isExample: true },
      { input: "5", expectedOutput: "1 2 Fizz 4 Buzz", isExample: true },
      { input: "3", expectedOutput: "1 2 Fizz", isExample: false },
      { input: "1", expectedOutput: "1", isExample: false },
    ],
    starterCode: {
      python: pythonBase,
      javascript: jsBase,
      cpp: `vector<string> fizzBuzz(int n) {\n    // Write your solution here\n    \n}`,
    },
    driverCode: {
      python: "",
      javascript: "",
      cpp: `\n// --- Hidden Driver Code ---\n#include <iostream>\nint main() {\n    int n;\n    if (std::cin >> n) {\n        vector<string> res = fizzBuzz(n);\n        for (int i = 0; i < res.size(); i++) {\n            std::cout << res[i] << (i == res.size() - 1 ? "" : " ");\n        }\n        std::cout << "\\n";\n    }\n    return 0;\n}`,
    },
    minElo: 0,
  },
  {
    title: "Two Sum",
    description: `# Two Sum

Given an array of integers \`nums\` and an integer \`target\`, return the indices of the two numbers that add up to \`target\`.

Output the two indices separated by a space, in ascending order.

## Examples

**Input:** 2 7 11 15 9
**Output:** 0 1

**Input:** 3 2 4 6
**Output:** 1 2

## Constraints
- 2 <= nums.length <= 10^4
- -10^9 <= nums[i] <= 10^9`,
    difficulty: "easy",
    testCases: [
      { input: "2 7 11 15 9", expectedOutput: "0 1", isExample: true },
      { input: "3 2 4 6", expectedOutput: "1 2", isExample: true },
      { input: "3 3 6", expectedOutput: "0 1", isExample: true },
      { input: "1 5 3 7 8", expectedOutput: "1 3", isExample: false },
    ],
    starterCode: {
      python: pythonBase,
      javascript: jsBase,
      cpp: `vector<int> twoSum(vector<int>& nums, int target) {\n    // Write your solution here\n    \n}`,
    },
    driverCode: {
      python: "",
      javascript: "",
      cpp: `\n// --- Hidden Driver Code ---\n#include <iostream>\n#include <vector>\n#include <algorithm>\nusing namespace std;\nint main() {\n    vector<int> nums;\n    int n;\n    while (std::cin >> n) {\n        nums.push_back(n);\n    }\n    if (nums.empty()) return 0;\n    int target = nums.back();\n    nums.pop_back();\n    vector<int> res = twoSum(nums, target);\n    std::sort(res.begin(), res.end());\n    for (int i = 0; i < res.size(); i++) {\n        std::cout << res[i] << (i == res.size() - 1 ? "" : " ");\n    }\n    std::cout << "\\n";\n    return 0;\n}`,
    },
    minElo: 0,
  },
  {
    title: "Palindrome Check",
    description: `# Palindrome Check

Given a string \`s\`, return \`true\` if it is a palindrome, \`false\` otherwise.

Consider only alphanumeric characters and ignore cases.

## Examples

**Input:** A man, a plan, a canal: Panama
**Output:** true

**Input:** race a car
**Output:** false

## Constraints
- 1 <= s.length <= 2 * 10^5`,
    difficulty: "easy",
    testCases: [
      { input: "A man, a plan, a canal: Panama", expectedOutput: "true", isExample: true },
      { input: "race a car", expectedOutput: "false", isExample: true },
      { input: "ab_a", expectedOutput: "true", isExample: false },
      { input: "0P", expectedOutput: "false", isExample: false },
    ],
    starterCode: {
      python: `import sys\ndef solve():\n    s = sys.stdin.read().strip()\n    pass\nif __name__ == '__main__':\n    solve()`,
      javascript: `const fs = require('fs');\nfunction solve() {\n    const s = fs.readFileSync('/dev/stdin', 'utf-8').trim();\n}\nsolve();`,
      cpp: `bool isPalindrome(string s) {\n    // Write your solution here\n    \n}`,
    },
    driverCode: {
      python: "",
      javascript: "",
      cpp: `\n// --- Hidden Driver Code ---\n#include <iostream>\nint main() {\n    string s;\n    std::getline(std::cin, s);\n    bool res = isPalindrome(s);\n    std::cout << (res ? "true" : "false") << "\\n";\n    return 0;\n}`,
    },
    minElo: 0,
  },
  {
    title: "Best Time to Buy and Sell Stock",
    description: `# Best Time to Buy and Sell Stock

Maximize your profit by choosing a single day to buy and a different day in the future to sell. Return the maximum profit. If no profit is possible, return 0.

## Examples

**Input:** 7 1 5 3 6 4
**Output:** 5

**Input:** 7 6 4 3 1
**Output:** 0

## Constraints
- 1 <= prices.length <= 10^5
- 0 <= prices[i] <= 10^4`,
    difficulty: "medium",
    testCases: [
      { input: "7 1 5 3 6 4", expectedOutput: "5", isExample: true },
      { input: "7 6 4 3 1", expectedOutput: "0", isExample: true },
      { input: "2 4 1", expectedOutput: "2", isExample: true },
      { input: "1 2", expectedOutput: "1", isExample: false },
      { input: "3 3 3 3 3", expectedOutput: "0", isExample: false },
    ],
    starterCode: {
      python: pythonBase,
      javascript: jsBase,
      cpp: `int maxProfit(vector<int>& prices) {\n    // Write your solution here\n    \n}`,
    },
    driverCode: {
      python: "",
      javascript: "",
      cpp: `\n// --- Hidden Driver Code ---\n#include <iostream>\nint main() {\n    vector<int> prices;\n    int n;\n    while (std::cin >> n) {\n        prices.push_back(n);\n    }\n    std::cout << maxProfit(prices) << "\\n";\n    return 0;\n}`,
    },
    minElo: 800,
  },
];

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
