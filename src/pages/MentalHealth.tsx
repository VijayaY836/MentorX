import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { 
  Brain, 
  Shield, 
  AlertTriangle, 
  CheckCircle,
  Heart,
  Lightbulb,
  Phone,
  ExternalLink,
  User,
  Calendar,
  TrendingDown,
  Zap,
  RefreshCw
} from 'lucide-react'

interface MentalHealthAssessment {
  responses: Record<string, number>
  scores: {
    anxiety: number
    depression: number
    bipolar: number
    ptsd: number
  }
  diagnosis: string[]
  riskLevel: 'low' | 'moderate' | 'high'
  completedAt: Date
}

interface Recommendation {
  title: string
  description: string
  tips: string[]
  resources: Array<{
    name: string
    type: 'article' | 'hotline' | 'app' | 'website'
    url?: string
    phone?: string
  }>
}

// Scientifically-based questionnaire covering all four conditions
const mentalHealthQuestions = [
  // Anxiety-focused questions (GAD-7 inspired)
  {
    id: 'worry_control',
    question: 'Over the last 2 weeks, how often have you had trouble controlling worry?',
    condition: 'anxiety',
    options: [
      { text: 'Not at all', score: 0 },
      { text: 'Several days', score: 1 },
      { text: 'More than half the days', score: 2 },
      { text: 'Nearly every day', score: 3 }
    ]
  },
  {
    id: 'restless_anxious',
    question: 'How often have you felt restless, keyed up, or on edge?',
    condition: 'anxiety',
    options: [
      { text: 'Not at all', score: 0 },
      { text: 'Several days', score: 1 },
      { text: 'More than half the days', score: 2 },
      { text: 'Nearly every day', score: 3 }
    ]
  },
  {
    id: 'fear_worst',
    question: 'How often do you fear that something awful might happen?',
    condition: 'anxiety',
    options: [
      { text: 'Not at all', score: 0 },
      { text: 'Several days', score: 1 },
      { text: 'More than half the days', score: 2 },
      { text: 'Nearly every day', score: 3 }
    ]
  },
  
  // Depression-focused questions (PHQ-9 inspired)
  {
    id: 'little_interest',
    question: 'Over the last 2 weeks, how often have you had little interest or pleasure in doing things?',
    condition: 'depression',
    options: [
      { text: 'Not at all', score: 0 },
      { text: 'Several days', score: 1 },
      { text: 'More than half the days', score: 2 },
      { text: 'Nearly every day', score: 3 }
    ]
  },
  {
    id: 'feeling_down',
    question: 'How often have you been feeling down, depressed, or hopeless?',
    condition: 'depression',
    options: [
      { text: 'Not at all', score: 0 },
      { text: 'Several days', score: 1 },
      { text: 'More than half the days', score: 2 },
      { text: 'Nearly every day', score: 3 }
    ]
  },
  {
    id: 'sleep_issues',
    question: 'How often have you had trouble falling asleep, staying asleep, or sleeping too much?',
    condition: 'depression',
    options: [
      { text: 'Not at all', score: 0 },
      { text: 'Several days', score: 1 },
      { text: 'More than half the days', score: 2 },
      { text: 'Nearly every day', score: 3 }
    ]
  },
  {
    id: 'energy_fatigue',
    question: 'How often have you felt tired or had little energy?',
    condition: 'depression',
    options: [
      { text: 'Not at all', score: 0 },
      { text: 'Several days', score: 1 },
      { text: 'More than half the days', score: 2 },
      { text: 'Nearly every day', score: 3 }
    ]
  },
  
  // Bipolar-focused questions (MDQ inspired)
  {
    id: 'mood_periods',
    question: 'Have you ever had periods where you felt so good or hyper that others thought you were not your normal self?',
    condition: 'bipolar',
    options: [
      { text: 'Never', score: 0 },
      { text: 'Rarely', score: 1 },
      { text: 'Sometimes', score: 2 },
      { text: 'Often', score: 3 }
    ]
  },
  {
    id: 'less_sleep_energy',
    question: 'Have you had periods where you needed much less sleep than usual and still felt energetic?',
    condition: 'bipolar',
    options: [
      { text: 'Never', score: 0 },
      { text: 'Rarely', score: 1 },
      { text: 'Sometimes', score: 2 },
      { text: 'Often', score: 3 }
    ]
  },
  {
    id: 'racing_thoughts',
    question: 'Have you experienced periods of racing thoughts or feeling like your mind was going too fast?',
    condition: 'bipolar',
    options: [
      { text: 'Never', score: 0 },
      { text: 'Rarely', score: 1 },
      { text: 'Sometimes', score: 2 },
      { text: 'Often', score: 3 }
    ]
  },
  
  // PTSD-focused questions (PCL-5 inspired)
  {
    id: 'traumatic_memories',
    question: 'In the past month, how often have you been bothered by repeated, disturbing memories of a stressful experience?',
    condition: 'ptsd',
    options: [
      { text: 'Not at all', score: 0 },
      { text: 'A little bit', score: 1 },
      { text: 'Moderately', score: 2 },
      { text: 'Quite a bit', score: 3 },
      { text: 'Extremely', score: 4 }
    ]
  },
  {
    id: 'avoid_reminders',
    question: 'How often do you avoid activities, places, or people that remind you of a stressful experience?',
    condition: 'ptsd',
    options: [
      { text: 'Not at all', score: 0 },
      { text: 'A little bit', score: 1 },
      { text: 'Moderately', score: 2 },
      { text: 'Quite a bit', score: 3 },
      { text: 'Extremely', score: 4 }
    ]
  },
  {
    id: 'hypervigilant',
    question: 'How often are you super alert, watchful, or on guard?',
    condition: 'ptsd',
    options: [
      { text: 'Not at all', score: 0 },
      { text: 'A little bit', score: 1 },
      { text: 'Moderately', score: 2 },
      { text: 'Quite a bit', score: 3 },
      { text: 'Extremely', score: 4 }
    ]
  },
  
  // Additional cross-condition questions
  {
    id: 'concentration',
    question: 'How often do you have trouble concentrating on things like work, school, or reading?',
    condition: 'general',
    options: [
      { text: 'Not at all', score: 0 },
      { text: 'Several days', score: 1 },
      { text: 'More than half the days', score: 2 },
      { text: 'Nearly every day', score: 3 }
    ]
  },
  {
    id: 'irritability',
    question: 'How often have you felt irritable, grouchy, or in a bad mood?',
    condition: 'general',
    options: [
      { text: 'Not at all', score: 0 },
      { text: 'Several days', score: 1 },
      { text: 'More than half the days', score: 2 },
      { text: 'Nearly every day', score: 3 }
    ]
  }
]

