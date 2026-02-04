import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  BookOpen, 
  Play, 
  Target,
  TrendingUp,
  CheckCircle,
  X,
  ArrowRight,
  FileText,
  Award,
  AlertTriangle,
  Brain,
  BarChart3,
  Users,
  Clock,
  Code
} from 'lucide-react'

interface Question {
  id: string
  question: string
  options: string[]
  correctAnswer: string
  explanation?: string
}

interface QuestionBank {
  [category: string]: {
    [difficulty: string]: Question[]
  }
}

interface QuestionAttempt {
  questionId: string
  isCorrect: boolean
  difficulty: string
  attempts: number
}

interface AssessmentReport {
  totalQuestions: number
  correctAnswers: number
  accuracy: number
  strongAreas: string[]
  weakAreas: string[]
  recommendations: string[]
  difficultyBreakdown: {
    easy: { correct: number; total: number }
    medium: { correct: number; total: number }
    hard: { correct: number; total: number }
  }
}

interface MockInterviewQuestion {
  id: string
  title: string
  difficulty: 'easy' | 'medium' | 'hard'
  timeLimit: number // in minutes
  description: string
  examples: string[]
  constraints: string[]
  hints: string[]
}

const questionBank: QuestionBank = {
  'JavaScript Fundamentals': {
    easy: [
      {
        id: 'js_easy_1',
        question: 'What is the output?\nconsole.log(typeof null)',
        options: ['"null"', '"object"', '"undefined"', 'Error'],
        correctAnswer: 'B'
      },
      {
        id: 'js_easy_2',
        question: 'Which keyword creates a block scoped variable?',
        options: ['var', 'let', 'const', 'Both B and C'],
        correctAnswer: 'D'
      },
      {
        id: 'js_easy_3',
        question: 'Which method converts JSON string → object?',
        options: ['JSON.stringify()', 'JSON.parse()', 'JSON.object()', 'JSON.toObject()'],
        correctAnswer: 'B'
      }
    ],
    medium: [
      {
        id: 'js_med_1',
        question: 'Output?\nlet a = [1,2,3]\nlet b = a\nb.push(4)\nconsole.log(a)',
        options: ['[1,2,3]', '[1,2,3,4]', 'Error', 'undefined'],
        correctAnswer: 'B'
      },
      {
        id: 'js_med_2',
        question: 'Which is true about arrow functions?',
        options: ['Have their own this', 'Bind this from surrounding scope', 'Cannot return values', 'Only used in React'],
        correctAnswer: 'B'
      },
      {
        id: 'js_med_3',
        question: 'Event loop puts promises in?',
        options: ['Call Stack', 'Callback Queue', 'Microtask Queue', 'Heap'],
        correctAnswer: 'C'
      }
    ],
    hard: [
      {
        id: 'js_hard_1',
        question: 'What happens?\nconsole.log(x)\nvar x = 5',
        options: ['5', 'undefined', 'ReferenceError', 'null'],
        correctAnswer: 'B'
      },
      {
        id: 'js_hard_2',
        question: 'Closures allow functions to:',
        options: ['Access DOM', 'Access parent scope after execution', 'Improve performance', 'Prevent memory leaks'],
        correctAnswer: 'B'
      }
    ]
  },
  'React Development': {
    easy: [
      {
        id: 'react_easy_1',
        question: 'React is mainly for?',
        options: ['Backend', 'Database', 'UI building', 'Testing'],
        correctAnswer: 'C'
      },
      {
        id: 'react_easy_2',
        question: 'Which hook manages state?',
        options: ['useEffect', 'useState', 'useRef', 'useMemo'],
        correctAnswer: 'B'
      }
    ],
    medium: [
      {
        id: 'react_med_1',
        question: 'useEffect without dependency array runs:',
        options: ['Once', 'On mount + unmount', 'On every render', 'Never'],
        correctAnswer: 'C'
      },
      {
        id: 'react_med_2',
        question: 'Keys in lists help React:',
        options: ['Improve CSS', 'Identify elements for reconciliation', 'Prevent errors', 'Speed API calls'],
        correctAnswer: 'B'
      },
      {
        id: 'react_med_3',
        question: 'Controlled component means:',
        options: ['DOM handles state', 'React state controls input', 'No state', 'Stateless component'],
        correctAnswer: 'B'
      }
    ],
    hard: [
      {
        id: 'react_hard_1',
        question: 'Which avoids unnecessary re-renders?',
        options: ['useEffect', 'useRef', 'React.memo', 'useState'],
        correctAnswer: 'C'
      },
      {
        id: 'react_hard_2',
        question: 'useMemo is used for:',
        options: ['Styling', 'Memoizing expensive calculations', 'Routing', 'API calls'],
        correctAnswer: 'B'
      }
    ]
  },
  'Data Structures & Algorithms': {
    easy: [
      {
        id: 'dsa_easy_1',
        question: 'Stack follows:',
        options: ['FIFO', 'LIFO', 'Random', 'Priority'],
        correctAnswer: 'B'
      },
      {
        id: 'dsa_easy_2',
        question: 'Time complexity of binary search?',
        options: ['O(n)', 'O(log n)', 'O(n log n)', 'O(1)'],
        correctAnswer: 'B'
      }
    ],
    medium: [
      {
        id: 'dsa_med_1',
        question: 'Which structure uses hashing?',
        options: ['Stack', 'Queue', 'HashMap', 'Tree'],
        correctAnswer: 'C'
      },
      {
        id: 'dsa_med_2',
        question: 'BFS uses:',
        options: ['Stack', 'Queue', 'Recursion', 'Heap'],
        correctAnswer: 'B'
      },
      {
        id: 'dsa_med_3',
        question: 'Worst case of QuickSort:',
        options: ['O(log n)', 'O(n)', 'O(n log n)', 'O(n²)'],
        correctAnswer: 'D'
      }
    ],
    hard: [
      {
        id: 'dsa_hard_1',
        question: 'Detect cycle in linked list uses:',
        options: ['Sorting', 'Hashing only', "Floyd's Cycle Detection", 'Binary Search'],
        correctAnswer: 'C'
      },
      {
        id: 'dsa_hard_2',
        question: 'Dijkstra fails with:',
        options: ['Directed graphs', 'Cycles', 'Negative weights', 'Trees'],
        correctAnswer: 'C'
      }
    ]
  },
  'System Design': {
    easy: [
      {
        id: 'sys_easy_1',
        question: 'Load balancer does:',
        options: ['Stores data', 'Distributes traffic', 'Encrypts data', 'Caches data'],
        correctAnswer: 'B'
      },
      {
        id: 'sys_easy_2',
        question: 'Cache improves:',
        options: ['Security', 'Latency', 'Storage', 'Code quality'],
        correctAnswer: 'B'
      }
    ],
    medium: [
      {
        id: 'sys_med_1',
        question: 'CAP theorem: pick any 2 of 3. C stands for:',
        options: ['Control', 'Consistency', 'Capacity', 'Cache'],
        correctAnswer: 'B'
      },
      {
        id: 'sys_med_2',
        question: 'Horizontal scaling means:',
        options: ['Bigger server', 'More servers', 'Faster CPU', 'Less traffic'],
        correctAnswer: 'B'
      }
    ],
    hard: [
      {
        id: 'sys_hard_1',
        question: 'Database sharding helps with:',
        options: ['Security', 'Partitioning data for scale', 'UI', 'Logging'],
        correctAnswer: 'B'
      },
      {
        id: 'sys_hard_2',
        question: 'Eventual consistency means:',
        options: ['Always same data', 'Data becomes consistent over time', 'No replication', 'Strong consistency'],
        correctAnswer: 'B'
      }
    ]
  }
}

