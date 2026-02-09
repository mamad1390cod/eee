import { courseData } from '@/data/courseData';
import { UserProgress } from '@/hooks/useProgress';

interface MonthViewProps {
  month: number;
  progress: UserProgress;
  onBack: () => void;
  onSelectDay: (day: number, isExam: boolean) => void;
  isDayAccessible: (month: number, day: number) => boolean;
}

export function MonthView({ month, progress, onBack, onSelectDay, isDayAccessible }: MonthViewProps) {
  const monthData = courseData.find(m => m.month === month);
  const monthProgress = progress.months[month];

  if (!monthData) return null;

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'Very Beginner': return 'from-green-400 to-green-600';
      case 'Beginner': return 'from-blue-400 to-blue-600';
      case 'Elementary': return 'from-purple-400 to-purple-600';
      case 'Elementary+': return 'from-orange-400 to-orange-600';
      case 'Pre-Intermediate': return 'from-red-400 to-red-600';
      default: return 'from-gray-400 to-gray-600';
    }
  };

  const getDayStatus = (day: number) => {
    const dayProgress = monthProgress?.days[day];
    const isAccessible = isDayAccessible(month, day);
    const isCurrent = month === progress.currentMonth && day === progress.currentDay;
    
    if (dayProgress?.completed) return 'completed';
    if (isCurrent) return 'current';
    if (isAccessible) return 'accessible';
    return 'locked';
  };

  const learningDays = Array.from({ length: 25 }, (_, i) => i + 1);
  const examDays = Array.from({ length: 5 }, (_, i) => i + 26);

  // Check if all learning days are completed
  const allLearningCompleted = learningDays.every(day => monthProgress?.days[day]?.completed);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50" dir="rtl">
      {/* Header */}
      <header className={`bg-gradient-to-r ${getLevelColor(monthData.level)} text-white sticky top-0 z-10`}>
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={onBack}
              className="flex items-center gap-2 bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg transition-colors"
            >
              <span>→</span>
              <span>بازگشت</span>
            </button>
            <div className="text-center">
              <h1 className="text-xl font-bold">ماه {month}: {monthData.title}</h1>
              <p className="text-sm opacity-90">{monthData.level}</p>
            </div>
            <div className="w-24" />
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Learning Days Section */}
        <div className="mb-8">
          <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
            <span>📖</span>
            روزهای آموزشی (۱ تا ۲۵)
          </h2>
          <div className="grid grid-cols-5 sm:grid-cols-7 md:grid-cols-10 gap-3">
            {learningDays.map(day => {
              const status = getDayStatus(day);
              const dayProgress = monthProgress?.days[day];
              
              return (
                <button
                  key={day}
                  onClick={() => (status === 'accessible' || status === 'current' || status === 'completed') && onSelectDay(day, false)}
                  disabled={status === 'locked'}
                  className={`relative aspect-square rounded-xl flex flex-col items-center justify-center text-lg font-bold transition-all duration-200 ${
                    status === 'completed'
                      ? 'bg-gradient-to-br from-green-400 to-green-600 text-white shadow-lg hover:scale-105'
                      : status === 'current'
                      ? 'bg-gradient-to-br from-amber-400 to-orange-500 text-white shadow-lg animate-pulse hover:scale-105'
                      : status === 'accessible'
                      ? 'bg-white border-2 border-indigo-300 text-indigo-600 hover:border-indigo-500 hover:scale-105 shadow-md'
                      : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  }`}
                >
                  <span>{day}</span>
                  {status === 'completed' && (
                    <span className="absolute -top-1 -right-1 text-sm">✓</span>
                  )}
                  {status === 'locked' && (
                    <span className="text-xs mt-0.5">🔒</span>
                  )}
                  {dayProgress && (
                    <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2">
                      <div className="flex gap-0.5">
                        {dayProgress.vocabularyScore > 0 && <div className="w-1.5 h-1.5 bg-white/80 rounded-full" />}
                        {dayProgress.sentenceScore > 0 && <div className="w-1.5 h-1.5 bg-white/80 rounded-full" />}
                        {dayProgress.exerciseScore > 0 && <div className="w-1.5 h-1.5 bg-white/80 rounded-full" />}
                      </div>
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Exam Days Section */}
        <div className="mb-8">
          <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
            <span>📝</span>
            امتحان پایان ماه (۲۶ تا ۳۰)
          </h2>
          
          {!allLearningCompleted && (
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-4">
              <p className="text-amber-800 text-sm">
                ⚠️ برای شرکت در امتحان، ابتدا باید تمام روزهای آموزشی را کامل کنید.
              </p>
            </div>
          )}
          
          <div className="grid grid-cols-5 gap-3">
            {examDays.map((day) => {
              const canAccess = allLearningCompleted;
              const isExamCompleted = monthProgress?.examCompleted;
              
              return (
                <button
                  key={day}
                  onClick={() => canAccess && !isExamCompleted && onSelectDay(day, true)}
                  disabled={!canAccess || isExamCompleted}
                  className={`relative aspect-square rounded-xl flex flex-col items-center justify-center text-lg font-bold transition-all duration-200 ${
                    isExamCompleted
                      ? monthProgress.examScore >= 14
                        ? 'bg-gradient-to-br from-green-400 to-green-600 text-white shadow-lg'
                        : 'bg-gradient-to-br from-red-400 to-red-600 text-white shadow-lg'
                      : canAccess
                      ? 'bg-gradient-to-br from-purple-400 to-purple-600 text-white shadow-lg hover:scale-105 cursor-pointer'
                      : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  }`}
                >
                  <span>{day}</span>
                  <span className="text-xs mt-1">
                    {isExamCompleted 
                      ? (monthProgress.examScore >= 14 ? '✓' : '✗')
                      : canAccess ? '📝' : '🔒'
                    }
                  </span>
                </button>
              );
            })}
          </div>

          {/* Exam Result */}
          {monthProgress?.examCompleted && (
            <div className={`mt-4 p-4 rounded-xl ${
              monthProgress.examScore >= 14 
                ? 'bg-green-50 border border-green-200' 
                : 'bg-red-50 border border-red-200'
            }`}>
              <div className="flex items-center justify-between">
                <div>
                  <h3 className={`font-bold ${monthProgress.examScore >= 14 ? 'text-green-800' : 'text-red-800'}`}>
                    {monthProgress.examScore >= 14 ? '🎉 تبریک! قبول شدید!' : '😔 نیاز به تمرین بیشتر'}
                  </h3>
                  <p className={`text-sm ${monthProgress.examScore >= 14 ? 'text-green-600' : 'text-red-600'}`}>
                    نمره شما: {monthProgress.examScore}/20
                    {monthProgress.examScore >= 14 
                      ? ` - ماه بعد باز شد!`
                      : ` - برای قبولی به نمره ۱۴ نیاز دارید`
                    }
                  </p>
                </div>
                <div className={`text-4xl ${monthProgress.examScore >= 14 ? 'text-green-500' : 'text-red-500'}`}>
                  {monthProgress.examScore >= 14 ? '🏆' : '📚'}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Tips */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
            <span>💡</span>
            نکات مهم
          </h3>
          <ul className="space-y-2 text-sm text-gray-600">
            <li className="flex items-start gap-2">
              <span className="text-green-500">✓</span>
              هر روز شامل واژگان جدید، جملات و تمرین‌های تعاملی است
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-500">✓</span>
              تمرین تلفظ با استفاده از میکروفون انجام می‌شود
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-500">✓</span>
              برای قبولی در امتحان پایان ماه، نمره ۱۴ از ۲۰ لازم است
            </li>
            <li className="flex items-start gap-2">
              <span className="text-amber-500">⚡</span>
              هر روز فقط از مطالب یاد گرفته شده استفاده می‌شود
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
