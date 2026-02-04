// Mock data for the hackathon demo - everything works locally!

// Local type definitions to avoid import issues
interface User {
  id: string;
  email: string;
  name: string;
  profile: UserProfile;
  progress: UserProgress;
  preferences: UserPreferences;
}

interface UserProfile {
  avatar?: string;
  bio?: string;
  location?: string;
  timezone: string;
  skills: SkillEntry[];
  interests: InterestEntry[];
  careerGoals: string[];
  educationLevel: 'high_school' | 'associate' | 'bachelor' | 'master' | 'phd' | 'other';
  experienceLevel: 'entry' | 'junior' | 'mid' | 'senior' | 'expert';
}

interface UserProgress {
  level: number;
  totalXP: number;
  currentStreak: number;
  longestStreak: number;
  completedMilestones: string[];
  achievements: Achievement[];
  weeklyGoals: WeeklyGoal[];
  lastActivity: Date;
}

interface UserPreferences {
  theme: 'light' | 'dark';
  notifications: NotificationSettings;
  privacy: PrivacySettings;
  learningStyle: 'visual' | 'auditory' | 'kinesthetic' | 'reading_writing';
  coachingPreferences: CoachingPreferences;
}

interface SkillEntry {
  name: string;
  level: number;
  category: string;
}

interface InterestEntry {
  name: string;
  strength: number;
  category: string;
}

interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  unlockedAt: Date;
  category: 'learning' | 'social' | 'career' | 'milestone' | 'special';
}

interface WeeklyGoal {
  id: string;
  title: string;
  target: number;
  current: number;
  category: string;
  deadline: Date;
}

interface NotificationSettings {
  email: boolean;
  push: boolean;
  achievements: boolean;
  mentorMessages: boolean;
  opportunities: boolean;
  communityActivity: boolean;
}

interface PrivacySettings {
  profileVisibility: 'public' | 'private' | 'friends_only';
  showProgress: boolean;
  showAchievements: boolean;
  allowMentorRequests: boolean;
}

interface CoachingPreferences {
  communicationStyle: 'direct' | 'gentle' | 'encouraging' | 'analytical';
  feedbackFrequency: 'immediate' | 'session_end' | 'daily' | 'weekly';
  motivationStyle: 'competitive' | 'collaborative' | 'personal_growth';
}

interface Mentor {
  id: string;
  name: string;
  avatar: string;
  title: string;
  company: string;
  bio: string;
  expertise: ExpertiseArea[];
  availability: string;
  rating: number;
  reviewCount: number;
  responseTime: string;
  languages: string[];
  linkedinUrl?: string;
}

interface ExpertiseArea {
  name: string;
  level: number;
  yearsExperience: number;
}

interface Opportunity {
  id: string;
  title: string;
  type: string;
  organization: string;
  description: string;
  requirements: string[];
  benefits: string[];
  deadline: Date;
  location?: string;
  remote: boolean;
  relevanceScore: number;
}

interface CommunityPost {
  id: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  content: string;
  type: string;
  achievements?: { name: string; icon: string }[];
  reactions: Reaction[];
  comments: Comment[];
  createdAt: Date;
}

interface Reaction {
  id: string;
  userId: string;
  type: string;
  createdAt: Date;
}

interface Comment {
  id: string;
  userId: string;
  userName: string;
  content: string;
  createdAt: Date;
}

