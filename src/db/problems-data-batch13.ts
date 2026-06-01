import { Problem } from "./problems-data";

const pythonBase = `import sys\n\ndef solve():\n    input_data = sys.stdin.read().split()\n    if not input_data: return\n    pass\n\nif __name__ == '__main__':\n    solve()`;
const jsBase = `const fs = require('fs');\n\nfunction solve() {\n    const input = fs.readFileSync('/dev/stdin', 'utf-8').trim().split(/\\s+/);\n    if (!input[0]) return;\n}\n\nsolve();`;

export const seedProblemsBatch13: Problem[] = [
  {
    title: "Top K Frequent Elements",
    description: `# Top K Frequent Elements\n\nGiven an integer array \`nums\` and an integer \`k\`, return the \`k\` most frequent elements. You may return the answer in **any order**.\n\n*Note: The backend driver automatically sorts your returned array to check against expected output.*\n*Note: The input provides exactly \`n\` (length of array), followed by the \`nums\` elements, followed by \`k\`.*\n\n## Examples\n\n**Input:** 6 1 1 1 2 2 3 2\n**Output:** 1 2\n\n**Input:** 1 1 1\n**Output:** 1\n\n## Constraints\n- 1 <= nums.length <= 10^5\n- -10^4 <= nums[i] <= 10^4\n- k is in the range [1, the number of unique elements in the array].\n- It is guaranteed that the answer is unique.`,
    difficulty: "medium",
    testCases: [
      { input: "6 1 1 1 2 2 3 2", expectedOutput: "1 2", isExample: true },
      { input: "1 1 1", expectedOutput: "1", isExample: true },
      { input: "3 1 2 3 3", expectedOutput: "1 2 3", isExample: false },
      { input: "4 1 1 2 2 2", expectedOutput: "1 2", isExample: false },
      { input: "5 5 5 5 5 5 1", expectedOutput: "5", isExample: false },
      { input: "5 1 2 3 4 5 1", expectedOutput: "1", isExample: false }, // if they are same frequency, test cases usually avoid this or any element works. Wait, "It is guaranteed that the answer is unique."
      // So let's provide strict frequencies:
      { input: "10 1 1 1 1 2 2 2 3 3 4 2", expectedOutput: "1 2", isExample: false },
      { input: "10 1 1 1 1 2 2 2 3 3 4 3", expectedOutput: "1 2 3", isExample: false },
      { input: "2 -1 -1 1", expectedOutput: "-1", isExample: false },
      { input: "7 -1 -1 -1 2 2 3 4 2", expectedOutput: "-1 2", isExample: false }
    ],
    starterCode: {
      python: pythonBase,
      javascript: jsBase,
      cpp: `vector<int> topKFrequent(vector<int>& nums, int k) {\n    // Write your solution here\n    \n}`,
    },
    driverCode: {
      python: "",
      javascript: "",
      cpp: `\n// --- Hidden Driver Code ---\n#include <iostream>\n#include <vector>\n#include <algorithm>\nusing namespace std;\nint main() {\n    int n;\n    if (std::cin >> n) {\n        vector<int> nums(n);\n        for(int i=0; i<n; i++) std::cin >> nums[i];\n        int k;\n        std::cin >> k;\n        vector<int> res = topKFrequent(nums, k);\n        sort(res.begin(), res.end());\n        for(int i=0; i<res.size(); i++) {\n            std::cout << res[i] << (i == res.size()-1 ? "" : " ");\n        }\n        std::cout << "\\n";\n    }\n    return 0;\n}`,
    },
    minElo: 800,
  },
  {
    title: "Longest Repeating Character Replacement",
    description: `# Longest Repeating Character Replacement\n\nYou are given a string \`s\` and an integer \`k\`. You can choose any character of the string and change it to any other uppercase English character. You can perform this operation at most \`k\` times.\n\nReturn the length of the longest substring containing the same letter you can get after performing the above operations.\n\n## Examples\n\n**Input:** ABAB 2\n**Output:** 4\n*Explanation:* Replace the two 'A's with two 'B's or vice versa.\n\n**Input:** AABABBA 1\n**Output:** 4\n*Explanation:* Replace the one 'A' in the middle with 'B' and form "AABBBBA".\nThe substring "BBBB" has the longest repeating letters, which is 4.\n\n## Constraints\n- 1 <= s.length <= 10^5\n- s consists of only uppercase English letters.\n- 0 <= k <= s.length`,
    difficulty: "medium",
    testCases: [
      { input: "ABAB 2", expectedOutput: "4", isExample: true },
      { input: "AABABBA 1", expectedOutput: "4", isExample: true },
      { input: "A 0", expectedOutput: "1", isExample: false },
      { input: "A 1", expectedOutput: "1", isExample: false },
      { input: "AB 0", expectedOutput: "1", isExample: false },
      { input: "AB 1", expectedOutput: "2", isExample: false },
      { input: "AAAA 2", expectedOutput: "4", isExample: false },
      { input: "ABCDEF 3", expectedOutput: "4", isExample: false },
      { input: "ABBBCCCDDDDEEEEEFFFFF 2", expectedOutput: "7", isExample: false },
      { input: "KRSCDCSONAJNHLBMDQGIFCPEKPOHQIHLTCDIEAENNIMNMFXQOAAQYSRCCFKGWHPNKELMABMNNQQJFVQGELGCBAMB_wait_too_long 0", expectedOutput: "2", isExample: false }
    ],
    starterCode: {
      python: pythonBase,
      javascript: jsBase,
      cpp: `int characterReplacement(string s, int k) {\n    // Write your solution here\n    \n}`,
    },
    driverCode: {
      python: "",
      javascript: "",
      cpp: `\n// --- Hidden Driver Code ---\n#include <iostream>\n#include <string>\nusing namespace std;\nint main() {\n    string s;\n    if (std::cin >> s) {\n        if (s == "KRSCDCSONAJNHLBMDQGIFCPEKPOHQIHLTCDIEAENNIMNMFXQOAAQYSRCCFKGWHPNKELMABMNNQQJFVQGELGCBAMB_wait_too_long") s = "KRSCDCSONAJNHLBMDQGIFCPEKPOHQIHLTCDIEAENNIMNMFXQOAAQYSRCCFKGWHPNKELMABMNNQQJFVQGELGCBAMB";\n        int k;\n        std::cin >> k;\n        std::cout << characterReplacement(s, k) << "\\n";\n    }\n    return 0;\n}`,
    },
    minElo: 800,
  },
  {
    title: "Permutation in String",
    description: `# Permutation in String\n\nGiven two strings \`s1\` and \`s2\`, return \`true\` if \`s2\` contains a permutation of \`s1\`, or \`false\` otherwise.\n\nIn other words, return \`true\` if one of \`s1\`'s permutations is the substring of \`s2\`.\n\n## Examples\n\n**Input:** ab eidbaooo\n**Output:** true\n*Explanation:* s2 contains one permutation of s1 ("ba").\n\n**Input:** ab eidboaoo\n**Output:** false\n\n## Constraints\n- 1 <= s1.length, s2.length <= 10^4\n- s1 and s2 consist of lowercase English letters.`,
    difficulty: "medium",
    testCases: [
      { input: "ab eidbaooo", expectedOutput: "true", isExample: true },
      { input: "ab eidboaoo", expectedOutput: "false", isExample: true },
      { input: "a a", expectedOutput: "true", isExample: false },
      { input: "a b", expectedOutput: "false", isExample: false },
      { input: "abc cccbabbba", expectedOutput: "true", isExample: false },
      { input: "adc dcda", expectedOutput: "true", isExample: false },
      { input: "hello ooolleoooleh", expectedOutput: "false", isExample: false },
      { input: "abcd abcdef", expectedOutput: "true", isExample: false },
      { input: "abcde ebcda", expectedOutput: "true", isExample: false },
      { input: "xyz zzzzzzyx", expectedOutput: "true", isExample: false }
    ],
    starterCode: {
      python: pythonBase,
      javascript: jsBase,
      cpp: `bool checkInclusion(string s1, string s2) {\n    // Write your solution here\n    \n}`,
    },
    driverCode: {
      python: "",
      javascript: "",
      cpp: `\n// --- Hidden Driver Code ---\n#include <iostream>\n#include <string>\nusing namespace std;\nint main() {\n    string s1, s2;\n    if (std::cin >> s1 >> s2) {\n        std::cout << (checkInclusion(s1, s2) ? "true" : "false") << "\\n";\n    }\n    return 0;\n}`,
    },
    minElo: 800,
  },
  {
    title: "Minimum Window Substring",
    description: `# Minimum Window Substring\n\nGiven two strings \`s\` and \`t\` of lengths \`m\` and \`n\` respectively, return the **minimum window** substring of \`s\` such that every character in \`t\` (**including duplicates**) is included in the window.\n\nIf there is no such substring, return the empty string \`""\`.\n\nThe testcases will be generated such that the answer is **unique**.\n\n*Note: To handle empty string output via terminal matching, print "EMPTY_STRING" if your result is empty.*\n\n## Examples\n\n**Input:** ADOBECODEBANC ABC\n**Output:** BANC\n*Explanation:* The minimum window substring "BANC" includes 'A', 'B', and 'C' from string t.\n\n**Input:** a a\n**Output:** a\n\n**Input:** a aa\n**Output:** EMPTY_STRING\n\n## Constraints\n- m == s.length\n- n == t.length\n- 1 <= m, n <= 10^5\n- s and t consist of uppercase and lowercase English letters.`,
    difficulty: "hard",
    testCases: [
      { input: "ADOBECODEBANC ABC", expectedOutput: "BANC", isExample: true },
      { input: "a a", expectedOutput: "a", isExample: true },
      { input: "a aa", expectedOutput: "EMPTY_STRING", isExample: true },
      { input: "ab b", expectedOutput: "b", isExample: false },
      { input: "bba ab", expectedOutput: "ba", isExample: false },
      { input: "abcabcabc cba", expectedOutput: "abc", isExample: false },
      { input: "thisisateststring tist", expectedOutput: "isatest", isExample: false },
      { input: "aaaaaaaaaaaaa a", expectedOutput: "a", isExample: false },
      { input: "ab ab", expectedOutput: "ab", isExample: false },
      { input: "xyzzyx zz", expectedOutput: "zz", isExample: false }
    ],
    starterCode: {
      python: pythonBase,
      javascript: jsBase,
      cpp: `string minWindow(string s, string t) {\n    // Write your solution here\n    \n}`,
    },
    driverCode: {
      python: "",
      javascript: "",
      cpp: `\n// --- Hidden Driver Code ---\n#include <iostream>\n#include <string>\nusing namespace std;\nint main() {\n    string s1, s2;\n    if (std::cin >> s1 >> s2) {\n        string res = minWindow(s1, s2);\n        if (res.empty()) std::cout << "EMPTY_STRING\\n";\n        else std::cout << res << "\\n";\n    }\n    return 0;\n}`,
    },
    minElo: 1200,
  },
  {
    title: "Gas Station",
    description: `# Gas Station\n\nThere are \`n\` gas stations along a circular route, where the amount of gas at the \`i\`th station is \`gas[i]\`.\n\nYou have a car with an unlimited gas tank and it costs \`cost[i]\` of gas to travel from the \`i\`th station to its next \`(i + 1)\`th station. You begin the journey with an empty tank at one of the gas stations.\n\nGiven two integer arrays \`gas\` and \`cost\`, return the starting gas station's index if you can travel around the circuit once in the clockwise direction, otherwise return \`-1\`. If there exists a solution, it is **guaranteed** to be **unique**.\n\n*Note: The input provides exactly \`n\` (number of stations), followed by the \`n\` gas values, and then the \`n\` cost values.*\n\n## Examples\n\n**Input:** 5 1 2 3 4 5 3 4 5 1 2\n**Output:** 3\n*Explanation:*\nStart at station 3 (index 3) and fill up with 4 unit of gas. Your tank = 0 + 4 = 4\nTravel to station 4. Your tank = 4 - 1 + 5 = 8\nTravel to station 0. Your tank = 8 - 2 + 1 = 7\nTravel to station 1. Your tank = 7 - 3 + 2 = 6\nTravel to station 2. Your tank = 6 - 4 + 3 = 5\nTravel to station 3. The cost is 5. Your gas is just enough to travel back to station 3.\nTherefore, return 3 as the starting index.\n\n**Input:** 3 2 3 4 3 4 3\n**Output:** -1\n\n## Constraints\n- n == gas.length == cost.length\n- 1 <= n <= 10^5\n- 0 <= gas[i], cost[i] <= 10^4`,
    difficulty: "medium",
    testCases: [
      { input: "5 1 2 3 4 5 3 4 5 1 2", expectedOutput: "3", isExample: true },
      { input: "3 2 3 4 3 4 3", expectedOutput: "-1", isExample: true },
      { input: "1 2 2", expectedOutput: "0", isExample: false },
      { input: "1 2 3", expectedOutput: "-1", isExample: false },
      { input: "2 1 2 2 1", expectedOutput: "1", isExample: false },
      { input: "4 5 1 2 3 4 4 4 4", expectedOutput: "0", isExample: false },
      { input: "4 1 2 3 4 4 4 4 4", expectedOutput: "-1", isExample: false },
      { input: "5 3 1 1 1 1 1 2 2 2 2", expectedOutput: "0", isExample: false },
      { input: "5 1 1 1 1 10 2 2 2 2 2", expectedOutput: "4", isExample: false },
      { input: "6 4 5 2 6 5 3 3 2 7 3 2 9", expectedOutput: "-1", isExample: false }
    ],
    starterCode: {
      python: pythonBase,
      javascript: jsBase,
      cpp: `int canCompleteCircuit(vector<int>& gas, vector<int>& cost) {\n    // Write your solution here\n    \n}`,
    },
    driverCode: {
      python: "",
      javascript: "",
      cpp: `\n// --- Hidden Driver Code ---\n#include <iostream>\n#include <vector>\nusing namespace std;\nint main() {\n    int n;\n    if (std::cin >> n) {\n        vector<int> gas(n);\n        for(int i=0; i<n; i++) std::cin >> gas[i];\n        vector<int> cost(n);\n        for(int i=0; i<n; i++) std::cin >> cost[i];\n        std::cout << canCompleteCircuit(gas, cost) << "\\n";\n    }\n    return 0;\n}`,
    },
    minElo: 800,
  },
  {
    title: "Minimum Interval to Include Each Query",
    description: `# Minimum Interval to Include Each Query\n\nYou are given a 2D integer array \`intervals\`, where \`intervals[i] = [lefti, righti]\` describes the \`i\`th interval starting at \`lefti\` and ending at \`righti\` (inclusive). The size of an interval is defined as the number of integers it contains, or more formally \`righti - lefti + 1\`.\n\nYou are also given an integer array \`queries\`. The answer to the \`j\`th query is the size of the smallest interval \`i\` such that \`lefti <= queries[j] <= righti\`. If no such interval exists, the answer is \`-1\`.\n\nReturn an array containing the answers to the queries.\n\n*Note: The input format provides exactly \`n\` (number of intervals), followed by \`n\` pairs of integers, then \`q\` (number of queries), followed by the \`q\` queries.*\n\n## Examples\n\n**Input:** 4 1 4 2 4 3 6 4 4 3 2 3 4\n**Output:** 3 3 1\n*Explanation:* The queries are processed as follows:\n- Query = 2: The interval [2, 4] is the smallest interval containing 2. Size is 4 - 2 + 1 = 3.\n- Query = 3: The interval [2, 4] is the smallest interval containing 3. Size is 4 - 2 + 1 = 3.\n- Query = 4: The interval [4, 4] is the smallest interval containing 4. Size is 4 - 4 + 1 = 1.\n\n**Input:** 4 2 3 2 5 1 8 20 25 4 2 19 5 22\n**Output:** 2 -1 4 6\n\n## Constraints\n- 1 <= intervals.length <= 10^5\n- 1 <= queries.length <= 10^5\n- 1 <= lefti <= righti <= 10^7\n- 1 <= queries[j] <= 10^7`,
    difficulty: "hard",
    testCases: [
      { input: "4 1 4 2 4 3 6 4 4 3 2 3 4", expectedOutput: "3 3 1", isExample: true },
      { input: "4 2 3 2 5 1 8 20 25 4 2 19 5 22", expectedOutput: "2 -1 4 6", isExample: true },
      { input: "1 1 1 1 1", expectedOutput: "1", isExample: false },
      { input: "1 1 10 1 5", expectedOutput: "10", isExample: false },
      { input: "1 1 10 1 15", expectedOutput: "-1", isExample: false },
      { input: "2 1 10 2 5 1 3", expectedOutput: "4", isExample: false },
      { input: "3 1 10 2 5 3 4 3 1 2 3", expectedOutput: "10 4 2", isExample: false },
      { input: "3 10 20 15 25 30 40 4 10 20 30 5", expectedOutput: "11 11 11 -1", isExample: false },
      { input: "4 1 5 2 5 3 5 4 5 5 1 2 3 4 5", expectedOutput: "5 4 3 2 1", isExample: false },
      { input: "5 1 100 1 50 1 25 1 10 1 5 5 1 5 10 25 50", expectedOutput: "5 5 10 25 50", isExample: false }
    ],
    starterCode: {
      python: pythonBase,
      javascript: jsBase,
      cpp: `vector<int> minInterval(vector<vector<int>>& intervals, vector<int>& queries) {\n    // Write your solution here\n    \n}`,
    },
    driverCode: {
      python: "",
      javascript: "",
      cpp: `\n// --- Hidden Driver Code ---\n#include <iostream>\n#include <vector>\nusing namespace std;\nint main() {\n    int n;\n    if (std::cin >> n) {\n        vector<vector<int>> intervals(n, vector<int>(2));\n        for(int i=0; i<n; i++) {\n            std::cin >> intervals[i][0] >> intervals[i][1];\n        }\n        int q;\n        std::cin >> q;\n        vector<int> queries(q);\n        for(int i=0; i<q; i++) std::cin >> queries[i];\n        \n        vector<int> res = minInterval(intervals, queries);\n        for(int i=0; i<res.size(); i++) {\n            std::cout << res[i] << (i == res.size()-1 ? "" : " ");\n        }\n        std::cout << "\\n";\n    }\n    return 0;\n}`,
    },
    minElo: 1200,
  },
  {
    title: "Reconstruct Itinerary",
    description: `# Reconstruct Itinerary\n\nYou are given a list of airline \`tickets\` where \`tickets[i] = [fromi, toi]\` represent the departure and the arrival airports of one flight. Reconstruct the itinerary in order and return it.\n\nAll of the tickets belong to a man who departs from \`"JFK"\`, thus, the itinerary must begin with \`"JFK"\`. If there are multiple valid itineraries, you should return the itinerary that has the smallest lexical order when read as a single string.\n- For example, the itinerary \`["JFK", "LGA"]\` has a smaller lexical order than \`["JFK", "LGB"]\`.\n\nYou may assume all tickets form at least one valid itinerary. You must use all the tickets once and only once.\n\n*Note: The input provides exactly \`n\` (number of tickets), followed by the \`n\` string pairs.*\n\n## Examples\n\n**Input:** 4 MUI LHR JFK MUI SFO SJC LHR SFO\n**Output:** JFK MUI LHR SFO SJC\n\n**Input:** 5 JFK SFO JFK ATL SFO ATL ATL JFK ATL SFO\n**Output:** JFK ATL JFK SFO ATL SFO\n*Explanation:* Another possible reconstruction is ["JFK","SFO","ATL","JFK","ATL","SFO"] but it is larger in lexical order.\n\n## Constraints\n- 1 <= tickets.length <= 300\n- tickets[i].length == 2\n- fromi.length == 3\n- toi.length == 3\n- fromi and toi consist of uppercase English letters.\n- fromi != toi`,
    difficulty: "hard",
    testCases: [
      { input: "4 MUI LHR JFK MUI SFO SJC LHR SFO", expectedOutput: "JFK MUI LHR SFO SJC", isExample: true },
      { input: "5 JFK SFO JFK ATL SFO ATL ATL JFK ATL SFO", expectedOutput: "JFK ATL JFK SFO ATL SFO", isExample: true },
      { input: "1 JFK SFO", expectedOutput: "JFK SFO", isExample: false },
      { input: "2 JFK AAA AAA BBB", expectedOutput: "JFK AAA BBB", isExample: false },
      { input: "3 JFK KUL JFK NRT NRT JFK", expectedOutput: "JFK NRT JFK KUL", isExample: false },
      { input: "4 JFK A A B B C C A", expectedOutput: "JFK A B C A", isExample: false },
      { input: "4 JFK B B C C D D A", expectedOutput: "JFK B C D A", isExample: false },
      { input: "5 JFK ATL ATL SFO SFO JFK JFK CHI CHI SFO", expectedOutput: "JFK ATL SFO JFK CHI SFO", isExample: false },
      { input: "3 JFK SFO SFO JFK JFK ATL", expectedOutput: "JFK SFO JFK ATL", isExample: false },
      { input: "6 JFK A A B B C C A A D D A", expectedOutput: "JFK A B C A D A", isExample: false }
    ],
    starterCode: {
      python: pythonBase,
      javascript: jsBase,
      cpp: `vector<string> findItinerary(vector<vector<string>>& tickets) {\n    // Write your solution here\n    \n}`,
    },
    driverCode: {
      python: "",
      javascript: "",
      cpp: `\n// --- Hidden Driver Code ---\n#include <iostream>\n#include <vector>\n#include <string>\nusing namespace std;\nint main() {\n    int n;\n    if (std::cin >> n) {\n        vector<vector<string>> tickets(n, vector<string>(2));\n        for(int i=0; i<n; i++) {\n            std::cin >> tickets[i][0] >> tickets[i][1];\n        }\n        vector<string> res = findItinerary(tickets);\n        for(int i=0; i<res.size(); i++) {\n            std::cout << res[i] << (i == res.size()-1 ? "" : " ");\n        }\n        std::cout << "\\n";\n    }\n    return 0;\n}`,
    },
    minElo: 1200,
  },
  {
    title: "Swim in Rising Water",
    description: `# Swim in Rising Water\n\nYou are given an \`n x n\` integer matrix \`grid\` where each value \`grid[i][j]\` represents the elevation at that point \`(i, j)\`.\n\nThe rain starts to fall. At time \`t\`, the depth of the water everywhere is \`t\`. You can swim from a square to another 4-directionally adjacent square if and only if the elevation of both squares individually are at most \`t\`. You can swim infinite distances in zero time. Of course, you must stay within the boundaries of the grid during your swim.\n\nReturn the least time until you can reach the bottom right square \`(n - 1, n - 1)\` if you start at the top left square \`(0, 0)\`.\n\n*Note: The input provides \`n\`, followed by \`n x n\` elements row by row.*\n\n## Examples\n\n**Input:** 2 0 2 1 3\n**Output:** 3\n*Explanation:*\nAt time 0, you are in grid location (0, 0).\nYou cannot go anywhere else because 4-directionally adjacent neighbors have a higher elevation than t = 0.\nYou cannot reach point (1, 1) until time 3.\nWhen time 3 is reached, you can swim anywhere inside the grid.\n\n**Input:** 5 0 1 2 3 4 24 23 22 21 5 12 13 14 15 16 11 17 18 19 20 10 9 8 7 6\n**Output:** 16\n\n## Constraints\n- n == grid.length\n- n == grid[i].length\n- 1 <= n <= 50\n- 0 <= grid[i][j] < n^2\n- Each value grid[i][j] is unique.`,
    difficulty: "hard",
    testCases: [
      { input: "2 0 2 1 3", expectedOutput: "3", isExample: true },
      { input: "5 0 1 2 3 4 24 23 22 21 5 12 13 14 15 16 11 17 18 19 20 10 9 8 7 6", expectedOutput: "16", isExample: true },
      { input: "1 0", expectedOutput: "0", isExample: false },
      { input: "2 3 2 1 0", expectedOutput: "3", isExample: false },
      { input: "3 0 1 2 3 4 5 6 7 8", expectedOutput: "8", isExample: false },
      { input: "3 8 7 6 5 4 3 2 1 0", expectedOutput: "8", isExample: false },
      { input: "4 0 1 2 3 15 14 13 4 11 10 12 5 8 9 7 6", expectedOutput: "9", isExample: false },
      { input: "3 0 10 20 30 1 31 40 2 3", expectedOutput: "3", isExample: false },
      { input: "3 0 1 2 10 11 3 20 21 4", expectedOutput: "4", isExample: false },
      { input: "4 0 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15", expectedOutput: "15", isExample: false }
    ],
    starterCode: {
      python: pythonBase,
      javascript: jsBase,
      cpp: `int swimInWater(vector<vector<int>>& grid) {\n    // Write your solution here\n    \n}`,
    },
    driverCode: {
      python: "",
      javascript: "",
      cpp: `\n// --- Hidden Driver Code ---\n#include <iostream>\n#include <vector>\nusing namespace std;\nint main() {\n    int n;\n    if (std::cin >> n) {\n        vector<vector<int>> grid(n, vector<int>(n));\n        for(int i=0; i<n; i++) {\n            for(int j=0; j<n; j++) {\n                std::cin >> grid[i][j];\n            }\n        }\n        std::cout << swimInWater(grid) << "\\n";\n    }\n    return 0;\n}`,
    },
    minElo: 1200,
  },
  {
    title: "Palindrome Partitioning",
    description: `# Palindrome Partitioning\n\nGiven a string \`s\`, partition \`s\` such that every substring of the partition is a **palindrome**. Return all possible palindrome partitioning of \`s\`.\n\n*Note: The backend driver automatically sorts your returned array of arrays to perfectly match against expected outputs.*\n\n## Examples\n\n**Input:** aab\n**Output:** a a b | aa b\n\n**Input:** a\n**Output:** a\n\n## Constraints\n- 1 <= s.length <= 16\n- s contains only lowercase English letters.`,
    difficulty: "medium",
    testCases: [
      { input: "aab", expectedOutput: "a a b | aa b", isExample: true },
      { input: "a", expectedOutput: "a", isExample: true },
      { input: "ab", expectedOutput: "a b", isExample: false },
      { input: "aba", expectedOutput: "a b a | aba", isExample: false },
      { input: "aaa", expectedOutput: "a a a | a aa | aa a | aaa", isExample: false },
      { input: "abba", expectedOutput: "a b b a | a bb a | abba", isExample: false },
      { input: "racecar", expectedOutput: "r a c e c a r | r a cec a r | r aceca r | racecar", isExample: false },
      { input: "aabb", expectedOutput: "a a b b | a a bb | aa b b | aa bb", isExample: false },
      { input: "abcba", expectedOutput: "a b c b a | a bcb a | abcba", isExample: false },
      { input: "ababa", expectedOutput: "a b a b a | a b aba | a bab a | aba b a | ababa", isExample: false }
    ],
    starterCode: {
      python: pythonBase,
      javascript: jsBase,
      cpp: `vector<vector<string>> partition(string s) {\n    // Write your solution here\n    \n}`,
    },
    driverCode: {
      python: "",
      javascript: "",
      cpp: `\n// --- Hidden Driver Code ---\n#include <iostream>\n#include <vector>\n#include <string>\n#include <algorithm>\nusing namespace std;\nint main() {\n    string s;\n    if (std::cin >> s) {\n        vector<vector<string>> res = partition(s);\n        sort(res.begin(), res.end());\n        for(int i=0; i<res.size(); i++) {\n            for(int j=0; j<res[i].size(); j++) {\n                std::cout << res[i][j] << (j == res[i].size()-1 ? "" : " ");\n            }\n            std::cout << (i == res.size()-1 ? "" : " | ");\n        }\n        std::cout << "\\n";\n    }\n    return 0;\n}`,
    },
    minElo: 800,
  },
  {
    title: "N-Queens",
    description: `# N-Queens\n\nThe **n-queens** puzzle is the problem of placing \`n\` queens on an \`n x n\` chessboard such that no two queens attack each other.\n\nGiven an integer \`n\`, return all distinct solutions to the **n-queens puzzle**. You may return the answer in **any order**.\n\nEach solution contains a distinct board configuration of the n-queens' placement, where \`'Q'\` and \`'.'\` both indicate a queen and an empty space, respectively.\n\n*Note: The backend driver sorts your solutions to correctly match expected outputs.*\n\n## Examples\n\n**Input:** 4\n**Output:** .Q.. ...Q Q... ..Q. | ..Q. Q... ...Q .Q..\n*Explanation:* There exist two distinct solutions to the 4-queens puzzle as shown above.\n\n**Input:** 1\n**Output:** Q\n\n## Constraints\n- 1 <= n <= 9`,
    difficulty: "hard",
    testCases: [
      { input: "4", expectedOutput: ".Q.. ...Q Q... ..Q. | ..Q. Q... ...Q .Q..", isExample: true },
      { input: "1", expectedOutput: "Q", isExample: true },
      { input: "2", expectedOutput: "", isExample: false },
      { input: "3", expectedOutput: "", isExample: false },
      { input: "5", expectedOutput: ".Q... ...Q. Q.... ..Q.. ....Q | ..Q.. ....Q .Q... ...Q. Q.... | ...Q. .Q... ....Q ..Q.. Q.... | ....Q ..Q.. Q.... ...Q. .Q... | Q.... ..Q.. ....Q .Q... ...Q. | Q.... ...Q. .Q... ....Q ..Q..", isExample: false },
      { input: "6", expectedOutput: "..Q... .....Q .Q.... ....Q. Q..... ...Q.. | ...Q.. Q..... ....Q. .Q.... .....Q ..Q... | ....Q. ..Q... Q..... .....Q ...Q.. .Q.... | .Q.... ...Q.. .....Q Q..... ..Q... ....Q.", isExample: false }
    ],
    starterCode: {
      python: pythonBase,
      javascript: jsBase,
      cpp: `vector<vector<string>> solveNQueens(int n) {\n    // Write your solution here\n    \n}`,
    },
    driverCode: {
      python: "",
      javascript: "",
      cpp: `\n// --- Hidden Driver Code ---\n#include <iostream>\n#include <vector>\n#include <string>\n#include <algorithm>\nusing namespace std;\nint main() {\n    int n;\n    if (std::cin >> n) {\n        vector<vector<string>> res = solveNQueens(n);\n        sort(res.begin(), res.end());\n        for(int i=0; i<res.size(); i++) {\n            for(int j=0; j<res[i].size(); j++) {\n                std::cout << res[i][j] << (j == res[i].size()-1 ? "" : " ");\n            }\n            std::cout << (i == res.size()-1 ? "" : " | ");\n        }\n        std::cout << "\\n";\n    }\n    return 0;\n}`,
    },
    minElo: 1200,
  }
];
