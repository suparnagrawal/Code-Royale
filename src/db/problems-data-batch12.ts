import { Problem } from "./problems-data";

const pythonBase = `import sys\n\ndef solve():\n    input_data = sys.stdin.read().split()\n    if not input_data: return\n    pass\n\nif __name__ == '__main__':\n    solve()`;
const jsBase = `const fs = require('fs');\n\nfunction solve() {\n    const input = fs.readFileSync('/dev/stdin', 'utf-8').trim().split(/\\s+/);\n    if (!input[0]) return;\n}\n\nsolve();`;

export const seedProblemsBatch12: Problem[] = [
  {
    title: "Last Stone Weight",
    description: `# Last Stone Weight\n\nYou are given an array of integers \`stones\` where \`stones[i]\` is the weight of the \`i\`th stone.\n\nWe are playing a game with the stones. On each turn, we choose the heaviest two stones and smash them together. Suppose the heaviest two stones have weights \`x\` and \`y\` with \`x <= y\`. The result of this smash is:\n- If \`x == y\`, both stones are destroyed, and\n- If \`x != y\`, the stone of weight \`x\` is destroyed, and the stone of weight \`y\` has new weight \`y - x\`.\n\nAt the end of the game, there is at most one stone left.\n\nReturn the weight of the last remaining stone. If there are no stones left, return \`0\`.\n\n## Examples\n\n**Input:** 6 2 7 4 1 8 1\n**Output:** 1\n*Explanation:*\nWe combine 7 and 8 to get 1 so the array converts to [2,4,1,1,1] then,\nwe combine 2 and 4 to get 2 so the array converts to [2,1,1,1] then,\nwe combine 2 and 1 to get 1 so the array converts to [1,1,1] then,\nwe combine 1 and 1 to get 0 so the array converts to [1] then that's the value of the last stone.\n\n**Input:** 1 1\n**Output:** 1\n\n## Constraints\n- 1 <= stones.length <= 30\n- 1 <= stones[i] <= 1000`,
    difficulty: "easy",
    testCases: [
      { input: "6 2 7 4 1 8 1", expectedOutput: "1", isExample: true },
      { input: "1 1", expectedOutput: "1", isExample: true },
      { input: "2 2 2", expectedOutput: "0", isExample: false },
      { input: "3 1 2 3", expectedOutput: "0", isExample: false },
      { input: "4 1 2 3 4", expectedOutput: "0", isExample: false },
      { input: "5 10 20 30 40 50", expectedOutput: "10", isExample: false },
      { input: "6 100 200 300 400 500 600", expectedOutput: "0", isExample: false },
      { input: "3 5 5 5", expectedOutput: "5", isExample: false },
      { input: "7 1 1 1 1 1 1 1", expectedOutput: "1", isExample: false },
      { input: "8 1 2 3 4 5 6 7 8", expectedOutput: "0", isExample: false }
    ],
    starterCode: {
      python: pythonBase,
      javascript: jsBase,
      cpp: `int lastStoneWeight(vector<int>& stones) {\n    // Write your solution here\n    \n}`,
    },
    driverCode: {
      python: "",
      javascript: "",
      cpp: `\n// --- Hidden Driver Code ---\n#include <iostream>\n#include <vector>\nusing namespace std;\nint main() {\n    vector<int> nums;\n    int n;\n    while (std::cin >> n) {\n        nums.push_back(n);\n    }\n    if(!nums.empty()) nums.erase(nums.begin()); // Remove length\n    std::cout << lastStoneWeight(nums) << "\\n";\n    return 0;\n}`,
    },
    minElo: 0,
  },
  {
    title: "K Closest Points to Origin",
    description: `# K Closest Points to Origin\n\nGiven an array of \`points\` where \`points[i] = [xi, yi]\` represents a point on the **X-Y** plane and an integer \`k\`, return the \`k\` closest points to the origin \`(0, 0)\`.\n\nThe distance between two points on the **X-Y** plane is the Euclidean distance (i.e., \`sqrt(x1^2 + y1^2)\`).\n\nYou may return the answer in **any order**. The answer is guaranteed to be unique (except for the order that it is in).\n\n*Note: The backend driver automatically sorts your returned points array to strictly check against the expected output.*\n*Note: The input provides exactly \`n\` (number of points), followed by the \`n\` pairs of coordinates, followed by \`k\`.*\n\n## Examples\n\n**Input:** 2 1 3 -2 2 1\n**Output:** -2 2\n*Explanation:* The distance between (1, 3) and the origin is sqrt(10). The distance between (-2, 2) and the origin is sqrt(8). Since sqrt(8) < sqrt(10), (-2, 2) is closer to the origin.\n\n**Input:** 3 3 3 5 -1 -2 4 2\n**Output:** -2 4 | 3 3\n\n## Constraints\n- 1 <= k <= points.length <= 10^4\n- -10^4 <= xi, yi <= 10^4`,
    difficulty: "medium",
    testCases: [
      { input: "2 1 3 -2 2 1", expectedOutput: "-2 2", isExample: true },
      { input: "3 3 3 5 -1 -2 4 2", expectedOutput: "-2 4 | 3 3", isExample: true },
      { input: "1 1 1 1", expectedOutput: "1 1", isExample: false },
      { input: "2 1 1 2 2 2", expectedOutput: "1 1 | 2 2", isExample: false },
      { input: "3 1 1 2 2 3 3 1", expectedOutput: "1 1", isExample: false },
      { input: "4 1 1 2 2 3 3 4 4 2", expectedOutput: "1 1 | 2 2", isExample: false },
      { input: "5 5 5 4 4 3 3 2 2 1 1 3", expectedOutput: "1 1 | 2 2 | 3 3", isExample: false },
      { input: "3 0 0 0 1 1 0 1", expectedOutput: "0 0", isExample: false },
      { input: "3 0 0 0 1 1 0 2", expectedOutput: "0 0 | 0 1", isExample: false },
      { input: "3 0 0 0 1 1 0 3", expectedOutput: "0 0 | 0 1 | 1 0", isExample: false }
    ],
    starterCode: {
      python: pythonBase,
      javascript: jsBase,
      cpp: `vector<vector<int>> kClosest(vector<vector<int>>& points, int k) {\n    // Write your solution here\n    \n}`,
    },
    driverCode: {
      python: "",
      javascript: "",
      cpp: `\n// --- Hidden Driver Code ---\n#include <iostream>\n#include <vector>\n#include <algorithm>\nusing namespace std;\nint main() {\n    int n;\n    if (std::cin >> n) {\n        vector<vector<int>> points(n, vector<int>(2));\n        for(int i=0; i<n; i++) {\n            std::cin >> points[i][0] >> points[i][1];\n        }\n        int k;\n        std::cin >> k;\n        vector<vector<int>> res = kClosest(points, k);\n        sort(res.begin(), res.end());\n        for(int i=0; i<res.size(); i++) {\n            std::cout << res[i][0] << " " << res[i][1];\n            std::cout << (i == res.size()-1 ? "" : " | ");\n        }\n        std::cout << "\\n";\n    }\n    return 0;\n}`,
    },
    minElo: 800,
  },
  {
    title: "Kth Largest Element in an Array",
    description: `# Kth Largest Element in an Array\n\nGiven an integer array \`nums\` and an integer \`k\`, return the \`k\`th largest element in the array.\n\nNote that it is the \`k\`th largest element in the sorted order, not the \`k\`th distinct element.\n\nCan you solve it without sorting?\n\n*Note: The input format provides exactly \`n\` (length of array), followed by the \`nums\` elements, followed by \`k\`.*\n\n## Examples\n\n**Input:** 6 3 2 1 5 6 4 2\n**Output:** 5\n\n**Input:** 9 3 2 3 1 2 4 5 5 6 4\n**Output:** 4\n\n## Constraints\n- 1 <= k <= nums.length <= 10^5\n- -10^4 <= nums[i] <= 10^4`,
    difficulty: "medium",
    testCases: [
      { input: "6 3 2 1 5 6 4 2", expectedOutput: "5", isExample: true },
      { input: "9 3 2 3 1 2 4 5 5 6 4", expectedOutput: "4", isExample: true },
      { input: "1 1 1", expectedOutput: "1", isExample: false },
      { input: "2 1 2 1", expectedOutput: "2", isExample: false },
      { input: "2 1 2 2", expectedOutput: "1", isExample: false },
      { input: "5 5 4 3 2 1 1", expectedOutput: "5", isExample: false },
      { input: "5 5 4 3 2 1 5", expectedOutput: "1", isExample: false },
      { input: "5 1 1 1 1 1 3", expectedOutput: "1", isExample: false },
      { input: "4 -1 -2 -3 -4 2", expectedOutput: "-2", isExample: false },
      { input: "4 -1 -2 -3 -4 4", expectedOutput: "-4", isExample: false }
    ],
    starterCode: {
      python: pythonBase,
      javascript: jsBase,
      cpp: `int findKthLargest(vector<int>& nums, int k) {\n    // Write your solution here\n    \n}`,
    },
    driverCode: {
      python: "",
      javascript: "",
      cpp: `\n// --- Hidden Driver Code ---\n#include <iostream>\n#include <vector>\nusing namespace std;\nint main() {\n    int n;\n    if (std::cin >> n) {\n        vector<int> nums(n);\n        for(int i=0; i<n; i++) std::cin >> nums[i];\n        int k;\n        std::cin >> k;\n        std::cout << findKthLargest(nums, k) << "\\n";\n    }\n    return 0;\n}`,
    },
    minElo: 800,
  },
  {
    title: "Task Scheduler",
    description: `# Task Scheduler\n\nYou are given an array of CPU \`tasks\`, each represented by letters A to Z, and a cooling time, \`n\`. Each cycle or interval allows the completion of one task. Tasks can be completed in any order, but there's a constraint: **identical** tasks must be separated by at least \`n\` intervals due to cooling time.\n\nReturn the *minimum number of intervals* required to complete all tasks.\n\n*Note: The input format provides exactly \`count\` (number of tasks), followed by the \`tasks\` characters, followed by \`n\`.*\n\n## Examples\n\n**Input:** 6 A A A B B B 2\n**Output:** 8\n*Explanation:* A -> B -> idle -> A -> B -> idle -> A -> B\n\n**Input:** 6 A C A B D B 1\n**Output:** 6\n*Explanation:* A -> B -> C -> D -> A -> B\n\n**Input:** 6 A A A B B B 3\n**Output:** 10\n*Explanation:* A -> B -> idle -> idle -> A -> B -> idle -> idle -> A -> B\n\n## Constraints\n- 1 <= tasks.length <= 10^4\n- tasks[i] is an uppercase English letter.\n- 0 <= n <= 100`,
    difficulty: "medium",
    testCases: [
      { input: "6 A A A B B B 2", expectedOutput: "8", isExample: true },
      { input: "6 A C A B D B 1", expectedOutput: "6", isExample: true },
      { input: "6 A A A B B B 3", expectedOutput: "10", isExample: true },
      { input: "1 A 0", expectedOutput: "1", isExample: false },
      { input: "1 A 10", expectedOutput: "1", isExample: false },
      { input: "2 A A 2", expectedOutput: "4", isExample: false },
      { input: "3 A A A 2", expectedOutput: "7", isExample: false },
      { input: "7 A A A A B B B 2", expectedOutput: "10", isExample: false },
      { input: "12 A A A A A A B C D E F G 2", expectedOutput: "16", isExample: false },
      { input: "8 A B C D E F G H 0", expectedOutput: "8", isExample: false }
    ],
    starterCode: {
      python: pythonBase,
      javascript: jsBase,
      cpp: `int leastInterval(vector<char>& tasks, int n) {\n    // Write your solution here\n    \n}`,
    },
    driverCode: {
      python: "",
      javascript: "",
      cpp: `\n// --- Hidden Driver Code ---\n#include <iostream>\n#include <vector>\nusing namespace std;\nint main() {\n    int count;\n    if (std::cin >> count) {\n        vector<char> tasks(count);\n        for(int i=0; i<count; i++) std::cin >> tasks[i];\n        int n;\n        std::cin >> n;\n        std::cout << leastInterval(tasks, n) << "\\n";\n    }\n    return 0;\n}`,
    },
    minElo: 800,
  },
  {
    title: "Min Cost to Connect All Points",
    description: `# Min Cost to Connect All Points\n\nYou are given an array \`points\` representing integer coordinates of some points on a 2D-plane, where \`points[i] = [xi, yi]\`.\n\nThe cost of connecting two points \`[xi, yi]\` and \`[xj, yj]\` is the **manhattan distance** between them: \`|xi - xj| + |yi - yj|\`, where \`|val|\` denotes the absolute value of \`val\`.\n\nReturn the minimum cost to make all points connected. All points are connected if there is **exactly one** simple path between any two points.\n\n*Note: The input provides exactly \`n\` (number of points), followed by the \`n\` pairs of coordinates.*\n\n## Examples\n\n**Input:** 5 0 0 2 2 3 10 5 2 7 0\n**Output:** 20\n\n**Input:** 3 3 12 -2 5 -4 1\n**Output:** 18\n\n## Constraints\n- 1 <= points.length <= 1000\n- -10^6 <= xi, yi <= 10^6\n- All pairs (xi, yi) are distinct.`,
    difficulty: "medium",
    testCases: [
      { input: "5 0 0 2 2 3 10 5 2 7 0", expectedOutput: "20", isExample: true },
      { input: "3 3 12 -2 5 -4 1", expectedOutput: "18", isExample: true },
      { input: "1 0 0", expectedOutput: "0", isExample: false },
      { input: "2 0 0 1 1", expectedOutput: "2", isExample: false },
      { input: "4 0 0 0 1 1 0 1 1", expectedOutput: "3", isExample: false },
      { input: "3 1 1 2 2 3 3", expectedOutput: "4", isExample: false },
      { input: "5 0 0 1 1 2 2 3 3 4 4", expectedOutput: "8", isExample: false },
      { input: "4 -10 -10 10 10 -10 10 10 -10", expectedOutput: "60", isExample: false },
      { input: "3 100 100 -100 -100 0 0", expectedOutput: "400", isExample: false },
      { input: "2 0 0 0 1000", expectedOutput: "1000", isExample: false }
    ],
    starterCode: {
      python: pythonBase,
      javascript: jsBase,
      cpp: `int minCostConnectPoints(vector<vector<int>>& points) {\n    // Write your solution here\n    \n}`,
    },
    driverCode: {
      python: "",
      javascript: "",
      cpp: `\n// --- Hidden Driver Code ---\n#include <iostream>\n#include <vector>\nusing namespace std;\nint main() {\n    int n;\n    if (std::cin >> n) {\n        vector<vector<int>> points(n, vector<int>(2));\n        for(int i=0; i<n; i++) {\n            std::cin >> points[i][0] >> points[i][1];\n        }\n        std::cout << minCostConnectPoints(points) << "\\n";\n    }\n    return 0;\n}`,
    },
    minElo: 800,
  },
  {
    title: "Network Delay Time",
    description: `# Network Delay Time\n\nYou are given a network of \`n\` nodes, labeled from \`1\` to \`n\`. You are also given \`times\`, a list of travel times as directed edges \`times[i] = (ui, vi, wi)\`, where \`ui\` is the source node, \`vi\` is the target node, and \`wi\` is the time it takes for a signal to travel from source to target.\n\nWe will send a signal from a given node \`k\`. Return the **minimum** time it takes for all the \`n\` nodes to receive the signal. If it is impossible for all the \`n\` nodes to receive the signal, return \`-1\`.\n\n*Note: The input provides exactly \`m\` (number of edges), followed by the \`m\` edges (u, v, w), followed by \`n\` (number of nodes), followed by \`k\` (start node).*\n\n## Examples\n\n**Input:** 3 2 1 1 2 3 1 3 4 1 4 2\n**Output:** 2\n\n**Input:** 1 1 2 1 2 1\n**Output:** 1\n\n**Input:** 1 1 2 1 2 2\n**Output:** -1\n\n## Constraints\n- 1 <= k <= n <= 100\n- 1 <= times.length <= 6000\n- times[i].length == 3\n- 1 <= ui, vi <= n\n- ui != vi\n- 0 <= wi <= 100\n- All the pairs (ui, vi) are unique.`,
    difficulty: "medium",
    testCases: [
      { input: "3 2 1 1 2 3 1 3 4 1 4 2", expectedOutput: "2", isExample: true },
      { input: "1 1 2 1 2 1", expectedOutput: "1", isExample: true },
      { input: "1 1 2 1 2 2", expectedOutput: "-1", isExample: true },
      { input: "2 1 2 1 1 3 1 3 1", expectedOutput: "1", isExample: false },
      { input: "2 1 2 1 2 3 1 3 1", expectedOutput: "1", isExample: false },
      { input: "2 1 2 5 2 3 5 3 1", expectedOutput: "10", isExample: false },
      { input: "3 1 2 1 2 3 1 3 4 1 4 1", expectedOutput: "3", isExample: false },
      { input: "3 1 2 1 1 3 5 1 4 10 4 1", expectedOutput: "10", isExample: false },
      { input: "4 1 2 1 1 3 2 2 3 1 3 4 1 4 1", expectedOutput: "3", isExample: false },
      { input: "2 1 2 100 2 3 100 3 1", expectedOutput: "200", isExample: false }
    ],
    starterCode: {
      python: pythonBase,
      javascript: jsBase,
      cpp: `int networkDelayTime(vector<vector<int>>& times, int n, int k) {\n    // Write your solution here\n    \n}`,
    },
    driverCode: {
      python: "",
      javascript: "",
      cpp: `\n// --- Hidden Driver Code ---\n#include <iostream>\n#include <vector>\nusing namespace std;\nint main() {\n    int m;\n    if (std::cin >> m) {\n        vector<vector<int>> times(m, vector<int>(3));\n        for(int i=0; i<m; i++) {\n            std::cin >> times[i][0] >> times[i][1] >> times[i][2];\n        }\n        int n, k;\n        std::cin >> n >> k;\n        std::cout << networkDelayTime(times, n, k) << "\\n";\n    }\n    return 0;\n}`,
    },
    minElo: 800,
  },
  {
    title: "Cheapest Flights Within K Stops",
    description: `# Cheapest Flights Within K Stops\n\nThere are \`n\` cities connected by some number of flights. You are given an array \`flights\` where \`flights[i] = [fromi, toi, pricei]\` indicates that there is a flight from city \`fromi\` to city \`toi\` with cost \`pricei\`.\n\nYou are also given three integers \`src\`, \`dst\`, and \`k\`, return the cheapest price from \`src\` to \`dst\` with at most \`k\` stops. If there is no such route, return \`-1\`.\n\n*Note: The input provides \`n\`, \`edges_count\`, followed by \`edges_count\` pairs of (u, v, w), followed by \`src\`, \`dst\`, and \`k\`. Note that cities are 0-indexed.*\n\n## Examples\n\n**Input:** 4 5 0 1 100 1 2 100 2 0 100 1 3 600 2 3 200 0 3 1\n**Output:** 700\n*Explanation:* The path with at most 1 stop from 0 to 3 is 0 -> 1 -> 3, cost is 700.\n\n**Input:** 3 3 0 1 100 1 2 100 0 2 500 0 2 1\n**Output:** 200\n*Explanation:* The optimal path with at most 1 stop is 0 -> 1 -> 2, cost is 200.\n\n**Input:** 3 3 0 1 100 1 2 100 0 2 500 0 2 0\n**Output:** 500\n*Explanation:* The optimal path with at most 0 stops is 0 -> 2, cost is 500.\n\n## Constraints\n- 1 <= n <= 100\n- 0 <= flights.length <= (n * (n - 1) / 2)\n- flights[i].length == 3\n- 0 <= fromi, toi < n\n- fromi != toi\n- 1 <= pricei <= 10^4\n- There will not be any multiple flights between two cities.\n- 0 <= src, dst, k < n\n- src != dst`,
    difficulty: "medium",
    testCases: [
      { input: "4 5 0 1 100 1 2 100 2 0 100 1 3 600 2 3 200 0 3 1", expectedOutput: "700", isExample: true },
      { input: "3 3 0 1 100 1 2 100 0 2 500 0 2 1", expectedOutput: "200", isExample: true },
      { input: "3 3 0 1 100 1 2 100 0 2 500 0 2 0", expectedOutput: "500", isExample: true },
      { input: "2 1 0 1 100 0 1 0", expectedOutput: "100", isExample: false },
      { input: "2 1 0 1 100 1 0 0", expectedOutput: "-1", isExample: false },
      { input: "3 2 0 1 10 1 2 20 0 2 0", expectedOutput: "-1", isExample: false },
      { input: "4 4 0 1 1 1 2 1 2 3 1 0 3 100 0 3 2", expectedOutput: "3", isExample: false },
      { input: "4 4 0 1 1 1 2 1 2 3 1 0 3 100 0 3 1", expectedOutput: "100", isExample: false },
      { input: "5 6 0 1 5 1 2 5 0 3 2 3 1 2 1 4 1 4 2 1 0 2 2", expectedOutput: "7", isExample: false },
      { input: "3 3 0 1 2 1 2 1 0 2 10 0 2 1", expectedOutput: "3", isExample: false }
    ],
    starterCode: {
      python: pythonBase,
      javascript: jsBase,
      cpp: `int findCheapestPrice(int n, vector<vector<int>>& flights, int src, int dst, int k) {\n    // Write your solution here\n    \n}`,
    },
    driverCode: {
      python: "",
      javascript: "",
      cpp: `\n// --- Hidden Driver Code ---\n#include <iostream>\n#include <vector>\nusing namespace std;\nint main() {\n    int n, m;\n    if (std::cin >> n >> m) {\n        vector<vector<int>> flights(m, vector<int>(3));\n        for(int i=0; i<m; i++) {\n            std::cin >> flights[i][0] >> flights[i][1] >> flights[i][2];\n        }\n        int src, dst, k;\n        std::cin >> src >> dst >> k;\n        std::cout << findCheapestPrice(n, flights, src, dst, k) << "\\n";\n    }\n    return 0;\n}`,
    },
    minElo: 800,
  },
  {
    title: "Sum of Two Integers",
    description: `# Sum of Two Integers\n\nGiven two integers \`a\` and \`b\`, return the sum of the two integers without using the operators \`+\` and \`-\`.\n\n## Examples\n\n**Input:** 1 2\n**Output:** 3\n\n**Input:** 2 3\n**Output:** 5\n\n## Constraints\n- -1000 <= a, b <= 1000`,
    difficulty: "medium",
    testCases: [
      { input: "1 2", expectedOutput: "3", isExample: true },
      { input: "2 3", expectedOutput: "5", isExample: true },
      { input: "0 0", expectedOutput: "0", isExample: false },
      { input: "-1 1", expectedOutput: "0", isExample: false },
      { input: "-2 -3", expectedOutput: "-5", isExample: false },
      { input: "10 20", expectedOutput: "30", isExample: false },
      { input: "100 -50", expectedOutput: "50", isExample: false },
      { input: "-100 50", expectedOutput: "-50", isExample: false },
      { input: "999 1", expectedOutput: "1000", isExample: false },
      { input: "1000 -1000", expectedOutput: "0", isExample: false }
    ],
    starterCode: {
      python: pythonBase,
      javascript: jsBase,
      cpp: `int getSum(int a, int b) {\n    // Write your solution here\n    \n}`,
    },
    driverCode: {
      python: "",
      javascript: "",
      cpp: `\n// --- Hidden Driver Code ---\n#include <iostream>\nusing namespace std;\nint main() {\n    int a, b;\n    if (std::cin >> a >> b) {\n        std::cout << getSum(a, b) << "\\n";\n    }\n    return 0;\n}`,
    },
    minElo: 800,
  },
  {
    title: "Sliding Window Maximum",
    description: `# Sliding Window Maximum\n\nYou are given an array of integers \`nums\`, there is a sliding window of size \`k\` which is moving from the very left of the array to the very right. You can only see the \`k\` numbers in the window. Each time the sliding window moves right by one position.\n\nReturn the max sliding window.\n\n*Note: The input provides exactly \`n\` (length of array), followed by the \`nums\` elements, followed by \`k\`.*\n\n## Examples\n\n**Input:** 8 1 3 -1 -3 5 3 6 7 3\n**Output:** 3 3 5 5 6 7\n*Explanation:* \nWindow position                Max\n---------------               -----\n[1  3  -1] -3  5  3  6  7       3\n 1 [3  -1  -3] 5  3  6  7       3\n 1  3 [-1  -3  5] 3  6  7       5\n 1  3  -1 [-3  5  3] 6  7       5\n 1  3  -1  -3 [5  3  6] 7       6\n 1  3  -1  -3  5 [3  6  7]      7\n\n**Input:** 1 1 1\n**Output:** 1\n\n## Constraints\n- 1 <= nums.length <= 10^5\n- -10^4 <= nums[i] <= 10^4\n- 1 <= k <= nums.length`,
    difficulty: "hard",
    testCases: [
      { input: "8 1 3 -1 -3 5 3 6 7 3", expectedOutput: "3 3 5 5 6 7", isExample: true },
      { input: "1 1 1", expectedOutput: "1", isExample: true },
      { input: "2 1 -1 1", expectedOutput: "1 -1", isExample: false },
      { input: "3 1 2 3 2", expectedOutput: "2 3", isExample: false },
      { input: "4 4 3 2 1 2", expectedOutput: "4 3 2", isExample: false },
      { input: "5 5 5 5 5 5 3", expectedOutput: "5 5 5", isExample: false },
      { input: "5 1 2 3 4 5 5", expectedOutput: "5", isExample: false },
      { input: "6 10 9 8 7 6 5 1", expectedOutput: "10 9 8 7 6 5", isExample: false },
      { input: "6 10 9 8 7 6 5 2", expectedOutput: "10 9 8 7 6", isExample: false },
      { input: "5 -1 -2 -3 -4 -5 2", expectedOutput: "-1 -2 -3 -4", isExample: false }
    ],
    starterCode: {
      python: pythonBase,
      javascript: jsBase,
      cpp: `vector<int> maxSlidingWindow(vector<int>& nums, int k) {\n    // Write your solution here\n    \n}`,
    },
    driverCode: {
      python: "",
      javascript: "",
      cpp: `\n// --- Hidden Driver Code ---\n#include <iostream>\n#include <vector>\nusing namespace std;\nint main() {\n    int n;\n    if (std::cin >> n) {\n        vector<int> nums(n);\n        for(int i=0; i<n; i++) std::cin >> nums[i];\n        int k;\n        std::cin >> k;\n        vector<int> res = maxSlidingWindow(nums, k);\n        for(int i=0; i<res.size(); i++) {\n            std::cout << res[i] << (i == res.size()-1 ? "" : " ");\n        }\n        std::cout << "\\n";\n    }\n    return 0;\n}`,
    },
    minElo: 1200,
  },
  {
    title: "Daily Temperatures",
    description: `# Daily Temperatures\n\nGiven an array of integers \`temperatures\` represents the daily temperatures, return an array \`answer\` such that \`answer[i]\` is the number of days you have to wait after the \`i\`th day to get a warmer temperature. If there is no future day for which this is possible, keep \`answer[i] == 0\` instead.\n\n## Examples\n\n**Input:** 8 73 74 75 71 69 72 76 73\n**Output:** 1 1 4 2 1 1 0 0\n\n**Input:** 4 30 40 50 60\n**Output:** 1 1 1 0\n\n**Input:** 3 30 60 90\n**Output:** 1 1 0\n\n## Constraints\n- 1 <= temperatures.length <= 10^5\n- 30 <= temperatures[i] <= 100`,
    difficulty: "medium",
    testCases: [
      { input: "8 73 74 75 71 69 72 76 73", expectedOutput: "1 1 4 2 1 1 0 0", isExample: true },
      { input: "4 30 40 50 60", expectedOutput: "1 1 1 0", isExample: true },
      { input: "3 30 60 90", expectedOutput: "1 1 0", isExample: true },
      { input: "1 30", expectedOutput: "0", isExample: false },
      { input: "2 30 30", expectedOutput: "0 0", isExample: false },
      { input: "2 40 30", expectedOutput: "0 0", isExample: false },
      { input: "3 90 60 30", expectedOutput: "0 0 0", isExample: false },
      { input: "5 50 40 30 20 60", expectedOutput: "4 3 2 1 0", isExample: false },
      { input: "4 30 30 30 40", expectedOutput: "3 2 1 0", isExample: false },
      { input: "5 30 20 30 40 30", expectedOutput: "3 1 1 0 0", isExample: false }
    ],
    starterCode: {
      python: pythonBase,
      javascript: jsBase,
      cpp: `vector<int> dailyTemperatures(vector<int>& temperatures) {\n    // Write your solution here\n    \n}`,
    },
    driverCode: {
      python: "",
      javascript: "",
      cpp: `\n// --- Hidden Driver Code ---\n#include <iostream>\n#include <vector>\nusing namespace std;\nint main() {\n    vector<int> nums;\n    int n;\n    while (std::cin >> n) {\n        nums.push_back(n);\n    }\n    if(!nums.empty()) nums.erase(nums.begin()); // Remove length prefix\n    vector<int> res = dailyTemperatures(nums);\n    for(int i=0; i<res.size(); i++) {\n        std::cout << res[i] << (i == res.size()-1 ? "" : " ");\n    }\n    std::cout << "\\n";\n    return 0;\n}`,
    },
    minElo: 800,
  }
];
