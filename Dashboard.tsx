import { courseData } from '@/data/courseData';
import { UserProgress } from '@/hooks/useProgress';

interface DashboardProps {
  progress: UserProgress;
  onSelectMonth: (month: number) => void;
  getCompletedDaysCount: (month: number) => number;
}

export function Dashboard({ progress, onSelectMonth, getCompletedDaysCount }: DashboardProps) {
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50" dir="rtl">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center">
                <span className="text-2xl">📚</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-800">آموزش زبان انگلیسی</h1>
                <p className="text-sm text-gray-500">از مبتدی تا مکالمه</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="bg-gradient-to-r from-amber-400 to-orange-500 text-white px-4 py-2 rounded-lg flex items-center gap-2">
                <span className="text-lg">⭐</span>
                <span className="font-bold">{progress.totalScore}</span>
                <span className="text-sm">امتیاز</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Progress Overview */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <h2 className="text-lg font-bold text-gray-800 mb-4">📊 پیشرفت کلی شما</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-4 text-center">
              <div className="text-3xl font-bold text-blue-600">{progress.currentMonth}</div>
              <div className="text-sm text-blue-700">ماه فعلی</div>
            </div>
            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-4 text-center">
              <div className="text-3xl font-bold text-green-600">{progress.currentDay}</div>
              <div className="text-sm text-green-700">روز فعلی</div>
            </div>
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-4 text-center">
              <div className="text-3xl font-bold text-purple-600">
                {Object.values(progress.months).reduce((acc, m) => acc + Object.values(m.days).filter(d => d.completed).length, 0)}
              </div>
              <div className="text-sm text-purple-700">روز تکمیل شده</div>
            </div>
            <div className="bg-gradient-to-br from-amber-50 to-amber-100 rounded-xl p-4 text-center">
              <div className="text-3xl font-bold text-amber-600">
                {Object.values(progress.months).filter(m => m.examCompleted && m.examScore >= 14).length}
              </div>
              <div className="text-sm text-amber-700">ماه قبول شده</div>
            </div>
          </div>
        </div>

        {/* Month Cards */}
        <h2 className="text-xl font-bold text-gray-800 mb-6">🗓️ دوره‌های آموزشی</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {courseData.map((month) => {
            const isUnlocked = progress.months[month.month]?.unlocked || false;
            const completedDays = getCompletedDaysCount(month.month);
            const monthProgress = progress.months[month.month];
            const progressPercent = (completedDays / 25) * 100;
            
            return (
              <div
                key={month.month}
                onClick={() => isUnlocked && onSelectMonth(month.month)}
                className={`relative bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 ${
                  isUnlocked 
                    ? 'cursor-pointer hover:shadow-xl hover:scale-[1.02]' 
                    : 'opacity-60 cursor-not-allowed'
                }`}
              >
                {/* Header */}
                <div className={`bg-gradient-to-r ${getLevelColor(month.level)} p-4 text-white`}>
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-bold">ماه {month.month}</h3>
                      <p className="text-sm opacity-90">{month.title}</p>
                    </div>
                    <div className="text-3xl">
                      {isUnlocked ? (monthProgress?.examCompleted && monthProgress.examScore >= 14 ? '🏆' : '📖') : '🔒'}
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm text-gray-600">سطح: {month.level}</span>
                    <span className="text-sm text-gray-500">{completedDays}/25 روز</span>
                  </div>
                  
                  {/* Progress Bar */}
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden mb-3">
                    <div 
                      className={`h-full bg-gradient-to-r ${getLevelColor(month.level)} transition-all duration-500`}
                      style={{ width: `${progressPercent}%` }}
                    />
                  </div>

                  {/* Exam Status */}
                  {monthProgress?.examCompleted && (
                    <div className={`flex items-center gap-2 text-sm ${
                      monthProgress.examScore >= 14 ? 'text-green-600' : 'text-red-600'
                    }`}>
                      <span>{monthProgress.examScore >= 14 ? '✅' : '❌'}</span>
                      <span>نمره آزمون: {monthProgress.examScore}/20</span>
                    </div>
                  )}

                  {!isUnlocked && (
                    <div className="text-center text-gray-500 text-sm mt-2">
                      برای باز شدن، ماه قبل را با نمره ۱۴ یا بالاتر پاس کنید
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Motivation Quote */}
      <div className="max-w-6xl mx-auto px-4 pb-8">
        <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl p-6 text-white text-center">
          <p className="text-lg font-medium mb-2">💪 هر روز یک قدم به جلو!</p>
          <p className="text-sm opacity-90">یادگیری زبان یک سفر است، نه یک مقصد. با پشتکار ادامه بده!</p>
        </div>
      </div>
    </div>
  );
}