// Mock User Data
export const mockUser: User = {
  id: '1',
  email: 'alex.johnson@email.com',
  name: 'Alex Johnson',
  profile: {
    avatar: '',
    bio: 'Aspiring software engineer passionate about web development and AI',
    location: 'San Francisco, CA',
    timezone: 'PST',
    skills: [
      { name: 'JavaScript', level: 4, category: 'Programming' },
      { name: 'React', level: 3, category: 'Frontend' },
      { name: 'Python', level: 3, category: 'Programming' },
      { name: 'Node.js', level: 2, category: 'Backend' }
    ],
    interests: [
      { name: 'Web Development', strength: 5, category: 'Technology' },
      { name: 'Machine Learning', strength: 4, category: 'Technology' },
      { name: 'UI/UX Design', strength: 3, category: 'Design' }
    ],
    careerGoals: ['Become a Senior Software Engineer', 'Lead a development team', 'Start a tech company'],
    educationLevel: 'bachelor',
    experienceLevel: 'junior'
  },
  progress: {
    level: 5,
    totalXP: 1250,
    currentStreak: 7,
    longestStreak: 15,
    completedMilestones: ['javascript-basics', 'react-fundamentals', 'first-project'],
    achievements: [
      {
        id: '1',
        name: 'Quick Learner',
        description: 'Completed 5 sessions in a day',
        icon: '⚡',
        unlockedAt: new Date(),
        category: 'learning'
      },
      {
        id: '2',
        name: 'Streak Master',
        description: 'Maintained a 7-day learning streak',
        icon: '🔥',
        unlockedAt: new Date(),
        category: 'learning'
      }
    ],
    weeklyGoals: [
      {
        id: '1',
        title: 'Complete 5 study sessions',
        target: 5,
        current: 3,
        category: 'learning',
        deadline: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
      }
    ],
    lastActivity: new Date()
  },
  preferences: {
    theme: 'light',
    notifications: {
      email: true,
      push: true,
      achievements: true,
      mentorMessages: true,
      opportunities: true,
      communityActivity: false
    },
    privacy: {
      profileVisibility: 'public',
      showProgress: true,
      showAchievements: true,
      allowMentorRequests: true
    },
    learningStyle: 'visual',
    coachingPreferences: {
      communicationStyle: 'encouraging',
      feedbackFrequency: 'immediate',
      motivationStyle: 'personal_growth'
    }
  }
}

