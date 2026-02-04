// COMPREHENSIVE AI Services with PROPER ROADMAPS - HACKATHON WINNING VERSION!

import KnowledgeBase from './knowledgeBase'

// Career Guidance AI Service with COMPLETE ROADMAPS
export class CareerAIService {
  static generateCareerQuiz() {
    const questions = [
      {
        id: '1',
        question: 'What type of work environment energizes you most?',
        type: 'multiple_choice' as const,
        options: [
          'Collaborative team settings with frequent interaction',
          'Independent work with minimal supervision',
          'Fast-paced, dynamic environments with constant change',
          'Structured, organized environments with clear processes'
        ]
      },
      {
        id: '2',
        question: 'Which activities do you find most engaging?',
        type: 'multiple_choice' as const,
        options: [
          'Solving complex technical problems and coding',
          'Creating and designing user interfaces',
          'Analyzing data and finding patterns',
          'Leading teams and making strategic decisions'
        ]
      },
      {
        id: '3',
        question: 'What motivates you most in your work?',
        type: 'multiple_choice' as const,
        options: [
          'Making a positive impact on users and society',
          'Continuous learning and skill development',
          'Financial success and career advancement',
          'Creative expression and innovation'
        ]
      },
      {
        id: '4',
        question: 'How do you prefer to communicate ideas?',
        type: 'multiple_choice' as const,
        options: [
          'Visual presentations and design mockups',
          'Written documentation and technical reports',
          'Verbal discussions and collaborative meetings',
          'Hands-on demonstrations and prototypes'
        ]
      },
      {
        id: '5',
        question: 'What type of challenges excite you most?',
        type: 'multiple_choice' as const,
        options: [
          'Technical puzzles and programming problems',
          'Strategic planning and business decisions',
          'Creative design and user experience challenges',
          'Data analysis and research discovery'
        ]
      },
      {
        id: '6',
        question: 'Which technology area interests you most?',
        type: 'multiple_choice' as const,
        options: [
          'Web development and user interfaces',
          'Data science and machine learning',
          'Mobile app development',
          'Cloud computing and infrastructure'
        ]
      },
      {
        id: '7',
        question: 'What size company would you prefer to work for?',
        type: 'multiple_choice' as const,
        options: [
          'Large corporation with established processes',
          'Medium company with growth opportunities',
          'Small startup with diverse responsibilities',
          'Freelance/consulting with multiple clients'
        ]
      },
      {
        id: '8',
        question: 'How do you approach learning new skills?',
        type: 'multiple_choice' as const,
        options: [
          'Hands-on practice and experimentation',
          'Structured courses and certifications',
          'Reading documentation and research papers',
          'Learning from mentors and peer collaboration'
        ]
      },
      {
        id: '9',
        question: 'What aspect of technology excites you most?',
        type: 'multiple_choice' as const,
        options: [
          'Building applications that users interact with',
          'Securing systems and protecting data',
          'Automating processes and infrastructure',
          'Analyzing data to drive business decisions'
        ]
      },
      {
        id: '10',
        question: 'Which work-life balance appeals to you?',
        type: 'multiple_choice' as const,
        options: [
          'Traditional 9-5 with clear boundaries',
          'Flexible hours with project-based deadlines',
          'Varied schedule with travel opportunities',
          'Remote work with global team collaboration'
        ]
      }
    ]

    return questions
  }

