import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle 
} from '@/components/ui/dialog'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { 
  GraduationCap,
  Building2,
  Globe,
  Clock,
  Star,
  Plus,
  X,
  ExternalLink,
  User
} from 'lucide-react'
import { useUserData } from '@/hooks/useUserData'
import type { Mentor, ExpertiseArea } from '@/types'

interface BecomeMentorModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (mentorData: NewMentorData) => void
}

export interface NewMentorData {
  name: string
  title: string
  company: string
  bio: string
  expertise: ExpertiseArea[]
  availability: 'available' | 'busy'
  responseTime: string
  languages: string[]
  linkedinUrl?: string
}

const availabilityOptions = [
  { value: 'available', label: 'Available - Ready to mentor actively', color: 'text-green-600' },
  { value: 'busy', label: 'Busy - Limited availability', color: 'text-amber-600' }
]

const responseTimeOptions = [
  '< 1 hour',
  '< 2 hours', 
  '< 4 hours',
  '< 6 hours',
  '< 12 hours',
  '< 24 hours',
  '1-2 days',
  '2-3 days'
]

const expertiseAreas = [
  'JavaScript', 'Python', 'React', 'Node.js', 'Java', 'C++', 'Go', 'Rust',
  'Machine Learning', 'Data Science', 'AI/ML', 'Deep Learning', 'NLP',
  'Web Development', 'Mobile Development', 'iOS Development', 'Android Development',
  'DevOps', 'AWS', 'Docker', 'Kubernetes', 'CI/CD', 'Cloud Architecture',
  'System Design', 'Database Design', 'Microservices', 'API Design',
  'UI/UX Design', 'Product Design', 'User Research', 'Prototyping',
  'Product Management', 'Project Management', 'Agile', 'Scrum',
  'Cybersecurity', 'Network Security', 'Penetration Testing', 'Blockchain',
  'Game Development', 'Unity', 'Unreal Engine', '3D Graphics',
  'Data Engineering', 'Big Data', 'Analytics', 'Business Intelligence',
  'Quality Assurance', 'Test Automation', 'Performance Testing',
  'Technical Writing', 'Documentation', 'Content Strategy',
  'Sales Engineering', 'Customer Success', 'Business Development',
  'Leadership', 'Team Management', 'Career Development', 'Mentoring'
]

const commonLanguages = [
  'English', 'Spanish', 'French', 'German', 'Italian', 'Portuguese', 'Russian',
  'Mandarin', 'Japanese', 'Korean', 'Arabic', 'Hindi', 'Bengali', 'Telugu',
  'Tamil', 'Gujarati', 'Marathi', 'Punjabi', 'Urdu', 'Dutch', 'Swedish',
  'Norwegian', 'Danish', 'Finnish', 'Polish', 'Czech', 'Hungarian', 'Romanian'
]

