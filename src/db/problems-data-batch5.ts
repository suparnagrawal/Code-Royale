import { Problem } from "./problems-data";

const pythonBase = `import sys\n\ndef solve():\n    input_data = sys.stdin.read().split()\n    if not input_data: return\n    pass\n\nif __name__ == '__main__':\n    solve()`;
const jsBase = `const fs = require('fs');\n\nfunction solve() {\n    const input = fs.readFileSync('/dev/stdin', 'utf-8').trim().split(/\\s+/);\n    if (!input[0]) return;\n}\n\nsolve();`;

export const seedProblemsBatch5: Problem[] = [
  {
    title: "Product of Array Except Self",
    description: `# Product of Array Except Self\n\nGiven an integer array \`nums\`, return an array \`answer\` such that \`answer[i]\` is equal to the product of all the elements of \`nums\` except \`nums[i]\`.\n\nThe product of any prefix or suffix of \`nums\` is **guaranteed** to fit in a **32-bit** integer.\n\nYou must write an algorithm that runs in \`O(n)\` time and without using the division operation.\n\n## Examples\n\n**Input:** 1 2 3 4\n**Output:** 24 12 8 6\n\n**Input:** -1 1 0 -3 3\n**Output:** 0 0 9 0 0\n\n## Constraints\n- 2 <= nums.length <= 10^5\n- -30 <= nums[i] <= 30\n- The product of any prefix or suffix of nums is guaranteed to fit in a 32-bit integer.`,
    difficulty: "medium",
    testCases: [
      { input: "1 2 3 4", expectedOutput: "24 12 8 6", isExample: true },
      { input: "-1 1 0 -3 3", expectedOutput: "0 0 9 0 0", isExample: true },
      { input: "2 3 0 0", expectedOutput: "0 0 0 0", isExample: true },
      { input: "5 9 2 -1", expectedOutput: "-18 -10 -45 90", isExample: false },
      { input: "1 1 1 1 1", expectedOutput: "1 1 1 1 1", isExample: false },
      { input: "-1 -1 -1 -1", expectedOutput: "-1 -1 -1 -1", isExample: false },
      { input: "0 0", expectedOutput: "0 0", isExample: false },
      { input: "2 2", expectedOutput: "2 2", isExample: false },
      { input: "10 5", expectedOutput: "5 10", isExample: false },
      { input: "1 -1 1 -1 1 -1", expectedOutput: "-1 1 -1 1 -1 1", isExample: false }
    ],
    starterCode: {
      python: pythonBase,
      javascript: jsBase,
      cpp: `vector<int> productExceptSelf(vector<int>& nums) {\n    // Write your solution here\n    \n}`,
    },
    driverCode: {
      python: "",
      javascript: "",
      cpp: `\n// --- Hidden Driver Code ---\n#include <iostream>\n#include <vector>\nusing namespace std;\nint main() {\n    vector<int> nums;\n    int n;\n    while (std::cin >> n) {\n        nums.push_back(n);\n    }\n    vector<int> res = productExceptSelf(nums);\n    for(int i=0; i<res.size(); i++) {\n        std::cout << res[i] << (i == res.size()-1 ? "" : " ");\n    }\n    std::cout << "\\n";\n    return 0;\n}`,
    },
    minElo: 800,
  },
  {
    title: "Valid Sudoku",
    description: `# Valid Sudoku\n\nDetermine if a \`9 x 9\` Sudoku board is valid. Only the filled cells need to be validated according to the following rules:\n1. Each row must contain the digits \`1-9\` without repetition.\n2. Each column must contain the digits \`1-9\` without repetition.\n3. Each of the nine \`3 x 3\` sub-boxes of the grid must contain the digits \`1-9\` without repetition.\n\nNote: A Sudoku board (partially filled) could be valid but is not necessarily solvable. Only the filled cells need to be validated.\n\n*Note: The input provides exactly 81 strings representing the rows of the 9x9 board. Empty cells are denoted by \`.\`.*\n\n## Examples\n\n**Input:** \n5 3 . . 7 . . . .\n6 . . 1 9 5 . . .\n. 9 8 . . . . 6 .\n8 . . . 6 . . . 3\n4 . . 8 . 3 . . 1\n7 . . . 2 . . . 6\n. 6 . . . . 2 8 .\n. . . 4 1 9 . . 5\n. . . . 8 . . 7 9\n**Output:** true\n\n## Constraints\n- board.length == 9\n- board[i].length == 9\n- board[i][j] is a digit 1-9 or '.'`,
    difficulty: "medium",
    testCases: [
      { input: "5 3 . . 7 . . . . 6 . . 1 9 5 . . . . 9 8 . . . . 6 . 8 . . . 6 . . . 3 4 . . 8 . 3 . . 1 7 . . . 2 . . . 6 . 6 . . . . 2 8 . . . . 4 1 9 . . 5 . . . . 8 . . 7 9", expectedOutput: "true", isExample: true },
      { input: "8 3 . . 7 . . . . 6 . . 1 9 5 . . . . 9 8 . . . . 6 . 8 . . . 6 . . . 3 4 . . 8 . 3 . . 1 7 . . . 2 . . . 6 . 6 . . . . 2 8 . . . . 4 1 9 . . 5 . . . . 8 . . 7 9", expectedOutput: "false", isExample: true },
      { input: ". . . . 5 . . 1 . . 4 . 3 . . . . . . . . . . 3 . . 1 8 . . . . 2 . . . . . . 9 . . . . . . . . 8 . . . . . 3 6 . . . . . . . . 2 . . 7 . . . . 1 . . 2 . . . 8 . . .", expectedOutput: "false", isExample: false },
      { input: ". . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .", expectedOutput: "true", isExample: false },
      { input: "1 2 3 4 5 6 7 8 9 . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .", expectedOutput: "true", isExample: false },
      { input: "1 2 3 4 5 6 7 8 9 1 . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .", expectedOutput: "false", isExample: false },
      { input: "1 . . . . . . . . 2 . . . . . . . . 3 . . . . . . . . 4 . . . . . . . . 5 . . . . . . . . 6 . . . . . . . . 7 . . . . . . . . 8 . . . . . . . . 9 . . . . . . . .", expectedOutput: "true", isExample: false },
      { input: "1 . . . . . . . . 1 . . . . . . . . 3 . . . . . . . . 4 . . . . . . . . 5 . . . . . . . . 6 . . . . . . . . 7 . . . . . . . . 8 . . . . . . . . 9 . . . . . . . .", expectedOutput: "false", isExample: false },
      { input: "1 2 3 . . . . . . 4 5 6 . . . . . . 7 8 9 . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .", expectedOutput: "true", isExample: false },
      { input: "1 2 3 . . . . . . 4 5 6 . . . . . . 7 8 1 . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .", expectedOutput: "false", isExample: false }
    ],
    starterCode: {
      python: pythonBase,
      javascript: jsBase,
      cpp: `bool isValidSudoku(vector<vector<char>>& board) {\n    // Write your solution here\n    \n}`,
    },
    driverCode: {
      python: "",
      javascript: "",
      cpp: `\n// --- Hidden Driver Code ---\n#include <iostream>\n#include <vector>\n#include <string>\nusing namespace std;\nint main() {\n    vector<vector<char>> board(9, vector<char>(9));\n    for (int i=0; i<9; i++) {\n        for (int j=0; j<9; j++) {\n            string s;\n            if (std::cin >> s) board[i][j] = s[0];\n        }\n    }\n    std::cout << (isValidSudoku(board) ? "true" : "false") << "\\n";\n    return 0;\n}`,
    },
    minElo: 800,
  },
  {
    title: "Longest Consecutive Sequence",
    description: `# Longest Consecutive Sequence\n\nGiven an unsorted array of integers \`nums\`, return the length of the longest consecutive elements sequence.\n\nYou must write an algorithm that runs in \`O(n)\` time.\n\n## Examples\n\n**Input:** 100 4 200 1 3 2\n**Output:** 4\n*Explanation:* The longest consecutive elements sequence is [1, 2, 3, 4]. Therefore its length is 4.\n\n**Input:** 0 3 7 2 5 8 4 6 0 1\n**Output:** 9\n\n**Input:** \n**Output:** 0\n\n## Constraints\n- 0 <= nums.length <= 10^5\n- -10^9 <= nums[i] <= 10^9`,
    difficulty: "medium",
    testCases: [
      { input: "100 4 200 1 3 2", expectedOutput: "4", isExample: true },
      { input: "0 3 7 2 5 8 4 6 0 1", expectedOutput: "9", isExample: true },
      { input: "", expectedOutput: "0", isExample: true },
      { input: "9 1 4 7 3 -1 0 5 8 -1 6", expectedOutput: "7", isExample: false },
      { input: "1 2 0 1", expectedOutput: "3", isExample: false },
      { input: "1", expectedOutput: "1", isExample: false },
      { input: "0", expectedOutput: "1", isExample: false },
      { input: "1000000000", expectedOutput: "1", isExample: false },
      { input: "2 2 2 2 2", expectedOutput: "1", isExample: false },
      { input: "10 9 8 7 6 5 4 3 2 1", expectedOutput: "10", isExample: false }
    ],
    starterCode: {
      python: pythonBase,
      javascript: jsBase,
      cpp: `int longestConsecutive(vector<int>& nums) {\n    // Write your solution here\n    \n}`,
    },
    driverCode: {
      python: "",
      javascript: "",
      cpp: `\n// --- Hidden Driver Code ---\n#include <iostream>\n#include <vector>\nusing namespace std;\nint main() {\n    vector<int> nums;\n    int n;\n    while (std::cin >> n) {\n        nums.push_back(n);\n    }\n    std::cout << longestConsecutive(nums) << "\\n";\n    return 0;\n}`,
    },
    minElo: 800,
  },
  {
    title: "Find the Duplicate Number",
    description: `# Find the Duplicate Number\n\nGiven an array of integers \`nums\` containing \`n + 1\` integers where each integer is in the range \`[1, n]\` inclusive.\n\nThere is only **one repeated number** in \`nums\`, return this repeated number.\n\nYou must solve the problem **without** modifying the array \`nums\` and uses only constant extra space.\n\n## Examples\n\n**Input:** 1 3 4 2 2\n**Output:** 2\n\n**Input:** 3 1 3 4 2\n**Output:** 3\n\n**Input:** 3 3 3 3 3\n**Output:** 3\n\n## Constraints\n- 1 <= n <= 10^5\n- nums.length == n + 1\n- 1 <= nums[i] <= n\n- All the integers in nums appear only once except for precisely one integer which appears two or more times.`,
    difficulty: "medium",
    testCases: [
      { input: "1 3 4 2 2", expectedOutput: "2", isExample: true },
      { input: "3 1 3 4 2", expectedOutput: "3", isExample: true },
      { input: "3 3 3 3 3", expectedOutput: "3", isExample: true },
      { input: "2 2 2 2 2", expectedOutput: "2", isExample: false },
      { input: "1 4 4 2 4", expectedOutput: "4", isExample: false },
      { input: "1 1", expectedOutput: "1", isExample: false },
      { input: "1 1 2", expectedOutput: "1", isExample: false },
      { input: "2 1 2", expectedOutput: "2", isExample: false },
      { input: "8 7 6 5 4 3 2 1 5", expectedOutput: "5", isExample: false },
      { input: "4 3 1 4 2", expectedOutput: "4", isExample: false }
    ],
    starterCode: {
      python: pythonBase,
      javascript: jsBase,
      cpp: `int findDuplicate(vector<int>& nums) {\n    // Write your solution here\n    \n}`,
    },
    driverCode: {
      python: "",
      javascript: "",
      cpp: `\n// --- Hidden Driver Code ---\n#include <iostream>\n#include <vector>\nusing namespace std;\nint main() {\n    vector<int> nums;\n    int n;\n    while (std::cin >> n) {\n        nums.push_back(n);\n    }\n    std::cout << findDuplicate(nums) << "\\n";\n    return 0;\n}`,
    },
    minElo: 800,
  },
  {
    title: "First Missing Positive",
    description: `# First Missing Positive\n\nGiven an unsorted integer array \`nums\`, return the smallest missing positive integer.\n\nYou must implement an algorithm that runs in \`O(n)\` time and uses \`O(1)\` auxiliary space.\n\n## Examples\n\n**Input:** 1 2 0\n**Output:** 3\n*Explanation:* The numbers in the range [1,2] are all in the array.\n\n**Input:** 3 4 -1 1\n**Output:** 2\n*Explanation:* 1 is in the array but 2 is missing.\n\n**Input:** 7 8 9 11 12\n**Output:** 1\n*Explanation:* The smallest positive integer 1 is missing.\n\n## Constraints\n- 1 <= nums.length <= 10^5\n- -2^31 <= nums[i] <= 2^31 - 1`,
    difficulty: "hard",
    testCases: [
      { input: "1 2 0", expectedOutput: "3", isExample: true },
      { input: "3 4 -1 1", expectedOutput: "2", isExample: true },
      { input: "7 8 9 11 12", expectedOutput: "1", isExample: true },
      { input: "1", expectedOutput: "2", isExample: false },
      { input: "2", expectedOutput: "1", isExample: false },
      { input: "-5 -10 -20", expectedOutput: "1", isExample: false },
      { input: "1 2 3 4 5", expectedOutput: "6", isExample: false },
      { input: "2 1", expectedOutput: "3", isExample: false },
      { input: "2147483647", expectedOutput: "1", isExample: false },
      { input: "10 9 8 7 6 5 4 3 2 1", expectedOutput: "11", isExample: false }
    ],
    starterCode: {
      python: pythonBase,
      javascript: jsBase,
      cpp: `int firstMissingPositive(vector<int>& nums) {\n    // Write your solution here\n    \n}`,
    },
    driverCode: {
      python: "",
      javascript: "",
      cpp: `\n// --- Hidden Driver Code ---\n#include <iostream>\n#include <vector>\nusing namespace std;\nint main() {\n    vector<int> nums;\n    int n;\n    while (std::cin >> n) {\n        nums.push_back(n);\n    }\n    std::cout << firstMissingPositive(nums) << "\\n";\n    return 0;\n}`,
    },
    minElo: 1200,
  },
  {
    title: "Happy Number",
    description: `# Happy Number\n\nWrite an algorithm to determine if a number \`n\` is happy.\n\nA **happy number** is a number defined by the following process:\n- Starting with any positive integer, replace the number by the sum of the squares of its digits.\n- Repeat the process until the number equals 1 (where it will stay), or it **loops endlessly in a cycle** which does not include 1.\n- Those numbers for which this process ends in 1 are happy.\n\nReturn \`true\` if \`n\` is a happy number, and \`false\` if not.\n\n## Examples\n\n**Input:** 19\n**Output:** true\n*Explanation:*\n1^2 + 9^2 = 82\n8^2 + 2^2 = 68\n6^2 + 8^2 = 100\n1^2 + 0^2 + 0^2 = 1\n\n**Input:** 2\n**Output:** false\n\n## Constraints\n- 1 <= n <= 2^31 - 1`,
    difficulty: "easy",
    testCases: [
      { input: "19", expectedOutput: "true", isExample: true },
      { input: "2", expectedOutput: "false", isExample: true },
      { input: "7", expectedOutput: "true", isExample: true },
      { input: "1", expectedOutput: "true", isExample: false },
      { input: "4", expectedOutput: "false", isExample: false },
      { input: "1111111", expectedOutput: "true", isExample: false },
      { input: "999999", expectedOutput: "false", isExample: false },
      { input: "100", expectedOutput: "true", isExample: false },
      { input: "20", expectedOutput: "false", isExample: false },
      { input: "10", expectedOutput: "true", isExample: false }
    ],
    starterCode: {
      python: pythonBase,
      javascript: jsBase,
      cpp: `bool isHappy(int n) {\n    // Write your solution here\n    \n}`,
    },
    driverCode: {
      python: "",
      javascript: "",
      cpp: `\n// --- Hidden Driver Code ---\n#include <iostream>\nusing namespace std;\nint main() {\n    int n;\n    if (std::cin >> n) {\n        std::cout << (isHappy(n) ? "true" : "false") << "\\n";\n    }\n    return 0;\n}`,
    },
    minElo: 0,
  },
  {
    title: "Plus One",
    description: `# Plus One\n\nYou are given a **large integer** represented as an integer array \`digits\`, where each \`digits[i]\` is the \`i\`th digit of the integer. The digits are ordered from most significant to least significant in left-to-right order. The large integer does not contain any leading \`0\`'s.\n\nIncrement the large integer by one and return the resulting array of digits.\n\n## Examples\n\n**Input:** 1 2 3\n**Output:** 1 2 4\n*Explanation:* The array represents the integer 123. Incrementing by one gives 124.\n\n**Input:** 4 3 2 1\n**Output:** 4 3 2 2\n*Explanation:* The array represents the integer 4321. Incrementing by one gives 4322.\n\n**Input:** 9\n**Output:** 1 0\n*Explanation:* The array represents the integer 9. Incrementing by one gives 10.\n\n## Constraints\n- 1 <= digits.length <= 100\n- 0 <= digits[i] <= 9\n- digits does not contain any leading 0's.`,
    difficulty: "easy",
    testCases: [
      { input: "1 2 3", expectedOutput: "1 2 4", isExample: true },
      { input: "4 3 2 1", expectedOutput: "4 3 2 2", isExample: true },
      { input: "9", expectedOutput: "1 0", isExample: true },
      { input: "0", expectedOutput: "1", isExample: false },
      { input: "9 9", expectedOutput: "1 0 0", isExample: false },
      { input: "9 9 9", expectedOutput: "1 0 0 0", isExample: false },
      { input: "8 9 9 9", expectedOutput: "9 0 0 0", isExample: false },
      { input: "9 8 7 6 5 4 3 2 1 0", expectedOutput: "9 8 7 6 5 4 3 2 1 1", isExample: false },
      { input: "1 0 0 0 0", expectedOutput: "1 0 0 0 1", isExample: false },
      { input: "2 9 9 9", expectedOutput: "3 0 0 0", isExample: false }
    ],
    starterCode: {
      python: pythonBase,
      javascript: jsBase,
      cpp: `vector<int> plusOne(vector<int>& digits) {\n    // Write your solution here\n    \n}`,
    },
    driverCode: {
      python: "",
      javascript: "",
      cpp: `\n// --- Hidden Driver Code ---\n#include <iostream>\n#include <vector>\nusing namespace std;\nint main() {\n    vector<int> nums;\n    int n;\n    while (std::cin >> n) {\n        nums.push_back(n);\n    }\n    vector<int> res = plusOne(nums);\n    for(int i=0; i<res.size(); i++) {\n        std::cout << res[i] << (i == res.size()-1 ? "" : " ");\n    }\n    std::cout << "\\n";\n    return 0;\n}`,
    },
    minElo: 0,
  },
  {
    title: "Pow(x, n)",
    description: `# Pow(x, n)\n\nImplement \`pow(x, n)\`, which calculates \`x\` raised to the power \`n\` (i.e., \`x^n\`).\n\n*Note: The input format provides the double \`x\` followed by the integer \`n\`.*\n\n## Examples\n\n**Input:** 2.00000 10\n**Output:** 1024\n\n**Input:** 2.10000 3\n**Output:** 9.261\n\n**Input:** 2.00000 -2\n**Output:** 0.25\n*Explanation:* 2^-2 = 1/2^2 = 1/4 = 0.25\n\n## Constraints\n- -100.0 < x < 100.0\n- -2^31 <= n <= 2^31-1\n- n is an integer.\n- Either x is not zero or n > 0.\n- -10^4 <= x^n <= 10^4`,
    difficulty: "medium",
    testCases: [
      { input: "2.00000 10", expectedOutput: "1024", isExample: true },
      { input: "2.10000 3", expectedOutput: "9.261", isExample: true },
      { input: "2.00000 -2", expectedOutput: "0.25", isExample: true },
      { input: "1.00000 2147483647", expectedOutput: "1", isExample: false },
      { input: "-1.00000 2147483647", expectedOutput: "-1", isExample: false },
      { input: "2.00000 0", expectedOutput: "1", isExample: false },
      { input: "-2.00000 2", expectedOutput: "4", isExample: false },
      { input: "0.00001 2147483647", expectedOutput: "0", isExample: false },
      { input: "3.00000 4", expectedOutput: "81", isExample: false },
      { input: "-2.00000 -3", expectedOutput: "-0.125", isExample: false }
    ],
    starterCode: {
      python: pythonBase,
      javascript: jsBase,
      cpp: `double myPow(double x, int n) {\n    // Write your solution here\n    \n}`,
    },
    driverCode: {
      python: "",
      javascript: "",
      cpp: `\n// --- Hidden Driver Code ---\n#include <iostream>\n#include <iomanip>\n#include <cmath>\nusing namespace std;\nint main() {\n    double x;\n    int n;\n    if (std::cin >> x >> n) {\n        double ans = myPow(x, n);\n        // Match exact output format\n        if (abs(ans - round(ans)) < 1e-9) std::cout << (long long)round(ans) << "\\n";\n        else std::cout << ans << "\\n";\n    }\n    return 0;\n}`,
    },
    minElo: 800,
  },
  {
    title: "Multiply Strings",
    description: `# Multiply Strings\n\nGiven two non-negative integers \`num1\` and \`num2\` represented as strings, return the product of \`num1\` and \`num2\`, also represented as a string.\n\n**Note:** You must not use any built-in BigInteger library or convert the inputs to integer directly.\n\n*Note: The input format is exactly two strings separated by a space.*\n\n## Examples\n\n**Input:** 2 3\n**Output:** 6\n\n**Input:** 123 456\n**Output:** 56088\n\n**Input:** 0 1000\n**Output:** 0\n\n## Constraints\n- 1 <= num1.length, num2.length <= 200\n- num1 and num2 consist of digits only.\n- Both num1 and num2 do not contain any leading zero, except the number 0 itself.`,
    difficulty: "medium",
    testCases: [
      { input: "2 3", expectedOutput: "6", isExample: true },
      { input: "123 456", expectedOutput: "56088", isExample: true },
      { input: "0 1000", expectedOutput: "0", isExample: true },
      { input: "999 999", expectedOutput: "998001", isExample: false },
      { input: "1 1", expectedOutput: "1", isExample: false },
      { input: "10 10", expectedOutput: "100", isExample: false },
      { input: "9 9", expectedOutput: "81", isExample: false },
      { input: "123456789 987654321", expectedOutput: "121932631112635269", isExample: false },
      { input: "99999 0", expectedOutput: "0", isExample: false },
      { input: "10000000 10000000", expectedOutput: "100000000000000", isExample: false }
    ],
    starterCode: {
      python: pythonBase,
      javascript: jsBase,
      cpp: `string multiply(string num1, string num2) {\n    // Write your solution here\n    \n}`,
    },
    driverCode: {
      python: "",
      javascript: "",
      cpp: `\n// --- Hidden Driver Code ---\n#include <iostream>\n#include <string>\nusing namespace std;\nint main() {\n    string num1, num2;\n    if (std::cin >> num1 >> num2) {\n        std::cout << multiply(num1, num2) << "\\n";\n    }\n    return 0;\n}`,
    },
    minElo: 800,
  },
  {
    title: "Maximum Subarray",
    description: `# Maximum Subarray\n\nGiven an integer array \`nums\`, find the subarray with the largest sum, and return its sum.\n\n## Examples\n\n**Input:** -2 1 -3 4 -1 2 1 -5 4\n**Output:** 6\n*Explanation:* The subarray [4,-1,2,1] has the largest sum 6.\n\n**Input:** 1\n**Output:** 1\n*Explanation:* The subarray [1] has the largest sum 1.\n\n**Input:** 5 4 -1 7 8\n**Output:** 23\n*Explanation:* The subarray [5,4,-1,7,8] has the largest sum 23.\n\n## Constraints\n- 1 <= nums.length <= 10^5\n- -10^4 <= nums[i] <= 10^4`,
    difficulty: "medium",
    testCases: [
      { input: "-2 1 -3 4 -1 2 1 -5 4", expectedOutput: "6", isExample: true },
      { input: "1", expectedOutput: "1", isExample: true },
      { input: "5 4 -1 7 8", expectedOutput: "23", isExample: true },
      { input: "-1", expectedOutput: "-1", isExample: false },
      { input: "-5 -2 -1 -3", expectedOutput: "-1", isExample: false },
      { input: "0", expectedOutput: "0", isExample: false },
      { input: "1 2 3 4 5", expectedOutput: "15", isExample: false },
      { input: "8 -19 5 -4 20", expectedOutput: "21", isExample: false },
      { input: "-2 -1", expectedOutput: "-1", isExample: false },
      { input: "3 1 -2 4 1 -10 5 2 3", expectedOutput: "10", isExample: false }
    ],
    starterCode: {
      python: pythonBase,
      javascript: jsBase,
      cpp: `int maxSubArray(vector<int>& nums) {\n    // Write your solution here\n    \n}`,
    },
    driverCode: {
      python: "",
      javascript: "",
      cpp: `\n// --- Hidden Driver Code ---\n#include <iostream>\n#include <vector>\nusing namespace std;\nint main() {\n    vector<int> nums;\n    int n;\n    while (std::cin >> n) {\n        nums.push_back(n);\n    }\n    std::cout << maxSubArray(nums) << "\\n";\n    return 0;\n}`,
    },
    minElo: 800,
  }
];
