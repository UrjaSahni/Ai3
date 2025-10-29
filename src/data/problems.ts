export interface Problem {
  id: string;
  title: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  description: string;
  constraints: string[];
  examples: {
    input: string;
    output: string;
    explanation: string;
  }[];
  starterCode: {
    java: string;
    python: string;
    cpp: string;
  };
}

export const problems: Problem[] = [
  {
    id: 'P1',
    title: 'Two Sum',
    difficulty: 'Easy',
    description: 'Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target. You may assume that each input would have exactly one solution, and you may not use the same element twice. You can return the answer in any order.',
    constraints: [
      '2 ≤ nums.length ≤ 10⁴',
      '-10⁹ ≤ nums[i] ≤ 10⁹',
      '-10⁹ ≤ target ≤ 10⁹',
      'Only one valid answer exists.',
    ],
    examples: [
      {
        input: 'nums = [2,7,11,15], target = 9',
        output: '[0,1]',
        explanation: 'Because nums[0] + nums[1] == 9, we return [0, 1].',
      },
      {
        input: 'nums = [3,2,4], target = 6',
        output: '[1,2]',
        explanation: 'Because nums[1] + nums[2] == 6, we return [1, 2].',
      },
    ],
    starterCode: {
      java: `class Solution {
    public int[] twoSum(int[] nums, int target) {
        // Write your code here
        
    }
}`,
      python: `def twoSum(nums, target):
    # Write your code here
    pass`,
      cpp: `class Solution {
public:
    vector<int> twoSum(vector<int>& nums, int target) {
        // Write your code here
        
    }
};`,
    },
  },
  {
    id: 'P2',
    title: 'Valid Parentheses',
    difficulty: 'Easy',
    description: 'Given a string s containing just the characters \'(\', \')\', \'{\', \'}\', \'[\' and \']\', determine if the input string is valid. An input string is valid if: Open brackets must be closed by the same type of brackets. Open brackets must be closed in the correct order. Every close bracket has a corresponding open bracket of the same type.',
    constraints: [
      '1 ≤ s.length ≤ 10⁴',
      's consists of parentheses only \'()[]{}\'.',
    ],
    examples: [
      {
        input: 's = "()"',
        output: 'true',
        explanation: 'The string contains valid matching parentheses.',
      },
      {
        input: 's = "()[]{}"',
        output: 'true',
        explanation: 'All brackets are properly matched and nested.',
      },
      {
        input: 's = "(]"',
        output: 'false',
        explanation: 'Brackets are not of the same type.',
      },
    ],
    starterCode: {
      java: `class Solution {
    public boolean isValid(String s) {
        // Write your code here
        
    }
}`,
      python: `def isValid(s):
    # Write your code here
    pass`,
      cpp: `class Solution {
public:
    bool isValid(string s) {
        // Write your code here
        
    }
};`,
    },
  },
  {
    id: 'P3',
    title: 'Longest Substring Without Repeating Characters',
    difficulty: 'Medium',
    description: 'Given a string s, find the length of the longest substring without repeating characters. A substring is a contiguous non-empty sequence of characters within a string.',
    constraints: [
      '0 ≤ s.length ≤ 5 × 10⁴',
      's consists of English letters, digits, symbols and spaces.',
    ],
    examples: [
      {
        input: 's = "abcabcbb"',
        output: '3',
        explanation: 'The answer is "abc", with the length of 3.',
      },
      {
        input: 's = "bbbbb"',
        output: '1',
        explanation: 'The answer is "b", with the length of 1.',
      },
      {
        input: 's = "pwwkew"',
        output: '3',
        explanation: 'The answer is "wke", with the length of 3. Notice that "pwke" is a subsequence and not a substring.',
      },
    ],
    starterCode: {
      java: `class Solution {
    public int lengthOfLongestSubstring(String s) {
        // Write your code here
        
    }
}`,
      python: `def lengthOfLongestSubstring(s):
    # Write your code here
    pass`,
      cpp: `class Solution {
public:
    int lengthOfLongestSubstring(string s) {
        // Write your code here
        
    }
};`,
    },
  },
  {
    id: 'P4',
    title: 'Merge Two Sorted Lists',
    difficulty: 'Easy',
    description: 'You are given the heads of two sorted linked lists list1 and list2. Merge the two lists into one sorted list. The list should be made by splicing together the nodes of the first two lists. Return the head of the merged linked list.',
    constraints: [
      'The number of nodes in both lists is in the range [0, 50].',
      '-100 ≤ Node.val ≤ 100',
      'Both list1 and list2 are sorted in non-decreasing order.',
    ],
    examples: [
      {
        input: 'list1 = [1,2,4], list2 = [1,3,4]',
        output: '[1,1,2,3,4,4]',
        explanation: 'Merging the two sorted lists results in [1,1,2,3,4,4].',
      },
      {
        input: 'list1 = [], list2 = []',
        output: '[]',
        explanation: 'Both lists are empty.',
      },
    ],
    starterCode: {
      java: `class Solution {
    public ListNode mergeTwoLists(ListNode list1, ListNode list2) {
        // Write your code here
        
    }
}`,
      python: `def mergeTwoLists(list1, list2):
    # Write your code here
    pass`,
      cpp: `class Solution {
public:
    ListNode* mergeTwoLists(ListNode* list1, ListNode* list2) {
        // Write your code here
        
    }
};`,
    },
  },
  {
    id: 'P5',
    title: 'Container With Most Water',
    difficulty: 'Medium',
    description: 'You are given an integer array height of length n. There are n vertical lines drawn such that the two endpoints of the ith line are (i, 0) and (i, height[i]). Find two lines that together with the x-axis form a container, such that the container contains the most water. Return the maximum amount of water a container can store.',
    constraints: [
      'n == height.length',
      '2 ≤ n ≤ 10⁵',
      '0 ≤ height[i] ≤ 10⁴',
    ],
    examples: [
      {
        input: 'height = [1,8,6,2,5,4,8,3,7]',
        output: '49',
        explanation: 'The above vertical lines are represented by array [1,8,6,2,5,4,8,3,7]. In this case, the max area of water the container can contain is 49.',
      },
      {
        input: 'height = [1,1]',
        output: '1',
        explanation: 'The maximum area is 1.',
      },
    ],
    starterCode: {
      java: `class Solution {
    public int maxArea(int[] height) {
        // Write your code here
        
    }
}`,
      python: `def maxArea(height):
    # Write your code here
    pass`,
      cpp: `class Solution {
public:
    int maxArea(vector<int>& height) {
        // Write your code here
        
    }
};`,
    },
  },
  {
    id: 'P6',
    title: 'Median of Two Sorted Arrays',
    difficulty: 'Hard',
    description: 'Given two sorted arrays nums1 and nums2 of size m and n respectively, return the median of the two sorted arrays. The overall run time complexity should be O(log (m+n)).',
    constraints: [
      'nums1.length == m',
      'nums2.length == n',
      '0 ≤ m ≤ 1000',
      '0 ≤ n ≤ 1000',
      '1 ≤ m + n ≤ 2000',
      '-10⁶ ≤ nums1[i], nums2[i] ≤ 10⁶',
    ],
    examples: [
      {
        input: 'nums1 = [1,3], nums2 = [2]',
        output: '2.00000',
        explanation: 'merged array = [1,2,3] and median is 2.',
      },
      {
        input: 'nums1 = [1,2], nums2 = [3,4]',
        output: '2.50000',
        explanation: 'merged array = [1,2,3,4] and median is (2 + 3) / 2 = 2.5.',
      },
    ],
    starterCode: {
      java: `class Solution {
    public double findMedianSortedArrays(int[] nums1, int[] nums2) {
        // Write your code here
        
    }
}`,
      python: `def findMedianSortedArrays(nums1, nums2):
    # Write your code here
    pass`,
      cpp: `class Solution {
public:
    double findMedianSortedArrays(vector<int>& nums1, vector<int>& nums2) {
        // Write your code here
        
    }
};`,
    },
  },
];