  static generateCareerRecommendations(responses: any[]) {
    // COMPREHENSIVE CAREER PATHS WITH COMPLETE ROADMAPS
    const careerPaths = [
      {
        careerPath: 'Full-Stack Software Engineer',
        baseScore: 85,
        keywords: ['technical', 'coding', 'problem', 'web', 'structured', 'collaborative', 'programming'],
        interests: ['Web Development', 'Programming', 'Technology', 'Problem Solving'],
        reasoning: 'Your analytical thinking and technical problem-solving skills align perfectly with full-stack development.',
        pros: ['High demand', 'Competitive salary', 'Remote work opportunities', 'Continuous learning'],
        cons: ['Can be stressful', 'Requires constant skill updates', 'Long hours during deadlines'],
        roadmap: {
          milestones: [
            {
              id: '1',
              title: 'Programming Fundamentals',
              description: 'Master core programming concepts, data structures, and algorithms',
              completed: false,
              estimatedHours: 120,
              resources: [
                { id: '1', title: 'JavaScript Complete Course', type: 'course' as const, url: 'https://javascript.info/', description: 'Comprehensive JS fundamentals', difficulty: 'beginner' as const, estimatedTime: 40 },
                { id: '2', title: 'Data Structures & Algorithms', type: 'course' as const, url: 'https://leetcode.com/', description: 'CS fundamentals with practice', difficulty: 'intermediate' as const, estimatedTime: 60 },
                { id: '3', title: 'FreeCodeCamp JavaScript', type: 'course' as const, url: 'https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/', description: 'Free interactive JavaScript course', difficulty: 'beginner' as const, estimatedTime: 50 }
              ]
            },
            {
              id: '2',
              title: 'Frontend Development Mastery',
              description: 'Build modern, responsive user interfaces with React and modern CSS',
              completed: false,
              estimatedHours: 100,
              resources: [
                { id: '4', title: 'React Official Tutorial', type: 'course' as const, url: 'https://react.dev/learn', description: 'Official React documentation and tutorial', difficulty: 'intermediate' as const, estimatedTime: 30 },
                { id: '5', title: 'CSS Grid & Flexbox', type: 'course' as const, url: 'https://cssgrid.io/', description: 'Master modern CSS layout', difficulty: 'beginner' as const, estimatedTime: 20 },
                { id: '6', title: 'TypeScript Handbook', type: 'course' as const, url: 'https://www.typescriptlang.org/docs/', description: 'Learn TypeScript for better code', difficulty: 'intermediate' as const, estimatedTime: 25 }
              ]
            },
            {
              id: '3',
              title: 'Backend Development & APIs',
              description: 'Learn server-side development, databases, and API design',
              completed: false,
              estimatedHours: 120,
              resources: [
                { id: '7', title: 'Node.js Complete Guide', type: 'course' as const, url: 'https://nodejs.org/en/docs/', description: 'Official Node.js documentation', difficulty: 'intermediate' as const, estimatedTime: 40 },
                { id: '8', title: 'Express.js Tutorial', type: 'course' as const, url: 'https://expressjs.com/en/starter/installing.html', description: 'Build REST APIs with Express', difficulty: 'intermediate' as const, estimatedTime: 30 },
                { id: '9', title: 'MongoDB University', type: 'course' as const, url: 'https://university.mongodb.com/', description: 'Free MongoDB courses', difficulty: 'beginner' as const, estimatedTime: 35 }
              ]
            },
            {
              id: '4',
              title: 'Full-Stack Project Development',
              description: 'Build complete applications combining frontend and backend',
              completed: false,
              estimatedHours: 80,
              resources: [
                { id: '10', title: 'Full Stack Open', type: 'course' as const, url: 'https://fullstackopen.com/en/', description: 'University of Helsinki full-stack course', difficulty: 'advanced' as const, estimatedTime: 60 },
                { id: '11', title: 'The Odin Project', type: 'course' as const, url: 'https://www.theodinproject.com/', description: 'Complete web development curriculum', difficulty: 'intermediate' as const, estimatedTime: 80 }
              ]
            },
            {
              id: '5',
              title: 'DevOps & Deployment',
              description: 'Learn deployment, CI/CD, and production best practices',
              completed: false,
              estimatedHours: 60,
              resources: [
                { id: '12', title: 'Docker Getting Started', type: 'course' as const, url: 'https://docs.docker.com/get-started/', description: 'Containerization basics', difficulty: 'intermediate' as const, estimatedTime: 20 },
                { id: '13', title: 'GitHub Actions', type: 'course' as const, url: 'https://docs.github.com/en/actions', description: 'CI/CD with GitHub Actions', difficulty: 'intermediate' as const, estimatedTime: 15 },
                { id: '14', title: 'Vercel Deployment', type: 'course' as const, url: 'https://vercel.com/docs', description: 'Deploy applications easily', difficulty: 'beginner' as const, estimatedTime: 10 }
              ]
            }
          ],
          estimatedDuration: 12,
          difficulty: 'intermediate' as const,
          prerequisites: ['Basic computer skills', 'Logical thinking', 'Problem-solving mindset']
        },
        marketData: {
          demand: 'very_high' as const,
          growth: 22,
          jobOpenings: 50000,
          competitionLevel: 'medium' as const
        },
        salaryRange: {
          min: 70000,
          max: 150000,
          median: 95000,
          currency: 'USD',
          location: 'US Average'
        }
      },
      {
        careerPath: 'Data Scientist',
        baseScore: 78,
        keywords: ['data', 'analysis', 'research', 'patterns', 'scientific', 'mathematical', 'statistics'],
        interests: ['Data Analysis', 'Machine Learning', 'Research', 'Statistics', 'Mathematics'],
        reasoning: 'Your analytical mindset and interest in patterns make you well-suited for data science.',
        pros: ['High growth field', 'Excellent salary', 'Diverse applications', 'Research opportunities'],
        cons: ['Requires strong math skills', 'Data quality challenges', 'Complex stakeholder management'],
        roadmap: {
          milestones: [
            {
              id: '1',
              title: 'Statistics and Mathematics Foundation',
              description: 'Master statistical concepts, linear algebra, and calculus fundamentals',
              completed: false,
              estimatedHours: 150,
              resources: [
                { id: '15', title: 'Khan Academy Statistics', type: 'course' as const, url: 'https://www.khanacademy.org/math/statistics-probability', description: 'Free comprehensive statistics course', difficulty: 'beginner' as const, estimatedTime: 60 },
                { id: '16', title: 'Linear Algebra - MIT OpenCourseWare', type: 'course' as const, url: 'https://ocw.mit.edu/courses/18-06-linear-algebra-spring-2010/', description: 'Complete linear algebra course', difficulty: 'intermediate' as const, estimatedTime: 50 },
                { id: '17', title: 'Calculus - Khan Academy', type: 'course' as const, url: 'https://www.khanacademy.org/math/calculus-1', description: 'Calculus fundamentals', difficulty: 'intermediate' as const, estimatedTime: 40 }
              ]
            },
            {
              id: '2',
              title: 'Python for Data Science',
              description: 'Learn Python programming with focus on data analysis libraries',
              completed: false,
              estimatedHours: 120,
              resources: [
                { id: '18', title: 'Python for Data Science Handbook', type: 'book' as const, url: 'https://jakevdp.github.io/PythonDataScienceHandbook/', description: 'Comprehensive Python data science guide', difficulty: 'intermediate' as const, estimatedTime: 60 },
                { id: '19', title: 'Pandas Documentation', type: 'documentation' as const, url: 'https://pandas.pydata.org/docs/', description: 'Official Pandas library documentation', difficulty: 'intermediate' as const, estimatedTime: 30 },
                { id: '20', title: 'NumPy Quickstart', type: 'tutorial' as const, url: 'https://numpy.org/doc/stable/user/quickstart.html', description: 'NumPy fundamentals', difficulty: 'beginner' as const, estimatedTime: 20 }
              ]
            },
            {
              id: '3',
              title: 'Data Visualization and Analysis',
              description: 'Master data visualization tools and exploratory data analysis techniques',
              completed: false,
              estimatedHours: 100,
              resources: [
                { id: '21', title: 'Matplotlib Tutorials', type: 'tutorial' as const, url: 'https://matplotlib.org/stable/tutorials/index.html', description: 'Complete matplotlib guide', difficulty: 'intermediate' as const, estimatedTime: 30 },
                { id: '22', title: 'Seaborn Tutorial', type: 'tutorial' as const, url: 'https://seaborn.pydata.org/tutorial.html', description: 'Statistical data visualization', difficulty: 'intermediate' as const, estimatedTime: 25 },
                { id: '23', title: 'Plotly Documentation', type: 'documentation' as const, url: 'https://plotly.com/python/', description: 'Interactive visualizations', difficulty: 'intermediate' as const, estimatedTime: 35 }
              ]
            },
            {
              id: '4',
              title: 'Machine Learning Fundamentals',
              description: 'Learn core machine learning algorithms and model evaluation',
              completed: false,
              estimatedHours: 140,
              resources: [
                { id: '24', title: 'Scikit-learn User Guide', type: 'documentation' as const, url: 'https://scikit-learn.org/stable/user_guide.html', description: 'Complete ML library guide', difficulty: 'intermediate' as const, estimatedTime: 50 },
                { id: '25', title: 'Andrew Ng ML Course', type: 'course' as const, url: 'https://www.coursera.org/learn/machine-learning', description: 'Stanford ML course on Coursera', difficulty: 'intermediate' as const, estimatedTime: 60 },
                { id: '26', title: 'Hands-On ML Book', type: 'book' as const, url: 'https://github.com/ageron/handson-ml2', description: 'Practical ML with Python', difficulty: 'advanced' as const, estimatedTime: 80 }
              ]
            },
            {
              id: '5',
              title: 'Advanced ML and Deep Learning',
              description: 'Explore deep learning, neural networks, and advanced ML techniques',
              completed: false,
              estimatedHours: 160,
              resources: [
                { id: '27', title: 'TensorFlow Tutorials', type: 'tutorial' as const, url: 'https://www.tensorflow.org/tutorials', description: 'Official TensorFlow guides', difficulty: 'advanced' as const, estimatedTime: 60 },
                { id: '28', title: 'PyTorch Tutorials', type: 'tutorial' as const, url: 'https://pytorch.org/tutorials/', description: 'PyTorch deep learning', difficulty: 'advanced' as const, estimatedTime: 50 },
                { id: '29', title: 'Deep Learning Specialization', type: 'course' as const, url: 'https://www.coursera.org/specializations/deep-learning', description: 'Andrew Ng deep learning course', difficulty: 'advanced' as const, estimatedTime: 100 }
              ]
            },
            {
              id: '6',
              title: 'Data Engineering and MLOps',
              description: 'Learn to deploy models and build data pipelines for production',
              completed: false,
              estimatedHours: 120,
              resources: [
                { id: '30', title: 'MLflow Documentation', type: 'documentation' as const, url: 'https://mlflow.org/docs/latest/index.html', description: 'ML lifecycle management', difficulty: 'advanced' as const, estimatedTime: 40 },
                { id: '31', title: 'Apache Airflow Tutorial', type: 'tutorial' as const, url: 'https://airflow.apache.org/docs/apache-airflow/stable/tutorial.html', description: 'Workflow orchestration', difficulty: 'advanced' as const, estimatedTime: 50 },
                { id: '32', title: 'Docker for Data Science', type: 'course' as const, url: 'https://docs.docker.com/get-started/', description: 'Containerization for ML', difficulty: 'intermediate' as const, estimatedTime: 30 }
              ]
            }
          ],
          estimatedDuration: 18,
          difficulty: 'advanced' as const,
          prerequisites: ['Strong math background', 'Programming experience', 'Statistical thinking']
        },
        marketData: {
          demand: 'very_high' as const,
          growth: 35,
          jobOpenings: 25000,
          competitionLevel: 'high' as const
        },
        salaryRange: {
          min: 80000,
          max: 180000,
          median: 120000,
          currency: 'USD',
          location: 'US Average'
        }
      }
    ]

    // Enhanced scoring algorithm - only return top matches
    const scoredCareers = careerPaths.map(career => {
      let score = career.baseScore
      
      // Boost score based on keyword matches in responses
      responses.forEach(response => {
        if (typeof response.answer === 'string') {
          const answerLower = response.answer.toLowerCase()
          career.keywords.forEach(keyword => {
            if (answerLower.includes(keyword)) {
              score += 8
            }
          })
          
          // Bonus for interest alignment
          career.interests.forEach(interest => {
            if (answerLower.includes(interest.toLowerCase())) {
              score += 15
            }
          })
        }
      })

      // Add some randomization for demo variety
      score += Math.random() * 10 - 5

      return {
        ...career,
        compatibilityScore: Math.min(Math.max(score, 0), 100)
      }
    }).sort((a, b) => b.compatibilityScore - a.compatibilityScore)

    // Return only top 5 matches for personalized results
    return scoredCareers.slice(0, 5)
  }

