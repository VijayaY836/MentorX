// Advanced Study Knowledge Database with RAG Implementation
export interface StudyQuestion {
  id: string
  question: string
  type: 'multiple_choice' | 'coding' | 'explanation' | 'scenario'
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  category: string
  subcategory: string
  options?: string[]
  correctAnswer?: string | number
  explanation: string
  codeExample?: string
  hints: string[]
  relatedConcepts: string[]
  realWorldApplication: string
  commonMistakes: string[]
  followUpQuestions: string[]
  estimatedTime: number // in minutes
  tags: string[]
}

export interface StudyCategory {
  id: string
  name: string
  description: string
  icon: string
  subcategories: string[]
  totalQuestions: number
  averageDifficulty: string
  estimatedStudyTime: number // in hours
}

export class StudyKnowledgeBase {
  private static categories: StudyCategory[] = [
    {
      id: 'javascript',
      name: 'JavaScript Fundamentals',
      description: 'Core JavaScript concepts, ES6+ features, and modern development practices',
      icon: '🟨',
      subcategories: ['Variables & Data Types', 'Functions & Scope', 'Objects & Arrays', 'Async Programming', 'ES6+ Features'],
      totalQuestions: 50,
      averageDifficulty: 'intermediate',
      estimatedStudyTime: 15
    },
    {
      id: 'react',
      name: 'React Development',
      description: 'React components, hooks, state management, and modern React patterns',
      icon: '⚛️',
      subcategories: ['Components & JSX', 'Hooks & State', 'Props & Events', 'Context & Redux', 'Performance & Testing'],
      totalQuestions: 45,
      averageDifficulty: 'intermediate',
      estimatedStudyTime: 20
    },
    {
      id: 'algorithms',
      name: 'Data Structures & Algorithms',
      description: 'Essential algorithms, data structures, and problem-solving techniques',
      icon: '🧮',
      subcategories: ['Arrays & Strings', 'Linked Lists', 'Trees & Graphs', 'Sorting & Searching', 'Dynamic Programming'],
      totalQuestions: 60,
      averageDifficulty: 'advanced',
      estimatedStudyTime: 25
    },
    {
      id: 'system-design',
      name: 'System Design',
      description: 'Scalable system architecture, design patterns, and distributed systems',
      icon: '🏗️',
      subcategories: ['Scalability Principles', 'Database Design', 'Caching Strategies', 'Microservices', 'Load Balancing'],
      totalQuestions: 40,
      averageDifficulty: 'advanced',
      estimatedStudyTime: 30
    }
  ]