const recommendations: Record<string, Recommendation> = {
  anxiety: {
    title: 'Managing Anxiety',
    description: 'Your responses suggest you may be experiencing symptoms of anxiety. Here are evidence-based strategies to help manage these feelings.',
    tips: [
      'Practice deep breathing exercises: 4 counts in, hold for 4, exhale for 6',
      'Try progressive muscle relaxation to reduce physical tension',
      'Limit caffeine intake, especially in the afternoon and evening',
      'Establish a regular sleep schedule and create a calming bedtime routine',
      'Challenge negative thoughts by asking: "Is this thought realistic?"',
      'Engage in regular physical exercise, even just 10-15 minutes daily',
      'Practice mindfulness meditation using apps or guided sessions',
      'Break large tasks into smaller, manageable steps'
    ],
    resources: [
      { name: 'Anxiety and Depression Association of America', type: 'website', url: 'https://adaa.org' },
      { name: 'Headspace - Meditation App', type: 'app', url: 'https://headspace.com' },
      { name: 'Crisis Text Line', type: 'hotline', phone: 'Text HOME to 741741' },
      { name: 'Anxiety Self-Help Guide', type: 'article', url: 'https://www.nhs.uk/mental-health/self-help/guides-tools-and-activities/self-help-therapies/' }
    ]
  },
  depression: {
    title: 'Managing Depression',
    description: 'Your responses indicate you may be experiencing symptoms of depression. These strategies can help improve your mood and overall well-being.',
    tips: [
      'Maintain a daily routine, even a simple one, to provide structure',
      'Try to get sunlight exposure, especially in the morning',
      'Engage in activities you used to enjoy, even if they don\'t feel appealing now',
      'Connect with supportive friends or family members regularly',
      'Set small, achievable daily goals to build momentum',
      'Practice gratitude by writing down 3 things you\'re thankful for each day',
      'Avoid alcohol and drugs, which can worsen depression symptoms',
      'Consider joining a support group or online community'
    ],
    resources: [
      { name: 'National Suicide Prevention Lifeline', type: 'hotline', phone: '988' },
      { name: 'Depression and Bipolar Support Alliance', type: 'website', url: 'https://www.dbsalliance.org' },
      { name: 'Mood Tools App', type: 'app', url: 'https://moodtools.org' },
      { name: 'Understanding Depression', type: 'article', url: 'https://www.nimh.nih.gov/health/topics/depression' }
    ]
  },
  bipolar: {
    title: 'Managing Bipolar Symptoms',
    description: 'Your responses suggest you may experience mood episodes consistent with bipolar disorder. Mood stability is key to managing this condition.',
    tips: [
      'Maintain a consistent sleep schedule - aim for 7-9 hours nightly',
      'Track your mood daily using a mood chart or app',
      'Identify and avoid personal triggers for mood episodes',
      'Take medications as prescribed and don\'t stop without consulting your doctor',
      'Create a crisis plan for when you feel a mood episode starting',
      'Build a strong support network of family, friends, and healthcare providers',
      'Avoid alcohol and recreational drugs, which can trigger episodes',
      'Learn to recognize early warning signs of mood changes'
    ],
    resources: [
      { name: 'International Bipolar Foundation', type: 'website', url: 'https://ibpf.org' },
      { name: 'eMoods Bipolar Mood Tracker', type: 'app', url: 'https://emoodtracker.com' },
      { name: 'NAMI Helpline', type: 'hotline', phone: '1-800-950-NAMI (6264)' },
      { name: 'Bipolar Disorder Guide', type: 'article', url: 'https://www.nimh.nih.gov/health/topics/bipolar-disorder' }
    ]
  },
  ptsd: {
    title: 'Managing PTSD Symptoms',
    description: 'Your responses indicate you may be experiencing symptoms related to trauma. Healing from trauma takes time, and professional support is often helpful.',
    tips: [
      'Practice grounding techniques: name 5 things you see, 4 you hear, 3 you touch',
      'Develop a safety plan for when you feel triggered or overwhelmed',
      'Maintain connections with supportive people in your life',
      'Engage in regular physical activity to help process stress hormones',
      'Avoid alcohol and drugs, which can interfere with healing',
      'Practice relaxation techniques like deep breathing or yoga',
      'Consider trauma-focused therapy like EMDR or CPT',
      'Be patient with yourself - healing is not linear'
    ],
    resources: [
      { name: 'National Center for PTSD', type: 'website', url: 'https://www.ptsd.va.gov' },
      { name: 'PTSD Coach App', type: 'app', url: 'https://www.ptsd.va.gov/appvid/mobile/ptsdcoach_app.asp' },
      { name: 'Veterans Crisis Line', type: 'hotline', phone: '1-800-273-8255' },
      { name: 'Trauma Recovery Network', type: 'website', url: 'https://www.traumarecoverynetwork.org' }
    ]
  },
  normal: {
    title: 'Maintaining Mental Wellness',
    description: 'Your responses suggest you\'re managing well mentally. Here are strategies to maintain and enhance your mental health.',
    tips: [
      'Continue practicing good self-care habits',
      'Maintain social connections and nurture relationships',
      'Engage in regular physical activity and outdoor time',
      'Practice stress management techniques proactively',
      'Keep learning new skills and challenging yourself mentally',
      'Maintain a healthy work-life balance',
      'Practice gratitude and mindfulness regularly',
      'Don\'t hesitate to seek support when facing challenges'
    ],
    resources: [
      { name: 'Mental Health America', type: 'website', url: 'https://www.mhanational.org' },
      { name: 'Calm - Meditation App', type: 'app', url: 'https://calm.com' },
      { name: 'Wellness Tips', type: 'article', url: 'https://www.mentalhealth.gov/basics/what-is-mental-health' },
      { name: 'Crisis Text Line', type: 'hotline', phone: 'Text HOME to 741741' }
    ]
  }
}

