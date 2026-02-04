// Core User Types
export interface User {
  id: string;
  email: string;
  name: string;
  profile: UserProfile;
  progress: UserProgress;
  preferences: UserPreferences;
}

export interface UserProfile {
  avatar?: string;
  bio?: string;
  location?: string;
  timezone: string;
  skills: SkillEntry[];
  interests: InterestEntry[];
  careerGoals: string[];
  educationLevel: EducationLevel;
  experienceLevel: ExperienceLevel;
}

export interface UserProgress {
  level: number;
  totalXP: number;
  currentStreak: number;
  longestStreak: number;
  completedMilestones: string[];
  achievements: Achievement[];
  weeklyGoals: WeeklyGoal[];
  lastActivity: Date;
}

export interface UserPreferences {
  theme: 'light' | 'dark';
  notifications: NotificationSettings;
  privacy: PrivacySettings;
  learningStyle: LearningStyle;
  coachingPreferences: CoachingPreferences;
}

// Skill and Interest Types
export interface SkillEntry {
  name: string;
  level: number; // 1-5
  category: string;
}

export interface InterestEntry {
  name: string;
  strength: number; // 1-5
  category: string;
}

// Achievement and Gamification Types
export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  unlockedAt: Date;
  category: AchievementCategory;
}

export interface WeeklyGoal {
  id: string;
  title: string;
  target: number;
  current: number;
  category: string;
  deadline: Date;
}

// Career Assessment Types
export interface CareerAssessment {
  id: string;
  userId: string;
  responses: QuizResponse[];
  results: CareerRecommendation[];
  completedAt: Date;
  version: string;
}

export interface QuizResponse {
  questionId: string;
  answer: string | string[];
  confidence: number;
  timeSpent: number;
}

export interface CareerRecommendation {
  careerPath: string;
  compatibilityScore: number;
  reasoning: string;
  pros: string[];
  cons: string[];
  roadmap: LearningRoadmap;
  marketData: MarketData;
  salaryRange: SalaryRange;
}

export interface LearningRoadmap {
  milestones: Milestone[];
  estimatedDuration: number;
  difficulty: DifficultyLevel;
  prerequisites: string[];
}

export interface Milestone {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  estimatedHours: number;
  resources: Resource[];
}

// Mentor Types
export interface Mentor {
  id: string;
  name: string;
  avatar: string;
  title: string;
  company: string;
  bio: string;
  expertise: ExpertiseArea[];
  availability: AvailabilityStatus;
  rating: number;
  reviewCount: number;
  responseTime: string;
  languages: string[];
  linkedinUrl?: string;
}

export interface MentorMatch {
  mentor: Mentor;
  compatibilityScore: number;
  matchingFactors: string[];
  reasoning: string;
}

export interface ExpertiseArea {
  name: string;
  level: number; // 1-5
  yearsExperience: number;
}

// Study System Types
export interface StudySession {
  id: string;
  userId: string;
  mode: StudyMode;
  topic: string;
  questions: StudyQuestion[];
  performance: SessionPerformance;
  startTime: Date;
  endTime?: Date;
  configuration: SessionConfiguration;
}

export interface StudyQuestion {
  id: string;
  question: string;
  type: QuestionType;
  options?: string[];
  correctAnswer: string;
  explanation: string;
  difficulty: DifficultyLevel;
  category: string;
}

export interface SessionPerformance {
  correctAnswers: number;
  totalAnswers: number;
  averageResponseTime: number;
  knowledgeGaps: string[];
  strengths: string[];
  improvementAreas: string[];
}

export interface SessionConfiguration {
  difficulty: DifficultyLevel;
  duration: number; // in minutes
  questionCount: number;
  adaptiveMode: boolean;
}

// Chat System Types
export interface ChatMessage {
  id: string;
  content: string;
  sender: 'user' | 'ai';
  timestamp: Date;
  emotionalContext?: EmotionalContext;
  coachingMode?: CoachingMode;
}

export interface EmotionalContext {
  sentiment: 'positive' | 'neutral' | 'negative';
  emotions: string[];
  confidence: number;
  urgency: UrgencyLevel;
}

export interface ChatConversation {
  id: string;
  userId: string;
  messages: ChatMessage[];
  startedAt: Date;
  lastMessageAt: Date;
  primaryTopic: string;
  coachingMode: CoachingMode;
}

// Community Types
export interface CommunityPost {
  id: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  content: string;
  type: PostType;
  achievements?: Achievement[];
  milestone?: Milestone;
  reactions: Reaction[];
  comments: Comment[];
  createdAt: Date;
}

export interface Reaction {
  id: string;
  userId: string;
  type: ReactionType;
  createdAt: Date;
}

