// Comprehensive Knowledge Base for AI Mentor Chat
// This is the WINNING FEATURE - comprehensive educational knowledge!

export interface KnowledgeEntry {
  id: string
  category: string
  subcategory: string
  topic: string
  content: string
  keywords: string[]
  difficulty: 'beginner' | 'intermediate' | 'advanced' | 'expert'
  relatedTopics: string[]
  examples?: string[]
  resources?: string[]
}

export class KnowledgeBase {
  private static knowledge: KnowledgeEntry[] = [
    // PROGRAMMING FUNDAMENTALS
    {
      id: 'prog-001',
      category: 'Programming',
      subcategory: 'Fundamentals',
      topic: 'Variables and Data Types',
      content: 'Variables are containers that store data values. In programming, we have different data types like strings (text), numbers (integers and floats), booleans (true/false), arrays (lists), and objects. Understanding data types is crucial because it determines what operations you can perform on the data.',
      keywords: ['variables', 'data types', 'string', 'number', 'boolean', 'array', 'object'],
      difficulty: 'beginner',
      relatedTopics: ['Functions', 'Operators', 'Memory Management'],
      examples: [
        'let name = "John"; // String variable',
        'let age = 25; // Number variable',
        'let isStudent = true; // Boolean variable',
        'let grades = [85, 92, 78]; // Array variable'
      ],
      resources: [
        'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects',
        'https://javascript.info/types',
        'https://www.w3schools.com/js/js_datatypes.asp'
      ]
    },
    {
      id: 'prog-002',
      category: 'Programming',
      subcategory: 'Fundamentals',
      topic: 'Functions and Methods',
      content: 'Functions are reusable blocks of code that perform specific tasks. They help organize code, reduce repetition, and make programs more modular. Functions can take parameters (inputs) and return values (outputs). Methods are functions that belong to objects or classes.',
      keywords: ['functions', 'methods', 'parameters', 'return', 'scope', 'closure'],
      difficulty: 'beginner',
      relatedTopics: ['Variables', 'Objects', 'Classes'],
      examples: [
        'function greet(name) { return "Hello, " + name; }',
        'const add = (a, b) => a + b; // Arrow function',
        'function calculateArea(radius) { return Math.PI * radius * radius; }'
      ],
      resources: [
        'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Functions',
        'https://javascript.info/function-basics',
        'https://www.freecodecamp.org/news/javascript-functions-explained/'
      ]
    },
    {
      id: 'prog-003',
      category: 'Programming',
      subcategory: 'Data Structures',
      topic: 'Arrays and Lists',
      content: 'Arrays are ordered collections of elements that can be accessed by index. They are fundamental data structures used to store multiple values in a single variable. Arrays support operations like adding, removing, searching, and sorting elements.',
      keywords: ['arrays', 'lists', 'index', 'iteration', 'sorting', 'searching'],
      difficulty: 'beginner',
      relatedTopics: ['Loops', 'Algorithms', 'Objects'],
      examples: [
        'let fruits = ["apple", "banana", "orange"];',
        'fruits.push("grape"); // Add element',
        'fruits[0]; // Access first element',
        'fruits.length; // Get array size'
      ],
      resources: [
        'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array',
        'https://javascript.info/array',
        'https://www.programiz.com/javascript/array'
      ]
    },
    {
      id: 'prog-004',
      category: 'Programming',
      subcategory: 'Algorithms',
      topic: 'Big O Notation',
      content: 'Big O notation describes the performance or complexity of an algorithm. It specifically describes the worst-case scenario and can be used to describe execution time or space used by an algorithm. Common complexities include O(1) constant, O(log n) logarithmic, O(n) linear, O(n²) quadratic.',
      keywords: ['big o', 'complexity', 'performance', 'algorithm', 'time complexity', 'space complexity'],
      difficulty: 'intermediate',
      relatedTopics: ['Algorithms', 'Data Structures', 'Performance Optimization'],
      examples: [
        'O(1): Accessing array element by index',
        'O(log n): Binary search',
        'O(n): Linear search through array',
        'O(n²): Nested loops over same data'
      ],
      resources: [
        'https://www.bigocheatsheet.com/',
        'https://www.khanacademy.org/computing/computer-science/algorithms/asymptotic-notation/a/big-o-notation',
        'https://www.freecodecamp.org/news/big-o-notation-why-it-matters-and-why-it-doesnt-1674cfa8a23c/'
      ]
    },

    // WEB DEVELOPMENT
    {
      id: 'web-001',
      category: 'Web Development',
      subcategory: 'Frontend',
      topic: 'HTML Structure and Semantics',
      content: 'HTML (HyperText Markup Language) is the standard markup language for creating web pages. It describes the structure of web content using elements and tags. HTML uses tags like <h1>, <p>, <div>, <span> to define different parts of a webpage. Semantic HTML uses meaningful tags that describe the content\'s purpose, improving accessibility and SEO.',
      keywords: ['html', 'markup', 'semantic', 'tags', 'elements', 'accessibility', 'seo', 'web', 'structure'],
      difficulty: 'beginner',
      relatedTopics: ['CSS', 'JavaScript', 'Web Accessibility'],
      examples: [
        '<h1>Main Heading</h1> - Creates a main heading',
        '<p>This is a paragraph</p> - Creates a paragraph',
        '<div>Container element</div> - Generic container',
        '<img src="image.jpg" alt="description"> - Displays an image'
      ],
      resources: [
        'https://developer.mozilla.org/en-US/docs/Web/HTML',
        'https://www.w3schools.com/html/',
        'https://html.spec.whatwg.org/',
        'https://web.dev/learn/html/'
      ]
    },
    {
      id: 'web-002',
      category: 'Web Development',
      subcategory: 'Frontend',
      topic: 'CSS Flexbox and Grid',
      content: 'CSS Flexbox and Grid are powerful layout systems. Flexbox is one-dimensional (row or column), perfect for component layouts. Grid is two-dimensional (rows and columns), ideal for page layouts. Both provide responsive design capabilities and solve common layout challenges.',
      keywords: ['css', 'flexbox', 'grid', 'layout', 'responsive', 'alignment'],
      difficulty: 'intermediate',
      relatedTopics: ['HTML', 'Responsive Design', 'CSS Positioning'],
      examples: [
        'display: flex; justify-content: center; align-items: center;',
        'display: grid; grid-template-columns: 1fr 2fr 1fr;',
        'flex-direction: column; gap: 1rem;',
        'grid-area: header; place-items: center;'
      ],
      resources: [
        'https://css-tricks.com/snippets/css/a-guide-to-flexbox/',
        'https://css-tricks.com/snippets/css/complete-guide-grid/',
        'https://flexboxfroggy.com/',
        'https://cssgridgarden.com/'
      ]
    },
    {
      id: 'web-003',
      category: 'Web Development',
      subcategory: 'Frontend',
      topic: 'React Components and State',
      content: 'React is a JavaScript library for building user interfaces using components. Components are reusable pieces of UI that can have their own state and props. State manages data that changes over time, while props pass data between components. Hooks like useState and useEffect manage component lifecycle.',
      keywords: ['react', 'components', 'state', 'props', 'hooks', 'jsx', 'virtual dom'],
      difficulty: 'intermediate',
      relatedTopics: ['JavaScript', 'HTML', 'Component Architecture'],
      examples: [
        'const [count, setCount] = useState(0);',
        'function Button({ onClick, children }) { return <button onClick={onClick}>{children}</button>; }',
        'useEffect(() => { /* side effect */ }, [dependency]);'
      ],
      resources: [
        'https://react.dev/learn',
        'https://react.dev/reference/react',
        'https://www.freecodecamp.org/news/react-beginner-handbook/',
        'https://scrimba.com/learn/learnreact'
      ]
    },
    {
      id: 'web-004',
      category: 'Web Development',
      subcategory: 'Backend',
      topic: 'RESTful APIs',
      content: 'REST (Representational State Transfer) is an architectural style for designing web services. RESTful APIs use HTTP methods (GET, POST, PUT, DELETE) to perform operations on resources. They are stateless, cacheable, and use standard HTTP status codes for responses.',
      keywords: ['rest', 'api', 'http', 'get', 'post', 'put', 'delete', 'json', 'endpoints'],
      difficulty: 'intermediate',
      relatedTopics: ['HTTP', 'JSON', 'Database Design', 'Authentication'],
      examples: [
        'GET /api/users - Retrieve all users',
        'POST /api/users - Create new user',
        'PUT /api/users/123 - Update user with ID 123',
        'DELETE /api/users/123 - Delete user with ID 123'
      ],
      resources: [
        'https://restfulapi.net/',
        'https://developer.mozilla.org/en-US/docs/Glossary/REST',
        'https://www.redhat.com/en/topics/api/what-is-a-rest-api',
        'https://www.postman.com/what-is-an-api/'
      ]
    },

    // DATA SCIENCE & MACHINE LEARNING
    {
      id: 'ds-001',
      category: 'Data Science',
      subcategory: 'Statistics',
      topic: 'Descriptive Statistics',
      content: 'Descriptive statistics summarize and describe data characteristics. Key measures include central tendency (mean, median, mode), variability (range, variance, standard deviation), and distribution shape (skewness, kurtosis). These help understand data patterns before analysis.',
      keywords: ['statistics', 'mean', 'median', 'mode', 'variance', 'standard deviation', 'distribution'],
      difficulty: 'beginner',
      relatedTopics: ['Data Analysis', 'Probability', 'Data Visualization'],
      examples: [
        'Mean: Sum of all values / Number of values',
        'Median: Middle value when data is sorted',
        'Standard Deviation: Measure of data spread',
        'Quartiles: Divide data into four equal parts'
      ],
      resources: [
        'https://www.khanacademy.org/math/statistics-probability',
        'https://www.coursera.org/learn/descriptive-statistics',
        'https://www.statology.org/descriptive-statistics/',
        'https://pandas.pydata.org/docs/user_guide/basics.html#descriptive-statistics'
      ]
    },
    {
      id: 'ds-002',
      category: 'Data Science',
      subcategory: 'Machine Learning',
      topic: 'Supervised vs Unsupervised Learning',
      content: 'Supervised learning uses labeled data to train models for prediction (classification) or estimation (regression). Examples include email spam detection and house price prediction. Unsupervised learning finds patterns in unlabeled data through clustering, dimensionality reduction, or association rules.',
      keywords: ['supervised', 'unsupervised', 'classification', 'regression', 'clustering', 'machine learning'],
      difficulty: 'intermediate',
      relatedTopics: ['Algorithms', 'Data Preprocessing', 'Model Evaluation'],
      examples: [
        'Supervised: Predicting house prices from features',
        'Supervised: Classifying emails as spam/not spam',
        'Unsupervised: Customer segmentation clustering',
        'Unsupervised: Dimensionality reduction with PCA'
      ],
      resources: [
        'https://scikit-learn.org/stable/supervised_learning.html',
        'https://scikit-learn.org/stable/unsupervised_learning.html',
        'https://www.coursera.org/learn/machine-learning',
        'https://www.kaggle.com/learn/intro-to-machine-learning'
      ]
    },
    {
      id: 'ds-003',
      category: 'Data Science',
      subcategory: 'Tools',
      topic: 'Python for Data Science',
      content: 'Python is the leading language for data science due to its rich ecosystem. Key libraries include NumPy (numerical computing), Pandas (data manipulation), Matplotlib/Seaborn (visualization), and Scikit-learn (machine learning). Jupyter notebooks provide interactive development environment.',
      keywords: ['python', 'numpy', 'pandas', 'matplotlib', 'scikit-learn', 'jupyter', 'data analysis'],
      difficulty: 'beginner',
      relatedTopics: ['Programming', 'Statistics', 'Data Visualization'],
      examples: [
        'import pandas as pd; df = pd.read_csv("data.csv")',
        'df.describe() # Statistical summary',
        'df.groupby("category").mean() # Group analysis',
        'plt.hist(df["column"]) # Create histogram'
      ],
      resources: [
        'https://pandas.pydata.org/docs/user_guide/',
        'https://numpy.org/doc/stable/user/',
        'https://matplotlib.org/stable/tutorials/',
        'https://www.kaggle.com/learn/pandas'
      ]
    },

    // CAREER DEVELOPMENT
    {
      id: 'career-001',
      category: 'Career Development',
      subcategory: 'Skills',
      topic: 'Technical Interview Preparation',
      content: 'Technical interviews assess problem-solving skills, coding ability, and system design knowledge. Preparation involves practicing algorithms, data structures, coding problems, and system design scenarios. Key strategies include understanding the problem, thinking aloud, writing clean code, and testing solutions.',
      keywords: ['interview', 'algorithms', 'coding', 'problem solving', 'system design', 'preparation'],
      difficulty: 'intermediate',
      relatedTopics: ['Algorithms', 'Data Structures', 'Communication Skills'],
      examples: [
        'Practice on LeetCode, HackerRank, CodeSignal',
        'Study common patterns: two pointers, sliding window, dynamic programming',
        'Mock interviews with peers or platforms',
        'System design: scalability, databases, caching, load balancing'
      ],
      resources: [
        'https://leetcode.com/',
        'https://www.hackerrank.com/',
        'https://www.crackingthecodinginterview.com/',
        'https://github.com/donnemartin/system-design-primer'
      ]
    },
    {
      id: 'career-002',
      category: 'Career Development',
      subcategory: 'Skills',
      topic: 'Building a Portfolio',
      content: 'A strong portfolio showcases your skills through real projects. Include diverse projects that demonstrate different technologies and problem-solving approaches. Each project should have clear documentation, clean code, live demos, and explanations of challenges overcome.',
      keywords: ['portfolio', 'projects', 'github', 'documentation', 'showcase', 'skills'],
      difficulty: 'beginner',
      relatedTopics: ['Project Management', 'Version Control', 'Communication'],
      examples: [
        'Full-stack web application with database',
        'Data analysis project with visualizations',
        'Mobile app with user authentication',
        'Open source contributions to existing projects'
      ],
      resources: [
        'https://github.com/',
        'https://www.netlify.com/',
        'https://vercel.com/',
        'https://www.freecodecamp.org/news/how-to-build-a-developer-portfolio/'
      ]
    },
    {
      id: 'career-003',
      category: 'Career Development',
      subcategory: 'Networking',
      topic: 'Professional Networking',
      content: 'Professional networking builds relationships that can lead to opportunities, mentorship, and knowledge sharing. Effective networking involves genuine interest in others, providing value, maintaining relationships, and leveraging platforms like LinkedIn, conferences, and meetups.',
      keywords: ['networking', 'linkedin', 'relationships', 'mentorship', 'conferences', 'professional'],
      difficulty: 'beginner',
      relatedTopics: ['Communication Skills', 'Personal Branding', 'Career Planning'],
      examples: [
        'Attend industry meetups and conferences',
        'Engage meaningfully on LinkedIn posts',
        'Offer help and expertise to others',
        'Follow up with new connections within 48 hours'
      ],
      resources: [
        'https://www.linkedin.com/',
        'https://www.meetup.com/',
        'https://eventbrite.com/',
        'https://www.harvard.edu/blog/the-networking-guide/'
      ]
    },

    // STUDY TECHNIQUES
    {
      id: 'study-001',
      category: 'Study Techniques',
      subcategory: 'Learning Methods',
      topic: 'Active Learning Strategies',
      content: 'Active learning engages you directly with the material through questioning, discussion, and application. Techniques include the Feynman Technique (explaining concepts simply), spaced repetition, practice testing, and interleaving different topics. These methods improve retention and understanding.',
      keywords: ['active learning', 'feynman technique', 'spaced repetition', 'practice testing', 'retention'],
      difficulty: 'beginner',
      relatedTopics: ['Memory Techniques', 'Time Management', 'Goal Setting'],
      examples: [
        'Explain concepts to someone else or write them out',
        'Use flashcards with spaced repetition apps',
        'Take practice tests before the real exam',
        'Mix different topics in study sessions'
      ],
      resources: [
        'https://www.coursera.org/learn/learning-how-to-learn',
        'https://ankiweb.net/',
        'https://quizlet.com/',
        'https://www.khanacademy.org/college-careers-more/study-skills'
      ]
    },
    {
      id: 'study-002',
      category: 'Study Techniques',
      subcategory: 'Time Management',
      topic: 'Pomodoro Technique',
      content: 'The Pomodoro Technique breaks work into focused 25-minute intervals followed by 5-minute breaks. After four pomodoros, take a longer 15-30 minute break. This method improves focus, reduces mental fatigue, and provides a sense of accomplishment through completed intervals.',
      keywords: ['pomodoro', 'time management', 'focus', 'breaks', 'productivity', 'intervals'],
      difficulty: 'beginner',
      relatedTopics: ['Study Planning', 'Concentration', 'Work-Life Balance'],
      examples: [
        '25 minutes focused study + 5 minute break',
        'Use timer apps like Forest, Focus Keeper',
        'Track completed pomodoros for motivation',
        'Adjust intervals based on task complexity'
      ],
      resources: [
        'https://francescocirillo.com/pages/pomodoro-technique',
        'https://pomofocus.io/',
        'https://www.forestapp.cc/',
        'https://toggl.com/track/pomodoro-timer/'
      ]
    },

    // PROBLEM SOLVING
    {
      id: 'problem-001',
      category: 'Problem Solving',
      subcategory: 'Methodology',
      topic: 'Systematic Problem Solving',
      content: 'Systematic problem solving follows a structured approach: 1) Define the problem clearly, 2) Gather relevant information, 3) Generate multiple solutions, 4) Evaluate options, 5) Implement the best solution, 6) Monitor and adjust. This methodology works for technical and non-technical challenges.',
      keywords: ['problem solving', 'methodology', 'analysis', 'solutions', 'evaluation', 'implementation'],
      difficulty: 'intermediate',
      relatedTopics: ['Critical Thinking', 'Decision Making', 'Project Management'],
      examples: [
        'Break complex problems into smaller parts',
        'Use root cause analysis (5 Whys technique)',
        'Consider multiple perspectives and stakeholders',
        'Document lessons learned for future problems'
      ],
      resources: [
        'https://www.mindtools.com/pages/article/newTMC_5W.htm',
        'https://www.coursera.org/learn/problem-solving',
        'https://www.edx.org/course/critical-thinking-problem-solving',
        'https://hbr.org/2017/01/are-you-solving-the-right-problems'
      ]
    },

    // TECHNOLOGY TRENDS
    {
      id: 'tech-001',
      category: 'Technology Trends',
      subcategory: 'Artificial Intelligence',
      topic: 'Generative AI and LLMs',
      content: 'Large Language Models (LLMs) like GPT, Claude, and others are transforming how we interact with technology. They can generate text, code, and creative content. Understanding prompt engineering, limitations, and ethical considerations is crucial for leveraging these tools effectively in education and work.',
      keywords: ['ai', 'llm', 'gpt', 'generative ai', 'prompt engineering', 'machine learning'],
      difficulty: 'intermediate',
      relatedTopics: ['Machine Learning', 'Natural Language Processing', 'Ethics in AI'],
      examples: [
        'Use specific, detailed prompts for better results',
        'Understand hallucination and fact-checking needs',
        'Apply AI for brainstorming, coding assistance, learning',
        'Consider privacy and data security implications'
      ],
      resources: [
        'https://platform.openai.com/docs/',
        'https://www.anthropic.com/claude',
        'https://www.promptingguide.ai/',
        'https://www.deeplearning.ai/short-courses/'
      ]
    },
    {
      id: 'tech-002',
      category: 'Technology Trends',
      subcategory: 'Cloud Computing',
      topic: 'Cloud-First Development',
      content: 'Cloud-first development leverages cloud services from the start rather than migrating later. Benefits include scalability, cost efficiency, global reach, and access to managed services. Key concepts include Infrastructure as Code, microservices, serverless computing, and DevOps practices.',
      keywords: ['cloud', 'aws', 'azure', 'gcp', 'serverless', 'microservices', 'devops'],
      difficulty: 'intermediate',
      relatedTopics: ['DevOps', 'System Architecture', 'Security'],
      examples: [
        'Use AWS Lambda for serverless functions',
        'Deploy with Docker containers on Kubernetes',
        'Implement CI/CD pipelines with cloud tools',
        'Monitor applications with cloud observability'
      ],
      resources: [
        'https://aws.amazon.com/getting-started/',
        'https://azure.microsoft.com/en-us/get-started/',
        'https://cloud.google.com/docs',
        'https://www.coursera.org/learn/aws-fundamentals-going-cloud-native'
      ]
    }
  ]