  // Get all career paths for exploration
  static getAllCareerPaths() {
    return [
      // FULL COMPREHENSIVE LIST WITH COMPLETE ROADMAPS
      {
        careerPath: 'Full-Stack Software Engineer',
        baseScore: 85,
        keywords: ['technical', 'coding', 'problem', 'web', 'structured', 'collaborative', 'programming'],
        interests: ['Web Development', 'Programming', 'Technology', 'Problem Solving'],
        reasoning: 'Your analytical thinking and technical problem-solving skills align perfectly with full-stack development.',
        pros: ['High demand', 'Competitive salary', 'Remote work opportunities', 'Continuous learning'],
        cons: ['Can be stressful', 'Requires constant skill updates', 'Long hours during deadlines'],
        roadmap: {
          milestones: [
            {
              id: '1',
              title: 'Programming Fundamentals',
              description: 'Master core programming concepts, data structures, and algorithms',
              completed: false,
              estimatedHours: 120,
              resources: [
                { id: '1', title: 'JavaScript Complete Course', type: 'course' as const, url: 'https://javascript.info/', description: 'Comprehensive JS fundamentals', difficulty: 'beginner' as const, estimatedTime: 40 },
                { id: '2', title: 'Data Structures & Algorithms', type: 'course' as const, url: 'https://leetcode.com/', description: 'CS fundamentals with practice', difficulty: 'intermediate' as const, estimatedTime: 60 },
                { id: '3', title: 'FreeCodeCamp JavaScript', type: 'course' as const, url: 'https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/', description: 'Free interactive JavaScript course', difficulty: 'beginner' as const, estimatedTime: 50 }
              ]
            },
            {
              id: '2',
              title: 'Frontend Development Mastery',
              description: 'Build modern, responsive user interfaces with React and modern CSS',
              completed: false,
              estimatedHours: 100,
              resources: [
                { id: '4', title: 'React Official Tutorial', type: 'course' as const, url: 'https://react.dev/learn', description: 'Official React documentation and tutorial', difficulty: 'intermediate' as const, estimatedTime: 30 },
                { id: '5', title: 'CSS Grid & Flexbox', type: 'course' as const, url: 'https://cssgrid.io/', description: 'Master modern CSS layout', difficulty: 'beginner' as const, estimatedTime: 20 },
                { id: '6', title: 'TypeScript Handbook', type: 'course' as const, url: 'https://www.typescriptlang.org/docs/', description: 'Learn TypeScript for better code', difficulty: 'intermediate' as const, estimatedTime: 25 }
              ]
            },
            {
              id: '3',
              title: 'Backend Development & APIs',
              description: 'Learn server-side development, databases, and API design',
              completed: false,
              estimatedHours: 120,
              resources: [
                { id: '7', title: 'Node.js Complete Guide', type: 'course' as const, url: 'https://nodejs.org/en/docs/', description: 'Official Node.js documentation', difficulty: 'intermediate' as const, estimatedTime: 40 },
                { id: '8', title: 'Express.js Tutorial', type: 'course' as const, url: 'https://expressjs.com/en/starter/installing.html', description: 'Build REST APIs with Express', difficulty: 'intermediate' as const, estimatedTime: 30 },
                { id: '9', title: 'MongoDB University', type: 'course' as const, url: 'https://university.mongodb.com/', description: 'Free MongoDB courses', difficulty: 'beginner' as const, estimatedTime: 35 }
              ]
            },
            {
              id: '4',
              title: 'Full-Stack Project Development',
              description: 'Build complete applications combining frontend and backend',
              completed: false,
              estimatedHours: 80,
              resources: [
                { id: '10', title: 'Full Stack Open', type: 'course' as const, url: 'https://fullstackopen.com/en/', description: 'University of Helsinki full-stack course', difficulty: 'advanced' as const, estimatedTime: 60 },
                { id: '11', title: 'The Odin Project', type: 'course' as const, url: 'https://www.theodinproject.com/', description: 'Complete web development curriculum', difficulty: 'intermediate' as const, estimatedTime: 80 }
              ]
            },
            {
              id: '5',
              title: 'DevOps & Deployment',
              description: 'Learn deployment, CI/CD, and production best practices',
              completed: false,
              estimatedHours: 60,
              resources: [
                { id: '12', title: 'Docker Getting Started', type: 'course' as const, url: 'https://docs.docker.com/get-started/', description: 'Containerization basics', difficulty: 'intermediate' as const, estimatedTime: 20 },
                { id: '13', title: 'GitHub Actions', type: 'course' as const, url: 'https://docs.github.com/en/actions', description: 'CI/CD with GitHub Actions', difficulty: 'intermediate' as const, estimatedTime: 15 },
                { id: '14', title: 'Vercel Deployment', type: 'course' as const, url: 'https://vercel.com/docs', description: 'Deploy applications easily', difficulty: 'beginner' as const, estimatedTime: 10 }
              ]
            }
          ],
          estimatedDuration: 12,
          difficulty: 'intermediate' as const,
          prerequisites: ['Basic computer skills', 'Logical thinking', 'Problem-solving mindset']
        },
        marketData: {
          demand: 'very_high' as const,
          growth: 22,
          jobOpenings: 50000,
          competitionLevel: 'medium' as const
        },
        salaryRange: {
          min: 70000,
          max: 150000,
          median: 95000,
          currency: 'USD',
          location: 'US Average'
        }
      },
      {
        careerPath: 'Data Scientist',
        baseScore: 78,
        keywords: ['data', 'analysis', 'research', 'patterns', 'scientific', 'mathematical', 'statistics'],
        interests: ['Data Analysis', 'Machine Learning', 'Research', 'Statistics', 'Mathematics'],
        reasoning: 'Your analytical mindset and interest in patterns make you well-suited for data science.',
        pros: ['High growth field', 'Excellent salary', 'Diverse applications', 'Research opportunities'],
        cons: ['Requires strong math skills', 'Data quality challenges', 'Complex stakeholder management'],
        roadmap: {
          milestones: [
            {
              id: '1',
              title: 'Statistics and Mathematics Foundation',
              description: 'Master statistical concepts, linear algebra, and calculus fundamentals',
              completed: false,
              estimatedHours: 150,
              resources: [
                { id: '15', title: 'Khan Academy Statistics', type: 'course' as const, url: 'https://www.khanacademy.org/math/statistics-probability', description: 'Free comprehensive statistics course', difficulty: 'beginner' as const, estimatedTime: 60 },
                { id: '16', title: 'Linear Algebra - MIT OpenCourseWare', type: 'course' as const, url: 'https://ocw.mit.edu/courses/18-06-linear-algebra-spring-2010/', description: 'Complete linear algebra course', difficulty: 'intermediate' as const, estimatedTime: 50 },
                { id: '17', title: 'Calculus - Khan Academy', type: 'course' as const, url: 'https://www.khanacademy.org/math/calculus-1', description: 'Calculus fundamentals', difficulty: 'intermediate' as const, estimatedTime: 40 }
              ]
            },
            {
              id: '2',
              title: 'Python for Data Science',
              description: 'Learn Python programming with focus on data analysis libraries',
              completed: false,
              estimatedHours: 120,
              resources: [
                { id: '18', title: 'Python for Data Science Handbook', type: 'book' as const, url: 'https://jakevdp.github.io/PythonDataScienceHandbook/', description: 'Comprehensive Python data science guide', difficulty: 'intermediate' as const, estimatedTime: 60 },
                { id: '19', title: 'Pandas Documentation', type: 'documentation' as const, url: 'https://pandas.pydata.org/docs/', description: 'Official Pandas library documentation', difficulty: 'intermediate' as const, estimatedTime: 30 },
                { id: '20', title: 'NumPy Quickstart', type: 'tutorial' as const, url: 'https://numpy.org/doc/stable/user/quickstart.html', description: 'NumPy fundamentals', difficulty: 'beginner' as const, estimatedTime: 20 }
              ]
            },
            {
              id: '3',
              title: 'Data Visualization and Analysis',
              description: 'Master data visualization tools and exploratory data analysis techniques',
              completed: false,
              estimatedHours: 100,
              resources: [
                { id: '21', title: 'Matplotlib Tutorials', type: 'tutorial' as const, url: 'https://matplotlib.org/stable/tutorials/index.html', description: 'Complete matplotlib guide', difficulty: 'intermediate' as const, estimatedTime: 30 },
                { id: '22', title: 'Seaborn Tutorial', type: 'tutorial' as const, url: 'https://seaborn.pydata.org/tutorial.html', description: 'Statistical data visualization', difficulty: 'intermediate' as const, estimatedTime: 25 },
                { id: '23', title: 'Plotly Documentation', type: 'documentation' as const, url: 'https://plotly.com/python/', description: 'Interactive visualizations', difficulty: 'intermediate' as const, estimatedTime: 35 }
              ]
            },
            {
              id: '4',
              title: 'Machine Learning Fundamentals',
              description: 'Learn core machine learning algorithms and model evaluation',
              completed: false,
              estimatedHours: 140,
              resources: [
                { id: '24', title: 'Scikit-learn User Guide', type: 'documentation' as const, url: 'https://scikit-learn.org/stable/user_guide.html', description: 'Complete ML library guide', difficulty: 'intermediate' as const, estimatedTime: 50 },
                { id: '25', title: 'Andrew Ng ML Course', type: 'course' as const, url: 'https://www.coursera.org/learn/machine-learning', description: 'Stanford ML course on Coursera', difficulty: 'intermediate' as const, estimatedTime: 60 },
                { id: '26', title: 'Hands-On ML Book', type: 'book' as const, url: 'https://github.com/ageron/handson-ml2', description: 'Practical ML with Python', difficulty: 'advanced' as const, estimatedTime: 80 }
              ]
            },
            {
              id: '5',
              title: 'Advanced ML and Deep Learning',
              description: 'Explore deep learning, neural networks, and advanced ML techniques',
              completed: false,
              estimatedHours: 160,
              resources: [
                { id: '27', title: 'TensorFlow Tutorials', type: 'tutorial' as const, url: 'https://www.tensorflow.org/tutorials', description: 'Official TensorFlow guides', difficulty: 'advanced' as const, estimatedTime: 60 },
                { id: '28', title: 'PyTorch Tutorials', type: 'tutorial' as const, url: 'https://pytorch.org/tutorials/', description: 'PyTorch deep learning', difficulty: 'advanced' as const, estimatedTime: 50 },
                { id: '29', title: 'Deep Learning Specialization', type: 'course' as const, url: 'https://www.coursera.org/specializations/deep-learning', description: 'Andrew Ng deep learning course', difficulty: 'advanced' as const, estimatedTime: 100 }
              ]
            },
            {
              id: '6',
              title: 'Data Engineering and MLOps',
              description: 'Learn to deploy models and build data pipelines for production',
              completed: false,
              estimatedHours: 120,
              resources: [
                { id: '30', title: 'MLflow Documentation', type: 'documentation' as const, url: 'https://mlflow.org/docs/latest/index.html', description: 'ML lifecycle management', difficulty: 'advanced' as const, estimatedTime: 40 },
                { id: '31', title: 'Apache Airflow Tutorial', type: 'tutorial' as const, url: 'https://airflow.apache.org/docs/apache-airflow/stable/tutorial.html', description: 'Workflow orchestration', difficulty: 'advanced' as const, estimatedTime: 50 },
                { id: '32', title: 'Docker for Data Science', type: 'course' as const, url: 'https://docs.docker.com/get-started/', description: 'Containerization for ML', difficulty: 'intermediate' as const, estimatedTime: 30 }
              ]
            }
          ],
          estimatedDuration: 18,
          difficulty: 'advanced' as const,
          prerequisites: ['Strong math background', 'Programming experience', 'Statistical thinking']
        },
        marketData: {
          demand: 'very_high' as const,
          growth: 35,
          jobOpenings: 25000,
          competitionLevel: 'high' as const
        },
        salaryRange: {
          min: 80000,
          max: 180000,
          median: 120000,
          currency: 'USD',
          location: 'US Average'
        }
      },
      {
        careerPath: 'UX/UI Designer',
        baseScore: 72,
        keywords: ['creative', 'design', 'user', 'visual', 'communication', 'empathy', 'aesthetic'],
        interests: ['Design', 'User Experience', 'Visual Arts', 'Psychology', 'Creativity'],
        reasoning: 'Your creative thinking and user empathy align perfectly with UX design principles.',
        pros: ['Creative fulfillment', 'User impact', 'Growing field', 'Diverse industries'],
        cons: ['Subjective feedback', 'Tight deadlines', 'Requires portfolio maintenance'],
        roadmap: {
          milestones: [
            {
              id: '1',
              title: 'Design Fundamentals',
              description: 'Learn design principles, color theory, and typography',
              completed: false,
              estimatedHours: 80,
              resources: [
                { id: '33', title: 'Design Principles Guide', type: 'course' as const, url: 'https://design-principles.org/', description: 'Core design fundamentals', difficulty: 'beginner' as const, estimatedTime: 30 },
                { id: '34', title: 'Color Theory Course', type: 'course' as const, url: 'https://www.interaction-design.org/courses/color-theory', description: 'Understanding color in design', difficulty: 'beginner' as const, estimatedTime: 25 },
                { id: '35', title: 'Typography Handbook', type: 'book' as const, url: 'https://typographyhandbook.com/', description: 'Complete typography guide', difficulty: 'beginner' as const, estimatedTime: 20 }
              ]
            },
            {
              id: '2',
              title: 'User Research and Psychology',
              description: 'Master user research methods and understand user psychology',
              completed: false,
              estimatedHours: 100,
              resources: [
                { id: '36', title: 'User Research Methods', type: 'course' as const, url: 'https://www.nngroup.com/courses/user-research/', description: 'Nielsen Norman Group research course', difficulty: 'intermediate' as const, estimatedTime: 40 },
                { id: '37', title: 'Don\'t Make Me Think', type: 'book' as const, url: 'https://sensible.com/dont-make-me-think/', description: 'Classic UX usability book', difficulty: 'beginner' as const, estimatedTime: 15 },
                { id: '38', title: 'Psychology of Design', type: 'course' as const, url: 'https://www.coursera.org/learn/design-psychology', description: 'Understanding user behavior', difficulty: 'intermediate' as const, estimatedTime: 35 }
              ]
            },
            {
              id: '3',
              title: 'Wireframing and Prototyping',
              description: 'Learn to create wireframes, mockups, and interactive prototypes',
              completed: false,
              estimatedHours: 90,
              resources: [
                { id: '39', title: 'Figma Academy', type: 'course' as const, url: 'https://www.figma.com/academy/', description: 'Complete Figma design course', difficulty: 'intermediate' as const, estimatedTime: 40 },
                { id: '40', title: 'Sketch Tutorials', type: 'tutorial' as const, url: 'https://www.sketch.com/docs/', description: 'Official Sketch documentation', difficulty: 'intermediate' as const, estimatedTime: 30 },
                { id: '41', title: 'Adobe XD Tutorials', type: 'tutorial' as const, url: 'https://helpx.adobe.com/xd/tutorials.html', description: 'Adobe XD prototyping', difficulty: 'intermediate' as const, estimatedTime: 25 }
              ]
            },
            {
              id: '4',
              title: 'Interaction Design and Usability',
              description: 'Design intuitive interactions and conduct usability testing',
              completed: false,
              estimatedHours: 110,
              resources: [
                { id: '42', title: 'Interaction Design Foundation', type: 'course' as const, url: 'https://www.interaction-design.org/courses/interaction-design', description: 'Comprehensive interaction design', difficulty: 'intermediate' as const, estimatedTime: 50 },
                { id: '43', title: 'Usability Testing Guide', type: 'guide' as const, url: 'https://www.usability.gov/how-to-and-tools/methods/usability-testing.html', description: 'Government usability guide', difficulty: 'intermediate' as const, estimatedTime: 30 },
                { id: '44', title: 'A/B Testing Course', type: 'course' as const, url: 'https://www.optimizely.com/optimization-glossary/ab-testing/', description: 'Learn A/B testing methods', difficulty: 'intermediate' as const, estimatedTime: 25 }
              ]
            },
            {
              id: '5',
              title: 'Design Systems and Accessibility',
              description: 'Build scalable design systems and ensure accessibility compliance',
              completed: false,
              estimatedHours: 85,
              resources: [
                { id: '45', title: 'Design Systems Handbook', type: 'book' as const, url: 'https://www.designbetter.co/design-systems-handbook', description: 'Complete design systems guide', difficulty: 'advanced' as const, estimatedTime: 40 },
                { id: '46', title: 'Web Accessibility Guidelines', type: 'documentation' as const, url: 'https://www.w3.org/WAI/WCAG21/quickref/', description: 'WCAG accessibility standards', difficulty: 'intermediate' as const, estimatedTime: 30 },
                { id: '47', title: 'Inclusive Design Toolkit', type: 'guide' as const, url: 'https://www.microsoft.com/design/inclusive/', description: 'Microsoft inclusive design', difficulty: 'intermediate' as const, estimatedTime: 20 }
              ]
            }
          ],
          estimatedDuration: 10,
          difficulty: 'intermediate' as const,
          prerequisites: ['Creative thinking', 'Empathy for users', 'Visual sense']
        },
        marketData: {
          demand: 'high' as const,
          growth: 18,
          jobOpenings: 15000,
          competitionLevel: 'medium' as const
        },
        salaryRange: {
          min: 60000,
          max: 130000,
          median: 85000,
          currency: 'USD',
          location: 'US Average'
        }
      }
    ]
  }
}

