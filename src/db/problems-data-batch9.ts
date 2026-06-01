import { Problem } from "./problems-data";

const pythonBase = `import sys\n\ndef solve():\n    input_data = sys.stdin.read().split()\n    if not input_data: return\n    pass\n\nif __name__ == '__main__':\n    solve()`;
const jsBase = `const fs = require('fs');\n\nfunction solve() {\n    const input = fs.readFileSync('/dev/stdin', 'utf-8').trim().split(/\\s+/);\n    if (!input[0]) return;\n}\n\nsolve();`;

export const seedProblemsBatch9: Problem[] = [
  {
    title: "Binary Tree Right Side View",
    description: `# Binary Tree Right Side View\n\nGiven the \`root\` of a binary tree, imagine yourself standing on the **right side** of it, return the values of the nodes you can see ordered from top to bottom.\n\n*Note: The input format provides exactly the number of nodes \`n\`, followed by \`n\` strings representing the tree nodes in BFS format.*\n\n## Examples\n\n**Input:** 7 1 2 3 null 5 null 4\n**Output:** 1 3 4\n\n**Input:** 3 1 null 3\n**Output:** 1 3\n\n**Input:** 0\n**Output:** \n\n## Constraints\n- The number of nodes in the tree is in the range [0, 100].\n- -100 <= Node.val <= 100`,
    difficulty: "medium",
    testCases: [
      { input: "7 1 2 3 null 5 null 4", expectedOutput: "1 3 4", isExample: true },
      { input: "3 1 null 3", expectedOutput: "1 3", isExample: true },
      { input: "0", expectedOutput: "", isExample: true },
      { input: "1 1", expectedOutput: "1", isExample: false },
      { input: "3 1 2 3", expectedOutput: "1 3", isExample: false },
      { input: "7 1 2 3 4 5 6 7", expectedOutput: "1 3 7", isExample: false },
      { input: "5 1 2 null 3 4", expectedOutput: "1 2 4", isExample: false },
      { input: "6 1 2 3 4 null null 5", expectedOutput: "1 3 5", isExample: false },
      { input: "3 1 2 null", expectedOutput: "1 2", isExample: false },
      { input: "9 1 2 3 null 4 null null 5 null", expectedOutput: "1 3 4 5", isExample: false }
    ],
    starterCode: {
      python: pythonBase,
      javascript: jsBase,
      cpp: `/*\nstruct TreeNode {\n    int val;\n    TreeNode *left;\n    TreeNode *right;\n    TreeNode() : val(0), left(nullptr), right(nullptr) {}\n    TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}\n    TreeNode(int x, TreeNode *left, TreeNode *right) : val(x), left(left), right(right) {}\n};\n*/\n\nvector<int> rightSideView(TreeNode* root) {\n    // Write your solution here\n    \n}`,
    },
    driverCode: {
      python: "",
      javascript: "",
      cpp: `\n// --- Hidden Driver Code ---\n#include <queue>\n#include <string>\nTreeNode* buildTree() {\n    int n;\n    if (!(std::cin >> n) || n == 0) return nullptr;\n    vector<string> nodes(n);\n    for(int i=0; i<n; i++) std::cin >> nodes[i];\n    if (nodes[0] == "null") return nullptr;\n    \n    TreeNode* root = new TreeNode(stoi(nodes[0]));\n    queue<TreeNode*> q;\n    q.push(root);\n    int i = 1;\n    while(!q.empty() && i < n) {\n        TreeNode* curr = q.front();\n        q.pop();\n        \n        if (i < n && nodes[i] != "null") {\n            curr->left = new TreeNode(stoi(nodes[i]));\n            q.push(curr->left);\n        }\n        i++;\n        if (i < n && nodes[i] != "null") {\n            curr->right = new TreeNode(stoi(nodes[i]));\n            q.push(curr->right);\n        }\n        i++;\n    }\n    return root;\n}\nint main() {\n    TreeNode* root = buildTree();\n    vector<int> res = rightSideView(root);\n    for(int i=0; i<res.size(); i++) {\n        std::cout << res[i] << (i == res.size()-1 ? "" : " ");\n    }\n    std::cout << "\\n";\n    return 0;\n}`,
    },
    minElo: 800,
  },
  {
    title: "Count Good Nodes in Binary Tree",
    description: `# Count Good Nodes in Binary Tree\n\nGiven a binary tree \`root\`, a node \`X\` in the tree is named **good** if in the path from root to \`X\` there are no nodes with a value greater than \`X\`.\n\nReturn the number of **good** nodes in the binary tree.\n\n## Examples\n\n**Input:** 7 3 1 4 3 null 1 5\n**Output:** 4\n*Explanation:*\nRoot Node (3) is always a good node.\nNode 4 -> (3,4) is the maximum value in the path starting from the root.\nNode 5 -> (3,4,5) is the maximum value in the path\nNode 3 -> (3,1,3) is the maximum value in the path.\n\n**Input:** 5 3 3 null 4 2\n**Output:** 3\n\n**Input:** 1 1\n**Output:** 1\n\n## Constraints\n- The number of nodes in the binary tree is in the range [1, 10^5].\n- -10^4 <= Node.val <= 10^4`,
    difficulty: "medium",
    testCases: [
      { input: "7 3 1 4 3 null 1 5", expectedOutput: "4", isExample: true },
      { input: "5 3 3 null 4 2", expectedOutput: "3", isExample: true },
      { input: "1 1", expectedOutput: "1", isExample: true },
      { input: "3 2 1 3", expectedOutput: "2", isExample: false },
      { input: "7 9 10 5 null null 6 11", expectedOutput: "3", isExample: false },
      { input: "3 5 4 3", expectedOutput: "1", isExample: false },
      { input: "7 1 2 3 4 5 6 7", expectedOutput: "7", isExample: false },
      { input: "7 10 2 3 4 5 6 7", expectedOutput: "1", isExample: false },
      { input: "3 1 2 null", expectedOutput: "2", isExample: false },
      { input: "5 1 2 3 null 4", expectedOutput: "4", isExample: false }
    ],
    starterCode: {
      python: pythonBase,
      javascript: jsBase,
      cpp: `/*\nstruct TreeNode {\n    int val;\n    TreeNode *left;\n    TreeNode *right;\n    TreeNode() : val(0), left(nullptr), right(nullptr) {}\n    TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}\n    TreeNode(int x, TreeNode *left, TreeNode *right) : val(x), left(left), right(right) {}\n};\n*/\n\nint goodNodes(TreeNode* root) {\n    // Write your solution here\n    \n}`,
    },
    driverCode: {
      python: "",
      javascript: "",
      cpp: `\n// --- Hidden Driver Code ---\n#include <queue>\n#include <string>\nTreeNode* buildTree() {\n    int n;\n    if (!(std::cin >> n) || n == 0) return nullptr;\n    vector<string> nodes(n);\n    for(int i=0; i<n; i++) std::cin >> nodes[i];\n    if (nodes[0] == "null") return nullptr;\n    \n    TreeNode* root = new TreeNode(stoi(nodes[0]));\n    queue<TreeNode*> q;\n    q.push(root);\n    int i = 1;\n    while(!q.empty() && i < n) {\n        TreeNode* curr = q.front();\n        q.pop();\n        \n        if (i < n && nodes[i] != "null") {\n            curr->left = new TreeNode(stoi(nodes[i]));\n            q.push(curr->left);\n        }\n        i++;\n        if (i < n && nodes[i] != "null") {\n            curr->right = new TreeNode(stoi(nodes[i]));\n            q.push(curr->right);\n        }\n        i++;\n    }\n    return root;\n}\nint main() {\n    TreeNode* root = buildTree();\n    std::cout << goodNodes(root) << "\\n";\n    return 0;\n}`,
    },
    minElo: 800,
  },
  {
    title: "Validate Binary Search Tree",
    description: `# Validate Binary Search Tree\n\nGiven the \`root\` of a binary tree, determine if it is a valid binary search tree (BST).\n\nA **valid BST** is defined as follows:\n- The left subtree of a node contains only nodes with keys **less than** the node's key.\n- The right subtree of a node contains only nodes with keys **greater than** the node's key.\n- Both the left and right subtrees must also be binary search trees.\n\n## Examples\n\n**Input:** 3 2 1 3\n**Output:** true\n\n**Input:** 7 5 1 4 null null 3 6\n**Output:** false\n*Explanation:* The root node's value is 5 but its right child's value is 4.\n\n## Constraints\n- The number of nodes in the tree is in the range [1, 10^4].\n- -2^31 <= Node.val <= 2^31 - 1`,
    difficulty: "medium",
    testCases: [
      { input: "3 2 1 3", expectedOutput: "true", isExample: true },
      { input: "7 5 1 4 null null 3 6", expectedOutput: "false", isExample: true },
      { input: "1 1", expectedOutput: "true", isExample: false },
      { input: "3 2 2 2", expectedOutput: "false", isExample: false },
      { input: "3 10 5 15", expectedOutput: "true", isExample: false },
      { input: "5 10 5 15 null null 6 20", expectedOutput: "false", isExample: false },
      { input: "7 10 5 15 2 7 12 20", expectedOutput: "true", isExample: false },
      { input: "5 5 4 6 null null 3 7", expectedOutput: "false", isExample: false },
      { input: "3 5 6 7", expectedOutput: "false", isExample: false },
      { input: "3 2147483647 2147483646 null", expectedOutput: "true", isExample: false }
    ],
    starterCode: {
      python: pythonBase,
      javascript: jsBase,
      cpp: `/*\nstruct TreeNode {\n    int val;\n    TreeNode *left;\n    TreeNode *right;\n    TreeNode() : val(0), left(nullptr), right(nullptr) {}\n    TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}\n    TreeNode(int x, TreeNode *left, TreeNode *right) : val(x), left(left), right(right) {}\n};\n*/\n\nbool isValidBST(TreeNode* root) {\n    // Write your solution here\n    \n}`,
    },
    driverCode: {
      python: "",
      javascript: "",
      cpp: `\n// --- Hidden Driver Code ---\n#include <queue>\n#include <string>\nTreeNode* buildTree() {\n    int n;\n    if (!(std::cin >> n) || n == 0) return nullptr;\n    vector<string> nodes(n);\n    for(int i=0; i<n; i++) std::cin >> nodes[i];\n    if (nodes[0] == "null") return nullptr;\n    \n    TreeNode* root = new TreeNode(stoi(nodes[0]));\n    queue<TreeNode*> q;\n    q.push(root);\n    int i = 1;\n    while(!q.empty() && i < n) {\n        TreeNode* curr = q.front();\n        q.pop();\n        \n        if (i < n && nodes[i] != "null") {\n            curr->left = new TreeNode(stoi(nodes[i]));\n            q.push(curr->left);\n        }\n        i++;\n        if (i < n && nodes[i] != "null") {\n            curr->right = new TreeNode(stoi(nodes[i]));\n            q.push(curr->right);\n        }\n        i++;\n    }\n    return root;\n}\nint main() {\n    TreeNode* root = buildTree();\n    std::cout << (isValidBST(root) ? "true" : "false") << "\\n";\n    return 0;\n}`,
    },
    minElo: 800,
  },
  {
    title: "Kth Smallest Element in a BST",
    description: `# Kth Smallest Element in a BST\n\nGiven the \`root\` of a binary search tree, and an integer \`k\`, return the \`k\`th smallest value (1-indexed) of all the values of the nodes in the tree.\n\n*Note: The input provides exactly \`n\`, followed by \`n\` strings representing the tree nodes, and finally the integer \`k\`.*\n\n## Examples\n\n**Input:** 5 3 1 4 null 2 1\n**Output:** 1\n\n**Input:** 11 5 3 6 2 4 null null 1 null null null 3\n**Output:** 3\n\n## Constraints\n- The number of nodes in the tree is n.\n- 1 <= k <= n <= 10^4\n- 0 <= Node.val <= 10^4`,
    difficulty: "medium",
    testCases: [
      { input: "5 3 1 4 null 2 1", expectedOutput: "1", isExample: true },
      { input: "11 5 3 6 2 4 null null 1 null null null 3", expectedOutput: "3", isExample: true },
      { input: "1 10 1", expectedOutput: "10", isExample: false },
      { input: "3 2 1 3 2", expectedOutput: "2", isExample: false },
      { input: "3 2 1 3 3", expectedOutput: "3", isExample: false },
      { input: "7 10 5 15 2 7 12 20 5", expectedOutput: "12", isExample: false },
      { input: "7 10 5 15 2 7 12 20 7", expectedOutput: "20", isExample: false },
      { input: "7 10 5 15 2 7 12 20 1", expectedOutput: "2", isExample: false },
      { input: "5 5 4 6 null null null null 2", expectedOutput: "5", isExample: false },
      { input: "5 5 null 6 null 7 3", expectedOutput: "7", isExample: false }
    ],
    starterCode: {
      python: pythonBase,
      javascript: jsBase,
      cpp: `/*\nstruct TreeNode {\n    int val;\n    TreeNode *left;\n    TreeNode *right;\n    TreeNode() : val(0), left(nullptr), right(nullptr) {}\n    TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}\n    TreeNode(int x, TreeNode *left, TreeNode *right) : val(x), left(left), right(right) {}\n};\n*/\n\nint kthSmallest(TreeNode* root, int k) {\n    // Write your solution here\n    \n}`,
    },
    driverCode: {
      python: "",
      javascript: "",
      cpp: `\n// --- Hidden Driver Code ---\n#include <queue>\n#include <string>\nint main() {\n    int n;\n    if (!(std::cin >> n)) return 0;\n    vector<string> nodes(n);\n    for(int i=0; i<n; i++) std::cin >> nodes[i];\n    int k; std::cin >> k;\n    \n    TreeNode* root = nullptr;\n    if (n > 0 && nodes[0] != "null") {\n        root = new TreeNode(stoi(nodes[0]));\n        queue<TreeNode*> q;\n        q.push(root);\n        int i = 1;\n        while(!q.empty() && i < n) {\n            TreeNode* curr = q.front();\n            q.pop();\n            \n            if (i < n && nodes[i] != "null") {\n                curr->left = new TreeNode(stoi(nodes[i]));\n                q.push(curr->left);\n            }\n            i++;\n            if (i < n && nodes[i] != "null") {\n                curr->right = new TreeNode(stoi(nodes[i]));\n                q.push(curr->right);\n            }\n            i++;\n        }\n    }\n    std::cout << kthSmallest(root, k) << "\\n";\n    return 0;\n}`,
    },
    minElo: 800,
  },
  {
    title: "Construct Binary Tree from Preorder and Inorder Traversal",
    description: `# Construct Binary Tree from Preorder and Inorder Traversal\n\nGiven two integer arrays \`preorder\` and \`inorder\` where \`preorder\` is the preorder traversal of a binary tree and \`inorder\` is the inorder traversal of the same tree, construct and return the binary tree.\n\n*Note: The input provides exactly \`n\` (size of arrays), followed by \`n\` integers for \`preorder\`, and then \`n\` integers for \`inorder\`.*\n\n## Examples\n\n**Input:** 5 3 9 20 15 7 9 3 15 20 7\n**Output:** 3 9 20 null null 15 7\n\n**Input:** 1 -1 -1\n**Output:** -1\n\n## Constraints\n- 1 <= preorder.length <= 3000\n- inorder.length == preorder.length\n- -3000 <= preorder[i], inorder[i] <= 3000\n- preorder and inorder consist of unique values.\n- Each value of inorder also appears in preorder.\n- preorder is guaranteed to be the preorder traversal of the tree.\n- inorder is guaranteed to be the inorder traversal of the tree.`,
    difficulty: "medium",
    testCases: [
      { input: "5 3 9 20 15 7 9 3 15 20 7", expectedOutput: "3 9 20 null null 15 7", isExample: true },
      { input: "1 -1 -1", expectedOutput: "-1", isExample: true },
      { input: "3 1 2 3 2 1 3", expectedOutput: "1 2 3", isExample: false },
      { input: "3 1 2 3 1 2 3", expectedOutput: "1 null 2 null 3", isExample: false },
      { input: "3 1 2 3 3 2 1", expectedOutput: "1 2 null 3", isExample: false },
      { input: "2 1 2 2 1", expectedOutput: "1 2", isExample: false },
      { input: "2 1 2 1 2", expectedOutput: "1 null 2", isExample: false },
      { input: "4 1 2 4 3 4 2 1 3", expectedOutput: "1 2 3 4", isExample: false },
      { input: "7 4 2 1 3 6 5 7 1 2 3 4 5 6 7", expectedOutput: "4 2 6 1 3 5 7", isExample: false },
      { input: "5 10 5 15 8 20 5 10 8 15 20", expectedOutput: "10 5 15 null null 8 20", isExample: false }
    ],
    starterCode: {
      python: pythonBase,
      javascript: jsBase,
      cpp: `/*\nstruct TreeNode {\n    int val;\n    TreeNode *left;\n    TreeNode *right;\n    TreeNode() : val(0), left(nullptr), right(nullptr) {}\n    TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}\n    TreeNode(int x, TreeNode *left, TreeNode *right) : val(x), left(left), right(right) {}\n};\n*/\n\nTreeNode* buildTree(vector<int>& preorder, vector<int>& inorder) {\n    // Write your solution here\n    \n}`,
    },
    driverCode: {
      python: "",
      javascript: "",
      cpp: `\n// --- Hidden Driver Code ---\n#include <queue>\n#include <string>\nvoid printTree(TreeNode* root) {\n    if (!root) {\n        std::cout << "\\n";\n        return;\n    }\n    vector<string> res;\n    queue<TreeNode*> q;\n    q.push(root);\n    while(!q.empty()) {\n        TreeNode* curr = q.front();\n        q.pop();\n        if (curr) {\n            res.push_back(to_string(curr->val));\n            q.push(curr->left);\n            q.push(curr->right);\n        } else {\n            res.push_back("null");\n        }\n    }\n    while(!res.empty() && res.back() == "null") res.pop_back();\n    for(int i=0; i<res.size(); i++) {\n        std::cout << res[i] << (i == res.size()-1 ? "" : " ");\n    }\n    std::cout << "\\n";\n}\nint main() {\n    int n;\n    if (std::cin >> n) {\n        vector<int> pre(n), in(n);\n        for(int i=0; i<n; i++) std::cin >> pre[i];\n        for(int i=0; i<n; i++) std::cin >> in[i];\n        TreeNode* root = buildTree(pre, in);\n        printTree(root);\n    }\n    return 0;\n}`,
    },
    minElo: 800,
  },
  {
    title: "Subsets",
    description: `# Subsets\n\nGiven an integer array \`nums\` of **unique** elements, return all possible subsets (the power set).\n\nThe solution set **must not** contain duplicate subsets. Return the solution in **any order**.\n\n*Note: The backend driver automatically sorts your returned subset array to check against expected output.*\n\n## Examples\n\n**Input:** 3 1 2 3\n**Output:** | 1 | 1 2 | 1 2 3 | 1 3 | 2 | 2 3 | 3\n\n**Input:** 1 0\n**Output:** | 0\n\n## Constraints\n- 1 <= nums.length <= 10\n- -10 <= nums[i] <= 10\n- All the numbers of nums are unique.`,
    difficulty: "medium",
    testCases: [
      { input: "3 1 2 3", expectedOutput: " | 1 | 1 2 | 1 2 3 | 1 3 | 2 | 2 3 | 3", isExample: true },
      { input: "1 0", expectedOutput: " | 0", isExample: true },
      { input: "0", expectedOutput: " ", isExample: false },
      { input: "2 1 2", expectedOutput: " | 1 | 1 2 | 2", isExample: false },
      { input: "4 1 2 3 4", expectedOutput: " | 1 | 1 2 | 1 2 3 | 1 2 3 4 | 1 2 4 | 1 3 | 1 3 4 | 1 4 | 2 | 2 3 | 2 3 4 | 2 4 | 3 | 3 4 | 4", isExample: false },
      { input: "2 4 5", expectedOutput: " | 4 | 4 5 | 5", isExample: false },
      { input: "3 9 0 -1", expectedOutput: " | -1 | -1 0 | -1 0 9 | -1 9 | 0 | 0 9 | 9", isExample: false },
      { input: "1 10", expectedOutput: " | 10", isExample: false },
      { input: "2 -5 5", expectedOutput: " | -5 | -5 5 | 5", isExample: false },
      { input: "3 -1 -2 -3", expectedOutput: " | -3 | -3 -2 | -3 -2 -1 | -3 -1 | -2 | -2 -1 | -1", isExample: false }
    ],
    starterCode: {
      python: pythonBase,
      javascript: jsBase,
      cpp: `vector<vector<int>> subsets(vector<int>& nums) {\n    // Write your solution here\n    \n}`,
    },
    driverCode: {
      python: "",
      javascript: "",
      cpp: `\n// --- Hidden Driver Code ---\n#include <iostream>\n#include <vector>\n#include <algorithm>\nusing namespace std;\nint main() {\n    int n;\n    if (std::cin >> n) {\n        vector<int> nums(n);\n        for(int i=0; i<n; i++) std::cin >> nums[i];\n        vector<vector<int>> res = subsets(nums);\n        for(auto& v : res) sort(v.begin(), v.end());\n        sort(res.begin(), res.end());\n        for(int i=0; i<res.size(); i++) {\n            for(int j=0; j<res[i].size(); j++) {\n                std::cout << res[i][j] << (j == res[i].size()-1 ? "" : " ");\n            }\n            if (res[i].empty()) std::cout << " "; // So split by | works visually\n            std::cout << (i == res.size()-1 ? "" : " | ");\n        }\n        std::cout << "\\n";\n    }\n    return 0;\n}`,
    },
    minElo: 800,
  },
  {
    title: "Combination Sum",
    description: `# Combination Sum\n\nGiven an array of **distinct** integers \`candidates\` and a target integer \`target\`, return a list of all **unique combinations** of \`candidates\` where the chosen numbers sum to \`target\`.\n\nThe **same** number may be chosen from \`candidates\` an **unlimited number of times**. Two combinations are unique if the frequency of at least one of the chosen numbers is different.\n\n*Note: The backend driver automatically sorts your returned combinations array to check against expected output. The input passes \`target\` as the last integer.*\n\n## Examples\n\n**Input:** 4 2 3 6 7 7\n**Output:** 2 2 3 | 7\n*Explanation:* candidates=[2,3,6,7], target=7. 2 and 3 are candidates, and 2 + 2 + 3 = 7. 7 is a candidate, and 7 = 7.\n\n**Input:** 3 2 3 5 8\n**Output:** 2 2 2 2 | 2 3 3 | 3 5\n\n**Input:** 1 2 1\n**Output:** \n\n## Constraints\n- 1 <= candidates.length <= 30\n- 2 <= candidates[i] <= 40\n- All elements of candidates are distinct.\n- 1 <= target <= 40`,
    difficulty: "medium",
    testCases: [
      { input: "4 2 3 6 7 7", expectedOutput: "2 2 3 | 7", isExample: true },
      { input: "3 2 3 5 8", expectedOutput: "2 2 2 2 | 2 3 3 | 3 5", isExample: true },
      { input: "1 2 1", expectedOutput: "", isExample: true },
      { input: "2 2 4 4", expectedOutput: "2 2 | 4", isExample: false },
      { input: "3 1 2 3 4", expectedOutput: "1 1 1 1 | 1 1 2 | 1 3 | 2 2", isExample: false },
      { input: "1 10 10", expectedOutput: "10", isExample: false },
      { input: "1 10 5", expectedOutput: "", isExample: false },
      { input: "4 2 3 5 7 10", expectedOutput: "2 2 2 2 2 | 2 2 3 3 | 2 3 5 | 3 7 | 5 5", isExample: false },
      { input: "3 5 10 15 20", expectedOutput: "5 5 5 5 | 5 15 | 10 10", isExample: false },
      { input: "2 7 8 15", expectedOutput: "7 8", isExample: false }
    ],
    starterCode: {
      python: pythonBase,
      javascript: jsBase,
      cpp: `vector<vector<int>> combinationSum(vector<int>& candidates, int target) {\n    // Write your solution here\n    \n}`,
    },
    driverCode: {
      python: "",
      javascript: "",
      cpp: `\n// --- Hidden Driver Code ---\n#include <iostream>\n#include <vector>\n#include <algorithm>\nusing namespace std;\nint main() {\n    vector<int> nums;\n    int n;\n    while (std::cin >> n) {\n        nums.push_back(n);\n    }\n    if (nums.empty()) return 0;\n    int target = nums.back();\n    nums.pop_back();\n    if (!nums.empty()) {\n        // first element was length\n        nums.erase(nums.begin());\n    }\n    vector<vector<int>> res = combinationSum(nums, target);\n    for(auto& v : res) sort(v.begin(), v.end());\n    sort(res.begin(), res.end());\n    for(int i=0; i<res.size(); i++) {\n        for(int j=0; j<res[i].size(); j++) {\n            std::cout << res[i][j] << (j == res[i].size()-1 ? "" : " ");\n        }\n        if (res[i].empty()) std::cout << " ";\n        std::cout << (i == res.size()-1 ? "" : " | ");\n    }\n    std::cout << "\\n";\n    return 0;\n}`,
    },
    minElo: 800,
  },
  {
    title: "Permutations",
    description: `# Permutations\n\nGiven an array \`nums\` of distinct integers, return all the possible permutations. You can return the answer in **any order**.\n\n*Note: The backend driver automatically sorts your returned permutations array to check against expected output.*\n\n## Examples\n\n**Input:** 3 1 2 3\n**Output:** 1 2 3 | 1 3 2 | 2 1 3 | 2 3 1 | 3 1 2 | 3 2 1\n\n**Input:** 2 0 1\n**Output:** 0 1 | 1 0\n\n**Input:** 1 1\n**Output:** 1\n\n## Constraints\n- 1 <= nums.length <= 6\n- -10 <= nums[i] <= 10\n- All the integers of nums are unique.`,
    difficulty: "medium",
    testCases: [
      { input: "3 1 2 3", expectedOutput: "1 2 3 | 1 3 2 | 2 1 3 | 2 3 1 | 3 1 2 | 3 2 1", isExample: true },
      { input: "2 0 1", expectedOutput: "0 1 | 1 0", isExample: true },
      { input: "1 1", expectedOutput: "1", isExample: true },
      { input: "2 5 6", expectedOutput: "5 6 | 6 5", isExample: false },
      { input: "3 4 5 6", expectedOutput: "4 5 6 | 4 6 5 | 5 4 6 | 5 6 4 | 6 4 5 | 6 5 4", isExample: false },
      { input: "3 -1 -2 -3", expectedOutput: "-3 -2 -1 | -3 -1 -2 | -2 -3 -1 | -2 -1 -3 | -1 -3 -2 | -1 -2 -3", isExample: false },
      { input: "1 -10", expectedOutput: "-10", isExample: false },
      { input: "4 1 2 3 4", expectedOutput: "1 2 3 4 | 1 2 4 3 | 1 3 2 4 | 1 3 4 2 | 1 4 2 3 | 1 4 3 2 | 2 1 3 4 | 2 1 4 3 | 2 3 1 4 | 2 3 4 1 | 2 4 1 3 | 2 4 3 1 | 3 1 2 4 | 3 1 4 2 | 3 2 1 4 | 3 2 4 1 | 3 4 1 2 | 3 4 2 1 | 4 1 2 3 | 4 1 3 2 | 4 2 1 3 | 4 2 3 1 | 4 3 1 2 | 4 3 2 1", isExample: false },
      { input: "2 10 20", expectedOutput: "10 20 | 20 10", isExample: false },
      { input: "3 0 5 10", expectedOutput: "0 5 10 | 0 10 5 | 5 0 10 | 5 10 0 | 10 0 5 | 10 5 0", isExample: false }
    ],
    starterCode: {
      python: pythonBase,
      javascript: jsBase,
      cpp: `vector<vector<int>> permute(vector<int>& nums) {\n    // Write your solution here\n    \n}`,
    },
    driverCode: {
      python: "",
      javascript: "",
      cpp: `\n// --- Hidden Driver Code ---\n#include <iostream>\n#include <vector>\n#include <algorithm>\nusing namespace std;\nint main() {\n    int n;\n    if (std::cin >> n) {\n        vector<int> nums(n);\n        for(int i=0; i<n; i++) std::cin >> nums[i];\n        vector<vector<int>> res = permute(nums);\n        sort(res.begin(), res.end());\n        for(int i=0; i<res.size(); i++) {\n            for(int j=0; j<res[i].size(); j++) {\n                std::cout << res[i][j] << (j == res[i].size()-1 ? "" : " ");\n            }\n            if (res[i].empty()) std::cout << " ";\n            std::cout << (i == res.size()-1 ? "" : " | ");\n        }\n        std::cout << "\\n";\n    }\n    return 0;\n}`,
    },
    minElo: 800,
  },
  {
    title: "Subsets II",
    description: `# Subsets II\n\nGiven an integer array \`nums\` that may contain duplicates, return all possible subsets (the power set).\n\nThe solution set **must not** contain duplicate subsets. Return the solution in **any order**.\n\n*Note: The backend driver automatically sorts your returned subset array to check against expected output.*\n\n## Examples\n\n**Input:** 3 1 2 2\n**Output:** | 1 | 1 2 | 1 2 2 | 2 | 2 2\n\n**Input:** 1 0\n**Output:** | 0\n\n## Constraints\n- 1 <= nums.length <= 10\n- -10 <= nums[i] <= 10`,
    difficulty: "medium",
    testCases: [
      { input: "3 1 2 2", expectedOutput: " | 1 | 1 2 | 1 2 2 | 2 | 2 2", isExample: true },
      { input: "1 0", expectedOutput: " | 0", isExample: true },
      { input: "2 2 2", expectedOutput: " | 2 | 2 2", isExample: false },
      { input: "3 4 4 4", expectedOutput: " | 4 | 4 4 | 4 4 4", isExample: false },
      { input: "4 1 1 2 2", expectedOutput: " | 1 | 1 1 | 1 1 2 | 1 1 2 2 | 1 2 | 1 2 2 | 2 | 2 2", isExample: false },
      { input: "3 1 1 1", expectedOutput: " | 1 | 1 1 | 1 1 1", isExample: false },
      { input: "2 10 10", expectedOutput: " | 10 | 10 10", isExample: false },
      { input: "3 -1 -1 -1", expectedOutput: " | -1 | -1 -1 | -1 -1 -1", isExample: false },
      { input: "3 1 2 3", expectedOutput: " | 1 | 1 2 | 1 2 3 | 1 3 | 2 | 2 3 | 3", isExample: false },
      { input: "4 4 1 4 1", expectedOutput: " | 1 | 1 1 | 1 1 4 | 1 1 4 4 | 1 4 | 1 4 4 | 4 | 4 4", isExample: false }
    ],
    starterCode: {
      python: pythonBase,
      javascript: jsBase,
      cpp: `vector<vector<int>> subsetsWithDup(vector<int>& nums) {\n    // Write your solution here\n    \n}`,
    },
    driverCode: {
      python: "",
      javascript: "",
      cpp: `\n// --- Hidden Driver Code ---\n#include <iostream>\n#include <vector>\n#include <algorithm>\nusing namespace std;\nint main() {\n    int n;\n    if (std::cin >> n) {\n        vector<int> nums(n);\n        for(int i=0; i<n; i++) std::cin >> nums[i];\n        vector<vector<int>> res = subsetsWithDup(nums);\n        for(auto& v : res) sort(v.begin(), v.end());\n        sort(res.begin(), res.end());\n        // Remove duplicate subsets if player didn't completely filter them, wait no, they MUST filter them!\n        // We just print what they output. If they have duplicates, it will fail.\n        for(int i=0; i<res.size(); i++) {\n            for(int j=0; j<res[i].size(); j++) {\n                std::cout << res[i][j] << (j == res[i].size()-1 ? "" : " ");\n            }\n            if (res[i].empty()) std::cout << " ";\n            std::cout << (i == res.size()-1 ? "" : " | ");\n        }\n        std::cout << "\\n";\n    }\n    return 0;\n}`,
    },
    minElo: 800,
  },
  {
    title: "Combination Sum II",
    description: `# Combination Sum II\n\nGiven a collection of candidate numbers (\`candidates\`) and a target number (\`target\`), find all unique combinations in \`candidates\` where the candidate numbers sum to \`target\`.\n\nEach number in \`candidates\` may only be used **once** in the combination.\n\nNote: The solution set must not contain duplicate combinations.\n\n*Note: The backend driver automatically sorts your returned combinations array to check against expected output. The input passes \`target\` as the last integer.*\n\n## Examples\n\n**Input:** 7 10 1 2 7 6 1 5 8\n**Output:** 1 1 6 | 1 2 5 | 1 7 | 2 6\n\n**Input:** 5 2 5 2 1 2 5\n**Output:** 1 2 2 | 5\n\n## Constraints\n- 1 <= candidates.length <= 100\n- 1 <= candidates[i] <= 50\n- 1 <= target <= 30`,
    difficulty: "medium",
    testCases: [
      { input: "7 10 1 2 7 6 1 5 8", expectedOutput: "1 1 6 | 1 2 5 | 1 7 | 2 6", isExample: true },
      { input: "5 2 5 2 1 2 5", expectedOutput: "1 2 2 | 5", isExample: true },
      { input: "3 2 2 2 4", expectedOutput: "2 2", isExample: false },
      { input: "4 1 1 1 1 2", expectedOutput: "1 1", isExample: false },
      { input: "5 1 1 1 1 1 3", expectedOutput: "1 1 1", isExample: false },
      { input: "5 1 2 3 4 5 10", expectedOutput: "1 2 3 4 | 1 4 5 | 2 3 5", isExample: false },
      { input: "4 4 4 4 4 8", expectedOutput: "4 4", isExample: false },
      { input: "3 1 2 3 10", expectedOutput: "", isExample: false },
      { input: "6 1 2 2 2 5 6 7", expectedOutput: "1 2 2 2 | 1 6 | 2 5", isExample: false },
      { input: "2 1 1 1", expectedOutput: "", isExample: false }
    ],
    starterCode: {
      python: pythonBase,
      javascript: jsBase,
      cpp: `vector<vector<int>> combinationSum2(vector<int>& candidates, int target) {\n    // Write your solution here\n    \n}`,
    },
    driverCode: {
      python: "",
      javascript: "",
      cpp: `\n// --- Hidden Driver Code ---\n#include <iostream>\n#include <vector>\n#include <algorithm>\nusing namespace std;\nint main() {\n    vector<int> nums;\n    int n;\n    while (std::cin >> n) {\n        nums.push_back(n);\n    }\n    if (nums.empty()) return 0;\n    int target = nums.back();\n    nums.pop_back();\n    if (!nums.empty()) {\n        nums.erase(nums.begin());\n    }\n    vector<vector<int>> res = combinationSum2(nums, target);\n    for(auto& v : res) sort(v.begin(), v.end());\n    sort(res.begin(), res.end());\n    for(int i=0; i<res.size(); i++) {\n        for(int j=0; j<res[i].size(); j++) {\n            std::cout << res[i][j] << (j == res[i].size()-1 ? "" : " ");\n        }\n        if (res[i].empty()) std::cout << " ";\n        std::cout << (i == res.size()-1 ? "" : " | ");\n    }\n    std::cout << "\\n";\n    return 0;\n}`,
    },
    minElo: 800,
  }
];
