import { config } from "dotenv";
config({ path: ".env" });

import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { problems, difficultyEnum } from "./game-schema";

const sql = neon(process.env.DATABASE_URL!);
const db = drizzle({ client: sql });

type TestCase = { input: string; expectedOutput: string; isExample: boolean };
type StarterCode = { python: string; javascript: string; cpp: string };
type Problem = {
    title: string;
    description: string;
    difficulty: "easy" | "medium" | "hard";
    testCases: TestCase[];
    starterCode: StarterCode;
    minElo: number;
};

const seedProblems: Problem[] = [
    {
        title: "FizzBuzz",
        description: `# FizzBuzz

Given an integer \`n\`, return a string array \`answer\` (1-indexed) where:

- \`answer[i] == "FizzBuzz"\` if \`i\` is divisible by 3 and 5.
- \`answer[i] == "Fizz"\` if \`i\` is divisible by 3.
- \`answer[i] == "Buzz"\` if \`i\` is divisible by 5.
- \`answer[i] == i\` (as a string) if none of the above conditions are true.

## Examples

**Input:** n = 15
**Output:** ["1","2","Fizz","4","Buzz","Fizz","7","8","Fizz","Buzz","11","Fizz","13","14","FizzBuzz"]

**Input:** n = 5
**Output:** ["1","2","Fizz","4","Buzz"]

## Constraints
- 1 <= n <= 10^4`,
        difficulty: "easy",
        testCases: [
            { input: "15", expectedOutput: '["1","2","Fizz","4","Buzz","Fizz","7","8","Fizz","Buzz","11","Fizz","13","14","FizzBuzz"]', isExample: true },
            { input: "5", expectedOutput: '["1","2","Fizz","4","Buzz"]', isExample: true },
            { input: "3", expectedOutput: '["1","2","Fizz"]', isExample: false },
            { input: "1", expectedOutput: '["1"]', isExample: false },
            { input: "30", expectedOutput: '["1","2","Fizz","4","Buzz","Fizz","7","8","Fizz","Buzz","11","Fizz","13","14","FizzBuzz","16","17","Fizz","19","Buzz","Fizz","22","23","Fizz","Buzz","26","Fizz","28","29","FizzBuzz"]', isExample: false },
        ],
        starterCode: {
            python: `def fizzBuzz(n: int) -> list[str]:\n    # Write your solution here\n    pass`,
            javascript: `function fizzBuzz(n) {\n  // Write your solution here\n}`,
            cpp: `#include <vector>\n#include <string>\nusing namespace std;\n\nvector<string> fizzBuzz(int n) {\n    // Write your solution here\n}`,
        },
        minElo: 0,
    },
    {
        title: "Two Sum",
        description: `# Two Sum

Given an array of integers \`nums\` and an integer \`target\`, return the indices of the two numbers that add up to \`target\`.

You may assume each input has exactly one solution, and you may not use the same element twice. Return the answer in any order.

## Examples

**Input:** nums = [2,7,11,15], target = 9
**Output:** [0,1]

**Input:** nums = [3,2,4], target = 6
**Output:** [1,2]

## Constraints
- 2 <= nums.length <= 10^4
- -10^9 <= nums[i] <= 10^9`,
        difficulty: "easy",
        testCases: [
            { input: "[2,7,11,15]\n9", expectedOutput: "[0,1]", isExample: true },
            { input: "[3,2,4]\n6", expectedOutput: "[1,2]", isExample: true },
            { input: "[3,3]\n6", expectedOutput: "[0,1]", isExample: true },
            { input: "[1,5,3,7]\n8", expectedOutput: "[1,2]", isExample: false },
            { input: "[-1,-2,-3,-4,-5]\n-8", expectedOutput: "[2,4]", isExample: false },
        ],
        starterCode: {
            python: `def twoSum(nums: list[int], target: int) -> list[int]:\n    # Write your solution here\n    pass`,
            javascript: `function twoSum(nums, target) {\n  // Write your solution here\n}`,
            cpp: `#include <vector>\nusing namespace std;\n\nvector<int> twoSum(vector<int>& nums, int target) {\n    // Write your solution here\n}`,
        },
        minElo: 0,
    },
    {
        title: "Palindrome Check",
        description: `# Palindrome Check

Given a string \`s\`, return \`true\` if it is a palindrome, \`false\` otherwise.

Consider only alphanumeric characters and ignore cases.

## Examples

**Input:** s = "A man, a plan, a canal: Panama"
**Output:** true

**Input:** s = "race a car"
**Output:** false

## Constraints
- 1 <= s.length <= 2 * 10^5
- s consists only of printable ASCII characters`,
        difficulty: "easy",
        testCases: [
            { input: "A man, a plan, a canal: Panama", expectedOutput: "true", isExample: true },
            { input: "race a car", expectedOutput: "false", isExample: true },
            { input: " ", expectedOutput: "true", isExample: false },
            { input: "ab_a", expectedOutput: "true", isExample: false },
            { input: "0P", expectedOutput: "false", isExample: false },
        ],
        starterCode: {
            python: `def isPalindrome(s: str) -> bool:\n    # Write your solution here\n    pass`,
            javascript: `function isPalindrome(s) {\n  // Write your solution here\n}`,
            cpp: `#include <string>\nusing namespace std;\n\nbool isPalindrome(string s) {\n    // Write your solution here\n}`,
        },
        minElo: 0,
    },
    {
        title: "Valid Parentheses",
        description: `# Valid Parentheses

Given a string \`s\` containing only \`'('\`, \`')'\`, \`'{'\`, \`'}'\`, \`'['\` and \`']'\`, determine if the input string is valid.

A string is valid if:
1. Open brackets are closed by the same type of brackets.
2. Open brackets are closed in the correct order.
3. Every close bracket has a corresponding open bracket of the same type.

## Examples

**Input:** s = "()"
**Output:** true

**Input:** s = "()[]{}"
**Output:** true

**Input:** s = "(]"
**Output:** false

## Constraints
- 1 <= s.length <= 10^4`,
        difficulty: "easy",
        testCases: [
            { input: "()", expectedOutput: "true", isExample: true },
            { input: "()[]{}", expectedOutput: "true", isExample: true },
            { input: "(]", expectedOutput: "false", isExample: true },
            { input: "([)]", expectedOutput: "false", isExample: false },
            { input: "{[]}", expectedOutput: "true", isExample: false },
            { input: "((((", expectedOutput: "false", isExample: false },
        ],
        starterCode: {
            python: `def isValid(s: str) -> bool:\n    # Write your solution here\n    pass`,
            javascript: `function isValid(s) {\n  // Write your solution here\n}`,
            cpp: `#include <string>\nusing namespace std;\n\nbool isValid(string s) {\n    // Write your solution here\n}`,
        },
        minElo: 0,
    },
    {
        title: "Reverse Linked List",
        description: `# Reverse Linked List

Given the head of a singly linked list, reverse the list and return the reversed list.

Input is given as space-separated node values. Output the reversed list as space-separated values.

## Examples

**Input:** 1 2 3 4 5
**Output:** 5 4 3 2 1

**Input:** 1 2
**Output:** 2 1

## Constraints
- 0 <= Number of nodes <= 5000
- -5000 <= Node.val <= 5000`,
        difficulty: "easy",
        testCases: [
            { input: "1 2 3 4 5", expectedOutput: "5 4 3 2 1", isExample: true },
            { input: "1 2", expectedOutput: "2 1", isExample: true },
            { input: "", expectedOutput: "", isExample: false },
            { input: "1", expectedOutput: "1", isExample: false },
            { input: "1 2 3", expectedOutput: "3 2 1", isExample: false },
        ],
        starterCode: {
            python: `def reverseList(values: list[int]) -> list[int]:\n    # Write your solution here\n    pass`,
            javascript: `function reverseList(values) {\n  // Write your solution here\n}`,
            cpp: `#include <vector>\nusing namespace std;\n\nvector<int> reverseList(vector<int>& values) {\n    // Write your solution here\n}`,
        },
        minElo: 0,
    },
    {
        title: "Best Time to Buy and Sell Stock",
        description: `# Best Time to Buy and Sell Stock

You are given an array \`prices\` where \`prices[i]\` is the price of a stock on the ith day.

Maximize your profit by choosing a single day to buy and a different day in the future to sell. Return the maximum profit. If no profit is possible, return 0.

## Examples

**Input:** prices = [7,1,5,3,6,4]
**Output:** 5

**Input:** prices = [7,6,4,3,1]
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
            { input: "1 4 2 7", expectedOutput: "6", isExample: false },
        ],
        starterCode: {
            python: `def maxProfit(prices: list[int]) -> int:\n    # Write your solution here\n    pass`,
            javascript: `function maxProfit(prices) {\n  // Write your solution here\n}`,
            cpp: `#include <vector>\nusing namespace std;\n\nint maxProfit(vector<int>& prices) {\n    // Write your solution here\n}`,
        },
        minElo: 800,
    },
    {
        title: "Merge Two Sorted Lists",
        description: `# Merge Two Sorted Lists

You are given two sorted integer arrays. Merge them into one sorted array.

Input: two lines, each with space-separated integers.

## Examples

**Input:**
1 2 4
1 3 4
**Output:** 1 1 2 3 4 4

**Input:**
(empty)
0
**Output:** 0

## Constraints
- 0 <= list length <= 50
- -100 <= val <= 100`,
        difficulty: "easy",
        testCases: [
            { input: "1 2 4\n1 3 4", expectedOutput: "1 1 2 3 4 4", isExample: true },
            { input: "\n0", expectedOutput: "0", isExample: true },
            { input: "\n", expectedOutput: "", isExample: false },
            { input: "1\n2", expectedOutput: "1 2", isExample: false },
            { input: "1 3 5 7\n2 4 6 8", expectedOutput: "1 2 3 4 5 6 7 8", isExample: false },
        ],
        starterCode: {
            python: `def mergeSorted(list1: list[int], list2: list[int]) -> list[int]:\n    # Write your solution here\n    pass`,
            javascript: `function mergeSorted(list1, list2) {\n  // Write your solution here\n}`,
            cpp: `#include <vector>\nusing namespace std;\n\nvector<int> mergeSorted(vector<int>& list1, vector<int>& list2) {\n    // Write your solution here\n}`,
        },
        minElo: 0,
    },
    {
        title: "Maximum Subarray",
        description: `# Maximum Subarray

Given an integer array \`nums\`, find the subarray with the largest sum and return its sum.

## Examples

**Input:** nums = [-2,1,-3,4,-1,2,1,-5,4]
**Output:** 6
Explanation: The subarray [4,-1,2,1] has the largest sum 6.

**Input:** nums = [1]
**Output:** 1

**Input:** nums = [5,4,-1,7,8]
**Output:** 23

## Constraints
- 1 <= nums.length <= 10^5
- -10^4 <= nums[i] <= 10^4`,
        difficulty: "medium",
        testCases: [
            { input: "-2 1 -3 4 -1 2 1 -5 4", expectedOutput: "6", isExample: true },
            { input: "1", expectedOutput: "1", isExample: true },
            { input: "5 4 -1 7 8", expectedOutput: "23", isExample: true },
            { input: "-1", expectedOutput: "-1", isExample: false },
            { input: "-2 -1", expectedOutput: "-1", isExample: false },
        ],
        starterCode: {
            python: `def maxSubArray(nums: list[int]) -> int:\n    # Write your solution here\n    pass`,
            javascript: `function maxSubArray(nums) {\n  // Write your solution here\n}`,
            cpp: `#include <vector>\nusing namespace std;\n\nint maxSubArray(vector<int>& nums) {\n    // Write your solution here\n}`,
        },
        minElo: 900,
    },
    {
        title: "Binary Search",
        description: `# Binary Search

Given a sorted array of integers \`nums\` and a \`target\`, return the index of the target if found. Otherwise, return -1.

You must write an algorithm with O(log n) runtime complexity.

## Examples

**Input:** nums = [-1,0,3,5,9,12], target = 9
**Output:** 4

**Input:** nums = [-1,0,3,5,9,12], target = 2
**Output:** -1

## Constraints
- 1 <= nums.length <= 10^4
- -10^4 < nums[i], target < 10^4
- All integers in nums are unique
- nums is sorted in ascending order`,
        difficulty: "easy",
        testCases: [
            { input: "-1 0 3 5 9 12\n9", expectedOutput: "4", isExample: true },
            { input: "-1 0 3 5 9 12\n2", expectedOutput: "-1", isExample: true },
            { input: "5\n5", expectedOutput: "0", isExample: false },
            { input: "2 5\n5", expectedOutput: "1", isExample: false },
            { input: "1 2 3 4 5 6 7 8 9 10\n7", expectedOutput: "6", isExample: false },
        ],
        starterCode: {
            python: `def search(nums: list[int], target: int) -> int:\n    # Write your solution here\n    pass`,
            javascript: `function search(nums, target) {\n  // Write your solution here\n}`,
            cpp: `#include <vector>\nusing namespace std;\n\nint search(vector<int>& nums, int target) {\n    // Write your solution here\n}`,
        },
        minElo: 0,
    },
    {
        title: "Climbing Stairs",
        description: `# Climbing Stairs

You are climbing a staircase. It takes \`n\` steps to reach the top.

Each time you can either climb 1 or 2 steps. In how many distinct ways can you climb to the top?

## Examples

**Input:** n = 2
**Output:** 2
Explanation: 1+1, 2

**Input:** n = 3
**Output:** 3
Explanation: 1+1+1, 1+2, 2+1

## Constraints
- 1 <= n <= 45`,
        difficulty: "medium",
        testCases: [
            { input: "2", expectedOutput: "2", isExample: true },
            { input: "3", expectedOutput: "3", isExample: true },
            { input: "1", expectedOutput: "1", isExample: false },
            { input: "5", expectedOutput: "8", isExample: false },
            { input: "10", expectedOutput: "89", isExample: false },
            { input: "45", expectedOutput: "1836311903", isExample: false },
        ],
        starterCode: {
            python: `def climbStairs(n: int) -> int:\n    # Write your solution here\n    pass`,
            javascript: `function climbStairs(n) {\n  // Write your solution here\n}`,
            cpp: `int climbStairs(int n) {\n    // Write your solution here\n}`,
        },
        minElo: 1100,
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
