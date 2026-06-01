import { Problem } from "./problems-data";

const pythonBase = `import sys\n\ndef solve():\n    input_data = sys.stdin.read().split()\n    if not input_data: return\n    pass\n\nif __name__ == '__main__':\n    solve()`;
const jsBase = `const fs = require('fs');\n\nfunction solve() {\n    const input = fs.readFileSync('/dev/stdin', 'utf-8').trim().split(/\\s+/);\n    if (!input[0]) return;\n}\n\nsolve();`;

export const seedProblemsBatch15: Problem[] = [
  {
    title: "Min Stack",
    description: `# Min Stack\n\nDesign a stack that supports push, pop, top, and retrieving the minimum element in constant time.\n\nImplement the \`MinStack\` class:\n- \`MinStack()\` initializes the stack object.\n- \`void push(int val)\` pushes the element \`val\` onto the stack.\n- \`void pop()\` removes the element on the top of the stack.\n- \`int top()\` gets the top element of the stack.\n- \`int getMin()\` retrieves the minimum element in the stack.\n\nYou must implement a solution with \`O(1)\` time complexity for each function.\n\n*Note: To evaluate your class, the input provides exactly \`n\` (number of operations), followed by the operations. An operation is either \`1 val\` for \`push\`, \`2\` for \`pop\`, \`3\` for \`top\`, or \`4\` for \`getMin\`. The output prints the result of each \`top\` and \`getMin\` operation.*\n\n## Examples\n\n**Input:** 7 1 -2 1 0 1 -3 4 2 3 4\n**Output:** -3 0 -2\n*Explanation:*\nMinStack minStack = new MinStack();\nminStack.push(-2);\nminStack.push(0);\nminStack.push(-3);\nminStack.getMin(); // return -3\nminStack.pop();\nminStack.top();    // return 0\nminStack.getMin(); // return -2\n\n## Constraints\n- -2^31 <= val <= 2^31 - 1\n- Methods pop, top and getMin operations will always be called on non-empty stacks.\n- At most 3 * 10^4 calls will be made to push, pop, top, and getMin.`,
    difficulty: "medium",
    testCases: [
      { input: "7 1 -2 1 0 1 -3 4 2 3 4", expectedOutput: "-3 0 -2", isExample: true },
      { input: "4 1 5 1 5 3 4", expectedOutput: "5 5", isExample: false },
      { input: "5 1 10 1 20 2 3 4", expectedOutput: "10 10", isExample: false },
      { input: "6 1 -10 1 10 4 2 3 4", expectedOutput: "-10 -10 -10", isExample: false },
      { input: "8 1 2 1 0 1 -3 4 2 4 2 4", expectedOutput: "-3 0 2", isExample: false }
    ],
    starterCode: {
      python: pythonBase,
      javascript: jsBase,
      cpp: `class MinStack {\npublic:\n    MinStack() {\n        \n    }\n    \n    void push(int val) {\n        \n    }\n    \n    void pop() {\n        \n    }\n    \n    int top() {\n        return 0;\n    }\n    \n    int getMin() {\n        return 0;\n    }\n};\n\n/**\n * Your MinStack object will be instantiated and called as such:\n * MinStack* obj = new MinStack();\n * obj->push(val);\n * obj->pop();\n * int param_3 = obj->top();\n * int param_4 = obj->getMin();\n */`,
    },
    driverCode: {
      python: "",
      javascript: "",
      cpp: `\n// --- Hidden Driver Code ---\n#include <iostream>\n#include <vector>\nusing namespace std;\nint main() {\n    int n;\n    if (std::cin >> n) {\n        MinStack* obj = new MinStack();\n        vector<int> res;\n        for(int i=0; i<n; i++) {\n            int type;\n            std::cin >> type;\n            if (type == 1) {\n                int val;\n                std::cin >> val;\n                obj->push(val);\n            } else if (type == 2) {\n                obj->pop();\n            } else if (type == 3) {\n                res.push_back(obj->top());\n            } else if (type == 4) {\n                res.push_back(obj->getMin());\n            }\n        }\n        for(int i=0; i<res.size(); i++) {\n            std::cout << res[i] << (i == res.size()-1 ? "" : " ");\n        }\n        std::cout << "\\n";\n    }\n    return 0;\n}`,
    },
    minElo: 800,
  },
  {
    title: "Design Add and Search Words Data Structure",
    description: `# Design Add and Search Words Data Structure\n\nDesign a data structure that supports adding new words and finding if a string matches any previously added string.\n\nImplement the \`WordDictionary\` class:\n- \`WordDictionary()\` Initializes the object.\n- \`void addWord(word)\` Adds \`word\` to the data structure, it can be matched later.\n- \`bool search(word)\` Returns \`true\` if there is any string in the data structure that matches \`word\` or \`false\` otherwise. \`word\` may contain dots \`'.'\` where dots can be matched with any letter.\n\n*Note: To evaluate your class, the input provides exactly \`n\` (number of operations), followed by the operations. An operation is either \`1 word\` for \`addWord\`, or \`2 word\` for \`search\`. The output prints the result of each \`search\` operation.*\n\n## Examples\n\n**Input:** 7 1 bad 1 dad 1 mad 2 pad 2 bad 2 .ad 2 b..\n**Output:** false true true true\n*Explanation:*\nWordDictionary wordDictionary = new WordDictionary();\nwordDictionary.addWord("bad");\nwordDictionary.addWord("dad");\nwordDictionary.addWord("mad");\nwordDictionary.search("pad"); // return False\nwordDictionary.search("bad"); // return True\nwordDictionary.search(".ad"); // return True\nwordDictionary.search("b.."); // return True\n\n## Constraints\n- 1 <= word.length <= 25\n- word in addWord consists of lowercase English letters.\n- word in search consist of '.' or lowercase English letters.\n- There will be at most 2 dots in word for search queries.\n- At most 10^4 calls will be made to addWord and search.`,
    difficulty: "medium",
    testCases: [
      { input: "7 1 bad 1 dad 1 mad 2 pad 2 bad 2 .ad 2 b..", expectedOutput: "false true true true", isExample: true },
      { input: "4 1 a 1 ab 2 a 2 a.", expectedOutput: "true true", isExample: false },
      { input: "5 1 a 1 a 2 . 2 a 2 aa", expectedOutput: "true true false", isExample: false },
      { input: "6 1 bat 1 cat 2 .at 2 c.t 2 b.. 2 .b.", expectedOutput: "true true true false", isExample: false },
      { input: "3 2 a 1 a 2 .", expectedOutput: "false true", isExample: false }
    ],
    starterCode: {
      python: pythonBase,
      javascript: jsBase,
      cpp: `class WordDictionary {\npublic:\n    WordDictionary() {\n        \n    }\n    \n    void addWord(string word) {\n        \n    }\n    \n    bool search(string word) {\n        return false;\n    }\n};\n\n/**\n * Your WordDictionary object will be instantiated and called as such:\n * WordDictionary* obj = new WordDictionary();\n * obj->addWord(word);\n * bool param_2 = obj->search(word);\n */`,
    },
    driverCode: {
      python: "",
      javascript: "",
      cpp: `\n// --- Hidden Driver Code ---\n#include <iostream>\n#include <vector>\n#include <string>\nusing namespace std;\nint main() {\n    int n;\n    if (std::cin >> n) {\n        WordDictionary* obj = new WordDictionary();\n        vector<string> res;\n        for(int i=0; i<n; i++) {\n            int type;\n            string word;\n            std::cin >> type >> word;\n            if (type == 1) {\n                obj->addWord(word);\n            } else if (type == 2) {\n                res.push_back(obj->search(word) ? "true" : "false");\n            }\n        }\n        for(int i=0; i<res.size(); i++) {\n            std::cout << res[i] << (i == res.size()-1 ? "" : " ");\n        }\n        std::cout << "\\n";\n    }\n    return 0;\n}`,
    },
    minElo: 800,
  },
  {
    title: "Kth Largest Element in a Stream",
    description: `# Kth Largest Element in a Stream\n\nDesign a class to find the \`k\`th largest element in a stream. Note that it is the \`k\`th largest element in the sorted order, not the \`k\`th distinct element.\n\nImplement \`KthLargest\` class:\n- \`KthLargest(int k, int[] nums)\` Initializes the object with the integer \`k\` and the stream of integers \`nums\`.\n- \`int add(int val)\` Appends the integer \`val\` to the stream and returns the element representing the \`k\`th largest element in the stream.\n\n*Note: To evaluate your class, the input provides exactly \`k\`, followed by \`n\` (length of initial nums), followed by the \`nums\`, followed by \`q\` (number of add operations), and finally the \`q\` integers to add. The output prints the result of each \`add\` operation.*\n\n## Examples\n\n**Input:** 3 4 4 5 8 2 5 3 5 10 9 4\n**Output:** 4 5 5 8 8\n*Explanation:*\nKthLargest kthLargest = new KthLargest(3, [4, 5, 8, 2]);\nkthLargest.add(3);   // return 4\nkthLargest.add(5);   // return 5\nkthLargest.add(10);  // return 5\nkthLargest.add(9);   // return 8\nkthLargest.add(4);   // return 8\n\n## Constraints\n- 1 <= k <= 10^4\n- 0 <= nums.length <= 10^4\n- -10^4 <= nums[i] <= 10^4\n- -10^4 <= val <= 10^4\n- At most 10^4 calls will be made to add.\n- It is guaranteed that there will be at least k elements in the array when you search for the kth element.`,
    difficulty: "easy",
    testCases: [
      { input: "3 4 4 5 8 2 5 3 5 10 9 4", expectedOutput: "4 5 5 8 8", isExample: true },
      { input: "1 0 2 -3 -2", expectedOutput: "-3 -2", isExample: false },
      { input: "2 1 10 2 1 5", expectedOutput: "1 5", isExample: false },
      { input: "3 3 1 1 1 3 1 1 1", expectedOutput: "1 1 1", isExample: false },
      { input: "1 3 5 1 10 3 4 5 100", expectedOutput: "10 10 100", isExample: false }
    ],
    starterCode: {
      python: pythonBase,
      javascript: jsBase,
      cpp: `class KthLargest {\npublic:\n    KthLargest(int k, vector<int>& nums) {\n        \n    }\n    \n    int add(int val) {\n        return 0;\n    }\n};\n\n/**\n * Your KthLargest object will be instantiated and called as such:\n * KthLargest* obj = new KthLargest(k, nums);\n * int param_1 = obj->add(val);\n */`,
    },
    driverCode: {
      python: "",
      javascript: "",
      cpp: `\n// --- Hidden Driver Code ---\n#include <iostream>\n#include <vector>\nusing namespace std;\nint main() {\n    int k, n;\n    if (std::cin >> k >> n) {\n        vector<int> nums(n);\n        for(int i=0; i<n; i++) std::cin >> nums[i];\n        KthLargest* obj = new KthLargest(k, nums);\n        int q;\n        std::cin >> q;\n        vector<int> res;\n        for(int i=0; i<q; i++) {\n            int val;\n            std::cin >> val;\n            res.push_back(obj->add(val));\n        }\n        for(int i=0; i<res.size(); i++) {\n            std::cout << res[i] << (i == res.size()-1 ? "" : " ");\n        }\n        std::cout << "\\n";\n    }\n    return 0;\n}`,
    },
    minElo: 0,
  },
  {
    title: "Find Median from Data Stream",
    description: `# Find Median from Data Stream\n\nThe **median** is the middle value in an ordered integer list. If the size of the list is even, there is no middle value, and the median is the mean of the two middle values.\n- For example, for \`arr = [2,3,4]\`, the median is \`3\`.\n- For example, for \`arr = [2,3]\`, the median is \`(2 + 3) / 2 = 2.5\`.\n\nImplement the MedianFinder class:\n- \`MedianFinder()\` initializes the \`MedianFinder\` object.\n- \`void addNum(int num)\` adds the integer \`num\` from the data stream to the data structure.\n- \`double findMedian()\` returns the median of all elements so far. Answers within \`10^-5\` of the actual answer will be accepted.\n\n*Note: To evaluate your class, the input provides exactly \`n\` (number of operations), followed by the operations. An operation is either \`1 num\` for \`addNum\`, or \`2\` for \`findMedian\`. The output prints the result of each \`findMedian\` operation formatted to one decimal place if it is a fraction.*\n\n## Examples\n\n**Input:** 5 1 1 1 2 2 1 3 2\n**Output:** 1.5 2\n*Explanation:*\nMedianFinder medianFinder = new MedianFinder();\nmedianFinder.addNum(1);    // arr = [1]\nmedianFinder.addNum(2);    // arr = [1, 2]\nmedianFinder.findMedian(); // return 1.5 (i.e., (1 + 2) / 2)\nmedianFinder.addNum(3);    // arr[1, 2, 3]\nmedianFinder.findMedian(); // return 2.0\n\n## Constraints\n- -10^5 <= num <= 10^5\n- There will be at least one element in the data structure before calling findMedian.\n- At most 5 * 10^4 calls will be made to addNum and findMedian.`,
    difficulty: "hard",
    testCases: [
      { input: "5 1 1 1 2 2 1 3 2", expectedOutput: "1.5 2", isExample: true },
      { input: "3 1 5 1 10 2", expectedOutput: "7.5", isExample: false },
      { input: "7 1 1 2 1 2 2 1 3 2 1 4 2", expectedOutput: "1 1.5 2 2.5", isExample: false },
      { input: "2 1 -1 2", expectedOutput: "-1", isExample: false },
      { input: "6 1 10 1 20 1 30 1 40 1 50 2", expectedOutput: "30", isExample: false }
    ],
    starterCode: {
      python: pythonBase,
      javascript: jsBase,
      cpp: `class MedianFinder {\npublic:\n    MedianFinder() {\n        \n    }\n    \n    void addNum(int num) {\n        \n    }\n    \n    double findMedian() {\n        return 0.0;\n    }\n};\n\n/**\n * Your MedianFinder object will be instantiated and called as such:\n * MedianFinder* obj = new MedianFinder();\n * obj->addNum(num);\n * double param_2 = obj->findMedian();\n */`,
    },
    driverCode: {
      python: "",
      javascript: "",
      cpp: `\n// --- Hidden Driver Code ---\n#include <iostream>\n#include <vector>\n#include <cmath>\nusing namespace std;\nint main() {\n    int n;\n    if (std::cin >> n) {\n        MedianFinder* obj = new MedianFinder();\n        for(int i=0; i<n; i++) {\n            int type;\n            std::cin >> type;\n            if (type == 1) {\n                int num;\n                std::cin >> num;\n                obj->addNum(num);\n            } else if (type == 2) {\n                double med = obj->findMedian();\n                if (med == floor(med)) {\n                    std::cout << (int)med;\n                } else {\n                    std::cout << med;\n                }\n                std::cout << " ";\n            }\n        }\n        std::cout << "\\n";\n    }\n    return 0;\n}`,
    },
    minElo: 1200,
  },
  {
    title: "Time Based Key-Value Store",
    description: `# Time Based Key-Value Store\n\nDesign a time-based key-value data structure that can store multiple values for the same key at different time stamps and retrieve the key's value at a certain timestamp.\n\nImplement the \`TimeMap\` class:\n- \`TimeMap()\` Initializes the object of the data structure.\n- \`void set(String key, String value, int timestamp)\` Stores the key \`key\` with the value \`value\` at the given time \`timestamp\`.\n- \`String get(String key, int timestamp)\` Returns a value such that \`set\` was called previously, with \`timestamp_prev <= timestamp\`. If there are multiple such values, it returns the value associated with the largest \`timestamp_prev\`. If there are no values, it returns \`""\`.\n\n*Note: To evaluate your class, the input provides exactly \`n\` (number of operations), followed by the operations. An operation is either \`1 key value timestamp\` for \`set\`, or \`2 key timestamp\` for \`get\`. The output prints the result of each \`get\` operation, using "EMPTY_STRING" for empty results.*\n\n## Examples\n\n**Input:** 6 1 foo bar 1 2 foo 1 2 foo 3 1 foo bar2 4 2 foo 4 2 foo 5\n**Output:** bar bar bar2 bar2\n*Explanation:*\nTimeMap timeMap = new TimeMap();\ntimeMap.set("foo", "bar", 1);  // store the key "foo" and value "bar" along with timestamp = 1.\ntimeMap.get("foo", 1);         // return "bar"\ntimeMap.get("foo", 3);         // return "bar", since there is no value corresponding to foo at timestamp 3 and timestamp 2, then the only value is at timestamp 1 is "bar".\ntimeMap.set("foo", "bar2", 4); // store the key "foo" and value "bar2" along with timestamp = 4.\ntimeMap.get("foo", 4);         // return "bar2"\ntimeMap.get("foo", 5);         // return "bar2"\n\n## Constraints\n- 1 <= key.length, value.length <= 100\n- key and value consist of lowercase English letters and digits.\n- 1 <= timestamp <= 10^7\n- All the timestamps timestamp of set are strictly increasing.\n- At most 2 * 10^5 calls will be made to set and get.`,
    difficulty: "medium",
    testCases: [
      { input: "6 1 foo bar 1 2 foo 1 2 foo 3 1 foo bar2 4 2 foo 4 2 foo 5", expectedOutput: "bar bar bar2 bar2", isExample: true },
      { input: "2 2 a 1 1 a b 2", expectedOutput: "EMPTY_STRING", isExample: false },
      { input: "5 1 k v 10 2 k 5 2 k 10 2 k 15 2 k2 15", expectedOutput: "EMPTY_STRING v v EMPTY_STRING", isExample: false },
      { input: "7 1 a 1 1 1 a 2 2 1 a 3 3 2 a 1 2 a 2 2 a 3 2 a 4", expectedOutput: "1 2 3 3", isExample: false }
    ],
    starterCode: {
      python: pythonBase,
      javascript: jsBase,
      cpp: `class TimeMap {\npublic:\n    TimeMap() {\n        \n    }\n    \n    void set(string key, string value, int timestamp) {\n        \n    }\n    \n    string get(string key, int timestamp) {\n        return "";\n    }\n};\n\n/**\n * Your TimeMap object will be instantiated and called as such:\n * TimeMap* obj = new TimeMap();\n * obj->set(key,value,timestamp);\n * string param_2 = obj->get(key,timestamp);\n */`,
    },
    driverCode: {
      python: "",
      javascript: "",
      cpp: `\n// --- Hidden Driver Code ---\n#include <iostream>\n#include <vector>\n#include <string>\nusing namespace std;\nint main() {\n    int n;\n    if (std::cin >> n) {\n        TimeMap* obj = new TimeMap();\n        vector<string> res;\n        for(int i=0; i<n; i++) {\n            int type;\n            std::cin >> type;\n            if (type == 1) {\n                string k, v;\n                int t;\n                std::cin >> k >> v >> t;\n                obj->set(k, v, t);\n            } else if (type == 2) {\n                string k;\n                int t;\n                std::cin >> k >> t;\n                string val = obj->get(k, t);\n                res.push_back(val.empty() ? "EMPTY_STRING" : val);\n            }\n        }\n        for(int i=0; i<res.size(); i++) {\n            std::cout << res[i] << (i == res.size()-1 ? "" : " ");\n        }\n        std::cout << "\\n";\n    }\n    return 0;\n}`,
    },
    minElo: 800,
  },
  {
    title: "Subarray Sum Equals K",
    description: `# Subarray Sum Equals K\n\nGiven an array of integers \`nums\` and an integer \`k\`, return the total number of subarrays whose sum equals to \`k\`.\n\nA subarray is a contiguous **non-empty** sequence of elements within an array.\n\n*Note: The input provides exactly \`n\` (length of array), followed by the \`nums\` elements, followed by \`k\`.*\n\n## Examples\n\n**Input:** 3 1 1 1 2\n**Output:** 2\n\n**Input:** 3 1 2 3 3\n**Output:** 2\n\n## Constraints\n- 1 <= nums.length <= 2 * 10^4\n- -1000 <= nums[i] <= 1000\n- -10^7 <= k <= 10^7`,
    difficulty: "medium",
    testCases: [
      { input: "3 1 1 1 2", expectedOutput: "2", isExample: true },
      { input: "3 1 2 3 3", expectedOutput: "2", isExample: true },
      { input: "1 1 0", expectedOutput: "0", isExample: false },
      { input: "2 -1 1 0", expectedOutput: "1", isExample: false },
      { input: "4 1 -1 1 -1 0", expectedOutput: "4", isExample: false },
      { input: "5 10 2 2 2 20 6", expectedOutput: "1", isExample: false },
      { input: "5 1 2 3 4 5 15", expectedOutput: "1", isExample: false },
      { input: "6 0 0 0 0 0 0 0", expectedOutput: "21", isExample: false },
      { input: "3 -1 -1 1 0", expectedOutput: "1", isExample: false },
      { input: "5 3 4 7 2 -3 7", expectedOutput: "4", isExample: false }
    ],
    starterCode: {
      python: pythonBase,
      javascript: jsBase,
      cpp: `int subarraySum(vector<int>& nums, int k) {\n    // Write your solution here\n    \n}`,
    },
    driverCode: {
      python: "",
      javascript: "",
      cpp: `\n// --- Hidden Driver Code ---\n#include <iostream>\n#include <vector>\nusing namespace std;\nint main() {\n    int n;\n    if (std::cin >> n) {\n        vector<int> nums(n);\n        for(int i=0; i<n; i++) std::cin >> nums[i];\n        int k;\n        std::cin >> k;\n        std::cout << subarraySum(nums, k) << "\\n";\n    }\n    return 0;\n}`,
    },
    minElo: 800,
  },
  {
    title: "First Missing Positive",
    description: `# First Missing Positive\n\nGiven an unsorted integer array \`nums\`, return the smallest missing positive integer.\n\nYou must implement an algorithm that runs in \`O(n)\` time and uses \`O(1)\` auxiliary space.\n\n## Examples\n\n**Input:** 3 1 2 0\n**Output:** 3\n*Explanation:* The numbers in the range [1,2] are all in the array.\n\n**Input:** 4 3 4 -1 1\n**Output:** 2\n*Explanation:* 1 is in the array but 2 is missing.\n\n**Input:** 5 7 8 9 11 12\n**Output:** 1\n*Explanation:* The smallest positive integer 1 is missing.\n\n## Constraints\n- 1 <= nums.length <= 10^5\n- -2^31 <= nums[i] <= 2^31 - 1`,
    difficulty: "hard",
    testCases: [
      { input: "3 1 2 0", expectedOutput: "3", isExample: true },
      { input: "4 3 4 -1 1", expectedOutput: "2", isExample: true },
      { input: "5 7 8 9 11 12", expectedOutput: "1", isExample: true },
      { input: "1 1", expectedOutput: "2", isExample: false },
      { input: "1 0", expectedOutput: "1", isExample: false },
      { input: "2 2 1", expectedOutput: "3", isExample: false },
      { input: "3 1 2 3", expectedOutput: "4", isExample: false },
      { input: "4 1 1 1 1", expectedOutput: "2", isExample: false },
      { input: "5 -1 -2 -3 -4 -5", expectedOutput: "1", isExample: false },
      { input: "6 2 3 4 5 6 7", expectedOutput: "1", isExample: false }
    ],
    starterCode: {
      python: pythonBase,
      javascript: jsBase,
      cpp: `int firstMissingPositive(vector<int>& nums) {\n    // Write your solution here\n    \n}`,
    },
    driverCode: {
      python: "",
      javascript: "",
      cpp: `\n// --- Hidden Driver Code ---\n#include <iostream>\n#include <vector>\nusing namespace std;\nint main() {\n    vector<int> nums;\n    int n;\n    while (std::cin >> n) {\n        nums.push_back(n);\n    }\n    if(!nums.empty()) nums.erase(nums.begin()); // Remove length prefix\n    std::cout << firstMissingPositive(nums) << "\\n";\n    return 0;\n}`,
    },
    minElo: 1200,
  },
  {
    title: "Sort Colors",
    description: `# Sort Colors\n\nGiven an array \`nums\` with \`n\` objects colored red, white, or blue, sort them **in-place** so that objects of the same color are adjacent, with the colors in the order red, white, and blue.\n\nWe will use the integers \`0\`, \`1\`, and \`2\` to represent the color red, white, and blue, respectively.\n\nYou must solve this problem without using the library's sort function.\n\n## Examples\n\n**Input:** 6 2 0 2 1 1 0\n**Output:** 0 0 1 1 2 2\n\n**Input:** 3 2 0 1\n**Output:** 0 1 2\n\n## Constraints\n- n == nums.length\n- 1 <= n <= 300\n- nums[i] is either 0, 1, or 2.`,
    difficulty: "medium",
    testCases: [
      { input: "6 2 0 2 1 1 0", expectedOutput: "0 0 1 1 2 2", isExample: true },
      { input: "3 2 0 1", expectedOutput: "0 1 2", isExample: true },
      { input: "1 0", expectedOutput: "0", isExample: false },
      { input: "1 1", expectedOutput: "1", isExample: false },
      { input: "2 2 0", expectedOutput: "0 2", isExample: false },
      { input: "3 1 1 1", expectedOutput: "1 1 1", isExample: false },
      { input: "4 2 1 2 1", expectedOutput: "1 1 2 2", isExample: false },
      { input: "5 0 0 0 0 0", expectedOutput: "0 0 0 0 0", isExample: false },
      { input: "6 2 2 2 1 1 1", expectedOutput: "1 1 1 2 2 2", isExample: false },
      { input: "7 0 1 2 0 1 2 0", expectedOutput: "0 0 0 1 1 2 2", isExample: false }
    ],
    starterCode: {
      python: pythonBase,
      javascript: jsBase,
      cpp: `void sortColors(vector<int>& nums) {\n    // Write your solution here\n    \n}`,
    },
    driverCode: {
      python: "",
      javascript: "",
      cpp: `\n// --- Hidden Driver Code ---\n#include <iostream>\n#include <vector>\nusing namespace std;\nint main() {\n    vector<int> nums;\n    int n;\n    while (std::cin >> n) {\n        nums.push_back(n);\n    }\n    if(!nums.empty()) nums.erase(nums.begin()); // Remove length prefix\n    sortColors(nums);\n    for(int i=0; i<nums.size(); i++) {\n        std::cout << nums[i] << (i == nums.size()-1 ? "" : " ");\n    }\n    std::cout << "\\n";\n    return 0;\n}`,
    },
    minElo: 800,
  },
  {
    title: "Majority Element",
    description: `# Majority Element\n\nGiven an array \`nums\` of size \`n\`, return the majority element.\n\nThe majority element is the element that appears more than \`⌊n / 2⌋\` times. You may assume that the majority element always exists in the array.\n\n## Examples\n\n**Input:** 3 3 2 3\n**Output:** 3\n\n**Input:** 7 2 2 1 1 1 2 2\n**Output:** 2\n\n## Constraints\n- n == nums.length\n- 1 <= n <= 5 * 10^4\n- -10^9 <= nums[i] <= 10^9`,
    difficulty: "easy",
    testCases: [
      { input: "3 3 2 3", expectedOutput: "3", isExample: true },
      { input: "7 2 2 1 1 1 2 2", expectedOutput: "2", isExample: true },
      { input: "1 5", expectedOutput: "5", isExample: false },
      { input: "2 10 10", expectedOutput: "10", isExample: false },
      { input: "3 1 1 2", expectedOutput: "1", isExample: false },
      { input: "5 5 5 5 1 2", expectedOutput: "5", isExample: false },
      { input: "5 1 2 5 5 5", expectedOutput: "5", isExample: false },
      { input: "7 1 2 3 4 4 4 4", expectedOutput: "4", isExample: false },
      { input: "5 -1 -1 -1 0 0", expectedOutput: "-1", isExample: false },
      { input: "9 1 1 1 1 1 2 2 2 2", expectedOutput: "1", isExample: false }
    ],
    starterCode: {
      python: pythonBase,
      javascript: jsBase,
      cpp: `int majorityElement(vector<int>& nums) {\n    // Write your solution here\n    \n}`,
    },
    driverCode: {
      python: "",
      javascript: "",
      cpp: `\n// --- Hidden Driver Code ---\n#include <iostream>\n#include <vector>\nusing namespace std;\nint main() {\n    vector<int> nums;\n    int n;\n    while (std::cin >> n) {\n        nums.push_back(n);\n    }\n    if(!nums.empty()) nums.erase(nums.begin()); // Remove length prefix\n    std::cout << majorityElement(nums) << "\\n";\n    return 0;\n}`,
    },
    minElo: 0,
  },
  {
    title: "Longest Palindrome",
    description: `# Longest Palindrome\n\nGiven a string \`s\` which consists of lowercase or uppercase letters, return the length of the **longest palindrome** that can be built with those letters.\n\nLetters are **case sensitive**, for example, \`"Aa"\` is not considered a palindrome here.\n\n## Examples\n\n**Input:** abccccdd\n**Output:** 7\n*Explanation:* One longest palindrome that can be built is "dccaccd", whose length is 7.\n\n**Input:** a\n**Output:** 1\n*Explanation:* The longest palindrome that can be built is "a", whose length is 1.\n\n## Constraints\n- 1 <= s.length <= 2000\n- s consists of lowercase and/or uppercase English letters only.`,
    difficulty: "easy",
    testCases: [
      { input: "abccccdd", expectedOutput: "7", isExample: true },
      { input: "a", expectedOutput: "1", isExample: true },
      { input: "bb", expectedOutput: "2", isExample: false },
      { input: "Aa", expectedOutput: "1", isExample: false },
      { input: "aaaa", expectedOutput: "4", isExample: false },
      { input: "abc", expectedOutput: "1", isExample: false },
      { input: "aabbcc", expectedOutput: "6", isExample: false },
      { input: "aabbccd", expectedOutput: "7", isExample: false },
      { input: "abcdeeeffgg", expectedOutput: "9", isExample: false },
      { input: "xyzzyxabcabc", expectedOutput: "11", isExample: false }
    ],
    starterCode: {
      python: pythonBase,
      javascript: jsBase,
      cpp: `int longestPalindrome(string s) {\n    // Write your solution here\n    \n}`,
    },
    driverCode: {
      python: "",
      javascript: "",
      cpp: `\n// --- Hidden Driver Code ---\n#include <iostream>\n#include <string>\nusing namespace std;\nint main() {\n    string s;\n    if (std::cin >> s) {\n        std::cout << longestPalindrome(s) << "\\n";\n    }\n    return 0;\n}`,
    },
    minElo: 0,
  }
];