// Mock Mentors Database - DIVERSE DOMAINS WITH PROPER MATCHING
export const mockMentors: Mentor[] = [
  // SOFTWARE ENGINEERING
  {
    id: '1',
    name: 'Vijaya Bhaskara Lakshmi Yeditha',
    avatar: '',
    title: 'Senior Software Engineer',
    company: 'Google',
    bio: 'Passionate about mentoring junior developers and helping them navigate their career growth in tech. 8+ years of experience in full-stack development.',
    expertise: [
      { name: 'React', level: 5, yearsExperience: 6 },
      { name: 'Node.js', level: 5, yearsExperience: 7 },
      { name: 'System Design', level: 4, yearsExperience: 5 },
      { name: 'Career Development', level: 5, yearsExperience: 8 }
    ],
    availability: 'available',
    rating: 4.9,
    reviewCount: 127,
    responseTime: '< 2 hours',
    languages: ['English', 'Telugu'],
    linkedinUrl: 'https://www.linkedin.com/in/vijaya-bhaskara-lakshmi-yeditha-5bb0b9328/'
  },
  {
    id: '2',
    name: 'Grishma Chowdary',
    avatar: '',
    title: 'Data Science Manager',
    company: 'Microsoft',
    bio: 'Helping aspiring data scientists build strong foundations and advance their careers. Former researcher with industry experience.',
    expertise: [
      { name: 'Machine Learning', level: 5, yearsExperience: 10 },
      { name: 'Python', level: 5, yearsExperience: 12 },
      { name: 'Leadership', level: 4, yearsExperience: 6 },
      { name: 'Data Analysis', level: 5, yearsExperience: 10 }
    ],
    availability: 'available',
    rating: 4.8,
    reviewCount: 89,
    responseTime: '< 4 hours',
    languages: ['English', 'Telugu'],
    linkedinUrl: 'https://www.linkedin.com/in/grishma-chowdary-775927325/'
  },
  {
    id: '3',
    name: 'Lakshmi Aishwarya Datla',
    avatar: '',
    title: 'UX Design Lead',
    company: 'Airbnb',
    bio: 'Passionate about creating user-centered designs and mentoring the next generation of designers. 10+ years in product design.',
    expertise: [
      { name: 'User Research', level: 5, yearsExperience: 8 },
      { name: 'Design Systems', level: 5, yearsExperience: 6 },
      { name: 'Prototyping', level: 4, yearsExperience: 10 },
      { name: 'Team Leadership', level: 4, yearsExperience: 5 }
    ],
    availability: 'busy',
    rating: 4.9,
    reviewCount: 156,
    responseTime: '< 1 hour',
    languages: ['English', 'Telugu'],
    linkedinUrl: 'https://www.linkedin.com/in/lakshmi-aishwarya-datla-3417a9355'
  },
  {
    id: '4',
    name: 'David Kim',
    avatar: '',
    title: 'DevOps Engineer',
    company: 'Netflix',
    bio: 'Specializing in cloud infrastructure and helping developers understand scalable systems. Love sharing knowledge about modern DevOps practices.',
    expertise: [
      { name: 'AWS', level: 5, yearsExperience: 7 },
      { name: 'Docker', level: 5, yearsExperience: 6 },
      { name: 'Kubernetes', level: 4, yearsExperience: 4 },
      { name: 'CI/CD', level: 5, yearsExperience: 8 }
    ],
    availability: 'available',
    rating: 4.7,
    reviewCount: 73,
    responseTime: '< 6 hours',
    languages: ['English', 'Korean']
  },
  {
    id: '5',
    name: 'Lisa Thompson',
    avatar: '',
    title: 'Product Manager',
    company: 'Stripe',
    bio: 'Helping technical professionals transition into product management roles. Background in engineering with 5+ years in product.',
    expertise: [
      { name: 'Product Strategy', level: 5, yearsExperience: 5 },
      { name: 'User Research', level: 4, yearsExperience: 6 },
      { name: 'Data Analysis', level: 4, yearsExperience: 7 },
      { name: 'Stakeholder Management', level: 5, yearsExperience: 5 }
    ],
    availability: 'available',
    rating: 4.8,
    reviewCount: 94,
    responseTime: '< 3 hours',
    languages: ['English']
  },
  // CYBERSECURITY
  {
    id: '6',
    name: 'Ahmed Hassan',
    avatar: '',
    title: 'Cybersecurity Architect',
    company: 'CrowdStrike',
    bio: 'Protecting organizations from cyber threats for 12+ years. Passionate about teaching ethical hacking and security best practices to the next generation.',
    expertise: [
      { name: 'Penetration Testing', level: 5, yearsExperience: 10 },
      { name: 'Network Security', level: 5, yearsExperience: 12 },
      { name: 'Incident Response', level: 4, yearsExperience: 8 },
      { name: 'Security Architecture', level: 5, yearsExperience: 9 }
    ],
    availability: 'available',
    rating: 4.9,
    reviewCount: 67,
    responseTime: '< 3 hours',
    languages: ['English', 'Arabic']
  },
  // MOBILE DEVELOPMENT
  {
    id: '7',
    name: 'Priya Sharma',
    avatar: '',
    title: 'Senior iOS Developer',
    company: 'Uber',
    bio: 'Building mobile experiences that millions use daily. Specializing in iOS development with Swift and helping developers create amazing mobile apps.',
    expertise: [
      { name: 'Swift', level: 5, yearsExperience: 8 },
      { name: 'iOS Development', level: 5, yearsExperience: 9 },
      { name: 'Mobile Architecture', level: 4, yearsExperience: 6 },
      { name: 'App Store Optimization', level: 4, yearsExperience: 5 }
    ],
    availability: 'available',
    rating: 4.8,
    reviewCount: 112,
    responseTime: '< 4 hours',
    languages: ['English', 'Hindi']
  },
  // BLOCKCHAIN & WEB3
  {
    id: '8',
    name: 'Carlos Mendoza',
    avatar: '',
    title: 'Blockchain Engineer',
    company: 'Coinbase',
    bio: 'Pioneer in blockchain technology with expertise in smart contracts and DeFi protocols. Helping developers enter the Web3 space.',
    expertise: [
      { name: 'Solidity', level: 5, yearsExperience: 6 },
      { name: 'Smart Contracts', level: 5, yearsExperience: 7 },
      { name: 'DeFi Protocols', level: 4, yearsExperience: 5 },
      { name: 'Ethereum', level: 5, yearsExperience: 6 }
    ],
    availability: 'available',
    rating: 4.7,
    reviewCount: 45,
    responseTime: '< 5 hours',
    languages: ['English', 'Spanish']
  },
  // GAME DEVELOPMENT
  {
    id: '9',
    name: 'Yuki Tanaka',
    avatar: '',
    title: 'Game Development Director',
    company: 'Unity Technologies',
    bio: 'Creating immersive gaming experiences for 15+ years. Passionate about mentoring indie developers and teaching game design principles.',
    expertise: [
      { name: 'Unity', level: 5, yearsExperience: 12 },
      { name: 'C#', level: 5, yearsExperience: 15 },
      { name: 'Game Design', level: 5, yearsExperience: 15 },
      { name: '3D Graphics', level: 4, yearsExperience: 10 }
    ],
    availability: 'available',
    rating: 4.9,
    reviewCount: 89,
    responseTime: '< 6 hours',
    languages: ['English', 'Japanese']
  },
  // DIGITAL MARKETING
  {
    id: '10',
    name: 'Sophie Laurent',
    avatar: '',
    title: 'Digital Marketing Director',
    company: 'HubSpot',
    bio: 'Growth hacker and digital marketing expert. Helping businesses and individuals build their online presence and master digital marketing strategies.',
    expertise: [
      { name: 'SEO', level: 5, yearsExperience: 8 },
      { name: 'Content Marketing', level: 5, yearsExperience: 9 },
      { name: 'Social Media Strategy', level: 4, yearsExperience: 7 },
      { name: 'Analytics', level: 4, yearsExperience: 6 }
    ],
    availability: 'available',
    rating: 4.8,
    reviewCount: 134,
    responseTime: '< 2 hours',
    languages: ['English', 'French']
  },
  // CLOUD ARCHITECTURE
  {
    id: '11',
    name: 'Robert Anderson',
    avatar: '',
    title: 'Cloud Solutions Architect',
    company: 'Amazon Web Services',
    bio: 'Designing scalable cloud solutions for enterprise clients. Expert in AWS services and helping organizations migrate to the cloud successfully.',
    expertise: [
      { name: 'AWS', level: 5, yearsExperience: 10 },
      { name: 'Cloud Architecture', level: 5, yearsExperience: 12 },
      { name: 'Serverless', level: 4, yearsExperience: 6 },
      { name: 'Infrastructure as Code', level: 5, yearsExperience: 8 }
    ],
    availability: 'available',
    rating: 4.9,
    reviewCount: 78,
    responseTime: '< 4 hours',
    languages: ['English']
  },
  // BUSINESS ANALYSIS
  {
    id: '12',
    name: 'Maria Gonzalez',
    avatar: '',
    title: 'Senior Business Analyst',
    company: 'McKinsey & Company',
    bio: 'Bridging the gap between business and technology for Fortune 500 companies. Helping professionals develop analytical and strategic thinking skills.',
    expertise: [
      { name: 'Business Analysis', level: 5, yearsExperience: 9 },
      { name: 'Requirements Gathering', level: 5, yearsExperience: 10 },
      { name: 'Process Improvement', level: 4, yearsExperience: 8 },
      { name: 'Stakeholder Management', level: 5, yearsExperience: 9 }
    ],
    availability: 'available',
    rating: 4.8,
    reviewCount: 96,
    responseTime: '< 3 hours',
    languages: ['English', 'Spanish']
  },
  // TECHNICAL WRITING
  {
    id: '13',
    name: 'Jennifer Wu',
    avatar: '',
    title: 'Senior Technical Writer',
    company: 'Atlassian',
    bio: 'Making complex technical concepts accessible through clear documentation. Helping developers and technical professionals improve their communication skills.',
    expertise: [
      { name: 'Technical Writing', level: 5, yearsExperience: 8 },
      { name: 'Documentation Strategy', level: 4, yearsExperience: 6 },
      { name: 'API Documentation', level: 5, yearsExperience: 7 },
      { name: 'Content Strategy', level: 4, yearsExperience: 5 }
    ],
    availability: 'available',
    rating: 4.7,
    reviewCount: 52,
    responseTime: '< 5 hours',
    languages: ['English', 'Mandarin']
  },
  // QUALITY ASSURANCE
  {
    id: '14',
    name: 'Michael O\'Brien',
    avatar: '',
    title: 'QA Engineering Manager',
    company: 'Spotify',
    bio: 'Ensuring software quality through comprehensive testing strategies. Passionate about test automation and helping QA professionals advance their careers.',
    expertise: [
      { name: 'Test Automation', level: 5, yearsExperience: 10 },
      { name: 'Quality Assurance', level: 5, yearsExperience: 12 },
      { name: 'Performance Testing', level: 4, yearsExperience: 8 },
      { name: 'Team Leadership', level: 4, yearsExperience: 6 }
    ],
    availability: 'available',
    rating: 4.8,
    reviewCount: 71,
    responseTime: '< 4 hours',
    languages: ['English']
  },
  // SALES ENGINEERING
  {
    id: '15',
    name: 'Rachel Kim',
    avatar: '',
    title: 'Senior Sales Engineer',
    company: 'Salesforce',
    bio: 'Combining technical expertise with sales acumen to drive revenue growth. Helping technical professionals transition into customer-facing roles.',
    expertise: [
      { name: 'Technical Sales', level: 5, yearsExperience: 7 },
      { name: 'Solution Architecture', level: 4, yearsExperience: 6 },
      { name: 'Customer Relations', level: 5, yearsExperience: 8 },
      { name: 'Presentation Skills', level: 5, yearsExperience: 7 }
    ],
    availability: 'available',
    rating: 4.9,
    reviewCount: 63,
    responseTime: '< 2 hours',
    languages: ['English', 'Korean']
  },
  // DATA ENGINEERING
  {
    id: '16',
    name: 'Alessandro Rossi',
    avatar: '',
    title: 'Principal Data Engineer',
    company: 'Databricks',
    bio: 'Building robust data pipelines and infrastructure at scale. Helping data professionals master big data technologies and modern data stack.',
    expertise: [
      { name: 'Apache Spark', level: 5, yearsExperience: 8 },
      { name: 'Data Pipelines', level: 5, yearsExperience: 10 },
      { name: 'Kafka', level: 4, yearsExperience: 6 },
      { name: 'Data Architecture', level: 5, yearsExperience: 9 }
    ],
    availability: 'available',
    rating: 4.8,
    reviewCount: 54,
    responseTime: '< 6 hours',
    languages: ['English', 'Italian']
  },
  // RESEARCH SCIENTIST
  {
    id: '17',
    name: 'Dr. Fatima Al-Zahra',
    avatar: '',
    title: 'AI Research Scientist',
    company: 'DeepMind',
    bio: 'Advancing the frontiers of artificial intelligence research. PhD in Computer Science with focus on deep learning and natural language processing.',
    expertise: [
      { name: 'Deep Learning', level: 5, yearsExperience: 8 },
      { name: 'Natural Language Processing', level: 5, yearsExperience: 7 },
      { name: 'Research Methodology', level: 5, yearsExperience: 10 },
      { name: 'Academic Writing', level: 4, yearsExperience: 9 }
    ],
    availability: 'busy',
    rating: 4.9,
    reviewCount: 34,
    responseTime: '< 8 hours',
    languages: ['English', 'Arabic']
  },
  // MACHINE LEARNING ENGINEER
  {
    id: '18',
    name: 'Raj Patel',
    avatar: '',
    title: 'ML Engineering Lead',
    company: 'Tesla',
    bio: 'Deploying machine learning models in production at scale. Specializing in MLOps and helping data scientists transition to ML engineering roles.',
    expertise: [
      { name: 'MLOps', level: 5, yearsExperience: 6 },
      { name: 'TensorFlow', level: 5, yearsExperience: 8 },
      { name: 'Model Deployment', level: 5, yearsExperience: 7 },
      { name: 'Kubernetes', level: 4, yearsExperience: 5 }
    ],
    availability: 'available',
    rating: 4.8,
    reviewCount: 87,
    responseTime: '< 3 hours',
    languages: ['English', 'Hindi', 'Gujarati']
  }
]