const mockInterviewQuestions: { [key in Difficulty]: MockInterviewQuestion[] } = {
  easy: [
    {
      id: 'two_sum',
      title: 'Two Sum',
      difficulty: 'easy',
      timeLimit: 15,
      description: 'Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.',
      examples: [
        'Input: nums = [2,7,11,15], target = 9\nOutput: [0,1]\nExplanation: Because nums[0] + nums[1] == 9, we return [0, 1].'
      ],
      constraints: [
        '2 <= nums.length <= 10^4',
        '-10^9 <= nums[i] <= 10^9',
        '-10^9 <= target <= 10^9',
        'Only one valid answer exists.'
      ],
      hints: [
        'Try using a hash map to store numbers you\'ve seen',
        'For each number, check if target - number exists in the map'
      ]
    },
    {
      id: 'valid_parentheses',
      title: 'Valid Parentheses',
      difficulty: 'easy',
      timeLimit: 15,
      description: 'Given a string s containing just the characters \'(\', \')\', \'{\', \'}\', \'[\' and \']\', determine if the input string is valid.',
      examples: [
        'Input: s = "()"\nOutput: true',
        'Input: s = "()[]{}\nOutput: true',
        'Input: s = "(]"\nOutput: false'
      ],
      constraints: [
        '1 <= s.length <= 10^4',
        's consists of parentheses only \'()[]{}\''
      ],
      hints: [
        'Use a stack data structure',
        'Push opening brackets, pop and match closing brackets'
      ]
    },
    {
      id: 'merge_sorted_lists',
      title: 'Merge Two Sorted Lists',
      difficulty: 'easy',
      timeLimit: 15,
      description: 'You are given the heads of two sorted linked lists list1 and list2. Merge the two lists in a one sorted list.',
      examples: [
        'Input: list1 = [1,2,4], list2 = [1,3,4]\nOutput: [1,1,2,3,4,4]'
      ],
      constraints: [
        'The number of nodes in both lists is in the range [0, 50]',
        '-100 <= Node.val <= 100',
        'Both list1 and list2 are sorted in non-decreasing order'
      ],
      hints: [
        'Use two pointers to compare values',
        'Create a dummy head for easier implementation'
      ]
    }
  ],
  medium: [
    {
      id: 'longest_substring',
      title: 'Longest Substring Without Repeating Characters',
      difficulty: 'medium',
      timeLimit: 25,
      description: 'Given a string s, find the length of the longest substring without repeating characters.',
      examples: [
        'Input: s = "abcabcbb"\nOutput: 3\nExplanation: The answer is "abc", with the length of 3.',
        'Input: s = "bbbbb"\nOutput: 1\nExplanation: The answer is "b", with the length of 1.'
      ],
      constraints: [
        '0 <= s.length <= 5 * 10^4',
        's consists of English letters, digits, symbols and spaces'
      ],
      hints: [
        'Use sliding window technique',
        'Keep track of characters with a hash set or map'
      ]
    },
    {
      id: 'level_order_traversal',
      title: 'Binary Tree Level Order Traversal',
      difficulty: 'medium',
      timeLimit: 25,
      description: 'Given the root of a binary tree, return the level order traversal of its nodes\' values (i.e., from left to right, level by level).',
      examples: [
        'Input: root = [3,9,20,null,null,15,7]\nOutput: [[3],[9,20],[15,7]]'
      ],
      constraints: [
        'The number of nodes in the tree is in the range [0, 2000]',
        '-1000 <= Node.val <= 1000'
      ],
      hints: [
        'Use BFS with a queue',
        'Process nodes level by level'
      ]
    },
    {
      id: 'search_rotated_array',
      title: 'Search in Rotated Sorted Array',
      difficulty: 'medium',
      timeLimit: 25,
      description: 'There is an integer array nums sorted in ascending order (with distinct values). Given the array nums after the possible rotation and an integer target, return the index of target if it is in nums, or -1 if it is not in nums.',
      examples: [
        'Input: nums = [4,5,6,7,0,1,2], target = 0\nOutput: 4',
        'Input: nums = [4,5,6,7,0,1,2], target = 3\nOutput: -1'
      ],
      constraints: [
        '1 <= nums.length <= 5000',
        '-10^4 <= nums[i] <= 10^4',
        'All values of nums are unique'
      ],
      hints: [
        'Use binary search with modifications',
        'Determine which half is sorted first'
      ]
    }
  ],
  hard: [
    {
      id: 'lru_cache',
      title: 'LRU Cache',
      difficulty: 'hard',
      timeLimit: 40,
      description: 'Design a data structure that follows the constraints of a Least Recently Used (LRU) cache.',
      examples: [
        'LRUCache lRUCache = new LRUCache(2);\nlRUCache.put(1, 1);\nlRUCache.put(2, 2);\nlRUCache.get(1);    // return 1\nlRUCache.put(3, 3); // evicts key 2\nlRUCache.get(2);    // returns -1 (not found)'
      ],
      constraints: [
        '1 <= capacity <= 3000',
        '0 <= key <= 10^4',
        '0 <= value <= 10^5',
        'At most 2 * 10^5 calls will be made to get and put'
      ],
      hints: [
        'Use doubly linked list + hash map',
        'Hash map for O(1) access, linked list for O(1) insertion/deletion'
      ]
    },
    {
      id: 'median_two_arrays',
      title: 'Median of Two Sorted Arrays',
      difficulty: 'hard',
      timeLimit: 40,
      description: 'Given two sorted arrays nums1 and nums2 of size m and n respectively, return the median of the two sorted arrays.',
      examples: [
        'Input: nums1 = [1,3], nums2 = [2]\nOutput: 2.00000\nExplanation: merged array = [1,2,3] and median is 2.',
        'Input: nums1 = [1,2], nums2 = [3,4]\nOutput: 2.50000\nExplanation: merged array = [1,2,3,4] and median is (2 + 3) / 2 = 2.5.'
      ],
      constraints: [
        'nums1.length == m',
        'nums2.length == n',
        '0 <= m <= 1000',
        '0 <= n <= 1000',
        '1 <= m + n <= 2000'
      ],
      hints: [
        'Use binary search on the smaller array',
        'Find the correct partition point'
      ]
    },
    {
      id: 'trapping_rain_water',
      title: 'Trapping Rain Water',
      difficulty: 'hard',
      timeLimit: 40,
      description: 'Given n non-negative integers representing an elevation map where the width of each bar is 1, compute how much water it can trap after raining.',
      examples: [
        'Input: height = [0,1,0,2,1,0,1,3,2,1,2,1]\nOutput: 6\nExplanation: The above elevation map is represented by array [0,1,0,2,1,0,1,3,2,1,2,1]. In this case, 6 units of rain water are being trapped.'
      ],
      constraints: [
        'n == height.length',
        '1 <= n <= 2 * 10^4',
        '0 <= height[i] <= 3 * 10^4'
      ],
      hints: [
        'Use two pointers approach',
        'Keep track of max height from left and right'
      ]
    }
  ]
}

