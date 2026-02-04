import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { CreatePostModal, type NewPost } from '@/components/CreatePostModal'
import { 
  Heart, 
  MessageCircle, 
  Share, 
  Trophy, 
  TrendingUp,
  Plus,
  Search,
  ThumbsUp,
  PartyPopper,
  Lightbulb,
  GraduationCap,
  Users2,
  BookOpen,
  HandHeart,
  ExternalLink,
  Tag
} from 'lucide-react'
import { formatRelativeTime } from '@/lib/utils'
import { useUserData } from '@/hooks/useUserData'

interface CommunityPost {
  id: string
  userId: string
  userName: string
  userAvatar?: string
  userLevel: number
  content: string
  type: 'achievement' | 'milestone' | 'question' | 'celebration' | 'resource_share' | 'senior_guidance' | 'resource_offer' | 'resource_request'
  achievements?: Array<{ name: string; icon: string }>
  milestone?: { title: string; progress: number }
  resourceDetails?: {
    title: string
    category: string
    description: string
    link?: string
    tags: string[]
  }
  reactions: Array<{ type: string; count: number }>
  comments: number
  createdAt: Date
}

const mockPosts: CommunityPost[] = [
  {
    id: '1',
    userId: '1',
    userName: 'Sarah Chen',
    userAvatar: '',
    userLevel: 8,
    content: "Just completed my first technical interview! The mock interviews on MentorX really prepared me well. Thanks to everyone who shared their tips! 🎉",
    type: 'celebration',
    reactions: [
      { type: 'celebrate', count: 24 },
      { type: 'like', count: 18 },
      { type: 'support', count: 12 }
    ],
    comments: 8,
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000) // 2 hours ago
  },
  {
    id: '2',
    userId: '2',
    userName: 'Marcus Johnson',
    userAvatar: '',
    userLevel: 12,
    content: "Unlocked the 'Mentor Connector' achievement after helping 5 community members this week!",
    type: 'achievement',
    achievements: [
      { name: 'Mentor Connector', icon: '🤝' },
      { name: 'Helper Badge', icon: '🏅' }
    ],
    reactions: [
      { type: 'celebrate', count: 31 },
      { type: 'like', count: 22 }
    ],
    comments: 12,
    createdAt: new Date(Date.now() - 4 * 60 * 60 * 1000) // 4 hours ago
  },
  {
    id: '3',
    userId: '3',
    userName: 'Emily Rodriguez',
    userAvatar: '',
    userLevel: 6,
    content: "Can anyone recommend good resources for learning system design? I'm preparing for senior-level interviews and want to strengthen this area.",
    type: 'question',
    reactions: [
      { type: 'like', count: 15 },
      { type: 'support', count: 8 }
    ],
    comments: 23,
    createdAt: new Date(Date.now() - 6 * 60 * 60 * 1000) // 6 hours ago
  },
  {
    id: '4',
    userId: '4',
    userName: 'Alex Thompson',
    userAvatar: '',
    userLevel: 15,
    content: "Reached 75% completion on my React Developer roadmap! The adaptive learning really helps identify knowledge gaps.",
    type: 'milestone',
    milestone: { title: 'React Developer Path', progress: 75 },
    reactions: [
      { type: 'celebrate', count: 19 },
      { type: 'like', count: 14 }
    ],
    comments: 6,
    createdAt: new Date(Date.now() - 8 * 60 * 60 * 1000) // 8 hours ago
  },
  {
    id: '5',
    userId: '5',
    userName: 'David Kim',
    userAvatar: '',
    userLevel: 10,
    content: "Found this amazing free course on algorithms that complements the MentorX study sessions perfectly. Highly recommend checking it out!",
    type: 'resource_share',
    reactions: [
      { type: 'like', count: 28 },
      { type: 'helpful', count: 16 }
    ],
    comments: 9,
    createdAt: new Date(Date.now() - 12 * 60 * 60 * 1000) // 12 hours ago
  },
  // NEW SENIOR GUIDANCE POSTS
  {
    id: '6',
    userId: '6',
    userName: 'Jennifer Martinez',
    userAvatar: '',
    userLevel: 20,
    content: "After 15 years in tech, here's my advice for career transitions: Don't wait for the 'perfect' moment. I switched from frontend to product management at 35, and it was the best decision I made. Start building relevant skills on the side, network within your target role, and remember that your technical background is an asset, not a limitation.",
    type: 'senior_guidance',
    reactions: [
      { type: 'like', count: 45 },
      { type: 'helpful', count: 32 },
      { type: 'support', count: 18 }
    ],
    comments: 27,
    createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000) // 1 day ago
  },
  {
    id: '7',
    userId: '7',
    userName: 'Robert Chen',
    userAvatar: '',
    userLevel: 18,
    content: "Leadership tip from my journey to Engineering Manager: The hardest part isn't the technical decisions—it's learning to give feedback that helps people grow. Start practicing this skill early in your career. Offer constructive feedback to peers, mentor junior developers, and always focus on the behavior, not the person.",
    type: 'senior_guidance',
    reactions: [
      { type: 'like', count: 38 },
      { type: 'helpful', count: 29 },
      { type: 'celebrate', count: 12 }
    ],
    comments: 19,
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000) // 2 days ago
  },
  {
    id: '8',
    userId: '8',
    userName: 'Lisa Wang',
    userAvatar: '',
    userLevel: 22,
    content: "Industry insight: AI/ML is reshaping every sector, but don't panic about being replaced. Focus on becoming AI-augmented rather than AI-resistant. Learn to work WITH AI tools, understand their limitations, and develop skills that complement automation—critical thinking, creativity, and emotional intelligence are more valuable than ever.",
    type: 'senior_guidance',
    reactions: [
      { type: 'like', count: 52 },
      { type: 'helpful', count: 41 },
      { type: 'support', count: 23 }
    ],
    comments: 34,
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000) // 3 days ago
  },
  // NEW RESOURCE POSTS
  {
    id: '9',
    userId: '9',
    userName: 'Michael Rodriguez',
    userAvatar: '',
    userLevel: 16,
    content: "I have 5 free Udemy course coupons for 'Complete React Developer Course' that I'm not using. Perfect for beginners wanting to learn React from scratch!",
    type: 'resource_offer',
    resourceDetails: {
      title: 'Complete React Developer Course - Free Coupons',
      category: 'Web Development',
      description: '5 free course coupons available. Covers React fundamentals, hooks, context, and project building. Great for beginners.',
      link: 'https://udemy.com/course/complete-react-developer',
      tags: ['react', 'javascript', 'beginner', 'free', 'course']
    },
    reactions: [
      { type: 'like', count: 28 },
      { type: 'helpful', count: 22 }
    ],
    comments: 15,
    createdAt: new Date(Date.now() - 5 * 60 * 60 * 1000) // 5 hours ago
  },
  {
    id: '10',
    userId: '10',
    userName: 'Sarah Kim',
    userAvatar: '',
    userLevel: 4,
    content: "Looking for recommendations on system design resources. I'm preparing for senior engineer interviews and need comprehensive materials covering scalability, databases, and distributed systems.",
    type: 'resource_request',
    resourceDetails: {
      title: 'System Design Interview Preparation Resources',
      category: 'Career',
      description: 'Need comprehensive resources for system design interviews. Looking for books, courses, or practice platforms that cover scalability patterns, database design, and distributed systems architecture.',
      tags: ['system-design', 'interview', 'scalability', 'databases', 'architecture']
    },
    reactions: [
      { type: 'like', count: 12 },
      { type: 'support', count: 8 }
    ],
    comments: 23,
    createdAt: new Date(Date.now() - 7 * 60 * 60 * 1000) // 7 hours ago
  },
  {
    id: '11',
    userId: '11',
    userName: 'David Thompson',
    userAvatar: '',
    userLevel: 19,
    content: "Offering 1-on-1 mentorship sessions for junior developers transitioning to senior roles. I can help with code reviews, architecture decisions, and career planning. 15+ years experience in fintech.",
    type: 'resource_offer',
    resourceDetails: {
      title: 'Senior Developer Mentorship Sessions',
      category: 'Mentorship',
      description: 'Free 1-hour mentorship sessions for junior developers. Focus areas: code architecture, best practices, career growth, technical leadership. Available weekends.',
      tags: ['mentorship', 'senior-dev', 'architecture', 'career', 'free']
    },
    reactions: [
      { type: 'like', count: 35 },
      { type: 'helpful', count: 28 },
      { type: 'support', count: 15 }
    ],
    comments: 31,
    createdAt: new Date(Date.now() - 10 * 60 * 60 * 1000) // 10 hours ago
  }
]

