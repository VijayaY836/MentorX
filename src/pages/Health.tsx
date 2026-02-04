import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { 
  Heart, 
  Brain, 
  Activity, 
  Shield,
  TrendingUp,
  Users,
  ArrowRight,
  Scale,
  AlertTriangle,
  CheckCircle
} from 'lucide-react'
import { PhysicalHealth } from './PhysicalHealth'
import { MentalHealth } from './MentalHealth'

type HealthSection = 'overview' | 'physical' | 'mental'

export function Health() {
  const [activeSection, setActiveSection] = useState<HealthSection>('overview')

  if (activeSection === 'physical') {
    return <PhysicalHealth />
  }

  if (activeSection === 'mental') {
    return <MentalHealth />
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 py-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-red-50 to-purple-50 p-8 rounded-2xl text-center border border-red-100">
        <h1 className="text-4xl lg:text-5xl font-bold tracking-tight mb-6" style={{ color: '#000000' }}>
          Your <span className="bg-gradient-to-r from-red-600 to-purple-600 bg-clip-text text-transparent">Health Hub</span>
        </h1>
        <p className="text-lg max-w-3xl mx-auto leading-relaxed" style={{ color: '#000000' }}>
          Take control of your physical and mental well-being with comprehensive health assessments and personalized recommendations.
        </p>
      </div>

      {/* Health Overview Cards */}
      <div className="grid md:grid-cols-2 gap-8">
        {/* Physical Health Card */}
        <Card 
          className="bg-gradient-to-br from-green-50 to-blue-50 border border-green-200 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer group"
          onClick={() => setActiveSection('physical')}
        >
          <CardHeader className="text-center pb-4">
            <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
              <Activity className="w-10 h-10 text-white" />
            </div>
            <CardTitle className="text-2xl" style={{ color: '#000000' }}>
              Physical Health
            </CardTitle>
            <CardDescription className="text-lg" style={{ color: '#000000' }}>
              Assess your fitness and get personalized exercise recommendations
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Features List */}
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Scale className="w-5 h-5 text-green-600" />
                <span className="text-sm font-medium" style={{ color: '#000000' }}>BMI Calculator & Health Metrics</span>
              </div>
              <div className="flex items-center space-x-3">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <span className="text-sm font-medium" style={{ color: '#000000' }}>Comprehensive Health Questionnaire</span>
              </div>
              <div className="flex items-center space-x-3">
                <TrendingUp className="w-5 h-5 text-green-600" />
                <span className="text-sm font-medium" style={{ color: '#000000' }}>Personalized Exercise Plans</span>
              </div>
              <div className="flex items-center space-x-3">
                <Heart className="w-5 h-5 text-green-600" />
                <span className="text-sm font-medium" style={{ color: '#000000' }}>Cardio, Strength & Flexibility Training</span>
              </div>
            </div>

            {/* Stats Preview */}
            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-green-200">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">6+</div>
                <div className="text-xs text-gray-600">Exercise Types</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">7</div>
                <div className="text-xs text-gray-600">Health Questions</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">BMI</div>
                <div className="text-xs text-gray-600">Calculator</div>
              </div>
            </div>

            {/* Action Button */}
            <Button 
              className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white group-hover:scale-105 transition-transform duration-300"
              onClick={(e) => {
                e.stopPropagation()
                setActiveSection('physical')
              }}
            >
              Start Physical Assessment
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </CardContent>
        </Card>

        {/* Mental Health Card */}
        <Card 
          className="bg-gradient-to-br from-purple-50 to-blue-50 border border-purple-200 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer group"
          onClick={() => setActiveSection('mental')}
        >
          <CardHeader className="text-center pb-4">
            <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
              <Brain className="w-10 h-10 text-white" />
            </div>
            <CardTitle className="text-2xl" style={{ color: '#000000' }}>
              Mental Health
            </CardTitle>
            <CardDescription className="text-lg" style={{ color: '#000000' }}>
              Screen for mental health conditions and get support resources
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Features List */}
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Brain className="w-5 h-5 text-purple-600" />
                <span className="text-sm font-medium" style={{ color: '#000000' }}>Evidence-Based Mental Health Screening</span>
              </div>
              <div className="flex items-center space-x-3">
                <Shield className="w-5 h-5 text-purple-600" />
                <span className="text-sm font-medium" style={{ color: '#000000' }}>Anxiety, Depression, Bipolar & PTSD</span>
              </div>
              <div className="flex items-center space-x-3">
                <CheckCircle className="w-5 h-5 text-purple-600" />
                <span className="text-sm font-medium" style={{ color: '#000000' }}>Personalized Coping Strategies</span>
              </div>
              <div className="flex items-center space-x-3">
                <Users className="w-5 h-5 text-purple-600" />
                <span className="text-sm font-medium" style={{ color: '#000000' }}>Professional Resources & Support</span>
              </div>
            </div>

            {/* Stats Preview */}
            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-purple-200">
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">4</div>
                <div className="text-xs text-gray-600">Conditions</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">14</div>
                <div className="text-xs text-gray-600">Questions</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-red-600">24/7</div>
                <div className="text-xs text-gray-600">Support</div>
              </div>
            </div>

            {/* Action Button */}
            <Button 
              className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white group-hover:scale-105 transition-transform duration-300"
              onClick={(e) => {
                e.stopPropagation()
                setActiveSection('mental')
              }}
            >
              Start Mental Health Screening
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Health Statistics */}
      <Card className="bg-white shadow-lg rounded-xl border border-gray-200">
        <CardHeader>
          <CardTitle className="flex items-center text-2xl" style={{ color: '#000000' }}>
            <TrendingUp className="w-8 h-8 mr-3 text-red-600" />
            Health & Wellness Statistics
          </CardTitle>
          <CardDescription style={{ color: '#000000' }}>
            Understanding the importance of comprehensive health monitoring
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-4 gap-6">
            <div className="text-center p-6 bg-red-50 rounded-lg border border-red-200">
              <Heart className="w-12 h-12 text-red-500 mx-auto mb-4" />
              <div className="text-3xl font-bold text-red-600 mb-2">655M</div>
              <div className="text-sm text-gray-700">People with heart disease globally</div>
            </div>
            
            <div className="text-center p-6 bg-blue-50 rounded-lg border border-blue-200">
              <Brain className="w-12 h-12 text-blue-500 mx-auto mb-4" />
              <div className="text-3xl font-bold text-blue-600 mb-2">970M</div>
              <div className="text-sm text-gray-700">People with mental health disorders</div>
            </div>
            
            <div className="text-center p-6 bg-green-50 rounded-lg border border-green-200">
              <Activity className="w-12 h-12 text-green-500 mx-auto mb-4" />
              <div className="text-3xl font-bold text-green-600 mb-2">150min</div>
              <div className="text-sm text-gray-700">Recommended weekly exercise</div>
            </div>
            
            <div className="text-center p-6 bg-purple-50 rounded-lg border border-purple-200">
              <Shield className="w-12 h-12 text-purple-500 mx-auto mb-4" />
              <div className="text-3xl font-bold text-purple-600 mb-2">1 in 4</div>
              <div className="text-sm text-gray-700">People affected by mental health</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Health Tips */}
      <div className="grid md:grid-cols-2 gap-8">
        {/* Physical Health Tips */}
        <Card className="bg-gradient-to-br from-green-50 to-blue-50 border border-green-200 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center" style={{ color: '#000000' }}>
              <Activity className="w-6 h-6 mr-2 text-green-600" />
              Physical Wellness Tips
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                <div>
                  <h4 className="font-semibold text-sm" style={{ color: '#000000' }}>Stay Active Daily</h4>
                  <p className="text-xs text-gray-600">Aim for at least 30 minutes of moderate exercise</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                <div>
                  <h4 className="font-semibold text-sm" style={{ color: '#000000' }}>Maintain Healthy Weight</h4>
                  <p className="text-xs text-gray-600">Keep BMI within normal range (18.5-24.9)</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                <div>
                  <h4 className="font-semibold text-sm" style={{ color: '#000000' }}>Get Quality Sleep</h4>
                  <p className="text-xs text-gray-600">7-9 hours of sleep for optimal recovery</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                <div>
                  <h4 className="font-semibold text-sm" style={{ color: '#000000' }}>Stay Hydrated</h4>
                  <p className="text-xs text-gray-600">Drink 8-10 glasses of water daily</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Mental Health Tips */}
        <Card className="bg-gradient-to-br from-purple-50 to-blue-50 border border-purple-200 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center" style={{ color: '#000000' }}>
              <Brain className="w-6 h-6 mr-2 text-purple-600" />
              Mental Wellness Tips
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
                <div>
                  <h4 className="font-semibold text-sm" style={{ color: '#000000' }}>Practice Mindfulness</h4>
                  <p className="text-xs text-gray-600">Spend 10 minutes daily in meditation or deep breathing</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                <div>
                  <h4 className="font-semibold text-sm" style={{ color: '#000000' }}>Stay Connected</h4>
                  <p className="text-xs text-gray-600">Maintain social relationships and seek support</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
                <div>
                  <h4 className="font-semibold text-sm" style={{ color: '#000000' }}>Manage Stress</h4>
                  <p className="text-xs text-gray-600">Use healthy coping strategies and relaxation techniques</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                <div>
                  <h4 className="font-semibold text-sm" style={{ color: '#000000' }}>Seek Help When Needed</h4>
                  <p className="text-xs text-gray-600">Don't hesitate to reach out to professionals</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Emergency Resources */}
      <Card className="bg-red-50 border border-red-200 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center text-red-800">
            <AlertTriangle className="w-6 h-6 mr-2" />
            Emergency Resources
          </CardTitle>
          <CardDescription className="text-red-700">
            If you're experiencing a medical or mental health emergency, seek immediate help
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center p-4 bg-white rounded-lg border border-red-200">
              <div className="text-2xl font-bold text-red-600 mb-2">911</div>
              <div className="text-sm text-gray-700">Medical Emergency</div>
            </div>
            <div className="text-center p-4 bg-white rounded-lg border border-red-200">
              <div className="text-2xl font-bold text-red-600 mb-2">988</div>
              <div className="text-sm text-gray-700">Suicide Prevention Lifeline</div>
            </div>
            <div className="text-center p-4 bg-white rounded-lg border border-red-200">
              <div className="text-xl font-bold text-red-600 mb-2">741741</div>
              <div className="text-sm text-gray-700">Crisis Text Line (Text HOME)</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="flex justify-center space-x-6">
        <Button 
          onClick={() => setActiveSection('physical')}
          className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white px-8 py-3"
        >
          <Activity className="w-5 h-5 mr-2" />
          Physical Health Assessment
        </Button>
        <Button 
          onClick={() => setActiveSection('mental')}
          className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 py-3"
        >
          <Brain className="w-5 h-5 mr-2" />
          Mental Health Screening
        </Button>
      </div>
    </div>
  )
}