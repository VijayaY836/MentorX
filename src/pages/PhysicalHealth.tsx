import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { 
  Heart, 
  Activity, 
  Target, 
  TrendingUp,
  Scale,
  Ruler,
  AlertCircle,
  CheckCircle,
  Play,
  Clock,
  Flame,
  Trophy,
  User,
  Calendar
} from 'lucide-react'

interface HealthAssessment {
  height: number // in cm
  weight: number // in kg
  bmi: number
  bmiCategory: string
  responses: Record<string, string>
  completedAt: Date
}

interface Exercise {
  id: string
  name: string
  type: 'cardio' | 'strength' | 'flexibility' | 'balance'
  duration: string
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  description: string
  benefits: string[]
  instructions: string[]
  equipment: string
}

const healthQuestions = [
  {
    id: 'headaches',
    question: 'Do you experience frequent headaches?',
    options: ['Never', 'Rarely', 'Sometimes', 'Often', 'Very Often']
  },
  {
    id: 'shortness_breath',
    question: 'Do you get exhausted when running short distances?',
    options: ['Never', 'Rarely', 'Sometimes', 'Often', 'Always']
  },
  {
    id: 'sleep_quality',
    question: 'How would you rate your sleep quality?',
    options: ['Excellent', 'Good', 'Fair', 'Poor', 'Very Poor']
  },
  {
    id: 'energy_levels',
    question: 'How are your daily energy levels?',
    options: ['Very High', 'High', 'Moderate', 'Low', 'Very Low']
  },
  {
    id: 'exercise_frequency',
    question: 'How often do you currently exercise?',
    options: ['Daily', '4-6 times/week', '2-3 times/week', 'Once a week', 'Never']
  },
  {
    id: 'health_conditions',
    question: 'Do you have any chronic health conditions?',
    options: ['None', 'Diabetes', 'Hypertension', 'Heart Disease', 'Other']
  },
  {
    id: 'stress_levels',
    question: 'How would you rate your stress levels?',
    options: ['Very Low', 'Low', 'Moderate', 'High', 'Very High']
  }
]

