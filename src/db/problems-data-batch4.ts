import { Problem } from "./problems-data";

const pythonBase = `import sys\n\ndef solve():\n    input_data = sys.stdin.read().split()\n    if not input_data: return\n    pass\n\nif __name__ == '__main__':\n    solve()`;
const jsBase = `const fs = require('fs');\n\nfunction solve() {\n    const input = fs.readFileSync('/dev/stdin', 'utf-8').trim().split(/\\s+/);\n    if (!input[0]) return;\n}\n\nsolve();`;

export const seedProblemsBatch4: Problem[] = [
  {
    title: "Single Number",
    description: `# Single Number\n\nGiven a **non-empty** array of integers \`nums\`, every element appears twice except for one. Find that single one.\n\nYou must implement a solution with a linear runtime complexity and use only constant extra space.\n\n## Examples\n\n**Input:** 2 2 1\n**Output:** 1\n\n**Input:** 4 1 2 1 2\n**Output:** 4\n\n**Input:** 1\n**Output:** 1\n\n## Constraints\n- 1 <= nums.length <= 3 * 10^4\n- -3 * 10^4 <= nums[i] <= 3 * 10^4\n- Each element in the array appears twice except for one element which appears only once.`,
    difficulty: "easy",
    testCases: [
      { input: "2 2 1", expectedOutput: "1", isExample: true },
      { input: "4 1 2 1 2", expectedOutput: "4", isExample: true },
      { input: "1", expectedOutput: "1", isExample: true },
      { input: "17 12 5 -6 12 4 17 -5 2 -3 2 4 5 16 -3 -4 15 15 -4 -5 -6", expectedOutput: "16", isExample: false },
      { input: "0 1 0", expectedOutput: "1", isExample: false },
      { input: "-100", expectedOutput: "-100", isExample: false },
      { input: "9 9 10", expectedOutput: "10", isExample: false },
      { input: "10 9 9", expectedOutput: "10", isExample: false },
      { input: "1 2 3 4 5 1 2 3 4", expectedOutput: "5", isExample: false },
      { input: "200 200 300 300 400", expectedOutput: "400", isExample: false }
    ],
    starterCode: {
      python: pythonBase,
      javascript: jsBase,
      cpp: `int singleNumber(vector<int>& nums) {\n    // Write your solution here\n    \n}`,
    },
    driverCode: {
      python: "",
      javascript: "",
      cpp: `\n// --- Hidden Driver Code ---\n#include <iostream>\n#include <vector>\nusing namespace std;\nint main() {\n    vector<int> nums;\n    int n;\n    while (std::cin >> n) {\n        nums.push_back(n);\n    }\n    std::cout << singleNumber(nums) << "\\n";\n    return 0;\n}`,
    },
    minElo: 0,
  },
  {
    title: "Number of 1 Bits",
    description: `# Number of 1 Bits\n\nWrite a function that takes the binary representation of a positive integer and returns the number of set bits it has (also known as the Hamming weight).\n\n## Examples\n\n**Input:** 11\n**Output:** 3\n*Explanation:* The input binary string is 1011, which has a total of three set bits.\n\n**Input:** 128\n**Output:** 1\n*Explanation:* The input binary string is 10000000, which has a total of one set bit.\n\n**Input:** 2147483645\n**Output:** 30\n\n## Constraints\n- 1 <= n <= 2^31 - 1`,
    difficulty: "easy",
    testCases: [
      { input: "11", expectedOutput: "3", isExample: true },
      { input: "128", expectedOutput: "1", isExample: true },
      { input: "2147483645", expectedOutput: "30", isExample: true },
      { input: "1", expectedOutput: "1", isExample: false },
      { input: "2", expectedOutput: "1", isExample: false },
      { input: "3", expectedOutput: "2", isExample: false },
      { input: "15", expectedOutput: "4", isExample: false },
      { input: "1023", expectedOutput: "10", isExample: false },
      { input: "1024", expectedOutput: "1", isExample: false },
      { input: "2147483647", expectedOutput: "31", isExample: false }
    ],
    starterCode: {
      python: pythonBase,
      javascript: jsBase,
      cpp: `int hammingWeight(uint32_t n) {\n    // Write your solution here\n    \n}`,
    },
    driverCode: {
      python: "",
      javascript: "",
      cpp: `\n// --- Hidden Driver Code ---\n#include <iostream>\nusing namespace std;\nint main() {\n    uint32_t n;\n    if (std::cin >> n) {\n        std::cout << hammingWeight(n) << "\\n";\n    }\n    return 0;\n}`,
    },
    minElo: 0,
  },
  {
    title: "Counting Bits",
    description: `# Counting Bits\n\nGiven an integer \`n\`, return an array \`ans\` of length \`n + 1\` such that for each \`i\` (\`0 <= i <= n\`), \`ans[i]\` is the **number of \`1\`'s** in the binary representation of \`i\`.\n\n## Examples\n\n**Input:** 2\n**Output:** 0 1 1\n*Explanation:*\n0 --> 0\n1 --> 1\n2 --> 10\n\n**Input:** 5\n**Output:** 0 1 1 2 1 2\n*Explanation:*\n0 --> 0\n1 --> 1\n2 --> 10\n3 --> 11\n4 --> 100\n5 --> 101\n\n**Input:** 0\n**Output:** 0\n\n## Constraints\n- 0 <= n <= 10^5`,
    difficulty: "easy",
    testCases: [
      { input: "2", expectedOutput: "0 1 1", isExample: true },
      { input: "5", expectedOutput: "0 1 1 2 1 2", isExample: true },
      { input: "0", expectedOutput: "0", isExample: true },
      { input: "1", expectedOutput: "0 1", isExample: false },
      { input: "3", expectedOutput: "0 1 1 2", isExample: false },
      { input: "10", expectedOutput: "0 1 1 2 1 2 2 3 1 2 2", isExample: false },
      { input: "15", expectedOutput: "0 1 1 2 1 2 2 3 1 2 2 3 2 3 3 4", isExample: false },
      { input: "8", expectedOutput: "0 1 1 2 1 2 2 3 1", isExample: false },
      { input: "16", expectedOutput: "0 1 1 2 1 2 2 3 1 2 2 3 2 3 3 4 1", isExample: false },
      { input: "6", expectedOutput: "0 1 1 2 1 2 2", isExample: false }
    ],
    starterCode: {
      python: pythonBase,
      javascript: jsBase,
      cpp: `vector<int> countBits(int n) {\n    // Write your solution here\n    \n}`,
    },
    driverCode: {
      python: "",
      javascript: "",
      cpp: `\n// --- Hidden Driver Code ---\n#include <iostream>\n#include <vector>\nusing namespace std;\nint main() {\n    int n;\n    if (std::cin >> n) {\n        vector<int> res = countBits(n);\n        for (int i = 0; i < res.size(); i++) {\n            std::cout << res[i] << (i == res.size() - 1 ? "" : " ");\n        }\n        std::cout << "\\n";\n    }\n    return 0;\n}`,
    },
    minElo: 0,
  },
  {
    title: "Missing Number",
    description: `# Missing Number\n\nGiven an array \`nums\` containing \`n\` distinct numbers in the range \`[0, n]\`, return the only number in the range that is missing from the array.\n\n## Examples\n\n**Input:** 3 0 1\n**Output:** 2\n*Explanation:* n = 3 since there are 3 numbers, so all numbers are in the range [0,3]. 2 is the missing number in the range since it does not appear in nums.\n\n**Input:** 0 1\n**Output:** 2\n\n**Input:** 9 6 4 2 3 5 7 0 1\n**Output:** 8\n\n## Constraints\n- n == nums.length\n- 1 <= n <= 10^4\n- 0 <= nums[i] <= n\n- All the numbers of nums are unique.`,
    difficulty: "easy",
    testCases: [
      { input: "3 0 1", expectedOutput: "2", isExample: true },
      { input: "0 1", expectedOutput: "2", isExample: true },
      { input: "9 6 4 2 3 5 7 0 1", expectedOutput: "8", isExample: true },
      { input: "0", expectedOutput: "1", isExample: false },
      { input: "1", expectedOutput: "0", isExample: false },
      { input: "2 0", expectedOutput: "1", isExample: false },
      { input: "1 2 3 4 5", expectedOutput: "0", isExample: false },
      { input: "0 1 2 3 4", expectedOutput: "5", isExample: false },
      { input: "1 0 3 4 5 6 7 8 9 10", expectedOutput: "2", isExample: false },
      { input: "10 9 8 7 6 5 4 3 2 1", expectedOutput: "0", isExample: false }
    ],
    starterCode: {
      python: pythonBase,
      javascript: jsBase,
      cpp: `int missingNumber(vector<int>& nums) {\n    // Write your solution here\n    \n}`,
    },
    driverCode: {
      python: "",
      javascript: "",
      cpp: `\n// --- Hidden Driver Code ---\n#include <iostream>\n#include <vector>\nusing namespace std;\nint main() {\n    vector<int> nums;\n    int n;\n    while (std::cin >> n) {\n        nums.push_back(n);\n    }\n    std::cout << missingNumber(nums) << "\\n";\n    return 0;\n}`,
    },
    minElo: 0,
  },
  {
    title: "Reverse Bits",
    description: `# Reverse Bits\n\nReverse bits of a given 32 bits unsigned integer.\n\n## Examples\n\n**Input:** 43261596\n**Output:** 964176192\n*Explanation:* The input binary string 00000010100101000001111010011100. Return 964176192.\n\n**Input:** 4294967293\n**Output:** 3221225471\n*Explanation:* The input is 11111111111111111111111111111101. Return 3221225471.\n\n**Input:** 0\n**Output:** 0\n\n## Constraints\n- The input must be a positive integer.`,
    difficulty: "easy",
    testCases: [
      { input: "43261596", expectedOutput: "964176192", isExample: true },
      { input: "4294967293", expectedOutput: "3221225471", isExample: true },
      { input: "0", expectedOutput: "0", isExample: true },
      { input: "1", expectedOutput: "2147483648", isExample: false },
      { input: "2", expectedOutput: "1073741824", isExample: false },
      { input: "2147483648", expectedOutput: "1", isExample: false },
      { input: "4294967295", expectedOutput: "4294967295", isExample: false },
      { input: "15", expectedOutput: "4026531840", isExample: false },
      { input: "1023", expectedOutput: "4290772992", isExample: false },
      { input: "3435973836", expectedOutput: "858993459", isExample: false }
    ],
    starterCode: {
      python: pythonBase,
      javascript: jsBase,
      cpp: `uint32_t reverseBits(uint32_t n) {\n    // Write your solution here\n    \n}`,
    },
    driverCode: {
      python: "",
      javascript: "",
      cpp: `\n// --- Hidden Driver Code ---\n#include <iostream>\nusing namespace std;\nint main() {\n    uint32_t n;\n    if (std::cin >> n) {\n        std::cout << reverseBits(n) << "\\n";\n    }\n    return 0;\n}`,
    },
    minElo: 0,
  },
  {
    title: "Merge Intervals",
    description: `# Merge Intervals\n\nGiven an array of \`intervals\` where \`intervals[i] = [starti, endi]\`, merge all overlapping intervals, and return an array of the non-overlapping intervals that cover all the intervals in the input.\n\n*Note: The input format is given as \`n\` (number of intervals), followed by \`n\` pairs of integers representing the \`start\` and \`end\` of each interval.*\n\n## Examples\n\n**Input:** 4 1 3 2 6 8 10 15 18\n**Output:** 1 6 | 8 10 | 15 18\n*Explanation:* Since intervals [1,3] and [2,6] overlap, merge them into [1,6].\n\n**Input:** 2 1 4 4 5\n**Output:** 1 5\n*Explanation:* Intervals [1,4] and [4,5] are considered overlapping.\n\n**Input:** 1 1 4\n**Output:** 1 4\n\n## Constraints\n- 1 <= intervals.length <= 10^4\n- intervals[i].length == 2\n- 0 <= starti <= endi <= 10^4`,
    difficulty: "medium",
    testCases: [
      { input: "4 1 3 2 6 8 10 15 18", expectedOutput: "1 6 | 8 10 | 15 18", isExample: true },
      { input: "2 1 4 4 5", expectedOutput: "1 5", isExample: true },
      { input: "1 1 4", expectedOutput: "1 4", isExample: true },
      { input: "3 1 4 0 4 2 5", expectedOutput: "0 5", isExample: false },
      { input: "5 1 2 2 3 3 4 4 5 5 6", expectedOutput: "1 6", isExample: false },
      { input: "4 1 10 2 3 4 5 6 7", expectedOutput: "1 10", isExample: false },
      { input: "5 1 5 10 15 2 6 20 25 14 16", expectedOutput: "1 6 | 10 16 | 20 25", isExample: false },
      { input: "2 1 4 0 0", expectedOutput: "0 0 | 1 4", isExample: false },
      { input: "6 2 3 4 5 6 7 8 9 1 10 15 20", expectedOutput: "1 10 | 15 20", isExample: false },
      { input: "3 1 4 2 3 3 4", expectedOutput: "1 4", isExample: false }
    ],
    starterCode: {
      python: pythonBase,
      javascript: jsBase,
      cpp: `vector<vector<int>> merge(vector<vector<int>>& intervals) {\n    // Write your solution here\n    \n}`,
    },
    driverCode: {
      python: "",
      javascript: "",
      cpp: `\n// --- Hidden Driver Code ---\n#include <iostream>\n#include <vector>\nusing namespace std;\nint main() {\n    int n;\n    if (std::cin >> n) {\n        vector<vector<int>> intervals(n, vector<int>(2));\n        for (int i = 0; i < n; i++) {\n            std::cin >> intervals[i][0] >> intervals[i][1];\n        }\n        vector<vector<int>> res = merge(intervals);\n        for (int i = 0; i < res.size(); i++) {\n            std::cout << res[i][0] << " " << res[i][1] << (i == res.size() - 1 ? "" : " | ");\n        }\n        std::cout << "\\n";\n    }\n    return 0;\n}`,
    },
    minElo: 800,
  },
  {
    title: "Insert Interval",
    description: `# Insert Interval\n\nYou are given an array of non-overlapping intervals \`intervals\` where \`intervals[i] = [starti, endi]\` represent the start and the end of the \`i\`th interval and \`intervals\` is sorted in ascending order by \`starti\`. You are also given an interval \`newInterval = [start, end]\` that represents the start and end of another interval.\n\nInsert \`newInterval\` into \`intervals\` such that \`intervals\` is still sorted in ascending order by \`starti\` and \`intervals\` still does not have any overlapping intervals (merge overlapping intervals if necessary).\n\nReturn \`intervals\` after the insertion.\n\n*Note: The input format is exactly: \`n\` (number of intervals), followed by \`n\` pairs of integers representing the original intervals, followed by a final pair representing the \`newInterval\`.*\n\n## Examples\n\n**Input:** 2 1 3 6 9 2 5\n**Output:** 1 5 | 6 9\n*Explanation:* newInterval is [2,5], which overlaps with [1,3].\n\n**Input:** 5 1 2 3 5 6 7 8 10 12 16 4 8\n**Output:** 1 2 | 3 10 | 12 16\n*Explanation:* newInterval is [4,8], which overlaps with [3,5], [6,7], [8,10].\n\n**Input:** 0 5 7\n**Output:** 5 7\n\n## Constraints\n- 0 <= intervals.length <= 10^4\n- intervals[i].length == 2\n- 0 <= starti <= endi <= 10^5\n- newInterval.length == 2\n- 0 <= start <= end <= 10^5`,
    difficulty: "medium",
    testCases: [
      { input: "2 1 3 6 9 2 5", expectedOutput: "1 5 | 6 9", isExample: true },
      { input: "5 1 2 3 5 6 7 8 10 12 16 4 8", expectedOutput: "1 2 | 3 10 | 12 16", isExample: true },
      { input: "0 5 7", expectedOutput: "5 7", isExample: true },
      { input: "1 1 5 2 3", expectedOutput: "1 5", isExample: false },
      { input: "1 1 5 6 8", expectedOutput: "1 5 | 6 8", isExample: false },
      { input: "1 1 5 0 0", expectedOutput: "0 0 | 1 5", isExample: false },
      { input: "2 1 5 6 8 0 9", expectedOutput: "0 9", isExample: false },
      { input: "3 1 2 3 4 5 6 0 1", expectedOutput: "0 2 | 3 4 | 5 6", isExample: false },
      { input: "3 1 2 4 5 7 8 3 6", expectedOutput: "1 2 | 3 6 | 7 8", isExample: false },
      { input: "4 1 2 3 4 5 6 7 8 4 5", expectedOutput: "1 2 | 3 4 | 5 6 | 7 8", isExample: false }
    ],
    starterCode: {
      python: pythonBase,
      javascript: jsBase,
      cpp: `vector<vector<int>> insert(vector<vector<int>>& intervals, vector<int>& newInterval) {\n    // Write your solution here\n    \n}`,
    },
    driverCode: {
      python: "",
      javascript: "",
      cpp: `\n// --- Hidden Driver Code ---\n#include <iostream>\n#include <vector>\nusing namespace std;\nint main() {\n    int n;\n    if (std::cin >> n) {\n        vector<vector<int>> intervals(n, vector<int>(2));\n        for (int i = 0; i < n; i++) {\n            std::cin >> intervals[i][0] >> intervals[i][1];\n        }\n        vector<int> newInterval(2);\n        std::cin >> newInterval[0] >> newInterval[1];\n        vector<vector<int>> res = insert(intervals, newInterval);\n        for (int i = 0; i < res.size(); i++) {\n            std::cout << res[i][0] << " " << res[i][1] << (i == res.size() - 1 ? "" : " | ");\n        }\n        std::cout << "\\n";\n    }\n    return 0;\n}`,
    },
    minElo: 800,
  },
  {
    title: "Non-overlapping Intervals",
    description: `# Non-overlapping Intervals\n\nGiven an array of intervals \`intervals\` where \`intervals[i] = [starti, endi]\`, return the minimum number of intervals you need to remove to make the rest of the intervals non-overlapping.\n\n*Note: The input format is exactly: \`n\` (number of intervals), followed by \`n\` pairs of integers representing the \`start\` and \`end\` of each interval.*\n\n## Examples\n\n**Input:** 4 1 2 2 3 3 4 1 3\n**Output:** 1\n*Explanation:* [1,3] can be removed and the rest of the intervals are non-overlapping.\n\n**Input:** 3 1 2 1 2 1 2\n**Output:** 2\n*Explanation:* You need to remove two [1,2] to make the rest of the intervals non-overlapping.\n\n**Input:** 2 1 2 2 3\n**Output:** 0\n\n## Constraints\n- 1 <= intervals.length <= 10^5\n- intervals[i].length == 2\n- -5 * 10^4 <= starti < endi <= 5 * 10^4`,
    difficulty: "medium",
    testCases: [
      { input: "4 1 2 2 3 3 4 1 3", expectedOutput: "1", isExample: true },
      { input: "3 1 2 1 2 1 2", expectedOutput: "2", isExample: true },
      { input: "2 1 2 2 3", expectedOutput: "0", isExample: true },
      { input: "1 1 5", expectedOutput: "0", isExample: false },
      { input: "4 1 100 11 22 1 11 2 12", expectedOutput: "2", isExample: false },
      { input: "5 0 2 1 3 2 4 3 5 4 6", expectedOutput: "2", isExample: false },
      { input: "6 1 10 2 3 3 4 4 5 5 6 6 7", expectedOutput: "1", isExample: false },
      { input: "5 1 2 2 3 3 4 1 4 1 4", expectedOutput: "2", isExample: false },
      { input: "4 1 2 1 2 1 2 1 2", expectedOutput: "3", isExample: false },
      { input: "3 0 10 5 15 10 20", expectedOutput: "1", isExample: false }
    ],
    starterCode: {
      python: pythonBase,
      javascript: jsBase,
      cpp: `int eraseOverlapIntervals(vector<vector<int>>& intervals) {\n    // Write your solution here\n    \n}`,
    },
    driverCode: {
      python: "",
      javascript: "",
      cpp: `\n// --- Hidden Driver Code ---\n#include <iostream>\n#include <vector>\nusing namespace std;\nint main() {\n    int n;\n    if (std::cin >> n) {\n        vector<vector<int>> intervals(n, vector<int>(2));\n        for (int i = 0; i < n; i++) {\n            std::cin >> intervals[i][0] >> intervals[i][1];\n        }\n        std::cout << eraseOverlapIntervals(intervals) << "\\n";\n    }\n    return 0;\n}`,
    },
    minElo: 800,
  },
  {
    title: "Rotate Image",
    description: `# Rotate Image\n\nYou are given an \`n x n\` 2D \`matrix\` representing an image, rotate the image by **90** degrees (clockwise).\n\nYou have to rotate the image **in-place**, which means you have to modify the input 2D matrix directly. **DO NOT** allocate another 2D matrix and do the rotation.\n\n*Note: The input format is exactly: \`n\`, followed by \`n * n\` elements of the matrix row by row.*\n\n## Examples\n\n**Input:** 3 1 2 3 4 5 6 7 8 9\n**Output:** 7 4 1 | 8 5 2 | 9 6 3\n*Explanation:* The matrix is rotated by 90 degrees.\n\n**Input:** 4 5 1 9 11 2 4 8 10 13 3 6 7 15 14 12 16\n**Output:** 15 13 2 5 | 14 3 4 1 | 12 6 8 9 | 16 7 10 11\n\n**Input:** 1 1\n**Output:** 1\n\n## Constraints\n- n == matrix.length == matrix[i].length\n- 1 <= n <= 20\n- -1000 <= matrix[i][j] <= 1000`,
    difficulty: "medium",
    testCases: [
      { input: "3 1 2 3 4 5 6 7 8 9", expectedOutput: "7 4 1 | 8 5 2 | 9 6 3", isExample: true },
      { input: "4 5 1 9 11 2 4 8 10 13 3 6 7 15 14 12 16", expectedOutput: "15 13 2 5 | 14 3 4 1 | 12 6 8 9 | 16 7 10 11", isExample: true },
      { input: "1 1", expectedOutput: "1", isExample: true },
      { input: "2 1 2 3 4", expectedOutput: "3 1 | 4 2", isExample: false },
      { input: "2 10 20 30 40", expectedOutput: "30 10 | 40 20", isExample: false },
      { input: "3 0 0 0 1 1 1 2 2 2", expectedOutput: "2 1 0 | 2 1 0 | 2 1 0", isExample: false },
      { input: "3 -1 -2 -3 -4 -5 -6 -7 -8 -9", expectedOutput: "-7 -4 -1 | -8 -5 -2 | -9 -6 -3", isExample: false },
      { input: "4 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16", expectedOutput: "13 9 5 1 | 14 10 6 2 | 15 11 7 3 | 16 12 8 4", isExample: false },
      { input: "1 1000", expectedOutput: "1000", isExample: false },
      { input: "3 1 1 1 2 2 2 3 3 3", expectedOutput: "3 2 1 | 3 2 1 | 3 2 1", isExample: false }
    ],
    starterCode: {
      python: pythonBase,
      javascript: jsBase,
      cpp: `void rotate(vector<vector<int>>& matrix) {\n    // Write your solution here\n    \n}`,
    },
    driverCode: {
      python: "",
      javascript: "",
      cpp: `\n// --- Hidden Driver Code ---\n#include <iostream>\n#include <vector>\nusing namespace std;\nint main() {\n    int n;\n    if (std::cin >> n) {\n        vector<vector<int>> matrix(n, vector<int>(n));\n        for (int i = 0; i < n; i++) {\n            for (int j = 0; j < n; j++) {\n                std::cin >> matrix[i][j];\n            }\n        }\n        rotate(matrix);\n        for (int i = 0; i < n; i++) {\n            for (int j = 0; j < n; j++) {\n                std::cout << matrix[i][j] << (j == n - 1 ? "" : " ");\n            }\n            std::cout << (i == n - 1 ? "" : " | ");\n        }\n        std::cout << "\\n";\n    }\n    return 0;\n}`,
    },
    minElo: 800,
  },
  {
    title: "Spiral Matrix",
    description: `# Spiral Matrix\n\nGiven an \`m x n\` \`matrix\`, return all elements of the \`matrix\` in spiral order.\n\n*Note: The input format is exactly: \`m\`, \`n\`, followed by \`m * n\` elements of the matrix row by row.*\n\n## Examples\n\n**Input:** 3 3 1 2 3 4 5 6 7 8 9\n**Output:** 1 2 3 6 9 8 7 4 5\n\n**Input:** 3 4 1 2 3 4 5 6 7 8 9 10 11 12\n**Output:** 1 2 3 4 8 12 11 10 9 5 6 7\n\n**Input:** 1 1 1\n**Output:** 1\n\n## Constraints\n- m == matrix.length\n- n == matrix[i].length\n- 1 <= m, n <= 10\n- -100 <= matrix[i][j] <= 100`,
    difficulty: "medium",
    testCases: [
      { input: "3 3 1 2 3 4 5 6 7 8 9", expectedOutput: "1 2 3 6 9 8 7 4 5", isExample: true },
      { input: "3 4 1 2 3 4 5 6 7 8 9 10 11 12", expectedOutput: "1 2 3 4 8 12 11 10 9 5 6 7", isExample: true },
      { input: "1 1 1", expectedOutput: "1", isExample: true },
      { input: "1 5 1 2 3 4 5", expectedOutput: "1 2 3 4 5", isExample: false },
      { input: "5 1 1 2 3 4 5", expectedOutput: "1 2 3 4 5", isExample: false },
      { input: "2 2 1 2 3 4", expectedOutput: "1 2 4 3", isExample: false },
      { input: "4 4 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16", expectedOutput: "1 2 3 4 8 12 16 15 14 13 9 5 6 7 11 10", isExample: false },
      { input: "2 3 1 2 3 4 5 6", expectedOutput: "1 2 3 6 5 4", isExample: false },
      { input: "3 2 1 2 3 4 5 6", expectedOutput: "1 2 4 6 5 3", isExample: false },
      { input: "4 3 1 2 3 4 5 6 7 8 9 10 11 12", expectedOutput: "1 2 3 6 9 12 11 10 7 4 5 8", isExample: false }
    ],
    starterCode: {
      python: pythonBase,
      javascript: jsBase,
      cpp: `vector<int> spiralOrder(vector<vector<int>>& matrix) {\n    // Write your solution here\n    \n}`,
    },
    driverCode: {
      python: "",
      javascript: "",
      cpp: `\n// --- Hidden Driver Code ---\n#include <iostream>\n#include <vector>\nusing namespace std;\nint main() {\n    int m, n;\n    if (std::cin >> m >> n) {\n        vector<vector<int>> matrix(m, vector<int>(n));\n        for (int i = 0; i < m; i++) {\n            for (int j = 0; j < n; j++) {\n                std::cin >> matrix[i][j];\n            }\n        }\n        vector<int> res = spiralOrder(matrix);\n        for (int i = 0; i < res.size(); i++) {\n            std::cout << res[i] << (i == res.size() - 1 ? "" : " ");\n        }\n        std::cout << "\\n";\n    }\n    return 0;\n}`,
    },
    minElo: 800,
  }
];
