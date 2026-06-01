import { Problem } from "./problems-data";

const pythonBase = `import sys\n\ndef solve():\n    input_data = sys.stdin.read().split()\n    if not input_data: return\n    pass\n\nif __name__ == '__main__':\n    solve()`;
const jsBase = `const fs = require('fs');\n\nfunction solve() {\n    const input = fs.readFileSync('/dev/stdin', 'utf-8').trim().split(/\\s+/);\n    if (!input[0]) return;\n}\n\nsolve();`;

export const seedProblemsBatch3: Problem[] = [
  {
    title: "Find Minimum in Rotated Sorted Array",
    description: `# Find Minimum in Rotated Sorted Array\n\nSuppose an array of length \`n\` sorted in ascending order is **rotated** between \`1\` and \`n\` times. For example, the array \`nums = [0,1,2,4,5,6,7]\` might become:\n- \`[4,5,6,7,0,1,2]\` if it was rotated 4 times.\n- \`[0,1,2,4,5,6,7]\` if it was rotated 7 times.\n\nNotice that rotating an array \`[a[0], a[1], a[2], ..., a[n-1]]\` 1 time results in the array \`[a[n-1], a[0], a[1], a[2], ..., a[n-2]]\`.\n\nGiven the sorted rotated array \`nums\` of **unique** elements, return the minimum element of this array.\n\nYou must write an algorithm that runs in \`O(log n) time\`.\n\n## Examples\n\n**Input:** 3 4 5 1 2\n**Output:** 1\n*Explanation:* The original array was [1,2,3,4,5] rotated 3 times.\n\n**Input:** 4 5 6 7 0 1 2\n**Output:** 0\n*Explanation:* The original array was [0,1,2,4,5,6,7] and it was rotated 4 times.\n\n**Input:** 11 13 15 17\n**Output:** 11\n\n## Constraints\n- 1 <= nums.length <= 5000\n- -5000 <= nums[i] <= 5000\n- All the integers of nums are unique.\n- nums is sorted and rotated between 1 and n times.`,
    difficulty: "medium",
    testCases: [
      { input: "3 4 5 1 2", expectedOutput: "1", isExample: true },
      { input: "4 5 6 7 0 1 2", expectedOutput: "0", isExample: true },
      { input: "11 13 15 17", expectedOutput: "11", isExample: true },
      { input: "2 1", expectedOutput: "1", isExample: false },
      { input: "1", expectedOutput: "1", isExample: false },
      { input: "5 1 2 3 4", expectedOutput: "1", isExample: false },
      { input: "1 2 3 4 5 0", expectedOutput: "0", isExample: false },
      { input: "-5 -4 -3 -2 -1 -10 -9 -8 -7 -6", expectedOutput: "-10", isExample: false },
      { input: "10 11 12 13 14 15 1 2 3 4 5 6 7 8 9", expectedOutput: "1", isExample: false },
      { input: "0 100 200 300 -100 -50", expectedOutput: "-100", isExample: false }
    ],
    starterCode: {
      python: pythonBase,
      javascript: jsBase,
      cpp: `int findMin(vector<int>& nums) {\n    // Write your solution here\n    \n}`,
    },
    driverCode: {
      python: "",
      javascript: "",
      cpp: `\n// --- Hidden Driver Code ---\n#include <iostream>\n#include <vector>\nusing namespace std;\nint main() {\n    vector<int> nums;\n    int n;\n    while (std::cin >> n) {\n        nums.push_back(n);\n    }\n    std::cout << findMin(nums) << "\\n";\n    return 0;\n}`,
    },
    minElo: 800,
  },
  {
    title: "Search in Rotated Sorted Array",
    description: `# Search in Rotated Sorted Array\n\nThere is an integer array \`nums\` sorted in ascending order (with **distinct** values).\n\nPrior to being passed to your function, \`nums\` is **possibly rotated** at an unknown pivot index \`k\` \`(1 <= k < nums.length)\` such that the resulting array is \`[nums[k], nums[k+1], ..., nums[n-1], nums[0], nums[1], ..., nums[k-1]]\` (0-indexed).\n\nGiven the array \`nums\` **after** the possible rotation and an integer \`target\`, return the index of \`target\` if it is in \`nums\`, or \`-1\` if it is not in \`nums\`.\n\nYou must write an algorithm with \`O(log n)\` runtime complexity.\n\n*Note: The input format passes the array elements first, and the last number is the \`target\`.*\n\n## Examples\n\n**Input:** 4 5 6 7 0 1 2 0\n**Output:** 4\n*Explanation:* Target 0 is at index 4.\n\n**Input:** 4 5 6 7 0 1 2 3\n**Output:** -1\n*Explanation:* Target 3 is not in the array.\n\n**Input:** 1 0\n**Output:** -1\n\n## Constraints\n- 1 <= nums.length <= 5000\n- -10^4 <= nums[i] <= 10^4\n- All values of nums are unique.\n- -10^4 <= target <= 10^4`,
    difficulty: "medium",
    testCases: [
      { input: "4 5 6 7 0 1 2 0", expectedOutput: "4", isExample: true },
      { input: "4 5 6 7 0 1 2 3", expectedOutput: "-1", isExample: true },
      { input: "1 0", expectedOutput: "-1", isExample: true },
      { input: "1 3 3", expectedOutput: "1", isExample: false },
      { input: "3 1 1", expectedOutput: "1", isExample: false },
      { input: "5 1 3 5", expectedOutput: "0", isExample: false },
      { input: "4 5 6 7 8 1 2 3 8", expectedOutput: "4", isExample: false },
      { input: "8 1 2 3 4 5 6 7 8", expectedOutput: "0", isExample: false },
      { input: "1 2 3 4 5 6 2", expectedOutput: "1", isExample: false },
      { input: "5 1 2 3 4 2", expectedOutput: "2", isExample: false }
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
    minElo: 800,
  },
  {
    title: "Koko Eating Bananas",
    description: `# Koko Eating Bananas\n\nKoko loves to eat bananas. There are \`n\` piles of bananas, the \`i\`th pile has \`piles[i]\` bananas. The guards have gone and will come back in \`h\` hours.\n\nKoko can decide her bananas-per-hour eating speed of \`k\`. Each hour, she chooses some pile of bananas and eats \`k\` bananas from that pile. If the pile has less than \`k\` bananas, she eats all of them instead and will not eat any more bananas during this hour.\n\nKoko likes to eat slowly but still wants to finish eating all the bananas before the guards return.\n\nReturn the minimum integer \`k\` such that she can eat all the bananas within \`h\` hours.\n\n*Note: The input provides the array \`piles\` followed by the integer \`h\` at the end.*\n\n## Examples\n\n**Input:** 3 6 7 11 8\n**Output:** 4\n*Explanation:* piles=[3,6,7,11], h=8.\n\n**Input:** 30 11 23 4 20 5\n**Output:** 30\n*Explanation:* piles=[30,11,23,4,20], h=5.\n\n**Input:** 30 11 23 4 20 6\n**Output:** 23\n\n## Constraints\n- 1 <= piles.length <= 10^4\n- piles.length <= h <= 10^9\n- 1 <= piles[i] <= 10^9`,
    difficulty: "medium",
    testCases: [
      { input: "3 6 7 11 8", expectedOutput: "4", isExample: true },
      { input: "30 11 23 4 20 5", expectedOutput: "30", isExample: true },
      { input: "30 11 23 4 20 6", expectedOutput: "23", isExample: true },
      { input: "10 10 10 10 10 10", expectedOutput: "10", isExample: false },
      { input: "10 10 10 10 10 20", expectedOutput: "5", isExample: false },
      { input: "1 1 1 1 1 1 100", expectedOutput: "1", isExample: false },
      { input: "1000000000 2", expectedOutput: "500000000", isExample: false },
      { input: "312884470 968709470 312884469", expectedOutput: "312884470", isExample: false },
      { input: "10 9 8 7 6 5 4 3 2 1 10", expectedOutput: "10", isExample: false },
      { input: "5 5", expectedOutput: "5", isExample: false }
    ],
    starterCode: {
      python: pythonBase,
      javascript: jsBase,
      cpp: `int minEatingSpeed(vector<int>& piles, int h) {\n    // Write your solution here\n    \n}`,
    },
    driverCode: {
      python: "",
      javascript: "",
      cpp: `\n// --- Hidden Driver Code ---\n#include <iostream>\n#include <vector>\nusing namespace std;\nint main() {\n    vector<int> nums;\n    int n;\n    while (std::cin >> n) {\n        nums.push_back(n);\n    }\n    if (nums.empty()) return 0;\n    int h = nums.back();\n    nums.pop_back();\n    std::cout << minEatingSpeed(nums, h) << "\\n";\n    return 0;\n}`,
    },
    minElo: 800,
  },
  {
    title: "Median of Two Sorted Arrays",
    description: `# Median of Two Sorted Arrays\n\nGiven two sorted arrays \`nums1\` and \`nums2\` of size \`m\` and \`n\` respectively, return the median of the two sorted arrays.\n\nThe overall run time complexity should be \`O(log (m+n))\`.\n\n*Note: The input format is exactly: \`m\` \`n\` followed by \`m\` elements for the first array, and then \`n\` elements for the second array.*\n\n## Examples\n\n**Input:** 2 1 1 3 2\n**Output:** 2.00000\n*Explanation:* m=2, n=1. nums1=[1,3], nums2=[2]. merged=[1,2,3] median=2.\n\n**Input:** 2 2 1 2 3 4\n**Output:** 2.50000\n*Explanation:* merged array = [1,2,3,4] and median is (2 + 3) / 2 = 2.5.\n\n**Input:** 0 1 1\n**Output:** 1.00000\n\n## Constraints\n- 0 <= m, n <= 1000\n- 1 <= m + n <= 2000\n- -10^6 <= nums1[i], nums2[i] <= 10^6`,
    difficulty: "hard",
    testCases: [
      { input: "2 1 1 3 2", expectedOutput: "2", isExample: true },
      { input: "2 2 1 2 3 4", expectedOutput: "2.5", isExample: true },
      { input: "0 1 1", expectedOutput: "1", isExample: true },
      { input: "1 0 2", expectedOutput: "2", isExample: false },
      { input: "1 1 100000 100001", expectedOutput: "100000.5", isExample: false },
      { input: "2 3 1 5 2 3 4", expectedOutput: "3", isExample: false },
      { input: "5 5 1 2 3 4 5 6 7 8 9 10", expectedOutput: "5.5", isExample: false },
      { input: "3 3 1 2 3 1 2 3", expectedOutput: "2", isExample: false },
      { input: "2 1 -1 3 2", expectedOutput: "2", isExample: false },
      { input: "4 2 1 3 5 7 2 4", expectedOutput: "3.5", isExample: false }
    ],
    starterCode: {
      python: pythonBase,
      javascript: jsBase,
      cpp: `double findMedianSortedArrays(vector<int>& nums1, vector<int>& nums2) {\n    // Write your solution here\n    \n}`,
    },
    driverCode: {
      python: "",
      javascript: "",
      cpp: `\n// --- Hidden Driver Code ---\n#include <iostream>\n#include <vector>\nusing namespace std;\nint main() {\n    int m, n;\n    if (std::cin >> m >> n) {\n        vector<int> nums1(m), nums2(n);\n        for (int i = 0; i < m; i++) std::cin >> nums1[i];\n        for (int i = 0; i < n; i++) std::cin >> nums2[i];\n        double ans = findMedianSortedArrays(nums1, nums2);\n        // Formatting to match expected output perfectly without trailing zeroes if int\n        if (ans == (long long)ans) std::cout << (long long)ans << "\\n";\n        else std::cout << ans << "\\n";\n    }\n    return 0;\n}`,
    },
    minElo: 1200,
  },
  {
    title: "Climbing Stairs",
    description: `# Climbing Stairs\n\nYou are climbing a staircase. It takes \`n\` steps to reach the top.\n\nEach time you can either climb \`1\` or \`2\` steps. In how many distinct ways can you climb to the top?\n\n## Examples\n\n**Input:** 2\n**Output:** 2\n*Explanation:* There are two ways to climb to the top.\n1. 1 step + 1 step\n2. 2 steps\n\n**Input:** 3\n**Output:** 3\n*Explanation:* There are three ways to climb to the top.\n1. 1 step + 1 step + 1 step\n2. 1 step + 2 steps\n3. 2 steps + 1 step\n\n**Input:** 4\n**Output:** 5\n\n## Constraints\n- 1 <= n <= 45`,
    difficulty: "easy",
    testCases: [
      { input: "2", expectedOutput: "2", isExample: true },
      { input: "3", expectedOutput: "3", isExample: true },
      { input: "4", expectedOutput: "5", isExample: true },
      { input: "1", expectedOutput: "1", isExample: false },
      { input: "5", expectedOutput: "8", isExample: false },
      { input: "10", expectedOutput: "89", isExample: false },
      { input: "20", expectedOutput: "10946", isExample: false },
      { input: "35", expectedOutput: "14930352", isExample: false },
      { input: "40", expectedOutput: "165580141", isExample: false },
      { input: "45", expectedOutput: "1836311903", isExample: false }
    ],
    starterCode: {
      python: pythonBase,
      javascript: jsBase,
      cpp: `int climbStairs(int n) {\n    // Write your solution here\n    \n}`,
    },
    driverCode: {
      python: "",
      javascript: "",
      cpp: `\n// --- Hidden Driver Code ---\n#include <iostream>\nusing namespace std;\nint main() {\n    int n;\n    if (std::cin >> n) {\n        std::cout << climbStairs(n) << "\\n";\n    }\n    return 0;\n}`,
    },
    minElo: 0,
  },
  {
    title: "Min Cost Climbing Stairs",
    description: `# Min Cost Climbing Stairs\n\nYou are given an integer array \`cost\` where \`cost[i]\` is the cost of \`i\`th step on a staircase. Once you pay the cost, you can either climb one or two steps.\n\nYou can either start from the step with index \`0\`, or the step with index \`1\`.\n\nReturn the minimum cost to reach the top of the floor.\n\n## Examples\n\n**Input:** 10 15 20\n**Output:** 15\n*Explanation:* You will start at index 1. Pay 15 and climb two steps to reach the top. The total cost is 15.\n\n**Input:** 1 100 1 1 1 100 1 1 100 1\n**Output:** 6\n*Explanation:* You will start at index 0. Pay 1, climb two steps, pay 1... total cost is 6.\n\n**Input:** 0 0 0 0\n**Output:** 0\n\n## Constraints\n- 2 <= cost.length <= 1000\n- 0 <= cost[i] <= 999`,
    difficulty: "easy",
    testCases: [
      { input: "10 15 20", expectedOutput: "15", isExample: true },
      { input: "1 100 1 1 1 100 1 1 100 1", expectedOutput: "6", isExample: true },
      { input: "0 0 0 0", expectedOutput: "0", isExample: true },
      { input: "1 2 3", expectedOutput: "2", isExample: false },
      { input: "5 5 5 5 5 5 5 5 5 5", expectedOutput: "25", isExample: false },
      { input: "100 0", expectedOutput: "0", isExample: false },
      { input: "0 100", expectedOutput: "0", isExample: false },
      { input: "999 999", expectedOutput: "999", isExample: false },
      { input: "10 10 10 10 10 10 10 10 10 10 10", expectedOutput: "50", isExample: false },
      { input: "2 1 2", expectedOutput: "1", isExample: false }
    ],
    starterCode: {
      python: pythonBase,
      javascript: jsBase,
      cpp: `int minCostClimbingStairs(vector<int>& cost) {\n    // Write your solution here\n    \n}`,
    },
    driverCode: {
      python: "",
      javascript: "",
      cpp: `\n// --- Hidden Driver Code ---\n#include <iostream>\n#include <vector>\nusing namespace std;\nint main() {\n    vector<int> cost;\n    int n;\n    while (std::cin >> n) {\n        cost.push_back(n);\n    }\n    std::cout << minCostClimbingStairs(cost) << "\\n";\n    return 0;\n}`,
    },
    minElo: 0,
  },
  {
    title: "House Robber",
    description: `# House Robber\n\nYou are a professional robber planning to rob houses along a street. Each house has a certain amount of money stashed, the only constraint stopping you from robbing each of them is that adjacent houses have security systems connected and **it will automatically contact the police if two adjacent houses were broken into on the same night**.\n\nGiven an integer array \`nums\` representing the amount of money of each house, return the maximum amount of money you can rob tonight **without alerting the police**.\n\n## Examples\n\n**Input:** 1 2 3 1\n**Output:** 4\n*Explanation:* Rob house 1 (money = 1) and then rob house 3 (money = 3).\n\n**Input:** 2 7 9 3 1\n**Output:** 12\n*Explanation:* Rob house 1 (2), rob house 3 (9) and rob house 5 (1).\n\n**Input:** 0\n**Output:** 0\n\n## Constraints\n- 1 <= nums.length <= 100\n- 0 <= nums[i] <= 400`,
    difficulty: "medium",
    testCases: [
      { input: "1 2 3 1", expectedOutput: "4", isExample: true },
      { input: "2 7 9 3 1", expectedOutput: "12", isExample: true },
      { input: "0", expectedOutput: "0", isExample: true },
      { input: "100", expectedOutput: "100", isExample: false },
      { input: "1 100", expectedOutput: "100", isExample: false },
      { input: "100 1 100", expectedOutput: "200", isExample: false },
      { input: "1 2", expectedOutput: "2", isExample: false },
      { input: "10 20 30 40 50", expectedOutput: "90", isExample: false },
      { input: "5 5 5 5 5 5 5 5 5 5", expectedOutput: "25", isExample: false },
      { input: "200 1 1 200 1", expectedOutput: "400", isExample: false }
    ],
    starterCode: {
      python: pythonBase,
      javascript: jsBase,
      cpp: `int rob(vector<int>& nums) {\n    // Write your solution here\n    \n}`,
    },
    driverCode: {
      python: "",
      javascript: "",
      cpp: `\n// --- Hidden Driver Code ---\n#include <iostream>\n#include <vector>\nusing namespace std;\nint main() {\n    vector<int> nums;\n    int n;\n    while (std::cin >> n) {\n        nums.push_back(n);\n    }\n    std::cout << rob(nums) << "\\n";\n    return 0;\n}`,
    },
    minElo: 800,
  },
  {
    title: "House Robber II",
    description: `# House Robber II\n\nYou are a professional robber planning to rob houses along a street. Each house has a certain amount of money stashed. All houses at this place are **arranged in a circle**. That means the first house is the neighbor of the last one. Meanwhile, adjacent houses have a security system connected, and **it will automatically contact the police if two adjacent houses were broken into on the same night**.\n\nGiven an integer array \`nums\` representing the amount of money of each house, return the maximum amount of money you can rob tonight **without alerting the police**.\n\n## Examples\n\n**Input:** 2 3 2\n**Output:** 3\n*Explanation:* You cannot rob house 1 (money = 2) and then rob house 3 (money = 2), because they are adjacent houses.\n\n**Input:** 1 2 3 1\n**Output:** 4\n*Explanation:* Rob house 1 (money = 1) and then rob house 3 (money = 3).\n\n**Input:** 1 2 3\n**Output:** 3\n\n## Constraints\n- 1 <= nums.length <= 100\n- 0 <= nums[i] <= 1000`,
    difficulty: "medium",
    testCases: [
      { input: "2 3 2", expectedOutput: "3", isExample: true },
      { input: "1 2 3 1", expectedOutput: "4", isExample: true },
      { input: "1 2 3", expectedOutput: "3", isExample: true },
      { input: "0", expectedOutput: "0", isExample: false },
      { input: "100", expectedOutput: "100", isExample: false },
      { input: "100 200", expectedOutput: "200", isExample: false },
      { input: "200 1 200 1", expectedOutput: "201", isExample: false },
      { input: "100 1 1 100 1", expectedOutput: "101", isExample: false },
      { input: "2 7 9 3 1", expectedOutput: "11", isExample: false },
      { input: "5 5 5 5 5 5 5 5 5 5", expectedOutput: "25", isExample: false }
    ],
    starterCode: {
      python: pythonBase,
      javascript: jsBase,
      cpp: `int rob(vector<int>& nums) {\n    // Write your solution here\n    \n}`,
    },
    driverCode: {
      python: "",
      javascript: "",
      cpp: `\n// --- Hidden Driver Code ---\n#include <iostream>\n#include <vector>\nusing namespace std;\nint main() {\n    vector<int> nums;\n    int n;\n    while (std::cin >> n) {\n        nums.push_back(n);\n    }\n    std::cout << rob(nums) << "\\n";\n    return 0;\n}`,
    },
    minElo: 800,
  },
  {
    title: "Coin Change",
    description: `# Coin Change\n\nYou are given an integer array \`coins\` representing coins of different denominations and an integer \`amount\` representing a total amount of money.\n\nReturn the fewest number of coins that you need to make up that amount. If that amount of money cannot be made up by any combination of the coins, return \`-1\`.\n\nYou may assume that you have an infinite number of each kind of coin.\n\n*Note: The input format passes the array elements first, and the last number is the \`amount\`.*\n\n## Examples\n\n**Input:** 1 2 5 11\n**Output:** 3\n*Explanation:* 11 = 5 + 5 + 1.\n\n**Input:** 2 3\n**Output:** -1\n\n**Input:** 1 0\n**Output:** 0\n\n## Constraints\n- 1 <= coins.length <= 12\n- 1 <= coins[i] <= 2^31 - 1\n- 0 <= amount <= 10^4`,
    difficulty: "medium",
    testCases: [
      { input: "1 2 5 11", expectedOutput: "3", isExample: true },
      { input: "2 3", expectedOutput: "-1", isExample: true },
      { input: "1 0", expectedOutput: "0", isExample: true },
      { input: "1 2 3 4 5 100", expectedOutput: "20", isExample: false },
      { input: "3 5 7 14", expectedOutput: "2", isExample: false },
      { input: "186 419 83 408 6249", expectedOutput: "20", isExample: false },
      { input: "4 20", expectedOutput: "5", isExample: false },
      { input: "4 2", expectedOutput: "-1", isExample: false },
      { input: "2 5 10 1", expectedOutput: "-1", isExample: false },
      { input: "1 2 5 10 20 50 100 10000", expectedOutput: "100", isExample: false }
    ],
    starterCode: {
      python: pythonBase,
      javascript: jsBase,
      cpp: `int coinChange(vector<int>& coins, int amount) {\n    // Write your solution here\n    \n}`,
    },
    driverCode: {
      python: "",
      javascript: "",
      cpp: `\n// --- Hidden Driver Code ---\n#include <iostream>\n#include <vector>\nusing namespace std;\nint main() {\n    vector<int> nums;\n    int n;\n    while (std::cin >> n) {\n        nums.push_back(n);\n    }\n    if (nums.empty()) return 0;\n    int amount = nums.back();\n    nums.pop_back();\n    std::cout << coinChange(nums, amount) << "\\n";\n    return 0;\n}`,
    },
    minElo: 800,
  },
  {
    title: "Longest Increasing Subsequence",
    description: `# Longest Increasing Subsequence\n\nGiven an integer array \`nums\`, return the length of the longest strictly increasing subsequence.\n\n## Examples\n\n**Input:** 10 9 2 5 3 7 101 18\n**Output:** 4\n*Explanation:* The longest increasing subsequence is [2,3,7,101], therefore the length is 4.\n\n**Input:** 0 1 0 3 2 3\n**Output:** 4\n\n**Input:** 7 7 7 7 7 7 7\n**Output:** 1\n\n## Constraints\n- 1 <= nums.length <= 2500\n- -10^4 <= nums[i] <= 10^4`,
    difficulty: "medium",
    testCases: [
      { input: "10 9 2 5 3 7 101 18", expectedOutput: "4", isExample: true },
      { input: "0 1 0 3 2 3", expectedOutput: "4", isExample: true },
      { input: "7 7 7 7 7 7 7", expectedOutput: "1", isExample: true },
      { input: "1", expectedOutput: "1", isExample: false },
      { input: "1 2 3 4 5", expectedOutput: "5", isExample: false },
      { input: "5 4 3 2 1", expectedOutput: "1", isExample: false },
      { input: "-10 -20 -30 -40 -10 -5", expectedOutput: "3", isExample: false },
      { input: "4 10 4 3 8 9", expectedOutput: "3", isExample: false },
      { input: "1 3 6 7 9 4 10 5 6", expectedOutput: "6", isExample: false },
      { input: "100 200 300 1 2 3 4", expectedOutput: "4", isExample: false }
    ],
    starterCode: {
      python: pythonBase,
      javascript: jsBase,
      cpp: `int lengthOfLIS(vector<int>& nums) {\n    // Write your solution here\n    \n}`,
    },
    driverCode: {
      python: "",
      javascript: "",
      cpp: `\n// --- Hidden Driver Code ---\n#include <iostream>\n#include <vector>\nusing namespace std;\nint main() {\n    vector<int> nums;\n    int n;\n    while (std::cin >> n) {\n        nums.push_back(n);\n    }\n    std::cout << lengthOfLIS(nums) << "\\n";\n    return 0;\n}`,
    },
    minElo: 800,
  }
];