const exerciseDatabase: Exercise[] = [
  // Cardio Exercises
  {
    id: 'walking',
    name: 'Brisk Walking',
    type: 'cardio',
    duration: '20-30 minutes',
    difficulty: 'beginner',
    description: 'Low-impact cardiovascular exercise perfect for beginners',
    benefits: ['Improves heart health', 'Burns calories', 'Reduces stress', 'Easy on joints'],
    instructions: [
      'Start with a 5-minute warm-up at normal pace',
      'Increase to brisk walking pace',
      'Maintain steady rhythm for 15-20 minutes',
      'Cool down with 5 minutes of slow walking'
    ],
    equipment: 'Comfortable walking shoes'
  },
  {
    id: 'jogging',
    name: 'Light Jogging',
    type: 'cardio',
    duration: '15-25 minutes',
    difficulty: 'intermediate',
    description: 'Moderate-intensity running for cardiovascular fitness',
    benefits: ['Strengthens heart', 'Improves endurance', 'Burns fat', 'Boosts mood'],
    instructions: [
      'Warm up with 5 minutes of walking',
      'Start jogging at comfortable pace',
      'Maintain steady breathing',
      'Cool down with walking and stretching'
    ],
    equipment: 'Running shoes, comfortable clothing'
  },
  {
    id: 'cycling',
    name: 'Stationary Cycling',
    type: 'cardio',
    duration: '20-40 minutes',
    difficulty: 'beginner',
    description: 'Low-impact cardio exercise that\'s easy on joints',
    benefits: ['Builds leg strength', 'Improves cardiovascular health', 'Low joint impact'],
    instructions: [
      'Adjust seat height properly',
      'Start with low resistance',
      'Gradually increase intensity',
      'Maintain steady pedaling rhythm'
    ],
    equipment: 'Stationary bike or regular bicycle'
  },
  // Strength Exercises
  {
    id: 'bodyweight_squats',
    name: 'Bodyweight Squats',
    type: 'strength',
    duration: '10-15 minutes',
    difficulty: 'beginner',
    description: 'Fundamental lower body strengthening exercise',
    benefits: ['Strengthens legs and glutes', 'Improves functional movement', 'No equipment needed'],
    instructions: [
      'Stand with feet shoulder-width apart',
      'Lower body as if sitting in chair',
      'Keep chest up and knees behind toes',
      'Return to standing position'
    ],
    equipment: 'None required'
  },
  {
    id: 'push_ups',
    name: 'Modified Push-ups',
    type: 'strength',
    duration: '10-15 minutes',
    difficulty: 'beginner',
    description: 'Upper body strengthening exercise with modifications',
    benefits: ['Builds chest and arm strength', 'Improves core stability', 'Scalable difficulty'],
    instructions: [
      'Start on knees or against wall',
      'Keep body in straight line',
      'Lower chest toward ground',
      'Push back to starting position'
    ],
    equipment: 'None required'
  },
  // Flexibility Exercises
  {
    id: 'yoga_stretching',
    name: 'Basic Yoga Stretches',
    type: 'flexibility',
    duration: '15-20 minutes',
    difficulty: 'beginner',
    description: 'Gentle stretching routine to improve flexibility',
    benefits: ['Increases flexibility', 'Reduces muscle tension', 'Improves balance', 'Promotes relaxation'],
    instructions: [
      'Start with gentle neck rolls',
      'Move through basic poses slowly',
      'Hold each stretch for 15-30 seconds',
      'Focus on breathing deeply'
    ],
    equipment: 'Yoga mat (optional)'
  },
  {
    id: 'desk_stretches',
    name: 'Desk Stretches',
    type: 'flexibility',
    duration: '5-10 minutes',
    difficulty: 'beginner',
    description: 'Quick stretches for people who sit at desks',
    benefits: ['Relieves neck tension', 'Improves posture', 'Reduces back pain', 'Can be done anywhere'],
    instructions: [
      'Neck rolls and shoulder shrugs',
      'Seated spinal twists',
      'Chest and hip flexor stretches',
      'Ankle circles and calf raises'
    ],
    equipment: 'Chair'
  }
]

