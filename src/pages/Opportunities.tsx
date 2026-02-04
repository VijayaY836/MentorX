import { useState, useEffect } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  Briefcase, 
  GraduationCap, 
  DollarSign, 
  MapPin, 
  Calendar, 
  Star,
  Search,
  ExternalLink,
  Clock,
  Users,
  Award,
  Brain,
  Zap,
  Target,
  RefreshCw,
  Bell,
  Lightbulb,
  Database,
  TrendingUp
} from 'lucide-react'
import { formatDate } from '@/lib/utils'
import { OpportunityService, type DynamicOpportunity, type OpportunityFilters } from '@/services/opportunityService'
import { useUserData } from '@/hooks/useUserData'

const opportunityTypeIcons = {
  scholarship: GraduationCap,
  internship: Users,
  job: Briefcase,
  fellowship: Award,
  grant: DollarSign,
  bootcamp: Brain,
  course: Lightbulb
}

const opportunityTypeColors = {
  scholarship: 'bg-blue-500',
  internship: 'bg-green-500',
  job: 'bg-purple-500',
  fellowship: 'bg-yellow-500',
  grant: 'bg-red-500',
  bootcamp: 'bg-orange-500',
  course: 'bg-cyan-500'
}

export function Opportunities() {
  const [selectedType, setSelectedType] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedLevel, setSelectedLevel] = useState('all')
  const [opportunities, setOpportunities] = useState<DynamicOpportunity[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [alerts, setAlerts] = useState<any>(null)
  const { user } = useUserData()

  // Load opportunities on component mount
  useEffect(() => {
    loadOpportunities()
    loadAlerts()
  }, [user])

  const loadOpportunities = async () => {
    setIsLoading(true)
    try {
      const filters: OpportunityFilters = {
        type: selectedType === 'all' ? undefined : [selectedType],
        level: selectedLevel === 'all' ? undefined : [selectedLevel]
      }
      
      const userProfile = user ? {
        careerPath: user.profile.careerGoals?.[0] || 'Full-Stack Software Engineer',
        experienceLevel: user.profile.experienceLevel,
        skills: user.profile.skills?.map(s => s.name) || [],
        locationPreference: user.profile.location,
        salaryExpectation: undefined // Not in the current type
      } : { 
        careerPath: 'Full-Stack Software Engineer', 
        experienceLevel: 'junior',
        skills: ['JavaScript', 'React', 'Node.js']
      }
      
      const fetchedOpportunities = await OpportunityService.fetchDynamicOpportunities(
        userProfile,
        filters
      )
      
      setOpportunities(fetchedOpportunities)
    } catch (error) {
      console.error('Failed to load opportunities:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const loadAlerts = async () => {
    try {
      const userProfile = user ? {
        careerPath: user.profile.careerGoals?.[0] || 'Full-Stack Software Engineer',
        experienceLevel: user.profile.experienceLevel,
        skills: user.profile.skills?.map(s => s.name) || []
      } : { 
        careerPath: 'Full-Stack Software Engineer', 
        experienceLevel: 'junior',
        skills: ['JavaScript', 'React', 'Node.js']
      }
      
      const alertData = await OpportunityService.getPersonalizedAlerts(userProfile)
      setAlerts(alertData)
    } catch (error) {
      console.error('Failed to load alerts:', error)
    }
  }

  // Reload opportunities when filters change
  useEffect(() => {
    if (!isLoading) {
      loadOpportunities()
    }
  }, [selectedType, selectedLevel])

  const filteredOpportunities = opportunities.filter(opp => {
    const matchesSearch = searchTerm === '' || 
                         opp.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         opp.organization.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         opp.description.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesSearch
  })

  const opportunityTypes = [
    { id: 'all', name: 'All Types', count: opportunities.length },
    { id: 'job', name: 'Jobs', count: opportunities.filter(o => o.type === 'job').length },
    { id: 'internship', name: 'Internships', count: opportunities.filter(o => o.type === 'internship').length },
    { id: 'scholarship', name: 'Scholarships', count: opportunities.filter(o => o.type === 'scholarship').length },
    { id: 'fellowship', name: 'Fellowships', count: opportunities.filter(o => o.type === 'fellowship').length },
    { id: 'course', name: 'Courses', count: opportunities.filter(o => o.type === 'course').length },
    { id: 'grant', name: 'Grants', count: opportunities.filter(o => o.type === 'grant').length }
  ]

  const levels = [
    { id: 'all', name: 'All Levels' },
    { id: 'entry', name: 'Entry Level' },
    { id: 'junior', name: 'Junior' },
    { id: 'mid', name: 'Mid Level' },
    { id: 'senior', name: 'Senior' }
  ]

  const getDaysUntilDeadline = (deadline: Date) => {
    const now = new Date()
    const diffTime = deadline.getTime() - now.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays
  }

  const getRelevanceColor = (score: number) => {
    if (score >= 80) return 'bg-green-500'
    if (score >= 60) return 'bg-yellow-500'
    if (score >= 40) return 'bg-orange-500'
    return 'bg-gray-500'
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 py-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-8 rounded-2xl text-center border border-blue-100">
        <h1 className="text-4xl lg:text-5xl font-bold tracking-tight mb-6" style={{ color: '#000000' }}>
          🚀 AI-Powered <span className="bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent">Career Opportunities</span>
        </h1>
        <p className="text-lg max-w-3xl mx-auto leading-relaxed" style={{ color: '#000000' }}>
          Discover personalized opportunities from LinkedIn, GitHub, and top platforms. Powered by AI matching technology.
        </p>
      </div>

      {/* AI Alerts */}
      {alerts && (
        <Card className="bg-gradient-to-r from-blue-50/90 to-purple-50/90 border border-blue-200 shadow-lg rounded-xl">
          <CardContent className="p-8">
            <div className="flex items-center space-x-6">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl flex items-center justify-center shadow-lg">
                <Bell className="w-8 h-8 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-bold mb-4" style={{ color: '#000000' }}>🎯 Personalized Alerts</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    {alerts.recommendedActions.slice(0, 2).map((action: string, index: number) => (
                      <div key={index} className="flex items-center" style={{ color: '#000000' }}>
                        <Zap className="w-5 h-5 text-blue-600 mr-3" />
                        {action}
                      </div>
                    ))}
                  </div>
                  <div className="flex items-center space-x-8">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-blue-600">{alerts.newOpportunities}</div>
                      <div className="text-sm font-medium" style={{ color: '#000000' }}>New Today</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-orange-600">{alerts.urgentDeadlines.length}</div>
                      <div className="text-sm font-medium" style={{ color: '#000000' }}>Urgent</div>
                    </div>
                  </div>
                </div>
              </div>
              <Button 
                onClick={loadOpportunities} 
                className="bg-white text-blue-600 border-2 border-blue-600 hover:bg-blue-600 hover:text-white transition-all px-6 py-3"
              >
                <RefreshCw className="w-5 h-5 mr-2" />
                Refresh
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-white shadow-lg rounded-xl border border-gray-200 hover:shadow-xl transition-all duration-300 group">
          <CardContent className="pt-8 pb-8 text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-200 transition-colors">
              <Briefcase className="w-8 h-8 text-blue-600" />
            </div>
            <div className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent mb-2">
              {opportunities.length}
            </div>
            <div className="font-semibold text-gray-700">Live Opportunities</div>
          </CardContent>
        </Card>
        
        <Card className="bg-white shadow-lg rounded-xl border border-gray-200 hover:shadow-xl transition-all duration-300 group">
          <CardContent className="pt-8 pb-8 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-green-200 transition-colors">
              <TrendingUp className="w-8 h-8 text-green-600" />
            </div>
            <div className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent mb-2">
              {opportunities.length > 0 ? Math.round(opportunities.reduce((acc, opp) => acc + (opp.relevanceScore || 0), 0) / opportunities.length) : 0}%
            </div>
            <div className="font-semibold text-gray-700">Avg Match Score</div>
          </CardContent>
        </Card>
        
        <Card className="bg-white shadow-lg rounded-xl border border-gray-200 hover:shadow-xl transition-all duration-300 group">
          <CardContent className="pt-8 pb-8 text-center">
            <div className="w-16 h-16 bg-yellow-100 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-yellow-200 transition-colors">
              <Target className="w-8 h-8 text-yellow-600" />
            </div>
            <div className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent mb-2">
              {opportunities.filter(opp => (opp.relevanceScore || 0) >= 80).length}
            </div>
            <div className="font-semibold text-gray-700">High Matches</div>
          </CardContent>
        </Card>
        
        <Card className="bg-white shadow-lg rounded-xl border border-gray-200 hover:shadow-xl transition-all duration-300 group">
          <CardContent className="pt-8 pb-8 text-center">
            <div className="w-16 h-16 bg-indigo-100 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-indigo-200 transition-colors">
              <Database className="w-8 h-8 text-indigo-600" />
            </div>
            <div className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent mb-2">
              {new Set(opportunities.map(opp => opp.source)).size}
            </div>
            <div className="font-semibold text-gray-700">Data Sources</div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <Card className="bg-white shadow-lg rounded-xl border border-gray-200">
        <CardContent className="p-8">
          <div className="space-y-8">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search opportunities..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-4 text-lg border border-gray-300 rounded-lg bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                style={{ color: '#000000' }}
              />
            </div>

            {/* Type Filters */}
            <div>
              <h3 className="font-semibold mb-4 text-lg" style={{ color: '#000000' }}>Opportunity Types</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3">
                {opportunityTypes.map((type) => (
                  <Button
                    key={type.id}
                    variant={selectedType === type.id ? "default" : "outline"}
                    className={`h-auto py-3 px-4 flex flex-col items-center space-y-2 border-2 transition-all ${
                      selectedType === type.id 
                        ? 'bg-blue-600 text-white border-blue-600 shadow-lg' 
                        : 'bg-white border-gray-300 hover:border-blue-400 hover:bg-blue-50'
                    }`}
                    onClick={() => setSelectedType(type.id)}
                    style={{ color: selectedType === type.id ? '#ffffff' : '#000000' }}
                  >
                    <span className="font-medium">{type.name}</span>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      selectedType === type.id 
                        ? 'bg-white/20 text-white' 
                        : 'bg-gray-100 text-gray-600'
                    }`}>
                      {type.count}
                    </span>
                  </Button>
                ))}
              </div>
            </div>

            {/* Level Filter */}
            <div>
              <h3 className="font-semibold mb-4 text-lg" style={{ color: '#000000' }}>Experience Level</h3>
              <div className="flex flex-wrap gap-3">
                {levels.map((level) => (
                  <Button
                    key={level.id}
                    variant={selectedLevel === level.id ? "default" : "outline"}
                    className={`py-3 px-6 border-2 transition-all ${
                      selectedLevel === level.id 
                        ? 'bg-blue-600 text-white border-blue-600 shadow-lg' 
                        : 'bg-white border-gray-300 hover:border-blue-400 hover:bg-blue-50'
                    }`}
                    onClick={() => setSelectedLevel(level.id)}
                    style={{ color: selectedLevel === level.id ? '#ffffff' : '#000000' }}
                  >
                    {level.name}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Opportunities List */}
      {isLoading ? (
        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <RefreshCw className="w-8 h-8 animate-spin mx-auto mb-4 text-primary" />
            <p className="text-gray-900">Loading personalized opportunities...</p>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          {filteredOpportunities.map((opportunity) => {
            const TypeIcon = opportunityTypeIcons[opportunity.type]
            const typeColor = opportunityTypeColors[opportunity.type]
            const daysLeft = getDaysUntilDeadline(opportunity.deadline)
            const relevanceScore = opportunity.relevanceScore || 0
            
            return (
              <Card key={opportunity.id} className="glass-card hover:shadow-lg transition-smooth">
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    {/* Header */}
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-4 flex-1">
                        <div className={`w-12 h-12 ${typeColor} rounded-lg flex items-center justify-center flex-shrink-0`}>
                          <TypeIcon className="w-6 h-6 text-white" />
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center space-x-2 mb-1">
                            <h3 className="text-xl font-semibold truncate text-black">{opportunity.title}</h3>
                            <Badge className={`${getRelevanceColor(relevanceScore)} text-white`}>
                              <Brain className="w-3 h-3 mr-1" />
                              {relevanceScore}% AI Match
                            </Badge>
                            <Badge variant="outline" className="text-xs">
                              {opportunity.source}
                            </Badge>
                          </div>
                          <p className="text-gray-600 mb-2">{opportunity.organization}</p>
                          <p className="text-sm text-gray-600 leading-relaxed">
                            {opportunity.description}
                          </p>
                        </div>
                      </div>
                      
                      <div className="text-right flex-shrink-0 ml-4">
                        <Badge 
                          variant={daysLeft <= 7 ? 'destructive' : daysLeft <= 30 ? 'secondary' : 'outline'}
                          className="mb-2"
                        >
                          <Clock className="w-3 h-3 mr-1" />
                          {daysLeft > 0 ? `${daysLeft} days left` : 'Expired'}
                        </Badge>
                        <div className="text-sm text-gray-600">
                          Due: {formatDate(opportunity.deadline)}
                        </div>
                      </div>
                    </div>

                    {/* AI Insights */}
                    {opportunity.aiInsights && (
                      <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-lg border border-blue-200">
                        <div className="flex items-center space-x-2 mb-2">
                          <Brain className="w-4 h-4 text-blue-600" />
                          <span className="font-medium text-blue-900">AI Analysis</span>
                        </div>
                        <p className="text-sm text-blue-800 mb-3">{opportunity.aiInsights.matchReason}</p>
                        
                        <div className="grid grid-cols-3 gap-4 mb-3">
                          <div className="text-center">
                            <div className="text-lg font-bold text-blue-600">{opportunity.aiInsights.skillAlignment}%</div>
                            <div className="text-xs text-blue-700">Skill Match</div>
                          </div>
                          <div className="text-center">
                            <div className="text-lg font-bold text-blue-600">{opportunity.aiInsights.careerFit}%</div>
                            <div className="text-xs text-blue-700">Career Fit</div>
                          </div>
                          <div className="text-center">
                            <div className="text-lg font-bold text-green-600">{opportunity.aiInsights.growthPotential}%</div>
                            <div className="text-xs text-green-700">Growth</div>
                          </div>
                        </div>
                        
                        {opportunity.aiInsights.recommendations.length > 0 && (
                          <div className="space-y-1">
                            {opportunity.aiInsights.recommendations.slice(0, 2).map((rec, index) => (
                              <div key={index} className="flex items-center text-xs text-blue-700">
                                <Target className="w-3 h-3 mr-1" />
                                {rec}
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    )}

                    {/* Skills Tags */}
                    <div className="flex flex-wrap gap-2">
                      {opportunity.skills.slice(0, 6).map((skill, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                      {opportunity.skills.length > 6 && (
                        <Badge variant="outline" className="text-xs">
                          +{opportunity.skills.length - 6} more
                        </Badge>
                      )}
                    </div>

                    {/* Details */}
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-3">
                        <div>
                          <h4 className="font-medium mb-2">Requirements</h4>
                          <ul className="space-y-1">
                            {opportunity.requirements.slice(0, 3).map((req, index) => (
                              <li key={index} className="flex items-start text-sm text-gray-600">
                                <div className="w-1.5 h-1.5 bg-primary rounded-full mr-2 mt-2 flex-shrink-0" />
                                {req}
                              </li>
                            ))}
                            {opportunity.requirements.length > 3 && (
                              <li className="text-sm text-gray-600">
                                +{opportunity.requirements.length - 3} more requirements
                              </li>
                            )}
                          </ul>
                        </div>
                      </div>
                      
                      <div className="space-y-3">
                        <div>
                          <h4 className="font-medium mb-2">Benefits</h4>
                          <ul className="space-y-1">
                            {opportunity.benefits.slice(0, 3).map((benefit, index) => (
                              <li key={index} className="flex items-start text-sm text-gray-600">
                                <div className="w-1.5 h-1.5 bg-green-500 rounded-full mr-2 mt-2 flex-shrink-0" />
                                {benefit}
                              </li>
                            ))}
                            {opportunity.benefits.length > 3 && (
                              <li className="text-sm text-gray-600">
                                +{opportunity.benefits.length - 3} more benefits
                              </li>
                            )}
                          </ul>
                        </div>
                      </div>
                    </div>

                    {/* Metadata */}
                    <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                      {opportunity.location && (
                        <div className="flex items-center">
                          <MapPin className="w-4 h-4 mr-1" />
                          {opportunity.location}
                          {opportunity.remote && <Badge variant="outline" className="ml-2 text-xs">Remote OK</Badge>}
                        </div>
                      )}
                      
                      {opportunity.salary && (
                        <div className="flex items-center">
                          <DollarSign className="w-4 h-4 mr-1" />
                          {opportunity.salary.currency} {opportunity.salary.min.toLocaleString()} - {opportunity.salary.max.toLocaleString()}
                        </div>
                      )}
                      
                      {opportunity.duration && (
                        <div className="flex items-center">
                          <Calendar className="w-4 h-4 mr-1" />
                          {opportunity.duration}
                        </div>
                      )}
                      
                      <Badge variant="outline" className="text-xs">
                        {opportunity.level} level
                      </Badge>
                      
                      <Badge variant="outline" className="text-xs">
                        {opportunity.industry}
                      </Badge>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center justify-between pt-4 border-t border-border">
                      <div className="flex items-center space-x-2">
                        <Star className="w-4 h-4 text-yellow-500" />
                        <span className="text-sm text-gray-600">
                          {relevanceScore}% relevance • Posted {Math.ceil((Date.now() - opportunity.postedDate.getTime()) / (1000 * 60 * 60 * 24))} days ago
                        </span>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Button variant="outline" size="sm" onClick={() => window.open(opportunity.url, '_blank')}>
                          <ExternalLink className="w-4 h-4 mr-2" />
                          View Details
                        </Button>
                        <Button size="sm" disabled={daysLeft <= 0}>
                          {daysLeft <= 0 ? 'Expired' : 'Apply Now'}
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      )}

      {/* Load More */}
      <div className="text-center">
        <Button variant="outline" size="lg" onClick={loadOpportunities}>
          <RefreshCw className="w-4 h-4 mr-2" />
          Refresh Opportunities
        </Button>
      </div>
    </div>
  )
}