import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { 
  Target, 
  TrendingUp, 
  Clock, 
  ArrowRight,
  Brain,
  Lightbulb,
  CheckCircle,
  ArrowLeft
} from 'lucide-react'
import { CareerAIService } from '@/services/aiServices'

export function CareerGuidance() {
  const [currentStep, setCurrentStep] = useState<'intro' | 'quiz' | 'results' | 'learning-path' | 'explore-all'>('intro')
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [responses, setResponses] = useState<any[]>([])
  const [recommendations, setRecommendations] = useState<any[]>([])
  const [selectedCareer, setSelectedCareer] = useState<any>(null)
  const [allCareers, setAllCareers] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const questions = CareerAIService.generateCareerQuiz()

  const startAssessment = () => {
    setCurrentStep('quiz')
    setCurrentQuestion(0)
    setResponses([])
  }

  const handleAnswer = (answer: string) => {
    const newResponses = [...responses, {
      questionId: questions[currentQuestion].id,
      answer,
      confidence: 4,
      timeSpent: 30
    }]
    setResponses(newResponses)

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      // Quiz completed, generate recommendations
      setIsLoading(true)
      setTimeout(() => {
        const results = CareerAIService.generateCareerRecommendations(newResponses)
        setRecommendations(results)
        setCurrentStep('results')
        setIsLoading(false)
      }, 2000)
    }
  }

  const resetQuiz = () => {
    setCurrentStep('intro')
    setCurrentQuestion(0)
    setResponses([])
    setRecommendations([])
    setSelectedCareer(null)
    setAllCareers([])
  }

  const viewLearningPath = (career: any) => {
    setSelectedCareer(career)
    setCurrentStep('learning-path')
  }

  const exploreAllPaths = () => {
    const allPaths = CareerAIService.getAllCareerPaths()
    setAllCareers(allPaths)
    setCurrentStep('explore-all')
  }

  if (currentStep === 'explore-all') {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 animate-fade-in">
        {/* Header */}
        <div className="glass-hero p-8 text-center">
          <Button 
            variant="outline" 
            onClick={() => setCurrentStep('intro')}
            className="mb-6 flex items-center space-x-2 mx-auto"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Home</span>
          </Button>
          <h1 className="text-4xl lg:text-5xl font-bold tracking-tight mb-6">
            Explore All <span className="text-gradient">Career Paths</span>
          </h1>
          <p className="text-black text-lg max-w-3xl mx-auto leading-relaxed">
            Discover 20+ career opportunities in technology and beyond. Each path includes detailed learning roadmaps and market insights.
          </p>
        </div>

        {/* Career Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-slide-up">
          {allCareers.map((career, index) => (
            <Card key={index} className="card-interactive hover-glow"
                  onClick={() => viewLearningPath(career)}>
              <CardHeader>
                <div className="flex-between mb-3">
                  <CardTitle className="heading-tertiary">{career.careerPath}</CardTitle>
                  <div className="badge-primary">
                    {career.roadmap.difficulty}
                  </div>
                </div>
                <CardDescription className="text-black leading-relaxed">
                  {career.reasoning}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {/* Key Stats */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-3 glass-subtle rounded-lg">
                      <div className="font-semibold text-black">Duration</div>
                      <div className="text-gray-600">{career.roadmap.estimatedDuration} months</div>
                    </div>
                    <div className="text-center p-3 glass-subtle rounded-lg">
                      <div className="font-semibold text-black">Salary Range</div>
                      <div className="text-gray-600">${career.salaryRange.min/1000}k - ${career.salaryRange.max/1000}k</div>
                    </div>
                  </div>

                  {/* Market Demand */}
                  <div className="flex-between">
                    <span className="text-gray-600">Market Demand:</span>
                    <div className={`badge-professional ${
                      career.marketData.demand === 'very_high' ? 'badge-success' :
                      career.marketData.demand === 'high' ? 'badge-primary' :
                      'badge-warning'
                    }`}>
                      {career.marketData.demand.replace('_', ' ')}
                    </div>
                  </div>

                  {/* Key Skills */}
                  <div>
                    <div className="font-semibold text-black mb-3">Key Interests:</div>
                    <div className="flex flex-wrap gap-2">
                      {career.interests.slice(0, 3).map((interest: string, idx: number) => (
                        <div key={idx} className="badge-secondary">
                          {interest}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* View Path Button */}
                  <Button 
                    className="btn-primary w-full"
                    onClick={(e) => {
                      e.stopPropagation()
                      viewLearningPath(career)
                    }}
                  >
                    View Learning Path
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Stats Summary */}
        <Card className="glass-hero gradient-primary text-white border-0 shadow-floating">
          <CardContent className="section-padding">
            <div className="grid md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-4xl font-bold mb-3">{allCareers.length}+</div>
                <div className="text-blue-100 text-lg">Career Paths</div>
              </div>
              <div>
                <div className="text-4xl font-bold mb-3">500+</div>
                <div className="text-blue-100 text-lg">Learning Resources</div>
              </div>
              <div>
                <div className="text-4xl font-bold mb-3">$45k - $220k</div>
                <div className="text-blue-100 text-lg">Salary Range</div>
              </div>
              <div>
                <div className="text-4xl font-bold mb-3">6-24</div>
                <div className="text-blue-100 text-lg">Months to Master</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="text-center space-x-6">
          <Button onClick={() => setCurrentStep('intro')} variant="outline" size="lg" className="btn-secondary">
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Home
          </Button>
          <Button 
            size="lg" 
            className="btn-primary"
            onClick={startAssessment}
          >
            Take Personalized Quiz
          </Button>
        </div>
      </div>
    )
  }

  if (currentStep === 'learning-path' && selectedCareer) {
    return (
      <div className="space-y-8 max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center">
          <Button 
            variant="outline" 
            onClick={() => setCurrentStep(recommendations.length > 0 ? 'results' : 'explore-all')}
            className="mb-4 flex items-center space-x-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to {recommendations.length > 0 ? 'Results' : 'All Paths'}</span>
          </Button>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            {selectedCareer.careerPath} Learning Path
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Your personalized roadmap to becoming a {selectedCareer.careerPath.toLowerCase()}
          </p>
        </div>

        {/* Path Overview */}
        <Card className="bg-gradient-to-r from-blue-600 to-blue-700 text-white border-0 shadow-xl">
          <CardContent className="pt-6">
            <div className="grid md:grid-cols-3 gap-6 text-center">
              <div>
                <div className="text-3xl font-bold mb-2">{selectedCareer.roadmap.estimatedDuration}</div>
                <div className="text-blue-100">Months to Complete</div>
              </div>
              <div>
                <div className="text-3xl font-bold mb-2">{selectedCareer.roadmap.milestones.length}</div>
                <div className="text-blue-100">Learning Milestones</div>
              </div>
              <div>
                <div className="text-3xl font-bold mb-2">{selectedCareer.roadmap.difficulty}</div>
                <div className="text-blue-100">Difficulty Level</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Prerequisites */}
        <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center">
              <CheckCircle className="w-6 h-6 mr-2 text-green-600" />
              Prerequisites
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-4">
              {selectedCareer.roadmap.prerequisites.map((prereq: string, index: number) => (
                <div key={index} className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span className="text-gray-700">{prereq}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Learning Milestones */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-gray-900">Learning Milestones</h2>
          {selectedCareer.roadmap.milestones.map((milestone: any, index: number) => (
            <Card key={milestone.id} className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center">
                    <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center mr-3 text-sm font-bold">
                      {index + 1}
                    </div>
                    {milestone.title}
                  </CardTitle>
                  <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                    {milestone.estimatedHours} hours
                  </Badge>
                </div>
                <CardDescription className="ml-11">
                  {milestone.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="ml-11">
                <div className="space-y-4">
                  <h4 className="font-semibold text-gray-900">Recommended Resources:</h4>
                  <div className="grid gap-4">
                    {milestone.resources.map((resource: any) => (
                      <div key={resource.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-2">
                              <h5 className="font-medium text-gray-900">{resource.title}</h5>
                              <Badge variant="outline" className="text-xs">
                                {resource.type}
                              </Badge>
                              <Badge 
                                variant="outline" 
                                className={`text-xs ${
                                  resource.difficulty === 'beginner' ? 'border-green-500 text-green-700' :
                                  resource.difficulty === 'intermediate' ? 'border-yellow-500 text-yellow-700' :
                                  'border-red-500 text-red-700'
                                }`}
                              >
                                {resource.difficulty}
                              </Badge>
                            </div>
                            <p className="text-sm text-gray-600 mb-2">{resource.description}</p>
                            {resource.estimatedTime && (
                              <p className="text-xs text-gray-500">⏱️ {resource.estimatedTime} hours</p>
                            )}
                          </div>
                          <div className="ml-4">
                            {resource.url && (
                              <Button 
                                variant="outline" 
                                size="sm"
                                onClick={() => window.open(resource.url, '_blank')}
                                className="hover:bg-blue-50"
                              >
                                <ArrowRight className="w-3 h-3 mr-1" />
                                Visit
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Market Data */}
        <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center">
              <TrendingUp className="w-6 h-6 mr-2 text-blue-600" />
              Market Outlook
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900 mb-1">
                  {selectedCareer.marketData.growth}%
                </div>
                <div className="text-sm text-gray-600">Job Growth</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900 mb-1">
                  {selectedCareer.marketData.jobOpenings.toLocaleString()}
                </div>
                <div className="text-sm text-gray-600">Open Positions</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900 mb-1">
                  ${selectedCareer.salaryRange.median.toLocaleString()}
                </div>
                <div className="text-sm text-gray-600">Median Salary</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900 mb-1">
                  {selectedCareer.marketData.demand.replace('_', ' ')}
                </div>
                <div className="text-sm text-gray-600">Market Demand</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="text-center space-x-4">
          <Button 
            onClick={() => setCurrentStep(recommendations.length > 0 ? 'results' : 'explore-all')} 
            variant="outline" 
            size="lg"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to {recommendations.length > 0 ? 'Results' : 'All Paths'}
          </Button>
          <Button size="lg" className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800">
            Start Learning Journey
          </Button>
        </div>
      </div>
    )
  }

  if (currentStep === 'quiz') {
    const question = questions[currentQuestion]
    const progress = ((currentQuestion + 1) / questions.length) * 100

    return (
      <div className="space-y-8 max-w-4xl mx-auto">
        {/* Progress Header */}
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Career Assessment
          </h1>
          <div className="flex items-center justify-center space-x-4 mb-6">
            <span className="text-sm text-black">Question {currentQuestion + 1} of {questions.length}</span>
            <Progress value={progress} className="w-64" />
            <span className="text-sm text-black">{Math.round(progress)}%</span>
          </div>
        </div>

        {/* Question Card */}
        <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
          <CardHeader className="text-center pb-8">
            <CardTitle className="text-2xl text-black leading-relaxed">
              {question.question}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {question.options?.map((option, index) => (
              <Button
                key={index}
                variant="outline"
                className="w-full p-6 h-auto text-left justify-start hover:bg-blue-50 hover:border-blue-300 transition-all duration-200"
                onClick={() => handleAnswer(option)}
              >
                <div className="flex items-center space-x-3">
                  <div className="w-6 h-6 rounded-full border-2 border-gray-300 flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-blue-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <span className="text-black">{option}</span>
                </div>
              </Button>
            ))}
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="flex justify-between">
          <Button 
            variant="outline" 
            onClick={resetQuiz}
            className="flex items-center space-x-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Start Over</span>
          </Button>
          <div className="text-sm text-gray-500">
            Press any option to continue
          </div>
        </div>
      </div>
    )
  }

  if (currentStep === 'results') {
    return (
      <div className="space-y-8">
        {/* Results Header */}
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold text-black mb-4">
            Your Career Recommendations
          </h1>
          <p className="text-xl text-black max-w-2xl mx-auto">
            Based on your responses, here are the career paths that align best with your interests and skills.
          </p>
        </div>

        {/* Recommendations */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recommendations.map((career, index) => (
            <Card key={index} className="bg-white/80 backdrop-blur-sm border-0 shadow-xl hover:shadow-2xl transition-all duration-300">
              <CardHeader>
                <div className="flex items-center justify-between mb-4">
                  <CardTitle className="text-xl text-black">{career.careerPath}</CardTitle>
                  <Badge className={`${
                    career.compatibilityScore >= 90 ? 'bg-green-500' :
                    career.compatibilityScore >= 80 ? 'bg-blue-500' :
                    'bg-purple-500'
                  } text-white`}>
                    {career.compatibilityScore}% Match
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Progress value={career.compatibilityScore} className="h-3" />
                  <p className="text-sm text-black leading-relaxed">
                    {career.reasoning}
                  </p>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Avg. Salary:</span>
                    <span className="font-semibold text-black">
                      ${career.salaryRange.min.toLocaleString()} - ${career.salaryRange.max.toLocaleString()}
                    </span>
                  </div>
                  <Button 
                    className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800"
                    onClick={() => viewLearningPath(career)}
                  >
                    View Learning Path
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="text-center space-x-4">
          <Button onClick={resetQuiz} variant="outline" size="lg">
            Take Quiz Again
          </Button>
          <Button 
            size="lg" 
            className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800"
            onClick={() => recommendations.length > 0 && viewLearningPath(recommendations[0])}
          >
            Explore Top Recommendation
          </Button>
        </div>
      </div>
    )
  }

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-6">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600"></div>
        <h2 className="text-2xl font-semibold text-gray-900">Analyzing Your Responses...</h2>
        <p className="text-gray-600 text-center max-w-md">
          Our AI is processing your answers to generate personalized career recommendations tailored just for you.
        </p>
      </div>
    )
  }

  // Intro screen
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 py-8 animate-fade-in">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-8 rounded-2xl text-center border border-blue-100">
        <h1 className="text-4xl lg:text-5xl font-bold tracking-tight mb-6" style={{ color: '#000000' }}>
          AI-Powered <span className="bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent">Career Guidance</span>
        </h1>
        <p className="text-lg max-w-3xl mx-auto leading-relaxed" style={{ color: '#000000' }}>
          Discover your ideal career path with our comprehensive AI assessment and personalized recommendations.
        </p>
      </div>

      {/* Career Assessment Card */}
      <Card className="card-professional max-w-5xl mx-auto animate-scale-in">
        <CardHeader>
          <CardTitle className="heading-secondary flex items-center">
            <div className="w-12 h-12 gradient-primary rounded-xl flex-center mr-4">
              <Brain className="w-7 h-7 text-white" />
            </div>
            Career Assessment Quiz
          </CardTitle>
          <CardDescription className="text-black text-lg">
            Take our comprehensive 8-question assessment to discover careers that match your interests, skills, and personality.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid-features gap-12">
            <div className="space-y-8">
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex-center">
                  <Clock className="w-5 h-5 text-blue-600" />
                </div>
                <span className="text-black">10-15 minutes to complete</span>
              </div>
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-lg flex-center">
                  <Target className="w-5 h-5 text-green-600" />
                </div>
                <span className="text-black">Personalized career recommendations</span>
              </div>
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex-center">
                  <TrendingUp className="w-5 h-5 text-blue-600" />
                </div>
                <span className="text-black">Market insights and salary data</span>
              </div>
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-orange-100 dark:bg-orange-900/30 rounded-lg flex-center">
                  <Lightbulb className="w-5 h-5 text-orange-600" />
                </div>
                <span className="text-black">Learning roadmaps and resources</span>
              </div>
            </div>
            <div className="flex-center">
              <Button 
                size="lg" 
                className="btn-primary text-lg px-10 py-6 shadow-elevated"
                onClick={startAssessment}
              >
                Start Assessment
                <ArrowRight className="w-6 h-6 ml-3" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Features */}
      <div className="grid-features max-w-5xl mx-auto animate-slide-up">
        <Card className="card-feature">
          <CardHeader>
            <CardTitle className="heading-tertiary flex items-center">
              <div className="w-10 h-10 gradient-accent rounded-lg flex-center mr-3">
                <Lightbulb className="w-6 h-6 text-white" />
              </div>
              Personalized Roadmaps
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-black mb-6">
              Get detailed learning paths with milestones, resources, and timeline estimates tailored to your chosen career.
            </p>
            <Button variant="outline" className="btn-secondary hover-glow" onClick={exploreAllPaths}>
              Explore All Paths
            </Button>
          </CardContent>
        </Card>

        <Card className="card-feature">
          <CardHeader>
            <CardTitle className="heading-tertiary flex items-center">
              <div className="w-10 h-10 gradient-success rounded-lg flex-center mr-3">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              Market Insights
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-black mb-6">
              Access real-time job market data, salary ranges, and growth projections for your target careers.
            </p>
            <Button variant="outline" className="btn-secondary hover-glow">View Market Data</Button>
          </CardContent>
        </Card>
      </div>

      {/* Explore All Paths CTA */}
      <Card className="glass-hero gradient-primary text-white border-0 shadow-floating max-w-5xl mx-auto">
        <CardContent className="section-padding text-center">
          <h3 className="heading-secondary mb-6">Not Sure Where to Start?</h3>
          <p className="text-blue-100 text-lg mb-8 max-w-3xl mx-auto leading-relaxed">
            Browse our complete collection of 20+ career paths in technology, design, business, and more. 
            Each path includes detailed learning roadmaps, salary insights, and market demand data.
          </p>
          <Button 
            size="lg" 
            variant="outline"
            className="text-white border-white hover:bg-white hover:text-blue-600 px-8 py-4 text-lg"
            onClick={exploreAllPaths}
          >
            Explore All Career Paths
            <ArrowRight className="w-6 h-6 ml-3" />
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}