// Mock Opportunities Database
export const mockOpportunities: Opportunity[] = [
  {
    id: '1',
    title: 'Google Summer of Code 2024',
    type: 'fellowship',
    organization: 'Google',
    description: 'Work with open source organizations on exciting projects while getting mentored by experienced developers.',
    requirements: ['Currently enrolled in university', 'Programming experience', 'Open source contributions'],
    benefits: ['$6,000 stipend', 'Mentorship', 'Certificate', 'Networking opportunities'],
    deadline: new Date('2024-04-02'),
    location: 'Remote',
    remote: true,
    relevanceScore: 95
  },
  {
    id: '2',
    title: 'Software Engineering Internship',
    type: 'internship',
    organization: 'Microsoft',
    description: 'Join our team to work on cutting-edge cloud technologies and gain hands-on experience with Azure services.',
    requirements: ['Computer Science major', 'Knowledge of C# or Python', 'Strong problem-solving skills'],
    benefits: ['Competitive salary', 'Housing assistance', 'Full-time offer potential', 'Mentorship program'],
    deadline: new Date('2024-03-15'),
    location: 'Seattle, WA',
    remote: false,
    relevanceScore: 88
  },
  {
    id: '3',
    title: 'Diversity in Tech Scholarship',
    type: 'scholarship',
    organization: 'Tech Diversity Foundation',
    description: 'Supporting underrepresented students in technology with financial assistance and mentorship opportunities.',
    requirements: ['Underrepresented minority in tech', 'GPA 3.0+', 'Financial need demonstration'],
    benefits: ['$5,000 award', 'Mentorship program', 'Industry connections', 'Conference tickets'],
    deadline: new Date('2024-05-01'),
    location: 'Various',
    remote: true,
    relevanceScore: 92
  },
  {
    id: '4',
    title: 'Frontend Developer Position',
    type: 'job',
    organization: 'Airbnb',
    description: 'Build beautiful, responsive user interfaces that millions of users interact with daily.',
    requirements: ['3+ years React experience', 'TypeScript proficiency', 'Design system experience'],
    benefits: ['Competitive salary', 'Equity package', 'Health benefits', 'Learning budget'],
    deadline: new Date('2024-04-20'),
    location: 'San Francisco, CA',
    remote: true,
    relevanceScore: 82
  },
  {
    id: '5',
    title: 'AI Research Grant',
    type: 'grant',
    organization: 'National Science Foundation',
    description: 'Funding for innovative research projects in artificial intelligence and machine learning.',
    requirements: ['PhD in related field', 'Research proposal', 'University affiliation'],
    benefits: ['$50,000 funding', 'Research resources', 'Publication opportunities', 'Conference presentations'],
    deadline: new Date('2024-06-15'),
    location: 'Various',
    remote: true,
    relevanceScore: 75
  }
]

