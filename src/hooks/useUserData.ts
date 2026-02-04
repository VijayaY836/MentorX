import { useLocalStorage } from './useLocalStorage'
import type { User } from '@/types'
import { mockUser, STORAGE_KEYS } from '@/services/mockData'

export function useUserData() {
  const [user, setUser] = useLocalStorage<User>(STORAGE_KEYS.USER_PROFILE, mockUser)

  const updateProfile = (updates: Partial<User['profile']>) => {
    setUser(prev => ({
      ...prev,
      profile: { ...prev.profile, ...updates }
    }))
  }

  const updateProgress = (updates: Partial<User['progress']>) => {
    setUser(prev => ({
      ...prev,
      progress: { ...prev.progress, ...updates }
    }))
  }

  const addXP = (amount: number) => {
    setUser(prev => {
      const newXP = prev.progress.totalXP + amount
      const newLevel = Math.floor(newXP / 100) + 1
      
      return {
        ...prev,
        progress: {
          ...prev.progress,
          totalXP: newXP,
          level: newLevel,
          lastActivity: new Date()
        }
      }
    })
  }

  const updateStreak = () => {
    const today = new Date().toDateString()
    const lastActivity = new Date(user.progress.lastActivity).toDateString()
    
    if (today !== lastActivity) {
      const yesterday = new Date()
      yesterday.setDate(yesterday.getDate() - 1)
      const wasYesterday = yesterday.toDateString() === lastActivity
      
      setUser(prev => ({
        ...prev,
        progress: {
          ...prev.progress,
          currentStreak: wasYesterday ? prev.progress.currentStreak + 1 : 1,
          longestStreak: Math.max(
            prev.progress.longestStreak, 
            wasYesterday ? prev.progress.currentStreak + 1 : 1
          ),
          lastActivity: new Date()
        }
      }))
    }
  }

  const addAchievement = (achievement: User['progress']['achievements'][0]) => {
    setUser(prev => ({
      ...prev,
      progress: {
        ...prev.progress,
        achievements: [...prev.progress.achievements, achievement]
      }
    }))
  }

  return {
    user,
    updateProfile,
    updateProgress,
    addXP,
    updateStreak,
    addAchievement
  }
}