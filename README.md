# MentorX - AI-Powered Adaptive Learning & Mentorship Platform

🏆 **Hackathon Winner** - An intelligent platform revolutionizing student success through AI-driven guidance, mentorship, and personalized learning.

## 🌟 Overview

MentorX is a comprehensive educational platform that combines AI-powered career guidance, smart mentor matching, adaptive learning, health monitoring, and community collaboration to provide students with a complete success ecosystem.

## ✨ Key Features

### 🤖 AI-Powered Career Guidance
- Interactive 8-question assessment with trait mapping algorithms
- Personalized roadmaps across 8 career paths with milestone tracking
- Requirements-based matching with detailed learning resources

### 🧠 Smart Mentor Matching
- RAG-like algorithm with multi-factor scoring (expertise, experience, availability)
- LinkedIn integration for professional networking
- Real-time mentor discovery and connection

### 📚 Adaptive Study Buddy
- Dynamic difficulty adjustment based on performance patterns
- Mock interviews with real LeetCode problems (Easy/Medium/Hard)
- Split-screen coding environment with property-based testing
- Comprehensive assessment reporting with personalized recommendations

### 💬 Intelligent AI Chat
- Sentiment analysis engine detecting 4 emotions (Enthusiastic, Confused, Neutral, Disinterested)
- RAG implementation across 50+ curated knowledge entries
- Contextual response generation with mode-specific coaching styles
- Integrated resource links and learning materials

### 🏥 Health & Wellness Monitoring
- **Mental Health**: Evidence-based screening for Anxiety, Depression, Bipolar, and PTSD with clinical thresholds
- **Physical Health**: BMI calculations, health assessments, and personalized exercise recommendations
- Integrated wellness approach supporting overall academic performance

### 🌐 Community Platform
- Real-time post creation with 6 categories (Academic, Career, Projects, Resources, Health, General)
- Senior Resource Corner for knowledge sharing between seniors and juniors
- Peer collaboration features and community-driven learning

### 🎯 Opportunity Matching
- Multi-source data aggregation with intelligent caching
- Real-time job/internship discovery and matching
- Requirements-based filtering algorithms

## 🛠️ Technology Stack

### Frontend
- **React 18.3.1** - Modern React with latest features
- **TypeScript** - Type-safe development
- **Vite** - Lightning-fast build tool with HMR
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - Beautiful, accessible UI components

### AI/ML Features
- Custom sentiment analysis algorithms
- RAG (Retrieval-Augmented Generation) implementation
- Adaptive learning algorithms with performance tracking
- Multi-factor matching systems

### Architecture
- Component-based design with TypeScript interfaces
- Custom hooks for state management and localStorage persistence
- Modular service architecture for AI, data, and business logic
- Responsive design with mobile-first approach

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd mentorx-platform

# Install dependencies
npm install

# Start development server
npm run dev
```

### Build for Production

```bash
# Create production build
npm run build

# Preview production build
npm run preview
```

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ui/             # shadcn/ui components
│   └── ...             # Custom components
├── pages/              # Main application pages
├── services/           # AI services and business logic
│   ├── aiServices.ts   # Sentiment analysis & career matching
│   ├── knowledgeBase.ts # RAG implementation
│   ├── studyAIService.ts # Adaptive learning algorithms
│   └── ...
├── hooks/              # Custom React hooks
├── types/              # TypeScript type definitions
└── utils/              # Utility functions
```

## 🎯 Core Algorithms

### Sentiment Analysis
- Keyword-based emotion detection with context awareness
- 4-emotion classification with confidence scoring
- Mode-specific response generation (Supportive, Motivational, Creative, Goal-focused)

### Adaptive Learning
- Performance-based difficulty adjustment
- Consecutive success tracking for progression
- Comprehensive assessment with personalized recommendations

### Mentor Matching
- Multi-criteria scoring algorithm
- Expertise level matching with experience weighting
- Availability and rating-based optimization

## 🌐 Deployment

### Vercel (Recommended)
```bash
npm run build
# Push to GitHub and connect to Vercel
```

### Netlify
```bash
npm run build
# Upload dist/ folder to Netlify
```

### Manual Deployment
```bash
npm run build
# Upload dist/ folder to any static hosting service
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🏆 Acknowledgments

- Built during a hackathon with focus on student success and AI innovation
- Inspired by the need for comprehensive, intelligent educational platforms
- Thanks to the open-source community for the amazing tools and libraries

---

**MentorX** - Empowering every student with AI-driven personalized guidance for academic, career, and personal success.
