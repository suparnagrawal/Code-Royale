import { Problem } from "./problems-data";

const pythonBase = `import sys\n\ndef solve():\n    input_data = sys.stdin.read().split()\n    if not input_data: return\n    pass\n\nif __name__ == '__main__':\n    solve()`;
const jsBase = `const fs = require('fs');\n\nfunction solve() {\n    const input = fs.readFileSync('/dev/stdin', 'utf-8').trim().split(/\\s+/);\n    if (!input[0]) return;\n}\n\nsolve();`;

export const seedProblemsBatch11: Problem[] = [
  {
    title: "Word Break",
    description: `# Word Break\n\nGiven a string \`s\` and a dictionary of strings \`wordDict\`, return \`true\` if \`s\` can be segmented into a space-separated sequence of one or more dictionary words.\n\nNote that the same word in the dictionary may be reused multiple times in the segmentation.\n\n*Note: The input provides the string \`s\`, followed by \`n\` (number of words in dict), followed by the \`n\` dictionary words.*\n\n## Examples\n\n**Input:** leetcode 2 leet code\n**Output:** true\n*Explanation:* Return true because "leetcode" can be segmented as "leet code".\n\n**Input:** applepenapple 2 apple pen\n**Output:** true\n*Explanation:* Return true because "applepenapple" can be segmented as "apple pen apple". Note that you are allowed to reuse a dictionary word.\n\n**Input:** catsandog 5 cats dog sand and cat\n**Output:** false\n\n## Constraints\n- 1 <= s.length <= 300\n- 1 <= wordDict.length <= 1000\n- 1 <= wordDict[i].length <= 20\n- s and wordDict[i] consist of only lowercase English letters.\n- All the strings of wordDict are unique.`,
    difficulty: "medium",
    testCases: [
      { input: "leetcode 2 leet code", expectedOutput: "true", isExample: true },
      { input: "applepenapple 2 apple pen", expectedOutput: "true", isExample: true },
      { input: "catsandog 5 cats dog sand and cat", expectedOutput: "false", isExample: true },
      { input: "a 1 a", expectedOutput: "true", isExample: false },
      { input: "ab 1 a", expectedOutput: "false", isExample: false },
      { input: "abcd 2 a abc", expectedOutput: "false", isExample: false },
      { input: "abcd 3 a abc d", expectedOutput: "true", isExample: false },
      { input: "aaaaaaa 2 aaaa aaa", expectedOutput: "true", isExample: false },
      { input: "aaaaaaaa 2 aaaa aaa", expectedOutput: "true", isExample: false },
      { input: "aaaaaaaaa 2 aaaa aaa", expectedOutput: "true", isExample: false }
    ],
    starterCode: {
      python: pythonBase,
      javascript: jsBase,
      cpp: `bool wordBreak(string s, vector<string>& wordDict) {\n    // Write your solution here\n    \n}`,
    },
    driverCode: {
      python: "",
      javascript: "",
      cpp: `\n// --- Hidden Driver Code ---\n#include <iostream>\n#include <vector>\n#include <string>\nusing namespace std;\nint main() {\n    string s;\n    if (std::cin >> s) {\n        int n;\n        std::cin >> n;\n        vector<string> dict(n);\n        for(int i=0; i<n; i++) std::cin >> dict[i];\n        std::cout << (wordBreak(s, dict) ? "true" : "false") << "\\n";\n    }\n    return 0;\n}`,
    },
    minElo: 800,
  },
  {
    title: "Partition Equal Subset Sum",
    description: `# Partition Equal Subset Sum\n\nGiven an integer array \`nums\`, return \`true\` if you can partition the array into two subsets such that the sum of the elements in both subsets is equal or \`false\` otherwise.\n\n## Examples\n\n**Input:** 4 1 5 11 5\n**Output:** true\n*Explanation:* The array can be partitioned as [1, 5, 5] and [11].\n\n**Input:** 4 1 2 3 5\n**Output:** false\n*Explanation:* The array cannot be partitioned into equal sum subsets.\n\n**Input:** 2 1 1\n**Output:** true\n\n## Constraints\n- 1 <= nums.length <= 200\n- 1 <= nums[i] <= 100`,
    difficulty: "medium",
    testCases: [
      { input: "4 1 5 11 5", expectedOutput: "true", isExample: true },
      { input: "4 1 2 3 5", expectedOutput: "false", isExample: true },
      { input: "2 1 1", expectedOutput: "true", isExample: true },
      { input: "1 1", expectedOutput: "false", isExample: false },
      { input: "3 1 2 3", expectedOutput: "true", isExample: false },
      { input: "3 1 2 4", expectedOutput: "false", isExample: false },
      { input: "5 1 1 1 1 4", expectedOutput: "true", isExample: false },
      { input: "5 2 2 3 5 6", expectedOutput: "false", isExample: false },
      { input: "6 1 2 3 4 5 6", expectedOutput: "false", isExample: false },
      { input: "6 1 2 3 4 5 5", expectedOutput: "true", isExample: false }
    ],
    starterCode: {
      python: pythonBase,
      javascript: jsBase,
      cpp: `bool canPartition(vector<int>& nums) {\n    // Write your solution here\n    \n}`,
    },
    driverCode: {
      python: "",
      javascript: "",
      cpp: `\n// --- Hidden Driver Code ---\n#include <iostream>\n#include <vector>\nusing namespace std;\nint main() {\n    vector<int> nums;\n    int n;\n    while (std::cin >> n) {\n        nums.push_back(n);\n    }\n    if(!nums.empty()) nums.erase(nums.begin()); // Remove length prefix if provided as format\n    // Wait, the input provides \`n\` as length, but my test cases format is: length, then elements.\n    // Since the loop reads all integers, \`nums[0]\` is actually the length.\n    if(!nums.empty()) nums.erase(nums.begin());\n    std::cout << (canPartition(nums) ? "true" : "false") << "\\n";\n    return 0;\n}`,
    },
    minElo: 800,
  },
  {
    title: "Unique Paths",
    description: `# Unique Paths\n\nThere is a robot on an \`m x n\` grid. The robot is initially located at the **top-left corner** (i.e., \`grid[0][0]\`). The robot tries to move to the **bottom-right corner** (i.e., \`grid[m - 1][n - 1]\`). The robot can only move either down or right at any point in time.\n\nGiven the two integers \`m\` and \`n\`, return the number of possible unique paths that the robot can take to reach the bottom-right corner.\n\nThe test cases are generated so that the answer will be less than or equal to \`2 * 10^9\`.\n\n## Examples\n\n**Input:** 3 7\n**Output:** 28\n\n**Input:** 3 2\n**Output:** 3\n*Explanation:* From the top-left corner, there are a total of 3 ways to reach the bottom-right corner:\n1. Right -> Down -> Down\n2. Down -> Down -> Right\n3. Down -> Right -> Down\n\n**Input:** 1 1\n**Output:** 1\n\n## Constraints\n- 1 <= m, n <= 100`,
    difficulty: "medium",
    testCases: [
      { input: "3 7", expectedOutput: "28", isExample: true },
      { input: "3 2", expectedOutput: "3", isExample: true },
      { input: "1 1", expectedOutput: "1", isExample: true },
      { input: "2 2", expectedOutput: "2", isExample: false },
      { input: "3 3", expectedOutput: "6", isExample: false },
      { input: "4 4", expectedOutput: "20", isExample: false },
      { input: "5 5", expectedOutput: "70", isExample: false },
      { input: "10 10", expectedOutput: "48620", isExample: false },
      { input: "1 100", expectedOutput: "1", isExample: false },
      { input: "10 1", expectedOutput: "1", isExample: false }
    ],
    starterCode: {
      python: pythonBase,
      javascript: jsBase,
      cpp: `int uniquePaths(int m, int n) {\n    // Write your solution here\n    \n}`,
    },
    driverCode: {
      python: "",
      javascript: "",
      cpp: `\n// --- Hidden Driver Code ---\n#include <iostream>\nusing namespace std;\nint main() {\n    int m, n;\n    if (std::cin >> m >> n) {\n        std::cout << uniquePaths(m, n) << "\\n";\n    }\n    return 0;\n}`,
    },
    minElo: 800,
  },
  {
    title: "Longest Common Subsequence",
    description: `# Longest Common Subsequence\n\nGiven two strings \`text1\` and \`text2\`, return the length of their longest **common subsequence**. If there is no common subsequence, return \`0\`.\n\nA **subsequence** of a string is a new string generated from the original string with some characters (can be none) deleted without changing the relative order of the remaining characters.\n- For example, \`"ace"\` is a subsequence of \`"abcde"\`.\n\nA **common subsequence** of two strings is a subsequence that is common to both strings.\n\n## Examples\n\n**Input:** abcde ace\n**Output:** 3  \n*Explanation:* The longest common subsequence is "ace" and its length is 3.\n\n**Input:** abc abc\n**Output:** 3\n*Explanation:* The longest common subsequence is "abc" and its length is 3.\n\n**Input:** abc def\n**Output:** 0\n*Explanation:* There is no such common subsequence, so the result is 0.\n\n## Constraints\n- 1 <= text1.length, text2.length <= 1000\n- text1 and text2 consist of only lowercase English characters.`,
    difficulty: "medium",
    testCases: [
      { input: "abcde ace", expectedOutput: "3", isExample: true },
      { input: "abc abc", expectedOutput: "3", isExample: true },
      { input: "abc def", expectedOutput: "0", isExample: true },
      { input: "a a", expectedOutput: "1", isExample: false },
      { input: "ab ab", expectedOutput: "2", isExample: false },
      { input: "abcde bcd", expectedOutput: "3", isExample: false },
      { input: "xyzxyz xxyz", expectedOutput: "4", isExample: false },
      { input: "aggtab gxtxayb", expectedOutput: "4", isExample: false },
      { input: "aaab baaa", expectedOutput: "3", isExample: false },
      { input: "abcdefghijklmnopqrstuvwxyz zyxwvutsrqponmlkjihgfedcba", expectedOutput: "1", isExample: false }
    ],
    starterCode: {
      python: pythonBase,
      javascript: jsBase,
      cpp: `int longestCommonSubsequence(string text1, string text2) {\n    // Write your solution here\n    \n}`,
    },
    driverCode: {
      python: "",
      javascript: "",
      cpp: `\n// --- Hidden Driver Code ---\n#include <iostream>\n#include <string>\nusing namespace std;\nint main() {\n    string t1, t2;\n    if (std::cin >> t1 >> t2) {\n        std::cout << longestCommonSubsequence(t1, t2) << "\\n";\n    }\n    return 0;\n}`,
    },
    minElo: 800,
  },
  {
    title: "Best Time to Buy and Sell Stock with Cooldown",
    description: `# Best Time to Buy and Sell Stock with Cooldown\n\nYou are given an array \`prices\` where \`prices[i]\` is the price of a given stock on the \`i\`th day.\n\nFind the maximum profit you can achieve. You may complete as many transactions as you like (i.e., buy one and sell one share of the stock multiple times) with the following restrictions:\n- After you sell your stock, you cannot buy stock on the next day (i.e., cooldown one day).\n\n**Note:** You may not engage in multiple transactions simultaneously (i.e., you must sell the stock before you buy again).\n\n## Examples\n\n**Input:** 5 1 2 3 0 2\n**Output:** 3\n*Explanation:* transactions = [buy, sell, cooldown, buy, sell]\n\n**Input:** 1 1\n**Output:** 0\n\n## Constraints\n- 1 <= prices.length <= 5000\n- 0 <= prices[i] <= 1000`,
    difficulty: "medium",
    testCases: [
      { input: "5 1 2 3 0 2", expectedOutput: "3", isExample: true },
      { input: "1 1", expectedOutput: "0", isExample: true },
      { input: "2 1 2", expectedOutput: "1", isExample: false },
      { input: "3 1 2 3", expectedOutput: "2", isExample: false },
      { input: "4 3 2 1 0", expectedOutput: "0", isExample: false },
      { input: "6 6 1 3 2 4 7", expectedOutput: "6", isExample: false },
      { input: "5 1 4 2 7 9", expectedOutput: "10", isExample: false },
      { input: "7 1 2 3 4 5 6 7", expectedOutput: "6", isExample: false },
      { input: "8 2 1 4 5 2 9 7 8", expectedOutput: "11", isExample: false },
      { input: "4 10 20 30 40", expectedOutput: "30", isExample: false }
    ],
    starterCode: {
      python: pythonBase,
      javascript: jsBase,
      cpp: `int maxProfit(vector<int>& prices) {\n    // Write your solution here\n    \n}`,
    },
    driverCode: {
      python: "",
      javascript: "",
      cpp: `\n// --- Hidden Driver Code ---\n#include <iostream>\n#include <vector>\nusing namespace std;\nint main() {\n    vector<int> nums;\n    int n;\n    while (std::cin >> n) {\n        nums.push_back(n);\n    }\n    if(!nums.empty()) nums.erase(nums.begin());\n    std::cout << maxProfit(nums) << "\\n";\n    return 0;\n}`,
    },
    minElo: 800,
  },
  {
    title: "Coin Change II",
    description: `# Coin Change II\n\nYou are given an integer array \`coins\` representing coins of different denominations and an integer \`amount\` representing a total amount of money.\n\nReturn the number of combinations that make up that amount. If that amount of money cannot be made up by any combination of the coins, return \`0\`.\n\nYou may assume that you have an infinite number of each kind of coin.\n\nThe answer is guaranteed to fit into a signed 32-bit integer.\n\n*Note: The input format provides exactly \`amount\`, then \`n\` (number of coins), followed by the \`coins\` array.*\n\n## Examples\n\n**Input:** 5 3 1 2 5\n**Output:** 4\n*Explanation:* there are four ways to make up the amount:\n5=5\n5=2+2+1\n5=2+1+1+1\n5=1+1+1+1+1\n\n**Input:** 3 1 2\n**Output:** 0\n*Explanation:* the amount of 3 cannot be made up just with coins of 2.\n\n**Input:** 10 1 10\n**Output:** 1\n\n## Constraints\n- 1 <= coins.length <= 300\n- 1 <= coins[i] <= 5000\n- All the values of coins are unique.\n- 0 <= amount <= 5000`,
    difficulty: "medium",
    testCases: [
      { input: "5 3 1 2 5", expectedOutput: "4", isExample: true },
      { input: "3 1 2", expectedOutput: "0", isExample: true },
      { input: "10 1 10", expectedOutput: "1", isExample: true },
      { input: "0 1 1", expectedOutput: "1", isExample: false },
      { input: "1 1 1", expectedOutput: "1", isExample: false },
      { input: "4 3 1 2 3", expectedOutput: "4", isExample: false },
      { input: "10 4 1 2 3 4", expectedOutput: "23", isExample: false },
      { input: "15 3 5 10 15", expectedOutput: "4", isExample: false },
      { input: "20 4 1 5 10 25", expectedOutput: "29", isExample: false },
      { input: "100 1 1", expectedOutput: "1", isExample: false }
    ],
    starterCode: {
      python: pythonBase,
      javascript: jsBase,
      cpp: `int change(int amount, vector<int>& coins) {\n    // Write your solution here\n    \n}`,
    },
    driverCode: {
      python: "",
      javascript: "",
      cpp: `\n// --- Hidden Driver Code ---\n#include <iostream>\n#include <vector>\nusing namespace std;\nint main() {\n    int amount, n;\n    if (std::cin >> amount >> n) {\n        vector<int> coins(n);\n        for(int i=0; i<n; i++) std::cin >> coins[i];\n        std::cout << change(amount, coins) << "\\n";\n    }\n    return 0;\n}`,
    },
    minElo: 800,
  },
  {
    title: "Target Sum",
    description: `# Target Sum\n\nYou are given an integer array \`nums\` and an integer \`target\`.\n\nYou want to build an **expression** out of nums by adding one of the symbols \`'+'\` and \`'-'\` before each integer in nums and then concatenate all the integers.\n- For example, if \`nums = [2, 1]\`, you can add a \`'+'\` before \`2\` and a \`'-'\` before \`1\` and concatenate them to build the expression \`"+2-1"\`.\n\nReturn the number of different **expressions** that you can build, which evaluates to \`target\`.\n\n*Note: The input provides exactly \`n\` (length of array), followed by the \`nums\` elements, followed by \`target\`.*\n\n## Examples\n\n**Input:** 5 1 1 1 1 1 3\n**Output:** 5\n*Explanation:* There are 5 ways to assign symbols to make the sum of nums be target 3.\n-1 + 1 + 1 + 1 + 1 = 3\n+1 - 1 + 1 + 1 + 1 = 3\n+1 + 1 - 1 + 1 + 1 = 3\n+1 + 1 + 1 - 1 + 1 = 3\n+1 + 1 + 1 + 1 - 1 = 3\n\n**Input:** 1 1 1\n**Output:** 1\n\n## Constraints\n- 1 <= nums.length <= 20\n- 0 <= nums[i] <= 1000\n- 0 <= sum(nums[i]) <= 1000\n- -1000 <= target <= 1000`,
    difficulty: "medium",
    testCases: [
      { input: "5 1 1 1 1 1 3", expectedOutput: "5", isExample: true },
      { input: "1 1 1", expectedOutput: "1", isExample: true },
      { input: "1 1 2", expectedOutput: "0", isExample: false },
      { input: "2 1 1 0", expectedOutput: "2", isExample: false },
      { input: "3 1 2 3 6", expectedOutput: "1", isExample: false },
      { input: "3 1 2 3 0", expectedOutput: "2", isExample: false },
      { input: "4 1 2 3 4 2", expectedOutput: "2", isExample: false },
      { input: "5 0 0 0 0 0 0", expectedOutput: "32", isExample: false },
      { input: "5 1 2 3 4 5 15", expectedOutput: "1", isExample: false },
      { input: "6 1 0 1 0 1 0 3", expectedOutput: "8", isExample: false }
    ],
    starterCode: {
      python: pythonBase,
      javascript: jsBase,
      cpp: `int findTargetSumWays(vector<int>& nums, int target) {\n    // Write your solution here\n    \n}`,
    },
    driverCode: {
      python: "",
      javascript: "",
      cpp: `\n// --- Hidden Driver Code ---\n#include <iostream>\n#include <vector>\nusing namespace std;\nint main() {\n    int n;\n    if (std::cin >> n) {\n        vector<int> nums(n);\n        for(int i=0; i<n; i++) std::cin >> nums[i];\n        int target;\n        std::cin >> target;\n        std::cout << findTargetSumWays(nums, target) << "\\n";\n    }\n    return 0;\n}`,
    },
    minElo: 800,
  },
  {
    title: "Interleaving String",
    description: `# Interleaving String\n\nGiven strings \`s1\`, \`s2\`, and \`s3\`, find whether \`s3\` is formed by an **interleaving** of \`s1\` and \`s2\`.\n\nAn **interleaving** of two strings \`s\` and \`t\` is a configuration where they are divided into non-empty substrings such that:\n- \`s = s1 + s2 + ... + sn\`\n- \`t = t1 + t2 + ... + tm\`\n- \`|n - m| <= 1\`\n- The interleaving is \`s1 + t1 + s2 + t2 + s3 + t3 + ...\` or \`t1 + s1 + t2 + s2 + t3 + s3 + ...\`\n\n**Note:** \`a + b\` is the concatenation of strings \`a\` and \`b\`.\n\n*Note: To handle empty strings via terminal input, use "EMPTY_STRING" to denote an empty string!*\n\n## Examples\n\n**Input:** aabcc dbbca aadbbcbcac\n**Output:** true\n*Explanation:* One way to obtain s3 is:\nSplit s1 into "aa" + "bc" + "c", and s2 into "dbbc" + "a".\nInterleaving the two splits, we get "aa" + "dbbc" + "bc" + "a" + "c" = "aadbbcbcac".\n\n**Input:** aabcc dbbca aadbbbaccc\n**Output:** false\n*Explanation:* Notice how it is impossible to interleave s2 with any other string to obtain s3.\n\n**Input:** EMPTY_STRING EMPTY_STRING EMPTY_STRING\n**Output:** true\n\n## Constraints\n- 0 <= s1.length, s2.length <= 100\n- 0 <= s3.length <= 200\n- s1, s2, and s3 consist of lowercase English letters.`,
    difficulty: "medium",
    testCases: [
      { input: "aabcc dbbca aadbbcbcac", expectedOutput: "true", isExample: true },
      { input: "aabcc dbbca aadbbbaccc", expectedOutput: "false", isExample: true },
      { input: "EMPTY_STRING EMPTY_STRING EMPTY_STRING", expectedOutput: "true", isExample: true },
      { input: "a EMPTY_STRING a", expectedOutput: "true", isExample: false },
      { input: "EMPTY_STRING a a", expectedOutput: "true", isExample: false },
      { input: "a b ab", expectedOutput: "true", isExample: false },
      { input: "a b ba", expectedOutput: "true", isExample: false },
      { input: "aabcc dbbca aadbcbbcac", expectedOutput: "true", isExample: false },
      { input: "abc def abdecf", expectedOutput: "true", isExample: false },
      { input: "abc def abdefc", expectedOutput: "false", isExample: false }
    ],
    starterCode: {
      python: pythonBase,
      javascript: jsBase,
      cpp: `bool isInterleave(string s1, string s2, string s3) {\n    // Write your solution here\n    \n}`,
    },
    driverCode: {
      python: "",
      javascript: "",
      cpp: `\n// --- Hidden Driver Code ---\n#include <iostream>\n#include <string>\nusing namespace std;\nint main() {\n    string s1, s2, s3;\n    if (std::cin >> s1 >> s2 >> s3) {\n        if (s1 == "EMPTY_STRING") s1 = "";\n        if (s2 == "EMPTY_STRING") s2 = "";\n        if (s3 == "EMPTY_STRING") s3 = "";\n        std::cout << (isInterleave(s1, s2, s3) ? "true" : "false") << "\\n";\n    }\n    return 0;\n}`,
    },
    minElo: 800,
  },
  {
    title: "Distinct Subsequences",
    description: `# Distinct Subsequences\n\nGiven two strings \`s\` and \`t\`, return the number of distinct subsequences of \`s\` which equals \`t\`.\n\nThe test cases are generated so that the answer fits on a 32-bit signed integer.\n\n## Examples\n\n**Input:** rabbbit rabbit\n**Output:** 3\n*Explanation:*\nAs shown below, there are 3 ways you can generate "rabbit" from S.\n**rabb**b**it**\n**ra**b**bbit**\n**rab**b**bit**\n\n**Input:** babgbag bag\n**Output:** 5\n*Explanation:*\nAs shown below, there are 5 ways you can generate "bag" from S.\n**ba**b**g**bag\n**ba**bgba**g**\n**b**abgb**ag**\nba**b**gb**ag**\nbabg**bag**\n\n## Constraints\n- 1 <= s.length, t.length <= 1000\n- s and t consist of English letters.`,
    difficulty: "hard",
    testCases: [
      { input: "rabbbit rabbit", expectedOutput: "3", isExample: true },
      { input: "babgbag bag", expectedOutput: "5", isExample: true },
      { input: "a a", expectedOutput: "1", isExample: false },
      { input: "a b", expectedOutput: "0", isExample: false },
      { input: "aaa a", expectedOutput: "3", isExample: false },
      { input: "aaaa aa", expectedOutput: "6", isExample: false },
      { input: "aaaaa aaaaa", expectedOutput: "1", isExample: false },
      { input: "abcabcabc abc", expectedOutput: "10", isExample: false },
      { input: "xyzxyz xyz", expectedOutput: "4", isExample: false },
      { input: "abcdefg abc", expectedOutput: "1", isExample: false }
    ],
    starterCode: {
      python: pythonBase,
      javascript: jsBase,
      cpp: `int numDistinct(string s, string t) {\n    // Write your solution here\n    \n}`,
    },
    driverCode: {
      python: "",
      javascript: "",
      cpp: `\n// --- Hidden Driver Code ---\n#include <iostream>\n#include <string>\nusing namespace std;\nint main() {\n    string s, t;\n    if (std::cin >> s >> t) {\n        std::cout << numDistinct(s, t) << "\\n";\n    }\n    return 0;\n}`,
    },
    minElo: 1200,
  },
  {
    title: "Edit Distance",
    description: `# Edit Distance\n\nGiven two strings \`word1\` and \`word2\`, return the minimum number of operations required to convert \`word1\` to \`word2\`.\n\nYou have the following three operations permitted on a word:\n- Insert a character\n- Delete a character\n- Replace a character\n\n*Note: To handle empty strings via terminal input, use "EMPTY_STRING" to denote an empty string!*\n\n## Examples\n\n**Input:** horse ros\n**Output:** 3\n*Explanation:*\nhorse -> rorse (replace 'h' with 'r')\nrorse -> rose (delete 'r')\nrose -> ros (delete 'e')\n\n**Input:** intention execution\n**Output:** 5\n*Explanation:*\nintention -> inention (delete 't')\ninention -> enention (replace 'i' with 'e')\nenention -> exention (replace 'n' with 'x')\nexention -> exection (replace 'n' with 'c')\nexection -> execution (insert 'u')\n\n**Input:** EMPTY_STRING a\n**Output:** 1\n\n## Constraints\n- 0 <= word1.length, word2.length <= 500\n- word1 and word2 consist of lowercase English letters.`,
    difficulty: "hard",
    testCases: [
      { input: "horse ros", expectedOutput: "3", isExample: true },
      { input: "intention execution", expectedOutput: "5", isExample: true },
      { input: "EMPTY_STRING a", expectedOutput: "1", isExample: true },
      { input: "EMPTY_STRING EMPTY_STRING", expectedOutput: "0", isExample: false },
      { input: "a EMPTY_STRING", expectedOutput: "1", isExample: false },
      { input: "a a", expectedOutput: "0", isExample: false },
      { input: "a b", expectedOutput: "1", isExample: false },
      { input: "abc def", expectedOutput: "3", isExample: false },
      { input: "abcdef abcxyz", expectedOutput: "3", isExample: false },
      { input: "sunday saturday", expectedOutput: "3", isExample: false }
    ],
    starterCode: {
      python: pythonBase,
      javascript: jsBase,
      cpp: `int minDistance(string word1, string word2) {\n    // Write your solution here\n    \n}`,
    },
    driverCode: {
      python: "",
      javascript: "",
      cpp: `\n// --- Hidden Driver Code ---\n#include <iostream>\n#include <string>\nusing namespace std;\nint main() {\n    string s1, s2;\n    if (std::cin >> s1 >> s2) {\n        if (s1 == "EMPTY_STRING") s1 = "";\n        if (s2 == "EMPTY_STRING") s2 = "";\n        std::cout << minDistance(s1, s2) << "\\n";\n    }\n    return 0;\n}`,
    },
    minElo: 1200,
  }
];