// Mock Community Posts
export const mockCommunityPosts: CommunityPost[] = [
  {
    id: '1',
    userId: '2',
    userName: 'Sarah Chen',
    userAvatar: '',
    content: "Just completed my first technical interview! The mock interviews on MentorX really prepared me well. Thanks to everyone who shared their tips! 🎉",
    type: 'celebration',
    reactions: [
      { id: '1', userId: '3', type: 'celebrate', createdAt: new Date() },
      { id: '2', userId: '4', type: 'like', createdAt: new Date() }
    ],
    comments: [
      {
        id: '1',
        userId: '3',
        userName: 'Marcus Johnson',
        content: 'Congratulations! That\'s a huge milestone. How did you feel about the technical questions?',
        createdAt: new Date()
      }
    ],
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000)
  },
  {
    id: '2',
    userId: '3',
    userName: 'Marcus Johnson',
    userAvatar: '',
    content: "Unlocked the 'Mentor Connector' achievement after helping 5 community members this week!",
    type: 'achievement',
    achievements: [
      { name: 'Mentor Connector', icon: '🤝' },
      { name: 'Helper Badge', icon: '🏅' }
    ],
    reactions: [
      { id: '3', userId: '2', type: 'celebrate', createdAt: new Date() }
    ],
    comments: [],
    createdAt: new Date(Date.now() - 4 * 60 * 60 * 1000)
  },
  {
    id: '3',
    userId: '4',
    userName: 'Emily Rodriguez',
    userAvatar: '',
    content: "Can anyone recommend good resources for learning system design? I'm preparing for senior-level interviews and want to strengthen this area.",
    type: 'question',
    reactions: [
      { id: '4', userId: '1', type: 'like', createdAt: new Date() }
    ],
    comments: [
      {
        id: '2',
        userId: '1',
        userName: 'Alex Johnson',
        content: 'I found "Designing Data-Intensive Applications" really helpful. Also check out the system design primer on GitHub!',
        createdAt: new Date()
      }
    ],
    createdAt: new Date(Date.now() - 6 * 60 * 60 * 1000)
  }
]