  private static questions: StudyQuestion[] = [
    // JAVASCRIPT FUNDAMENTALS
    {
      id: 'js_001',
      question: 'What is the difference between `let`, `const`, and `var` in JavaScript?',
      type: 'explanation',
      difficulty: 'beginner',
      category: 'javascript',
      subcategory: 'Variables & Data Types',
      explanation: '`var` is function-scoped and can be redeclared, `let` is block-scoped and can be reassigned, `const` is block-scoped and cannot be reassigned after declaration.',
      codeExample: `// var - function scoped, can be redeclared
var name = "John";
var name = "Jane"; // OK

// let - block scoped, can be reassigned
let age = 25;
age = 26; // OK

// const - block scoped, cannot be reassigned
const city = "NYC";
// city = "LA"; // Error!`,
      hints: [
        'Think about scope: function vs block',
        'Consider reassignment capabilities',
        'Remember hoisting behavior differences'
      ],
      relatedConcepts: ['Hoisting', 'Block Scope', 'Function Scope', 'Temporal Dead Zone'],
      realWorldApplication: 'Use `const` by default, `let` when you need to reassign, avoid `var` in modern JavaScript',
      commonMistakes: [
        'Using var in loops causing closure issues',
        'Trying to reassign const variables',
        'Not understanding block scope with let/const'
      ],
      followUpQuestions: [
        'What is hoisting and how does it affect these declarations?',
        'What happens when you use these in a for loop?',
        'How does the temporal dead zone work?'
      ],
      estimatedTime: 5,
      tags: ['variables', 'scope', 'es6', 'fundamentals']
    },
    {
      id: 'js_002',
      question: 'Which of the following correctly demonstrates closure in JavaScript?',
      type: 'multiple_choice',
      difficulty: 'intermediate',
      category: 'javascript',
      subcategory: 'Functions & Scope',
      options: [
        'function outer() { return function inner() { console.log("Hello"); }; }',
        'function outer() { var x = 10; return function inner() { return x; }; }',
        'function outer() { return "Hello World"; }',
        'var outer = function() { var inner = function() {}; }'
      ],
      correctAnswer: 1,
      explanation: 'A closure occurs when an inner function has access to variables from its outer function scope, even after the outer function has returned. Option B demonstrates this perfectly.',
      codeExample: `function outer() {
  var x = 10; // Outer variable
  return function inner() {
    return x; // Inner function accessing outer variable
  };
}

const closureFunc = outer();
console.log(closureFunc()); // 10 - closure in action!`,
      hints: [
        'Look for inner functions accessing outer variables',
        'Closure persists even after outer function returns',
        'The inner function "closes over" the outer variables'
      ],
      relatedConcepts: ['Lexical Scope', 'Function Scope', 'Higher-Order Functions', 'Memory Management'],
      realWorldApplication: 'Closures are used in module patterns, event handlers, callbacks, and maintaining private state',
      commonMistakes: [
        'Confusing closure with simple function nesting',
        'Not understanding variable persistence',
        'Memory leaks from unintended closures'
      ],
      followUpQuestions: [
        'How do closures affect memory management?',
        'What are practical uses of closures?',
        'How do closures work with loops?'
      ],
      estimatedTime: 7,
      tags: ['closure', 'scope', 'functions', 'advanced']
    }
,
    // REACT DEVELOPMENT
    {
      id: 'react_001',
      question: 'What is the purpose of the `useEffect` hook and when should you use it?',
      type: 'explanation',
      difficulty: 'intermediate',
      category: 'react',
      subcategory: 'Hooks & State',
      explanation: 'useEffect is used for side effects in functional components. It runs after render and can handle data fetching, subscriptions, timers, and cleanup.',
      codeExample: `import { useEffect, useState } from 'react';

function UserProfile({ userId }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Side effect: data fetching
    fetchUser(userId).then(setUser);
    
    // Cleanup function
    return () => {
      // Cancel any ongoing requests
      cancelRequest();
    };
  }, [userId]); // Dependency array

  return <div>{user?.name}</div>;
}`,
      hints: [
        'Think about what happens after component renders',
        'Consider cleanup and dependencies',
        'Remember the component lifecycle'
      ],
      relatedConcepts: ['Component Lifecycle', 'Side Effects', 'Dependency Array', 'Cleanup Functions'],
      realWorldApplication: 'Data fetching, setting up subscriptions, manually changing DOM, timers, and cleanup',
      commonMistakes: [
        'Missing dependency array causing infinite loops',
        'Not cleaning up subscriptions or timers',
        'Using useEffect for synchronous operations'
      ],
      followUpQuestions: [
        'What happens if you omit the dependency array?',
        'How do you handle cleanup in useEffect?',
        'When should you use useLayoutEffect instead?'
      ],
      estimatedTime: 8,
      tags: ['react', 'hooks', 'useEffect', 'lifecycle']
    },
    {
      id: 'react_002',
      question: 'Which React pattern best demonstrates proper state management for a counter component?',
      type: 'multiple_choice',
      difficulty: 'beginner',
      category: 'react',
      subcategory: 'Hooks & State',
      options: [
        'const [count, setCount] = useState(0); setCount(count + 1);',
        'const [count, setCount] = useState(0); setCount(prev => prev + 1);',
        'let count = 0; count++;',
        'const count = useRef(0); count.current++;'
      ],
      correctAnswer: 1,
      explanation: 'Using the functional update pattern `setCount(prev => prev + 1)` is safer because it ensures you\'re working with the latest state value, especially important with async operations.',
      codeExample: `function Counter() {
  const [count, setCount] = useState(0);

  const increment = () => {
    // ✅ Good: Functional update
    setCount(prev => prev + 1);
    
    // ❌ Avoid: Direct state reference
    // setCount(count + 1);
  };

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={increment}>+</button>
    </div>
  );
}`,
      hints: [
        'Consider what happens with multiple rapid clicks',
        'Think about stale closure issues',
        'Functional updates are safer'
      ],
      relatedConcepts: ['State Updates', 'Functional Updates', 'Stale Closures', 'useState Hook'],
      realWorldApplication: 'Any component that needs to update state based on previous state value',
      commonMistakes: [
        'Using stale state values in updates',
        'Not understanding async nature of setState',
        'Mutating state directly'
      ],
      followUpQuestions: [
        'What are stale closures and how do functional updates help?',
        'When might you need useCallback with state updates?',
        'How does batching affect state updates?'
      ],
      estimatedTime: 6,
      tags: ['react', 'useState', 'state-management', 'functional-updates']
    },
    // ALGORITHMS & DATA STRUCTURES
    {
      id: 'algo_001',
      question: 'Implement a function to reverse a linked list iteratively.',
      type: 'coding',
      difficulty: 'intermediate',
      category: 'algorithms',
      subcategory: 'Linked Lists',
      explanation: 'To reverse a linked list iteratively, we need to reverse the direction of pointers by keeping track of previous, current, and next nodes.',
      codeExample: `class ListNode {
  constructor(val, next = null) {
    this.val = val;
    this.next = next;
  }
}

function reverseList(head) {
  let prev = null;
  let current = head;
  
  while (current !== null) {
    let next = current.next; // Store next node
    current.next = prev;     // Reverse the link
    prev = current;          // Move prev forward
    current = next;          // Move current forward
  }
  
  return prev; // prev is now the new head
}

// Time: O(n), Space: O(1)`,
      hints: [
        'Use three pointers: prev, current, next',
        'Reverse the direction of each link',
        'Return the new head (previously the tail)'
      ],
      relatedConcepts: ['Linked Lists', 'Pointers', 'Iteration', 'Two Pointers Technique'],
      realWorldApplication: 'Undo functionality, browser history, reversing data flows in systems',
      commonMistakes: [
        'Losing reference to the next node',
        'Not updating pointers in correct order',
        'Forgetting to return the new head'
      ],
      followUpQuestions: [
        'How would you implement this recursively?',
        'What if you need to reverse only part of the list?',
        'How do you detect if a linked list has a cycle?'
      ],
      estimatedTime: 15,
      tags: ['linked-list', 'algorithms', 'iteration', 'pointers']
    },
    {
      id: 'algo_002',
      question: 'What is the time complexity of binary search and why?',
      type: 'explanation',
      difficulty: 'beginner',
      category: 'algorithms',
      subcategory: 'Sorting & Searching',
      explanation: 'Binary search has O(log n) time complexity because it eliminates half of the remaining elements in each iteration, creating a logarithmic relationship.',
      codeExample: `function binarySearch(arr, target) {
  let left = 0;
  let right = arr.length - 1;
  
  while (left <= right) {
    let mid = Math.floor((left + right) / 2);
    
    if (arr[mid] === target) {
      return mid; // Found target
    } else if (arr[mid] < target) {
      left = mid + 1; // Search right half
    } else {
      right = mid - 1; // Search left half
    }
  }
  
  return -1; // Target not found
}

// Time: O(log n), Space: O(1)`,
      hints: [
        'Each iteration eliminates half the search space',
        'Think about how many times you can divide n by 2',
        'Logarithmic growth is very efficient'
      ],
      relatedConcepts: ['Divide and Conquer', 'Logarithmic Time', 'Sorted Arrays', 'Search Algorithms'],
      realWorldApplication: 'Database indexing, searching in sorted datasets, finding elements in large collections',
      commonMistakes: [
        'Using binary search on unsorted arrays',
        'Off-by-one errors in boundary conditions',
        'Integer overflow in mid calculation'
      ],
      followUpQuestions: [
        'How do you handle duplicate elements?',
        'What about searching in rotated sorted arrays?',
        'How does this compare to linear search?'
      ],
      estimatedTime: 10,
      tags: ['binary-search', 'time-complexity', 'algorithms', 'searching']
    },
    // SYSTEM DESIGN
    {
      id: 'sys_001',
      question: 'Explain the CAP theorem and its implications for distributed systems.',
      type: 'explanation',
      difficulty: 'advanced',
      category: 'system-design',
      subcategory: 'Scalability Principles',
      explanation: 'CAP theorem states that distributed systems can only guarantee 2 out of 3: Consistency (all nodes see same data), Availability (system remains operational), and Partition tolerance (system continues despite network failures).',
      codeExample: `// Example: Different database choices based on CAP priorities

// CP System (Consistency + Partition Tolerance)
// Example: MongoDB, Redis Cluster
// - Strong consistency across nodes
// - May become unavailable during network partitions
// - Good for: Financial systems, inventory management

// AP System (Availability + Partition Tolerance)  
// Example: Cassandra, DynamoDB
// - Always available for reads/writes
// - Eventually consistent
// - Good for: Social media, content delivery

// CA System (Consistency + Availability)
// Example: Traditional RDBMS in single datacenter
// - Strong consistency and high availability
// - Cannot handle network partitions
// - Good for: Single-region applications`,
      hints: [
        'You can only pick 2 out of 3 guarantees',
        'Network partitions are inevitable in distributed systems',
        'Different systems make different trade-offs'
      ],
      relatedConcepts: ['Distributed Systems', 'Consistency Models', 'Network Partitions', 'Database Design'],
      realWorldApplication: 'Choosing databases, designing microservices, planning disaster recovery, global system architecture',
      commonMistakes: [
        'Thinking you can have all three guarantees',
        'Not considering network partition scenarios',
        'Choosing wrong consistency model for use case'
      ],
      followUpQuestions: [
        'What is eventual consistency?',
        'How do you handle split-brain scenarios?',
        'What are some real-world examples of each type?'
      ],
      estimatedTime: 12,
      tags: ['cap-theorem', 'distributed-systems', 'consistency', 'availability']
    },
    {
      id: 'sys_002',
      question: 'How would you design a URL shortener like bit.ly?',
      type: 'scenario',
      difficulty: 'advanced',
      category: 'system-design',
      subcategory: 'Scalability Principles',
      explanation: 'A URL shortener needs: unique ID generation, URL encoding/decoding, caching for popular URLs, analytics tracking, and horizontal scaling capabilities.',
      codeExample: `// High-level architecture components:

// 1. URL Shortening Service
class URLShortener {
  async shortenURL(longURL) {
    // Generate unique ID (base62 encoding)
    const id = await this.generateUniqueID();
    const shortURL = this.encodeToBase62(id);
    
    // Store mapping in database
    await this.db.store(shortURL, longURL);
    
    // Cache popular URLs
    await this.cache.set(shortURL, longURL);
    
    return \`https://short.ly/\${shortURL}\`;
  }
  
  async expandURL(shortURL) {
    // Check cache first
    let longURL = await this.cache.get(shortURL);
    
    if (!longURL) {
      // Fallback to database
      longURL = await this.db.get(shortURL);
      await this.cache.set(shortURL, longURL);
    }
    
    // Track analytics
    await this.analytics.track(shortURL);
    
    return longURL;
  }
}

// 2. Database Schema
// urls table: id, short_url, long_url, created_at, expires_at
// analytics table: short_url, clicks, timestamp, user_agent, ip`,
      hints: [
        'Think about scale: millions of URLs, billions of redirects',
        'Consider caching strategy for popular URLs',
        'Plan for unique ID generation at scale'
      ],
      relatedConcepts: ['Load Balancing', 'Caching', 'Database Sharding', 'CDN', 'Analytics'],
      realWorldApplication: 'URL shorteners, QR code systems, link tracking, marketing campaigns',
      commonMistakes: [
        'Not planning for scale from the beginning',
        'Ignoring analytics and monitoring needs',
        'Poor caching strategy for hot URLs'
      ],
      followUpQuestions: [
        'How do you handle custom short URLs?',
        'What about URL expiration and cleanup?',
        'How do you prevent abuse and spam?'
      ],
      estimatedTime: 20,
      tags: ['system-design', 'scalability', 'url-shortener', 'architecture']
    }
  ]
  // RAG-based search and retrieval methods
  static getCategories(): StudyCategory[] {
    return this.categories
  }

