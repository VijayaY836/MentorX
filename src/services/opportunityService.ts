// Dynamic Opportunity Service with AI-Powered Matching
// import { OpportunityAIService } from './aiServices'

export interface DynamicOpportunity {
  id: string
  title: string
  type: 'scholarship' | 'internship' | 'job' | 'fellowship' | 'grant' | 'bootcamp' | 'course'
  organization: string
  description: string
  requirements: string[]
  benefits: string[]
  deadline: Date
  location?: string
  remote: boolean
  salary?: { min: number; max: number; currency: string }
  duration?: string
  level: 'entry' | 'junior' | 'mid' | 'senior'
  skills: string[]
  industry: string
  source: 'linkedin' | 'indeed' | 'glassdoor' | 'github' | 'stackoverflow' | 'coursera' | 'udacity'
  url: string
  postedDate: Date
  relevanceScore?: number
  aiInsights?: {
    matchReason: string
    skillAlignment: number
    careerFit: number
    growthPotential: number
    recommendations: string[]
  }
}

export interface OpportunityFilters {
  type?: string[]
  level?: string[]
  remote?: boolean
  location?: string
  salary?: { min: number; max: number }
  skills?: string[]
  industry?: string[]
}

export class OpportunityService {
  private static cache: Map<string, DynamicOpportunity[]> = new Map()
  private static lastFetch: Map<string, number> = new Map()
  private static readonly CACHE_DURATION = 30 * 60 * 1000 // 30 minutes

  // Simulate real-time opportunity fetching (in production, this would call actual APIs)
  static async fetchDynamicOpportunities(
    _userProfile: any,
    filters: OpportunityFilters = {}
  ): Promise<DynamicOpportunity[]> {
    const cacheKey = this.generateCacheKey(_userProfile, filters)
    const now = Date.now()
    
    // Check cache first
    if (this.cache.has(cacheKey) && 
        this.lastFetch.has(cacheKey) && 
        now - this.lastFetch.get(cacheKey)! < this.CACHE_DURATION) {
      return this.cache.get(cacheKey)!
    }

    // Simulate API calls to multiple sources
    const opportunities = await Promise.all([
      this.fetchLinkedInJobs(_userProfile, filters),
      this.fetchGitHubJobs(_userProfile, filters),
      this.fetchStackOverflowJobs(_userProfile, filters),
      this.fetchEducationalOpportunities(_userProfile, filters),
      this.fetchScholarships(_userProfile, filters)
    ])

    // Flatten and deduplicate
    const allOpportunities = opportunities.flat()
    const uniqueOpportunities = this.deduplicateOpportunities(allOpportunities)

    // AI-powered relevance scoring and insights
    const scoredOpportunities = await this.scoreOpportunities(uniqueOpportunities, _userProfile)

    // Sort by relevance score
    const sortedOpportunities = scoredOpportunities.sort((a, b) => 
      (b.relevanceScore || 0) - (a.relevanceScore || 0)
    )

    // Cache results
    this.cache.set(cacheKey, sortedOpportunities)
    this.lastFetch.set(cacheKey, now)

    return sortedOpportunities
  }