export function PhysicalHealth() {
  const [currentStep, setCurrentStep] = useState<'assessment' | 'results'>('assessment')
  const [height, setHeight] = useState('')
  const [weight, setWeight] = useState('')
  const [responses, setResponses] = useState<Record<string, string>>({})
  const [assessment, setAssessment] = useState<HealthAssessment | null>(null)
  const [recommendedExercises, setRecommendedExercises] = useState<Exercise[]>([])

  const calculateBMI = (heightCm: number, weightKg: number): { bmi: number; category: string } => {
    const heightM = heightCm / 100
    const bmi = weightKg / (heightM * heightM)
    
    let category = ''
    if (bmi < 18.5) category = 'Underweight'
    else if (bmi < 25) category = 'Normal'
    else if (bmi < 30) category = 'Overweight'
    else category = 'Obese'
    
    return { bmi: Math.round(bmi * 10) / 10, category }
  }

  const generateExerciseRecommendations = (assessment: HealthAssessment): Exercise[] => {
    const { bmi, bmiCategory, responses } = assessment
    let recommendations: Exercise[] = []
    
    // Base recommendations on BMI and fitness level
    const exerciseFreq = responses.exercise_frequency
    const energyLevel = responses.energy_levels
    const breathIssues = responses.shortness_breath
    const healthConditions = responses.health_conditions
    
    // Always include basic flexibility
    recommendations.push(exerciseDatabase.find(e => e.id === 'desk_stretches')!)
    recommendations.push(exerciseDatabase.find(e => e.id === 'yoga_stretching')!)
    
    // Cardio recommendations based on fitness level and health
    if (breathIssues === 'Never' || breathIssues === 'Rarely') {
      if (exerciseFreq === 'Daily' || exerciseFreq === '4-6 times/week') {
        recommendations.push(exerciseDatabase.find(e => e.id === 'jogging')!)
      } else {
        recommendations.push(exerciseDatabase.find(e => e.id === 'walking')!)
      }
    } else {
      recommendations.push(exerciseDatabase.find(e => e.id === 'walking')!)
    }
    
    // Add cycling for joint-friendly cardio
    recommendations.push(exerciseDatabase.find(e => e.id === 'cycling')!)
    
    // Strength training based on fitness level
    if (healthConditions === 'None' || healthConditions === 'Other') {
      recommendations.push(exerciseDatabase.find(e => e.id === 'bodyweight_squats')!)
      recommendations.push(exerciseDatabase.find(e => e.id === 'push_ups')!)
    }
    
    return recommendations.filter(Boolean)
  }

  const handleAssessmentSubmit = () => {
    if (!height || !weight || Object.keys(responses).length < healthQuestions.length) {
      return
    }
    
    const heightNum = parseFloat(height)
    const weightNum = parseFloat(weight)
    const { bmi, category } = calculateBMI(heightNum, weightNum)
    
    const newAssessment: HealthAssessment = {
      height: heightNum,
      weight: weightNum,
      bmi,
      bmiCategory: category,
      responses,
      completedAt: new Date()
    }
    
    setAssessment(newAssessment)
    setRecommendedExercises(generateExerciseRecommendations(newAssessment))
    setCurrentStep('results')
  }

  const getBMIColor = (category: string) => {
    switch (category) {
      case 'Underweight': return 'text-blue-600'
      case 'Normal': return 'text-green-600'
      case 'Overweight': return 'text-yellow-600'
      case 'Obese': return 'text-red-600'
      default: return 'text-gray-600'
    }
  }

  const getExerciseTypeColor = (type: string) => {
    switch (type) {
      case 'cardio': return 'bg-red-100 text-red-800'
      case 'strength': return 'bg-blue-100 text-blue-800'
      case 'flexibility': return 'bg-green-100 text-green-800'
      case 'balance': return 'bg-purple-100 text-purple-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'bg-green-500'
      case 'intermediate': return 'bg-yellow-500'
      case 'advanced': return 'bg-red-500'
      default: return 'bg-gray-500'
    }
  }

  if (currentStep === 'results' && assessment) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 py-8">
        {/* Header */}
        <div className="bg-gradient-to-r from-green-50 to-blue-50 p-8 rounded-2xl text-center border border-green-100">
          <h1 className="text-4xl lg:text-5xl font-bold tracking-tight mb-6" style={{ color: '#000000' }}>
            Your <span className="bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">Health Assessment</span>
          </h1>
          <p className="text-lg max-w-3xl mx-auto leading-relaxed" style={{ color: '#000000' }}>
            Based on your assessment, here are personalized exercise recommendations for your wellness journey.
          </p>
        </div>

        {/* Health Metrics */}
        <div className="grid md:grid-cols-3 gap-6">
          <Card className="bg-white shadow-lg rounded-xl border border-gray-200">
            <CardHeader className="text-center">
              <CardTitle className="flex items-center justify-center">
                <Scale className="w-6 h-6 mr-2 text-blue-600" />
                BMI Score
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <div className="text-4xl font-bold mb-2" style={{ color: '#000000' }}>
                {assessment.bmi}
              </div>
              <div className={`text-lg font-semibold ${getBMIColor(assessment.bmiCategory)}`}>
                {assessment.bmiCategory}
              </div>
              <div className="text-sm text-gray-600 mt-2">
                Height: {assessment.height}cm | Weight: {assessment.weight}kg
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white shadow-lg rounded-xl border border-gray-200">
            <CardHeader className="text-center">
              <CardTitle className="flex items-center justify-center">
                <Target className="w-6 h-6 mr-2 text-green-600" />
                Fitness Level
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <div className="text-2xl font-bold mb-2" style={{ color: '#000000' }}>
                {assessment.responses.exercise_frequency === 'Daily' ? 'High' :
                 assessment.responses.exercise_frequency === '4-6 times/week' ? 'Good' :
                 assessment.responses.exercise_frequency === '2-3 times/week' ? 'Moderate' : 'Beginner'}
              </div>
              <div className="text-sm text-gray-600">
                Current: {assessment.responses.exercise_frequency}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white shadow-lg rounded-xl border border-gray-200">
            <CardHeader className="text-center">
              <CardTitle className="flex items-center justify-center">
                <Heart className="w-6 h-6 mr-2 text-red-600" />
                Health Status
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <div className="flex items-center justify-center mb-2">
                {assessment.responses.health_conditions === 'None' ? (
                  <CheckCircle className="w-8 h-8 text-green-500" />
                ) : (
                  <AlertCircle className="w-8 h-8 text-yellow-500" />
                )}
              </div>
              <div className="text-sm text-gray-600">
                {assessment.responses.health_conditions === 'None' ? 'No conditions reported' : assessment.responses.health_conditions}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Exercise Recommendations */}
        <Card className="bg-white shadow-lg rounded-xl border border-gray-200">
          <CardHeader>
            <CardTitle className="flex items-center text-2xl" style={{ color: '#000000' }}>
              <Activity className="w-8 h-8 mr-3 text-green-600" />
              Recommended Exercises
            </CardTitle>
            <CardDescription style={{ color: '#000000' }}>
              Personalized workout plan based on your health assessment
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              {recommendedExercises.map((exercise) => (
                <Card key={exercise.id} className="border border-gray-200 hover:shadow-md transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-lg" style={{ color: '#000000' }}>{exercise.name}</CardTitle>
                        <div className="flex items-center space-x-2 mt-2">
                          <Badge className={getExerciseTypeColor(exercise.type)}>
                            {exercise.type}
                          </Badge>
                          <div className="flex items-center">
                            <div className={`w-2 h-2 rounded-full ${getDifficultyColor(exercise.difficulty)} mr-1`}></div>
                            <span className="text-xs text-gray-600 capitalize">{exercise.difficulty}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <Clock className="w-4 h-4 mr-1" />
                        {exercise.duration}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-700 mb-4">{exercise.description}</p>
                    
                    <div className="space-y-3">
                      <div>
                        <h4 className="font-semibold text-sm text-gray-900 mb-2">Benefits:</h4>
                        <div className="flex flex-wrap gap-1">
                          {exercise.benefits.map((benefit, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {benefit}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="font-semibold text-sm text-gray-900 mb-2">Instructions:</h4>
                        <ol className="text-xs text-gray-600 space-y-1">
                          {exercise.instructions.map((instruction, index) => (
                            <li key={index} className="flex items-start">
                              <span className="mr-2">{index + 1}.</span>
                              <span>{instruction}</span>
                            </li>
                          ))}
                        </ol>
                      </div>
                      
                      <div className="flex items-center justify-between pt-2">
                        <div className="text-xs text-gray-600">
                          <strong>Equipment:</strong> {exercise.equipment}
                        </div>
                        <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white">
                          <Play className="w-3 h-3 mr-1" />
                          Start
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex justify-center space-x-4">
          <Button 
            onClick={() => setCurrentStep('assessment')}
            variant="outline"
            className="border-green-300 text-green-700 hover:bg-green-50"
          >
            Retake Assessment
          </Button>
          <Button className="bg-green-600 hover:bg-green-700 text-white">
            <Trophy className="w-4 h-4 mr-2" />
            Start Workout Plan
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 py-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-50 to-blue-50 p-8 rounded-2xl text-center border border-green-100">
        <h1 className="text-4xl lg:text-5xl font-bold tracking-tight mb-6" style={{ color: '#000000' }}>
          Physical <span className="bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">Health</span>
        </h1>
        <p className="text-lg max-w-3xl mx-auto leading-relaxed" style={{ color: '#000000' }}>
          Take our comprehensive health assessment to receive personalized exercise recommendations.
        </p>
      </div>

      {/* Assessment Form */}
      <Card className="bg-white shadow-lg rounded-xl border border-gray-200">
        <CardHeader>
          <CardTitle className="flex items-center text-2xl" style={{ color: '#000000' }}>
            <User className="w-8 h-8 mr-3 text-green-600" />
            Health Assessment
          </CardTitle>
          <CardDescription style={{ color: '#000000' }}>
            Please provide your basic information and answer a few health questions
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-8">
          {/* Basic Measurements */}
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Height (cm) *
              </label>
              <div className="relative">
                <Ruler className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="number"
                  value={height}
                  onChange={(e) => setHeight(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="170"
                  min="100"
                  max="250"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Weight (kg) *
              </label>
              <div className="relative">
                <Scale className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="number"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="70"
                  min="30"
                  max="200"
                />
              </div>
            </div>
          </div>

          {/* BMI Preview */}
          {height && weight && (
            <div className="p-4 bg-green-50 rounded-lg border border-green-200">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-semibold text-gray-900">BMI Preview</h4>
                  <p className="text-sm text-gray-600">Based on your height and weight</p>
                </div>
                <div className="text-right">
                  {(() => {
                    const { bmi, category } = calculateBMI(parseFloat(height), parseFloat(weight))
                    return (
                      <>
                        <div className="text-2xl font-bold text-gray-900">{bmi}</div>
                        <div className={`text-sm font-semibold ${getBMIColor(category)}`}>{category}</div>
                      </>
                    )
                  })()}
                </div>
              </div>
            </div>
          )}

          {/* Health Questions */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900">Health Questions</h3>
            {healthQuestions.map((question) => (
              <div key={question.id} className="space-y-3">
                <label className="block text-sm font-medium text-gray-700">
                  {question.question} *
                </label>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
                  {question.options.map((option) => (
                    <button
                      key={option}
                      onClick={() => setResponses({...responses, [question.id]: option})}
                      className={`p-3 text-sm border rounded-lg transition-all ${
                        responses[question.id] === option
                          ? 'bg-green-600 text-white border-green-600'
                          : 'bg-white text-gray-700 border-gray-300 hover:border-green-300 hover:bg-green-50'
                      }`}
                    >
                      {option}
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
              <span>{Object.keys(responses).length}/{healthQuestions.length} completed</span>
            </div>
            <Progress 
              value={(Object.keys(responses).length / healthQuestions.length) * 100} 
              className="h-2"
            />
          </div>

          {/* Submit Button */}
          <div className="flex justify-center">
            <Button 
              onClick={handleAssessmentSubmit}
              disabled={!height || !weight || Object.keys(responses).length < healthQuestions.length}
              className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white px-8 py-3"
            >
              <Activity className="w-5 h-5 mr-2" />
              Get My Exercise Plan
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Health Tips */}
      <div className="grid md:grid-cols-3 gap-6">
        <Card className="bg-white shadow-lg rounded-xl border border-gray-200 text-center">
          <CardContent className="pt-6">
            <Heart className="w-12 h-12 text-red-500 mx-auto mb-4" />
            <h3 className="font-semibold text-gray-900 mb-2">Cardiovascular Health</h3>
            <p className="text-sm text-gray-600">Regular cardio exercise strengthens your heart and improves circulation</p>
          </CardContent>
        </Card>
        
        <Card className="bg-white shadow-lg rounded-xl border border-gray-200 text-center">
          <CardContent className="pt-6">
            <Flame className="w-12 h-12 text-orange-500 mx-auto mb-4" />
            <h3 className="font-semibold text-gray-900 mb-2">Strength Training</h3>
            <p className="text-sm text-gray-600">Build muscle mass and bone density with regular strength exercises</p>
          </CardContent>
        </Card>
        
        <Card className="bg-white shadow-lg rounded-xl border border-gray-200 text-center">
          <CardContent className="pt-6">
            <TrendingUp className="w-12 h-12 text-green-500 mx-auto mb-4" />
            <h3 className="font-semibold text-gray-900 mb-2">Flexibility</h3>
            <p className="text-sm text-gray-600">Maintain mobility and prevent injury with stretching and flexibility work</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}