  // Enhanced search with better matching
  static searchKnowledge(query: string, category?: string): KnowledgeEntry[] {
    const searchTerms = query.toLowerCase().split(' ').filter(term => term.length > 2)
    
    const results = this.knowledge.map(entry => {
      // Category filter
      if (category && entry.category.toLowerCase() !== category.toLowerCase()) {
        return { entry, score: 0 }
      }
      
      let score = 0
      const searchableText = [
        entry.topic,
        entry.content,
        entry.subcategory,
        ...entry.keywords
      ].join(' ').toLowerCase()
      
      // Exact topic match gets highest score
      if (entry.topic.toLowerCase().includes(query.toLowerCase()) || 
          query.toLowerCase().includes(entry.topic.toLowerCase())) {
        score += 100
      }
      
      // Primary keyword exact matches (highest priority)
      entry.keywords.forEach(keyword => {
        const keywordLower = keyword.toLowerCase()
        const queryLower = query.toLowerCase()
        
        // Exact keyword match in query
        if (queryLower.includes(keywordLower)) {
          score += 80
        }
        // Query word matches keyword
        searchTerms.forEach(term => {
          if (keywordLower === term || keywordLower.includes(term)) {
            score += 60
          }
        })
      })
      
      // Content and topic partial matches
      searchTerms.forEach(term => {
        if (searchableText.includes(term)) {
          score += 15
        }
        // Boost score for important terms in topic
        if (entry.topic.toLowerCase().includes(term)) {
          score += 40
        }
      })
      
      // Specific question pattern matching with higher precision
      const questionPatterns = [
        {
          patterns: ['what is html', 'html', 'hypertext', 'markup', 'web page', 'tags', 'elements'],
          targetKeywords: ['html', 'markup', 'tags', 'elements', 'web'],
          boost: 90
        },
        {
          patterns: ['variable', 'data type', 'string', 'number', 'boolean'],
          targetKeywords: ['variables', 'data types', 'string', 'number', 'boolean'],
          boost: 90
        },
        {
          patterns: ['function', 'method', 'parameter', 'return'],
          targetKeywords: ['functions', 'methods', 'parameters', 'return'],
          boost: 90
        },
        {
          patterns: ['react', 'component', 'jsx', 'hook', 'state'],
          targetKeywords: ['react', 'components', 'jsx', 'hooks', 'state'],
          boost: 90
        },
        {
          patterns: ['css', 'style', 'flexbox', 'grid', 'layout'],
          targetKeywords: ['css', 'flexbox', 'grid', 'layout', 'styling'],
          boost: 90
        },
        {
          patterns: ['big o', 'complexity', 'algorithm', 'performance'],
          targetKeywords: ['big o', 'complexity', 'algorithm', 'performance'],
          boost: 90
        },
        {
          patterns: ['api', 'rest', 'endpoint', 'http'],
          targetKeywords: ['api', 'rest', 'http', 'endpoints'],
          boost: 90
        },
        {
          patterns: ['machine learning', 'ml', 'supervised', 'unsupervised'],
          targetKeywords: ['machine learning', 'supervised', 'unsupervised', 'classification'],
          boost: 90
        },
        {
          patterns: ['interview', 'preparation', 'technical interview'],
          targetKeywords: ['interview', 'preparation', 'coding'],
          boost: 90
        },
        {
          patterns: ['study', 'learning', 'technique', 'method'],
          targetKeywords: ['study', 'learning', 'active learning', 'retention'],
          boost: 90
        }
      ]
      
      questionPatterns.forEach(pattern => {
        const queryLower = query.toLowerCase()
        const hasPatternMatch = pattern.patterns.some(p => queryLower.includes(p))
        
        if (hasPatternMatch) {
          const hasTargetKeywords = pattern.targetKeywords.some(keyword => 
            entry.keywords.some(entryKeyword => 
              entryKeyword.toLowerCase().includes(keyword) || keyword.includes(entryKeyword.toLowerCase())
            )
          )
          
          if (hasTargetKeywords) {
            score += pattern.boost
          }
        }
      })
      
      return { entry, score }
    })
    
    return results
      .filter(result => result.score > 0)
      .sort((a, b) => b.score - a.score)
      .map(result => result.entry)
      .slice(0, 5)
  }

  // Get knowledge by category
  static getByCategory(category: string): KnowledgeEntry[] {
    return this.knowledge.filter(entry => 
      entry.category.toLowerCase() === category.toLowerCase()
    )
  }

  // Get all categories
  static getCategories(): string[] {
    return [...new Set(this.knowledge.map(entry => entry.category))]
  }

  // Get random knowledge entry for exploration
  static getRandomEntry(): KnowledgeEntry {
    return this.knowledge[Math.floor(Math.random() * this.knowledge.length)]
  }

  // Get related topics
  static getRelatedEntries(entryId: string): KnowledgeEntry[] {
    const entry = this.knowledge.find(e => e.id === entryId)
    if (!entry) return []
    
    return this.knowledge.filter(e => 
      e.id !== entryId && (
        entry.relatedTopics.some(topic => 
          e.topic.toLowerCase().includes(topic.toLowerCase()) ||
          e.keywords.some(keyword => keyword.toLowerCase().includes(topic.toLowerCase()))
        )
      )
    ).slice(0, 3)
  }
}

export default KnowledgeBase