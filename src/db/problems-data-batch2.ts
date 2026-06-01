import { Problem } from "./problems-data";

const pythonBase = `import sys\n\ndef solve():\n    input_data = sys.stdin.read().split()\n    if not input_data: return\n    pass\n\nif __name__ == '__main__':\n    solve()`;
const jsBase = `const fs = require('fs');\n\nfunction solve() {\n    const input = fs.readFileSync('/dev/stdin', 'utf-8').trim().split(/\\s+/);\n    if (!input[0]) return;\n}\n\nsolve();`;

export const seedProblemsBatch2: Problem[] = [
  {
    title: "Two Sum II - Input Array Is Sorted",
    description: `# Two Sum II - Input Array Is Sorted\n\nGiven a **1-indexed** array of integers \`numbers\` that is already sorted in non-decreasing order, find two numbers such that they add up to a specific \`target\` number.\n\nReturn the indices of the two numbers, **1-indexed**, as an integer array \`[index1, index2]\` of length 2.\n\nThe tests are generated such that there is exactly one solution. You may not use the same element twice.\n\nYour solution must use only constant extra space.\n\n## Examples\n\n**Input:** 2 7 11 15 9\n**Output:** 1 2\n*Explanation:* The sum of 2 and 7 is 9. Therefore, index1 = 1, index2 = 2.\n\n**Input:** 2 3 4 6\n**Output:** 1 3\n\n**Input:** -1 0 -1\n**Output:** 1 2\n\n## Constraints\n- 2 <= numbers.length <= 3 * 10^4\n- -1000 <= numbers[i] <= 1000\n- numbers is sorted in non-decreasing order.`,
    difficulty: "medium",
    testCases: [
      { input: "2 7 11 15 9", expectedOutput: "1 2", isExample: true },
      { input: "2 3 4 6", expectedOutput: "1 3", isExample: true },
      { input: "-1 0 -1", expectedOutput: "1 2", isExample: true },
      { input: "0 0 0", expectedOutput: "1 2", isExample: false },
      { input: "-5 -3 -1 0 1 3 -2", expectedOutput: "2 5", isExample: false },
      { input: "1 2 3 4 5 6 7 8 9 10 19", expectedOutput: "9 10", isExample: false },
      { input: "-10 -8 -2 1 3 5 7 -5", expectedOutput: "2 5", isExample: false },
      { input: "3 24 50 79 88 150 345 200", expectedOutput: "3 6", isExample: false },
      { input: "5 5 10", expectedOutput: "1 2", isExample: false },
      { input: "-1000 -500 0 500 1000 -500", expectedOutput: "2 3", isExample: false }
    ],
    starterCode: {
      python: pythonBase,
      javascript: jsBase,
      cpp: `vector<int> twoSum(vector<int>& numbers, int target) {\n    // Write your solution here\n    \n}`,
    },
    driverCode: {
      python: "",
      javascript: "",
      cpp: `\n// --- Hidden Driver Code ---\n#include <iostream>\n#include <vector>\nusing namespace std;\nint main() {\n    vector<int> nums;\n    int n;\n    while (std::cin >> n) {\n        nums.push_back(n);\n    }\n    if (nums.empty()) return 0;\n    int target = nums.back();\n    nums.pop_back();\n    vector<int> res = twoSum(nums, target);\n    for (int i = 0; i < res.size(); i++) {\n        std::cout << res[i] << (i == res.size() - 1 ? "" : " ");\n    }\n    std::cout << "\\n";\n    return 0;\n}`,
    },
    minElo: 800,
  },
  {
    title: "3Sum",
    description: `# 3Sum\n\nGiven an integer array \`nums\`, return all the triplets \`[nums[i], nums[j], nums[k]]\` such that \`i != j\`, \`i != k\`, and \`j != k\`, and \`nums[i] + nums[j] + nums[k] == 0\`.\n\nNotice that the solution set must not contain duplicate triplets.\n\nThe driver code handles formatting your output vectors automatically.\n\n## Examples\n\n**Input:** -1 0 1 2 -1 -4\n**Output:** -1 -1 2 | -1 0 1\n\n**Input:** 0 1 1\n**Output:** \n\n**Input:** 0 0 0\n**Output:** 0 0 0\n\n## Constraints\n- 3 <= nums.length <= 3000\n- -10^5 <= nums[i] <= 10^5`,
    difficulty: "medium",
    testCases: [
      { input: "-1 0 1 2 -1 -4", expectedOutput: "-1 -1 2 | -1 0 1", isExample: true },
      { input: "0 1 1", expectedOutput: "", isExample: true },
      { input: "0 0 0", expectedOutput: "0 0 0", isExample: true },
      { input: "0 0 0 0", expectedOutput: "0 0 0", isExample: false },
      { input: "-2 0 1 1 2", expectedOutput: "-2 0 2 | -2 1 1", isExample: false },
      { input: "1 -1 -1 0", expectedOutput: "-1 0 1", isExample: false },
      { input: "-2 0 0 2 2", expectedOutput: "-2 0 2", isExample: false },
      { input: "3 0 -2 -1 1 2", expectedOutput: "-2 -1 3 | -2 0 2 | -1 0 1", isExample: false },
      { input: "1 2 -2 -1", expectedOutput: "", isExample: false },
      { input: "-4 -2 -2 -2 0 1 2 2 2 3 3 4 4 6 6", expectedOutput: "-4 -2 6 | -4 0 4 | -4 1 3 | -4 2 2 | -2 -2 4 | -2 0 2", isExample: false }
    ],
    starterCode: {
      python: pythonBase,
      javascript: jsBase,
      cpp: `vector<vector<int>> threeSum(vector<int>& nums) {\n    // Write your solution here\n    \n}`,
    },
    driverCode: {
      python: "",
      javascript: "",
      cpp: `\n// --- Hidden Driver Code ---\n#include <iostream>\n#include <vector>\n#include <algorithm>\nusing namespace std;\nint main() {\n    vector<int> nums;\n    int n;\n    while (std::cin >> n) {\n        nums.push_back(n);\n    }\n    vector<vector<int>> res = threeSum(nums);\n    for (auto& triplet : res) std::sort(triplet.begin(), triplet.end());\n    std::sort(res.begin(), res.end());\n    for (int i = 0; i < res.size(); i++) {\n        for (int j = 0; j < res[i].size(); j++) {\n            std::cout << res[i][j] << (j == res[i].size() - 1 ? "" : " ");\n        }\n        if (i != res.size() - 1) std::cout << " | ";\n    }\n    std::cout << "\\n";\n    return 0;\n}`,
    },
    minElo: 800,
  },
  {
    title: "Container With Most Water",
    description: `# Container With Most Water\n\nYou are given an integer array \`height\` of length \`n\`. There are \`n\` vertical lines drawn such that the two endpoints of the \`i\`th line are \`(i, 0)\` and \`(i, height[i])\`.\n\nFind two lines that together with the x-axis form a container, such that the container contains the most water.\n\nReturn the maximum amount of water a container can store.\n\n## Examples\n\n**Input:** 1 8 6 2 5 4 8 3 7\n**Output:** 49\n*Explanation:* The max area is between index 1 and index 8, distance is 7, min height is 7. 7*7 = 49.\n\n**Input:** 1 1\n**Output:** 1\n\n**Input:** 4 3 2 1 4\n**Output:** 16\n\n## Constraints\n- 2 <= height.length <= 10^5\n- 0 <= height[i] <= 10^4`,
    difficulty: "medium",
    testCases: [
      { input: "1 8 6 2 5 4 8 3 7", expectedOutput: "49", isExample: true },
      { input: "1 1", expectedOutput: "1", isExample: true },
      { input: "4 3 2 1 4", expectedOutput: "16", isExample: true },
      { input: "1 2 1", expectedOutput: "2", isExample: false },
      { input: "1 2 4 3", expectedOutput: "4", isExample: false },
      { input: "1 8 6 2 5 4 8 25 7", expectedOutput: "49", isExample: false },
      { input: "0 2", expectedOutput: "0", isExample: false },
      { input: "1 0 0 0 0 0 0 2 2", expectedOutput: "8", isExample: false },
      { input: "2 3 4 5 18 17 6", expectedOutput: "17", isExample: false },
      { input: "10 9 8 7 6 5 4 3 2 1", expectedOutput: "25", isExample: false }
    ],
    starterCode: {
      python: pythonBase,
      javascript: jsBase,
      cpp: `int maxArea(vector<int>& height) {\n    // Write your solution here\n    \n}`,
    },
    driverCode: {
      python: "",
      javascript: "",
      cpp: `\n// --- Hidden Driver Code ---\n#include <iostream>\n#include <vector>\nusing namespace std;\nint main() {\n    vector<int> nums;\n    int n;\n    while (std::cin >> n) {\n        nums.push_back(n);\n    }\n    std::cout << maxArea(nums) << "\\n";\n    return 0;\n}`,
    },
    minElo: 800,
  },
  {
    title: "Trapping Rain Water",
    description: `# Trapping Rain Water\n\nGiven \`n\` non-negative integers representing an elevation map where the width of each bar is \`1\`, compute how much water it can trap after raining.\n\n## Examples\n\n**Input:** 0 1 0 2 1 0 1 3 2 1 2 1\n**Output:** 6\n*Explanation:* The elevation map is represented by array [0,1,0,2,1,0,1,3,2,1,2,1]. In this case, 6 units of rain water (blue section) are being trapped.\n\n**Input:** 4 2 0 3 2 5\n**Output:** 9\n\n**Input:** 2 0 2\n**Output:** 2\n\n## Constraints\n- n == height.length\n- 1 <= n <= 2 * 10^4\n- 0 <= height[i] <= 10^5`,
    difficulty: "hard",
    testCases: [
      { input: "0 1 0 2 1 0 1 3 2 1 2 1", expectedOutput: "6", isExample: true },
      { input: "4 2 0 3 2 5", expectedOutput: "9", isExample: true },
      { input: "2 0 2", expectedOutput: "2", isExample: true },
      { input: "0", expectedOutput: "0", isExample: false },
      { input: "1 2 3 4 5", expectedOutput: "0", isExample: false },
      { input: "5 4 3 2 1", expectedOutput: "0", isExample: false },
      { input: "5 0 5 0 5", expectedOutput: "10", isExample: false },
      { input: "4 2 3 1 2", expectedOutput: "2", isExample: false },
      { input: "1 0 2 1 0 1 3 2 1 2 1 4", expectedOutput: "14", isExample: false },
      { input: "10 0 0 0 10", expectedOutput: "30", isExample: false }
    ],
    starterCode: {
      python: pythonBase,
      javascript: jsBase,
      cpp: `int trap(vector<int>& height) {\n    // Write your solution here\n    \n}`,
    },
    driverCode: {
      python: "",
      javascript: "",
      cpp: `\n// --- Hidden Driver Code ---\n#include <iostream>\n#include <vector>\nusing namespace std;\nint main() {\n    vector<int> nums;\n    int n;\n    while (std::cin >> n) {\n        nums.push_back(n);\n    }\n    std::cout << trap(nums) << "\\n";\n    return 0;\n}`,
    },
    minElo: 1200,
  },
  {
    title: "Longest Repeating Character Replacement",
    description: `# Longest Repeating Character Replacement\n\nYou are given a string \`s\` and an integer \`k\`. You can choose any character of the string and change it to any other uppercase English character. You can perform this operation at most \`k\` times.\n\nReturn the length of the longest substring containing the same letter you can get after performing the above operations.\n\n## Examples\n\n**Input:** ABAB 2\n**Output:** 4\n*Explanation:* Replace the two 'A's with two 'B's or vice versa.\n\n**Input:** AABABBA 1\n**Output:** 4\n*Explanation:* Replace the one 'A' in the middle with 'B' and form "AABBBBA". The substring "BBBB" has the longest repeating letters, which is 4.\n\n**Input:** A 0\n**Output:** 1\n\n## Constraints\n- 1 <= s.length <= 10^5\n- s consists of only uppercase English letters.\n- 0 <= k <= s.length`,
    difficulty: "medium",
    testCases: [
      { input: "ABAB 2", expectedOutput: "4", isExample: true },
      { input: "AABABBA 1", expectedOutput: "4", isExample: true },
      { input: "A 0", expectedOutput: "1", isExample: true },
      { input: "AAAA 2", expectedOutput: "4", isExample: false },
      { input: "ABCDEF 1", expectedOutput: "2", isExample: false },
      { input: "BAAAAB 2", expectedOutput: "6", isExample: false },
      { input: "AABBAABB 3", expectedOutput: "7", isExample: false },
      { input: "SDFFFFFDSD 2", expectedOutput: "9", isExample: false },
      { input: "XYX 0", expectedOutput: "1", isExample: false },
      { input: "ABBBCCCDDD 3", expectedOutput: "6", isExample: false }
    ],
    starterCode: {
      python: pythonBase,
      javascript: jsBase,
      cpp: `int characterReplacement(string s, int k) {\n    // Write your solution here\n    \n}`,
    },
    driverCode: {
      python: "",
      javascript: "",
      cpp: `\n// --- Hidden Driver Code ---\n#include <iostream>\n#include <string>\nusing namespace std;\nint main() {\n    string s;\n    int k;\n    if (std::cin >> s >> k) {\n        std::cout << characterReplacement(s, k) << "\\n";\n    }\n    return 0;\n}`,
    },
    minElo: 800,
  },
  {
    title: "Permutation in String",
    description: `# Permutation in String\n\nGiven two strings \`s1\` and \`s2\`, return \`true\` if \`s2\` contains a permutation of \`s1\`, or \`false\` otherwise.\n\nIn other words, return \`true\` if one of \`s1\`'s permutations is the substring of \`s2\`.\n\n## Examples\n\n**Input:** ab eidbaooo\n**Output:** true\n*Explanation:* s2 contains one permutation of s1 ("ba").\n\n**Input:** ab eidboaoo\n**Output:** false\n\n**Input:** adc dcda\n**Output:** true\n\n## Constraints\n- 1 <= s1.length, s2.length <= 10^4\n- s1 and s2 consist of lowercase English letters.`,
    difficulty: "medium",
    testCases: [
      { input: "ab eidbaooo", expectedOutput: "true", isExample: true },
      { input: "ab eidboaoo", expectedOutput: "false", isExample: true },
      { input: "adc dcda", expectedOutput: "true", isExample: true },
      { input: "hello ooolleoooleh", expectedOutput: "false", isExample: false },
      { input: "abc cccbabbba", expectedOutput: "true", isExample: false },
      { input: "a a", expectedOutput: "true", isExample: false },
      { input: "a b", expectedOutput: "false", isExample: false },
      { input: "xyz zyx", expectedOutput: "true", isExample: false },
      { input: "abcd efgabcdh", expectedOutput: "true", isExample: false },
      { input: "abcd dcab", expectedOutput: "true", isExample: false }
    ],
    starterCode: {
      python: pythonBase,
      javascript: jsBase,
      cpp: `bool checkInclusion(string s1, string s2) {\n    // Write your solution here\n    \n}`,
    },
    driverCode: {
      python: "",
      javascript: "",
      cpp: `\n// --- Hidden Driver Code ---\n#include <iostream>\n#include <string>\nusing namespace std;\nint main() {\n    string s1, s2;\n    if (std::cin >> s1 >> s2) {\n        bool res = checkInclusion(s1, s2);\n        std::cout << (res ? "true" : "false") << "\\n";\n    }\n    return 0;\n}`,
    },
    minElo: 800,
  },
  {
    title: "Minimum Window Substring",
    description: `# Minimum Window Substring\n\nGiven two strings \`s\` and \`t\` of lengths \`m\` and \`n\` respectively, return the minimum window substring of \`s\` such that every character in \`t\` (including duplicates) is included in the window.\n\nIf there is no such substring, return the empty string \`""\`.\n\nThe testcases will be generated such that the answer is unique.\n\n## Examples\n\n**Input:** ADOBECODEBANC ABC\n**Output:** BANC\n*Explanation:* The minimum window substring "BANC" includes 'A', 'B', and 'C' from string t.\n\n**Input:** a a\n**Output:** a\n\n**Input:** a aa\n**Output:** \n*Explanation:* Both 'a's from t must be included in the window. Since the largest window of s only has one 'a', return empty string.\n\n## Constraints\n- m == s.length, n == t.length\n- 1 <= m, n <= 10^5\n- s and t consist of uppercase and lowercase English letters.`,
    difficulty: "hard",
    testCases: [
      { input: "ADOBECODEBANC ABC", expectedOutput: "BANC", isExample: true },
      { input: "a a", expectedOutput: "a", isExample: true },
      { input: "a aa", expectedOutput: "", isExample: true },
      { input: "A A", expectedOutput: "A", isExample: false },
      { input: "aa aa", expectedOutput: "aa", isExample: false },
      { input: "bba ab", expectedOutput: "ba", isExample: false },
      { input: "cabwefgewcwaefgcf abc", expectedOutput: "cab", isExample: false },
      { input: "A B", expectedOutput: "", isExample: false },
      { input: "abc abcd", expectedOutput: "", isExample: false },
      { input: "aabdec bac", expectedOutput: "abdec", isExample: false }
    ],
    starterCode: {
      python: pythonBase,
      javascript: jsBase,
      cpp: `string minWindow(string s, string t) {\n    // Write your solution here\n    \n}`,
    },
    driverCode: {
      python: "",
      javascript: "",
      cpp: `\n// --- Hidden Driver Code ---\n#include <iostream>\n#include <string>\nusing namespace std;\nint main() {\n    string s, t;\n    if (std::cin >> s >> t) {\n        std::cout << minWindow(s, t) << "\\n";\n    } else {\n        std::cout << "\\n";\n    }\n    return 0;\n}`,
    },
    minElo: 1200,
  },
  {
    title: "Sliding Window Maximum",
    description: `# Sliding Window Maximum\n\nYou are given an array of integers \`nums\`, there is a sliding window of size \`k\` which is moving from the very left of the array to the very right. You can only see the \`k\` numbers in the window. Each time the sliding window moves right by one position.\n\nReturn the max sliding window.\n\n## Examples\n\n**Input:** 1 3 -1 -3 5 3 6 7 3\n**Output:** 3 3 5 5 6 7\n*Explanation:* k=3.\nWindow position                Max\n---------------               -----\n[1  3  -1] -3  5  3  6  7       3\n 1 [3  -1  -3] 5  3  6  7       3\n 1  3 [-1  -3  5] 3  6  7       5\n 1  3  -1 [-3  5  3] 6  7       5\n 1  3  -1  -3 [5  3  6] 7       6\n 1  3  -1  -3  5 [3  6  7]      7\n\n**Input:** 1 1\n**Output:** 1\n\n**Input:** 1 -1 1\n**Output:** 1\n\n## Constraints\n- 1 <= nums.length <= 10^5\n- -10^4 <= nums[i] <= 10^4\n- 1 <= k <= nums.length`,
    difficulty: "hard",
    testCases: [
      { input: "1 3 -1 -3 5 3 6 7 3", expectedOutput: "3 3 5 5 6 7", isExample: true },
      { input: "1 1", expectedOutput: "1", isExample: true },
      { input: "1 -1 1", expectedOutput: "1", isExample: true },
      { input: "4 -2 1 1", expectedOutput: "4", isExample: false },
      { input: "7 2 4 2", expectedOutput: "7 4", isExample: false },
      { input: "-7 -8 7 5 7 1 6 0 4", expectedOutput: "7 7 7 7 7 6", isExample: false },
      { input: "1 3 1 2 0 5 3", expectedOutput: "3 3 2 5", isExample: false },
      { input: "9 10 9 -7 -4 -8 2 -6 5", expectedOutput: "10 10 9 -4 2 2 5", isExample: false },
      { input: "10 9 8 7 6 5 4 3 2 1 2", expectedOutput: "10 9 8 7 6 5 4 3 2", isExample: false },
      { input: "5 5 5 5 5 5 3", expectedOutput: "5 5 5 5", isExample: false }
    ],
    starterCode: {
      python: pythonBase,
      javascript: jsBase,
      cpp: `vector<int> maxSlidingWindow(vector<int>& nums, int k) {\n    // Write your solution here\n    \n}`,
    },
    driverCode: {
      python: "",
      javascript: "",
      cpp: `\n// --- Hidden Driver Code ---\n#include <iostream>\n#include <vector>\nusing namespace std;\nint main() {\n    vector<int> nums;\n    int n;\n    while (std::cin >> n) {\n        nums.push_back(n);\n    }\n    if (nums.empty()) return 0;\n    int k = nums.back();\n    nums.pop_back();\n    vector<int> res = maxSlidingWindow(nums, k);\n    for (int i = 0; i < res.size(); i++) {\n        std::cout << res[i] << (i == res.size() - 1 ? "" : " ");\n    }\n    std::cout << "\\n";\n    return 0;\n}`,
    },
    minElo: 1200,
  },
  {
    title: "Generate Parentheses",
    description: `# Generate Parentheses\n\nGiven \`n\` pairs of parentheses, write a function to generate all combinations of well-formed parentheses.\n\nThe output will automatically format combinations separated by a space.\n\n## Examples\n\n**Input:** 3\n**Output:** ((())) (()()) (())() ()(()) ()()()\n\n**Input:** 1\n**Output:** ()\n\n**Input:** 2\n**Output:** (()) ()()\n\n## Constraints\n- 1 <= n <= 8`,
    difficulty: "medium",
    testCases: [
      { input: "3", expectedOutput: "((())) (()()) (())() ()(()) ()()()", isExample: true },
      { input: "1", expectedOutput: "()", isExample: true },
      { input: "2", expectedOutput: "(()) ()()", isExample: true },
      { input: "4", expectedOutput: "(((()))) ((()())) ((())()) ((()))() (()(())) (()()()) (()())() ()(())() ()((())) ()(()()) ()()(()) ()()()()", isExample: false },
      { input: "0", expectedOutput: "", isExample: false },
      { input: "5", expectedOutput: "((((())))) ((((())))) (((())())) (((()))()) (((())))() ((()(()))) ((()()())) ((()())()) ((()()))() ((())(())) ((())()()) ((())())() ((()))(()) ((()))()() (()((()))) (()(()())) (()(())()) (()(()))() (()()(())) (()()()()) (()()())() (()())(()) (()())()() ()(((()))) ()(()(())) ()(()()()) ()(()())() ()()(())() ()()()(()) ()()()()()", isExample: false },
      { input: "1", expectedOutput: "()", isExample: false },
      { input: "2", expectedOutput: "(()) ()()", isExample: false },
      { input: "3", expectedOutput: "((())) (()()) (())() ()(()) ()()()", isExample: false },
      { input: "1", expectedOutput: "()", isExample: false }
    ],
    starterCode: {
      python: pythonBase,
      javascript: jsBase,
      cpp: `vector<string> generateParenthesis(int n) {\n    // Write your solution here\n    \n}`,
    },
    driverCode: {
      python: "",
      javascript: "",
      cpp: `\n// --- Hidden Driver Code ---\n#include <iostream>\n#include <vector>\n#include <string>\n#include <algorithm>\nusing namespace std;\nint main() {\n    int n;\n    if (std::cin >> n) {\n        vector<string> res = generateParenthesis(n);\n        std::sort(res.begin(), res.end());\n        for (int i = 0; i < res.size(); i++) {\n            std::cout << res[i] << (i == res.size() - 1 ? "" : " ");\n        }\n        std::cout << "\\n";\n    }\n    return 0;\n}`,
    },
    minElo: 800,
  },
  {
    title: "Daily Temperatures",
    description: `# Daily Temperatures\n\nGiven an array of integers \`temperatures\` represents the daily temperatures, return an array \`answer\` such that \`answer[i]\` is the number of days you have to wait after the \`i\`th day to get a warmer temperature. If there is no future day for which this is possible, keep \`answer[i] == 0\` instead.\n\n## Examples\n\n**Input:** 73 74 75 71 69 72 76 73\n**Output:** 1 1 4 2 1 1 0 0\n\n**Input:** 30 40 50 60\n**Output:** 1 1 1 0\n\n**Input:** 30 60 90\n**Output:** 1 1 0\n\n## Constraints\n- 1 <= temperatures.length <= 10^5\n- 30 <= temperatures[i] <= 100`,
    difficulty: "medium",
    testCases: [
      { input: "73 74 75 71 69 72 76 73", expectedOutput: "1 1 4 2 1 1 0 0", isExample: true },
      { input: "30 40 50 60", expectedOutput: "1 1 1 0", isExample: true },
      { input: "30 60 90", expectedOutput: "1 1 0", isExample: true },
      { input: "100 90 80 70", expectedOutput: "0 0 0 0", isExample: false },
      { input: "30 30 30 30 30", expectedOutput: "0 0 0 0 0", isExample: false },
      { input: "89 62 70 58 47 47 46 76 100 70", expectedOutput: "8 1 5 4 3 2 1 1 0 0", isExample: false },
      { input: "34 80 80 34 34 80 80 34 34 80", expectedOutput: "1 0 0 2 1 0 0 2 1 0", isExample: false },
      { input: "50", expectedOutput: "0", isExample: false },
      { input: "50 51", expectedOutput: "1 0", isExample: false },
      { input: "51 50", expectedOutput: "0 0", isExample: false }
    ],
    starterCode: {
      python: pythonBase,
      javascript: jsBase,
      cpp: `vector<int> dailyTemperatures(vector<int>& temperatures) {\n    // Write your solution here\n    \n}`,
    },
    driverCode: {
      python: "",
      javascript: "",
      cpp: `\n// --- Hidden Driver Code ---\n#include <iostream>\n#include <vector>\nusing namespace std;\nint main() {\n    vector<int> nums;\n    int n;\n    while (std::cin >> n) {\n        nums.push_back(n);\n    }\n    vector<int> res = dailyTemperatures(nums);\n    for (int i = 0; i < res.size(); i++) {\n        std::cout << res[i] << (i == res.size() - 1 ? "" : " ");\n    }\n    std::cout << "\\n";\n    return 0;\n}`,
    },
    minElo: 800,
  }
];