  // LinkedIn Jobs API simulation
  private static async fetchLinkedInJobs(
    _userProfile: any, 
    filters: OpportunityFilters
  ): Promise<DynamicOpportunity[]> {
    // In production, this would call LinkedIn's Job Search API
    const mockLinkedInJobs: DynamicOpportunity[] = [
      // SENIOR LEVEL POSITIONS
      {
        id: 'li_001',
        title: 'Senior React Developer',
        type: 'job',
        organization: 'Meta',
        description: 'Build the future of social connection with React, TypeScript, and cutting-edge web technologies. Join our team working on products used by billions.',
        requirements: [
          '5+ years React experience',
          'TypeScript proficiency',
          'GraphQL knowledge',
          'Performance optimization skills'
        ],
        benefits: [
          '$180K-$250K salary',
          'Equity package',
          'Health & dental',
          'Learning budget $4K/year'
        ],
        deadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        location: 'Menlo Park, CA',
        remote: true,
        salary: { min: 180000, max: 250000, currency: 'USD' },
        level: 'senior',
        skills: ['React', 'TypeScript', 'GraphQL', 'JavaScript', 'Node.js'],
        industry: 'Social Media',
        source: 'linkedin',
        url: 'https://linkedin.com/jobs/meta-react-dev',
        postedDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000)
      },
      {
        id: 'li_004',
        title: 'Senior Data Scientist',
        type: 'job',
        organization: 'Netflix',
        description: 'Drive data-driven decision making for content recommendations and user experience optimization.',
        requirements: [
          '5+ years data science experience',
          'Python/R proficiency',
          'Machine learning expertise',
          'Statistical modeling skills'
        ],
        benefits: [
          '$200K-$280K salary',
          'Stock options',
          'Unlimited vacation',
          'Top-tier health benefits'
        ],
        deadline: new Date(Date.now() + 25 * 24 * 60 * 60 * 1000),
        location: 'Los Gatos, CA',
        remote: true,
        salary: { min: 200000, max: 280000, currency: 'USD' },
        level: 'senior',
        skills: ['Python', 'Machine Learning', 'SQL', 'TensorFlow', 'Statistics'],
        industry: 'Entertainment',
        source: 'linkedin',
        url: 'https://linkedin.com/jobs/netflix-data-scientist',
        postedDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000)
      },
      {
        id: 'li_005',
        title: 'Senior UX Designer',
        type: 'job',
        organization: 'Apple',
        description: 'Design intuitive user experiences for next-generation Apple products used by millions worldwide.',
        requirements: [
          '6+ years UX design experience',
          'Figma/Sketch proficiency',
          'User research skills',
          'Design systems experience'
        ],
        benefits: [
          '$170K-$220K salary',
          'Apple stock grants',
          'Product discounts',
          'Comprehensive benefits'
        ],
        deadline: new Date(Date.now() + 35 * 24 * 60 * 60 * 1000),
        location: 'Cupertino, CA',
        remote: false,
        salary: { min: 170000, max: 220000, currency: 'USD' },
        level: 'senior',
        skills: ['UX Design', 'Figma', 'User Research', 'Prototyping', 'Design Systems'],
        industry: 'Technology',
        source: 'linkedin',
        url: 'https://linkedin.com/jobs/apple-ux-designer',
        postedDate: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000)
      },
      {
        id: 'li_006',
        title: 'Senior DevOps Engineer',
        type: 'job',
        organization: 'Amazon',
        description: 'Build and maintain cloud infrastructure supporting millions of customers on AWS.',
        requirements: [
          '5+ years DevOps experience',
          'AWS expertise',
          'Kubernetes proficiency',
          'Infrastructure as Code'
        ],
        benefits: [
          '$160K-$210K salary',
          'Amazon stock units',
          'Career development fund',
          'Flexible work arrangements'
        ],
        deadline: new Date(Date.now() + 28 * 24 * 60 * 60 * 1000),
        location: 'Seattle, WA',
        remote: true,
        salary: { min: 160000, max: 210000, currency: 'USD' },
        level: 'senior',
        skills: ['AWS', 'Kubernetes', 'Docker', 'Terraform', 'CI/CD'],
        industry: 'Cloud Computing',
        source: 'linkedin',
        url: 'https://linkedin.com/jobs/amazon-devops',
        postedDate: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000)
      },

      // MID LEVEL POSITIONS
      {
        id: 'li_007',
        title: 'Full-Stack Developer',
        type: 'job',
        organization: 'Stripe',
        description: 'Build payment infrastructure that powers the internet economy. Work with React, Node.js, and distributed systems.',
        requirements: [
          '3+ years full-stack experience',
          'React and Node.js proficiency',
          'Database design skills',
          'API development experience'
        ],
        benefits: [
          '$140K-$180K salary',
          'Equity package',
          'Unlimited PTO',
          'Remote-first culture'
        ],
        deadline: new Date(Date.now() + 21 * 24 * 60 * 60 * 1000),
        location: 'San Francisco, CA',
        remote: true,
        salary: { min: 140000, max: 180000, currency: 'USD' },
        level: 'mid',
        skills: ['React', 'Node.js', 'PostgreSQL', 'TypeScript', 'AWS'],
        industry: 'Fintech',
        source: 'linkedin',
        url: 'https://linkedin.com/jobs/stripe-fullstack',
        postedDate: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000)
      },
      {
        id: 'li_008',
        title: 'Product Manager',
        type: 'job',
        organization: 'Spotify',
        description: 'Drive product strategy for music discovery features used by 400M+ users worldwide.',
        requirements: [
          '3-5 years product management',
          'Data-driven decision making',
          'User research experience',
          'Agile methodology knowledge'
        ],
        benefits: [
          '$130K-$170K salary',
          'Spotify equity',
          'Music streaming perks',
          'Global mobility options'
        ],
        deadline: new Date(Date.now() + 32 * 24 * 60 * 60 * 1000),
        location: 'New York, NY',
        remote: true,
        salary: { min: 130000, max: 170000, currency: 'USD' },
        level: 'mid',
        skills: ['Product Management', 'Analytics', 'User Research', 'Agile', 'SQL'],
        industry: 'Music Streaming',
        source: 'linkedin',
        url: 'https://linkedin.com/jobs/spotify-pm',
        postedDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000)
      },
      {
        id: 'li_009',
        title: 'Data Engineer',
        type: 'job',
        organization: 'Airbnb',
        description: 'Build scalable data pipelines supporting millions of bookings and host interactions.',
        requirements: [
          '3+ years data engineering',
          'Python/Scala proficiency',
          'Apache Spark experience',
          'Cloud platform knowledge'
        ],
        benefits: [
          '$135K-$175K salary',
          'Airbnb stock options',
          'Travel credits',
          'Flexible work policy'
        ],
        deadline: new Date(Date.now() + 26 * 24 * 60 * 60 * 1000),
        location: 'San Francisco, CA',
        remote: true,
        salary: { min: 135000, max: 175000, currency: 'USD' },
        level: 'mid',
        skills: ['Python', 'Apache Spark', 'SQL', 'AWS', 'Data Pipelines'],
        industry: 'Travel',
        source: 'linkedin',
        url: 'https://linkedin.com/jobs/airbnb-data-engineer',
        postedDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000)
      },
      {
        id: 'li_010',
        title: 'Cybersecurity Analyst',
        type: 'job',
        organization: 'Microsoft',
        description: 'Protect enterprise customers from cyber threats and security vulnerabilities.',
        requirements: [
          '2-4 years security experience',
          'Network security knowledge',
          'Incident response skills',
          'Security tools proficiency'
        ],
        benefits: [
          '$120K-$160K salary',
          'Microsoft stock awards',
          'Professional certifications',
          'Security training budget'
        ],
        deadline: new Date(Date.now() + 40 * 24 * 60 * 60 * 1000),
        location: 'Redmond, WA',
        remote: true,
        salary: { min: 120000, max: 160000, currency: 'USD' },
        level: 'mid',
        skills: ['Network Security', 'Incident Response', 'SIEM', 'Penetration Testing', 'Risk Assessment'],
        industry: 'Technology',
        source: 'linkedin',
        url: 'https://linkedin.com/jobs/microsoft-security',
        postedDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000)
      },

      // JUNIOR LEVEL POSITIONS
      {
        id: 'li_011',
        title: 'Junior Software Developer',
        type: 'job',
        organization: 'Shopify',
        description: 'Join our engineering team building e-commerce solutions for millions of merchants.',
        requirements: [
          '1-2 years programming experience',
          'JavaScript or Ruby knowledge',
          'Web development basics',
          'Problem-solving skills'
        ],
        benefits: [
          '$85K-$110K salary',
          'Stock options',
          'Learning stipend',
          'Mentorship program'
        ],
        deadline: new Date(Date.now() + 35 * 24 * 60 * 60 * 1000),
        location: 'Toronto, Canada',
        remote: true,
        salary: { min: 85000, max: 110000, currency: 'CAD' },
        level: 'junior',
        skills: ['JavaScript', 'Ruby', 'HTML', 'CSS', 'Git'],
        industry: 'E-commerce',
        source: 'linkedin',
        url: 'https://linkedin.com/jobs/shopify-junior-dev',
        postedDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000)
      },
      {
        id: 'li_012',
        title: 'Junior Data Analyst',
        type: 'job',
        organization: 'Uber',
        description: 'Analyze rider and driver data to improve transportation experiences in cities worldwide.',
        requirements: [
          '1-2 years analytics experience',
          'SQL proficiency',
          'Excel/Google Sheets skills',
          'Basic Python knowledge'
        ],
        benefits: [
          '$75K-$95K salary',
          'Uber credits',
          'Health benefits',
          'Career growth opportunities'
        ],
        deadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        location: 'San Francisco, CA',
        remote: true,
        salary: { min: 75000, max: 95000, currency: 'USD' },
        level: 'junior',
        skills: ['SQL', 'Excel', 'Python', 'Data Analysis', 'Tableau'],
        industry: 'Transportation',
        source: 'linkedin',
        url: 'https://linkedin.com/jobs/uber-analyst',
        postedDate: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000)
      },

      // INTERNSHIPS
      {
        id: 'li_002',
        title: 'Frontend Engineer Intern',
        type: 'internship',
        organization: 'Google',
        description: 'Summer internship building user interfaces for Google Cloud Platform. Work with Angular, React, and modern web technologies.',
        requirements: [
          'Computer Science student',
          'JavaScript/TypeScript knowledge',
          'Frontend framework experience',
          'Problem-solving skills'
        ],
        benefits: [
          '$8,500/month stipend',
          'Housing assistance',
          'Mentorship program',
          'Full-time offer potential'
        ],
        deadline: new Date(Date.now() + 45 * 24 * 60 * 60 * 1000),
        location: 'Mountain View, CA',
        remote: false,
        salary: { min: 8500, max: 8500, currency: 'USD' },
        duration: '12 weeks',
        level: 'entry',
        skills: ['JavaScript', 'TypeScript', 'Angular', 'React', 'CSS'],
        industry: 'Technology',
        source: 'linkedin',
        url: 'https://linkedin.com/jobs/google-frontend-intern',
        postedDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000)
      },
      {
        id: 'li_013',
        title: 'Data Science Intern',
        type: 'internship',
        organization: 'Tesla',
        description: 'Apply machine learning to autonomous driving and energy storage challenges.',
        requirements: [
          'Statistics/CS/Engineering student',
          'Python programming',
          'Machine learning coursework',
          'Strong analytical skills'
        ],
        benefits: [
          '$7,500/month stipend',
          'Tesla vehicle access',
          'Cutting-edge projects',
          'Full-time consideration'
        ],
        deadline: new Date(Date.now() + 50 * 24 * 60 * 60 * 1000),
        location: 'Palo Alto, CA',
        remote: false,
        salary: { min: 7500, max: 7500, currency: 'USD' },
        duration: '12 weeks',
        level: 'entry',
        skills: ['Python', 'Machine Learning', 'Statistics', 'TensorFlow', 'Data Analysis'],
        industry: 'Automotive',
        source: 'linkedin',
        url: 'https://linkedin.com/jobs/tesla-data-intern',
        postedDate: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000)
      },
      {
        id: 'li_014',
        title: 'UX Design Intern',
        type: 'internship',
        organization: 'Adobe',
        description: 'Design user experiences for Creative Cloud applications used by millions of creators.',
        requirements: [
          'Design/HCI student',
          'Portfolio of design work',
          'Figma/Adobe Creative Suite',
          'User research interest'
        ],
        benefits: [
          '$6,800/month stipend',
          'Adobe Creative Suite license',
          'Design mentorship',
          'Portfolio development'
        ],
        deadline: new Date(Date.now() + 42 * 24 * 60 * 60 * 1000),
        location: 'San Jose, CA',
        remote: true,
        salary: { min: 6800, max: 6800, currency: 'USD' },
        duration: '12 weeks',
        level: 'entry',
        skills: ['UX Design', 'Figma', 'Adobe Creative Suite', 'User Research', 'Prototyping'],
        industry: 'Software',
        source: 'linkedin',
        url: 'https://linkedin.com/jobs/adobe-ux-intern',
        postedDate: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000)
      },
      {
        id: 'li_015',
        title: 'Marketing Analytics Intern',
        type: 'internship',
        organization: 'HubSpot',
        description: 'Analyze marketing campaigns and customer data to drive growth strategies.',
        requirements: [
          'Marketing/Business student',
          'Excel/Google Analytics',
          'Data visualization skills',
          'Communication skills'
        ],
        benefits: [
          '$5,200/month stipend',
          'HubSpot certification',
          'Marketing training',
          'Networking opportunities'
        ],
        deadline: new Date(Date.now() + 38 * 24 * 60 * 60 * 1000),
        location: 'Boston, MA',
        remote: true,
        salary: { min: 5200, max: 5200, currency: 'USD' },
        duration: '12 weeks',
        level: 'entry',
        skills: ['Marketing Analytics', 'Google Analytics', 'Excel', 'Data Visualization', 'SEO'],
        industry: 'Marketing Technology',
        source: 'linkedin',
        url: 'https://linkedin.com/jobs/hubspot-marketing-intern',
        postedDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000)
      }
    ]

    return this.filterOpportunities(mockLinkedInJobs, filters)
  }

  // GitHub Jobs simulation
  private static async fetchGitHubJobs(
    _userProfile: any, 
    filters: OpportunityFilters
  ): Promise<DynamicOpportunity[]> {
    const mockGitHubJobs: DynamicOpportunity[] = [
      {
        id: 'gh_001',
        title: 'Open Source Maintainer',
        type: 'fellowship',
        organization: 'GitHub',
        description: 'Maintain critical open source projects while getting paid. Work on tools used by millions of developers worldwide.',
        requirements: [
          'Active open source contributor',
          'Strong programming skills',
          'Community engagement experience',
          'Technical writing skills'
        ],
        benefits: [
          '$75K annual stipend',
          'Conference budget',
          'Mentorship from GitHub staff',
          'Global recognition'
        ],
        deadline: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000),
        remote: true,
        level: 'mid',
        skills: ['JavaScript', 'Python', 'Go', 'Rust', 'Open Source'],
        industry: 'Developer Tools',
        source: 'github',
        url: 'https://github.com/sponsors/maintainer-fellowship',
        postedDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000)
      },
      {
        id: 'gh_002',
        title: 'Senior Backend Engineer',
        type: 'job',
        organization: 'GitHub',
        description: 'Build scalable backend systems supporting 100M+ developers worldwide.',
        requirements: [
          '5+ years backend development',
          'Ruby on Rails expertise',
          'Distributed systems knowledge',
          'Database optimization skills'
        ],
        benefits: [
          '$165K-$220K salary',
          'GitHub stock options',
          'Open source time',
          'Developer tool access'
        ],
        deadline: new Date(Date.now() + 35 * 24 * 60 * 60 * 1000),
        location: 'San Francisco, CA',
        remote: true,
        salary: { min: 165000, max: 220000, currency: 'USD' },
        level: 'senior',
        skills: ['Ruby on Rails', 'PostgreSQL', 'Redis', 'Kubernetes', 'Git'],
        industry: 'Developer Tools',
        source: 'github',
        url: 'https://github.com/careers/backend-engineer',
        postedDate: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000)
      },
      {
        id: 'gh_003',
        title: 'DevOps Engineer',
        type: 'job',
        organization: 'GitLab',
        description: 'Maintain and scale GitLab.com infrastructure serving millions of projects.',
        requirements: [
          '3+ years DevOps experience',
          'Kubernetes proficiency',
          'CI/CD pipeline expertise',
          'Cloud platform knowledge'
        ],
        benefits: [
          '$140K-$180K salary',
          'All-remote culture',
          'Learning budget',
          'Flexible schedule'
        ],
        deadline: new Date(Date.now() + 28 * 24 * 60 * 60 * 1000),
        remote: true,
        salary: { min: 140000, max: 180000, currency: 'USD' },
        level: 'mid',
        skills: ['Kubernetes', 'Docker', 'GitLab CI', 'AWS', 'Terraform'],
        industry: 'Developer Tools',
        source: 'github',
        url: 'https://gitlab.com/careers/devops',
        postedDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000)
      },
      {
        id: 'gh_004',
        title: 'Machine Learning Engineer',
        type: 'job',
        organization: 'Hugging Face',
        description: 'Build and deploy ML models for natural language processing and computer vision.',
        requirements: [
          '3+ years ML engineering',
          'Python/PyTorch expertise',
          'Model deployment experience',
          'Research background preferred'
        ],
        benefits: [
          '$150K-$200K salary',
          'Equity package',
          'Research time',
          'Conference attendance'
        ],
        deadline: new Date(Date.now() + 40 * 24 * 60 * 60 * 1000),
        location: 'New York, NY',
        remote: true,
        salary: { min: 150000, max: 200000, currency: 'USD' },
        level: 'mid',
        skills: ['Python', 'PyTorch', 'Transformers', 'MLOps', 'Docker'],
        industry: 'Artificial Intelligence',
        source: 'github',
        url: 'https://huggingface.co/careers/ml-engineer',
        postedDate: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000)
      },
      {
        id: 'gh_005',
        title: 'Frontend Developer',
        type: 'job',
        organization: 'Vercel',
        description: 'Build the future of web development with Next.js and modern frontend technologies.',
        requirements: [
          '2+ years React experience',
          'Next.js proficiency',
          'TypeScript knowledge',
          'Performance optimization'
        ],
        benefits: [
          '$120K-$160K salary',
          'Vercel equity',
          'Remote-first',
          'Latest tech stack'
        ],
        deadline: new Date(Date.now() + 32 * 24 * 60 * 60 * 1000),
        remote: true,
        salary: { min: 120000, max: 160000, currency: 'USD' },
        level: 'mid',
        skills: ['React', 'Next.js', 'TypeScript', 'Vercel', 'CSS'],
        industry: 'Developer Tools',
        source: 'github',
        url: 'https://vercel.com/careers/frontend',
        postedDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000)
      }
    ]

    return this.filterOpportunities(mockGitHubJobs, filters)
  }

  // Stack Overflow Jobs simulation
  private static async fetchStackOverflowJobs(
    _userProfile: any, 
    filters: OpportunityFilters
  ): Promise<DynamicOpportunity[]> {
    const mockSOJobs: DynamicOpportunity[] = [
      {
        id: 'so_001',
        title: 'Backend Developer',
        type: 'job',
        organization: 'Shopify',
        description: 'Build scalable e-commerce infrastructure serving millions of merchants. Work with Ruby on Rails, GraphQL, and microservices.',
        requirements: [
          '4+ years backend experience',
          'Ruby on Rails expertise',
          'GraphQL knowledge',
          'Microservices architecture'
        ],
        benefits: [
          '$130K-$170K salary',
          'Stock options',
          'Health benefits',
          'Professional development budget'
        ],
        deadline: new Date(Date.now() + 28 * 24 * 60 * 60 * 1000),
        location: 'Ottawa, Canada',
        remote: true,
        salary: { min: 130000, max: 170000, currency: 'CAD' },
        level: 'mid',
        skills: ['Ruby on Rails', 'GraphQL', 'PostgreSQL', 'Redis', 'Kubernetes'],
        industry: 'E-commerce',
        source: 'stackoverflow',
        url: 'https://stackoverflow.com/jobs/shopify-backend',
        postedDate: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000)
      },
      {
        id: 'so_002',
        title: 'Senior Java Developer',
        type: 'job',
        organization: 'Oracle',
        description: 'Develop enterprise-grade database and cloud solutions used by Fortune 500 companies.',
        requirements: [
          '5+ years Java development',
          'Spring Framework expertise',
          'Database design skills',
          'Enterprise architecture knowledge'
        ],
        benefits: [
          '$145K-$190K salary',
          'Oracle stock purchase plan',
          'Comprehensive benefits',
          'Career advancement paths'
        ],
        deadline: new Date(Date.now() + 35 * 24 * 60 * 60 * 1000),
        location: 'Austin, TX',
        remote: true,
        salary: { min: 145000, max: 190000, currency: 'USD' },
        level: 'senior',
        skills: ['Java', 'Spring Framework', 'Oracle Database', 'Microservices', 'REST APIs'],
        industry: 'Enterprise Software',
        source: 'stackoverflow',
        url: 'https://stackoverflow.com/jobs/oracle-java',
        postedDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000)
      },
      {
        id: 'so_003',
        title: 'Python Developer',
        type: 'job',
        organization: 'Dropbox',
        description: 'Build file storage and collaboration tools used by millions of users worldwide.',
        requirements: [
          '3+ years Python development',
          'Django/Flask experience',
          'API development skills',
          'Cloud storage knowledge'
        ],
        benefits: [
          '$125K-$165K salary',
          'Dropbox equity',
          'Unlimited storage',
          'Flexible work arrangements'
        ],
        deadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        location: 'San Francisco, CA',
        remote: true,
        salary: { min: 125000, max: 165000, currency: 'USD' },
        level: 'mid',
        skills: ['Python', 'Django', 'PostgreSQL', 'AWS', 'REST APIs'],
        industry: 'Cloud Storage',
        source: 'stackoverflow',
        url: 'https://stackoverflow.com/jobs/dropbox-python',
        postedDate: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000)
      },
      {
        id: 'so_004',
        title: 'Mobile Developer (iOS)',
        type: 'job',
        organization: 'Slack',
        description: 'Develop iOS applications for team communication and productivity.',
        requirements: [
          '3+ years iOS development',
          'Swift proficiency',
          'UIKit/SwiftUI experience',
          'App Store deployment'
        ],
        benefits: [
          '$135K-$175K salary',
          'Slack stock options',
          'Remote work stipend',
          'Professional development'
        ],
        deadline: new Date(Date.now() + 25 * 24 * 60 * 60 * 1000),
        location: 'San Francisco, CA',
        remote: true,
        salary: { min: 135000, max: 175000, currency: 'USD' },
        level: 'mid',
        skills: ['Swift', 'iOS', 'UIKit', 'SwiftUI', 'Core Data'],
        industry: 'Communication',
        source: 'stackoverflow',
        url: 'https://stackoverflow.com/jobs/slack-ios',
        postedDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000)
      },
      {
        id: 'so_005',
        title: 'QA Engineer',
        type: 'job',
        organization: 'Atlassian',
        description: 'Ensure quality for Jira, Confluence, and other developer tools used by millions.',
        requirements: [
          '2+ years QA experience',
          'Test automation skills',
          'Selenium/Cypress knowledge',
          'Agile methodology experience'
        ],
        benefits: [
          '$95K-$125K salary',
          'Atlassian stock',
          'Team collaboration tools',
          'Learning opportunities'
        ],
        deadline: new Date(Date.now() + 38 * 24 * 60 * 60 * 1000),
        location: 'Sydney, Australia',
        remote: true,
        salary: { min: 95000, max: 125000, currency: 'AUD' },
        level: 'mid',
        skills: ['Test Automation', 'Selenium', 'Cypress', 'Java', 'Agile'],
        industry: 'Developer Tools',
        source: 'stackoverflow',
        url: 'https://stackoverflow.com/jobs/atlassian-qa',
        postedDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000)
      }
    ]

    return this.filterOpportunities(mockSOJobs, filters)
  }

  // Educational opportunities (Coursera, Udacity, etc.)
  private static async fetchEducationalOpportunities(
    _userProfile: any, 
    filters: OpportunityFilters
  ): Promise<DynamicOpportunity[]> {
    const mockEducationalOpps: DynamicOpportunity[] = [
      // GOOGLE CERTIFICATES
      {
        id: 'edu_001',
        title: 'Google UX Design Certificate',
        type: 'course',
        organization: 'Google via Coursera',
        description: 'Learn UX design fundamentals and build a professional portfolio. No prior experience required.',
        requirements: [
          'No prerequisites',
          'Commitment to 10 hours/week',
          'Access to design tools'
        ],
        benefits: [
          'Google Career Certificate',
          'Job placement assistance',
          'Portfolio projects',
          'Industry recognition'
        ],
        deadline: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),
        remote: true,
        duration: '3-6 months',
        level: 'entry',
        skills: ['UX Design', 'Figma', 'User Research', 'Prototyping'],
        industry: 'Design',
        source: 'coursera',
        url: 'https://coursera.org/google-ux-design',
        postedDate: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000)
      },
      {
        id: 'edu_003',
        title: 'Google Data Analytics Certificate',
        type: 'course',
        organization: 'Google via Coursera',
        description: 'Master data analytics with hands-on projects using industry-standard tools.',
        requirements: [
          'No prerequisites',
          'Basic computer skills',
          'Commitment to learning'
        ],
        benefits: [
          'Google Career Certificate',
          'Job search support',
          'Real-world projects',
          'Employer consortium access'
        ],
        deadline: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),
        remote: true,
        duration: '3-6 months',
        level: 'entry',
        skills: ['Data Analysis', 'SQL', 'Tableau', 'R Programming', 'Excel'],
        industry: 'Data Analytics',
        source: 'coursera',
        url: 'https://coursera.org/google-data-analytics',
        postedDate: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000)
      },
      {
        id: 'edu_004',
        title: 'Google IT Support Certificate',
        type: 'course',
        organization: 'Google via Coursera',
        description: 'Launch your IT career with hands-on training in technical support fundamentals.',
        requirements: [
          'No prerequisites',
          'Basic computer literacy',
          'Problem-solving interest'
        ],
        benefits: [
          'Google Career Certificate',
          'CompTIA A+ exam prep',
          'Job placement assistance',
          'Entry-level IT roles'
        ],
        deadline: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),
        remote: true,
        duration: '3-6 months',
        level: 'entry',
        skills: ['IT Support', 'Troubleshooting', 'Customer Service', 'Linux', 'Networking'],
        industry: 'Information Technology',
        source: 'coursera',
        url: 'https://coursera.org/google-it-support',
        postedDate: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000)
      },

      // UDACITY NANODEGREES
      {
        id: 'edu_002',
        title: 'AI for Everyone Nanodegree',
        type: 'course',
        organization: 'Udacity',
        description: 'Master artificial intelligence and machine learning with hands-on projects and mentorship.',
        requirements: [
          'Basic programming knowledge',
          'High school mathematics',
          'Dedication to learning'
        ],
        benefits: [
          'Nanodegree certificate',
          '1-on-1 mentorship',
          'Career services',
          'Project portfolio'
        ],
        deadline: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
        remote: true,
        duration: '4 months',
        level: 'mid',
        skills: ['Python', 'Machine Learning', 'TensorFlow', 'Data Science'],
        industry: 'Artificial Intelligence',
        source: 'udacity',
        url: 'https://udacity.com/ai-nanodegree',
        postedDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
      },
      {
        id: 'edu_005',
        title: 'Full Stack Web Developer Nanodegree',
        type: 'course',
        organization: 'Udacity',
        description: 'Build full-stack web applications with Python, JavaScript, and modern frameworks.',
        requirements: [
          'Intermediate programming skills',
          'HTML/CSS knowledge',
          'Basic JavaScript experience'
        ],
        benefits: [
          'Nanodegree certificate',
          'Personal mentor',
          'Career coaching',
          'GitHub portfolio'
        ],
        deadline: new Date(Date.now() + 120 * 24 * 60 * 60 * 1000),
        remote: true,
        duration: '4 months',
        level: 'mid',
        skills: ['Python', 'JavaScript', 'Flask', 'PostgreSQL', 'React'],
        industry: 'Web Development',
        source: 'udacity',
        url: 'https://udacity.com/fullstack-nanodegree',
        postedDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000)
      },
      {
        id: 'edu_006',
        title: 'Data Scientist Nanodegree',
        type: 'course',
        organization: 'Udacity',
        description: 'Learn data science with real-world projects from industry partners.',
        requirements: [
          'Python programming experience',
          'Statistics knowledge',
          'SQL basics'
        ],
        benefits: [
          'Nanodegree certificate',
          'Industry projects',
          'Career services',
          'LinkedIn optimization'
        ],
        deadline: new Date(Date.now() + 100 * 24 * 60 * 60 * 1000),
        remote: true,
        duration: '4 months',
        level: 'mid',
        skills: ['Python', 'Pandas', 'Machine Learning', 'Deep Learning', 'SQL'],
        industry: 'Data Science',
        source: 'udacity',
        url: 'https://udacity.com/data-scientist-nanodegree',
        postedDate: new Date(Date.now() - 9 * 24 * 60 * 60 * 1000)
      },

      // COURSERA SPECIALIZATIONS
      {
        id: 'edu_007',
        title: 'IBM Data Science Professional Certificate',
        type: 'course',
        organization: 'IBM via Coursera',
        description: 'Master data science tools and techniques with hands-on labs and projects.',
        requirements: [
          'No prerequisites',
          'Basic math skills',
          'Curiosity about data'
        ],
        benefits: [
          'IBM Professional Certificate',
          'Hands-on labs',
          'Capstone project',
          'Job search guidance'
        ],
        deadline: new Date(Date.now() + 180 * 24 * 60 * 60 * 1000),
        remote: true,
        duration: '6-10 months',
        level: 'entry',
        skills: ['Python', 'SQL', 'Data Visualization', 'Machine Learning', 'Jupyter'],
        industry: 'Data Science',
        source: 'coursera',
        url: 'https://coursera.org/ibm-data-science',
        postedDate: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000)
      },
      {
        id: 'edu_008',
        title: 'Meta Front-End Developer Certificate',
        type: 'course',
        organization: 'Meta via Coursera',
        description: 'Learn front-end development from Meta engineers with real-world projects.',
        requirements: [
          'No prerequisites',
          'Basic computer skills',
          'Interest in web development'
        ],
        benefits: [
          'Meta Professional Certificate',
          'Portfolio projects',
          'Interview preparation',
          'Job placement support'
        ],
        deadline: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),
        remote: true,
        duration: '7 months',
        level: 'entry',
        skills: ['HTML', 'CSS', 'JavaScript', 'React', 'Version Control'],
        industry: 'Web Development',
        source: 'coursera',
        url: 'https://coursera.org/meta-frontend',
        postedDate: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000)
      },

      // BOOTCAMPS
      {
        id: 'edu_009',
        title: 'Lambda School Full-Stack Program',
        type: 'bootcamp',
        organization: 'Lambda School',
        description: 'Intensive full-stack development program with income share agreement option.',
        requirements: [
          'High school diploma',
          'Basic computer skills',
          'Full-time commitment'
        ],
        benefits: [
          'Job placement guarantee',
          'Income share agreement',
          'Live instruction',
          'Career coaching'
        ],
        deadline: new Date(Date.now() + 45 * 24 * 60 * 60 * 1000),
        remote: true,
        duration: '9 months',
        level: 'entry',
        skills: ['JavaScript', 'React', 'Node.js', 'Python', 'Databases'],
        industry: 'Web Development',
        source: 'coursera',
        url: 'https://lambdaschool.com/fullstack',
        postedDate: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000)
      }
    ]

    return this.filterOpportunities(mockEducationalOpps, filters)
  }

  // Scholarships and grants
  private static async fetchScholarships(
    _userProfile: any, 
    filters: OpportunityFilters
  ): Promise<DynamicOpportunity[]> {
    const mockScholarships: DynamicOpportunity[] = [
      // DIVERSITY & INCLUSION SCHOLARSHIPS
      {
        id: 'sch_001',
        title: 'Women in Tech Scholarship',
        type: 'scholarship',
        organization: 'Adobe Foundation',
        description: 'Supporting women pursuing careers in technology with financial assistance and mentorship.',
        requirements: [
          'Female-identifying student',
          'STEM major',
          'GPA 3.0 or higher',
          'Financial need demonstration'
        ],
        benefits: [
          '$10,000 award',
          'Adobe Creative Suite license',
          'Mentorship program',
          'Internship opportunities'
        ],
        deadline: new Date(Date.now() + 75 * 24 * 60 * 60 * 1000),
        remote: true,
        level: 'entry',
        skills: ['Programming', 'Design', 'Problem Solving'],
        industry: 'Technology',
        source: 'linkedin',
        url: 'https://adobe.com/women-in-tech-scholarship',
        postedDate: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000)
      },
      {
        id: 'sch_002',
        title: 'Google Lime Scholarship',
        type: 'scholarship',
        organization: 'Google',
        description: 'Supporting students with disabilities pursuing computer science and technology degrees.',
        requirements: [
          'Student with disability',
          'Computer Science major',
          'Strong academic record',
          'Leadership experience'
        ],
        benefits: [
          '$10,000 USD award',
          'Google mentorship',
          'Networking opportunities',
          'Career development'
        ],
        deadline: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
        remote: true,
        level: 'entry',
        skills: ['Computer Science', 'Programming', 'Leadership'],
        industry: 'Technology',
        source: 'linkedin',
        url: 'https://google.com/lime-scholarship',
        postedDate: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000)
      },
      {
        id: 'sch_003',
        title: 'Microsoft Diversity Conference Scholarship',
        type: 'scholarship',
        organization: 'Microsoft',
        description: 'Conference attendance scholarships for underrepresented students in technology.',
        requirements: [
          'Underrepresented minority',
          'STEM student',
          'Conference acceptance',
          'Academic standing'
        ],
        benefits: [
          '$5,000 travel grant',
          'Conference registration',
          'Microsoft mentorship',
          'Networking events'
        ],
        deadline: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000),
        remote: false,
        level: 'entry',
        skills: ['Technology', 'Research', 'Networking'],
        industry: 'Technology',
        source: 'linkedin',
        url: 'https://microsoft.com/diversity-scholarship',
        postedDate: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000)
      },

      // RESEARCH GRANTS
      {
        id: 'sch_004',
        title: 'NSF Graduate Research Fellowship',
        type: 'grant',
        organization: 'National Science Foundation',
        description: 'Supporting outstanding graduate students in NSF-supported STEM disciplines.',
        requirements: [
          'US citizen or permanent resident',
          'Graduate student in STEM',
          'Research proposal',
          'Academic excellence'
        ],
        benefits: [
          '$37,000 annual stipend',
          '$12,000 education allowance',
          '3 years of support',
          'Research opportunities'
        ],
        deadline: new Date(Date.now() + 120 * 24 * 60 * 60 * 1000),
        remote: true,
        level: 'entry',
        skills: ['Research', 'STEM', 'Academic Writing'],
        industry: 'Research',
        source: 'linkedin',
        url: 'https://nsf.gov/grfp',
        postedDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
      },
      {
        id: 'sch_005',
        title: 'AI Research Grant',
        type: 'grant',
        organization: 'National Science Foundation',
        description: 'Funding for innovative research projects in artificial intelligence and machine learning.',
        requirements: [
          'PhD in related field',
          'Research proposal',
          'University affiliation',
          'Preliminary results'
        ],
        benefits: [
          '$50,000 funding',
          'Research resources',
          'Publication opportunities',
          'Conference presentations'
        ],
        deadline: new Date(Date.now() + 180 * 24 * 60 * 60 * 1000),
        remote: true,
        level: 'senior',
        skills: ['Artificial Intelligence', 'Research', 'Machine Learning'],
        industry: 'Research',
        source: 'linkedin',
        url: 'https://nsf.gov/ai-research-grant',
        postedDate: new Date(Date.now() - 25 * 24 * 60 * 60 * 1000)
      },

      // COMPANY-SPECIFIC SCHOLARSHIPS
      {
        id: 'sch_006',
        title: 'Amazon Future Engineer Scholarship',
        type: 'scholarship',
        organization: 'Amazon',
        description: 'Supporting students from underrepresented communities in computer science.',
        requirements: [
          'High school senior',
          'Computer science major intent',
          'Underrepresented community',
          'Financial need'
        ],
        benefits: [
          '$40,000 over 4 years',
          'Amazon internship',
          'Mentorship program',
          'Career guidance'
        ],
        deadline: new Date(Date.now() + 150 * 24 * 60 * 60 * 1000),
        remote: true,
        level: 'entry',
        skills: ['Computer Science', 'Programming'],
        industry: 'Technology',
        source: 'linkedin',
        url: 'https://amazon.com/future-engineer-scholarship',
        postedDate: new Date(Date.now() - 18 * 24 * 60 * 60 * 1000)
      },
      {
        id: 'sch_007',
        title: 'Palantir Women in Technology Scholarship',
        type: 'scholarship',
        organization: 'Palantir',
        description: 'Supporting women studying computer science, engineering, or related technical fields.',
        requirements: [
          'Female-identifying student',
          'Technical major',
          'Sophomore or junior year',
          'Strong academic performance'
        ],
        benefits: [
          '$7,000 award',
          'Palantir mentorship',
          'Interview opportunity',
          'Networking events'
        ],
        deadline: new Date(Date.now() + 85 * 24 * 60 * 60 * 1000),
        remote: true,
        level: 'entry',
        skills: ['Computer Science', 'Engineering', 'Data Analysis'],
        industry: 'Technology',
        source: 'linkedin',
        url: 'https://palantir.com/women-in-tech-scholarship',
        postedDate: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000)
      },

      // INTERNATIONAL OPPORTUNITIES
      {
        id: 'sch_008',
        title: 'Fulbright Student Program',
        type: 'fellowship',
        organization: 'U.S. Department of State',
        description: 'Study, research, or teach abroad with full funding and cultural exchange.',
        requirements: [
          'US citizenship',
          'Bachelor\'s degree',
          'Language proficiency',
          'Research proposal'
        ],
        benefits: [
          'Full funding',
          'Round-trip transportation',
          'Living stipend',
          'Cultural immersion'
        ],
        deadline: new Date(Date.now() + 200 * 24 * 60 * 60 * 1000),
        remote: false,
        level: 'mid',
        skills: ['Research', 'Cultural Adaptation', 'Language Skills'],
        industry: 'Education',
        source: 'linkedin',
        url: 'https://fulbright.state.gov/student-program',
        postedDate: new Date(Date.now() - 40 * 24 * 60 * 60 * 1000)
      }
    ]

    return this.filterOpportunities(mockScholarships, filters)
  }

  // AI-powered opportunity scoring
  private static async scoreOpportunities(
    opportunities: DynamicOpportunity[],
    userProfile: any
  ): Promise<DynamicOpportunity[]> {
    return opportunities.map(opportunity => {
      const score = this.calculateRelevanceScore(opportunity, userProfile)
      const insights = this.generateAIInsights(opportunity, userProfile, score)
      
      return {
        ...opportunity,
        relevanceScore: score,
        aiInsights: insights
      }
    })
  }

  // Calculate relevance score based on user profile
  private static calculateRelevanceScore(
    opportunity: DynamicOpportunity,
    userProfile: any
  ): number {
    let score = 0

    // Skill matching (40 points max)
    if (userProfile.skills) {
      const userSkills = userProfile.skills.map((s: string) => s.toLowerCase())
      const oppSkills = opportunity.skills.map(s => s.toLowerCase())
      
      const matchingSkills = userSkills.filter((skill: string) => 
        oppSkills.some(oppSkill => 
          oppSkill.includes(skill) || skill.includes(oppSkill)
        )
      )
      
      score += Math.min(matchingSkills.length * 8, 40)
    }

    // Experience level matching (25 points max)
    if (userProfile.experienceLevel) {
      if (userProfile.experienceLevel === opportunity.level) {
        score += 25
      } else if (
        (userProfile.experienceLevel === 'junior' && opportunity.level === 'entry') ||
        (userProfile.experienceLevel === 'intermediate' && opportunity.level === 'junior') ||
        (userProfile.experienceLevel === 'senior' && opportunity.level === 'mid')
      ) {
        score += 15
      }
    }

    // Career path alignment (20 points max)
    if (userProfile.careerPath) {
      const careerKeywords = this.getCareerKeywords(userProfile.careerPath)
      const descriptionLower = opportunity.description.toLowerCase()
      
      const matchingKeywords = careerKeywords.filter(keyword => 
        descriptionLower.includes(keyword.toLowerCase())
      )
      
      score += Math.min(matchingKeywords.length * 5, 20)
    }

    // Location preference (10 points max)
    if (userProfile.locationPreference) {
      if (opportunity.remote && userProfile.locationPreference === 'remote') {
        score += 10
      } else if (opportunity.location && 
                 opportunity.location.toLowerCase().includes(userProfile.locationPreference.toLowerCase())) {
        score += 8
      }
    }

    // Salary alignment (5 points max)
    if (userProfile.salaryExpectation && opportunity.salary) {
      const userMin = userProfile.salaryExpectation.min || 0
      const userMax = userProfile.salaryExpectation.max || Infinity
      const oppMin = opportunity.salary.min
      const oppMax = opportunity.salary.max
      
      if (oppMin >= userMin && oppMax <= userMax) {
        score += 5
      } else if (oppMax >= userMin || oppMin <= userMax) {
        score += 2
      }
    }

    return Math.min(score, 100)
  }

  // Generate AI insights for opportunities
  private static generateAIInsights(
    opportunity: DynamicOpportunity,
    _userProfile: any,
    relevanceScore: number
  ): DynamicOpportunity['aiInsights'] {
    const skillAlignment = this.calculateSkillAlignment(opportunity, _userProfile)
    const careerFit = this.calculateCareerFit(opportunity, _userProfile)
    const growthPotential = this.calculateGrowthPotential(opportunity, _userProfile)
    
    const matchReason = this.generateMatchReason(opportunity, _userProfile, relevanceScore)
    const recommendations = this.generateRecommendations(opportunity, _userProfile)

    return {
      matchReason,
      skillAlignment,
      careerFit,
      growthPotential,
      recommendations
    }
  }

  // Helper methods for AI insights
  private static calculateSkillAlignment(opportunity: DynamicOpportunity, userProfile: any): number {
    if (!userProfile.skills) return 50
    
    const userSkills = userProfile.skills.map((s: string) => s.toLowerCase())
    const oppSkills = opportunity.skills.map(s => s.toLowerCase())
    
    const matchingSkills = userSkills.filter((skill: string) => 
      oppSkills.some(oppSkill => oppSkill.includes(skill) || skill.includes(oppSkill))
    )
    
    return Math.round((matchingSkills.length / Math.max(oppSkills.length, 1)) * 100)
  }

  private static calculateCareerFit(opportunity: DynamicOpportunity, userProfile: any): number {
    if (!userProfile.careerPath) return 70
    
    const careerKeywords = this.getCareerKeywords(userProfile.careerPath)
    const oppText = `${opportunity.title} ${opportunity.description}`.toLowerCase()
    
    const matches = careerKeywords.filter(keyword => 
      oppText.includes(keyword.toLowerCase())
    )
    
    return Math.round((matches.length / careerKeywords.length) * 100)
  }

  private static calculateGrowthPotential(opportunity: DynamicOpportunity, userProfile: any): number {
    let potential = 60 // Base potential
    
    // Higher potential for roles above current level
    if (userProfile.experienceLevel === 'entry' && ['junior', 'mid'].includes(opportunity.level)) {
      potential += 20
    } else if (userProfile.experienceLevel === 'junior' && ['mid', 'senior'].includes(opportunity.level)) {
      potential += 15
    }
    
    // Higher potential for learning opportunities
    if (['course', 'fellowship', 'scholarship'].includes(opportunity.type)) {
      potential += 15
    }
    
    // Higher potential for top companies
    const topCompanies = ['google', 'meta', 'apple', 'microsoft', 'amazon', 'netflix']
    if (topCompanies.some(company => 
      opportunity.organization.toLowerCase().includes(company)
    )) {
      potential += 10
    }
    
    return Math.min(potential, 100)
  }

  private static generateMatchReason(
    opportunity: DynamicOpportunity,
    _userProfile: any,
    relevanceScore: number
  ): string {
    if (relevanceScore >= 80) {
      return `Excellent match! This ${opportunity.type} aligns perfectly with your ${_userProfile.careerPath || 'career goals'} and skill set.`
    } else if (relevanceScore >= 60) {
      return `Good fit! This opportunity matches several of your skills and could advance your career in ${opportunity.industry}.`
    } else if (relevanceScore >= 40) {
      return `Potential match. While not a perfect fit, this could be a valuable learning opportunity to expand your skills.`
    } else {
      return `This opportunity could help you explore new areas and develop additional skills outside your current focus.`
    }
  }

  private static generateRecommendations(
    opportunity: DynamicOpportunity,
    userProfile: any
  ): string[] {
    const recommendations: string[] = []
    
    // Skill gap recommendations
    const userSkills = userProfile.skills?.map((s: string) => s.toLowerCase()) || []
    const missingSkills = opportunity.skills.filter(skill => 
      !userSkills.some((userSkill: string) => 
        skill.toLowerCase().includes(userSkill) || userSkill.includes(skill.toLowerCase())
      )
    )
    
    if (missingSkills.length > 0) {
      recommendations.push(`Consider learning: ${missingSkills.slice(0, 3).join(', ')}`)
    }
    
    // Application timing
    const daysUntilDeadline = Math.ceil(
      (opportunity.deadline.getTime() - Date.now()) / (1000 * 60 * 60 * 24)
    )
    
    if (daysUntilDeadline <= 7) {
      recommendations.push('⚡ Apply soon - deadline approaching!')
    } else if (daysUntilDeadline <= 30) {
      recommendations.push('📅 Good timing to apply within the next 2 weeks')
    }
    
    // Portfolio recommendations
    if (['job', 'internship'].includes(opportunity.type)) {
      recommendations.push('💼 Update your portfolio with relevant projects')
    }
    
    // Networking recommendations
    if (opportunity.organization) {
      recommendations.push(`🤝 Connect with ${opportunity.organization} employees on LinkedIn`)
    }
    
    return recommendations.slice(0, 4) // Limit to 4 recommendations
  }

  // Get career-specific keywords for matching
  private static getCareerKeywords(careerPath: string): string[] {
    const keywordMap: { [key: string]: string[] } = {
      'Full-Stack Software Engineer': ['full-stack', 'frontend', 'backend', 'web development', 'javascript', 'react', 'node.js'],
      'Data Scientist': ['data science', 'machine learning', 'python', 'statistics', 'analytics', 'ai', 'tensorflow'],
      'UX/UI Designer': ['ux', 'ui', 'design', 'user experience', 'figma', 'prototyping', 'user research'],
      'Product Manager': ['product management', 'strategy', 'roadmap', 'stakeholder', 'agile', 'scrum'],
      'DevOps Engineer': ['devops', 'cloud', 'aws', 'docker', 'kubernetes', 'ci/cd', 'infrastructure'],
      'Digital Marketing': ['marketing', 'seo', 'social media', 'analytics', 'content', 'campaigns'],
      'Cybersecurity Analyst': ['security', 'cybersecurity', 'penetration testing', 'compliance', 'risk assessment']
    }
    
    return keywordMap[careerPath] || ['technology', 'software', 'development']
  }

  // Utility methods
  private static generateCacheKey(_userProfile: any, filters: OpportunityFilters): string {
    return `${_userProfile.id || 'anonymous'}_${JSON.stringify(filters)}`
  }

  private static deduplicateOpportunities(opportunities: DynamicOpportunity[]): DynamicOpportunity[] {
    const seen = new Set<string>()
    return opportunities.filter(opp => {
      const key = `${opp.title}_${opp.organization}`.toLowerCase()
      if (seen.has(key)) return false
      seen.add(key)
      return true
    })
  }

  private static filterOpportunities(
    opportunities: DynamicOpportunity[],
    filters: OpportunityFilters
  ): DynamicOpportunity[] {
    return opportunities.filter(opp => {
      if (filters.type && !filters.type.includes(opp.type)) return false
      if (filters.level && !filters.level.includes(opp.level)) return false
      if (filters.remote !== undefined && opp.remote !== filters.remote) return false
      if (filters.location && opp.location && 
          !opp.location.toLowerCase().includes(filters.location.toLowerCase())) return false
      if (filters.skills && !filters.skills.some(skill => 
          opp.skills.some(oppSkill => 
            oppSkill.toLowerCase().includes(skill.toLowerCase())
          )
        )) return false
      if (filters.industry && filters.industry.length > 0 && 
          !filters.industry.some(industry => 
            opp.industry.toLowerCase().includes(industry.toLowerCase())
          )) return false
      
      return true
    })
  }

  // Real-time opportunity alerts
  static async getPersonalizedAlerts(userProfile: any): Promise<{
    newOpportunities: number
    urgentDeadlines: DynamicOpportunity[]
    recommendedActions: string[]
  }> {
    const opportunities = await this.fetchDynamicOpportunities(userProfile)
    
    // Find opportunities posted in last 24 hours
    const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000)
    const newOpportunities = opportunities.filter(opp => opp.postedDate > oneDayAgo).length
    
    // Find opportunities with deadlines in next 7 days
    const sevenDaysFromNow = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
    const urgentDeadlines = opportunities.filter(opp => 
      opp.deadline <= sevenDaysFromNow && opp.relevanceScore! >= 70
    )
    
    // Generate recommended actions
    const recommendedActions = [
      newOpportunities > 0 ? `${newOpportunities} new opportunities match your profile` : null,
      urgentDeadlines.length > 0 ? `${urgentDeadlines.length} high-match opportunities have upcoming deadlines` : null,
      'Update your skills based on trending job requirements',
      'Complete your profile to get better matches'
    ].filter(Boolean) as string[]
    
    return {
      newOpportunities,
      urgentDeadlines,
      recommendedActions
    }
  }
}