// Study AI Service
export class StudyAIService {
  static generateStudyPlan(userProfile: any) {
    return {
      weeklyGoals: [
        { id: '1', title: 'Complete 5 coding challenges', target: 5, current: 2 },
        { id: '2', title: 'Study 3 hours daily', target: 21, current: 12 },
        { id: '3', title: 'Build 1 project', target: 1, current: 0 }
      ],
      recommendations: [
        'Focus on JavaScript fundamentals this week',
        'Practice data structures and algorithms',
        'Build a portfolio project'
      ]
    }
  }
}

// Enhanced Mentor Matching AI Service with RAG-like Matching
export class MentorAIService {
  static calculateCompatibility(userProfile: any, mentor: any): number {
    let score = 50 // Base compatibility
    let matchDetails = []

    // 1. EXPERTISE MATCHING (40 points max)
    if (userProfile.interests) {
      let expertiseScore = 0
      const userInterests = userProfile.interests.map((i: any) => i.name.toLowerCase())
      
      mentor.expertise.forEach((exp: any) => {
        const expName = exp.name.toLowerCase()
        
        // Direct matches
        userInterests.forEach((interest: string) => {
          if (expName.includes(interest) || interest.includes(expName)) {
            expertiseScore += exp.level * 5 // Higher level mentors get more points
            matchDetails.push(`Expert in ${exp.name} (Level ${exp.level})`)
          }
        })
        
        // Semantic matching for related skills
        const skillMappings = {
          'react': ['javascript', 'frontend', 'web development', 'ui'],
          'javascript': ['react', 'node.js', 'frontend', 'backend'],
          'python': ['data science', 'machine learning', 'backend'],
          'data science': ['python', 'machine learning', 'analytics'],
          'machine learning': ['python', 'data science', 'ai'],
          'design': ['ui', 'ux', 'user experience', 'visual'],
          'leadership': ['management', 'team lead', 'product'],
          'cloud': ['aws', 'azure', 'devops', 'infrastructure']
        }
        
        userInterests.forEach((interest: string) => {
          const relatedSkills = skillMappings[interest as keyof typeof skillMappings] || []
          if (relatedSkills.some(skill => expName.includes(skill))) {
            expertiseScore += exp.level * 2 // Related skills get fewer points
            matchDetails.push(`Related expertise in ${exp.name}`)
          }
        })
      })
      
      score += Math.min(expertiseScore, 40)
    }

    // 2. EXPERIENCE LEVEL MATCHING (20 points max)
    const mentorSeniorityScore = mentor.expertise.reduce((avg: number, exp: any) => avg + exp.level, 0) / mentor.expertise.length
    
    if (userProfile.experienceLevel === 'junior' && mentorSeniorityScore >= 4) {
      score += 20 // Senior mentors excellent for juniors
      matchDetails.push("Senior mentor ideal for junior level")
    } else if (userProfile.experienceLevel === 'intermediate' && mentorSeniorityScore >= 3) {
      score += 15 // Mid-level mentors good for intermediate
      matchDetails.push("Experience level well-matched")
    } else if (userProfile.experienceLevel === 'senior' && mentorSeniorityScore >= 4) {
      score += 10 // Senior-to-senior mentoring
      matchDetails.push("Peer-level mentoring opportunity")
    }

    // 3. AVAILABILITY BONUS (10 points max)
    if (mentor.availability === 'available') {
      score += 10
      matchDetails.push("Currently available for mentoring")
    } else if (mentor.availability === 'busy') {
      score += 5
      matchDetails.push("Limited availability")
    }

    // 4. RATING AND REVIEW BONUS (10 points max)
    if (mentor.rating >= 4.8) {
      score += 10
      matchDetails.push(`Highly rated (${mentor.rating}★)`)
    } else if (mentor.rating >= 4.5) {
      score += 7
      matchDetails.push(`Well rated (${mentor.rating}★)`)
    } else if (mentor.rating >= 4.0) {
      score += 5
    }

    // 5. RESPONSE TIME BONUS (5 points max)
    if (mentor.responseTime.includes('< 2 hours')) {
      score += 5
      matchDetails.push("Very responsive")
    } else if (mentor.responseTime.includes('< 4 hours')) {
      score += 3
      matchDetails.push("Quick to respond")
    }

    // 6. LANGUAGE MATCHING (5 points max)
    if (mentor.languages.includes('English')) {
      score += 5 // Assuming user speaks English
    }

    // 7. COMPANY PRESTIGE BONUS (5 points max)
    const prestigiousCompanies = ['Google', 'Microsoft', 'Apple', 'Amazon', 'Meta', 'Netflix', 'Tesla', 'Uber', 'Airbnb', 'Stripe']
    if (prestigiousCompanies.includes(mentor.company)) {
      score += 5
      matchDetails.push(`Works at ${mentor.company}`)
    }

    // Store match details for later use
    mentor._matchDetails = matchDetails

    return Math.min(Math.max(score, 0), 100)
  }