export interface Comment {
  id: string;
  userId: string;
  userName: string;
  content: string;
  createdAt: Date;
}

// Opportunity Types
export interface Opportunity {
  id: string;
  title: string;
  type: OpportunityType;
  organization: string;
  description: string;
  requirements: string[];
  benefits: string[];
  deadline: Date;
  location?: string;
  remote: boolean;
  relevanceScore: number;
  applicationStatus?: ApplicationStatus;
}

export interface OpportunityApplication {
  id: string;
  opportunityId: string;
  userId: string;
  status: ApplicationStatus;
  appliedAt: Date;
  documents: ApplicationDocument[];
  notes?: string;
}

export interface ApplicationDocument {
  id: string;
  name: string;
  type: DocumentType;
  url: string;
  uploadedAt: Date;
}

// Shared Types and Enums
export type EducationLevel = 'high_school' | 'associate' | 'bachelor' | 'master' | 'phd' | 'other';
export type ExperienceLevel = 'entry' | 'junior' | 'mid' | 'senior' | 'expert';
export type DifficultyLevel = 'beginner' | 'intermediate' | 'advanced' | 'expert';
export type StudyMode = 'study' | 'interview_prep' | 'mock_interview' | 'practice_test';
export type QuestionType = 'multiple_choice' | 'true_false' | 'short_answer' | 'essay' | 'coding';
export type CoachingMode = 'supportive' | 'challenging' | 'analytical' | 'motivational' | 'crisis';
export type UrgencyLevel = 'low' | 'medium' | 'high' | 'critical';
export type AvailabilityStatus = 'available' | 'busy' | 'away' | 'offline';
export type PostType = 'achievement' | 'milestone' | 'question' | 'celebration' | 'resource_share';
export type ReactionType = 'like' | 'celebrate' | 'support' | 'insightful' | 'helpful';
export type OpportunityType = 'scholarship' | 'internship' | 'job' | 'fellowship' | 'grant';
export type ApplicationStatus = 'draft' | 'submitted' | 'under_review' | 'interview' | 'accepted' | 'rejected';
export type DocumentType = 'resume' | 'cover_letter' | 'transcript' | 'portfolio' | 'recommendation';
export type AchievementCategory = 'learning' | 'social' | 'career' | 'milestone' | 'special';
export type LearningStyle = 'visual' | 'auditory' | 'kinesthetic' | 'reading_writing';

// Settings Types
export interface NotificationSettings {
  email: boolean;
  push: boolean;
  achievements: boolean;
  mentorMessages: boolean;
  opportunities: boolean;
  communityActivity: boolean;
}

export interface PrivacySettings {
  profileVisibility: 'public' | 'private' | 'friends_only';
  showProgress: boolean;
  showAchievements: boolean;
  allowMentorRequests: boolean;
}

export interface CoachingPreferences {
  communicationStyle: 'direct' | 'gentle' | 'encouraging' | 'analytical';
  feedbackFrequency: 'immediate' | 'session_end' | 'daily' | 'weekly';
  motivationStyle: 'competitive' | 'collaborative' | 'personal_growth';
}

// Market and Salary Data
export interface MarketData {
  demand: 'low' | 'medium' | 'high' | 'very_high';
  growth: number; // percentage
  jobOpenings: number;
  competitionLevel: 'low' | 'medium' | 'high';
}

export interface SalaryRange {
  min: number;
  max: number;
  median: number;
  currency: string;
  location: string;
}

// Resource Types
export interface Resource {
  id: string;
  title: string;
  type: ResourceType;
  url?: string;
  description: string;
  estimatedTime?: number; // in minutes
  difficulty: DifficultyLevel;
}

export type ResourceType = 'article' | 'video' | 'course' | 'book' | 'tool' | 'practice' | 'documentation';

// API Response Types
export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
  error?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  hasMore: boolean;
}

// Form Types
export interface FormField {
  name: string;
  label: string;
  type: 'text' | 'email' | 'password' | 'select' | 'textarea' | 'checkbox' | 'radio' | 'file';
  required: boolean;
  placeholder?: string;
  options?: { value: string; label: string }[];
  validation?: any; // Zod schema
}

// Analytics Types
export interface AnalyticsData {
  period: 'day' | 'week' | 'month' | 'year';
  metrics: {
    studyTime: number;
    questionsAnswered: number;
    accuracy: number;
    streakDays: number;
    xpGained: number;
  };
  trends: {
    studyTime: TrendData[];
    accuracy: TrendData[];
    engagement: TrendData[];
  };
}

export interface TrendData {
  date: string;
  value: number;
}