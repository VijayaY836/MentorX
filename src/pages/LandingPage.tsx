import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  GraduationCap, 
  Users, 
  BookOpen, 
  MessageCircle, 
  TrendingUp, 
  Award,
  ArrowRight,
  Sparkles
} from 'lucide-react'

const features = [
  {
    icon: GraduationCap,
    title: 'AI Career Guidance',
    description: 'Get personalized career recommendations based on your interests, skills, and goals with our advanced AI assessment.',
    color: 'bg-blue-500'
  },
  {
    icon: Users,
    title: 'Smart Mentor Matching',
    description: 'Connect with industry experts through our AI-powered compatibility scoring and intelligent matching system.',
    color: 'bg-green-500'
  },
  {
    icon: BookOpen,
    title: 'Adaptive Study Buddy',
    description: 'Prepare for interviews and exams with personalized practice sessions that adapt to your learning pace.',
    color: 'bg-purple-500'
  },
  {
    icon: MessageCircle,
    title: 'Emotion-Aware AI Chat',
    description: 'Get empathetic coaching and support from our AI that understands your emotional context and needs.',
    color: 'bg-pink-500'
  },
  {
    icon: TrendingUp,
    title: 'Progress Analytics',
    description: 'Track your learning journey with detailed analytics, XP points, achievements, and personalized insights.',
    color: 'bg-orange-500'
  },
  {
    icon: Award,
    title: 'Opportunity Matching',
    description: 'Discover scholarships, internships, and career opportunities matched to your profile and aspirations.',
    color: 'bg-indigo-500'
  }
]

const stats = [
  { label: 'Active Learners', value: '10,000+' },
  { label: 'Expert Mentors', value: '500+' },
  { label: 'Career Paths', value: '100+' },
  { label: 'Success Rate', value: '94%' }
]

export function LandingPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-primary/10" />
        <div className="relative container mx-auto px-4 text-center">
          <Badge variant="secondary" className="mb-6 bg-primary/10 text-primary">
            <Sparkles className="w-3 h-3 mr-1" />
            AI-Powered Learning Platform
          </Badge>
          
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
            Your AI-Powered Path to
            <span className="text-primary block">All Round Well-Being</span>
          </h1>
          
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
            MentorX combines advanced AI with personalized mentorship to guide you through your educational 
            and career journey. Get matched with expert mentors, receive adaptive study assistance, and 
            discover opportunities tailored to your unique goals.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button asChild size="lg" className="text-lg px-8 py-6">
              <Link to="/dashboard">
                Get Started Free
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" className="text-lg px-8 py-6">
              <Link to="/career-guidance">
                Take Career Quiz
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white/50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-primary mb-2">
                  {stat.value}
                </div>
                <div className="text-muted-foreground font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Everything You Need to Succeed
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Our comprehensive platform provides all the tools and guidance you need 
              to achieve your educational and career goals.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon
              return (
                <Card key={index} className="glass-card hover:shadow-lg transition-smooth border-orange-100/50">
                  <CardHeader>
                    <div className={`w-12 h-12 ${feature.color} rounded-lg flex items-center justify-center mb-4`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base leading-relaxed">
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Ready to Transform Your Future?
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join thousands of learners who are already using MentorX to achieve their dreams. 
            Start your personalized learning journey today.
          </p>
          <Button asChild size="lg" className="text-lg px-8 py-6">
            <Link to="/dashboard">
              Start Your Journey
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  )
}