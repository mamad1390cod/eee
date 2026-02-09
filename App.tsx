import { useState, useRef } from 'react';
import { useProgress } from '@/hooks/useProgress';
import { Dashboard } from '@/components/Dashboard';
import { MonthView } from '@/components/MonthView';
import { DayLesson } from '@/components/DayLesson';
import { MonthlyExam } from '@/components/MonthlyExam';
import { AdminUnlock } from '@/components/AdminUnlock';

type View = 'dashboard' | 'month' | 'lesson' | 'exam';

export function App() {
  const [currentView, setCurrentView] = useState<View>('dashboard');
  const [selectedMonth, setSelectedMonth] = useState(1);
  const [selectedDay, setSelectedDay] = useState(1);
  const [showAdminUnlock, setShowAdminUnlock] = useState(false);
  const [clickCount, setClickCount] = useState(0);
  const clickTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const {
    progress,
    isLoaded,
    completeDay,
    completeExam,
    unlockWithCode,
    isDayAccessible,
    getCompletedDaysCount
  } = useProgress();

  const handleSelectMonth = (month: number) => {
    setSelectedMonth(month);
    setCurrentView('month');
  };

  const handleSelectDay = (day: number, isExam: boolean) => {
    setSelectedDay(day);
    if (isExam) {
      setCurrentView('exam');
    } else {
      setCurrentView('lesson');
    }
  };

  const handleCompleteDay = (scores: { 
    vocabularyScore: number; 
    sentenceScore: number; 
    exerciseScore: number; 
    pronunciationScore: number 
  }) => {
    completeDay(selectedMonth, selectedDay, scores);
    setCurrentView('month');
  };

  const handleCompleteExam = (score: number) => {
    completeExam(selectedMonth, score);
    setCurrentView('month');
  };

  const handleAdminUnlock = (month: number, code: string): boolean => {
    return unlockWithCode(month, code);
  };

  if (!isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-purple-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">در حال بارگذاری...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Admin Button - Hidden, requires 5 clicks */}
      <div 
        className="fixed bottom-4 left-4 z-50 w-10 h-10 opacity-20 hover:opacity-40 cursor-pointer transition-opacity flex items-center justify-center text-gray-400 text-xs select-none"
        onClick={() => {
          const newCount = clickCount + 1;
          setClickCount(newCount);
          
          // Clear previous timeout
          if (clickTimeoutRef.current) {
            clearTimeout(clickTimeoutRef.current);
          }
          
          // Reset after 2 seconds of no clicks
          clickTimeoutRef.current = setTimeout(() => {
            setClickCount(0);
          }, 2000);
          
          // Show admin panel after 5 clicks
          if (newCount >= 5) {
            setShowAdminUnlock(true);
            setClickCount(0);
            if (clickTimeoutRef.current) {
              clearTimeout(clickTimeoutRef.current);
            }
          }
        }}
        title=""
      >
        ⚙️
      </div>

      {showAdminUnlock && (
        <AdminUnlock
          onClose={() => setShowAdminUnlock(false)}
          onUnlock={handleAdminUnlock}
        />
      )}

      {currentView === 'dashboard' && (
        <Dashboard
          progress={progress}
          onSelectMonth={handleSelectMonth}
          getCompletedDaysCount={getCompletedDaysCount}
        />
      )}

      {currentView === 'month' && (
        <MonthView
          month={selectedMonth}
          progress={progress}
          onBack={() => setCurrentView('dashboard')}
          onSelectDay={handleSelectDay}
          isDayAccessible={isDayAccessible}
        />
      )}

      {currentView === 'lesson' && (
        <DayLesson
          month={selectedMonth}
          day={selectedDay}
          onBack={() => setCurrentView('month')}
          onComplete={handleCompleteDay}
        />
      )}

      {currentView === 'exam' && (
        <MonthlyExam
          month={selectedMonth}
          onBack={() => setCurrentView('month')}
          onComplete={handleCompleteExam}
        />
      )}
    </>
  );
}
