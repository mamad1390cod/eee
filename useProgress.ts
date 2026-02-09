import { useState, useEffect, useCallback } from 'react';
import { courseData } from '@/data/courseData';

export interface DayProgress {
  completed: boolean;
  vocabularyScore: number;
  sentenceScore: number;
  exerciseScore: number;
  pronunciationScore: number;
}

export interface MonthProgress {
  unlocked: boolean;
  days: { [day: number]: DayProgress };
  examScore: number;
  examCompleted: boolean;
}

export interface UserProgress {
  currentMonth: number;
  currentDay: number;
  months: { [month: number]: MonthProgress };
  weaknesses: {
    vocabulary: string[];
    sentences: string[];
    pronunciation: string[];
  };
  totalScore: number;
}

const STORAGE_KEY = 'english_learning_progress';

const defaultProgress: UserProgress = {
  currentMonth: 1,
  currentDay: 1,
  months: {
    1: {
      unlocked: true,
      days: {},
      examScore: 0,
      examCompleted: false
    },
    2: {
      unlocked: false,
      days: {},
      examScore: 0,
      examCompleted: false
    },
    3: {
      unlocked: false,
      days: {},
      examScore: 0,
      examCompleted: false
    },
    4: {
      unlocked: false,
      days: {},
      examScore: 0,
      examCompleted: false
    },
    5: {
      unlocked: false,
      days: {},
      examScore: 0,
      examCompleted: false
    }
  },
  weaknesses: {
    vocabulary: [],
    sentences: [],
    pronunciation: []
  },
  totalScore: 0
};

export function useProgress() {
  const [progress, setProgress] = useState<UserProgress>(defaultProgress);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load progress from localStorage
  useEffect(() => {
    const savedProgress = localStorage.getItem(STORAGE_KEY);
    if (savedProgress) {
      try {
        const parsed = JSON.parse(savedProgress);
        setProgress({ ...defaultProgress, ...parsed });
      } catch (e) {
        console.error('Failed to parse progress:', e);
        setProgress(defaultProgress);
      }
    }
    setIsLoaded(true);
  }, []);

  // Save progress to localStorage
  const saveProgress = useCallback((newProgress: UserProgress) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newProgress));
    setProgress(newProgress);
  }, []);

  // Complete a day's lesson
  const completeDay = useCallback((
    month: number,
    day: number,
    scores: Partial<DayProgress>
  ) => {
    setProgress(prev => {
      const newProgress = { ...prev };
      if (!newProgress.months[month].days[day]) {
        newProgress.months[month].days[day] = {
          completed: false,
          vocabularyScore: 0,
          sentenceScore: 0,
          exerciseScore: 0,
          pronunciationScore: 0
        };
      }
      
      newProgress.months[month].days[day] = {
        ...newProgress.months[month].days[day],
        ...scores,
        completed: true
      };

      // Update current position
      if (day < 25) {
        newProgress.currentDay = day + 1;
      } else {
        newProgress.currentDay = 26; // Go to exam
      }

      // Calculate total score
      let total = 0;
      Object.values(newProgress.months).forEach(m => {
        Object.values(m.days).forEach(d => {
          total += d.vocabularyScore + d.sentenceScore + d.exerciseScore + d.pronunciationScore;
        });
        total += m.examScore * 10;
      });
      newProgress.totalScore = total;

      saveProgress(newProgress);
      return newProgress;
    });
  }, [saveProgress]);

  // Complete monthly exam
  const completeExam = useCallback((month: number, score: number) => {
    setProgress(prev => {
      const newProgress = { ...prev };
      newProgress.months[month].examScore = score;
      newProgress.months[month].examCompleted = true;

      // Check if passed (score >= 14 out of 20)
      if (score >= 14 && month < 5) {
        newProgress.months[month + 1].unlocked = true;
        newProgress.currentMonth = month + 1;
        newProgress.currentDay = 1;
      }

      saveProgress(newProgress);
      return newProgress;
    });
  }, [saveProgress]);

  // Unlock month with code
  const unlockWithCode = useCallback((month: number, code: string): boolean => {
    const monthData = courseData.find(m => m.month === month);
    if (monthData && monthData.unlockCode === code) {
      setProgress(prev => {
        const newProgress = { ...prev };
        newProgress.months[month].unlocked = true;
        saveProgress(newProgress);
        return newProgress;
      });
      return true;
    }
    return false;
  }, [saveProgress]);

  // Add weakness
  const addWeakness = useCallback((type: 'vocabulary' | 'sentences' | 'pronunciation', id: string) => {
    setProgress(prev => {
      const newProgress = { ...prev };
      if (!newProgress.weaknesses[type].includes(id)) {
        newProgress.weaknesses[type].push(id);
      }
      saveProgress(newProgress);
      return newProgress;
    });
  }, [saveProgress]);

  // Remove weakness
  const removeWeakness = useCallback((type: 'vocabulary' | 'sentences' | 'pronunciation', id: string) => {
    setProgress(prev => {
      const newProgress = { ...prev };
      newProgress.weaknesses[type] = newProgress.weaknesses[type].filter(w => w !== id);
      saveProgress(newProgress);
      return newProgress;
    });
  }, [saveProgress]);

  // Reset progress
  const resetProgress = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    setProgress(defaultProgress);
  }, []);

  // Check if day is accessible
  const isDayAccessible = useCallback((month: number, day: number): boolean => {
    if (!progress.months[month]?.unlocked) return false;
    if (month < progress.currentMonth) return true;
    if (month === progress.currentMonth && day <= progress.currentDay) return true;
    return false;
  }, [progress]);

  // Get completed days count
  const getCompletedDaysCount = useCallback((month: number): number => {
    const monthProgress = progress.months[month];
    if (!monthProgress) return 0;
    return Object.values(monthProgress.days).filter(d => d.completed).length;
  }, [progress]);

  return {
    progress,
    isLoaded,
    completeDay,
    completeExam,
    unlockWithCode,
    addWeakness,
    removeWeakness,
    resetProgress,
    isDayAccessible,
    getCompletedDaysCount
  };
}
