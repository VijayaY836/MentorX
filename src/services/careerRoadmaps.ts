// Career Roadmaps with Complete Learning Paths
export const careerRoadmaps = {
  'Full-Stack Software Engineer': {
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
          { id: '6', title: 'TypeScript Handbook', type: 'course' as const, url: 'https://www.typescriptlang.org/docs/', description: 'Learn TypeScript for better code', difficulty: 'intermediate' as const, estimatedTime: 25 },
          { id: '7', title: 'Responsive Web Design', type: 'course' as const, url: 'https://www.freecodecamp.org/learn/responsive-web-design/', description: 'Mobile-first design principles', difficulty: 'beginner' as const, estimatedTime: 35 }
        ]
      },
      {
        id: '3',
        title: 'Backend Development & APIs',
        description: 'Learn server-side development, databases, and API design',
        completed: false,
        estimatedHours: 120,
        resources: [
          { id: '8', title: 'Node.js Complete Guide', type: 'course' as const, url: 'https://nodejs.org/en/docs/', description: 'Official Node.js documentation', difficulty: 'intermediate' as const, estimatedTime: 40 },
          { id: '9', title: 'Express.js Tutorial', type: 'course' as const, url: 'https://expressjs.com/en/starter/installing.html', description: 'Build REST APIs with Express', difficulty: 'intermediate' as const, estimatedTime: 30 },
          { id: '10', title: 'MongoDB University', type: 'course' as const, url: 'https://university.mongodb.com/', description: 'Free MongoDB courses', difficulty: 'beginner' as const, estimatedTime: 35 },
          { id: '11', title: 'PostgreSQL Tutorial', type: 'course' as const, url: 'https://www.postgresql.org/docs/current/tutorial.html', description: 'Relational database fundamentals', difficulty: 'intermediate' as const, estimatedTime: 25 }
        ]
      },
      {
        id: '4',
        title: 'Full-Stack Project Development',
        description: 'Build complete applications combining frontend and backend',
        completed: false,
        estimatedHours: 80,
        resources: [
          { id: '12', title: 'Full Stack Open', type: 'course' as const, url: 'https://fullstackopen.com/en/', description: 'University of Helsinki full-stack course', difficulty: 'advanced' as const, estimatedTime: 60 },
          { id: '13', title: 'The Odin Project', type: 'course' as const, url: 'https://www.theodinproject.com/', description: 'Complete web development curriculum', difficulty: 'intermediate' as const, estimatedTime: 80 }
        ]
      },
      {
        id: '5',
        title: 'DevOps & Deployment',
        description: 'Learn deployment, CI/CD, and production best practices',
        completed: false,
        estimatedHours: 60,
        resources: [
          { id: '14', title: 'Docker Getting Started', type: 'course' as const, url: 'https://docs.docker.com/get-started/', description: 'Containerization basics', difficulty: 'intermediate' as const, estimatedTime: 20 },
          { id: '15', title: 'GitHub Actions', type: 'course' as const, url: 'https://docs.github.com/en/actions', description: 'CI/CD with GitHub Actions', difficulty: 'intermediate' as const, estimatedTime: 15 },
          { id: '16', title: 'Vercel Deployment', type: 'course' as const, url: 'https://vercel.com/docs', description: 'Deploy applications easily', difficulty: 'beginner' as const, estimatedTime: 10 }
        ]
      }
    ],
    estimatedDuration: 12,
    difficulty: 'intermediate' as const,
    prerequisites: ['Basic computer skills', 'Logical thinking', 'Problem-solving mindset']
  },
  'Data Scientist': {
    milestones: [
      {
        id: '1',
        title: 'Statistics and Mathematics Foundation',
        description: 'Master statistical concepts, linear algebra, and calculus fundamentals',
        completed: false,
        estimatedHours: 150,
        resources: [
          { id: '17', title: 'Khan Academy Statistics', type: 'course' as const, url: 'https://www.khanacademy.org/math/statistics-probability', description: 'Free comprehensive statistics course', difficulty: 'beginner' as const, estimatedTime: 60 },
          { id: '18', title: 'Linear Algebra - MIT OpenCourseWare', type: 'course' as const, url: 'https://ocw.mit.edu/courses/18-06-linear-algebra-spring-2010/', description: 'Complete linear algebra course', difficulty: 'intermediate' as const, estimatedTime: 50 },
          { id: '19', title: 'Calculus - Khan Academy', type: 'course' as const, url: 'https://www.khanacademy.org/math/calculus-1', description: 'Calculus fundamentals', difficulty: 'intermediate' as const, estimatedTime: 40 },
          { id: '20', title: 'Probability Theory', type: 'course' as const, url: 'https://www.edx.org/course/introduction-to-probability', description: 'MIT probability course', difficulty: 'advanced' as const, estimatedTime: 45 }
        ]
      },
      {
        id: '2',
        title: 'Python for Data Science',
        description: 'Learn Python programming with focus on data analysis libraries',
        completed: false,
        estimatedHours: 120,
        resources: [
          { id: '21', title: 'Python for Data Science Handbook', type: 'book' as const, url: 'https://jakevdp.github.io/PythonDataScienceHandbook/', description: 'Comprehensive Python data science guide', difficulty: 'intermediate' as const, estimatedTime: 60 },
          { id: '22', title: 'Pandas Documentation', type: 'documentation' as const, url: 'https://pandas.pydata.org/docs/', description: 'Official Pandas library documentation', difficulty: 'intermediate' as const, estimatedTime: 30 },
          { id: '23', title: 'NumPy Quickstart', type: 'tutorial' as const, url: 'https://numpy.org/doc/stable/user/quickstart.html', description: 'NumPy fundamentals', difficulty: 'beginner' as const, estimatedTime: 20 },
          { id: '24', title: 'Jupyter Notebook Tutorial', type: 'tutorial' as const, url: 'https://jupyter.org/try', description: 'Interactive data analysis environment', difficulty: 'beginner' as const, estimatedTime: 15 }
        ]
      },
      {
        id: '3',
        title: 'Data Visualization and Analysis',
        description: 'Master data visualization tools and exploratory data analysis techniques',
        completed: false,
        estimatedHours: 100,
        resources: [
          { id: '25', title: 'Matplotlib Tutorials', type: 'tutorial' as const, url: 'https://matplotlib.org/stable/tutorials/index.html', description: 'Complete matplotlib guide', difficulty: 'intermediate' as const, estimatedTime: 30 },
          { id: '26', title: 'Seaborn Tutorial', type: 'tutorial' as const, url: 'https://seaborn.pydata.org/tutorial.html', description: 'Statistical data visualization', difficulty: 'intermediate' as const, estimatedTime: 25 },
          { id: '27', title: 'Plotly Documentation', type: 'documentation' as const, url: 'https://plotly.com/python/', description: 'Interactive visualizations', difficulty: 'intermediate' as const, estimatedTime: 35 },
          { id: '28', title: 'Tableau Public Training', type: 'course' as const, url: 'https://public.tableau.com/en-us/s/resources', description: 'Business intelligence visualization', difficulty: 'beginner' as const, estimatedTime: 25 }
        ]
      },
      {
        id: '4',
        title: 'Machine Learning Fundamentals',
        description: 'Learn core machine learning algorithms and model evaluation',
        completed: false,
        estimatedHours: 140,
        resources: [
          { id: '29', title: 'Scikit-learn User Guide', type: 'documentation' as const, url: 'https://scikit-learn.org/stable/user_guide.html', description: 'Complete ML library guide', difficulty: 'intermediate' as const, estimatedTime: 50 },
          { id: '30', title: 'Andrew Ng ML Course', type: 'course' as const, url: 'https://www.coursera.org/learn/machine-learning', description: 'Stanford ML course on Coursera', difficulty: 'intermediate' as const, estimatedTime: 60 },
          { id: '31', title: 'Hands-On ML Book', type: 'book' as const, url: 'https://github.com/ageron/handson-ml2', description: 'Practical ML with Python', difficulty: 'advanced' as const, estimatedTime: 80 }
        ]
      },
      {
        id: '5',
        title: 'Advanced ML and Deep Learning',
        description: 'Explore deep learning, neural networks, and advanced ML techniques',
        completed: false,
        estimatedHours: 160,
        resources: [
          { id: '32', title: 'TensorFlow Tutorials', type: 'tutorial' as const, url: 'https://www.tensorflow.org/tutorials', description: 'Official TensorFlow guides', difficulty: 'advanced' as const, estimatedTime: 60 },
          { id: '33', title: 'PyTorch Tutorials', type: 'tutorial' as const, url: 'https://pytorch.org/tutorials/', description: 'PyTorch deep learning', difficulty: 'advanced' as const, estimatedTime: 50 },
          { id: '34', title: 'Deep Learning Specialization', type: 'course' as const, url: 'https://www.coursera.org/specializations/deep-learning', description: 'Andrew Ng deep learning course', difficulty: 'advanced' as const, estimatedTime: 100 }
        ]
      },
      {
        id: '6',
        title: 'Data Engineering and MLOps',
        description: 'Learn to deploy models and build data pipelines for production',
        completed: false,
        estimatedHours: 120,
        resources: [
          { id: '35', title: 'MLflow Documentation', type: 'documentation' as const, url: 'https://mlflow.org/docs/latest/index.html', description: 'ML lifecycle management', difficulty: 'advanced' as const, estimatedTime: 40 },
          { id: '36', title: 'Apache Airflow Tutorial', type: 'tutorial' as const, url: 'https://airflow.apache.org/docs/apache-airflow/stable/tutorial.html', description: 'Workflow orchestration', difficulty: 'advanced' as const, estimatedTime: 50 },
          { id: '37', title: 'Docker for Data Science', type: 'course' as const, url: 'https://docs.docker.com/get-started/', description: 'Containerization for ML', difficulty: 'intermediate' as const, estimatedTime: 30 }
        ]
      }
    ],
    estimatedDuration: 18,
    difficulty: 'advanced' as const,
    prerequisites: ['Strong math background', 'Programming experience', 'Statistical thinking']
  },
  'UX/UI Designer': {
    milestones: [
      {
        id: '1',
        title: 'Design Fundamentals',
        description: 'Learn design principles, color theory, and typography',
        completed: false,
        estimatedHours: 80,
        resources: [
          { id: '38', title: 'Design Principles Guide', type: 'course' as const, url: 'https://design-principles.org/', description: 'Core design fundamentals', difficulty: 'beginner' as const, estimatedTime: 30 },
          { id: '39', title: 'Color Theory Course', type: 'course' as const, url: 'https://www.interaction-design.org/courses/color-theory', description: 'Understanding color in design', difficulty: 'beginner' as const, estimatedTime: 25 },
          { id: '40', title: 'Typography Handbook', type: 'book' as const, url: 'https://typographyhandbook.com/', description: 'Complete typography guide', difficulty: 'beginner' as const, estimatedTime: 20 },
          { id: '41', title: 'Visual Hierarchy Principles', type: 'guide' as const, url: 'https://www.canva.com/learn/visual-hierarchy/', description: 'Guide information flow in design', difficulty: 'beginner' as const, estimatedTime: 15 }
        ]
      },
      {
        id: '2',
        title: 'User Research and Psychology',
        description: 'Master user research methods and understand user psychology',
        completed: false,
        estimatedHours: 100,
        resources: [
          { id: '42', title: 'User Research Methods', type: 'course' as const, url: 'https://www.nngroup.com/courses/user-research/', description: 'Nielsen Norman Group research course', difficulty: 'intermediate' as const, estimatedTime: 40 },
          { id: '43', title: 'Don\'t Make Me Think', type: 'book' as const, url: 'https://sensible.com/dont-make-me-think/', description: 'Classic UX usability book', difficulty: 'beginner' as const, estimatedTime: 15 },
          { id: '44', title: 'Psychology of Design', type: 'course' as const, url: 'https://www.coursera.org/learn/design-psychology', description: 'Understanding user behavior', difficulty: 'intermediate' as const, estimatedTime: 35 },
          { id: '45', title: 'User Personas Guide', type: 'guide' as const, url: 'https://www.hubspot.com/make-my-persona', description: 'Creating effective user personas', difficulty: 'beginner' as const, estimatedTime: 20 }
        ]
      },
      {
        id: '3',
        title: 'Wireframing and Prototyping',
        description: 'Learn to create wireframes, mockups, and interactive prototypes',
        completed: false,
        estimatedHours: 90,
        resources: [
          { id: '46', title: 'Figma Academy', type: 'course' as const, url: 'https://www.figma.com/academy/', description: 'Complete Figma design course', difficulty: 'intermediate' as const, estimatedTime: 40 },
          { id: '47', title: 'Sketch Tutorials', type: 'tutorial' as const, url: 'https://www.sketch.com/docs/', description: 'Official Sketch documentation', difficulty: 'intermediate' as const, estimatedTime: 30 },
          { id: '48', title: 'Adobe XD Tutorials', type: 'tutorial' as const, url: 'https://helpx.adobe.com/xd/tutorials.html', description: 'Adobe XD prototyping', difficulty: 'intermediate' as const, estimatedTime: 25 },
          { id: '49', title: 'Wireframing Best Practices', type: 'guide' as const, url: 'https://balsamiq.com/learn/articles/what-are-wireframes/', description: 'Low-fidelity design fundamentals', difficulty: 'beginner' as const, estimatedTime: 15 }
        ]
      },
      {
        id: '4',
        title: 'Interaction Design and Usability',
        description: 'Design intuitive interactions and conduct usability testing',
        completed: false,
        estimatedHours: 110,
        resources: [
          { id: '50', title: 'Interaction Design Foundation', type: 'course' as const, url: 'https://www.interaction-design.org/courses/interaction-design', description: 'Comprehensive interaction design', difficulty: 'intermediate' as const, estimatedTime: 50 },
          { id: '51', title: 'Usability Testing Guide', type: 'guide' as const, url: 'https://www.usability.gov/how-to-and-tools/methods/usability-testing.html', description: 'Government usability guide', difficulty: 'intermediate' as const, estimatedTime: 30 },
          { id: '52', title: 'A/B Testing Course', type: 'course' as const, url: 'https://www.optimizely.com/optimization-glossary/ab-testing/', description: 'Learn A/B testing methods', difficulty: 'intermediate' as const, estimatedTime: 25 },
          { id: '53', title: 'Microinteractions Guide', type: 'book' as const, url: 'https://microinteractions.com/', description: 'Small details that make big impact', difficulty: 'advanced' as const, estimatedTime: 20 }
        ]
      },
      {
        id: '5',
        title: 'Design Systems and Accessibility',
        description: 'Build scalable design systems and ensure accessibility compliance',
        completed: false,
        estimatedHours: 85,
        resources: [
          { id: '54', title: 'Design Systems Handbook', type: 'book' as const, url: 'https://www.designbetter.co/design-systems-handbook', description: 'Complete design systems guide', difficulty: 'advanced' as const, estimatedTime: 40 },
          { id: '55', title: 'Web Accessibility Guidelines', type: 'documentation' as const, url: 'https://www.w3.org/WAI/WCAG21/quickref/', description: 'WCAG accessibility standards', difficulty: 'intermediate' as const, estimatedTime: 30 },
          { id: '56', title: 'Inclusive Design Toolkit', type: 'guide' as const, url: 'https://www.microsoft.com/design/inclusive/', description: 'Microsoft inclusive design', difficulty: 'intermediate' as const, estimatedTime: 20 }
        ]
      }
    ],
    estimatedDuration: 10,
    difficulty: 'intermediate' as const,
    prerequisites: ['Creative thinking', 'Empathy for users', 'Visual sense']
  },
  'Product Manager': {
    milestones: [
      {
        id: '1',
        title: 'Product Management Fundamentals',
        description: 'Learn core PM concepts, frameworks, and methodologies',
        completed: false,
        estimatedHours: 100,
        resources: [
          { id: '57', title: 'Product Management Course - Coursera', type: 'course' as const, url: 'https://www.coursera.org/specializations/product-management', description: 'Comprehensive PM specialization', difficulty: 'beginner' as const, estimatedTime: 60 },
          { id: '58', title: 'Inspired by Marty Cagan', type: 'book' as const, url: 'https://www.svpg.com/books/inspired-how-to-create-tech-products-customers-love/', description: 'Classic product management book', difficulty: 'intermediate' as const, estimatedTime: 20 },
          { id: '59', title: 'Product School Resources', type: 'course' as const, url: 'https://productschool.com/resources/', description: 'Free PM resources and templates', difficulty: 'beginner' as const, estimatedTime: 30 },
          { id: '60', title: 'Lean Startup Methodology', type: 'book' as const, url: 'http://theleanstartup.com/', description: 'Build-measure-learn approach', difficulty: 'intermediate' as const, estimatedTime: 25 }
        ]
      },
      {
        id: '2',
        title: 'Market Research and User Analysis',
        description: 'Master customer research, market analysis, and user personas',
        completed: false,
        estimatedHours: 90,
        resources: [
          { id: '61', title: 'User Research Guide', type: 'guide' as const, url: 'https://www.nngroup.com/articles/which-ux-research-methods/', description: 'Nielsen Norman research methods', difficulty: 'intermediate' as const, estimatedTime: 30 },
          { id: '62', title: 'Jobs to be Done Framework', type: 'course' as const, url: 'https://hbr.org/2016/09/know-your-customers-jobs-to-be-done', description: 'Harvard Business Review framework', difficulty: 'intermediate' as const, estimatedTime: 25 },
          { id: '63', title: 'Market Research Toolkit', type: 'guide' as const, url: 'https://blog.hubspot.com/marketing/market-research-buyers-journey-guide', description: 'HubSpot market research guide', difficulty: 'beginner' as const, estimatedTime: 35 },
          { id: '64', title: 'Competitive Analysis Framework', type: 'guide' as const, url: 'https://www.productplan.com/glossary/competitive-analysis/', description: 'Analyze competitor products', difficulty: 'intermediate' as const, estimatedTime: 20 }
        ]
      },
      {
        id: '3',
        title: 'Product Strategy and Roadmapping',
        description: 'Learn strategic planning, roadmap creation, and prioritization',
        completed: false,
        estimatedHours: 110,
        resources: [
          { id: '65', title: 'Product Roadmap Guide', type: 'guide' as const, url: 'https://www.productplan.com/learn/what-is-a-product-roadmap/', description: 'Complete roadmapping guide', difficulty: 'intermediate' as const, estimatedTime: 40 },
          { id: '66', title: 'OKRs and Goal Setting', type: 'course' as const, url: 'https://www.whatmatters.com/resources/', description: 'Objectives and Key Results framework', difficulty: 'intermediate' as const, estimatedTime: 30 },
          { id: '67', title: 'Prioritization Frameworks', type: 'guide' as const, url: 'https://www.intercom.com/blog/rice-simple-prioritization-for-product-managers/', description: 'RICE and other frameworks', difficulty: 'intermediate' as const, estimatedTime: 25 },
          { id: '68', title: 'Product Vision Workshop', type: 'guide' as const, url: 'https://www.romanpichler.com/blog/the-product-vision-board/', description: 'Creating compelling product vision', difficulty: 'intermediate' as const, estimatedTime: 30 }
        ]
      },
      {
        id: '4',
        title: 'Data Analysis and Metrics',
        description: 'Master product analytics, KPIs, and data-driven decision making',
        completed: false,
        estimatedHours: 95,
        resources: [
          { id: '69', title: 'Google Analytics Academy', type: 'course' as const, url: 'https://analytics.google.com/analytics/academy/', description: 'Free analytics courses', difficulty: 'beginner' as const, estimatedTime: 40 },
          { id: '70', title: 'Product Metrics Guide', type: 'guide' as const, url: 'https://amplitude.com/blog/product-metrics', description: 'Key product metrics explained', difficulty: 'intermediate' as const, estimatedTime: 30 },
          { id: '71', title: 'A/B Testing for PMs', type: 'course' as const, url: 'https://www.optimizely.com/optimization-glossary/ab-testing/', description: 'Experimentation for product managers', difficulty: 'intermediate' as const, estimatedTime: 25 },
          { id: '72', title: 'SQL for Product Managers', type: 'course' as const, url: 'https://mode.com/sql-tutorial/', description: 'Query databases for insights', difficulty: 'intermediate' as const, estimatedTime: 35 }
        ]
      }
    ],
    estimatedDuration: 8,
    difficulty: 'intermediate' as const,
    prerequisites: ['Business acumen', 'Communication skills', 'Analytical thinking']
  },
  'DevOps Engineer': {
    milestones: [
      {
        id: '1',
        title: 'Linux and System Administration',
        description: 'Master Linux fundamentals, command line, and system administration',
        completed: false,
        estimatedHours: 120,
        resources: [
          { id: '73', title: 'Linux Command Line Basics', type: 'course' as const, url: 'https://linuxcommand.org/', description: 'Complete command line tutorial', difficulty: 'beginner' as const, estimatedTime: 40 },
          { id: '74', title: 'Linux System Administration', type: 'course' as const, url: 'https://www.edx.org/course/introduction-to-linux', description: 'Linux Foundation course', difficulty: 'intermediate' as const, estimatedTime: 60 },
          { id: '75', title: 'Shell Scripting Guide', type: 'tutorial' as const, url: 'https://www.shellscript.sh/', description: 'Bash scripting fundamentals', difficulty: 'intermediate' as const, estimatedTime: 30 },
          { id: '76', title: 'Linux Networking', type: 'course' as const, url: 'https://www.netacad.com/courses/os-it/ndg-linux-unhatched', description: 'Network configuration in Linux', difficulty: 'intermediate' as const, estimatedTime: 25 }
        ]
      },
      {
        id: '2',
        title: 'Cloud Platforms and Services',
        description: 'Learn AWS, Azure, or GCP cloud services and architecture',
        completed: false,
        estimatedHours: 140,
        resources: [
          { id: '77', title: 'AWS Cloud Practitioner', type: 'course' as const, url: 'https://aws.amazon.com/training/digital/aws-cloud-practitioner-essentials/', description: 'Official AWS training', difficulty: 'beginner' as const, estimatedTime: 50 },
          { id: '78', title: 'Azure Fundamentals', type: 'course' as const, url: 'https://docs.microsoft.com/en-us/learn/paths/azure-fundamentals/', description: 'Microsoft Azure basics', difficulty: 'beginner' as const, estimatedTime: 45 },
          { id: '79', title: 'Google Cloud Platform', type: 'course' as const, url: 'https://cloud.google.com/training/', description: 'GCP training resources', difficulty: 'intermediate' as const, estimatedTime: 45 },
          { id: '80', title: 'Cloud Architecture Patterns', type: 'guide' as const, url: 'https://docs.microsoft.com/en-us/azure/architecture/', description: 'Design scalable cloud solutions', difficulty: 'advanced' as const, estimatedTime: 35 }
        ]
      },
      {
        id: '3',
        title: 'Containerization and Orchestration',
        description: 'Master Docker, Kubernetes, and container orchestration',
        completed: false,
        estimatedHours: 100,
        resources: [
          { id: '81', title: 'Docker Official Tutorial', type: 'tutorial' as const, url: 'https://docs.docker.com/get-started/', description: 'Complete Docker guide', difficulty: 'intermediate' as const, estimatedTime: 35 },
          { id: '82', title: 'Kubernetes Basics', type: 'course' as const, url: 'https://kubernetes.io/docs/tutorials/', description: 'Official Kubernetes tutorials', difficulty: 'advanced' as const, estimatedTime: 50 },
          { id: '83', title: 'Container Security', type: 'guide' as const, url: 'https://sysdig.com/learn-cloud-native/kubernetes-security/', description: 'Container security best practices', difficulty: 'advanced' as const, estimatedTime: 25 },
          { id: '84', title: 'Helm Package Manager', type: 'tutorial' as const, url: 'https://helm.sh/docs/', description: 'Kubernetes application packaging', difficulty: 'intermediate' as const, estimatedTime: 20 }
        ]
      },
      {
        id: '4',
        title: 'CI/CD and Automation',
        description: 'Implement continuous integration and deployment pipelines',
        completed: false,
        estimatedHours: 90,
        resources: [
          { id: '85', title: 'Jenkins Tutorial', type: 'tutorial' as const, url: 'https://www.jenkins.io/doc/tutorials/', description: 'Jenkins CI/CD pipeline guide', difficulty: 'intermediate' as const, estimatedTime: 35 },
          { id: '86', title: 'GitHub Actions', type: 'course' as const, url: 'https://docs.github.com/en/actions/learn-github-actions', description: 'GitHub CI/CD workflows', difficulty: 'intermediate' as const, estimatedTime: 30 },
          { id: '87', title: 'Infrastructure as Code', type: 'course' as const, url: 'https://www.terraform.io/intro', description: 'Terraform fundamentals', difficulty: 'advanced' as const, estimatedTime: 40 },
          { id: '88', title: 'Ansible Automation', type: 'course' as const, url: 'https://docs.ansible.com/ansible/latest/user_guide/index.html', description: 'Configuration management', difficulty: 'intermediate' as const, estimatedTime: 30 }
        ]
      }
    ],
    estimatedDuration: 14,
    difficulty: 'advanced' as const,
    prerequisites: ['Programming experience', 'System administration basics', 'Problem-solving skills']
  },
  'Digital Marketing Specialist': {
    milestones: [
      {
        id: '1',
        title: 'Digital Marketing Fundamentals',
        description: 'Learn core marketing concepts, customer psychology, and digital channels',
        completed: false,
        estimatedHours: 80,
        resources: [
          { id: '89', title: 'Google Digital Marketing Course', type: 'course' as const, url: 'https://learndigital.withgoogle.com/digitalgarage/course/digital-marketing', description: 'Free comprehensive digital marketing course', difficulty: 'beginner' as const, estimatedTime: 40 },
          { id: '90', title: 'HubSpot Marketing Certification', type: 'course' as const, url: 'https://academy.hubspot.com/courses/inbound-marketing', description: 'Inbound marketing methodology', difficulty: 'beginner' as const, estimatedTime: 25 },
          { id: '91', title: 'Consumer Psychology', type: 'course' as const, url: 'https://www.coursera.org/learn/behavioral-economics', description: 'Understanding customer behavior', difficulty: 'intermediate' as const, estimatedTime: 30 },
          { id: '92', title: 'Digital Marketing Strategy', type: 'course' as const, url: 'https://www.edx.org/course/digital-marketing', description: 'Strategic marketing planning', difficulty: 'intermediate' as const, estimatedTime: 35 }
        ]
      },
      {
        id: '2',
        title: 'Content Marketing and SEO',
        description: 'Master content creation, SEO optimization, and content strategy',
        completed: false,
        estimatedHours: 100,
        resources: [
          { id: '93', title: 'Moz SEO Learning Center', type: 'course' as const, url: 'https://moz.com/learn/seo', description: 'Complete SEO guide', difficulty: 'intermediate' as const, estimatedTime: 45 },
          { id: '94', title: 'Content Marketing Institute', type: 'course' as const, url: 'https://contentmarketinginstitute.com/what-is-content-marketing/', description: 'Content marketing strategy', difficulty: 'intermediate' as const, estimatedTime: 35 },
          { id: '95', title: 'Copywriting Fundamentals', type: 'course' as const, url: 'https://copyblogger.com/copywriting-101/', description: 'Persuasive writing techniques', difficulty: 'beginner' as const, estimatedTime: 25 },
          { id: '96', title: 'Keyword Research Tools', type: 'tutorial' as const, url: 'https://ahrefs.com/blog/keyword-research/', description: 'SEO keyword research methods', difficulty: 'intermediate' as const, estimatedTime: 20 }
        ]
      },
      {
        id: '3',
        title: 'Social Media and Paid Advertising',
        description: 'Learn social media marketing and paid advertising platforms',
        completed: false,
        estimatedHours: 110,
        resources: [
          { id: '97', title: 'Facebook Blueprint', type: 'course' as const, url: 'https://www.facebook.com/business/learn', description: 'Official Facebook advertising course', difficulty: 'intermediate' as const, estimatedTime: 40 },
          { id: '98', title: 'Google Ads Certification', type: 'course' as const, url: 'https://skillshop.withgoogle.com/google-ads', description: 'Google Ads fundamentals', difficulty: 'intermediate' as const, estimatedTime: 35 },
          { id: '99', title: 'Social Media Strategy', type: 'course' as const, url: 'https://buffer.com/library/social-media-marketing-plan', description: 'Social media planning guide', difficulty: 'beginner' as const, estimatedTime: 30 },
          { id: '100', title: 'LinkedIn Marketing', type: 'course' as const, url: 'https://business.linkedin.com/marketing-solutions/success/best-practices', description: 'B2B social media marketing', difficulty: 'intermediate' as const, estimatedTime: 25 }
        ]
      },
      {
        id: '4',
        title: 'Analytics and Performance Measurement',
        description: 'Master marketing analytics, conversion tracking, and ROI measurement',
        completed: false,
        estimatedHours: 85,
        resources: [
          { id: '101', title: 'Google Analytics Academy', type: 'course' as const, url: 'https://analytics.google.com/analytics/academy/', description: 'Web analytics fundamentals', difficulty: 'intermediate' as const, estimatedTime: 40 },
          { id: '102', title: 'Marketing Attribution', type: 'guide' as const, url: 'https://blog.hubspot.com/marketing/what-is-marketing-attribution', description: 'Attribution modeling guide', difficulty: 'advanced' as const, estimatedTime: 25 },
          { id: '103', title: 'Conversion Optimization', type: 'course' as const, url: 'https://cxl.com/institute/', description: 'CRO best practices', difficulty: 'intermediate' as const, estimatedTime: 30 },
          { id: '104', title: 'Marketing Automation', type: 'course' as const, url: 'https://academy.hubspot.com/courses/marketing-automation', description: 'Automated marketing workflows', difficulty: 'intermediate' as const, estimatedTime: 25 }
        ]
      }
    ],
    estimatedDuration: 9,
    difficulty: 'intermediate' as const,
    prerequisites: ['Communication skills', 'Creativity', 'Analytical thinking']
  },
  'Cybersecurity Analyst': {
    milestones: [
      {
        id: '1',
        title: 'Security Fundamentals',
        description: 'Learn core cybersecurity concepts, threats, and defense strategies',
        completed: false,
        estimatedHours: 120,
        resources: [
          { id: '105', title: 'CompTIA Security+ Guide', type: 'course' as const, url: 'https://www.comptia.org/certifications/security', description: 'Industry-standard security certification', difficulty: 'beginner' as const, estimatedTime: 60 },
          { id: '106', title: 'SANS Cyber Aces', type: 'course' as const, url: 'https://cyberaces.org/', description: 'Free cybersecurity tutorials', difficulty: 'beginner' as const, estimatedTime: 40 },
          { id: '107', title: 'NIST Cybersecurity Framework', type: 'guide' as const, url: 'https://www.nist.gov/cyberframework', description: 'Government cybersecurity standards', difficulty: 'intermediate' as const, estimatedTime: 25 },
          { id: '108', title: 'Cybersecurity Basics', type: 'course' as const, url: 'https://www.coursera.org/learn/cyber-security-basics', description: 'Introduction to cybersecurity', difficulty: 'beginner' as const, estimatedTime: 30 }
        ]
      },
      {
        id: '2',
        title: 'Network Security and Monitoring',
        description: 'Master network security, intrusion detection, and monitoring tools',
        completed: false,
        estimatedHours: 110,
        resources: [
          { id: '109', title: 'Wireshark Network Analysis', type: 'course' as const, url: 'https://www.wireshark.org/docs/', description: 'Network packet analysis', difficulty: 'intermediate' as const, estimatedTime: 40 },
          { id: '110', title: 'Splunk Fundamentals', type: 'course' as const, url: 'https://www.splunk.com/en_us/training.html', description: 'Security information and event management', difficulty: 'intermediate' as const, estimatedTime: 45 },
          { id: '111', title: 'Firewall Configuration', type: 'tutorial' as const, url: 'https://www.cisco.com/c/en/us/support/security/firewalls/series.html', description: 'Network security devices', difficulty: 'intermediate' as const, estimatedTime: 30 },
          { id: '112', title: 'Intrusion Detection Systems', type: 'course' as const, url: 'https://www.snort.org/documents', description: 'IDS/IPS fundamentals', difficulty: 'advanced' as const, estimatedTime: 35 }
        ]
      },
      {
        id: '3',
        title: 'Incident Response and Forensics',
        description: 'Learn incident handling, digital forensics, and threat hunting',
        completed: false,
        estimatedHours: 100,
        resources: [
          { id: '113', title: 'SANS Incident Response', type: 'course' as const, url: 'https://www.sans.org/cyber-security-courses/incident-response/', description: 'Professional incident response training', difficulty: 'advanced' as const, estimatedTime: 50 },
          { id: '114', title: 'Digital Forensics Guide', type: 'guide' as const, url: 'https://www.autopsy.com/support/training/', description: 'Digital evidence analysis', difficulty: 'advanced' as const, estimatedTime: 35 },
          { id: '115', title: 'Threat Hunting Basics', type: 'course' as const, url: 'https://www.crowdstrike.com/cybersecurity-101/threat-hunting/', description: 'Proactive threat detection', difficulty: 'advanced' as const, estimatedTime: 25 },
          { id: '116', title: 'Malware Analysis', type: 'course' as const, url: 'https://malwareunicorn.org/workshops/re101.html', description: 'Reverse engineering malware', difficulty: 'advanced' as const, estimatedTime: 40 }
        ]
      },
      {
        id: '4',
        title: 'Compliance and Risk Management',
        description: 'Understand regulatory compliance, risk assessment, and governance',
        completed: false,
        estimatedHours: 90,
        resources: [
          { id: '117', title: 'ISO 27001 Foundation', type: 'course' as const, url: 'https://www.iso.org/isoiec-27001-information-security.html', description: 'Information security management', difficulty: 'intermediate' as const, estimatedTime: 40 },
          { id: '118', title: 'GDPR Compliance Guide', type: 'guide' as const, url: 'https://gdpr.eu/', description: 'Data protection regulations', difficulty: 'intermediate' as const, estimatedTime: 25 },
          { id: '119', title: 'Risk Assessment Framework', type: 'guide' as const, url: 'https://csrc.nist.gov/publications/detail/sp/800-30/rev-1/final', description: 'NIST risk management guide', difficulty: 'intermediate' as const, estimatedTime: 30 },
          { id: '120', title: 'Security Audit Procedures', type: 'guide' as const, url: 'https://www.isaca.org/resources/isaca-journal/issues/2018/volume-1/security-auditing-in-the-digital-age', description: 'Security assessment methods', difficulty: 'advanced' as const, estimatedTime: 25 }
        ]
      }
    ],
    estimatedDuration: 15,
    difficulty: 'advanced' as const,
    prerequisites: ['Technical background', 'Attention to detail', 'Problem-solving skills']
  }
}