  static generateMatchingReasons(score: number, mentor?: any): string[] {
    // Use stored match details if available
    if (mentor && mentor._matchDetails) {
      return mentor._matchDetails.slice(0, 3) // Return top 3 reasons
    }

    // Fallback to score-based reasons
    const reasons = []
    
    if (score >= 90) {
      reasons.push("🎯 Excellent expertise alignment")
      reasons.push("⭐ Highly rated mentor")
      reasons.push("🚀 Perfect experience level match")
    } else if (score >= 80) {
      reasons.push("✅ Good skill overlap")
      reasons.push("📈 Complementary experience levels")
      reasons.push("💬 Strong communication style")
    } else if (score >= 70) {
      reasons.push("🔗 Some shared interests")
      reasons.push("📚 Valuable learning opportunity")
      reasons.push("🌟 Growth potential")
    } else {
      reasons.push("🎓 Different perspective valuable")
      reasons.push("🔄 Potential for skill development")
      reasons.push("💡 New learning opportunities")
    }

    return reasons
  }

  // Enhanced search with semantic matching
  static searchMentors(query: string, mentors: any[]): any[] {
    if (!query.trim()) return mentors

    const searchTerms = query.toLowerCase().split(' ').filter(term => term.length > 2)
    
    return mentors.map(mentor => {
      let relevanceScore = 0
      
      // Name matching
      if (mentor.name.toLowerCase().includes(query.toLowerCase())) {
        relevanceScore += 50
      }
      
      // Company matching
      if (mentor.company.toLowerCase().includes(query.toLowerCase())) {
        relevanceScore += 40
      }
      
      // Title matching
      if (mentor.title.toLowerCase().includes(query.toLowerCase())) {
        relevanceScore += 35
      }
      
      // Expertise matching
      mentor.expertise.forEach((exp: any) => {
        if (exp.name.toLowerCase().includes(query.toLowerCase())) {
          relevanceScore += exp.level * 10
        }
        
        searchTerms.forEach(term => {
          if (exp.name.toLowerCase().includes(term)) {
            relevanceScore += exp.level * 5
          }
        })
      })
      
      // Bio matching
      searchTerms.forEach(term => {
        if (mentor.bio.toLowerCase().includes(term)) {
          relevanceScore += 10
        }
      })
      
      return { ...mentor, _searchRelevance: relevanceScore }
    })
    .filter(mentor => mentor._searchRelevance > 0)
    .sort((a, b) => b._searchRelevance - a._searchRelevance)
  }
}