export function MentalHealth() {
  const [currentStep, setCurrentStep] = useState<'assessment' | 'results'>('assessment')
  const [responses, setResponses] = useState<Record<string, number>>({})
  const [assessment, setAssessment] = useState<MentalHealthAssessment | null>(null)

  const calculateScores = (responses: Record<string, number>) => {
    const scores = {
      anxiety: 0,
      depression: 0,
      bipolar: 0,
      ptsd: 0
    }

    mentalHealthQuestions.forEach(question => {
      const response = responses[question.id] || 0
      if (question.condition === 'anxiety') {
        scores.anxiety += response
      } else if (question.condition === 'depression') {
        scores.depression += response
      } else if (question.condition === 'bipolar') {
        scores.bipolar += response
      } else if (question.condition === 'ptsd') {
        scores.ptsd += response
      } else if (question.condition === 'general') {
        // General questions contribute to multiple conditions
        scores.anxiety += response * 0.5
        scores.depression += response * 0.5
      }
    })

    return scores
  }

  const determineDiagnosis = (scores: any) => {
    const diagnosis: string[] = []
    let riskLevel: 'low' | 'moderate' | 'high' = 'low'

    // Thresholds based on clinical screening tools
    if (scores.anxiety >= 8) {
      diagnosis.push('anxiety')
      riskLevel = scores.anxiety >= 12 ? 'high' : 'moderate'
    }
    
    if (scores.depression >= 8) {
      diagnosis.push('depression')
      riskLevel = scores.depression >= 12 ? 'high' : 'moderate'
    }
    
    if (scores.bipolar >= 6) {
      diagnosis.push('bipolar')
      riskLevel = scores.bipolar >= 9 ? 'high' : 'moderate'
    }
    
    if (scores.ptsd >= 8) {
      diagnosis.push('ptsd')
      riskLevel = scores.ptsd >= 12 ? 'high' : 'moderate'
    }

    return { diagnosis, riskLevel }
  }

  const handleAssessmentSubmit = () => {
    if (Object.keys(responses).length < mentalHealthQuestions.length) {
      return
    }

    const scores = calculateScores(responses)
    const { diagnosis, riskLevel } = determineDiagnosis(scores)

    const newAssessment: MentalHealthAssessment = {
      responses,
      scores,
      diagnosis,
      riskLevel,
      completedAt: new Date()
    }

    setAssessment(newAssessment)
    setCurrentStep('results')
  }

  const getRiskLevelColor = (level: string) => {
    switch (level) {
      case 'low': return 'text-green-600'
      case 'moderate': return 'text-yellow-600'
      case 'high': return 'text-red-600'
      default: return 'text-gray-600'
    }
  }

  const getConditionIcon = (condition: string) => {
    switch (condition) {
      case 'anxiety': return AlertTriangle
      case 'depression': return TrendingDown
      case 'bipolar': return Zap
      case 'ptsd': return Shield
      default: return Brain
    }
  }

  if (currentStep === 'results' && assessment) {
    const primaryDiagnosis = assessment.diagnosis.length > 0 ? assessment.diagnosis[0] : 'normal'
    const recommendation = recommendations[primaryDiagnosis]

    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 py-8">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-50 to-blue-50 p-8 rounded-2xl text-center border border-purple-100">
          <h1 className="text-4xl lg:text-5xl font-bold tracking-tight mb-6" style={{ color: '#000000' }}>
            Your <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">Mental Health Assessment</span>
          </h1>
          <p className="text-lg max-w-3xl mx-auto leading-relaxed" style={{ color: '#000000' }}>
            {assessment.diagnosis.length === 0 
              ? "Great news! Your responses suggest you're managing well mentally."
              : "Based on your responses, here are personalized recommendations for your mental wellness."
            }
          </p>
        </div>

        {/* Assessment Results */}
        <div className="grid md:grid-cols-3 gap-6">
          <Card className="bg-white shadow-lg rounded-xl border border-gray-200">
            <CardHeader className="text-center">
              <CardTitle className="flex items-center justify-center">
                <Brain className="w-6 h-6 mr-2 text-purple-600" />
                Overall Status
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <div className="flex items-center justify-center mb-4">
                {assessment.diagnosis.length === 0 ? (
                  <CheckCircle className="w-16 h-16 text-green-500" />
                ) : (
                  <AlertTriangle className={`w-16 h-16 ${getRiskLevelColor(assessment.riskLevel)}`} />
                )}
              </div>
              <div className="text-2xl font-bold mb-2" style={{ color: '#000000' }}>
                {assessment.diagnosis.length === 0 ? 'Normal' : 'Attention Needed'}
              </div>
              <div className={`text-lg font-semibold ${getRiskLevelColor(assessment.riskLevel)}`}>
                {assessment.riskLevel.charAt(0).toUpperCase() + assessment.riskLevel.slice(1)} Risk Level
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white shadow-lg rounded-xl border border-gray-200">
            <CardHeader className="text-center">
              <CardTitle className="flex items-center justify-center">
                <Calendar className="w-6 h-6 mr-2 text-blue-600" />
                Assessment Date
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <div className="text-2xl font-bold mb-2" style={{ color: '#000000' }}>
                {assessment.completedAt.toLocaleDateString()}
              </div>
              <div className="text-sm text-gray-600">
                {assessment.completedAt.toLocaleTimeString()}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white shadow-lg rounded-xl border border-gray-200">
            <CardHeader className="text-center">
              <CardTitle className="flex items-center justify-center">
                <Heart className="w-6 h-6 mr-2 text-red-600" />
                Conditions Screened
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <div className="text-2xl font-bold mb-2" style={{ color: '#000000' }}>
                {assessment.diagnosis.length || 'None'}
              </div>
              <div className="text-sm text-gray-600">
                {assessment.diagnosis.length === 0 ? 'No concerns identified' : 'Areas needing attention'}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Condition Scores */}
        {assessment.diagnosis.length > 0 && (
          <Card className="bg-white shadow-lg rounded-xl border border-gray-200">
            <CardHeader>
              <CardTitle className="text-2xl" style={{ color: '#000000' }}>
                Detailed Screening Results
              </CardTitle>
              <CardDescription style={{ color: '#000000' }}>
                Your scores for each condition screened
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                {Object.entries(assessment.scores).map(([condition, score]) => {
                  const Icon = getConditionIcon(condition)
                  const isElevated = assessment.diagnosis.includes(condition)
                  
                  return (
                    <div key={condition} className={`p-4 rounded-lg border-2 ${
                      isElevated ? 'border-red-200 bg-red-50' : 'border-gray-200 bg-gray-50'
                    }`}>
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center">
                          <Icon className={`w-5 h-5 mr-2 ${isElevated ? 'text-red-600' : 'text-gray-600'}`} />
                          <span className="font-semibold capitalize" style={{ color: '#000000' }}>
                            {condition}
                          </span>
                        </div>
                        <Badge className={isElevated ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'}>
                          {isElevated ? 'Elevated' : 'Normal'}
                        </Badge>
                      </div>
                      <div className="text-2xl font-bold" style={{ color: '#000000' }}>
                        {Math.round(score)}
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Recommendations */}
        <Card className="bg-white shadow-lg rounded-xl border border-gray-200">
          <CardHeader>
            <CardTitle className="flex items-center text-2xl" style={{ color: '#000000' }}>
              <Lightbulb className="w-8 h-8 mr-3 text-purple-600" />
              {recommendation.title}
            </CardTitle>
            <CardDescription style={{ color: '#000000' }}>
              {recommendation.description}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {/* Self-Help Tips */}
              <div>
                <h3 className="text-lg font-semibold mb-4" style={{ color: '#000000' }}>
                  Self-Help Strategies
                </h3>
                <div className="grid md:grid-cols-2 gap-3">
                  {recommendation.tips.map((tip, index) => (
                    <div key={index} className="flex items-start p-3 bg-purple-50 rounded-lg border border-purple-200">
                      <CheckCircle className="w-5 h-5 text-purple-600 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-sm" style={{ color: '#000000' }}>{tip}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Resources */}
              <div>
                <h3 className="text-lg font-semibold mb-4" style={{ color: '#000000' }}>
                  Helpful Resources
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                  {recommendation.resources.map((resource, index) => (
                    <div key={index} className="p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="font-semibold text-sm" style={{ color: '#000000' }}>
                          {resource.name}
                        </h4>
                        <Badge variant="outline" className="text-xs">
                          {resource.type}
                        </Badge>
                      </div>
                      {resource.phone && (
                        <div className="flex items-center text-sm text-gray-600 mb-2">
                          <Phone className="w-4 h-4 mr-2" />
                          {resource.phone}
                        </div>
                      )}
                      {resource.url && (
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => window.open(resource.url, '_blank')}
                          className="text-xs"
                        >
                          <ExternalLink className="w-3 h-3 mr-1" />
                          Visit
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Important Notice */}
        <Card className="bg-yellow-50 border border-yellow-200 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-start space-x-3">
              <AlertTriangle className="w-6 h-6 text-yellow-600 mt-1" />
              <div>
                <h3 className="font-semibold text-yellow-800 mb-2">Important Notice</h3>
                <p className="text-sm text-yellow-700 leading-relaxed">
                  This assessment is for informational purposes only and is not a substitute for professional medical advice, 
                  diagnosis, or treatment. If you're experiencing severe symptoms or having thoughts of self-harm, 
                  please seek immediate professional help or contact a crisis hotline.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex justify-center space-x-4">
          <Button 
            onClick={() => setCurrentStep('assessment')}
            variant="outline"
            className="border-purple-300 text-purple-700 hover:bg-purple-50"
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Retake Assessment
          </Button>
          <Button className="bg-purple-600 hover:bg-purple-700 text-white">
            <Phone className="w-4 h-4 mr-2" />
            Find Professional Help
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 py-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-50 to-blue-50 p-8 rounded-2xl text-center border border-purple-100">
        <h1 className="text-4xl lg:text-5xl font-bold tracking-tight mb-6" style={{ color: '#000000' }}>
          Mental <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">Health</span>
        </h1>
        <p className="text-lg max-w-3xl mx-auto leading-relaxed" style={{ color: '#000000' }}>
          Take our confidential mental health screening to better understand your emotional well-being.
        </p>
      </div>

      {/* Assessment Form */}
      <Card className="bg-white shadow-lg rounded-xl border border-gray-200">
        <CardHeader>
          <CardTitle className="flex items-center text-2xl" style={{ color: '#000000' }}>
            <User className="w-8 h-8 mr-3 text-purple-600" />
            Mental Health Screening
          </CardTitle>
          <CardDescription style={{ color: '#000000' }}>
            Please answer honestly about how you've been feeling recently. All responses are confidential.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-8">
          {/* Questions */}
          <div className="space-y-6">
            {mentalHealthQuestions.map((question, index) => (
              <div key={question.id} className="space-y-3">
                <label className="block text-sm font-medium text-gray-700">
                  {index + 1}. {question.question}
                </label>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2">
                  {question.options.map((option) => (
                    <button
                      key={option.text}
                      onClick={() => setResponses({...responses, [question.id]: option.score})}
                      className={`p-3 text-sm border rounded-lg transition-all text-left ${
                        responses[question.id] === option.score
                          ? 'bg-purple-600 text-white border-purple-600'
                          : 'bg-white text-gray-700 border-gray-300 hover:border-purple-300 hover:bg-purple-50'
                      }`}
                    >
                      {option.text}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Progress Indicator */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm text-gray-600">
              <span>Assessment Progress</span>
              <span>{Object.keys(responses).length}/{mentalHealthQuestions.length} completed</span>
            </div>
            <Progress 
              value={(Object.keys(responses).length / mentalHealthQuestions.length) * 100} 
              className="h-2"
            />
          </div>

          {/* Submit Button */}
          <div className="flex justify-center">
            <Button 
              onClick={handleAssessmentSubmit}
              disabled={Object.keys(responses).length < mentalHealthQuestions.length}
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 py-3"
            >
              <Brain className="w-5 h-5 mr-2" />
              Get My Mental Health Report
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Mental Health Tips */}
      <div className="grid md:grid-cols-4 gap-6">
        <Card className="bg-white shadow-lg rounded-xl border border-gray-200 text-center">
          <CardContent className="pt-6">
            <Brain className="w-12 h-12 text-purple-500 mx-auto mb-4" />
            <h3 className="font-semibold text-gray-900 mb-2">Anxiety</h3>
            <p className="text-sm text-gray-600">Excessive worry and fear that interferes with daily activities</p>
          </CardContent>
        </Card>
        
        <Card className="bg-white shadow-lg rounded-xl border border-gray-200 text-center">
          <CardContent className="pt-6">
            <TrendingDown className="w-12 h-12 text-blue-500 mx-auto mb-4" />
            <h3 className="font-semibold text-gray-900 mb-2">Depression</h3>
            <p className="text-sm text-gray-600">Persistent sadness and loss of interest in activities</p>
          </CardContent>
        </Card>
        
        <Card className="bg-white shadow-lg rounded-xl border border-gray-200 text-center">
          <CardContent className="pt-6">
            <Zap className="w-12 h-12 text-yellow-500 mx-auto mb-4" />
            <h3 className="font-semibold text-gray-900 mb-2">Bipolar</h3>
            <p className="text-sm text-gray-600">Extreme mood swings between emotional highs and lows</p>
          </CardContent>
        </Card>
        
        <Card className="bg-white shadow-lg rounded-xl border border-gray-200 text-center">
          <CardContent className="pt-6">
            <Shield className="w-12 h-12 text-red-500 mx-auto mb-4" />
            <h3 className="font-semibold text-gray-900 mb-2">PTSD</h3>
            <p className="text-sm text-gray-600">Difficulty recovering after experiencing traumatic events</p>
          </CardContent>
        </Card>
      </div>

      {/* Disclaimer */}
      <Card className="bg-blue-50 border border-blue-200 shadow-lg">
        <CardContent className="p-6">
          <div className="flex items-start space-x-3">
            <AlertTriangle className="w-6 h-6 text-blue-600 mt-1" />
            <div>
              <h3 className="font-semibold text-blue-800 mb-2">Confidential Screening Tool</h3>
              <p className="text-sm text-blue-700 leading-relaxed">
                This screening tool is designed to help you understand your mental health better. It is not a diagnostic tool 
                and cannot replace professional medical advice. If you're in crisis or having thoughts of self-harm, 
                please contact emergency services or a mental health crisis line immediately.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}