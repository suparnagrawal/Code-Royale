import { Problem } from "./problems-data";

const pythonBase = `import sys\n\ndef solve():\n    input_data = sys.stdin.read().split()\n    if not input_data: return\n    pass\n\nif __name__ == '__main__':\n    solve()`;
const jsBase = `const fs = require('fs');\n\nfunction solve() {\n    const input = fs.readFileSync('/dev/stdin', 'utf-8').trim().split(/\\s+/);\n    if (!input[0]) return;\n}\n\nsolve();`;

export const seedProblemsBatch7: Problem[] = [
  {
    title: "Reverse Linked List",
    description: `# Reverse Linked List\n\nGiven the \`head\` of a singly linked list, reverse the list, and return the reversed list.\n\n*Note: The input provides exactly the number of nodes \`n\`, followed by \`n\` integers representing the linked list.*\n\n## Examples\n\n**Input:** 5 1 2 3 4 5\n**Output:** 5 4 3 2 1\n\n**Input:** 2 1 2\n**Output:** 2 1\n\n**Input:** 0\n**Output:** \n\n## Constraints\n- The number of nodes in the list is the range [0, 5000].\n- -5000 <= Node.val <= 5000`,
    difficulty: "easy",
    testCases: [
      { input: "5 1 2 3 4 5", expectedOutput: "5 4 3 2 1", isExample: true },
      { input: "2 1 2", expectedOutput: "2 1", isExample: true },
      { input: "0", expectedOutput: "", isExample: true },
      { input: "1 100", expectedOutput: "100", isExample: false },
      { input: "10 1 2 3 4 5 6 7 8 9 10", expectedOutput: "10 9 8 7 6 5 4 3 2 1", isExample: false },
      { input: "3 5 5 5", expectedOutput: "5 5 5", isExample: false },
      { input: "4 -1 -2 -3 -4", expectedOutput: "-4 -3 -2 -1", isExample: false },
      { input: "5 10 20 30 40 50", expectedOutput: "50 40 30 20 10", isExample: false },
      { input: "2 0 0", expectedOutput: "0 0", isExample: false },
      { input: "6 1 3 5 2 4 6", expectedOutput: "6 4 2 5 3 1", isExample: false }
    ],
    starterCode: {
      python: pythonBase,
      javascript: jsBase,
      cpp: `/*\nstruct ListNode {\n    int val;\n    ListNode *next;\n    ListNode() : val(0), next(nullptr) {}\n    ListNode(int x) : val(x), next(nullptr) {}\n    ListNode(int x, ListNode *next) : val(x), next(next) {}\n};\n*/\n\nListNode* reverseList(ListNode* head) {\n    // Write your solution here\n    \n}`,
    },
    driverCode: {
      python: "",
      javascript: "",
      cpp: `\n// --- Hidden Driver Code ---\nListNode* buildList() {\n    int n;\n    if (!(std::cin >> n)) return nullptr;\n    ListNode dummy;\n    ListNode* curr = &dummy;\n    for(int i=0; i<n; i++) {\n        int val;\n        std::cin >> val;\n        curr->next = new ListNode(val);\n        curr = curr->next;\n    }\n    return dummy.next;\n}\nvoid printList(ListNode* head) {\n    while(head) {\n        std::cout << head->val << (head->next ? " " : "");\n        head = head->next;\n    }\n    std::cout << "\\n";\n}\nint main() {\n    ListNode* head = buildList();\n    ListNode* res = reverseList(head);\n    printList(res);\n    return 0;\n}`,
    },
    minElo: 0,
  },
  {
    title: "Merge Two Sorted Lists",
    description: `# Merge Two Sorted Lists\n\nYou are given the heads of two sorted linked lists \`list1\` and \`list2\`.\n\nMerge the two lists into one **sorted** list. The list should be made by splicing together the nodes of the first two lists.\n\nReturn the head of the merged linked list.\n\n*Note: The input provides exactly \`n1\` (size of list 1) and \`n2\` (size of list 2), followed by the elements of list 1, then list 2.*\n\n## Examples\n\n**Input:** 3 3 1 2 4 1 3 4\n**Output:** 1 1 2 3 4 4\n\n**Input:** 0 0\n**Output:** \n\n**Input:** 0 1 0\n**Output:** 0\n\n## Constraints\n- The number of nodes in both lists is in the range [0, 50].\n- -100 <= Node.val <= 100\n- Both list1 and list2 are sorted in non-decreasing order.`,
    difficulty: "easy",
    testCases: [
      { input: "3 3 1 2 4 1 3 4", expectedOutput: "1 1 2 3 4 4", isExample: true },
      { input: "0 0", expectedOutput: "", isExample: true },
      { input: "0 1 0", expectedOutput: "0", isExample: true },
      { input: "1 0 5", expectedOutput: "5", isExample: false },
      { input: "5 5 1 3 5 7 9 2 4 6 8 10", expectedOutput: "1 2 3 4 5 6 7 8 9 10", isExample: false },
      { input: "3 2 1 1 1 2 2", expectedOutput: "1 1 1 2 2", isExample: false },
      { input: "1 5 10 1 2 3 4 5", expectedOutput: "1 2 3 4 5 10", isExample: false },
      { input: "2 2 -5 0 -10 -2", expectedOutput: "-10 -5 -2 0", isExample: false },
      { input: "4 4 2 4 6 8 1 3 5 7", expectedOutput: "1 2 3 4 5 6 7 8", isExample: false },
      { input: "3 1 100 200 300 150", expectedOutput: "100 150 200 300", isExample: false }
    ],
    starterCode: {
      python: pythonBase,
      javascript: jsBase,
      cpp: `/*\nstruct ListNode {\n    int val;\n    ListNode *next;\n    ListNode() : val(0), next(nullptr) {}\n    ListNode(int x) : val(x), next(nullptr) {}\n    ListNode(int x, ListNode *next) : val(x), next(next) {}\n};\n*/\n\nListNode* mergeTwoLists(ListNode* list1, ListNode* list2) {\n    // Write your solution here\n    \n}`,
    },
    driverCode: {
      python: "",
      javascript: "",
      cpp: `\n// --- Hidden Driver Code ---\nListNode* buildList(int n) {\n    ListNode dummy;\n    ListNode* curr = &dummy;\n    for(int i=0; i<n; i++) {\n        int val;\n        std::cin >> val;\n        curr->next = new ListNode(val);\n        curr = curr->next;\n    }\n    return dummy.next;\n}\nvoid printList(ListNode* head) {\n    while(head) {\n        std::cout << head->val << (head->next ? " " : "");\n        head = head->next;\n    }\n    std::cout << "\\n";\n}\nint main() {\n    int n1, n2;\n    if (std::cin >> n1 >> n2) {\n        ListNode* l1 = buildList(n1);\n        ListNode* l2 = buildList(n2);\n        ListNode* res = mergeTwoLists(l1, l2);\n        printList(res);\n    }\n    return 0;\n}`,
    },
    minElo: 0,
  },
  {
    title: "Linked List Cycle",
    description: `# Linked List Cycle\n\nGiven \`head\`, the head of a linked list, determine if the linked list has a cycle in it.\n\nThere is a cycle in a linked list if there is some node in the list that can be reached again by continuously following the \`next\` pointer.\n\nReturn \`true\` if there is a cycle in the linked list. Otherwise, return \`false\`.\n\n*Note: The input format is exactly: \`n\` (size of list), \`pos\` (index where the cycle points back to, or -1 for no cycle), followed by \`n\` integers representing the linked list.*\n\n## Examples\n\n**Input:** 4 1 3 2 0 -4\n**Output:** true\n*Explanation:* n=4, pos=1. Tail connects to the node at index 1.\n\n**Input:** 2 0 1 2\n**Output:** true\n*Explanation:* Tail connects to index 0.\n\n**Input:** 1 -1 1\n**Output:** false\n\n## Constraints\n- The number of the nodes in the list is in the range [0, 10^4].\n- -10^5 <= Node.val <= 10^5\n- pos is -1 or a valid index in the linked-list.`,
    difficulty: "easy",
    testCases: [
      { input: "4 1 3 2 0 -4", expectedOutput: "true", isExample: true },
      { input: "2 0 1 2", expectedOutput: "true", isExample: true },
      { input: "1 -1 1", expectedOutput: "false", isExample: true },
      { input: "0 -1", expectedOutput: "false", isExample: false },
      { input: "3 -1 1 2 3", expectedOutput: "false", isExample: false },
      { input: "5 4 1 2 3 4 5", expectedOutput: "true", isExample: false },
      { input: "5 0 10 20 30 40 50", expectedOutput: "true", isExample: false },
      { input: "10 5 1 2 3 4 5 6 7 8 9 10", expectedOutput: "true", isExample: false },
      { input: "10 -1 1 2 3 4 5 6 7 8 9 10", expectedOutput: "false", isExample: false },
      { input: "2 1 1 2", expectedOutput: "true", isExample: false }
    ],
    starterCode: {
      python: pythonBase,
      javascript: jsBase,
      cpp: `/*\nstruct ListNode {\n    int val;\n    ListNode *next;\n    ListNode() : val(0), next(nullptr) {}\n    ListNode(int x) : val(x), next(nullptr) {}\n    ListNode(int x, ListNode *next) : val(x), next(next) {}\n};\n*/\n\nbool hasCycle(ListNode *head) {\n    // Write your solution here\n    \n}`,
    },
    driverCode: {
      python: "",
      javascript: "",
      cpp: `\n// --- Hidden Driver Code ---\nint main() {\n    int n, pos;\n    if (std::cin >> n >> pos) {\n        ListNode dummy;\n        ListNode* curr = &dummy;\n        ListNode* cycleNode = nullptr;\n        for(int i=0; i<n; i++) {\n            int val; std::cin >> val;\n            curr->next = new ListNode(val);\n            curr = curr->next;\n            if (i == pos) cycleNode = curr;\n        }\n        if (cycleNode) curr->next = cycleNode;\n        std::cout << (hasCycle(dummy.next) ? "true" : "false") << "\\n";\n    }\n    return 0;\n}`,
    },
    minElo: 0,
  },
  {
    title: "Reorder List",
    description: `# Reorder List\n\nYou are given the head of a singly linked-list. The list can be represented as:\n\n\`L0 → L1 → … → Ln - 1 → Ln\`\n\nReorder the list to be on the following form:\n\n\`L0 → Ln → L1 → Ln - 1 → L2 → Ln - 2 → …\`\n\nYou may not modify the values in the list's nodes. Only nodes themselves may be changed.\n\n*Note: The input provides exactly the number of nodes \`n\`, followed by \`n\` integers representing the linked list.*\n\n## Examples\n\n**Input:** 4 1 2 3 4\n**Output:** 1 4 2 3\n\n**Input:** 5 1 2 3 4 5\n**Output:** 1 5 2 4 3\n\n**Input:** 0\n**Output:** \n\n## Constraints\n- The number of nodes in the list is in the range [0, 5000].\n- 1 <= Node.val <= 1000`,
    difficulty: "medium",
    testCases: [
      { input: "4 1 2 3 4", expectedOutput: "1 4 2 3", isExample: true },
      { input: "5 1 2 3 4 5", expectedOutput: "1 5 2 4 3", isExample: true },
      { input: "0", expectedOutput: "", isExample: true },
      { input: "1 100", expectedOutput: "100", isExample: false },
      { input: "2 1 2", expectedOutput: "1 2", isExample: false },
      { input: "3 1 2 3", expectedOutput: "1 3 2", isExample: false },
      { input: "6 1 2 3 4 5 6", expectedOutput: "1 6 2 5 3 4", isExample: false },
      { input: "7 10 20 30 40 50 60 70", expectedOutput: "10 70 20 60 30 50 40", isExample: false },
      { input: "8 1 2 3 4 5 6 7 8", expectedOutput: "1 8 2 7 3 6 4 5", isExample: false },
      { input: "10 1 2 3 4 5 6 7 8 9 10", expectedOutput: "1 10 2 9 3 8 4 7 5 6", isExample: false }
    ],
    starterCode: {
      python: pythonBase,
      javascript: jsBase,
      cpp: `/*\nstruct ListNode {\n    int val;\n    ListNode *next;\n    ListNode() : val(0), next(nullptr) {}\n    ListNode(int x) : val(x), next(nullptr) {}\n    ListNode(int x, ListNode *next) : val(x), next(next) {}\n};\n*/\n\nvoid reorderList(ListNode* head) {\n    // Write your solution here\n    \n}`,
    },
    driverCode: {
      python: "",
      javascript: "",
      cpp: `\n// --- Hidden Driver Code ---\nListNode* buildList() {\n    int n;\n    if (!(std::cin >> n)) return nullptr;\n    ListNode dummy;\n    ListNode* curr = &dummy;\n    for(int i=0; i<n; i++) {\n        int val;\n        std::cin >> val;\n        curr->next = new ListNode(val);\n        curr = curr->next;\n    }\n    return dummy.next;\n}\nvoid printList(ListNode* head) {\n    while(head) {\n        std::cout << head->val << (head->next ? " " : "");\n        head = head->next;\n    }\n    std::cout << "\\n";\n}\nint main() {\n    ListNode* head = buildList();\n    reorderList(head);\n    printList(head);\n    return 0;\n}`,
    },
    minElo: 800,
  },
  {
    title: "Remove Nth Node From End of List",
    description: `# Remove Nth Node From End of List\n\nGiven the \`head\` of a linked list, remove the \`nth\` node from the end of the list and return its head.\n\n*Note: The input provides exactly \`n\`, followed by \`n\` integers representing the linked list. The final number is the integer \`nth\` representing the node to remove.*\n\n## Examples\n\n**Input:** 5 1 2 3 4 5 2\n**Output:** 1 2 3 5\n\n**Input:** 1 1 1\n**Output:** \n\n**Input:** 2 1 2 1\n**Output:** 1\n\n## Constraints\n- The number of nodes in the list is \`sz\`.\n- 1 <= sz <= 30\n- 0 <= Node.val <= 100\n- 1 <= nth <= sz`,
    difficulty: "medium",
    testCases: [
      { input: "5 1 2 3 4 5 2", expectedOutput: "1 2 3 5", isExample: true },
      { input: "1 1 1", expectedOutput: "", isExample: true },
      { input: "2 1 2 1", expectedOutput: "1", isExample: true },
      { input: "2 1 2 2", expectedOutput: "2", isExample: false },
      { input: "3 1 2 3 3", expectedOutput: "2 3", isExample: false },
      { input: "4 1 2 3 4 2", expectedOutput: "1 2 4", isExample: false },
      { input: "5 10 20 30 40 50 1", expectedOutput: "10 20 30 40", isExample: false },
      { input: "5 10 20 30 40 50 5", expectedOutput: "20 30 40 50", isExample: false },
      { input: "10 1 2 3 4 5 6 7 8 9 10 7", expectedOutput: "1 2 3 5 6 7 8 9 10", isExample: false },
      { input: "6 1 2 3 4 5 6 3", expectedOutput: "1 2 3 5 6", isExample: false }
    ],
    starterCode: {
      python: pythonBase,
      javascript: jsBase,
      cpp: `/*\nstruct ListNode {\n    int val;\n    ListNode *next;\n    ListNode() : val(0), next(nullptr) {}\n    ListNode(int x) : val(x), next(nullptr) {}\n    ListNode(int x, ListNode *next) : val(x), next(next) {}\n};\n*/\n\nListNode* removeNthFromEnd(ListNode* head, int n) {\n    // Write your solution here\n    \n}`,
    },
    driverCode: {
      python: "",
      javascript: "",
      cpp: `\n// --- Hidden Driver Code ---\nvoid printList(ListNode* head) {\n    while(head) {\n        std::cout << head->val << (head->next ? " " : "");\n        head = head->next;\n    }\n    std::cout << "\\n";\n}\nint main() {\n    int len;\n    if (std::cin >> len) {\n        ListNode dummy;\n        ListNode* curr = &dummy;\n        for(int i=0; i<len; i++) {\n            int val; std::cin >> val;\n            curr->next = new ListNode(val);\n            curr = curr->next;\n        }\n        int nth;\n        std::cin >> nth;\n        ListNode* res = removeNthFromEnd(dummy.next, nth);\n        printList(res);\n    }\n    return 0;\n}`,
    },
    minElo: 800,
  },
  {
    title: "Add Two Numbers",
    description: `# Add Two Numbers\n\nYou are given two **non-empty** linked lists representing two non-negative integers. The digits are stored in **reverse order**, and each of their nodes contains a single digit. Add the two numbers and return the sum as a linked list.\n\nYou may assume the two numbers do not contain any leading zero, except the number 0 itself.\n\n*Note: The input provides exactly \`n1\` (size of list 1) and \`n2\` (size of list 2), followed by the elements of list 1, then list 2.*\n\n## Examples\n\n**Input:** 3 3 2 4 3 5 6 4\n**Output:** 7 0 8\n*Explanation:* 342 + 465 = 807.\n\n**Input:** 1 1 0 0\n**Output:** 0\n\n**Input:** 7 4 9 9 9 9 9 9 9 9 9 9\n**Output:** 8 9 9 9 0 0 0 1\n\n## Constraints\n- The number of nodes in each linked list is in the range [1, 100].\n- 0 <= Node.val <= 9\n- It is guaranteed that the list represents a number that does not have leading zeros.`,
    difficulty: "medium",
    testCases: [
      { input: "3 3 2 4 3 5 6 4", expectedOutput: "7 0 8", isExample: true },
      { input: "1 1 0 0", expectedOutput: "0", isExample: true },
      { input: "7 4 9 9 9 9 9 9 9 9 9 9", expectedOutput: "8 9 9 9 0 0 0 1", isExample: true },
      { input: "2 2 1 1 1 1", expectedOutput: "2 2", isExample: false },
      { input: "1 3 5 5 5 5", expectedOutput: "0 6 5", isExample: false },
      { input: "3 1 5 5 5 5", expectedOutput: "0 6 5", isExample: false },
      { input: "3 3 9 9 9 1 0 0", expectedOutput: "0 0 0 1", isExample: false },
      { input: "4 4 1 2 3 4 5 6 7 8", expectedOutput: "6 8 0 3 1", isExample: false },
      { input: "5 5 9 9 9 9 9 9 9 9 9 9", expectedOutput: "8 9 9 9 9 1", isExample: false },
      { input: "2 5 0 1 0 9 9 9 9", expectedOutput: "0 0 0 0 0 1", isExample: false }
    ],
    starterCode: {
      python: pythonBase,
      javascript: jsBase,
      cpp: `/*\nstruct ListNode {\n    int val;\n    ListNode *next;\n    ListNode() : val(0), next(nullptr) {}\n    ListNode(int x) : val(x), next(nullptr) {}\n    ListNode(int x, ListNode *next) : val(x), next(next) {}\n};\n*/\n\nListNode* addTwoNumbers(ListNode* l1, ListNode* l2) {\n    // Write your solution here\n    \n}`,
    },
    driverCode: {
      python: "",
      javascript: "",
      cpp: `\n// --- Hidden Driver Code ---\nListNode* buildList(int n) {\n    ListNode dummy;\n    ListNode* curr = &dummy;\n    for(int i=0; i<n; i++) {\n        int val;\n        std::cin >> val;\n        curr->next = new ListNode(val);\n        curr = curr->next;\n    }\n    return dummy.next;\n}\nvoid printList(ListNode* head) {\n    while(head) {\n        std::cout << head->val << (head->next ? " " : "");\n        head = head->next;\n    }\n    std::cout << "\\n";\n}\nint main() {\n    int n1, n2;\n    if (std::cin >> n1 >> n2) {\n        ListNode* l1 = buildList(n1);\n        ListNode* l2 = buildList(n2);\n        ListNode* res = addTwoNumbers(l1, l2);\n        printList(res);\n    }\n    return 0;\n}`,
    },
    minElo: 800,
  },
  {
    title: "Valid Parenthesis String",
    description: `# Valid Parenthesis String\n\nGiven a string \`s\` containing only three types of characters: \`'('\`, \`')'\` and \`'*'\`, return \`true\` if \`s\` is **valid**.\n\nThe following rules define a **valid** string:\n- Any left parenthesis \`'('\` must have a corresponding right parenthesis \`')'\`.\n- Any right parenthesis \`')'\` must have a corresponding left parenthesis \`'('\`.\n- Left parenthesis \`'('\` must go before the corresponding right parenthesis \`')'\`.\n- \`'*'\` could be treated as a single right parenthesis \`')'\` or a single left parenthesis \`'('\` or an empty string \`""\`.\n\n## Examples\n\n**Input:** ()\n**Output:** true\n\n**Input:** (*)\n**Output:** true\n\n**Input:** (*))\n**Output:** true\n\n## Constraints\n- 1 <= s.length <= 100\n- s[i] is '(', ')' or '*'.`,
    difficulty: "medium",
    testCases: [
      { input: "()", expectedOutput: "true", isExample: true },
      { input: "(*)", expectedOutput: "true", isExample: true },
      { input: "(*))", expectedOutput: "true", isExample: true },
      { input: ")", expectedOutput: "false", isExample: false },
      { input: "*", expectedOutput: "true", isExample: false },
      { input: "(((((*(()((((*((**(((()()*)()()()*((****)*)())*)())(()(*))()))(()()())*))()*)((()(())))))()(())())(*)", expectedOutput: "false", isExample: false },
      { input: "(((******)))", expectedOutput: "true", isExample: false },
      { input: "((()))()(())(*()()())**(())()()()()((*)*))((*()*)", expectedOutput: "true", isExample: false },
      { input: "(*)(*)*)*", expectedOutput: "true", isExample: false },
      { input: "()()()()()()()()()()()()()()()()()()()()", expectedOutput: "true", isExample: false }
    ],
    starterCode: {
      python: pythonBase,
      javascript: jsBase,
      cpp: `bool checkValidString(string s) {\n    // Write your solution here\n    \n}`,
    },
    driverCode: {
      python: "",
      javascript: "",
      cpp: `\n// --- Hidden Driver Code ---\n#include <iostream>\n#include <string>\nusing namespace std;\nint main() {\n    string s;\n    if (std::cin >> s) {\n        std::cout << (checkValidString(s) ? "true" : "false") << "\\n";\n    }\n    return 0;\n}`,
    },
    minElo: 800,
  },
  {
    title: "Partition Labels",
    description: `# Partition Labels\n\nYou are given a string \`s\`. We want to partition the string into as many parts as possible so that each letter appears in at most one part.\n\nNote that the partition is done so that after concatenating all the parts in order, the resultant string should be \`s\`.\n\nReturn a list of integers representing the size of these parts.\n\n## Examples\n\n**Input:** ababcbacadefegdehijhklij\n**Output:** 9 8 8\n*Explanation:*\nThe partition is "ababcbaca", "defegde", "hijhklij".\nThis is a partition so that each letter appears in at most one part.\n\n**Input:** eccbbbbdec\n**Output:** 10\n\n## Constraints\n- 1 <= s.length <= 500\n- s consists of lowercase English letters.`,
    difficulty: "medium",
    testCases: [
      { input: "ababcbacadefegdehijhklij", expectedOutput: "9 8 8", isExample: true },
      { input: "eccbbbbdec", expectedOutput: "10", isExample: true },
      { input: "a", expectedOutput: "1", isExample: false },
      { input: "abcdefg", expectedOutput: "1 1 1 1 1 1 1", isExample: false },
      { input: "aaaaaaa", expectedOutput: "7", isExample: false },
      { input: "aba", expectedOutput: "3", isExample: false },
      { input: "abacaba", expectedOutput: "7", isExample: false },
      { input: "abcdefgf", expectedOutput: "1 1 1 1 1 3", isExample: false },
      { input: "xyzyxabcba", expectedOutput: "5 5", isExample: false },
      { input: "aaabbbccc", expectedOutput: "3 3 3", isExample: false }
    ],
    starterCode: {
      python: pythonBase,
      javascript: jsBase,
      cpp: `vector<int> partitionLabels(string s) {\n    // Write your solution here\n    \n}`,
    },
    driverCode: {
      python: "",
      javascript: "",
      cpp: `\n// --- Hidden Driver Code ---\n#include <iostream>\n#include <string>\n#include <vector>\nusing namespace std;\nint main() {\n    string s;\n    if (std::cin >> s) {\n        vector<int> res = partitionLabels(s);\n        for(int i=0; i<res.size(); i++) {\n            std::cout << res[i] << (i == res.size()-1 ? "" : " ");\n        }\n        std::cout << "\\n";\n    }\n    return 0;\n}`,
    },
    minElo: 800,
  },
  {
    title: "Hand of Straights",
    description: `# Hand of Straights\n\nAlice has some number of cards and she wants to rearrange the cards into groups so that each group is of size \`groupSize\`, and consists of \`groupSize\` consecutive cards.\n\nGiven an integer array \`hand\` where \`hand[i]\` is the value written on the \`i\`th card and an integer \`groupSize\`, return \`true\` if she can rearrange the cards, or \`false\` otherwise.\n\n*Note: The input provides the integer \`groupSize\` at the end of the array elements.*\n\n## Examples\n\n**Input:** 1 2 3 6 2 3 4 7 8 3\n**Output:** true\n*Explanation:* Alice's hand can be rearranged as [1,2,3],[2,3,4],[6,7,8]\n\n**Input:** 1 2 3 4 5 4\n**Output:** false\n*Explanation:* Alice's hand can not be rearranged into groups of 4.\n\n## Constraints\n- 1 <= hand.length <= 10^4\n- 0 <= hand[i] <= 10^9\n- 1 <= groupSize <= hand.length`,
    difficulty: "medium",
    testCases: [
      { input: "1 2 3 6 2 3 4 7 8 3", expectedOutput: "true", isExample: true },
      { input: "1 2 3 4 5 4", expectedOutput: "false", isExample: true },
      { input: "1 2 3 4 5 6 3", expectedOutput: "true", isExample: false },
      { input: "1 2 3 4 5 6 2", expectedOutput: "true", isExample: false },
      { input: "1 2 3 4 5 6 7", expectedOutput: "false", isExample: false },
      { input: "10 1000 1", expectedOutput: "true", isExample: false },
      { input: "10 11 12 11 12 13 3", expectedOutput: "true", isExample: false },
      { input: "10 11 12 11 12 13 2", expectedOutput: "false", isExample: false },
      { input: "5 5 5 5 5 1", expectedOutput: "true", isExample: false },
      { input: "5 5 5 5 5 2", expectedOutput: "false", isExample: false }
    ],
    starterCode: {
      python: pythonBase,
      javascript: jsBase,
      cpp: `bool isNStraightHand(vector<int>& hand, int groupSize) {\n    // Write your solution here\n    \n}`,
    },
    driverCode: {
      python: "",
      javascript: "",
      cpp: `\n// --- Hidden Driver Code ---\n#include <iostream>\n#include <vector>\nusing namespace std;\nint main() {\n    vector<int> nums;\n    int n;\n    while (std::cin >> n) {\n        nums.push_back(n);\n    }\n    if (nums.empty()) return 0;\n    int groupSize = nums.back();\n    nums.pop_back();\n    std::cout << (isNStraightHand(nums, groupSize) ? "true" : "false") << "\\n";\n    return 0;\n}`,
    },
    minElo: 800,
  },
  {
    title: "Merge Triplets to Form Target Triplet",
    description: `# Merge Triplets to Form Target Triplet\n\nA **triplet** is an array of three integers. You are given a 2D integer array \`triplets\`, where \`triplets[i] = [ai, bi, ci]\` describes the \`i\`th triplet. You are also given an integer array \`target = [x, y, z]\` that describes the triplet you want to obtain.\n\nTo obtain \`target\`, you may apply the following operation on \`triplets\` **any number** of times (possibly **zero**):\n- Choose two indices (0-indexed) \`i\` and \`j\` (\`i != j\`) and **update** \`triplets[j]\` to become \`[max(ai, aj), max(bi, bj), max(ci, cj)]\`.\n  - For example, if \`triplets[i] = [2, 5, 3]\` and \`triplets[j] = [1, 7, 5]\`, \`triplets[j]\` will be updated to \`[max(2, 1), max(5, 7), max(3, 5)] = [2, 7, 5]\`.\n\nReturn \`true\` if it is possible to obtain the \`target\` triplet \`[x, y, z]\` as an element of \`triplets\`, or \`false\` otherwise.\n\n*Note: The input format is exactly: \`n\` (number of triplets), followed by \`n * 3\` integers representing the \`triplets\`, followed by 3 integers representing the \`target\`.*\n\n## Examples\n\n**Input:** 4 2 5 3 1 8 4 1 7 5 3 2 5 2 7 5\n**Output:** true\n*Explanation:* \n- Update triplet 3 to [max(1,3), max(7,2), max(5,5)] = [3,7,5].\n- Update triplet 3 to [max(2,3), max(5,7), max(3,5)] = [3,7,5].\nTarget is formed.\n\n**Input:** 2 3 4 5 4 5 6 3 2 5\n**Output:** false\n\n**Input:** 2 2 5 3 2 3 4 2 7 5\n**Output:** true\n\n## Constraints\n- 1 <= triplets.length <= 10^5\n- triplets[i].length == target.length == 3\n- 1 <= ai, bi, ci, x, y, z <= 1000`,
    difficulty: "medium",
    testCases: [
      { input: "4 2 5 3 1 8 4 1 7 5 3 2 5 2 7 5", expectedOutput: "true", isExample: true },
      { input: "2 3 4 5 4 5 6 3 2 5", expectedOutput: "false", isExample: true },
      { input: "2 2 5 3 2 3 4 2 7 5", expectedOutput: "true", isExample: true },
      { input: "1 1 1 1 1 1 1", expectedOutput: "true", isExample: false },
      { input: "1 1 1 1 2 2 2", expectedOutput: "false", isExample: false },
      { input: "3 1 0 0 0 1 0 0 0 1 1 1 1", expectedOutput: "true", isExample: false },
      { input: "3 1 0 0 0 1 0 0 0 2 1 1 1", expectedOutput: "false", isExample: false },
      { input: "3 5 5 5 10 10 10 15 15 15 10 10 10", expectedOutput: "true", isExample: false },
      { input: "3 1 2 3 4 5 6 7 8 9 7 5 3", expectedOutput: "false", isExample: false },
      { input: "3 1 2 3 4 5 6 7 8 9 7 8 9", expectedOutput: "true", isExample: false }
    ],
    starterCode: {
      python: pythonBase,
      javascript: jsBase,
      cpp: `bool mergeTriplets(vector<vector<int>>& triplets, vector<int>& target) {\n    // Write your solution here\n    \n}`,
    },
    driverCode: {
      python: "",
      javascript: "",
      cpp: `\n// --- Hidden Driver Code ---\n#include <iostream>\n#include <vector>\nusing namespace std;\nint main() {\n    int n;\n    if (std::cin >> n) {\n        vector<vector<int>> triplets(n, vector<int>(3));\n        for(int i=0; i<n; i++) {\n            std::cin >> triplets[i][0] >> triplets[i][1] >> triplets[i][2];\n        }\n        vector<int> target(3);\n        std::cin >> target[0] >> target[1] >> target[2];\n        std::cout << (mergeTriplets(triplets, target) ? "true" : "false") << "\\n";\n    }\n    return 0;\n}`,
    },
    minElo: 800,
  }
];