// Enhanced Chat AI Service with Knowledge Base Integration
export class ChatAIService {
  static generateResponse(message: string, mode: string, emotionalContext?: any): string {
    // First, try to find relevant knowledge
    const knowledgeResults = KnowledgeBase.searchKnowledge(message)
    
    if (knowledgeResults.length > 0) {
      return this.generateKnowledgeBasedResponse(message, knowledgeResults[0], mode, emotionalContext)
    }
    
    // Fallback to general responses if no specific knowledge found
    return this.generateGeneralResponse(message, mode, emotionalContext)
  }

  private static generateKnowledgeBasedResponse(
    message: string, 
    knowledge: any, 
    mode: string, 
    emotionalContext?: any
  ): string {
    const modeIntros = {
      supportive: "I understand you're asking about this topic, and I'm here to help! ",
      analytical: "Let me break this down systematically for you. ",
      creative: "Great question! Let's explore this from an interesting angle. ",
      'goal-focused': "Perfect! This knowledge will help you achieve your learning goals. "
    }

    const modeClosings = {
      supportive: " Remember, learning takes time, and you're doing great by asking questions! Would you like me to explain any part in more detail?",
      analytical: " This concept connects to several other important topics. Would you like me to explore the relationships between them?",
      creative: " Here's a creative way to remember this: try explaining it to a friend or building a small project with it! What aspect interests you most?",
      'goal-focused': " To master this concept, I recommend practicing with the examples I provided. What's your next learning milestone?"
    }

    let response = modeIntros[mode as keyof typeof modeIntros] || modeIntros.supportive

    // Add emotional awareness
    if (emotionalContext?.sentiment === 'negative') {
      response += "I can sense this might be challenging for you, but don't worry - we'll work through it together. "
    } else if (emotionalContext?.sentiment === 'positive') {
      response += "I love your enthusiasm for learning! "
    }

    // Core knowledge content
    response += `**${knowledge.topic}**: ${knowledge.content}`

    // Add examples if available
    if (knowledge.examples && knowledge.examples.length > 0) {
      response += "\n\n**Examples:**\n"
      knowledge.examples.slice(0, 2).forEach((example: string, index: number) => {
        response += `${index + 1}. ${example}\n`
      })
    }

    // Add difficulty-appropriate guidance
    if (knowledge.difficulty === 'beginner') {
      response += "\n\nThis is a foundational concept, so take your time to understand it well before moving on."
    } else if (knowledge.difficulty === 'advanced') {
      response += "\n\nThis is an advanced topic. Make sure you're comfortable with the prerequisites before diving deep."
    }

    response += modeClosings[mode as keyof typeof modeClosings] || modeClosings.supportive

    return response
  }