  static getCategoryById(id: string): StudyCategory | undefined {
    return this.categories.find(cat => cat.id === id)
  }

  static getQuestionsByCategory(categoryId: string, difficulty?: string): StudyQuestion[] {
    let questions = this.questions.filter(q => q.category === categoryId)
    
    if (difficulty) {
      questions = questions.filter(q => q.difficulty === difficulty)
    }
    
    return questions
  }

  static getQuestionsBySubcategory(categoryId: string, subcategory: string): StudyQuestion[] {
    return this.questions.filter(q => 
      q.category === categoryId && q.subcategory === subcategory
    )
  }

  // Advanced RAG-based semantic search
  static searchQuestions(query: string, limit: number = 10): StudyQuestion[] {
    const queryLower = query.toLowerCase()
    const searchTerms = queryLower.split(' ').filter(term => term.length > 2)
    
    const scoredQuestions = this.questions.map(question => {
      let relevanceScore = 0
      
      // Exact question match (highest priority)
      if (question.question.toLowerCase().includes(queryLower)) {
        relevanceScore += 100
      }
      
      // Tag matching (high priority)
      question.tags.forEach(tag => {
        if (queryLower.includes(tag) || tag.includes(queryLower)) {
          relevanceScore += 50
        }
      })
      
      // Related concepts matching
      question.relatedConcepts.forEach(concept => {
        if (queryLower.includes(concept.toLowerCase()) || concept.toLowerCase().includes(queryLower)) {
          relevanceScore += 30
        }
      })
      
      // Category and subcategory matching
      if (queryLower.includes(question.category) || queryLower.includes(question.subcategory.toLowerCase())) {
        relevanceScore += 25
      }
      
      // Explanation content matching
      searchTerms.forEach(term => {
        if (question.explanation.toLowerCase().includes(term)) {
          relevanceScore += 15
        }
        if (question.realWorldApplication.toLowerCase().includes(term)) {
          relevanceScore += 10
        }
      })
      
      // Code example matching (for technical queries)
      if (question.codeExample && searchTerms.some(term => 
        question.codeExample!.toLowerCase().includes(term)
      )) {
        relevanceScore += 20
      }
      
      return { ...question, relevanceScore }
    })
    
    return scoredQuestions
      .filter(q => q.relevanceScore > 0)
      .sort((a, b) => b.relevanceScore - a.relevanceScore)
      .slice(0, limit)
  }

