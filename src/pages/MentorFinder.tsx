import { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { BecomeMentorModal, type NewMentorData } from '@/components/BecomeMentorModal'
import { 
  Search, 
  Star, 
  MapPin, 
  Clock, 
  MessageCircle,
  Filter,
  Users,
  Award,
  CheckCircle,
  X,
  ExternalLink,
  GraduationCap
} from 'lucide-react'
import { mockMentors } from '@/services/mockData'
import { MentorAIService } from '@/services/aiServices'
import type { Mentor } from '@/types'

export function MentorFinder() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedExpertise, setSelectedExpertise] = useState<string[]>([])
  const [selectedAvailability, setSelectedAvailability] = useState('all')
  const [connectionRequests, setConnectionRequests] = useState<string[]>([])
  const [showFilters, setShowFilters] = useState(false)
  const [mentors, setMentors] = useState(mockMentors)
  const [isBecomeMentorOpen, setIsBecomeMentorOpen] = useState(false)

  // Mock user profile for compatibility calculation
  const userProfile = {
    interests: [
      { name: 'React', strength: 5 },
      { name: 'JavaScript', strength: 4 },
      { name: 'Career Development', strength: 3 }
    ],
    experienceLevel: 'junior'
  }

  // Filter mentors based on search and filters
  const filteredMentors = mentors.filter(mentor => {
    const matchesSearch = mentor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         mentor.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         mentor.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         mentor.expertise.some(exp => exp.name.toLowerCase().includes(searchTerm.toLowerCase()))
    
    const matchesExpertise = selectedExpertise.length === 0 || 
                            selectedExpertise.some(skill => 
                              mentor.expertise.some(exp => exp.name.toLowerCase().includes(skill.toLowerCase()))
                            )
    
    const matchesAvailability = selectedAvailability === 'all' || mentor.availability === selectedAvailability

    return matchesSearch && matchesExpertise && matchesAvailability
  })

  // Calculate compatibility scores with enhanced matching
  const mentorsWithCompatibility = filteredMentors.map(mentor => {
    const compatibilityScore = MentorAIService.calculateCompatibility(userProfile, mentor)
    return {
      ...mentor,
      compatibilityScore,
      matchingReasons: MentorAIService.generateMatchingReasons(compatibilityScore, mentor)
    }
  }).sort((a, b) => b.compatibilityScore - a.compatibilityScore)

  const handleConnect = (mentorId: string) => {
    setConnectionRequests([...connectionRequests, mentorId])
  }

  const handleBecomeMentor = (mentorData: NewMentorData) => {
    const newMentor: Mentor = {
      id: Date.now().toString(),
      name: mentorData.name,
      avatar: '',
      title: mentorData.title,
      company: mentorData.company,
      bio: mentorData.bio,
      expertise: mentorData.expertise,
      availability: mentorData.availability,
      rating: 5.0, // New mentors start with perfect rating
      reviewCount: 0,
      responseTime: mentorData.responseTime,
      languages: mentorData.languages,
      linkedinUrl: mentorData.linkedinUrl
    }
    
    setMentors([newMentor, ...mentors])
    
    // Show success message (you could replace this with a proper toast notification)
    alert(`🎉 Welcome to the mentor community, ${mentorData.name}! Your profile has been added to the mentor list.`)
  }

  const toggleExpertiseFilter = (skill: string) => {
    setSelectedExpertise(prev => 
      prev.includes(skill) 
        ? prev.filter(s => s !== skill)
        : [...prev, skill]
    )
  }

  const allSkills = Array.from(new Set(mentors.flatMap(mentor => 
    mentor.expertise.map(exp => exp.name)
  )))

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 py-8">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl text-center border border-teal-200 shadow-lg">
        <h1 className="text-4xl lg:text-5xl font-bold tracking-tight mb-6" style={{ color: '#000000' }}>
          Find Your Perfect <span className="bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent">Mentor</span>
        </h1>
        <p className="text-lg max-w-3xl mx-auto leading-relaxed text-gray-800 mb-6">
          Connect with industry experts who can guide your career journey and help you achieve your goals.
        </p>
        <div className="flex justify-center gap-4">
          <Button 
            onClick={() => setIsBecomeMentorOpen(true)}
            className="bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700 text-white px-6 py-3"
          >
            <GraduationCap className="w-5 h-5 mr-2" />
            Become a Mentor
          </Button>
        </div>
      </div>

      {/* Search and Filters */}
      <Card className="bg-white/80 backdrop-blur-sm shadow-lg rounded-xl border border-teal-200">
        <CardContent className="p-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search by expertise, company, or name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent text-gray-900"
              />
            </div>
            <Button 
              variant="outline" 
              className="md:w-auto hover:bg-teal-50 border-teal-300 text-teal-700"
              onClick={() => setShowFilters(!showFilters)}
            >
              <Filter className="w-4 h-4 mr-2" />
              Filters
            </Button>
          </div>

          {/* Advanced Filters */}
          {showFilters && (
            <div className="mt-6 p-4 bg-teal-50/80 backdrop-blur-sm rounded-lg space-y-4 border border-teal-200">
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Expertise Areas</h3>
                <div className="flex flex-wrap gap-2">
                  {allSkills.map((skill) => (
                    <Button
                      key={skill}
                      variant={selectedExpertise.includes(skill) ? "default" : "outline"}
                      size="sm"
                      onClick={() => toggleExpertiseFilter(skill)}
                      className={selectedExpertise.includes(skill) ? 
                        "bg-teal-600 text-white hover:bg-teal-700" : 
                        "hover:bg-teal-50 border-teal-300 text-teal-700"
                      }
                    >
                      {skill}
                      {selectedExpertise.includes(skill) && (
                        <X className="w-3 h-3 ml-1" />
                      )}
                    </Button>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Availability</h3>
                <div className="flex gap-2">
                  {['all', 'available', 'busy'].map((status) => (
                    <Button
                      key={status}
                      variant={selectedAvailability === status ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedAvailability(status)}
                      className={selectedAvailability === status ? 
                        "bg-teal-600 text-white hover:bg-teal-700" : 
                        "hover:bg-teal-50 border-teal-300 text-teal-700"
                      }
                    >
                      {status.charAt(0).toUpperCase() + status.slice(1)}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Results Summary */}
      <div className="flex items-center justify-between">
        <p className="text-gray-700">
          Found <span className="font-semibold text-gray-900">{mentorsWithCompatibility.length}</span> mentors
          {searchTerm && ` matching "${searchTerm}"`}
        </p>
        <div className="text-sm text-gray-600">
          Sorted by relevance
        </div>
      </div>

      {/* Mentor Cards */}
      <div className="grid gap-6">
        {mentorsWithCompatibility.map((mentor) => (
          <Card key={mentor.id} className="bg-white/80 backdrop-blur-sm border border-teal-200 shadow-lg hover:shadow-xl transition-all duration-300">
            <CardContent className="pt-6">
              <div className="flex flex-col lg:flex-row gap-6">
                {/* Mentor Info */}
                <div className="flex items-start space-x-4 flex-1">
                  <Avatar className="w-16 h-16">
                    <AvatarImage src={mentor.avatar} alt={mentor.name} />
                    <AvatarFallback className="bg-gradient-to-br from-teal-600 to-cyan-600 text-white text-lg">
                      {mentor.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  
                  <div className="flex-1 space-y-3">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900">{mentor.name}</h3>
                      <p className="text-gray-700 font-medium">{mentor.title} at {mentor.company}</p>
                    </div>
                    
                    <p className="text-sm text-gray-800 leading-relaxed">
                      {mentor.bio}
                    </p>
                    
                    <div className="flex flex-wrap gap-2">
                      {mentor.expertise.map((skill, index) => (
                        <Badge key={index} variant="secondary" className="bg-teal-100 text-teal-800 border border-teal-200">
                          {skill.name}
                          <span className="ml-1 text-xs">({skill.level}/5)</span>
                        </Badge>
                      ))}
                    </div>
                    
                    <div className="flex flex-wrap items-center gap-4 text-sm text-gray-700">
                      <div className="flex items-center">
                        <Star className="w-4 h-4 text-amber-500 mr-1" />
                        {mentor.rating} {mentor.reviewCount > 0 ? `(${mentor.reviewCount} reviews)` : '(New Mentor)'}
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        Responds {mentor.responseTime}
                      </div>
                      <div className="flex items-center">
                        <MapPin className="w-4 h-4 mr-1" />
                        {mentor.languages.join(', ')}
                      </div>
                      {mentor.reviewCount === 0 && (
                        <Badge className="bg-gradient-to-r from-teal-500 to-cyan-500 text-white">
                          ✨ New Mentor
                        </Badge>
                      )}
                    </div>

                    {/* Matching Reasons */}
                    <div className="bg-teal-50 border border-teal-200 rounded-lg p-3">
                      <h4 className="font-medium text-gray-900 mb-2">Why this is a great match:</h4>
                      <ul className="space-y-1">
                        {mentor.matchingReasons.map((reason, index) => (
                          <li key={index} className="flex items-center text-sm text-gray-700">
                            <CheckCircle className="w-3 h-3 mr-2 text-teal-600" />
                            {reason}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
                
                {/* Actions Only - Compatibility Removed */}
                <div className="lg:w-48 space-y-4">
                  <div className="space-y-2">
                    {connectionRequests.includes(mentor.id) ? (
                      <Button disabled className="w-full bg-emerald-500 text-white">
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Request Sent
                      </Button>
                    ) : (
                      <Button 
                        className="w-full bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700 text-white"
                        onClick={() => handleConnect(mentor.id)}
                      >
                        <MessageCircle className="w-4 h-4 mr-2" />
                        Connect
                      </Button>
                    )}
                    <Button variant="outline" className="w-full hover:bg-teal-50 border-teal-300 text-teal-700">
                      View Profile
                    </Button>
                    {mentor.linkedinUrl && (
                      <Button 
                        variant="outline" 
                        className="w-full hover:bg-blue-50 border-blue-300 text-blue-700"
                        onClick={() => window.open(mentor.linkedinUrl, '_blank')}
                      >
                        <ExternalLink className="w-4 h-4 mr-2" />
                        LinkedIn
                      </Button>
                    )}
                  </div>
                  
                  <div className="flex items-center justify-center">
                    <Badge 
                      variant={mentor.availability === 'available' ? 'default' : 'secondary'}
                      className={mentor.availability === 'available' ? 
                        'bg-emerald-500 text-white' : 
                        'bg-amber-500 text-white'
                      }
                    >
                      {mentor.availability === 'available' ? '🟢 Available' : '🟡 Busy'}
                    </Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-white/80 backdrop-blur-sm border border-teal-200 shadow-lg text-center">
          <CardContent className="pt-6">
            <Users className="w-8 h-8 text-teal-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-900">{mentors.length}+</div>
            <div className="text-sm text-gray-700">Expert Mentors</div>
          </CardContent>
        </Card>
        
        <Card className="bg-white/80 backdrop-blur-sm border border-teal-200 shadow-lg text-center">
          <CardContent className="pt-6">
            <Award className="w-8 h-8 text-teal-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-900">94%</div>
            <div className="text-sm text-gray-700">Success Rate</div>
          </CardContent>
        </Card>
        
        <Card className="bg-white/80 backdrop-blur-sm border border-teal-200 shadow-lg text-center">
          <CardContent className="pt-6">
            <MessageCircle className="w-8 h-8 text-teal-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-900">&lt; 2hrs</div>
            <div className="text-sm text-gray-700">Avg Response Time</div>
          </CardContent>
        </Card>
      </div>

      {/* Become Mentor Modal */}
      <BecomeMentorModal
        isOpen={isBecomeMentorOpen}
        onClose={() => setIsBecomeMentorOpen(false)}
        onSubmit={handleBecomeMentor}
      />
    </div>
  )
}