  private static generateGeneralResponse(message: string, mode: string, emotionalContext?: any): string {
    const responses = {
      supportive: [
        "I understand you're looking for help with this. While I don't have specific information about this exact topic in my knowledge base, I'm here to support your learning journey. Can you tell me more about what specifically you'd like to understand?",
        "That's a great question! Even though I don't have detailed information on this particular topic, I believe in your ability to learn and grow. What aspect of this subject interests you most?",
        "I can sense you're curious about this topic. Learning is a journey, and asking questions is a wonderful first step. Would you like me to suggest some related areas I can help with?"
      ],
      analytical: [
        "Let me analyze your question systematically. While this specific topic isn't in my current knowledge base, I can help you break down the problem and suggest a structured approach to finding the information you need.",
        "From an analytical perspective, your question touches on several areas. Let me help you identify the key components and suggest resources where you might find detailed information.",
        "I notice you're asking about a specialized topic. Let me help you create a learning framework to approach this subject methodically."
      ],
      creative: [
        "What an interesting question! While I don't have specific details on this topic, let's think creatively about how you might explore it. What if we approached this from a different angle?",
        "I love your curiosity! Even though this isn't in my knowledge base, let's brainstorm some creative ways you could investigate this topic further.",
        "That's a unique question! Let's think outside the box about resources and approaches that might help you explore this area."
      ],
      'goal-focused': [
        "I can see you're focused on learning about this topic. While I don't have specific information on this subject, let's create an action plan to help you find the answers you need.",
        "Great question! Let's set some learning objectives around this topic and identify the steps you can take to master it.",
        "I appreciate your goal-oriented approach. Let me help you create a structured plan to research and understand this topic effectively."
      ]
    }

    const modeResponses = responses[mode as keyof typeof responses] || responses.supportive
    let response = modeResponses[Math.floor(Math.random() * modeResponses.length)]

    // Add emotional awareness
    if (emotionalContext?.sentiment === 'negative') {
      response = "I can sense you might be feeling frustrated or overwhelmed. That's completely normal when learning new things! " + response
    } else if (emotionalContext?.sentiment === 'positive') {
      response = "I love your positive energy and curiosity! " + response
    }

    // Suggest knowledge areas we can help with
    const categories = KnowledgeBase.getCategories()
    response += `\n\nI have extensive knowledge in these areas: ${categories.join(', ')}. Would any of these be helpful for your learning goals?`

    return response
  }