  // Adaptive question selection based on user performance
  static getAdaptiveQuestions(
    categoryId: string, 
    userPerformance: { [questionId: string]: boolean },
    targetDifficulty: 'beginner' | 'intermediate' | 'advanced' = 'intermediate',
    count: number = 5
  ): StudyQuestion[] {
    const categoryQuestions = this.getQuestionsByCategory(categoryId)
    
    // Calculate user's current level based on performance
    const answeredQuestions = Object.keys(userPerformance)
    const correctAnswers = answeredQuestions.filter(id => userPerformance[id]).length
    const accuracy = answeredQuestions.length > 0 ? correctAnswers / answeredQuestions.length : 0.5
    
    // Adjust difficulty based on performance
    let adjustedDifficulty = targetDifficulty
    if (accuracy > 0.8 && targetDifficulty !== 'advanced') {
      adjustedDifficulty = targetDifficulty === 'beginner' ? 'intermediate' : 'advanced'
    } else if (accuracy < 0.6 && targetDifficulty !== 'beginner') {
      adjustedDifficulty = targetDifficulty === 'advanced' ? 'intermediate' : 'beginner'
    }
    
    // Filter questions by adjusted difficulty and exclude already answered
    const availableQuestions = categoryQuestions.filter(q => 
      q.difficulty === adjustedDifficulty && !answeredQuestions.includes(q.id)
    )
    
    // If not enough questions at target difficulty, include adjacent levels
    if (availableQuestions.length < count) {
      const allLevels = categoryQuestions.filter(q => !answeredQuestions.includes(q.id))
      return this.shuffleArray(allLevels).slice(0, count)
    }
    
    return this.shuffleArray(availableQuestions).slice(0, count)
  }

