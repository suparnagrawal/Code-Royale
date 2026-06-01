import { Problem } from "./problems-data";

const pythonBase = `import sys\n\ndef solve():\n    input_data = sys.stdin.read().split()\n    if not input_data: return\n    pass\n\nif __name__ == '__main__':\n    solve()`;
const jsBase = `const fs = require('fs');\n\nfunction solve() {\n    const input = fs.readFileSync('/dev/stdin', 'utf-8').trim().split(/\\s+/);\n    if (!input[0]) return;\n}\n\nsolve();`;

export const seedProblemsBatch14: Problem[] = [
  {
    title: "Generate Parentheses",
    description: `# Generate Parentheses\n\nGiven \`n\` pairs of parentheses, write a function to generate all combinations of well-formed parentheses.\n\n*Note: The backend driver sorts your combinations automatically to check against expected output.*\n\n## Examples\n\n**Input:** 3\n**Output:** ((())) (()()) (())() ()(()) ()()()\n\n**Input:** 1\n**Output:** ()\n\n## Constraints\n- 1 <= n <= 8`,
    difficulty: "medium",
    testCases: [
      { input: "3", expectedOutput: "((())) (()()) (())() ()(()) ()()()", isExample: true },
      { input: "1", expectedOutput: "()", isExample: true },
      { input: "2", expectedOutput: "(()) ()()", isExample: false },
      { input: "4", expectedOutput: "(((()))) ((()())) ((())()) ((()))() (()(())) (()()()) (()())() (())(()) (())()() ()((())) ()(()()) ()(())() ()()(()) ()()()()", isExample: false }
    ],
    starterCode: {
      python: pythonBase,
      javascript: jsBase,
      cpp: `vector<string> generateParenthesis(int n) {\n    // Write your solution here\n    \n}`,
    },
    driverCode: {
      python: "",
      javascript: "",
      cpp: `\n// --- Hidden Driver Code ---\n#include <iostream>\n#include <vector>\n#include <string>\n#include <algorithm>\nusing namespace std;\nint main() {\n    int n;\n    if (std::cin >> n) {\n        vector<string> res = generateParenthesis(n);\n        sort(res.begin(), res.end());\n        for(int i=0; i<res.size(); i++) {\n            std::cout << res[i] << (i == res.size()-1 ? "" : " ");\n        }\n        std::cout << "\\n";\n    }\n    return 0;\n}`,
    },
    minElo: 800,
  },
  {
    title: "Add Two Numbers",
    description: `# Add Two Numbers\n\nYou are given two **non-empty** linked lists representing two non-negative integers. The digits are stored in **reverse order**, and each of their nodes contains a single digit. Add the two numbers and return the sum as a linked list.\n\nYou may assume the two numbers do not contain any leading zero, except the number 0 itself.\n\n*Note: The input provides exactly \`n\` (length of first list), followed by \`n\` integers for the first list, then \`m\` (length of second list), followed by \`m\` integers for the second list.*\n\n## Examples\n\n**Input:** 3 2 4 3 3 5 6 4\n**Output:** 7 0 8\n*Explanation:* 342 + 465 = 807.\n\n**Input:** 1 0 1 0\n**Output:** 0\n\n## Constraints\n- The number of nodes in each linked list is in the range [1, 100].\n- 0 <= Node.val <= 9\n- It is guaranteed that the list represents a number that does not have leading zeros.`,
    difficulty: "medium",
    testCases: [
      { input: "3 2 4 3 3 5 6 4", expectedOutput: "7 0 8", isExample: true },
      { input: "1 0 1 0", expectedOutput: "0", isExample: true },
      { input: "7 9 9 9 9 9 9 9 4 9 9 9 9", expectedOutput: "8 9 9 9 0 0 0 1", isExample: false },
      { input: "1 5 1 5", expectedOutput: "0 1", isExample: false },
      { input: "3 1 2 3 3 1 2 3", expectedOutput: "2 4 6", isExample: false },
      { input: "4 2 4 3 2 4 5 6 4", expectedOutput: "7 0 8 6", isExample: false },
      { input: "5 9 9 9 9 9 1 1", expectedOutput: "0 0 0 0 0 1", isExample: false },
      { input: "1 1 5 9 9 9 9 9", expectedOutput: "0 0 0 0 0 1", isExample: false },
      { input: "2 5 6 2 5 4", expectedOutput: "0 1 1", isExample: false },
      { input: "3 0 0 1 3 0 0 1", expectedOutput: "0 0 2", isExample: false }
    ],
    starterCode: {
      python: pythonBase,
      javascript: jsBase,
      cpp: `/*\nstruct ListNode {\n    int val;\n    ListNode *next;\n    ListNode() : val(0), next(nullptr) {}\n    ListNode(int x) : val(x), next(nullptr) {}\n    ListNode(int x, ListNode *next) : val(x), next(next) {}\n};\n*/\n\nListNode* addTwoNumbers(ListNode* l1, ListNode* l2) {\n    // Write your solution here\n    \n}`,
    },
    driverCode: {
      python: "",
      javascript: "",
      cpp: `\n// --- Hidden Driver Code ---\n#include <iostream>\n#include <vector>\nusing namespace std;\nListNode* buildList(int n) {\n    if (n <= 0) return nullptr;\n    ListNode dummy(0);\n    ListNode* tail = &dummy;\n    for(int i=0; i<n; i++) {\n        int val;\n        std::cin >> val;\n        tail->next = new ListNode(val);\n        tail = tail->next;\n    }\n    return dummy.next;\n}\nint main() {\n    int n, m;\n    if (std::cin >> n) {\n        ListNode* l1 = buildList(n);\n        std::cin >> m;\n        ListNode* l2 = buildList(m);\n        ListNode* res = addTwoNumbers(l1, l2);\n        vector<int> out;\n        while(res) {\n            out.push_back(res->val);\n            res = res->next;\n        }\n        for(int i=0; i<out.size(); i++) {\n            std::cout << out[i] << (i == out.size()-1 ? "" : " ");\n        }\n        std::cout << "\\n";\n    }\n    return 0;\n}`,
    },
    minElo: 800,
  },
  {
    title: "Binary Tree Maximum Path Sum",
    description: `# Binary Tree Maximum Path Sum\n\nA **path** in a binary tree is a sequence of nodes where each pair of adjacent nodes in the sequence has an edge connecting them. A node can only appear in the sequence **at most once**. Note that the path does not need to pass through the root.\n\nThe **path sum** of a path is the sum of the node's values in the path.\n\nGiven the \`root\` of a binary tree, return the maximum **path sum** of any **non-empty** path.\n\n*Note: The input provides exactly \`n\` nodes followed by the string representation of the tree in BFS format.*\n\n## Examples\n\n**Input:** 3 1 2 3\n**Output:** 6\n*Explanation:* The optimal path is 2 -> 1 -> 3 with a path sum of 2 + 1 + 3 = 6.\n\n**Input:** 7 -10 9 20 null null 15 7\n**Output:** 42\n*Explanation:* The optimal path is 15 -> 20 -> 7 with a path sum of 15 + 20 + 7 = 42.\n\n## Constraints\n- The number of nodes in the tree is in the range [1, 3 * 10^4].\n- -1000 <= Node.val <= 1000`,
    difficulty: "hard",
    testCases: [
      { input: "3 1 2 3", expectedOutput: "6", isExample: true },
      { input: "7 -10 9 20 null null 15 7", expectedOutput: "42", isExample: true },
      { input: "1 -3", expectedOutput: "-3", isExample: false },
      { input: "3 2 -1 -2", expectedOutput: "2", isExample: false },
      { input: "3 1 -2 3", expectedOutput: "4", isExample: false },
      { input: "5 5 4 8 11 null", expectedOutput: "28", isExample: false },
      { input: "7 -10 -20 -30 null null -15 -7", expectedOutput: "-7", isExample: false },
      { input: "5 1 2 3 4 5", expectedOutput: "11", isExample: false },
      { input: "7 10 2 10 20 1 null -25", expectedOutput: "42", isExample: false },
      { input: "9 9 6 -3 null null -6 2 null null", expectedOutput: "15", isExample: false }
    ],
    starterCode: {
      python: pythonBase,
      javascript: jsBase,
      cpp: `/*\nstruct TreeNode {\n    int val;\n    TreeNode *left;\n    TreeNode *right;\n    TreeNode() : val(0), left(nullptr), right(nullptr) {}\n    TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}\n    TreeNode(int x, TreeNode *left, TreeNode *right) : val(x), left(left), right(right) {}\n};\n*/\n\nint maxPathSum(TreeNode* root) {\n    // Write your solution here\n    \n}`,
    },
    driverCode: {
      python: "",
      javascript: "",
      cpp: `\n// --- Hidden Driver Code ---\n#include <queue>\n#include <string>\nTreeNode* buildTree() {\n    int n;\n    if (!(std::cin >> n) || n == 0) return nullptr;\n    vector<string> nodes(n);\n    for(int i=0; i<n; i++) std::cin >> nodes[i];\n    if (nodes[0] == "null") return nullptr;\n    \n    TreeNode* root = new TreeNode(stoi(nodes[0]));\n    queue<TreeNode*> q;\n    q.push(root);\n    int i = 1;\n    while(!q.empty() && i < n) {\n        TreeNode* curr = q.front();\n        q.pop();\n        \n        if (i < n && nodes[i] != "null") {\n            curr->left = new TreeNode(stoi(nodes[i]));\n            q.push(curr->left);\n        }\n        i++;\n        if (i < n && nodes[i] != "null") {\n            curr->right = new TreeNode(stoi(nodes[i]));\n            q.push(curr->right);\n        }\n        i++;\n    }\n    return root;\n}\nint main() {\n    TreeNode* root = buildTree();\n    std::cout << maxPathSum(root) << "\\n";\n    return 0;\n}`,
    },
    minElo: 1200,
  },
  {
    title: "Word Search II",
    description: `# Word Search II\n\nGiven an \`m x n\` \`board\` of characters and a list of strings \`words\`, return all words on the board.\n\nEach word must be constructed from letters of sequentially adjacent cells, where **adjacent cells** are horizontally or vertically neighboring. The same letter cell may not be used more than once in a word.\n\n*Note: The input provides \`m\` and \`n\`, followed by the characters of the board row by row, then \`w\` (number of words), followed by the strings in the dictionary. Output sorted automatically for testing.*\n\n## Examples\n\n**Input:** 4 4 o a a n e t a e i h k r i f l v 4 oath pea eat rain\n**Output:** eat oath\n\n**Input:** 2 2 a b c d 2 abcb abdc\n**Output:** \n\n## Constraints\n- m == board.length\n- n == board[i].length\n- 1 <= m, n <= 12\n- 1 <= words.length <= 3 * 10^4\n- 1 <= words[i].length <= 10\n- words[i] consists of lowercase English letters.`,
    difficulty: "hard",
    testCases: [
      { input: "4 4 o a a n e t a e i h k r i f l v 4 oath pea eat rain", expectedOutput: "eat oath", isExample: true },
      { input: "2 2 a b c d 2 abcb abdc", expectedOutput: "", isExample: true },
      { input: "1 1 a 1 a", expectedOutput: "a", isExample: false },
      { input: "2 2 a b c d 2 ab abd", expectedOutput: "ab abd", isExample: false },
      { input: "3 3 a b c d e f g h i 3 abc cfi ghi", expectedOutput: "abc cfi", isExample: false },
      { input: "4 4 a a a a a a a a a a a a a a a a 1 aaaaaa", expectedOutput: "aaaaaa", isExample: false },
      { input: "2 3 z z z z z z 2 zzz zzzzzz", expectedOutput: "zzz zzzzzz", isExample: false },
      { input: "3 4 a b c d e f g h i j k l 4 abcd dhil hgfe ihg", expectedOutput: "abcd hgfe ihg", isExample: false }
    ],
    starterCode: {
      python: pythonBase,
      javascript: jsBase,
      cpp: `vector<string> findWords(vector<vector<char>>& board, vector<string>& words) {\n    // Write your solution here\n    \n}`,
    },
    driverCode: {
      python: "",
      javascript: "",
      cpp: `\n// --- Hidden Driver Code ---\n#include <iostream>\n#include <vector>\n#include <string>\n#include <algorithm>\nusing namespace std;\nint main() {\n    int m, n;\n    if (std::cin >> m >> n) {\n        vector<vector<char>> board(m, vector<char>(n));\n        for(int i=0; i<m; i++) {\n            for(int j=0; j<n; j++) {\n                std::cin >> board[i][j];\n            }\n        }\n        int w;\n        std::cin >> w;\n        vector<string> words(w);\n        for(int i=0; i<w; i++) std::cin >> words[i];\n        vector<string> res = findWords(board, words);\n        sort(res.begin(), res.end());\n        for(int i=0; i<res.size(); i++) {\n            std::cout << res[i] << (i == res.size()-1 ? "" : " ");\n        }\n        std::cout << "\\n";\n    }\n    return 0;\n}`,
    },
    minElo: 1200,
  },
  {
    title: "Palindromic Substrings",
    description: `# Palindromic Substrings\n\nGiven a string \`s\`, return the number of **palindromic substrings** in it.\n\nA string is a palindrome when it reads the same backward as forward.\n\nA substring is a contiguous sequence of characters within the string.\n\n## Examples\n\n**Input:** abc\n**Output:** 3\n*Explanation:* Three palindromic strings: "a", "b", "c".\n\n**Input:** aaa\n**Output:** 6\n*Explanation:* Six palindromic strings: "a", "a", "a", "aa", "aa", "aaa".\n\n## Constraints\n- 1 <= s.length <= 1000\n- s consists of lowercase English letters.`,
    difficulty: "medium",
    testCases: [
      { input: "abc", expectedOutput: "3", isExample: true },
      { input: "aaa", expectedOutput: "6", isExample: true },
      { input: "a", expectedOutput: "1", isExample: false },
      { input: "ab", expectedOutput: "2", isExample: false },
      { input: "aa", expectedOutput: "3", isExample: false },
      { input: "aba", expectedOutput: "4", isExample: false },
      { input: "racecar", expectedOutput: "10", isExample: false },
      { input: "aaaa", expectedOutput: "10", isExample: false },
      { input: "abcba", expectedOutput: "7", isExample: false },
      { input: "abccba", expectedOutput: "9", isExample: false }
    ],
    starterCode: {
      python: pythonBase,
      javascript: jsBase,
      cpp: `int countSubstrings(string s) {\n    // Write your solution here\n    \n}`,
    },
    driverCode: {
      python: "",
      javascript: "",
      cpp: `\n// --- Hidden Driver Code ---\n#include <iostream>\n#include <string>\nusing namespace std;\nint main() {\n    string s;\n    if (std::cin >> s) {\n        std::cout << countSubstrings(s) << "\\n";\n    }\n    return 0;\n}`,
    },
    minElo: 800,
  },
  {
    title: "Longest Increasing Path in a Matrix",
    description: `# Longest Increasing Path in a Matrix\n\nGiven an \`m x n\` integers \`matrix\`, return the length of the longest increasing path in \`matrix\`.\n\nFrom each cell, you can either move in four directions: left, right, up, or down. You **may not** move diagonally or move outside the boundary (i.e., wrap-around is not allowed).\n\n*Note: The input provides exactly \`m\` and \`n\`, followed by \`m x n\` integers row by row.*\n\n## Examples\n\n**Input:** 3 3 9 9 4 6 6 8 2 1 1\n**Output:** 4\n*Explanation:* The longest increasing path is [1, 2, 6, 9].\n\n**Input:** 3 3 3 4 5 3 2 6 2 2 1\n**Output:** 4\n*Explanation:* The longest increasing path is [3, 4, 5, 6]. Moving diagonally is not allowed.\n\n**Input:** 1 1 1\n**Output:** 1\n\n## Constraints\n- m == matrix.length\n- n == matrix[i].length\n- 1 <= m, n <= 200\n- 0 <= matrix[i][j] <= 2^31 - 1`,
    difficulty: "hard",
    testCases: [
      { input: "3 3 9 9 4 6 6 8 2 1 1", expectedOutput: "4", isExample: true },
      { input: "3 3 3 4 5 3 2 6 2 2 1", expectedOutput: "4", isExample: true },
      { input: "1 1 1", expectedOutput: "1", isExample: true },
      { input: "2 2 1 2 4 3", expectedOutput: "4", isExample: false },
      { input: "2 2 4 3 2 1", expectedOutput: "2", isExample: false },
      { input: "3 3 1 2 3 6 5 4 7 8 9", expectedOutput: "9", isExample: false },
      { input: "3 3 9 8 7 4 5 6 3 2 1", expectedOutput: "9", isExample: false },
      { input: "4 4 16 15 14 13 9 10 11 12 8 7 6 5 1 2 3 4", expectedOutput: "16", isExample: false },
      { input: "3 4 1 2 3 4 8 7 6 5 9 10 11 12", expectedOutput: "12", isExample: false },
      { input: "1 5 1 2 3 4 5", expectedOutput: "5", isExample: false }
    ],
    starterCode: {
      python: pythonBase,
      javascript: jsBase,
      cpp: `int longestIncreasingPath(vector<vector<int>>& matrix) {\n    // Write your solution here\n    \n}`,
    },
    driverCode: {
      python: "",
      javascript: "",
      cpp: `\n// --- Hidden Driver Code ---\n#include <iostream>\n#include <vector>\nusing namespace std;\nint main() {\n    int m, n;\n    if (std::cin >> m >> n) {\n        vector<vector<int>> matrix(m, vector<int>(n));\n        for(int i=0; i<m; i++) {\n            for(int j=0; j<n; j++) {\n                std::cin >> matrix[i][j];\n            }\n        }\n        std::cout << longestIncreasingPath(matrix) << "\\n";\n    }\n    return 0;\n}`,
    },
    minElo: 1200,
  },
  {
    title: "Burst Balloons",
    description: `# Burst Balloons\n\nYou are given \`n\` balloons, indexed from \`0\` to \`n - 1\`. Each balloon is painted with a number on it represented by an array \`nums\`. You are asked to burst all the balloons.\n\nIf you burst the \`i\`th balloon, you will get \`nums[i - 1] * nums[i] * nums[i + 1]\` coins. If \`i - 1\` or \`i + 1\` goes out of bounds of the array, then treat it as if there is a balloon with a \`1\` painted on it.\n\nReturn the maximum coins you can collect by bursting the balloons wisely.\n\n*Note: The input provides \`n\` (length of array), followed by the array values.*\n\n## Examples\n\n**Input:** 4 3 1 5 8\n**Output:** 167\n*Explanation:*\nnums = [3,1,5,8] --> [3,5,8] --> [3,8] --> [8] --> []\ncoins =  3*1*5    +   3*5*8   +  1*3*8  + 1*8*1 = 167\n\n**Input:** 2 1 5\n**Output:** 10\n\n## Constraints\n- n == nums.length\n- 1 <= n <= 300\n- 0 <= nums[i] <= 100`,
    difficulty: "hard",
    testCases: [
      { input: "4 3 1 5 8", expectedOutput: "167", isExample: true },
      { input: "2 1 5", expectedOutput: "10", isExample: true },
      { input: "1 5", expectedOutput: "5", isExample: false },
      { input: "3 1 2 3", expectedOutput: "12", isExample: false },
      { input: "3 3 2 1", expectedOutput: "12", isExample: false },
      { input: "5 3 1 5 8 4", expectedOutput: "207", isExample: false },
      { input: "6 3 1 5 8 4 2", expectedOutput: "223", isExample: false },
      { input: "10 8 2 6 8 9 8 1 4 1 5", expectedOutput: "3446", isExample: false },
      { input: "5 0 0 0 0 0", expectedOutput: "0", isExample: false },
      { input: "3 2 4 6", expectedOutput: "72", isExample: false }
    ],
    starterCode: {
      python: pythonBase,
      javascript: jsBase,
      cpp: `int maxCoins(vector<int>& nums) {\n    // Write your solution here\n    \n}`,
    },
    driverCode: {
      python: "",
      javascript: "",
      cpp: `\n// --- Hidden Driver Code ---\n#include <iostream>\n#include <vector>\nusing namespace std;\nint main() {\n    int n;\n    if (std::cin >> n) {\n        vector<int> nums(n);\n        for(int i=0; i<n; i++) std::cin >> nums[i];\n        std::cout << maxCoins(nums) << "\\n";\n    }\n    return 0;\n}`,
    },
    minElo: 1200,
  },
  {
    title: "Regular Expression Matching",
    description: `# Regular Expression Matching\n\nGiven an input string \`s\` and a pattern \`p\`, implement regular expression matching with support for \`'.'\` and \`'*'\` where:\n- \`'.'\` Matches any single character.​​​​\n- \`'*'\` Matches zero or more of the preceding element.\n\nThe matching should cover the **entire** input string (not partial).\n\n## Examples\n\n**Input:** aa a\n**Output:** false\n*Explanation:* "a" does not match the entire string "aa".\n\n**Input:** aa a*\n**Output:** true\n*Explanation:* '*' means zero or more of the preceding element, 'a'. Therefore, by repeating 'a' once, it becomes "aa".\n\n**Input:** ab .*\n**Output:** true\n*Explanation:* ".*" means "zero or more (*) of any character (.)".\n\n## Constraints\n- 1 <= s.length <= 20\n- 1 <= p.length <= 20\n- s contains only lowercase English letters.\n- p contains only lowercase English letters, '.', and '*'.\n- It is guaranteed for each appearance of the character '*', there will be a previous valid character to match.`,
    difficulty: "hard",
    testCases: [
      { input: "aa a", expectedOutput: "false", isExample: true },
      { input: "aa a*", expectedOutput: "true", isExample: true },
      { input: "ab .*", expectedOutput: "true", isExample: true },
      { input: "a ab*", expectedOutput: "true", isExample: false },
      { input: "mississippi mis*is*p*.", expectedOutput: "false", isExample: false },
      { input: "mississippi mis*is*ip*.", expectedOutput: "true", isExample: false },
      { input: "a a.", expectedOutput: "false", isExample: false },
      { input: "ab .*c", expectedOutput: "false", isExample: false },
      { input: "abcd d*", expectedOutput: "false", isExample: false },
      { input: "abcdef a.*f", expectedOutput: "true", isExample: false }
    ],
    starterCode: {
      python: pythonBase,
      javascript: jsBase,
      cpp: `bool isMatch(string s, string p) {\n    // Write your solution here\n    \n}`,
    },
    driverCode: {
      python: "",
      javascript: "",
      cpp: `\n// --- Hidden Driver Code ---\n#include <iostream>\n#include <string>\nusing namespace std;\nint main() {\n    string s, p;\n    if (std::cin >> s >> p) {\n        std::cout << (isMatch(s, p) ? "true" : "false") << "\\n";\n    }\n    return 0;\n}`,
    },
    minElo: 1200,
  },
  {
    title: "LRU Cache",
    description: `# LRU Cache\n\nDesign a data structure that follows the constraints of a **Least Recently Used (LRU) cache**.\n\nImplement the \`LRUCache\` class:\n- \`LRUCache(int capacity)\` Initialize the LRU cache with positive size capacity.\n- \`int get(int key)\` Return the value of the key if the key exists, otherwise return \`-1\`.\n- \`void put(int key, int value)\` Update the value of the key if the key exists. Otherwise, add the key-value pair to the cache. If the number of keys exceeds the capacity from this operation, evict the least recently used key.\n\nThe functions \`get\` and \`put\` must each run in \`O(1)\` average time complexity.\n\n*Note: To evaluate your class, the input provides exactly \`capacity\`, followed by \`n\` (number of operations), followed by the operations. An operation is either \`1 key value\` for \`put\`, or \`2 key\` for \`get\`. The output prints the result of each \`get\` operation.*\n\n## Examples\n\n**Input:** 2 8 1 1 1 1 2 2 2 1 1 3 3 2 2 1 4 4 2 1 2 3 2 4\n**Output:** 1 -1 -1 3 4\n*Explanation:* \nLRUCache lRUCache = new LRUCache(2);\nlRUCache.put(1, 1); // cache is {1=1}\nlRUCache.put(2, 2); // cache is {1=1, 2=2}\nlRUCache.get(1);    // return 1\nlRUCache.put(3, 3); // LRU key was 2, evicts key 2, cache is {1=1, 3=3}\nlRUCache.get(2);    // returns -1 (not found)\nlRUCache.put(4, 4); // LRU key was 1, evicts key 1, cache is {4=4, 3=3}\nlRUCache.get(1);    // return -1 (not found)\nlRUCache.get(3);    // return 3\nlRUCache.get(4);    // return 4\n\n## Constraints\n- 1 <= capacity <= 3000\n- 0 <= key <= 10^4\n- 0 <= value <= 10^5\n- At most 2 * 10^5 calls will be made to get and put.`,
    difficulty: "medium",
    testCases: [
      { input: "2 8 1 1 1 1 2 2 2 1 1 3 3 2 2 1 4 4 2 1 2 3 2 4", expectedOutput: "1 -1 -1 3 4", isExample: true },
      { input: "1 5 1 1 1 2 1 1 1 3 3 2 1 2 3", expectedOutput: "-1 3", isExample: false },
      { input: "2 5 1 1 1 1 2 2 2 1 1 3 3 2 2", expectedOutput: "1 -1", isExample: false },
      { input: "3 8 1 1 1 1 2 2 1 3 3 2 1 2 2 2 3 1 4 4 2 1", expectedOutput: "1 2 3 1", isExample: false },
      { input: "1 3 1 10 10 2 10 2 1", expectedOutput: "10 -1", isExample: false }
    ],
    starterCode: {
      python: pythonBase,
      javascript: jsBase,
      cpp: `class LRUCache {\npublic:\n    LRUCache(int capacity) {\n        // Initialize cache\n    }\n    \n    int get(int key) {\n        // Your implementation\n        return -1;\n    }\n    \n    void put(int key, int value) {\n        // Your implementation\n    }\n};\n\n/**\n * Your LRUCache object will be instantiated and called as such:\n * LRUCache* obj = new LRUCache(capacity);\n * int param_1 = obj->get(key);\n * obj->put(key,value);\n */`,
    },
    driverCode: {
      python: "",
      javascript: "",
      cpp: `\n// --- Hidden Driver Code ---\n#include <iostream>\n#include <vector>\nusing namespace std;\nint main() {\n    int cap, q;\n    if (std::cin >> cap >> q) {\n        LRUCache* obj = new LRUCache(cap);\n        vector<int> res;\n        for(int i=0; i<q; i++) {\n            int type;\n            std::cin >> type;\n            if (type == 1) {\n                int k, v;\n                std::cin >> k >> v;\n                obj->put(k, v);\n            } else if (type == 2) {\n                int k;\n                std::cin >> k;\n                res.push_back(obj->get(k));\n            }\n        }\n        for(int i=0; i<res.size(); i++) {\n            std::cout << res[i] << (i == res.size()-1 ? "" : " ");\n        }\n        std::cout << "\\n";\n    }\n    return 0;\n}`,
    },
    minElo: 800,
  },
  {
    title: "Implement Trie (Prefix Tree)",
    description: `# Implement Trie (Prefix Tree)\n\nA **trie** (pronounced as "try") or **prefix tree** is a tree data structure used to efficiently store and retrieve keys in a dataset of strings. There are various applications of this data structure, such as autocomplete and spellchecker.\n\nImplement the \`Trie\` class:\n- \`Trie()\` Initializes the trie object.\n- \`void insert(String word)\` Inserts the string \`word\` into the trie.\n- \`boolean search(String word)\` Returns \`true\` if the string \`word\` is in the trie (i.e., was inserted before), and \`false\` otherwise.\n- \`boolean startsWith(String prefix)\` Returns \`true\` if there is a previously inserted string \`word\` that has the prefix \`prefix\`, and \`false\` otherwise.\n\n*Note: To evaluate your class, the input provides exactly \`n\` (number of operations), followed by the operations. An operation is either \`1 word\` for \`insert\`, \`2 word\` for \`search\`, or \`3 prefix\` for \`startsWith\`. The output prints the result of each \`search\` and \`startsWith\` operation.*\n\n## Examples\n\n**Input:** 7 1 apple 2 apple 2 app 3 app 1 app 2 app 3 app\n**Output:** true false true true true\n*Explanation:*\nTrie trie = new Trie();\ntrie.insert("apple");\ntrie.search("apple");   // return True\ntrie.search("app");     // return False\ntrie.startsWith("app"); // return True\ntrie.insert("app");\ntrie.search("app");     // return True\n\n## Constraints\n- 1 <= word.length, prefix.length <= 2000\n- word and prefix consist only of lowercase English letters.\n- At most 3 * 10^4 calls in total will be made to insert, search, and startsWith.`,
    difficulty: "medium",
    testCases: [
      { input: "7 1 apple 2 apple 2 app 3 app 1 app 2 app 3 app", expectedOutput: "true false true true true", isExample: true },
      { input: "4 1 hello 2 hello 3 hell 2 hell", expectedOutput: "true true false", isExample: false },
      { input: "5 1 a 2 a 3 a 2 b 3 b", expectedOutput: "true true false false", isExample: false },
      { input: "6 1 abc 1 abcd 2 abc 2 abcd 3 ab 3 abcde", expectedOutput: "true true true false", isExample: false },
      { input: "3 2 test 3 test 1 test", expectedOutput: "false false", isExample: false }
    ],
    starterCode: {
      python: pythonBase,
      javascript: jsBase,
      cpp: `class Trie {\npublic:\n    Trie() {\n        \n    }\n    \n    void insert(string word) {\n        \n    }\n    \n    bool search(string word) {\n        return false;\n    }\n    \n    bool startsWith(string prefix) {\n        return false;\n    }\n};\n\n/**\n * Your Trie object will be instantiated and called as such:\n * Trie* obj = new Trie();\n * obj->insert(word);\n * bool param_2 = obj->search(word);\n * bool param_3 = obj->startsWith(prefix);\n */`,
    },
    driverCode: {
      python: "",
      javascript: "",
      cpp: `\n// --- Hidden Driver Code ---\n#include <iostream>\n#include <vector>\n#include <string>\nusing namespace std;\nint main() {\n    int q;\n    if (std::cin >> q) {\n        Trie* obj = new Trie();\n        vector<string> res;\n        for(int i=0; i<q; i++) {\n            int type;\n            string word;\n            std::cin >> type >> word;\n            if (type == 1) {\n                obj->insert(word);\n            } else if (type == 2) {\n                res.push_back(obj->search(word) ? "true" : "false");\n            } else if (type == 3) {\n                res.push_back(obj->startsWith(word) ? "true" : "false");\n            }\n        }\n        for(int i=0; i<res.size(); i++) {\n            std::cout << res[i] << (i == res.size()-1 ? "" : " ");\n        }\n        std::cout << "\\n";\n    }\n    return 0;\n}`,
    },
    minElo: 800,
  }
];