export function BecomeMentorModal({ isOpen, onClose, onSubmit }: BecomeMentorModalProps) {
  const { user } = useUserData()
  const [formData, setFormData] = useState({
    name: user.name,
    title: '',
    company: '',
    bio: '',
    availability: 'available' as const,
    responseTime: '< 4 hours',
    linkedinUrl: ''
  })
  
  const [expertise, setExpertise] = useState<ExpertiseArea[]>([])
  const [languages, setLanguages] = useState<string[]>(['English'])
  const [isSubmitting, setIsSubmitting] = useState(false)
  
  // Expertise management
  const [selectedSkill, setSelectedSkill] = useState('')
  const [skillLevel, setSkillLevel] = useState(3)
  const [yearsExperience, setYearsExperience] = useState(2)

  const addExpertise = () => {
    if (selectedSkill && !expertise.find(exp => exp.name === selectedSkill)) {
      setExpertise([...expertise, {
        name: selectedSkill,
        level: skillLevel,
        yearsExperience: yearsExperience
      }])
      setSelectedSkill('')
      setSkillLevel(3)
      setYearsExperience(2)
    }
  }

  const removeExpertise = (skillName: string) => {
    setExpertise(expertise.filter(exp => exp.name !== skillName))
  }

  const addLanguage = (language: string) => {
    if (!languages.includes(language)) {
      setLanguages([...languages, language])
    }
  }

  const removeLanguage = (language: string) => {
    if (languages.length > 1) { // Keep at least one language
      setLanguages(languages.filter(lang => lang !== language))
    }
  }

  const handleSubmit = async () => {
    if (!formData.name.trim() || !formData.title.trim() || !formData.company.trim() || 
        !formData.bio.trim() || expertise.length === 0) {
      return
    }

    setIsSubmitting(true)
    
    try {
      const mentorData: NewMentorData = {
        name: formData.name.trim(),
        title: formData.title.trim(),
        company: formData.company.trim(),
        bio: formData.bio.trim(),
        expertise,
        availability: formData.availability,
        responseTime: formData.responseTime,
        languages,
        linkedinUrl: formData.linkedinUrl.trim() || undefined
      }
      
      onSubmit(mentorData)
      handleClose()
    } catch (error) {
      console.error('Error submitting mentor application:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleClose = () => {
    setFormData({
      name: user.name,
      title: '',
      company: '',
      bio: '',
      availability: 'available',
      responseTime: '< 4 hours',
      linkedinUrl: ''
    })
    setExpertise([])
    setLanguages(['English'])
    setSelectedSkill('')
    setSkillLevel(3)
    setYearsExperience(2)
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2 text-2xl">
            <GraduationCap className="w-8 h-8 text-teal-600" />
            <span>Become a Mentor</span>
          </DialogTitle>
          <DialogDescription>
            Share your expertise and help others grow in their careers. Join our community of mentors!
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-8">
          {/* Preview Card */}
          <div className="p-4 bg-gradient-to-r from-teal-50 to-blue-50 rounded-lg border border-teal-200">
            <h3 className="font-semibold text-gray-900 mb-3">Preview Your Mentor Profile</h3>
            <div className="bg-white rounded-lg p-4 border border-teal-200">
              <div className="flex items-start space-x-4">
                <Avatar className="w-12 h-12">
                  <AvatarImage src={user.profile.avatar} alt={formData.name} />
                  <AvatarFallback className="bg-gradient-to-br from-teal-600 to-cyan-600 text-white">
                    {formData.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900">{formData.name || 'Your Name'}</h4>
                  <p className="text-gray-700">{formData.title || 'Your Title'} {formData.company && `at ${formData.company}`}</p>
                  {formData.bio && <p className="text-sm text-gray-600 mt-1">{formData.bio.slice(0, 100)}...</p>}
                  <div className="flex items-center space-x-4 mt-2 text-sm text-gray-600">
                    <div className="flex items-center">
                      <Star className="w-3 h-3 text-amber-500 mr-1" />
                      New Mentor
                    </div>
                    <div className="flex items-center">
                      <Clock className="w-3 h-3 mr-1" />
                      {formData.responseTime}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Basic Information */}
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                <User className="w-5 h-5 mr-2 text-teal-600" />
                Basic Information
              </h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    placeholder="Your full name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Professional Title *
                  </label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    placeholder="e.g., Senior Software Engineer, Product Manager"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Company *
                  </label>
                  <input
                    type="text"
                    value={formData.company}
                    onChange={(e) => setFormData({...formData, company: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    placeholder="e.g., Google, Microsoft, Startup Inc."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    LinkedIn Profile (Optional)
                  </label>
                  <input
                    type="url"
                    value={formData.linkedinUrl}
                    onChange={(e) => setFormData({...formData, linkedinUrl: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    placeholder="https://linkedin.com/in/yourprofile"
                  />
                </div>
              </div>
            </div>

            {/* Availability & Response */}
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                <Clock className="w-5 h-5 mr-2 text-teal-600" />
                Availability
              </h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Current Availability *
                  </label>
                  <Select value={formData.availability} onValueChange={(value: 'available' | 'busy') => setFormData({...formData, availability: value})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {availabilityOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          <span className={option.color}>{option.label}</span>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Typical Response Time *
                  </label>
                  <Select value={formData.responseTime} onValueChange={(value) => setFormData({...formData, responseTime: value})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {responseTimeOptions.map((time) => (
                        <SelectItem key={time} value={time}>{time}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Languages Spoken
                  </label>
                  <div className="space-y-2">
                    <Select onValueChange={addLanguage}>
                      <SelectTrigger>
                        <SelectValue placeholder="Add a language" />
                      </SelectTrigger>
                      <SelectContent>
                        {commonLanguages.filter(lang => !languages.includes(lang)).map((language) => (
                          <SelectItem key={language} value={language}>{language}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <div className="flex flex-wrap gap-2">
                      {languages.map((language) => (
                        <Badge key={language} variant="secondary" className="bg-teal-100 text-teal-800">
                          {language}
                          {languages.length > 1 && (
                            <button
                              onClick={() => removeLanguage(language)}
                              className="ml-1 hover:text-red-600"
                            >
                              <X className="w-3 h-3" />
                            </button>
                          )}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bio */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">
              Professional Bio *
            </h3>
            <Textarea
              value={formData.bio}
              onChange={(e) => setFormData({...formData, bio: e.target.value})}
              placeholder="Tell potential mentees about your background, experience, and what you can help them with. What makes you a great mentor?"
              className="min-h-[120px] resize-none"
              maxLength={500}
            />
            <div className="text-sm text-gray-500">
              {formData.bio.length}/500 characters
            </div>
          </div>

          {/* Expertise Areas */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">
              Areas of Expertise *
            </h3>
            
            {/* Add Expertise */}
            <div className="p-4 bg-gray-50 rounded-lg space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="md:col-span-2">
                  <Select value={selectedSkill} onValueChange={setSelectedSkill}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select skill/technology" />
                    </SelectTrigger>
                    <SelectContent>
                      {expertiseAreas.filter(skill => !expertise.find(exp => exp.name === skill)).map((skill) => (
                        <SelectItem key={skill} value={skill}>{skill}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Select value={skillLevel.toString()} onValueChange={(value) => setSkillLevel(parseInt(value))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Skill Level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1 - Beginner</SelectItem>
                      <SelectItem value="2">2 - Basic</SelectItem>
                      <SelectItem value="3">3 - Intermediate</SelectItem>
                      <SelectItem value="4">4 - Advanced</SelectItem>
                      <SelectItem value="5">5 - Expert</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Select value={yearsExperience.toString()} onValueChange={(value) => setYearsExperience(parseInt(value))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Years" />
                    </SelectTrigger>
                    <SelectContent>
                      {Array.from({length: 20}, (_, i) => i + 1).map((year) => (
                        <SelectItem key={year} value={year.toString()}>
                          {year} year{year > 1 ? 's' : ''}
                        </SelectItem>
                      ))}
                      <SelectItem value="21">20+ years</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <Button 
                onClick={addExpertise}
                disabled={!selectedSkill}
                className="bg-teal-600 hover:bg-teal-700 text-white"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Expertise
              </Button>
            </div>

            {/* Current Expertise */}
            {expertise.length > 0 && (
              <div className="space-y-2">
                <h4 className="font-medium text-gray-700">Your Expertise Areas:</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {expertise.map((exp, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-white border border-teal-200 rounded-lg">
                      <div>
                        <span className="font-medium text-gray-900">{exp.name}</span>
                        <div className="text-sm text-gray-600">
                          Level {exp.level}/5 • {exp.yearsExperience} year{exp.yearsExperience > 1 ? 's' : ''}
                        </div>
                      </div>
                      <button
                        onClick={() => removeExpertise(exp.name)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        <DialogFooter className="flex justify-between">
          <Button variant="outline" onClick={handleClose}>
            Cancel
          </Button>
          <Button 
            onClick={handleSubmit}
            disabled={!formData.name.trim() || !formData.title.trim() || !formData.company.trim() || 
                     !formData.bio.trim() || expertise.length === 0 || isSubmitting}
            className="bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700 text-white"
          >
            {isSubmitting ? 'Submitting...' : 'Become a Mentor'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}