const postTypeIcons = {
  achievement: Trophy,
  milestone: TrendingUp,
  question: MessageCircle,
  celebration: PartyPopper,
  resource_share: Lightbulb,
  resource_offer: BookOpen,
  resource_request: HandHeart,
  senior_guidance: GraduationCap
}

const postTypeColors = {
  achievement: 'bg-yellow-500',
  milestone: 'bg-blue-500',
  question: 'bg-purple-500',
  celebration: 'bg-green-500',
  resource_share: 'bg-orange-500',
  resource_offer: 'bg-teal-500',
  resource_request: 'bg-pink-500',
  senior_guidance: 'bg-indigo-500'
}

const reactionIcons = {
  like: ThumbsUp,
  celebrate: Trophy,
  support: Heart,
  helpful: Lightbulb
}

export function Community() {
  const { user } = useUserData()
  const [selectedFilter, setSelectedFilter] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [posts, setPosts] = useState(mockPosts)
  const [isCreatePostOpen, setIsCreatePostOpen] = useState(false)

  const filteredPosts = posts.filter(post => {
    const matchesFilter = selectedFilter === 'all' || post.type === selectedFilter
    const matchesSearch = post.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.userName.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesFilter && matchesSearch
  })

  const filters = [
    { id: 'all', name: 'All Posts', count: posts.length },
    { id: 'achievement', name: 'Achievements', count: posts.filter(p => p.type === 'achievement').length },
    { id: 'milestone', name: 'Milestones', count: posts.filter(p => p.type === 'milestone').length },
    { id: 'question', name: 'Questions', count: posts.filter(p => p.type === 'question').length },
    { id: 'celebration', name: 'Celebrations', count: posts.filter(p => p.type === 'celebration').length },
    { id: 'resource_offer', name: 'Resource Offers', count: posts.filter(p => p.type === 'resource_offer').length },
    { id: 'resource_request', name: 'Resource Requests', count: posts.filter(p => p.type === 'resource_request').length },
    { id: 'senior_guidance', name: 'Senior Guidance', count: posts.filter(p => p.type === 'senior_guidance').length }
  ]

  const handleCreatePost = (newPost: NewPost) => {
    const post: CommunityPost = {
      id: Date.now().toString(),
      userId: user.id,
      userName: user.name,
      userAvatar: user.profile.avatar,
      userLevel: user.progress.level,
      content: newPost.content,
      type: newPost.type,
      resourceDetails: newPost.resourceDetails,
      reactions: [],
      comments: 0,
      createdAt: new Date()
    }

    setPosts(prevPosts => [post, ...prevPosts])
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 py-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-8 rounded-2xl text-center border border-blue-100">
        <h1 className="text-4xl lg:text-5xl font-bold tracking-tight mb-6" style={{ color: '#000000' }}>
          Learning <span className="bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent">Community</span>
        </h1>
        <p className="text-lg max-w-3xl mx-auto leading-relaxed" style={{ color: '#000000' }}>
          Connect with fellow learners, share your progress, and get inspired by others' journeys.
        </p>
      </div>

      {/* Community Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        <Card className="bg-white shadow-lg rounded-xl border border-gray-200 text-center hover:shadow-xl transition-all duration-300 group">
          <CardContent className="pt-8 pb-8">
            <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-200 transition-colors">
              <MessageCircle className="w-8 h-8 text-blue-600" />
            </div>
            <div className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent mb-2">
              {posts.length}
            </div>
            <div className="text-sm font-semibold text-gray-700">Total Posts</div>
          </CardContent>
        </Card>
        
        <Card className="bg-white shadow-lg rounded-xl border border-gray-200 text-center hover:shadow-xl transition-all duration-300 group">
          <CardContent className="pt-8 pb-8">
            <div className="w-16 h-16 bg-red-100 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-red-200 transition-colors">
              <Heart className="w-8 h-8 text-red-500" />
            </div>
            <div className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent mb-2">
              {posts.reduce((acc, post) => acc + post.reactions.reduce((sum, r) => sum + r.count, 0), 0)}
            </div>
            <div className="text-sm font-semibold text-gray-700">Reactions</div>
          </CardContent>
        </Card>
        
        <Card className="bg-white shadow-lg rounded-xl border border-gray-200 text-center hover:shadow-xl transition-all duration-300 group">
          <CardContent className="pt-8 pb-8">
            <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-green-200 transition-colors">
              <MessageCircle className="w-8 h-8 text-green-600" />
            </div>
            <div className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent mb-2">
              {posts.reduce((acc, post) => acc + post.comments, 0)}
            </div>
            <div className="text-sm font-semibold text-gray-700">Comments</div>
          </CardContent>
        </Card>
        
        <Card className="bg-white shadow-lg rounded-xl border border-gray-200 text-center hover:shadow-xl transition-all duration-300 group">
          <CardContent className="pt-8 pb-8">
            <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-200 transition-colors">
              <Users2 className="w-8 h-8 text-blue-600" />
            </div>
            <div className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent mb-2">
              {new Set(posts.map(p => p.userId)).size}
            </div>
            <div className="text-sm font-semibold text-gray-700">Active Members</div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <Card className="bg-white shadow-lg rounded-xl border border-gray-200">
        <CardContent className="p-8">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search posts and members..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                style={{ color: '#000000' }}
              />
            </div>
            
            {/* Create Post Button */}
            <Button 
              onClick={() => setIsCreatePostOpen(true)}
              className="md:w-auto bg-blue-600 hover:bg-blue-700 text-white px-6 py-3"
            >
              <Plus className="w-4 h-4 mr-2" />
              Share Progress
            </Button>
          </div>

          {/* Filter Tabs */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mt-8">
            {filters.map((filter) => (
              <div
                key={filter.id}
                className={`cursor-pointer rounded-xl border-2 p-4 text-center transition-all duration-300 hover:shadow-md ${
                  selectedFilter === filter.id 
                    ? 'bg-blue-600 text-white border-blue-600 shadow-lg transform scale-105' 
                    : 'bg-white border-gray-200 hover:border-blue-300 hover:bg-blue-50'
                }`}
                onClick={() => setSelectedFilter(filter.id)}
              >
                <div className={`font-semibold text-sm mb-2 ${
                  selectedFilter === filter.id ? 'text-white' : 'text-gray-900'
                }`}>
                  {filter.name}
                </div>
                <div className={`inline-flex items-center justify-center w-8 h-8 rounded-full text-xs font-bold ${
                  selectedFilter === filter.id 
                    ? 'bg-white/20 text-white' 
                    : 'bg-blue-100 text-blue-600'
                }`}>
                  {filter.count}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Senior Resource Corner */}
      <Card className="bg-gradient-to-r from-teal-50 to-blue-50 border border-teal-200 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center text-2xl" style={{ color: '#000000' }}>
            <BookOpen className="w-8 h-8 mr-3 text-teal-600" />
            Senior Resource Corner
          </CardTitle>
          <CardDescription style={{ color: '#000000' }}>
            Connect seniors offering resources with juniors seeking help
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            {/* Resource Offers */}
            <div className="space-y-4">
              <h3 className="font-semibold text-lg flex items-center" style={{ color: '#000000' }}>
                <BookOpen className="w-5 h-5 mr-2 text-teal-600" />
                Available Resources
              </h3>
              <div className="space-y-3">
                {posts.filter(p => p.type === 'resource_offer').slice(0, 3).map(post => (
                  <div key={post.id} className="bg-white border border-teal-200 rounded-lg p-4 shadow-sm">
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-medium text-sm" style={{ color: '#000000' }}>
                        {post.resourceDetails?.title || post.content.slice(0, 50) + '...'}
                      </h4>
                      <Badge className="bg-teal-100 text-teal-800 text-xs">
                        {post.resourceDetails?.category || 'General'}
                      </Badge>
                    </div>
                    <p className="text-xs text-gray-600 mb-2">
                      by {post.userName} (Level {post.userLevel})
                    </p>
                    {post.resourceDetails?.tags && (
                      <div className="flex flex-wrap gap-1 mb-2">
                        {post.resourceDetails.tags.slice(0, 3).map((tag, index) => (
                          <span key={index} className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-teal-50 text-teal-700">
                            <Tag className="w-3 h-3 mr-1" />
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                    <Button size="sm" className="bg-teal-600 text-white hover:bg-teal-700">
                      Request Resource
                    </Button>
                  </div>
                ))}
              </div>
              <Button 
                onClick={() => setIsCreatePostOpen(true)}
                variant="outline" 
                className="w-full border-teal-300 text-teal-700 hover:bg-teal-50"
              >
                <Plus className="w-4 h-4 mr-2" />
                Offer Resource
              </Button>
            </div>

            {/* Resource Requests */}
            <div className="space-y-4">
              <h3 className="font-semibold text-lg flex items-center" style={{ color: '#000000' }}>
                <HandHeart className="w-5 h-5 mr-2 text-pink-600" />
                Resource Requests
              </h3>
              <div className="space-y-3">
                {posts.filter(p => p.type === 'resource_request').slice(0, 3).map(post => (
                  <div key={post.id} className="bg-white border border-pink-200 rounded-lg p-4 shadow-sm">
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-medium text-sm" style={{ color: '#000000' }}>
                        {post.resourceDetails?.title || post.content.slice(0, 50) + '...'}
                      </h4>
                      <Badge className="bg-pink-100 text-pink-800 text-xs">
                        {post.resourceDetails?.category || 'General'}
                      </Badge>
                    </div>
                    <p className="text-xs text-gray-600 mb-2">
                      by {post.userName} (Level {post.userLevel})
                    </p>
                    {post.resourceDetails?.tags && (
                      <div className="flex flex-wrap gap-1 mb-2">
                        {post.resourceDetails.tags.slice(0, 3).map((tag, index) => (
                          <span key={index} className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-pink-50 text-pink-700">
                            <Tag className="w-3 h-3 mr-1" />
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                    <Button size="sm" className="bg-pink-600 text-white hover:bg-pink-700">
                      Help Out
                    </Button>
                  </div>
                ))}
              </div>
              <Button 
                onClick={() => setIsCreatePostOpen(true)}
                variant="outline" 
                className="w-full border-pink-300 text-pink-700 hover:bg-pink-50"
              >
                <Plus className="w-4 h-4 mr-2" />
                Request Resource
              </Button>
            </div>
          </div>

          {/* Resource Stats */}
          <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-3 bg-white border border-teal-200 rounded-lg">
              <div className="text-2xl font-bold text-teal-600">
                {posts.filter(p => p.type === 'resource_offer').length}
              </div>
              <div className="text-xs text-gray-600">Resources Offered</div>
            </div>
            <div className="text-center p-3 bg-white border border-pink-200 rounded-lg">
              <div className="text-2xl font-bold text-pink-600">
                {posts.filter(p => p.type === 'resource_request').length}
              </div>
              <div className="text-xs text-gray-600">Help Requests</div>
            </div>
            <div className="text-center p-3 bg-white border border-blue-200 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">
                {posts.filter(p => p.userLevel >= 15).length}
              </div>
              <div className="text-xs text-gray-600">Senior Contributors</div>
            </div>
            <div className="text-center p-3 bg-white border border-green-200 rounded-lg">
              <div className="text-2xl font-bold text-green-600">
                {Math.round((posts.filter(p => p.type === 'resource_offer').length / Math.max(posts.filter(p => p.type === 'resource_request').length, 1)) * 100)}%
              </div>
              <div className="text-xs text-gray-600">Match Rate</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Senior Guidance Section */}
      <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center text-2xl" style={{ color: '#000000' }}>
            <GraduationCap className="w-8 h-8 mr-3 text-blue-600" />
            Senior Guidance Corner
          </CardTitle>
          <CardDescription className="" style={{ color: '#000000' }}>
            Get advice from industry veterans and senior professionals
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white border border-blue-200 rounded-lg p-4 shadow-sm">
              <h3 className="font-semibold mb-2" style={{ color: '#000000' }}>💼 Career Transitions</h3>
              <p className="text-sm mb-3" style={{ color: '#000000' }}>
                Senior professionals share insights on changing careers and industries
              </p>
              <Button className="bg-blue-600 text-white hover:bg-blue-700" size="sm">
                Ask Question
              </Button>
            </div>
            
            <div className="bg-white border border-blue-200 rounded-lg p-4 shadow-sm">
              <h3 className="font-semibold mb-2" style={{ color: '#000000' }}>🚀 Leadership Skills</h3>
              <p className="text-sm mb-3" style={{ color: '#000000' }}>
                Learn from experienced leaders about team management and growth
              </p>
              <Button className="bg-blue-600 text-white hover:bg-blue-700" size="sm">
                Join Discussion
              </Button>
            </div>
            
            <div className="bg-white border border-blue-200 rounded-lg p-4 shadow-sm">
              <h3 className="font-semibold mb-2" style={{ color: '#000000' }}>📈 Industry Insights</h3>
              <p className="text-sm mb-3" style={{ color: '#000000' }}>
                Get the latest trends and predictions from industry veterans
              </p>
              <Button className="bg-blue-600 text-white hover:bg-blue-700" size="sm">
                View Insights
              </Button>
            </div>
          </div>
          
          <div className="mt-6 p-4 bg-white border border-blue-200 rounded-lg shadow-sm">
            <h4 className="font-semibold mb-2" style={{ color: '#000000' }}>🎯 Featured Senior Mentor This Week</h4>
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-lg font-bold text-blue-600">SJ</span>
              </div>
              <div>
                <p className="font-medium" style={{ color: '#000000' }}>Sarah Johnson</p>
                <p className="text-sm" style={{ color: '#000000' }}>VP Engineering at Google • 15+ years experience</p>
              </div>
              <Button className="ml-auto bg-blue-600 text-white hover:bg-blue-700" size="sm">
                Connect
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Posts Feed */}
      <div className="space-y-6">
        {filteredPosts.map((post) => {
          const TypeIcon = postTypeIcons[post.type]
          const typeColor = postTypeColors[post.type]
          
          return (
            <Card key={post.id} className="glass-card hover:shadow-lg transition-smooth">
              <CardContent className="pt-6">
                <div className="space-y-4">
                  {/* Post Header */}
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-3">
                      <Avatar className="w-10 h-10">
                        <AvatarImage src={post.userAvatar} alt={post.userName} />
                        <AvatarFallback className="bg-primary text-primary-foreground">
                          {post.userName.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="flex items-center space-x-2">
                          <span className="font-semibold">{post.userName}</span>
                          <Badge variant="secondary" className="text-xs">
                            Level {post.userLevel}
                          </Badge>
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {formatRelativeTime(post.createdAt)}
                        </div>
                      </div>
                    </div>
                    
                    <div className={`w-8 h-8 ${typeColor} rounded-lg flex items-center justify-center`}>
                      <TypeIcon className="w-4 h-4 text-white" />
                    </div>
                  </div>

                  {/* Post Content */}
                  <div className="space-y-3">
                    <p className="text-foreground leading-relaxed">{post.content}</p>
                    
                    {/* Resource Details */}
                    {post.resourceDetails && (
                      <div className="p-4 bg-accent/30 rounded-lg border border-accent">
                        <div className="flex items-start justify-between mb-3">
                          <h4 className="font-semibold text-foreground">{post.resourceDetails.title}</h4>
                          <Badge className="bg-primary/10 text-primary">
                            {post.resourceDetails.category}
                          </Badge>
                        </div>
                        
                        {post.resourceDetails.description && (
                          <p className="text-sm text-muted-foreground mb-3">
                            {post.resourceDetails.description}
                          </p>
                        )}
                        
                        {post.resourceDetails.link && (
                          <div className="mb-3">
                            <a 
                              href={post.resourceDetails.link} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="inline-flex items-center text-sm text-primary hover:underline"
                            >
                              <ExternalLink className="w-4 h-4 mr-1" />
                              View Resource
                            </a>
                          </div>
                        )}
                        
                        {post.resourceDetails.tags.length > 0 && (
                          <div className="flex flex-wrap gap-1">
                            {post.resourceDetails.tags.map((tag, index) => (
                              <span 
                                key={index}
                                className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-primary/10 text-primary"
                              >
                                <Tag className="w-3 h-3 mr-1" />
                                {tag}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    )}
                    
                    {/* Achievements */}
                    {post.achievements && (
                      <div className="flex flex-wrap gap-2">
                        {post.achievements.map((achievement, index) => (
                          <Badge key={index} className="bg-yellow-100 text-yellow-800">
                            <span className="mr-1">{achievement.icon}</span>
                            {achievement.name}
                          </Badge>
                        ))}
                      </div>
                    )}
                    
                    {/* Milestone Progress */}
                    {post.milestone && (
                      <div className="p-3 bg-accent/50 rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium">{post.milestone.title}</span>
                          <span className="text-sm text-muted-foreground">{post.milestone.progress}%</span>
                        </div>
                        <div className="w-full bg-background rounded-full h-2">
                          <div 
                            className="bg-primary h-2 rounded-full transition-all duration-300"
                            style={{ width: `${post.milestone.progress}%` }}
                          />
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Post Actions */}
                  <div className="flex items-center justify-between pt-3 border-t border-border">
                    <div className="flex items-center space-x-4">
                      {post.reactions.map((reaction, index) => {
                        const ReactionIcon = reactionIcons[reaction.type as keyof typeof reactionIcons] || ThumbsUp
                        return (
                          <Button
                            key={index}
                            variant="ghost"
                            size="sm"
                            className="text-muted-foreground hover:text-foreground"
                          >
                            <ReactionIcon className="w-4 h-4 mr-1" />
                            {reaction.count}
                          </Button>
                        )
                      })}
                      
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-muted-foreground hover:text-foreground"
                      >
                        <MessageCircle className="w-4 h-4 mr-1" />
                        {post.comments}
                      </Button>
                    </div>
                    
                    <Button variant="ghost" size="sm">
                      <Share className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Load More */}
      <div className="text-center">
        <Button variant="outline" size="lg">
          Load More Posts
        </Button>
      </div>

      {/* Create Post Modal */}
      <CreatePostModal
        isOpen={isCreatePostOpen}
        onClose={() => setIsCreatePostOpen(false)}
        onCreatePost={handleCreatePost}
      />
    </div>
  )
}