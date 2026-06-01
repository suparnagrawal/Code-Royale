import { Problem } from "./problems-data";

const pythonBase = `import sys\n\ndef solve():\n    input_data = sys.stdin.read().split()\n    if not input_data: return\n    pass\n\nif __name__ == '__main__':\n    solve()`;
const jsBase = `const fs = require('fs');\n\nfunction solve() {\n    const input = fs.readFileSync('/dev/stdin', 'utf-8').trim().split(/\\s+/);\n    if (!input[0]) return;\n}\n\nsolve();`;

export const seedProblemsBatch8: Problem[] = [
  {
    title: "Merge k Sorted Lists",
    description: `# Merge k Sorted Lists\n\nYou are given an array of \`k\` linked-lists \`lists\`, each linked-list is sorted in ascending order.\n\nMerge all the linked-lists into one sorted linked-list and return it.\n\n*Note: The input format is exactly: \`k\` (number of lists), followed by \`k\` groups. Each group starts with \`n\` (size of list), followed by \`n\` integers representing the linked list.*\n\n## Examples\n\n**Input:** 3   3 1 4 5   3 1 3 4   2 2 6\n**Output:** 1 1 2 3 4 4 5 6\n*Explanation:*\nThe linked-lists are:\n[\n  1->4->5,\n  1->3->4,\n  2->6\n]\nmerging them into one sorted list:\n1->1->2->3->4->4->5->6\n\n**Input:** 0\n**Output:** \n\n**Input:** 1   0\n**Output:** \n\n## Constraints\n- k == lists.length\n- 0 <= k <= 10^4\n- 0 <= lists[i].length <= 500\n- -10^4 <= lists[i][j] <= 10^4\n- lists[i] is sorted in ascending order.\n- The sum of lists[i].length will not exceed 10^4.`,
    difficulty: "hard",
    testCases: [
      { input: "3 3 1 4 5 3 1 3 4 2 2 6", expectedOutput: "1 1 2 3 4 4 5 6", isExample: true },
      { input: "0", expectedOutput: "", isExample: true },
      { input: "1 0", expectedOutput: "", isExample: true },
      { input: "2 2 1 2 2 3 4", expectedOutput: "1 2 3 4", isExample: false },
      { input: "4 1 1 1 2 1 3 1 4", expectedOutput: "1 2 3 4", isExample: false },
      { input: "2 5 1 1 1 1 1 5 2 2 2 2 2", expectedOutput: "1 1 1 1 1 2 2 2 2 2", isExample: false },
      { input: "3 0 2 1 2 0", expectedOutput: "1 2", isExample: false },
      { input: "2 3 -3 -2 -1 3 1 2 3", expectedOutput: "-3 -2 -1 1 2 3", isExample: false },
      { input: "5 1 10 1 9 1 8 1 7 1 6", expectedOutput: "6 7 8 9 10", isExample: false },
      { input: "2 4 1 3 5 7 4 2 4 6 8", expectedOutput: "1 2 3 4 5 6 7 8", isExample: false }
    ],
    starterCode: {
      python: pythonBase,
      javascript: jsBase,
      cpp: `/*\nstruct ListNode {\n    int val;\n    ListNode *next;\n    ListNode() : val(0), next(nullptr) {}\n    ListNode(int x) : val(x), next(nullptr) {}\n    ListNode(int x, ListNode *next) : val(x), next(next) {}\n};\n*/\n\nListNode* mergeKLists(vector<ListNode*>& lists) {\n    // Write your solution here\n    \n}`,
    },
    driverCode: {
      python: "",
      javascript: "",
      cpp: `\n// --- Hidden Driver Code ---\nListNode* buildList() {\n    int n;\n    if (!(std::cin >> n)) return nullptr;\n    ListNode dummy;\n    ListNode* curr = &dummy;\n    for(int i=0; i<n; i++) {\n        int val;\n        std::cin >> val;\n        curr->next = new ListNode(val);\n        curr = curr->next;\n    }\n    return dummy.next;\n}\nvoid printList(ListNode* head) {\n    while(head) {\n        std::cout << head->val << (head->next ? " " : "");\n        head = head->next;\n    }\n    std::cout << "\\n";\n}\nint main() {\n    int k;\n    if (std::cin >> k) {\n        vector<ListNode*> lists(k);\n        for(int i=0; i<k; i++) {\n            lists[i] = buildList();\n        }\n        ListNode* res = mergeKLists(lists);\n        printList(res);\n    }\n    return 0;\n}`,
    },
    minElo: 1200,
  },
  {
    title: "Reverse Nodes in k-Group",
    description: `# Reverse Nodes in k-Group\n\nGiven the \`head\` of a linked list, reverse the nodes of the list \`k\` at a time, and return the modified list.\n\n\`k\` is a positive integer and is less than or equal to the length of the linked list. If the number of nodes is not a multiple of \`k\` then left-out nodes, in the end, should remain as it is.\n\nYou may not alter the values in the list's nodes, only nodes themselves may be changed.\n\n*Note: The input format is exactly: \`n\` (size of list), \`k\`, followed by \`n\` integers representing the linked list.*\n\n## Examples\n\n**Input:** 5 2 1 2 3 4 5\n**Output:** 2 1 4 3 5\n\n**Input:** 5 3 1 2 3 4 5\n**Output:** 3 2 1 4 5\n\n## Constraints\n- The number of nodes in the list is \`n\`.\n- 1 <= k <= n <= 5000\n- 0 <= Node.val <= 1000`,
    difficulty: "hard",
    testCases: [
      { input: "5 2 1 2 3 4 5", expectedOutput: "2 1 4 3 5", isExample: true },
      { input: "5 3 1 2 3 4 5", expectedOutput: "3 2 1 4 5", isExample: true },
      { input: "5 1 1 2 3 4 5", expectedOutput: "1 2 3 4 5", isExample: false },
      { input: "5 5 1 2 3 4 5", expectedOutput: "5 4 3 2 1", isExample: false },
      { input: "6 2 1 2 3 4 5 6", expectedOutput: "2 1 4 3 6 5", isExample: false },
      { input: "6 3 1 2 3 4 5 6", expectedOutput: "3 2 1 6 5 4", isExample: false },
      { input: "10 4 1 2 3 4 5 6 7 8 9 10", expectedOutput: "4 3 2 1 8 7 6 5 9 10", isExample: false },
      { input: "2 2 1 2", expectedOutput: "2 1", isExample: false },
      { input: "3 2 1 2 3", expectedOutput: "2 1 3", isExample: false },
      { input: "4 2 1 2 3 4", expectedOutput: "2 1 4 3", isExample: false }
    ],
    starterCode: {
      python: pythonBase,
      javascript: jsBase,
      cpp: `/*\nstruct ListNode {\n    int val;\n    ListNode *next;\n    ListNode() : val(0), next(nullptr) {}\n    ListNode(int x) : val(x), next(nullptr) {}\n    ListNode(int x, ListNode *next) : val(x), next(next) {}\n};\n*/\n\nListNode* reverseKGroup(ListNode* head, int k) {\n    // Write your solution here\n    \n}`,
    },
    driverCode: {
      python: "",
      javascript: "",
      cpp: `\n// --- Hidden Driver Code ---\nListNode* buildList() {\n    int n;\n    if (!(std::cin >> n)) return nullptr;\n    int k; std::cin >> k;\n    ListNode dummy;\n    ListNode* curr = &dummy;\n    for(int i=0; i<n; i++) {\n        int val;\n        std::cin >> val;\n        curr->next = new ListNode(val);\n        curr = curr->next;\n    }\n    return dummy.next;\n}\nvoid printList(ListNode* head) {\n    while(head) {\n        std::cout << head->val << (head->next ? " " : "");\n        head = head->next;\n    }\n    std::cout << "\\n";\n}\nint main() {\n    int n, k;\n    if (std::cin >> n >> k) {\n        ListNode dummy;\n        ListNode* curr = &dummy;\n        for(int i=0; i<n; i++) {\n            int val;\n            std::cin >> val;\n            curr->next = new ListNode(val);\n            curr = curr->next;\n        }\n        ListNode* res = reverseKGroup(dummy.next, k);\n        printList(res);\n    }\n    return 0;\n}`,
    },
    minElo: 1200,
  },
  {
    title: "Invert Binary Tree",
    description: `# Invert Binary Tree\n\nGiven the \`root\` of a binary tree, invert the tree, and return its root.\n\n*Note: The input provides exactly the number of nodes \`n\`, followed by \`n\` strings representing the tree nodes in BFS (Level Order) format. Empty nodes are denoted as \`null\`.*\n\n## Examples\n\n**Input:** 7 4 2 7 1 3 6 9\n**Output:** 4 7 2 9 6 3 1\n*Explanation:* The tree is inverted.\n\n**Input:** 3 2 1 3\n**Output:** 2 3 1\n\n**Input:** 0\n**Output:** \n\n## Constraints\n- The number of nodes in the tree is in the range [0, 100].\n- -100 <= Node.val <= 100`,
    difficulty: "easy",
    testCases: [
      { input: "7 4 2 7 1 3 6 9", expectedOutput: "4 7 2 9 6 3 1", isExample: true },
      { input: "3 2 1 3", expectedOutput: "2 3 1", isExample: true },
      { input: "0", expectedOutput: "", isExample: true },
      { input: "1 1", expectedOutput: "1", isExample: false },
      { input: "2 1 2", expectedOutput: "1 null 2", isExample: false },
      { input: "5 1 2 null 3 null", expectedOutput: "1 null 2 null 3", isExample: false },
      { input: "3 1 2 null", expectedOutput: "1 null 2", isExample: false },
      { input: "3 1 null 2", expectedOutput: "1 2", isExample: false },
      { input: "5 1 2 3 null 4", expectedOutput: "1 3 2 null null 4", isExample: false },
      { input: "7 1 2 3 4 5 6 7", expectedOutput: "1 3 2 7 6 5 4", isExample: false }
    ],
    starterCode: {
      python: pythonBase,
      javascript: jsBase,
      cpp: `/*\nstruct TreeNode {\n    int val;\n    TreeNode *left;\n    TreeNode *right;\n    TreeNode() : val(0), left(nullptr), right(nullptr) {}\n    TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}\n    TreeNode(int x, TreeNode *left, TreeNode *right) : val(x), left(left), right(right) {}\n};\n*/\n\nTreeNode* invertTree(TreeNode* root) {\n    // Write your solution here\n    \n}`,
    },
    driverCode: {
      python: "",
      javascript: "",
      cpp: `\n// --- Hidden Driver Code ---\n#include <queue>\n#include <string>\nTreeNode* buildTree() {\n    int n;\n    if (!(std::cin >> n) || n == 0) return nullptr;\n    vector<string> nodes(n);\n    for(int i=0; i<n; i++) std::cin >> nodes[i];\n    if (nodes[0] == "null") return nullptr;\n    \n    TreeNode* root = new TreeNode(stoi(nodes[0]));\n    queue<TreeNode*> q;\n    q.push(root);\n    int i = 1;\n    while(!q.empty() && i < n) {\n        TreeNode* curr = q.front();\n        q.pop();\n        \n        if (i < n && nodes[i] != "null") {\n            curr->left = new TreeNode(stoi(nodes[i]));\n            q.push(curr->left);\n        }\n        i++;\n        if (i < n && nodes[i] != "null") {\n            curr->right = new TreeNode(stoi(nodes[i]));\n            q.push(curr->right);\n        }\n        i++;\n    }\n    return root;\n}\nvoid printTree(TreeNode* root) {\n    if (!root) return;\n    vector<string> res;\n    queue<TreeNode*> q;\n    q.push(root);\n    while(!q.empty()) {\n        TreeNode* curr = q.front();\n        q.pop();\n        if (curr) {\n            res.push_back(to_string(curr->val));\n            q.push(curr->left);\n            q.push(curr->right);\n        } else {\n            res.push_back("null");\n        }\n    }\n    while(!res.empty() && res.back() == "null") res.pop_back();\n    for(int i=0; i<res.size(); i++) {\n        std::cout << res[i] << (i == res.size()-1 ? "" : " ");\n    }\n    std::cout << "\\n";\n}\nint main() {\n    TreeNode* root = buildTree();\n    TreeNode* res = invertTree(root);\n    printTree(res);\n    return 0;\n}`,
    },
    minElo: 0,
  },
  {
    title: "Maximum Depth of Binary Tree",
    description: `# Maximum Depth of Binary Tree\n\nGiven the \`root\` of a binary tree, return its maximum depth.\n\nA binary tree's **maximum depth** is the number of nodes along the longest path from the root node down to the farthest leaf node.\n\n*Note: The input provides exactly the number of nodes \`n\`, followed by \`n\` strings representing the tree nodes in BFS (Level Order) format.*\n\n## Examples\n\n**Input:** 7 3 9 20 null null 15 7\n**Output:** 3\n\n**Input:** 2 1 null 2\n**Output:** 2\n\n**Input:** 0\n**Output:** 0\n\n## Constraints\n- The number of nodes in the tree is in the range [0, 10^4].\n- -100 <= Node.val <= 100`,
    difficulty: "easy",
    testCases: [
      { input: "7 3 9 20 null null 15 7", expectedOutput: "3", isExample: true },
      { input: "4 1 null 2", expectedOutput: "2", isExample: true },
      { input: "0", expectedOutput: "0", isExample: true },
      { input: "1 1", expectedOutput: "1", isExample: false },
      { input: "3 1 2 3", expectedOutput: "2", isExample: false },
      { input: "7 1 2 3 4 5 6 7", expectedOutput: "3", isExample: false },
      { input: "5 1 2 null 3 null", expectedOutput: "3", isExample: false },
      { input: "7 1 2 null 3 null 4 null", expectedOutput: "4", isExample: false },
      { input: "15 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15", expectedOutput: "4", isExample: false },
      { input: "9 1 null 2 null 3 null 4 null 5", expectedOutput: "5", isExample: false }
    ],
    starterCode: {
      python: pythonBase,
      javascript: jsBase,
      cpp: `/*\nstruct TreeNode {\n    int val;\n    TreeNode *left;\n    TreeNode *right;\n    TreeNode() : val(0), left(nullptr), right(nullptr) {}\n    TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}\n    TreeNode(int x, TreeNode *left, TreeNode *right) : val(x), left(left), right(right) {}\n};\n*/\n\nint maxDepth(TreeNode* root) {\n    // Write your solution here\n    \n}`,
    },
    driverCode: {
      python: "",
      javascript: "",
      cpp: `\n// --- Hidden Driver Code ---\n#include <queue>\n#include <string>\nTreeNode* buildTree() {\n    int n;\n    if (!(std::cin >> n) || n == 0) return nullptr;\n    vector<string> nodes(n);\n    for(int i=0; i<n; i++) std::cin >> nodes[i];\n    if (nodes[0] == "null") return nullptr;\n    \n    TreeNode* root = new TreeNode(stoi(nodes[0]));\n    queue<TreeNode*> q;\n    q.push(root);\n    int i = 1;\n    while(!q.empty() && i < n) {\n        TreeNode* curr = q.front();\n        q.pop();\n        \n        if (i < n && nodes[i] != "null") {\n            curr->left = new TreeNode(stoi(nodes[i]));\n            q.push(curr->left);\n        }\n        i++;\n        if (i < n && nodes[i] != "null") {\n            curr->right = new TreeNode(stoi(nodes[i]));\n            q.push(curr->right);\n        }\n        i++;\n    }\n    return root;\n}\nint main() {\n    TreeNode* root = buildTree();\n    std::cout << maxDepth(root) << "\\n";\n    return 0;\n}`,
    },
    minElo: 0,
  },
  {
    title: "Diameter of Binary Tree",
    description: `# Diameter of Binary Tree\n\nGiven the \`root\` of a binary tree, return the length of the **diameter** of the tree.\n\nThe **diameter** of a binary tree is the length of the longest path between any two nodes in a tree. This path may or may not pass through the root.\n\nThe length of a path between two nodes is represented by the number of edges between them.\n\n## Examples\n\n**Input:** 5 1 2 3 4 5\n**Output:** 3\n*Explanation:* 3 is the length of the path [4,2,1,3] or [5,2,1,3].\n\n**Input:** 2 1 2\n**Output:** 1\n\n**Input:** 0\n**Output:** 0\n\n## Constraints\n- The number of nodes in the tree is in the range [1, 10^4].\n- -100 <= Node.val <= 100`,
    difficulty: "easy",
    testCases: [
      { input: "5 1 2 3 4 5", expectedOutput: "3", isExample: true },
      { input: "2 1 2", expectedOutput: "1", isExample: true },
      { input: "0", expectedOutput: "0", isExample: true },
      { input: "1 1", expectedOutput: "0", isExample: false },
      { input: "3 1 2 3", expectedOutput: "2", isExample: false },
      { input: "7 1 2 3 4 5 6 7", expectedOutput: "4", isExample: false },
      { input: "7 1 2 null 3 4 5 null", expectedOutput: "3", isExample: false },
      { input: "9 1 null 2 null 3 null 4 null 5", expectedOutput: "4", isExample: false },
      { input: "7 1 2 3 null null 4 5", expectedOutput: "3", isExample: false },
      { input: "10 1 2 3 4 5 null null 6 null null 7", expectedOutput: "5", isExample: false }
    ],
    starterCode: {
      python: pythonBase,
      javascript: jsBase,
      cpp: `/*\nstruct TreeNode {\n    int val;\n    TreeNode *left;\n    TreeNode *right;\n    TreeNode() : val(0), left(nullptr), right(nullptr) {}\n    TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}\n    TreeNode(int x, TreeNode *left, TreeNode *right) : val(x), left(left), right(right) {}\n};\n*/\n\nint diameterOfBinaryTree(TreeNode* root) {\n    // Write your solution here\n    \n}`,
    },
    driverCode: {
      python: "",
      javascript: "",
      cpp: `\n// --- Hidden Driver Code ---\n#include <queue>\n#include <string>\nTreeNode* buildTree() {\n    int n;\n    if (!(std::cin >> n) || n == 0) return nullptr;\n    vector<string> nodes(n);\n    for(int i=0; i<n; i++) std::cin >> nodes[i];\n    if (nodes[0] == "null") return nullptr;\n    \n    TreeNode* root = new TreeNode(stoi(nodes[0]));\n    queue<TreeNode*> q;\n    q.push(root);\n    int i = 1;\n    while(!q.empty() && i < n) {\n        TreeNode* curr = q.front();\n        q.pop();\n        \n        if (i < n && nodes[i] != "null") {\n            curr->left = new TreeNode(stoi(nodes[i]));\n            q.push(curr->left);\n        }\n        i++;\n        if (i < n && nodes[i] != "null") {\n            curr->right = new TreeNode(stoi(nodes[i]));\n            q.push(curr->right);\n        }\n        i++;\n    }\n    return root;\n}\nint main() {\n    TreeNode* root = buildTree();\n    std::cout << diameterOfBinaryTree(root) << "\\n";\n    return 0;\n}`,
    },
    minElo: 0,
  },
  {
    title: "Balanced Binary Tree",
    description: `# Balanced Binary Tree\n\nGiven a binary tree, determine if it is **height-balanced**.\n\nA **height-balanced** binary tree is defined as a binary tree in which the left and right subtrees of every node differ in height by no more than 1.\n\n## Examples\n\n**Input:** 7 3 9 20 null null 15 7\n**Output:** true\n\n**Input:** 7 1 2 2 3 3 null null\n**Output:** false\n\n**Input:** 0\n**Output:** true\n\n## Constraints\n- The number of nodes in the tree is in the range [0, 5000].\n- -10^4 <= Node.val <= 10^4`,
    difficulty: "easy",
    testCases: [
      { input: "7 3 9 20 null null 15 7", expectedOutput: "true", isExample: true },
      { input: "7 1 2 2 3 3 null null", expectedOutput: "false", isExample: true },
      { input: "0", expectedOutput: "true", isExample: true },
      { input: "1 1", expectedOutput: "true", isExample: false },
      { input: "3 1 2 3", expectedOutput: "true", isExample: false },
      { input: "3 1 2 null", expectedOutput: "true", isExample: false },
      { input: "5 1 2 null 3 null", expectedOutput: "false", isExample: false },
      { input: "7 1 2 3 4 5 6 7", expectedOutput: "true", isExample: false },
      { input: "9 1 2 3 4 null null 5 6 null", expectedOutput: "false", isExample: false },
      { input: "4 1 null 2 null", expectedOutput: "true", isExample: false }
    ],
    starterCode: {
      python: pythonBase,
      javascript: jsBase,
      cpp: `/*\nstruct TreeNode {\n    int val;\n    TreeNode *left;\n    TreeNode *right;\n    TreeNode() : val(0), left(nullptr), right(nullptr) {}\n    TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}\n    TreeNode(int x, TreeNode *left, TreeNode *right) : val(x), left(left), right(right) {}\n};\n*/\n\nbool isBalanced(TreeNode* root) {\n    // Write your solution here\n    \n}`,
    },
    driverCode: {
      python: "",
      javascript: "",
      cpp: `\n// --- Hidden Driver Code ---\n#include <queue>\n#include <string>\nTreeNode* buildTree() {\n    int n;\n    if (!(std::cin >> n) || n == 0) return nullptr;\n    vector<string> nodes(n);\n    for(int i=0; i<n; i++) std::cin >> nodes[i];\n    if (nodes[0] == "null") return nullptr;\n    \n    TreeNode* root = new TreeNode(stoi(nodes[0]));\n    queue<TreeNode*> q;\n    q.push(root);\n    int i = 1;\n    while(!q.empty() && i < n) {\n        TreeNode* curr = q.front();\n        q.pop();\n        \n        if (i < n && nodes[i] != "null") {\n            curr->left = new TreeNode(stoi(nodes[i]));\n            q.push(curr->left);\n        }\n        i++;\n        if (i < n && nodes[i] != "null") {\n            curr->right = new TreeNode(stoi(nodes[i]));\n            q.push(curr->right);\n        }\n        i++;\n    }\n    return root;\n}\nint main() {\n    TreeNode* root = buildTree();\n    std::cout << (isBalanced(root) ? "true" : "false") << "\\n";\n    return 0;\n}`,
    },
    minElo: 0,
  },
  {
    title: "Same Tree",
    description: `# Same Tree\n\nGiven the roots of two binary trees \`p\` and \`q\`, write a function to check if they are the same or not.\n\nTwo binary trees are considered the same if they are structurally identical, and the nodes have the same value.\n\n*Note: The input format provides exactly \`n1\` and \`n2\` (number of nodes in tree 1 and tree 2), followed by the nodes of tree 1, then tree 2.*\n\n## Examples\n\n**Input:** 3 3 1 2 3 1 2 3\n**Output:** true\n\n**Input:** 3 3 1 2 null 1 null 2\n**Output:** false\n\n**Input:** 5 5 1 2 1 1 1 2 1\n**Output:** false\n\n## Constraints\n- The number of nodes in both trees is in the range [0, 100].\n- -10^4 <= Node.val <= 10^4`,
    difficulty: "easy",
    testCases: [
      { input: "3 3 1 2 3 1 2 3", expectedOutput: "true", isExample: true },
      { input: "3 3 1 2 null 1 null 2", expectedOutput: "false", isExample: true },
      { input: "5 5 1 2 1 null null 1 1 2", expectedOutput: "false", isExample: true },
      { input: "0 0", expectedOutput: "true", isExample: false },
      { input: "1 0 1", expectedOutput: "false", isExample: false },
      { input: "1 1 5 5", expectedOutput: "true", isExample: false },
      { input: "1 1 5 6", expectedOutput: "false", isExample: false },
      { input: "3 3 1 2 3 1 3 2", expectedOutput: "false", isExample: false },
      { input: "4 4 1 2 3 4 1 2 3 4", expectedOutput: "true", isExample: false },
      { input: "4 4 1 2 3 null 1 2 3 null", expectedOutput: "true", isExample: false }
    ],
    starterCode: {
      python: pythonBase,
      javascript: jsBase,
      cpp: `/*\nstruct TreeNode {\n    int val;\n    TreeNode *left;\n    TreeNode *right;\n    TreeNode() : val(0), left(nullptr), right(nullptr) {}\n    TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}\n    TreeNode(int x, TreeNode *left, TreeNode *right) : val(x), left(left), right(right) {}\n};\n*/\n\nbool isSameTree(TreeNode* p, TreeNode* q) {\n    // Write your solution here\n    \n}`,
    },
    driverCode: {
      python: "",
      javascript: "",
      cpp: `\n// --- Hidden Driver Code ---\n#include <queue>\n#include <string>\nTreeNode* buildTree(int n) {\n    if (n == 0) return nullptr;\n    vector<string> nodes(n);\n    for(int i=0; i<n; i++) std::cin >> nodes[i];\n    if (nodes[0] == "null") return nullptr;\n    \n    TreeNode* root = new TreeNode(stoi(nodes[0]));\n    queue<TreeNode*> q;\n    q.push(root);\n    int i = 1;\n    while(!q.empty() && i < n) {\n        TreeNode* curr = q.front();\n        q.pop();\n        \n        if (i < n && nodes[i] != "null") {\n            curr->left = new TreeNode(stoi(nodes[i]));\n            q.push(curr->left);\n        }\n        i++;\n        if (i < n && nodes[i] != "null") {\n            curr->right = new TreeNode(stoi(nodes[i]));\n            q.push(curr->right);\n        }\n        i++;\n    }\n    return root;\n}\nint main() {\n    int n1, n2;\n    if (std::cin >> n1 >> n2) {\n        TreeNode* p = buildTree(n1);\n        TreeNode* q = buildTree(n2);\n        std::cout << (isSameTree(p, q) ? "true" : "false") << "\\n";\n    }\n    return 0;\n}`,
    },
    minElo: 0,
  },
  {
    title: "Subtree of Another Tree",
    description: `# Subtree of Another Tree\n\nGiven the roots of two binary trees \`root\` and \`subRoot\`, return \`true\` if there is a subtree of \`root\` with the same structure and node values of \`subRoot\` and \`false\` otherwise.\n\nA subtree of a binary tree \`tree\` is a tree that consists of a node in \`tree\` and all of this node's descendants. The tree \`tree\` could also be considered as a subtree of itself.\n\n*Note: The input format provides exactly \`n1\` and \`n2\` (number of nodes in root and subRoot), followed by the nodes of root, then subRoot.*\n\n## Examples\n\n**Input:** 5 3 3 4 5 1 2 4 1 2\n**Output:** true\n*Explanation:* The subRoot [4,1,2] exists in the root [3,4,5,1,2].\n\n**Input:** 7 3 3 4 5 1 2 null null 0 4 1 2\n**Output:** false\n\n## Constraints\n- The number of nodes in the root tree is in the range [1, 2000].\n- The number of nodes in the subRoot tree is in the range [1, 1000].\n- -10^4 <= root.val <= 10^4\n- -10^4 <= subRoot.val <= 10^4`,
    difficulty: "easy",
    testCases: [
      { input: "5 3 3 4 5 1 2 4 1 2", expectedOutput: "true", isExample: true },
      { input: "7 3 3 4 5 1 2 null null 0 4 1 2", expectedOutput: "false", isExample: true },
      { input: "1 1 1 1", expectedOutput: "true", isExample: false },
      { input: "1 1 1 2", expectedOutput: "false", isExample: false },
      { input: "3 1 1 2 3 2", expectedOutput: "true", isExample: false },
      { input: "3 1 1 2 3 3", expectedOutput: "true", isExample: false },
      { input: "3 1 1 2 3 4", expectedOutput: "false", isExample: false },
      { input: "7 3 1 2 3 4 5 6 7 2 4 5", expectedOutput: "true", isExample: false },
      { input: "7 3 1 2 3 4 5 6 7 3 6 7", expectedOutput: "true", isExample: false },
      { input: "7 3 1 2 3 4 5 6 7 2 4 6", expectedOutput: "false", isExample: false }
    ],
    starterCode: {
      python: pythonBase,
      javascript: jsBase,
      cpp: `/*\nstruct TreeNode {\n    int val;\n    TreeNode *left;\n    TreeNode *right;\n    TreeNode() : val(0), left(nullptr), right(nullptr) {}\n    TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}\n    TreeNode(int x, TreeNode *left, TreeNode *right) : val(x), left(left), right(right) {}\n};\n*/\n\nbool isSubtree(TreeNode* root, TreeNode* subRoot) {\n    // Write your solution here\n    \n}`,
    },
    driverCode: {
      python: "",
      javascript: "",
      cpp: `\n// --- Hidden Driver Code ---\n#include <queue>\n#include <string>\nTreeNode* buildTree(int n) {\n    if (n == 0) return nullptr;\n    vector<string> nodes(n);\n    for(int i=0; i<n; i++) std::cin >> nodes[i];\n    if (nodes[0] == "null") return nullptr;\n    \n    TreeNode* root = new TreeNode(stoi(nodes[0]));\n    queue<TreeNode*> q;\n    q.push(root);\n    int i = 1;\n    while(!q.empty() && i < n) {\n        TreeNode* curr = q.front();\n        q.pop();\n        \n        if (i < n && nodes[i] != "null") {\n            curr->left = new TreeNode(stoi(nodes[i]));\n            q.push(curr->left);\n        }\n        i++;\n        if (i < n && nodes[i] != "null") {\n            curr->right = new TreeNode(stoi(nodes[i]));\n            q.push(curr->right);\n        }\n        i++;\n    }\n    return root;\n}\nint main() {\n    int n1, n2;\n    if (std::cin >> n1 >> n2) {\n        TreeNode* p = buildTree(n1);\n        TreeNode* q = buildTree(n2);\n        std::cout << (isSubtree(p, q) ? "true" : "false") << "\\n";\n    }\n    return 0;\n}`,
    },
    minElo: 0,
  },
  {
    title: "Lowest Common Ancestor of a Binary Search Tree",
    description: `# Lowest Common Ancestor of a Binary Search Tree\n\nGiven a binary search tree (BST), find the lowest common ancestor (LCA) node of two given nodes in the BST.\n\nAccording to the definition of LCA on Wikipedia: "The lowest common ancestor is defined between two nodes \`p\` and \`q\` as the lowest node in \`T\` that has both \`p\` and \`q\` as descendants (where we allow a node to be a descendant of itself)."\n\n*Note: The input provides exactly the number of nodes \`n\`, followed by \`n\` strings representing the tree nodes, and finally two integers \`p\` and \`q\` (the values of the nodes). Return the value of the LCA.*\n\n## Examples\n\n**Input:** 9 6 2 8 0 4 7 9 null null 3 5 2 8\n**Output:** 6\n*Explanation:* The LCA of nodes 2 and 8 is 6.\n\n**Input:** 9 6 2 8 0 4 7 9 null null 3 5 2 4\n**Output:** 2\n*Explanation:* The LCA of nodes 2 and 4 is 2, since a node can be a descendant of itself.\n\n## Constraints\n- The number of nodes in the tree is in the range [2, 10^5].\n- -10^9 <= Node.val <= 10^9\n- All Node.val are unique.\n- p != q\n- p and q will exist in the BST.`,
    difficulty: "medium",
    testCases: [
      { input: "11 6 2 8 0 4 7 9 null null 3 5 2 8", expectedOutput: "6", isExample: true },
      { input: "11 6 2 8 0 4 7 9 null null 3 5 2 4", expectedOutput: "2", isExample: true },
      { input: "2 2 1 2 1", expectedOutput: "2", isExample: true },
      { input: "3 2 1 3 1 3", expectedOutput: "2", isExample: false },
      { input: "3 5 3 6 3 6", expectedOutput: "5", isExample: false },
      { input: "7 4 2 6 1 3 5 7 1 3", expectedOutput: "2", isExample: false },
      { input: "7 4 2 6 1 3 5 7 1 7", expectedOutput: "4", isExample: false },
      { input: "7 4 2 6 1 3 5 7 5 7", expectedOutput: "6", isExample: false },
      { input: "7 4 2 6 1 3 5 7 3 5", expectedOutput: "4", isExample: false },
      { input: "5 10 5 15 null 8 5 8", expectedOutput: "5", isExample: false }
    ],
    starterCode: {
      python: pythonBase,
      javascript: jsBase,
      cpp: `/*\nstruct TreeNode {\n    int val;\n    TreeNode *left;\n    TreeNode *right;\n    TreeNode() : val(0), left(nullptr), right(nullptr) {}\n    TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}\n    TreeNode(int x, TreeNode *left, TreeNode *right) : val(x), left(left), right(right) {}\n};\n*/\n\nTreeNode* lowestCommonAncestor(TreeNode* root, TreeNode* p, TreeNode* q) {\n    // Write your solution here\n    \n}`,
    },
    driverCode: {
      python: "",
      javascript: "",
      cpp: `\n// --- Hidden Driver Code ---\n#include <queue>\n#include <string>\nTreeNode* buildTree() {\n    int n;\n    if (!(std::cin >> n) || n == 0) return nullptr;\n    vector<string> nodes(n);\n    for(int i=0; i<n; i++) std::cin >> nodes[i];\n    if (nodes[0] == "null") return nullptr;\n    \n    TreeNode* root = new TreeNode(stoi(nodes[0]));\n    queue<TreeNode*> q;\n    q.push(root);\n    int i = 1;\n    while(!q.empty() && i < n) {\n        TreeNode* curr = q.front();\n        q.pop();\n        \n        if (i < n && nodes[i] != "null") {\n            curr->left = new TreeNode(stoi(nodes[i]));\n            q.push(curr->left);\n        }\n        i++;\n        if (i < n && nodes[i] != "null") {\n            curr->right = new TreeNode(stoi(nodes[i]));\n            q.push(curr->right);\n        }\n        i++;\n    }\n    return root;\n}\nint main() {\n    TreeNode* root = buildTree();\n    int p_val, q_val;\n    std::cin >> p_val >> q_val;\n    TreeNode p(p_val);\n    TreeNode q(q_val);\n    TreeNode* res = lowestCommonAncestor(root, &p, &q);\n    std::cout << (res ? to_string(res->val) : "null") << "\\n";\n    return 0;\n}`,
    },
    minElo: 800,
  },
  {
    title: "Binary Tree Level Order Traversal",
    description: `# Binary Tree Level Order Traversal\n\nGiven the \`root\` of a binary tree, return the level order traversal of its nodes' values. (i.e., from left to right, level by level).\n\n*Note: The input format provides exactly the number of nodes \`n\`, followed by \`n\` strings representing the tree nodes in BFS format.*\n\n## Examples\n\n**Input:** 7 3 9 20 null null 15 7\n**Output:** 3 | 9 20 | 15 7\n\n**Input:** 1 1\n**Output:** 1\n\n**Input:** 0\n**Output:** \n\n## Constraints\n- The number of nodes in the tree is in the range [0, 2000].\n- -1000 <= Node.val <= 1000`,
    difficulty: "medium",
    testCases: [
      { input: "7 3 9 20 null null 15 7", expectedOutput: "3 | 9 20 | 15 7", isExample: true },
      { input: "1 1", expectedOutput: "1", isExample: true },
      { input: "0", expectedOutput: "", isExample: true },
      { input: "3 1 2 3", expectedOutput: "1 | 2 3", isExample: false },
      { input: "5 1 2 null 3 null", expectedOutput: "1 | 2 | 3", isExample: false },
      { input: "7 1 2 3 4 5 6 7", expectedOutput: "1 | 2 3 | 4 5 6 7", isExample: false },
      { input: "6 1 2 3 4 null null 5", expectedOutput: "1 | 2 3 | 4 5", isExample: false },
      { input: "3 1 null 2", expectedOutput: "1 | 2", isExample: false },
      { input: "15 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15", expectedOutput: "1 | 2 3 | 4 5 6 7 | 8 9 10 11 12 13 14 15", isExample: false },
      { input: "9 1 null 2 null 3 null 4 null 5", expectedOutput: "1 | 2 | 3 | 4 | 5", isExample: false }
    ],
    starterCode: {
      python: pythonBase,
      javascript: jsBase,
      cpp: `/*\nstruct TreeNode {\n    int val;\n    TreeNode *left;\n    TreeNode *right;\n    TreeNode() : val(0), left(nullptr), right(nullptr) {}\n    TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}\n    TreeNode(int x, TreeNode *left, TreeNode *right) : val(x), left(left), right(right) {}\n};\n*/\n\nvector<vector<int>> levelOrder(TreeNode* root) {\n    // Write your solution here\n    \n}`,
    },
    driverCode: {
      python: "",
      javascript: "",
      cpp: `\n// --- Hidden Driver Code ---\n#include <queue>\n#include <string>\nTreeNode* buildTree() {\n    int n;\n    if (!(std::cin >> n) || n == 0) return nullptr;\n    vector<string> nodes(n);\n    for(int i=0; i<n; i++) std::cin >> nodes[i];\n    if (nodes[0] == "null") return nullptr;\n    \n    TreeNode* root = new TreeNode(stoi(nodes[0]));\n    queue<TreeNode*> q;\n    q.push(root);\n    int i = 1;\n    while(!q.empty() && i < n) {\n        TreeNode* curr = q.front();\n        q.pop();\n        \n        if (i < n && nodes[i] != "null") {\n            curr->left = new TreeNode(stoi(nodes[i]));\n            q.push(curr->left);\n        }\n        i++;\n        if (i < n && nodes[i] != "null") {\n            curr->right = new TreeNode(stoi(nodes[i]));\n            q.push(curr->right);\n        }\n        i++;\n    }\n    return root;\n}\nint main() {\n    TreeNode* root = buildTree();\n    vector<vector<int>> res = levelOrder(root);\n    for(int i=0; i<res.size(); i++) {\n        for(int j=0; j<res[i].size(); j++) {\n            std::cout << res[i][j] << (j == res[i].size()-1 ? "" : " ");\n        }\n        std::cout << (i == res.size()-1 ? "" : " | ");\n    }\n    std::cout << "\\n";\n    return 0;\n}`,
    },
    minElo: 800,
  }
];