// Local Storage Keys
export const STORAGE_KEYS = {
  USER_PROFILE: 'mentorx_user_profile',
  CAREER_ASSESSMENT: 'mentorx_career_assessment',
  STUDY_PROGRESS: 'mentorx_study_progress',
  CHAT_HISTORY: 'mentorx_chat_history',
  COMMUNITY_POSTS: 'mentorx_community_posts',
  OPPORTUNITIES: 'mentorx_opportunities'
}

// Local Storage Utilities
export const StorageService = {
  get: (key: string) => {
    try {
      const item = localStorage.getItem(key)
      return item ? JSON.parse(item) : null
    } catch (error) {
      console.error('Error reading from localStorage:', error)
      return null
    }
  },

  set: (key: string, value: any) => {
    try {
      localStorage.setItem(key, JSON.stringify(value))
    } catch (error) {
      console.error('Error writing to localStorage:', error)
    }
  },

  remove: (key: string) => {
    try {
      localStorage.removeItem(key)
    } catch (error) {
      console.error('Error removing from localStorage:', error)
    }
  },

  clear: () => {
    try {
      localStorage.clear()
    } catch (error) {
      console.error('Error clearing localStorage:', error)
    }
  }
}

// Initialize mock data in localStorage if not present
export const initializeMockData = () => {
  if (!StorageService.get(STORAGE_KEYS.USER_PROFILE)) {
    StorageService.set(STORAGE_KEYS.USER_PROFILE, mockUser)
  }
  
  if (!StorageService.get(STORAGE_KEYS.COMMUNITY_POSTS)) {
    StorageService.set(STORAGE_KEYS.COMMUNITY_POSTS, mockCommunityPosts)
  }
  
  if (!StorageService.get(STORAGE_KEYS.OPPORTUNITIES)) {
    StorageService.set(STORAGE_KEYS.OPPORTUNITIES, mockOpportunities)
  }
}

export default {
  mockUser,
  mockMentors,
  mockOpportunities,
  mockCommunityPosts,
  StorageService,
  initializeMockData,
  STORAGE_KEYS
}