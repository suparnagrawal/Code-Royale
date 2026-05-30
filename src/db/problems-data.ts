type TestCase = { input: string; expectedOutput: string; isExample: boolean };
type StarterCode = { python: string; javascript: string; cpp: string };
type DriverCode = { python: string; javascript: string; cpp: string };

export type Problem = {
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

export const seedProblems: Problem[] = [
  {
    title: "Contains Duplicate",
    description: `# Contains Duplicate\n\nGiven an integer array \`nums\`, return \`true\` if any value appears **at least twice** in the array, and return \`false\` if every element is distinct.\n\n## Examples\n\n**Input:** 1 2 3 1\n**Output:** true\n\n**Input:** 1 2 3 4\n**Output:** false\n\n**Input:** 1 1 1 3 3 4 3 2 4 2\n**Output:** true\n\n## Constraints\n- 1 <= nums.length <= 10^5\n- -10^9 <= nums[i] <= 10^9`,
    difficulty: "easy",
    testCases: [
      { input: "1 2 3 1", expectedOutput: "true", isExample: true },
      { input: "1 2 3 4", expectedOutput: "false", isExample: true },
      { input: "1 1 1 3 3 4 3 2 4 2", expectedOutput: "true", isExample: true },
      { input: "10 20 30 40 50", expectedOutput: "false", isExample: false },
      { input: "5 5", expectedOutput: "true", isExample: false },
      { input: "0", expectedOutput: "false", isExample: false },
      { input: "100 200 100", expectedOutput: "true", isExample: false },
      { input: "1 2 3 4 5 6 7 8 9 10 11 12 1", expectedOutput: "true", isExample: false },
      { input: "-1 -1", expectedOutput: "true", isExample: false },
      { input: "10 20 30 10", expectedOutput: "true", isExample: false }
    ],
    starterCode: {
      python: pythonBase,
      javascript: jsBase,
      cpp: `bool containsDuplicate(vector<int>& nums) {\n    // Write your solution here\n    \n}`,
    },
    driverCode: {
      python: "",
      javascript: "",
      cpp: `\n// --- Hidden Driver Code ---\n#include <iostream>\n#include <vector>\nusing namespace std;\nint main() {\n    vector<int> nums;\n    int n;\n    while (std::cin >> n) {\n        nums.push_back(n);\n    }\n    bool res = containsDuplicate(nums);\n    std::cout << (res ? "true" : "false") << "\\n";\n    return 0;\n}`,
    },
    minElo: 0,
  },
  {
    title: "Valid Anagram",
    description: `# Valid Anagram\n\nGiven two strings \`s\` and \`t\`, return \`true\` if \`t\` is an anagram of \`s\`, and \`false\` otherwise.\n\nAn **Anagram** is a word or phrase formed by rearranging the letters of a different word or phrase, typically using all the original letters exactly once.\n\n## Examples\n\n**Input:** anagram nagaram\n**Output:** true\n\n**Input:** rat car\n**Output:** false\n\n**Input:** a a\n**Output:** true\n\n## Constraints\n- 1 <= s.length, t.length <= 5 * 10^4\n- s and t consist of lowercase English letters.`,
    difficulty: "easy",
    testCases: [
      { input: "anagram nagaram", expectedOutput: "true", isExample: true },
      { input: "rat car", expectedOutput: "false", isExample: true },
      { input: "a a", expectedOutput: "true", isExample: true },
      { input: "a b", expectedOutput: "false", isExample: false },
      { input: "ab ba", expectedOutput: "true", isExample: false },
      { input: "abc cba", expectedOutput: "true", isExample: false },
      { input: "aabb bbaa", expectedOutput: "true", isExample: false },
      { input: "hello helo", expectedOutput: "false", isExample: false },
      { input: "cat rat", expectedOutput: "false", isExample: false },
      { input: "listen silent", expectedOutput: "true", isExample: false }
    ],
    starterCode: {
      python: pythonBase,
      javascript: jsBase,
      cpp: `bool isAnagram(string s, string t) {\n    // Write your solution here\n    \n}`,
    },
    driverCode: {
      python: "",
      javascript: "",
      cpp: `\n// --- Hidden Driver Code ---\n#include <iostream>\n#include <string>\nusing namespace std;\nint main() {\n    string s, t;\n    std::cin >> s >> t;\n    bool res = isAnagram(s, t);\n    std::cout << (res ? "true" : "false") << "\\n";\n    return 0;\n}`,
    },
    minElo: 0,
  },
  {
    title: "Two Sum",
    description: `# Two Sum\n\nGiven an array of integers \`nums\` and an integer \`target\`, return the indices of the two numbers that add up to \`target\`.\n\nThe input will contain the array followed by the target. Output the two indices separated by a space, in ascending order.\n\n## Examples\n\n**Input:** 2 7 11 15 9\n**Output:** 0 1\n\n**Input:** 3 2 4 6\n**Output:** 1 2\n\n**Input:** 3 3 6\n**Output:** 0 1\n\n## Constraints\n- 2 <= nums.length <= 10^4\n- -10^9 <= nums[i] <= 10^9`,
    difficulty: "easy",
    testCases: [
      { input: "2 7 11 15 9", expectedOutput: "0 1", isExample: true },
      { input: "3 2 4 6", expectedOutput: "1 2", isExample: true },
      { input: "3 3 6", expectedOutput: "0 1", isExample: true },
      { input: "1 5 4 7 8", expectedOutput: "0 3", isExample: false },
      { input: "-1 -2 -6 -4 -5", expectedOutput: "0 3", isExample: false },
      { input: "10 20 30 40 50 90", expectedOutput: "3 4", isExample: false },
      { input: "0 4 3 0 0", expectedOutput: "0 3", isExample: false },
      { input: "0 0 0", expectedOutput: "0 1", isExample: false },
      { input: "-10 7 19 15 9", expectedOutput: "0 2", isExample: false },
      { input: "2 5 5 11 10", expectedOutput: "1 2", isExample: false }
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
    title: "Group Anagrams",
    description: `# Group Anagrams\n\nGiven an array of strings \`strs\`, group the anagrams together. You can return the answer in any order.\n\nThe driver code will format your output appropriately. You just need to return a vector of vectors of strings.\n\n## Examples\n\n**Input:** eat tea tan ate nat bat\n**Output:** bat | nat tan | ate eat tea \n\n**Input:** x x x\n**Output:** x x x\n\n**Input:** a\n**Output:** a\n\n## Constraints\n- 1 <= strs.length <= 10^4\n- 0 <= strs[i].length <= 100`,
    difficulty: "medium",
    testCases: [
      { input: "eat tea tan ate nat bat", expectedOutput: "bat | nat tan | ate eat tea", isExample: true },
      { input: "a", expectedOutput: "a", isExample: true },
      { input: "x x x", expectedOutput: "x x x", isExample: true },
      { input: "abc cba bca xyz zyx", expectedOutput: "xyz zyx | abc bca cba", isExample: false },
      { input: "a b c d e", expectedOutput: "a | b | c | d | e", isExample: false },
      { input: "ab ba cd dc", expectedOutput: "cd dc | ab ba", isExample: false },
      { input: "z z z z", expectedOutput: "z z z z", isExample: false },
      { input: "dog god cat act tac", expectedOutput: "act cat tac | dog god", isExample: false },
      { input: "abc", expectedOutput: "abc", isExample: false },
      { input: "hello", expectedOutput: "hello", isExample: false }
    ],
    starterCode: {
      python: pythonBase,
      javascript: jsBase,
      cpp: `vector<vector<string>> groupAnagrams(vector<string>& strs) {\n    // Write your solution here\n    \n}`,
    },
    driverCode: {
      python: "",
      javascript: "",
      cpp: `\n// --- Hidden Driver Code ---\n#include <iostream>\n#include <vector>\n#include <string>\n#include <algorithm>\nusing namespace std;\nint main() {\n    vector<string> strs;\n    string s;\n    while (std::cin >> s) {\n        strs.push_back(s);\n    }\n    vector<vector<string>> res = groupAnagrams(strs);\n    for (auto& group : res) std::sort(group.begin(), group.end());\n    std::sort(res.begin(), res.end(), [](const vector<string>& a, const vector<string>& b) {\n        if (a.size() != b.size()) return a.size() < b.size();\n        return a[0] < b[0];\n    });\n    for (int i = 0; i < res.size(); i++) {\n        for (int j = 0; j < res[i].size(); j++) {\n            std::cout << res[i][j] << (j == res[i].size() - 1 ? "" : " ");\n        }\n        if (i != res.size() - 1) std::cout << " | ";\n    }\n    std::cout << "\\n";\n    return 0;\n}`,
    },
    minElo: 800,
  },
  {
    title: "Valid Palindrome",
    description: `# Valid Palindrome\n\nA phrase is a palindrome if, after converting all uppercase letters into lowercase letters and removing all non-alphanumeric characters, it reads the same forward and backward. Alphanumeric characters include letters and numbers.\n\nGiven a string \`s\`, return \`true\` if it is a palindrome, or \`false\` otherwise.\n\n## Examples\n\n**Input:** A man, a plan, a canal: Panama\n**Output:** true\n\n**Input:** race a car\n**Output:** false\n\n**Input:** ab_a\n**Output:** true\n\n## Constraints\n- 1 <= s.length <= 2 * 10^5`,
    difficulty: "easy",
    testCases: [
      { input: "A man, a plan, a canal: Panama", expectedOutput: "true", isExample: true },
      { input: "race a car", expectedOutput: "false", isExample: true },
      { input: "ab_a", expectedOutput: "true", isExample: true },
      { input: "0P", expectedOutput: "false", isExample: false },
      { input: " ", expectedOutput: "true", isExample: false },
      { input: "12321", expectedOutput: "true", isExample: false },
      { input: "123421", expectedOutput: "false", isExample: false },
      { input: "Not a palindrome", expectedOutput: "false", isExample: false },
      { input: "racecar", expectedOutput: "true", isExample: false },
      { input: "Step on no pets", expectedOutput: "true", isExample: false }
    ],
    starterCode: {
      python: `import sys\ndef solve():\n    s = sys.stdin.read().strip()\n    pass\nif __name__ == '__main__':\n    solve()`,
      javascript: `const fs = require('fs');\nfunction solve() {\n    const s = fs.readFileSync('/dev/stdin', 'utf-8').trim();\n}\nsolve();`,
      cpp: `bool isPalindrome(string s) {\n    // Write your solution here\n    \n}`,
    },
    driverCode: {
      python: "",
      javascript: "",
      cpp: `\n// --- Hidden Driver Code ---\n#include <iostream>\n#include <string>\nusing namespace std;\nint main() {\n    string s;\n    std::getline(std::cin, s);\n    bool res = isPalindrome(s);\n    std::cout << (res ? "true" : "false") << "\\n";\n    return 0;\n}`,
    },
    minElo: 0,
  },
  {
    title: "Valid Parentheses",
    description: `# Valid Parentheses\n\nGiven a string \`s\` containing just the characters \`'('\`, \`')'\`, \`'{'\`, \`'}'\`, \`'['\` and \`']'\`, determine if the input string is valid.\n\nAn input string is valid if:\n1. Open brackets must be closed by the same type of brackets.\n2. Open brackets must be closed in the correct order.\n3. Every close bracket has a corresponding open bracket of the same type.\n\n## Examples\n\n**Input:** ()\n**Output:** true\n\n**Input:** ()[]{}\n**Output:** true\n\n**Input:** (]\n**Output:** false\n\n## Constraints\n- 1 <= s.length <= 10^4\n- s consists of parentheses only \`'()[]{}'\`.`,
    difficulty: "easy",
    testCases: [
      { input: "()", expectedOutput: "true", isExample: true },
      { input: "()[]{}", expectedOutput: "true", isExample: true },
      { input: "(]", expectedOutput: "false", isExample: true },
      { input: "([)]", expectedOutput: "false", isExample: false },
      { input: "{[]}", expectedOutput: "true", isExample: false },
      { input: "[", expectedOutput: "false", isExample: false },
      { input: "]", expectedOutput: "false", isExample: false },
      { input: "(((((((())))))))", expectedOutput: "true", isExample: false },
      { input: "((()))", expectedOutput: "true", isExample: false },
      { input: "({[)]}", expectedOutput: "false", isExample: false }
    ],
    starterCode: {
      python: pythonBase,
      javascript: jsBase,
      cpp: `bool isValid(string s) {\n    // Write your solution here\n    \n}`,
    },
    driverCode: {
      python: "",
      javascript: "",
      cpp: `\n// --- Hidden Driver Code ---\n#include <iostream>\n#include <string>\nusing namespace std;\nint main() {\n    string s;\n    std::cin >> s;\n    bool res = isValid(s);\n    std::cout << (res ? "true" : "false") << "\\n";\n    return 0;\n}`,
    },
    minElo: 0,
  },
  {
    title: "Evaluate Reverse Polish Notation",
    description: `# Evaluate Reverse Polish Notation\n\nYou are given an array of strings \`tokens\` that represents an arithmetic expression in a Reverse Polish Notation.\n\nEvaluate the expression. Return an integer that represents the value of the expression.\n\nNote that:\n- The valid operators are '+', '-', '*', and '/'.\n- Each operand may be an integer or another expression.\n- The division between two integers always truncates toward zero.\n- There will not be any division by zero.\n\n## Examples\n\n**Input:** 2 1 + 3 *\n**Output:** 9\n*Explanation:* ((2 + 1) * 3) = 9\n\n**Input:** 4 13 5 / +\n**Output:** 6\n*Explanation:* (4 + (13 / 5)) = 6\n\n**Input:** 10 6 9 3 + -11 * / * 17 + 5 +\n**Output:** 22\n\n## Constraints\n- 1 <= tokens.length <= 10^4\n- tokens[i] is either an operator or an integer.`,
    difficulty: "medium",
    testCases: [
      { input: "2 1 + 3 *", expectedOutput: "9", isExample: true },
      { input: "4 13 5 / +", expectedOutput: "6", isExample: true },
      { input: "10 6 9 3 + -11 * / * 17 + 5 +", expectedOutput: "22", isExample: true },
      { input: "18", expectedOutput: "18", isExample: false },
      { input: "3 4 +", expectedOutput: "7", isExample: false },
      { input: "-10 20 +", expectedOutput: "10", isExample: false },
      { input: "100 200 *", expectedOutput: "20000", isExample: false },
      { input: "1 2 + 3 4 + *", expectedOutput: "21", isExample: false },
      { input: "10 2 /", expectedOutput: "5", isExample: false },
      { input: "-5 -10 *", expectedOutput: "50", isExample: false }
    ],
    starterCode: {
      python: pythonBase,
      javascript: jsBase,
      cpp: `int evalRPN(vector<string>& tokens) {\n    // Write your solution here\n    \n}`,
    },
    driverCode: {
      python: "",
      javascript: "",
      cpp: `\n// --- Hidden Driver Code ---\n#include <iostream>\n#include <vector>\n#include <string>\nusing namespace std;\nint main() {\n    vector<string> tokens;\n    string s;\n    while (std::cin >> s) {\n        tokens.push_back(s);\n    }\n    std::cout << evalRPN(tokens) << "\\n";\n    return 0;\n}`,
    },
    minElo: 800,
  },
  {
    title: "Best Time to Buy and Sell Stock",
    description: `# Best Time to Buy and Sell Stock\n\nYou are given an array \`prices\` where \`prices[i]\` is the price of a given stock on the \`i\`th day.\n\nYou want to maximize your profit by choosing a single day to buy one stock and choosing a different day in the future to sell that stock.\n\nReturn the maximum profit you can achieve from this transaction. If you cannot achieve any profit, return \`0\`.\n\n## Examples\n\n**Input:** 7 1 5 3 6 4\n**Output:** 5\n*Explanation:* Buy on day 2 (price = 1) and sell on day 5 (price = 6), profit = 6-1 = 5.\n\n**Input:** 7 6 4 3 1\n**Output:** 0\n*Explanation:* In this case, no transactions are done and the max profit = 0.\n\n**Input:** 2 4 1\n**Output:** 2\n\n## Constraints\n- 1 <= prices.length <= 10^5\n- 0 <= prices[i] <= 10^4`,
    difficulty: "easy",
    testCases: [
      { input: "7 1 5 3 6 4", expectedOutput: "5", isExample: true },
      { input: "7 6 4 3 1", expectedOutput: "0", isExample: true },
      { input: "2 4 1", expectedOutput: "2", isExample: true },
      { input: "1 2", expectedOutput: "1", isExample: false },
      { input: "3 3 3 3 3", expectedOutput: "0", isExample: false },
      { input: "1 2 4 2 5 7 2 4 9 0 9", expectedOutput: "9", isExample: false },
      { input: "3 2 6 5 0 3", expectedOutput: "4", isExample: false },
      { input: "1 2 3 4 5", expectedOutput: "4", isExample: false },
      { input: "5 4 3 2 1", expectedOutput: "0", isExample: false },
      { input: "2 1 2 1 0 1 2", expectedOutput: "2", isExample: false }
    ],
    starterCode: {
      python: pythonBase,
      javascript: jsBase,
      cpp: `int maxProfit(vector<int>& prices) {\n    // Write your solution here\n    \n}`,
    },
    driverCode: {
      python: "",
      javascript: "",
      cpp: `\n// --- Hidden Driver Code ---\n#include <iostream>\n#include <vector>\nusing namespace std;\nint main() {\n    vector<int> prices;\n    int n;\n    while (std::cin >> n) {\n        prices.push_back(n);\n    }\n    std::cout << maxProfit(prices) << "\\n";\n    return 0;\n}`,
    },
    minElo: 0,
  },
  {
    title: "Longest Substring Without Repeating Characters",
    description: `# Longest Substring Without Repeating Characters\n\nGiven a string \`s\`, find the length of the longest substring without repeating characters.\n\n## Examples\n\n**Input:** abcabcbb\n**Output:** 3\n*Explanation:* The answer is "abc", with the length of 3.\n\n**Input:** bbbbb\n**Output:** 1\n\n**Input:** pwwkew\n**Output:** 3\n*Explanation:* The answer is "wke", with the length of 3. Note that the answer must be a substring, "pwke" is a subsequence and not a substring.\n\n## Constraints\n- 0 <= s.length <= 5 * 10^4\n- s consists of English letters, digits, symbols and spaces.`,
    difficulty: "medium",
    testCases: [
      { input: "abcabcbb", expectedOutput: "3", isExample: true },
      { input: "bbbbb", expectedOutput: "1", isExample: true },
      { input: "pwwkew", expectedOutput: "3", isExample: true },
      { input: "a", expectedOutput: "1", isExample: false },
      { input: "au", expectedOutput: "2", isExample: false },
      { input: "dvdf", expectedOutput: "3", isExample: false },
      { input: "tmmzuxt", expectedOutput: "5", isExample: false },
      { input: "abcdefg", expectedOutput: "7", isExample: false },
      { input: "aab", expectedOutput: "2", isExample: false },
      { input: "abba", expectedOutput: "2", isExample: false }
    ],
    starterCode: {
      python: pythonBase,
      javascript: jsBase,
      cpp: `int lengthOfLongestSubstring(string s) {\n    // Write your solution here\n    \n}`,
    },
    driverCode: {
      python: "",
      javascript: "",
      cpp: `\n// --- Hidden Driver Code ---\n#include <iostream>\n#include <string>\nusing namespace std;\nint main() {\n    string s;\n    std::cin >> s;\n    std::cout << lengthOfLongestSubstring(s) << "\\n";\n    return 0;\n}`,
    },
    minElo: 800,
  },
  {
    title: "Binary Search",
    description: `# Binary Search\n\nGiven an array of integers \`nums\` which is sorted in ascending order, and an integer \`target\`, write a function to search \`target\` in \`nums\`. If \`target\` exists, then return its index. Otherwise, return \`-1\`.\n\nYou must write an algorithm with \`O(log n)\` runtime complexity.\n\nThe input will be the elements of \`nums\`, followed by the \`target\`. \n\n## Examples\n\n**Input:** -1 0 3 5 9 12 9\n**Output:** 4\n*Explanation:* 9 exists in nums and its index is 4\n\n**Input:** -1 0 3 5 9 12 2\n**Output:** -1\n*Explanation:* 2 does not exist in nums so return -1\n\n**Input:** 1 2 3 4 5 3\n**Output:** 2\n\n## Constraints\n- 1 <= nums.length <= 10^4\n- -10^4 < nums[i], target < 10^4\n- All the integers in nums are unique.`,
    difficulty: "easy",
    testCases: [
      { input: "-1 0 3 5 9 12 9", expectedOutput: "4", isExample: true },
      { input: "-1 0 3 5 9 12 2", expectedOutput: "-1", isExample: true },
      { input: "1 2 3 4 5 3", expectedOutput: "2", isExample: true },
      { input: "5 5", expectedOutput: "0", isExample: false },
      { input: "2 5 2", expectedOutput: "0", isExample: false },
      { input: "-10 -5 0 5 10 0", expectedOutput: "2", isExample: false },
      { input: "1 2 3 4 5 6 7 8 9 10 10", expectedOutput: "9", isExample: false },
      { input: "2 4 6 8 10 6", expectedOutput: "2", isExample: false },
      { input: "1 3 5 7 9 0", expectedOutput: "-1", isExample: false },
      { input: "-10 -5 0 5 10 10", expectedOutput: "4", isExample: false }
    ],
    starterCode: {
      python: pythonBase,
      javascript: jsBase,
      cpp: `int search(vector<int>& nums, int target) {\n    // Write your solution here\n    \n}`,
    },
    driverCode: {
      python: "",
      javascript: "",
      cpp: `\n// --- Hidden Driver Code ---\n#include <iostream>\n#include <vector>\nusing namespace std;\nint main() {\n    vector<int> nums;\n    int n;\n    while (std::cin >> n) {\n        nums.push_back(n);\n    }\n    if (nums.empty()) return 0;\n    int target = nums.back();\n    nums.pop_back();\n    std::cout << search(nums, target) << "\\n";\n    return 0;\n}`,
    },
    minElo: 0,
  }
];