type Difficulty = 'easy' | 'medium' | 'hard'
type Category = keyof typeof questionBank

export function StudyBuddy() {
  const [currentStep, setCurrentStep] = useState<'setup' | 'practice' | 'report' | 'mock-interview' | 'mock-setup'>('setup')
  const [sessionType, setSessionType] = useState<'practice' | 'mock-interview'>('practice')
  const [selectedCategory, setSelectedCategory] = useState<Category | ''>('')
  const [selectedDifficulty, setSelectedDifficulty] = useState<Difficulty>('easy')
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null)
  const [currentMockQuestion, setCurrentMockQuestion] = useState<MockInterviewQuestion | null>(null)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState('')
  const [showResult, setShowResult] = useState(false)
  const [score, setScore] = useState({ correct: 0, total: 0 })
  const [adaptiveDifficulty, setAdaptiveDifficulty] = useState<Difficulty>('easy')
  const [consecutiveCorrect, setConsecutiveCorrect] = useState(0)
  const [questionAttempts, setQuestionAttempts] = useState<QuestionAttempt[]>([])
  const [assessmentReport, setAssessmentReport] = useState<AssessmentReport | null>(null)
  const [timeRemaining, setTimeRemaining] = useState<number>(0)
  const [userCode, setUserCode] = useState<string>('')

  const categories: Category[] = Object.keys(questionBank) as Category[]
  const difficulties: { value: Difficulty; label: string; color: string }[] = [
    { value: 'easy', label: 'Easy', color: 'bg-green-500' },
    { value: 'medium', label: 'Medium', color: 'bg-yellow-500' },
    { value: 'hard', label: 'Hard', color: 'bg-red-500' }
  ]

  const getCategoryIcon = (category: string | Category) => {
    switch (category) {
      case 'JavaScript Fundamentals': return '🟡'
      case 'React Development': return '⚛️'
      case 'Data Structures & Algorithms': return '🧠'
      case 'System Design': return '🏗️'
      default: return '📚'
    }
  }

  const startPractice = () => {
    if (!selectedCategory || selectedCategory === '') return
    
    setAdaptiveDifficulty(selectedDifficulty)
    const questions = questionBank[selectedCategory as Category][selectedDifficulty]
    if (questions.length > 0) {
      setCurrentQuestion(questions[0])
      setCurrentQuestionIndex(0)
      setCurrentStep('practice')
      setScore({ correct: 0, total: 0 })
      setConsecutiveCorrect(0)
      setQuestionAttempts([])
      setAssessmentReport(null)
    }
  }

  // Check if all questions in the category have been answered correctly at least once
  const checkAllQuestionsAnswered = () => {
    if (!selectedCategory || selectedCategory === '') return false
    
    const allQuestions = [
      ...questionBank[selectedCategory as Category].easy,
      ...questionBank[selectedCategory as Category].medium,
      ...questionBank[selectedCategory as Category].hard
    ]
    
    const correctlyAnsweredQuestions = questionAttempts
      .filter(attempt => attempt.isCorrect)
      .map(attempt => attempt.questionId)
    
    return allQuestions.every(q => correctlyAnsweredQuestions.includes(q.id))
  }

  // Generate assessment report
  const generateReport = (): AssessmentReport => {
    if (!selectedCategory || selectedCategory === '') {
      return {
        totalQuestions: 0,
        correctAnswers: 0,
        accuracy: 0,
        strongAreas: [],
        weakAreas: [],
        recommendations: [],
        difficultyBreakdown: {
          easy: { correct: 0, total: 0 },
          medium: { correct: 0, total: 0 },
          hard: { correct: 0, total: 0 }
        }
      }
    }

    const difficultyBreakdown = {
      easy: { correct: 0, total: 0 },
      medium: { correct: 0, total: 0 },
      hard: { correct: 0, total: 0 }
    }

    // Calculate difficulty breakdown
    questionAttempts.forEach(attempt => {
      const difficulty = attempt.difficulty as keyof typeof difficultyBreakdown
      difficultyBreakdown[difficulty].total++
      if (attempt.isCorrect) {
        difficultyBreakdown[difficulty].correct++
      }
    })

    const totalQuestions = questionAttempts.length
    const correctAnswers = questionAttempts.filter(a => a.isCorrect).length
    const accuracy = totalQuestions > 0 ? (correctAnswers / totalQuestions) * 100 : 0

    // Determine strong and weak areas
    const strongAreas: string[] = []
    const weakAreas: string[] = []
    const recommendations: string[] = []

    Object.entries(difficultyBreakdown).forEach(([difficulty, stats]) => {
      if (stats.total > 0) {
        const difficultyAccuracy = (stats.correct / stats.total) * 100
        if (difficultyAccuracy >= 80) {
          strongAreas.push(`${difficulty.charAt(0).toUpperCase() + difficulty.slice(1)} level questions`)
        } else if (difficultyAccuracy < 60) {
          weakAreas.push(`${difficulty.charAt(0).toUpperCase() + difficulty.slice(1)} level questions`)
        }
      }
    })

    // Generate recommendations based on performance
    if (accuracy >= 90) {
      recommendations.push("Excellent performance! Consider exploring advanced topics in this area.")
      recommendations.push("You're ready to tackle real-world projects and challenges.")
    } else if (accuracy >= 70) {
      recommendations.push("Good foundation! Focus on practicing more complex scenarios.")
      recommendations.push("Review concepts where you made mistakes and try similar problems.")
    } else if (accuracy >= 50) {
      recommendations.push("You have basic understanding. Spend more time on fundamentals.")
      recommendations.push("Practice regularly and review core concepts before moving to advanced topics.")
    } else {
      recommendations.push("Focus on building strong fundamentals in this area.")
      recommendations.push("Consider reviewing basic concepts and practicing easier questions first.")
    }

    // Category-specific recommendations
    const categoryName = selectedCategory as Category
    if (categoryName === 'JavaScript Fundamentals') {
      if (weakAreas.length > 0) {
        recommendations.push("Practice JavaScript basics: variables, functions, and data types.")
        recommendations.push("Use browser console to experiment with code snippets.")
      }
    } else if (categoryName === 'React Development') {
      if (weakAreas.length > 0) {
        recommendations.push("Build small React projects to understand component lifecycle.")
        recommendations.push("Practice with hooks and state management patterns.")
      }
    } else if (categoryName === 'Data Structures & Algorithms') {
      if (weakAreas.length > 0) {
        recommendations.push("Implement data structures from scratch to understand them better.")
        recommendations.push("Practice algorithm problems on coding platforms like LeetCode.")
      }
    } else if (categoryName === 'System Design') {
      if (weakAreas.length > 0) {
        recommendations.push("Study real-world system architectures and case studies.")
        recommendations.push("Practice designing systems for different scale requirements.")
      }
    }

    return {
      totalQuestions,
      correctAnswers,
      accuracy,
      strongAreas,
      weakAreas,
      recommendations,
      difficultyBreakdown
    }
  }

  const endAssessment = () => {
    const report = generateReport()
    setAssessmentReport(report)
    setCurrentStep('report')
  }

  // Auto-end assessment if all questions answered correctly
  useEffect(() => {
    if (currentStep === 'practice' && checkAllQuestionsAnswered()) {
      setTimeout(() => {
        endAssessment()
      }, 2000) // Small delay to show the last result
    }
  }, [questionAttempts, currentStep])

  // Mock Interview Functions
  const startMockInterview = () => {
    const questions = mockInterviewQuestions[selectedDifficulty]
    if (questions.length > 0) {
      setCurrentMockQuestion(questions[0])
      setCurrentQuestionIndex(0)
      setCurrentStep('mock-interview')
      setTimeRemaining(questions[0].timeLimit * 60) // Convert minutes to seconds
      setUserCode('// Write your solution here\nfunction solution() {\n    \n}')
    }
  }

  const nextMockQuestion = () => {
    const questions = mockInterviewQuestions[selectedDifficulty]
    const nextIndex = currentQuestionIndex + 1
    
    if (nextIndex < questions.length) {
      setCurrentMockQuestion(questions[nextIndex])
      setCurrentQuestionIndex(nextIndex)
      setTimeRemaining(questions[nextIndex].timeLimit * 60)
      setUserCode('// Write your solution here\nfunction solution() {\n    \n}')
    } else {
      // Interview complete
      setCurrentStep('setup')
      alert('Mock Interview Complete! Great job practicing these coding problems.')
    }
  }

  const resetToSetup = () => {
    setCurrentStep('setup')
    setSessionType('practice')
    setCurrentQuestion(null)
    setCurrentMockQuestion(null)
    setSelectedAnswer('')
    setShowResult(false)
    setScore({ correct: 0, total: 0 })
    setConsecutiveCorrect(0)
    setQuestionAttempts([])
    setAssessmentReport(null)
    setTimeRemaining(0)
    setUserCode('')
  }

  // Timer for mock interview
  useEffect(() => {
    let interval: number | null = null
    
    if (currentStep === 'mock-interview' && timeRemaining > 0) {
      interval = window.setInterval(() => {
        setTimeRemaining(time => {
          if (time <= 1) {
            // Time's up, move to next question
            setTimeout(() => nextMockQuestion(), 1000)
            return 0
          }
          return time - 1
        })
      }, 1000)
    }
    
    return () => {
      if (interval) clearInterval(interval)
    }
  }, [currentStep, timeRemaining])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const handleAnswerSelect = (answer: string) => {
    setSelectedAnswer(answer)
  }

  const submitAnswer = () => {
    if (!currentQuestion || !selectedAnswer) return

    const isCorrect = selectedAnswer === currentQuestion.correctAnswer
    const newScore = {
      correct: score.correct + (isCorrect ? 1 : 0),
      total: score.total + 1
    }
    setScore(newScore)

    // Record the attempt
    const attempt: QuestionAttempt = {
      questionId: currentQuestion.id,
      isCorrect,
      difficulty: adaptiveDifficulty,
      attempts: 1
    }
    
    setQuestionAttempts(prev => [...prev, attempt])

    // Adaptive difficulty logic
    if (isCorrect) {
      const newConsecutive = consecutiveCorrect + 1
      setConsecutiveCorrect(newConsecutive)
      
      // Increase difficulty after 2 consecutive correct answers
      if (newConsecutive >= 2 && adaptiveDifficulty === 'easy') {
        setAdaptiveDifficulty('medium')
        setConsecutiveCorrect(0)
      } else if (newConsecutive >= 2 && adaptiveDifficulty === 'medium') {
        setAdaptiveDifficulty('hard')
        setConsecutiveCorrect(0)
      }
    } else {
      setConsecutiveCorrect(0)
      // Decrease difficulty after wrong answer
      if (adaptiveDifficulty === 'hard') {
        setAdaptiveDifficulty('medium')
      } else if (adaptiveDifficulty === 'medium') {
        setAdaptiveDifficulty('easy')
      }
    }

    setShowResult(true)
  }

  const nextQuestion = () => {
    if (!selectedCategory || selectedCategory === '') return

    const questions = questionBank[selectedCategory as Category][adaptiveDifficulty]
    const nextIndex = (currentQuestionIndex + 1) % questions.length
    
    setCurrentQuestion(questions[nextIndex])
    setCurrentQuestionIndex(nextIndex)
    setSelectedAnswer('')
    setShowResult(false)
  }

  const resetPractice = () => {
    setCurrentStep('setup')
    setCurrentQuestion(null)
    setSelectedAnswer('')
    setShowResult(false)
    setScore({ correct: 0, total: 0 })
    setConsecutiveCorrect(0)
    setQuestionAttempts([])
    setAssessmentReport(null)
  }

  // Mock Interview Component
  if (currentStep === 'mock-interview' && currentMockQuestion) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 py-8">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-50 to-blue-50 p-6 rounded-2xl border border-purple-100">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold" style={{ color: '#000000' }}>
                <Users className="inline w-6 h-6 mr-2" />
                Mock Interview
              </h1>
              <p className="text-gray-600">
                Difficulty: <Badge className={`${difficulties.find(d => d.value === selectedDifficulty)?.color} text-white`}>
                  {selectedDifficulty.charAt(0).toUpperCase() + selectedDifficulty.slice(1)}
                </Badge>
              </p>
            </div>
            <div className="text-right">
              <div className={`text-2xl font-bold ${timeRemaining <= 60 ? 'text-red-600' : 'text-blue-600'}`}>
                <Clock className="inline w-5 h-5 mr-1" />
                {formatTime(timeRemaining)}
              </div>
              <div className="text-sm text-gray-600">Time Remaining</div>
            </div>
          </div>
        </div>

        {/* Split Screen Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-[calc(100vh-300px)]">
          {/* Left Side - Problem Description */}
          <Card className="bg-white shadow-lg rounded-xl border border-gray-200 overflow-hidden">
            <CardHeader className="bg-gray-50 border-b">
              <CardTitle className="text-xl flex items-center space-x-2" style={{ color: '#000000' }}>
                <Code className="w-6 h-6" />
                <span>{currentMockQuestion.title}</span>
                <Badge className={`${difficulties.find(d => d.value === currentMockQuestion.difficulty)?.color} text-white`}>
                  {currentMockQuestion.difficulty.charAt(0).toUpperCase() + currentMockQuestion.difficulty.slice(1)}
                </Badge>
              </CardTitle>
              <CardDescription>
                Question {currentQuestionIndex + 1} of {mockInterviewQuestions[selectedDifficulty].length} • 
                Time Limit: {currentMockQuestion.timeLimit} minutes
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6 overflow-y-auto h-full space-y-4">
              {/* Problem Description */}
              <div className="p-4 bg-gray-50 rounded-lg">
                <h3 className="font-semibold mb-2" style={{ color: '#000000' }}>Problem Description</h3>
                <p className="text-gray-700">{currentMockQuestion.description}</p>
              </div>

              {/* Examples */}
              <div className="space-y-3">
                <h3 className="font-semibold" style={{ color: '#000000' }}>Examples</h3>
                {currentMockQuestion.examples.map((example, index) => (
                  <div key={index} className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                    <pre className="text-sm text-gray-800 whitespace-pre-wrap font-mono">{example}</pre>
                  </div>
                ))}
              </div>

              {/* Constraints */}
              <div className="space-y-2">
                <h3 className="font-semibold" style={{ color: '#000000' }}>Constraints</h3>
                <ul className="list-disc list-inside space-y-1">
                  {currentMockQuestion.constraints.map((constraint, index) => (
                    <li key={index} className="text-sm text-gray-700">{constraint}</li>
                  ))}
                </ul>
              </div>

              {/* Hints */}
              <div className="space-y-2">
                <h3 className="font-semibold" style={{ color: '#000000' }}>Hints</h3>
                <ul className="list-disc list-inside space-y-1">
                  {currentMockQuestion.hints.map((hint, index) => (
                    <li key={index} className="text-sm text-blue-700 bg-blue-50 p-2 rounded">{hint}</li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Right Side - Code Editor */}
          <Card className="bg-white shadow-lg rounded-xl border border-gray-200 overflow-hidden">
            <CardHeader className="bg-gray-900 text-white border-b">
              <CardTitle className="text-lg flex items-center space-x-2">
                <Code className="w-5 h-5" />
                <span>Code Editor</span>
              </CardTitle>
              <CardDescription className="text-gray-300">
                Write your solution here
              </CardDescription>
            </CardHeader>
            <CardContent className="p-0 h-full">
              {/* Code Editor Area */}
              <div className="h-full bg-white text-black font-mono">
                <textarea
                  value={userCode}
                  onChange={(e) => setUserCode(e.target.value)}
                  className="w-full h-full p-4 resize-none border-none outline-none focus:outline-none focus:ring-0 text-black"
                  placeholder="// Write your solution here&#10;function solution() {&#10;    &#10;}"
                  spellCheck={false}
                  autoComplete="off"
                  autoCorrect="off"
                  autoCapitalize="off"
                  style={{
                    backgroundColor: '#ffffff',
                    color: '#000000 !important',
                    fontFamily: 'Monaco, Menlo, "Ubuntu Mono", monospace',
                    fontSize: '14px',
                    lineHeight: '1.5',
                    tabSize: 4,
                    border: 'none',
                    boxShadow: 'none'
                  }}
                />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Bottom Action Bar */}
        <Card className="bg-white shadow-lg rounded-xl border border-gray-200">
          <CardContent className="p-4">
            <div className="flex justify-between items-center">
              <Button 
                onClick={resetToSetup}
                variant="outline"
                className="border-gray-300 text-gray-700 hover:bg-gray-50"
              >
                End Interview
              </Button>
              
              <div className="flex items-center space-x-4">
                {/* Progress */}
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-600">Progress:</span>
                  <div className="flex space-x-1">
                    {mockInterviewQuestions[selectedDifficulty].map((_, index) => (
                      <div
                        key={index}
                        className={`w-3 h-3 rounded-full ${
                          index < currentQuestionIndex
                            ? 'bg-green-500'
                            : index === currentQuestionIndex
                            ? 'bg-blue-500'
                            : 'bg-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-gray-600">
                    {currentQuestionIndex + 1} / {mockInterviewQuestions[selectedDifficulty].length}
                  </span>
                </div>

                <Button 
                  onClick={nextMockQuestion}
                  className="bg-green-600 hover:bg-green-700 text-white"
                >
                  {currentQuestionIndex < mockInterviewQuestions[selectedDifficulty].length - 1 ? 'Next Question' : 'Complete Interview'}
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  // Mock Interview Setup
  if (currentStep === 'mock-setup') {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 py-8">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-50 to-blue-50 p-8 rounded-2xl text-center border border-purple-100">
          <h1 className="text-4xl lg:text-5xl font-bold tracking-tight mb-6" style={{ color: '#000000' }}>
            Mock <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">Interview</span>
          </h1>
          <p className="text-lg max-w-3xl mx-auto leading-relaxed" style={{ color: '#000000' }}>
            Practice coding interviews with real LeetCode problems. Timed sessions to simulate actual interview conditions.
          </p>
        </div>

        {/* Setup Card */}
        <Card className="bg-white shadow-lg rounded-xl border border-gray-200 max-w-2xl mx-auto">
          <CardHeader className="text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="w-8 h-8 text-white" />
            </div>
            <CardTitle className="text-2xl" style={{ color: '#000000' }}>
              Mock Interview Setup
            </CardTitle>
            <CardDescription style={{ color: '#000000' }}>
              Select difficulty level for your coding interview practice
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Difficulty Selection */}
            <div className="space-y-3">
              <label className="block text-sm font-medium text-gray-700">
                Interview Difficulty
              </label>
              <div className="grid grid-cols-1 gap-3">
                {difficulties.map((difficulty) => {
                  const questions = mockInterviewQuestions[difficulty.value]
                  const totalTime = questions.reduce((sum, q) => sum + q.timeLimit, 0)
                  
                  return (
                    <button
                      key={difficulty.value}
                      onClick={() => setSelectedDifficulty(difficulty.value)}
                      className={`p-4 text-left border-2 rounded-lg transition-all ${
                        selectedDifficulty === difficulty.value
                          ? 'border-purple-500 bg-purple-50 text-purple-800'
                          : 'border-gray-300 hover:border-purple-300 hover:bg-purple-50'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className={`w-4 h-4 ${difficulty.color} rounded-full`}></div>
                          <div>
                            <div className="font-semibold">{difficulty.label}</div>
                            <div className="text-sm text-gray-600">
                              {questions.length} questions • ~{totalTime} minutes total
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm font-medium text-gray-700">Questions:</div>
                          <div className="text-xs text-gray-500">
                            {questions.map(q => q.title).join(', ')}
                          </div>
                        </div>
                      </div>
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Interview Info */}
            <div className="p-4 bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg border border-purple-200">
              <div className="flex items-center space-x-2 mb-2">
                <Clock className="w-5 h-5 text-purple-600" />
                <span className="font-semibold text-purple-800">Timed Interview</span>
              </div>
              <p className="text-sm text-purple-700">
                Each question has a time limit. You'll automatically move to the next question when time runs out.
                Focus on explaining your approach and writing clean, working code.
              </p>
            </div>

            {/* Start Button */}
            <Button 
              onClick={startMockInterview}
              className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white py-3"
            >
              <Play className="w-5 h-5 mr-2" />
              Start Mock Interview
            </Button>

            <Button 
              onClick={() => setCurrentStep('setup')}
              variant="outline"
              className="w-full border-gray-300 text-gray-700 hover:bg-gray-50"
            >
              Back to Main Menu
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  // Assessment Report Component
  if (currentStep === 'report' && assessmentReport) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 py-8">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-2xl border border-blue-100 text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <Award className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold mb-2" style={{ color: '#000000' }}>
            Assessment Complete!
          </h1>
          <p className="text-lg" style={{ color: '#000000' }}>
            {selectedCategory && getCategoryIcon(selectedCategory as Category)} {selectedCategory}
          </p>
        </div>

        {/* Overall Performance */}
        <Card className="bg-white shadow-lg rounded-xl border border-gray-200">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2" style={{ color: '#000000' }}>
              <BarChart3 className="w-6 h-6" />
              <span>Overall Performance</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <div className="text-3xl font-bold text-blue-600">{assessmentReport.accuracy.toFixed(1)}%</div>
                <div className="text-sm text-gray-600">Overall Accuracy</div>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <div className="text-3xl font-bold text-green-600">{assessmentReport.correctAnswers}</div>
                <div className="text-sm text-gray-600">Correct Answers</div>
              </div>
              <div className="text-center p-4 bg-purple-50 rounded-lg">
                <div className="text-3xl font-bold text-purple-600">{assessmentReport.totalQuestions}</div>
                <div className="text-sm text-gray-600">Total Questions</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Difficulty Breakdown */}
        <Card className="bg-white shadow-lg rounded-xl border border-gray-200">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2" style={{ color: '#000000' }}>
              <Target className="w-6 h-6" />
              <span>Difficulty Breakdown</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {Object.entries(assessmentReport.difficultyBreakdown).map(([difficulty, stats]) => {
                if (stats.total === 0) return null
                const accuracy = (stats.correct / stats.total) * 100
                const color = difficulty === 'easy' ? 'green' : difficulty === 'medium' ? 'yellow' : 'red'
                
                return (
                  <div key={difficulty} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className={`w-4 h-4 bg-${color}-500 rounded-full`}></div>
                      <span className="font-medium capitalize" style={{ color: '#000000' }}>{difficulty}</span>
                    </div>
                    <div className="text-right">
                      <div className="font-bold" style={{ color: '#000000' }}>{stats.correct}/{stats.total}</div>
                      <div className="text-sm text-gray-600">{accuracy.toFixed(1)}%</div>
                    </div>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>

        {/* Strong Areas */}
        {assessmentReport.strongAreas.length > 0 && (
          <Card className="bg-white shadow-lg rounded-xl border border-gray-200">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-green-700">
                <CheckCircle className="w-6 h-6" />
                <span>Strong Areas</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {assessmentReport.strongAreas.map((area, index) => (
                  <div key={index} className="flex items-center space-x-2 p-2 bg-green-50 rounded-lg">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span style={{ color: '#000000' }}>{area}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Weak Areas */}
        {assessmentReport.weakAreas.length > 0 && (
          <Card className="bg-white shadow-lg rounded-xl border border-gray-200">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-orange-700">
                <AlertTriangle className="w-6 h-6" />
                <span>Areas for Improvement</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {assessmentReport.weakAreas.map((area, index) => (
                  <div key={index} className="flex items-center space-x-2 p-2 bg-orange-50 rounded-lg">
                    <AlertTriangle className="w-4 h-4 text-orange-600" />
                    <span style={{ color: '#000000' }}>{area}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Recommendations */}
        <Card className="bg-white shadow-lg rounded-xl border border-gray-200">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2" style={{ color: '#000000' }}>
              <Brain className="w-6 h-6" />
              <span>Personalized Recommendations</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {assessmentReport.recommendations.map((recommendation, index) => (
                <div key={index} className="flex items-start space-x-3 p-3 bg-blue-50 rounded-lg">
                  <div className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold mt-0.5">
                    {index + 1}
                  </div>
                  <span style={{ color: '#000000' }}>{recommendation}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex justify-center space-x-4">
          <Button 
            onClick={resetPractice}
            variant="outline"
            className="border-gray-300 text-gray-700 hover:bg-gray-50"
          >
            Start New Assessment
          </Button>
          <Button 
            onClick={() => setCurrentStep('practice')}
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            Continue Practice
          </Button>
        </div>
      </div>
    )
  }

  if (currentStep === 'practice' && currentQuestion) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 py-8">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-2xl border border-blue-100">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold" style={{ color: '#000000' }}>
                {selectedCategory && getCategoryIcon(selectedCategory as Category)} {selectedCategory}
              </h1>
              <p className="text-gray-600">
                Current Difficulty: <Badge className={`${difficulties.find(d => d.value === adaptiveDifficulty)?.color} text-white`}>
                  {adaptiveDifficulty.charAt(0).toUpperCase() + adaptiveDifficulty.slice(1)}
                </Badge>
              </p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-blue-600">{score.correct}/{score.total}</div>
              <div className="text-sm text-gray-600">Score</div>
            </div>
          </div>
        </div>

        {/* Question Card */}
        <Card className="bg-white shadow-lg rounded-xl border border-gray-200">
          <CardHeader>
            <CardTitle className="text-xl" style={{ color: '#000000' }}>
              Question {currentQuestionIndex + 1}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="p-4 bg-gray-50 rounded-lg">
              <pre className="text-lg font-medium whitespace-pre-wrap" style={{ color: '#000000' }}>
                {currentQuestion.question}
              </pre>
            </div>

            {/* Answer Options */}
            <div className="grid grid-cols-1 gap-3">
              {currentQuestion.options.map((option, index) => {
                const optionLetter = String.fromCharCode(65 + index) // A, B, C, D
                const isSelected = selectedAnswer === optionLetter
                const isCorrect = currentQuestion.correctAnswer === optionLetter
                
                return (
                  <button
                    key={index}
                    onClick={() => !showResult && handleAnswerSelect(optionLetter)}
                    disabled={showResult}
                    className={`p-4 text-left border-2 rounded-lg transition-all ${
                      showResult
                        ? isCorrect
                          ? 'border-green-500 bg-green-50 text-green-800'
                          : isSelected
                          ? 'border-red-500 bg-red-50 text-red-800'
                          : 'border-gray-200 bg-gray-50 text-gray-600'
                        : isSelected
                        ? 'border-blue-500 bg-blue-50 text-blue-800'
                        : 'border-gray-300 hover:border-blue-300 hover:bg-blue-50'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                        showResult && isCorrect
                          ? 'bg-green-500 text-white'
                          : showResult && isSelected && !isCorrect
                          ? 'bg-red-500 text-white'
                          : isSelected
                          ? 'bg-blue-500 text-white'
                          : 'bg-gray-200 text-gray-700'
                      }`}>
                        {optionLetter}
                      </div>
                      <span className="flex-1">{option}</span>
                      {showResult && isCorrect && <CheckCircle className="w-5 h-5 text-green-500" />}
                      {showResult && isSelected && !isCorrect && <X className="w-5 h-5 text-red-500" />}
                    </div>
                  </button>
                )
              })}
            </div>

            {/* Action Buttons */}
            <div className="flex justify-between">
              <Button 
                onClick={resetPractice}
                variant="outline"
                className="border-gray-300 text-gray-700 hover:bg-gray-50"
              >
                Back to Setup
              </Button>
              
              <div className="flex space-x-2">
                <Button 
                  onClick={endAssessment}
                  variant="outline"
                  className="border-blue-300 text-blue-700 hover:bg-blue-50"
                >
                  <FileText className="w-4 h-4 mr-2" />
                  End Assessment
                </Button>
                
                {!showResult ? (
                  <Button 
                    onClick={submitAnswer}
                    disabled={!selectedAnswer}
                    className="bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    Submit Answer
                  </Button>
                ) : (
                  <Button 
                    onClick={nextQuestion}
                    className="bg-green-600 hover:bg-green-700 text-white"
                  >
                    Next Question
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                )}
              </div>
            </div>

            {/* Adaptive Feedback */}
            {showResult && (
              <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                <div className="flex items-center space-x-2">
                  <TrendingUp className="w-5 h-5 text-blue-600" />
                  <span className="font-semibold text-blue-800">Adaptive Learning:</span>
                </div>
                <p className="text-sm text-blue-700 mt-1">
                  {selectedAnswer === currentQuestion.correctAnswer
                    ? consecutiveCorrect >= 1 
                      ? "Great job! Difficulty may increase with more correct answers."
                      : "Correct! Keep it up!"
                    : "Don't worry! Difficulty will adjust to help you learn better."
                  }
                </p>
                {checkAllQuestionsAnswered() && (
                  <p className="text-sm text-green-700 mt-2 font-semibold">
                    🎉 Amazing! You've answered all questions correctly at least once. Assessment will end automatically!
                  </p>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 py-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-8 rounded-2xl text-center border border-blue-100">
        <h1 className="text-4xl lg:text-5xl font-bold tracking-tight mb-6" style={{ color: '#000000' }}>
          Study <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Buddy</span>
        </h1>
        <p className="text-lg max-w-3xl mx-auto leading-relaxed" style={{ color: '#000000' }}>
          Practice coding questions with adaptive difficulty that adjusts to your performance.
        </p>
      </div>

      {/* Practice Card */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
        {/* Practice Session Card */}
        <Card className="bg-white shadow-lg rounded-xl border border-gray-200">
          <CardHeader className="text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <BookOpen className="w-8 h-8 text-white" />
            </div>
            <CardTitle className="text-2xl" style={{ color: '#000000' }}>
              Practice Session
            </CardTitle>
            <CardDescription style={{ color: '#000000' }}>
              Choose your topic and starting difficulty level
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Category Selection */}
            <div className="space-y-3">
              <label className="block text-sm font-medium text-gray-700">
                Select Topic
              </label>
              <div className="grid grid-cols-1 gap-3">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`p-4 text-left border-2 rounded-lg transition-all ${
                      selectedCategory === category && sessionType === 'practice'
                        ? 'border-blue-500 bg-blue-50 text-blue-800'
                        : 'border-gray-300 hover:border-blue-300 hover:bg-blue-50'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl">{getCategoryIcon(category)}</span>
                      <div>
                        <div className="font-semibold">{category}</div>
                        <div className="text-sm text-gray-600">
                          {Object.keys(questionBank[category as Category]).map((diff: string) => 
                            `${(questionBank[category as Category] as any)[diff].length} ${diff}`
                          ).join(' • ')} questions
                        </div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Difficulty Selection */}
            <div className="space-y-3">
              <label className="block text-sm font-medium text-gray-700">
                Starting Difficulty
              </label>
              <div className="grid grid-cols-3 gap-3">
                {difficulties.map((difficulty) => (
                  <button
                    key={difficulty.value}
                    onClick={() => {
                      setSelectedDifficulty(difficulty.value)
                      setSessionType('practice')
                    }}
                    className={`p-3 text-center border-2 rounded-lg transition-all ${
                      selectedDifficulty === difficulty.value && sessionType === 'practice'
                        ? 'border-blue-500 bg-blue-50 text-blue-800'
                        : 'border-gray-300 hover:border-blue-300 hover:bg-blue-50'
                    }`}
                  >
                    <div className={`w-4 h-4 ${difficulty.color} rounded-full mx-auto mb-2`}></div>
                    <div className="font-semibold">{difficulty.label}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Adaptive Learning Info */}
            <div className="p-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg border border-green-200">
              <div className="flex items-center space-x-2 mb-2">
                <Target className="w-5 h-5 text-green-600" />
                <span className="font-semibold text-green-800">Adaptive Learning</span>
              </div>
              <p className="text-sm text-green-700">
                The difficulty will automatically adjust based on your performance. Answer correctly to unlock harder questions!
              </p>
            </div>

            {/* Start Button */}
            <Button 
              onClick={() => {
                setSessionType('practice')
                startPractice()
              }}
              disabled={!selectedCategory}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-3"
            >
              <Play className="w-5 h-5 mr-2" />
              Start Practice Session
            </Button>
          </CardContent>
        </Card>

        {/* Mock Interview Card */}
        <Card className="bg-white shadow-lg rounded-xl border border-gray-200">
          <CardHeader className="text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="w-8 h-8 text-white" />
            </div>
            <CardTitle className="text-2xl" style={{ color: '#000000' }}>
              Mock Interview
            </CardTitle>
            <CardDescription style={{ color: '#000000' }}>
              Practice coding interviews with real LeetCode problems
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Interview Features */}
            <div className="space-y-3">
              <div className="flex items-center space-x-2 text-sm text-gray-700">
                <Clock className="w-4 h-4 text-purple-600" />
                <span>Timed questions (15-40 minutes each)</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-700">
                <Code className="w-4 h-4 text-purple-600" />
                <span>Real LeetCode problems</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-700">
                <Target className="w-4 h-4 text-purple-600" />
                <span>Interview simulation experience</span>
              </div>
            </div>

            {/* Difficulty Preview */}
            <div className="space-y-3">
              <label className="block text-sm font-medium text-gray-700">
                Interview Difficulty
              </label>
              <div className="grid grid-cols-1 gap-2">
                {difficulties.map((difficulty) => {
                  const questions = mockInterviewQuestions[difficulty.value]
                  return (
                    <div key={difficulty.value} className="p-3 border rounded-lg bg-gray-50">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <div className={`w-3 h-3 ${difficulty.color} rounded-full`}></div>
                          <span className="font-medium">{difficulty.label}</span>
                        </div>
                        <span className="text-sm text-gray-600">{questions.length} questions</span>
                      </div>
                      <div className="text-xs text-gray-500 mt-1">
                        {questions.map(q => q.title).join(', ')}
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Interview Info */}
            <div className="p-4 bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg border border-purple-200">
              <div className="flex items-center space-x-2 mb-2">
                <Users className="w-5 h-5 text-purple-600" />
                <span className="font-semibold text-purple-800">Interview Simulation</span>
              </div>
              <p className="text-sm text-purple-700">
                Practice under time pressure with real coding problems used in technical interviews.
              </p>
            </div>

            {/* Start Button */}
            <Button 
              onClick={() => {
                setSessionType('mock-interview')
                setCurrentStep('mock-setup')
              }}
              className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white py-3"
            >
              <Users className="w-5 h-5 mr-2" />
              Start Mock Interview
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}