  // Get personalized study recommendations
  static getStudyRecommendations(
    userPerformance: { [categoryId: string]: { accuracy: number, questionsAnswered: number } }
  ): { category: string, priority: 'high' | 'medium' | 'low', reason: string }[] {
    const recommendations = []
    
    for (const category of this.categories) {
      const performance = userPerformance[category.id]
      
      if (!performance || performance.questionsAnswered < 5) {
        recommendations.push({
          category: category.name,
          priority: 'high' as const,
          reason: 'Start building foundation in this area'
        })
      } else if (performance.accuracy < 0.6) {
        recommendations.push({
          category: category.name,
          priority: 'high' as const,
          reason: 'Needs improvement - focus on fundamentals'
        })
      } else if (performance.accuracy < 0.8) {
        recommendations.push({
          category: category.name,
          priority: 'medium' as const,
          reason: 'Good progress - continue practicing'
        })
      } else {
        recommendations.push({
          category: category.name,
          priority: 'low' as const,
          reason: 'Strong performance - maintain with periodic review'
        })
      }
    }
    
    return recommendations.sort((a, b) => {
      const priorityOrder = { high: 3, medium: 2, low: 1 }
      return priorityOrder[b.priority] - priorityOrder[a.priority]
    })
  }

  // Utility method to shuffle array
  private static shuffleArray<T>(array: T[]): T[] {
    const shuffled = [...array]
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
    }
    return shuffled
  }

  // Get question statistics
  static getQuestionStats(): {
    totalQuestions: number
    byCategory: { [key: string]: number }
    byDifficulty: { [key: string]: number }
    averageEstimatedTime: number
  } {
    const stats = {
      totalQuestions: this.questions.length,
      byCategory: {} as { [key: string]: number },
      byDifficulty: {} as { [key: string]: number },
      averageEstimatedTime: 0
    }
    
    let totalTime = 0
    
    this.questions.forEach(q => {
      // Count by category
      stats.byCategory[q.category] = (stats.byCategory[q.category] || 0) + 1
      
      // Count by difficulty
      stats.byDifficulty[q.difficulty] = (stats.byDifficulty[q.difficulty] || 0) + 1
      
      // Sum time
      totalTime += q.estimatedTime
    })
    
    stats.averageEstimatedTime = Math.round(totalTime / this.questions.length)
    
    return stats
  }
}