  static detectEmotion(message: string) {
    const positiveWords = [
      'great', 'awesome', 'excited', 'happy', 'love', 'amazing', 'fantastic', 
      'wonderful', 'excellent', 'perfect', 'good', 'nice', 'cool', 'thanks', 
      'thank you', 'appreciate', 'helpful', 'brilliant', 'outstanding', 'superb',
      'thrilled', 'delighted', 'pleased', 'satisfied', 'glad', 'joy', 'fun',
      'interesting', 'fascinating', 'impressive', 'remarkable', 'incredible'
    ]
    
    const negativeWords = [
      'worried', 'stressed', 'confused', 'frustrated', 'difficult', 'hard', 
      'struggling', 'overwhelmed', 'stuck', 'lost', 'problem', 'issue', 'trouble',
      'help', 'can\'t', 'cannot', 'don\'t understand', 'unclear', 'complicated',
      'challenging', 'tough', 'impossible', 'fail', 'failed', 'error', 'wrong',
      'bad', 'terrible', 'awful', 'horrible', 'annoying', 'disappointing',
      'sad', 'upset', 'angry', 'mad', 'hate', 'dislike', 'boring', 'useless'
    ]
    
    const questionWords = [
      'what', 'how', 'why', 'when', 'where', 'which', 'who', 'can you',
      'could you', 'would you', 'explain', 'tell me', 'show me', 'help me'
    ]
    
    const lowerMessage = message.toLowerCase()
    
    // Count matches with word boundaries for better accuracy
    const positiveCount = positiveWords.filter(word => {
      const regex = new RegExp(`\\b${word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'i')
      return regex.test(lowerMessage)
    }).length
    
    const negativeCount = negativeWords.filter(word => {
      const regex = new RegExp(`\\b${word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'i')
      return regex.test(lowerMessage)
    }).length
    
    const questionCount = questionWords.filter(word => {
      const regex = new RegExp(`\\b${word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'i')
      return regex.test(lowerMessage)
    }).length
    
    // Enhanced logic for better detection
    if (positiveCount > 0 && negativeCount === 0) return 'positive'
    if (negativeCount > 0 && positiveCount === 0) return 'negative'
    if (positiveCount > negativeCount) return 'positive'
    if (negativeCount > positiveCount) return 'negative'
    
    // If it's mainly a question without strong sentiment, lean neutral
    if (questionCount > 0 && positiveCount === 0 && negativeCount === 0) return 'neutral'
    
    // Default to neutral for ambiguous cases
    return 'neutral'
  }

  // Suggest follow-up questions based on the conversation
  static generateFollowUpSuggestions(lastMessage: string): string[] {
    const knowledgeResults = KnowledgeBase.searchKnowledge(lastMessage)
    
    if (knowledgeResults.length > 0) {
      const knowledge = knowledgeResults[0]
      return [
        `Can you explain more about ${knowledge.relatedTopics[0] || 'related concepts'}?`,
        `What are some practical examples of ${knowledge.topic.toLowerCase()}?`,
        `How does this connect to my career goals?`,
        `What should I learn next after mastering this?`
      ]
    }
    
    return [
      "What specific aspect would you like to explore further?",
      "How does this relate to your learning goals?",
      "Can you give me an example of what you're trying to understand?",
      "What's the most challenging part about this topic for you?"
    ]
  }
}

// Opportunity Matching AI Service
export class OpportunityAIService {
  static calculateRelevance(userProfile: any, opportunity: any): number {
    let score = 50 // Base score

    // Match skills
    if (userProfile.skills && opportunity.requirements) {
      const skillMatches = userProfile.skills.filter((skill: any) =>
        opportunity.requirements.some((req: string) =>
          req.toLowerCase().includes(skill.name.toLowerCase())
        )
      )
      score += skillMatches.length * 15
    }

    // Match experience level
    if (userProfile.experienceLevel === opportunity.level) {
      score += 20
    }

    // Match interests
    if (userProfile.interests && opportunity.description) {
      const interestMatches = userProfile.interests.filter((interest: any) =>
        opportunity.description.toLowerCase().includes(interest.name.toLowerCase())
      )
      score += interestMatches.length * 10
    }

    return Math.min(Math.max(score, 0), 100)
  }
}

export default {
  CareerAIService,
  StudyAIService,
  MentorAIService,
  ChatAIService,
  OpportunityAIService
}