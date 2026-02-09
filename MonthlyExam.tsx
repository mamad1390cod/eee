import { useState, useEffect } from 'react';
import { courseData, Word, Sentence } from '@/data/courseData';
import { useTextToSpeech } from '@/hooks/useTextToSpeech';
import { useSpeechRecognition } from '@/hooks/useSpeechRecognition';

interface MonthlyExamProps {
  month: number;
  onBack: () => void;
  onComplete: (score: number) => void;
}

interface ExamQuestion {
  id: string;
  type: 'word-meaning' | 'meaning-word' | 'sentence-meaning' | 'sentence-fill' | 'pronunciation';
  question: string;
  answer: string;
  options?: string[];
  audio?: string;
  item?: Word | Sentence;
}

export function MonthlyExam({ month, onBack, onComplete }: MonthlyExamProps) {
  const [questions, setQuestions] = useState<ExamQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<{ [id: string]: { answer: string; correct: boolean } }>({});
  const [showResult, setShowResult] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [examStarted, setExamStarted] = useState(false);
  
  const { speak, isSpeaking } = useTextToSpeech();
  const { startListening, isListening, result, error, isSupported } = useSpeechRecognition();

  const monthData = courseData.find(m => m.month === month);

  useEffect(() => {
    if (monthData) {
      generateQuestions();
    }
  }, [month]);

  const generateQuestions = () => {
    const monthWords = monthData?.days.flatMap(d => d.words) || [];
    const monthSentences = monthData?.days.flatMap(d => d.sentences) || [];
    
    const examQuestions: ExamQuestion[] = [];
    
    // Word meaning questions (4 questions)
    const shuffledWords = [...monthWords].sort(() => Math.random() - 0.5).slice(0, 4);
    shuffledWords.forEach((word, i) => {
      examQuestions.push({
        id: `wm-${i}`,
        type: 'word-meaning',
        question: `معنی "${word.english}" چیست؟`,
        answer: word.persian,
        options: shuffleOptions([word.persian, ...getRandomPersianMeanings(monthWords, word.persian, 3)])
      });
    });
    
    // Meaning to word questions (4 questions)
    const shuffledWords2 = [...monthWords].sort(() => Math.random() - 0.5).slice(0, 4);
    shuffledWords2.forEach((word, i) => {
      examQuestions.push({
        id: `mw-${i}`,
        type: 'meaning-word',
        question: `کدام کلمه به معنی "${word.persian}" است؟`,
        answer: word.english,
        options: shuffleOptions([word.english, ...getRandomEnglishWords(monthWords, word.english, 3)])
      });
    });
    
    // Sentence meaning questions (4 questions)
    const shuffledSentences = [...monthSentences].sort(() => Math.random() - 0.5).slice(0, 4);
    shuffledSentences.forEach((sentence, i) => {
      examQuestions.push({
        id: `sm-${i}`,
        type: 'sentence-meaning',
        question: `معنی این جمله چیست؟\n"${sentence.english}"`,
        answer: sentence.persian,
        options: shuffleOptions([sentence.persian, ...getRandomPersianSentences(monthSentences, sentence.persian, 3)])
      });
    });
    
    // Sentence fill questions (4 questions)
    const shuffledSentences2 = [...monthSentences].sort(() => Math.random() - 0.5).slice(0, 4);
    shuffledSentences2.forEach((sentence, i) => {
      const { blanked, missing } = createBlank(sentence.english);
      examQuestions.push({
        id: `sf-${i}`,
        type: 'sentence-fill',
        question: `جای خالی را پر کنید:\n"${blanked}"\n\n(${sentence.persian})`,
        answer: missing,
        options: shuffleOptions([missing, ...getRandomWords(monthWords, missing, 3)])
      });
    });
    
    // Pronunciation questions (4 questions)
    const pronunciationItems: (Word | Sentence)[] = [...shuffledWords.slice(0, 2), ...shuffledSentences.slice(0, 2)];
    pronunciationItems.forEach((item, i) => {
      const text = item.english;
      examQuestions.push({
        id: `pr-${i}`,
        type: 'pronunciation',
        question: `این عبارت را تلفظ کنید:\n"${text}"`,
        answer: text,
        audio: text,
        item: item as Word
      });
    });
    
    // Shuffle all questions
    setQuestions(examQuestions.sort(() => Math.random() - 0.5));
  };

  function shuffleOptions(options: string[]): string[] {
    return [...options].sort(() => Math.random() - 0.5);
  }

  function getRandomPersianMeanings(words: Word[], exclude: string, count: number): string[] {
    return words.filter(w => w.persian !== exclude).sort(() => Math.random() - 0.5).slice(0, count).map(w => w.persian);
  }

  function getRandomEnglishWords(words: Word[], exclude: string, count: number): string[] {
    return words.filter(w => w.english !== exclude).sort(() => Math.random() - 0.5).slice(0, count).map(w => w.english);
  }

  function getRandomPersianSentences(sentences: Sentence[], exclude: string, count: number): string[] {
    return sentences.filter(s => s.persian !== exclude).sort(() => Math.random() - 0.5).slice(0, count).map(s => s.persian);
  }

  function getRandomWords(words: Word[], exclude: string, count: number): string[] {
    return words.filter(w => w.english.toLowerCase() !== exclude.toLowerCase()).sort(() => Math.random() - 0.5).slice(0, count).map(w => w.english);
  }

  function createBlank(sentence: string): { blanked: string; missing: string } {
    const words = sentence.replace(/[.,!?]/g, '').split(' ');
    const idx = Math.floor(Math.random() * words.length);
    const missing = words[idx];
    words[idx] = '_______';
    return { blanked: words.join(' '), missing };
  }

  const handleAnswer = (answer: string) => {
    const question = questions[currentIndex];
    const correct = answer.toLowerCase().trim() === question.answer.toLowerCase().trim();
    
    setAnswers(prev => ({
      ...prev,
      [question.id]: { answer, correct }
    }));
    
    setIsCorrect(correct);
    setShowFeedback(true);
    
    setTimeout(() => {
      setShowFeedback(false);
      if (currentIndex < questions.length - 1) {
        setCurrentIndex(prev => prev + 1);
      } else {
        calculateAndShowResult();
      }
    }, 1500);
  };

  const handlePronunciationResult = (correct: boolean) => {
    const question = questions[currentIndex];
    
    setAnswers(prev => ({
      ...prev,
      [question.id]: { answer: result?.transcript || '', correct }
    }));
    
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      calculateAndShowResult();
    }
  };

  const calculateAndShowResult = () => {
    setShowResult(true);
  };

  const getFinalScore = (): number => {
    const correctCount = Object.values(answers).filter(a => a.correct).length;
    return Math.round((correctCount / questions.length) * 20);
  };

  const handleFinish = () => {
    onComplete(getFinalScore());
  };

  if (!examStarted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 flex items-center justify-center" dir="rtl">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-lg w-full mx-4 text-center">
          <div className="text-6xl mb-4">📝</div>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">امتحان پایان ماه {month}</h1>
          <p className="text-gray-600 mb-6">{monthData?.title}</p>
          
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-6 text-right">
            <h3 className="font-bold text-amber-800 mb-2">📋 قوانین امتحان:</h3>
            <ul className="text-sm text-amber-700 space-y-1">
              <li>• ۲۰ سوال از مطالب همین ماه</li>
              <li>• شامل معنی کلمات، جملات و تلفظ</li>
              <li>• نمره قبولی: ۱۴ از ۲۰</li>
              <li>• امکان تکرار امتحان وجود ندارد</li>
            </ul>
          </div>
          
          <div className="flex gap-3">
            <button
              onClick={onBack}
              className="flex-1 py-3 bg-gray-200 text-gray-700 rounded-xl font-medium hover:bg-gray-300 transition-colors"
            >
              بازگشت
            </button>
            <button
              onClick={() => setExamStarted(true)}
              className="flex-1 py-3 bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-xl font-bold hover:opacity-90 transition-opacity"
            >
              شروع امتحان 🚀
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (showResult) {
    const finalScore = getFinalScore();
    const passed = finalScore >= 14;
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 flex items-center justify-center" dir="rtl">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-lg w-full mx-4 text-center">
          <div className="text-6xl mb-4">{passed ? '🎉' : '😔'}</div>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">
            {passed ? 'تبریک! قبول شدید!' : 'متأسفانه قبول نشدید'}
          </h1>
          
          <div className={`text-6xl font-bold my-6 ${passed ? 'text-green-500' : 'text-red-500'}`}>
            {finalScore}/20
          </div>
          
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-green-50 rounded-xl p-4">
              <div className="text-2xl font-bold text-green-600">
                {Object.values(answers).filter(a => a.correct).length}
              </div>
              <div className="text-sm text-green-700">پاسخ صحیح</div>
            </div>
            <div className="bg-red-50 rounded-xl p-4">
              <div className="text-2xl font-bold text-red-600">
                {Object.values(answers).filter(a => !a.correct).length}
              </div>
              <div className="text-sm text-red-700">پاسخ غلط</div>
            </div>
          </div>
          
          {passed ? (
            <p className="text-gray-600 mb-6">
              ماه بعدی برای شما باز شد! ادامه دهید! 💪
            </p>
          ) : (
            <p className="text-gray-600 mb-6">
              برای قبولی به نمره ۱۴ نیاز دارید. مطالب را دوباره مرور کنید.
            </p>
          )}
          
          <button
            onClick={handleFinish}
            className="w-full py-4 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-xl font-bold hover:opacity-90 transition-opacity"
          >
            بازگشت به صفحه ماه
          </button>
        </div>
      </div>
    );
  }

  const currentQuestion = questions[currentIndex];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50" dir="rtl">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm text-gray-500">
              سوال {currentIndex + 1} از {questions.length}
            </span>
            <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm font-medium">
              امتحان ماه {month}
            </span>
          </div>
          
          {/* Progress Bar */}
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-purple-500 to-pink-600 transition-all duration-300"
              style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
            />
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-8">
        {currentQuestion?.type === 'pronunciation' ? (
          <PronunciationQuestion
            question={currentQuestion}
            onComplete={handlePronunciationResult}
            onSpeak={speak}
            startListening={startListening}
            isListening={isListening}
            result={result}
            error={error}
            isSupported={isSupported}
            isSpeaking={isSpeaking}
          />
        ) : (
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="text-center mb-8">
              <span className="text-2xl mb-4 block">
                {currentQuestion?.type === 'word-meaning' && '📖'}
                {currentQuestion?.type === 'meaning-word' && '🔤'}
                {currentQuestion?.type === 'sentence-meaning' && '💬'}
                {currentQuestion?.type === 'sentence-fill' && '✏️'}
              </span>
              <h2 className="text-xl font-bold text-gray-800 whitespace-pre-line">
                {currentQuestion?.question}
              </h2>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {currentQuestion?.options?.map((option, i) => (
                <button
                  key={i}
                  onClick={() => !showFeedback && handleAnswer(option)}
                  disabled={showFeedback}
                  className={`p-4 rounded-xl border-2 text-lg transition-all ${
                    showFeedback
                      ? option === currentQuestion.answer
                        ? 'bg-green-100 border-green-500 text-green-700'
                        : 'bg-gray-100 border-gray-200 text-gray-400'
                      : 'bg-white border-gray-200 hover:border-purple-500 hover:bg-purple-50'
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>

            {showFeedback && (
              <div className={`text-center p-4 rounded-xl mt-4 ${
                isCorrect ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
              }`}>
                <p className="text-lg font-bold">
                  {isCorrect ? '✅ صحیح!' : `❌ جواب درست: ${currentQuestion?.answer}`}
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

// Pronunciation Question Component
function PronunciationQuestion({ 
  question, 
  onComplete,
  onSpeak,
  startListening,
  isListening,
  result,
  error,
  isSupported,
  isSpeaking
}: { 
  question: ExamQuestion;
  onComplete: (correct: boolean) => void;
  onSpeak: (text: string) => void;
  startListening: (text: string) => void;
  isListening: boolean;
  result: { transcript: string; confidence: number; isCorrect: boolean } | null;
  error: string | null;
  isSupported: boolean;
  isSpeaking: boolean;
}) {
  const [tried, setTried] = useState(false);
  const [localResult, setLocalResult] = useState<typeof result>(null);

  useEffect(() => {
    if (result && tried) {
      setLocalResult(result);
    }
  }, [result, tried]);

  const handleListen = () => {
    setTried(true);
    setLocalResult(null);
    startListening(question.answer);
  };

  const handleNext = () => {
    onComplete(localResult?.isCorrect || false);
    setTried(false);
    setLocalResult(null);
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8">
      <div className="text-center mb-8">
        <span className="text-4xl mb-4 block">🎤</span>
        <h2 className="text-xl font-bold text-gray-800 whitespace-pre-line">
          {question.question}
        </h2>
      </div>

      <div className="flex justify-center gap-4 mb-6">
        <button
          onClick={() => onSpeak(question.answer)}
          disabled={isSpeaking || isListening}
          className="flex items-center gap-2 px-6 py-3 bg-indigo-100 text-indigo-600 rounded-xl hover:bg-indigo-200 transition-colors disabled:opacity-50"
        >
          <span>🔊</span>
          <span>گوش کن</span>
        </button>
      </div>

      {isSupported ? (
        <div className="text-center">
          {!localResult && (
            <button
              onClick={handleListen}
              disabled={isListening}
              className={`w-full py-4 rounded-xl font-bold text-lg transition-all ${
                isListening
                  ? 'bg-red-500 text-white animate-pulse'
                  : 'bg-gradient-to-r from-pink-500 to-rose-600 text-white hover:opacity-90'
              }`}
            >
              {isListening ? '🎤 در حال گوش دادن...' : '🎤 شروع تلفظ'}
            </button>
          )}

          {error && (
            <div className="bg-red-100 text-red-700 p-4 rounded-xl mb-4">
              <p>{error}</p>
            </div>
          )}

          {localResult && (
            <>
              <div className={`p-4 rounded-xl mb-4 ${
                localResult.isCorrect ? 'bg-green-100' : 'bg-amber-100'
              }`}>
                <p className="text-lg font-bold mb-2">
                  {localResult.isCorrect ? '✅ عالی!' : '❌ نیاز به تمرین بیشتر'}
                </p>
                <p className="text-gray-600 text-sm">
                  شما گفتید: "{localResult.transcript}"
                </p>
              </div>
              
              <button
                onClick={handleNext}
                className="w-full py-4 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-xl font-bold hover:opacity-90 transition-opacity"
              >
                سوال بعدی ←
              </button>
            </>
          )}
        </div>
      ) : (
        <div className="text-center">
          <div className="bg-amber-100 text-amber-700 p-4 rounded-xl mb-4">
            <p>تشخیص گفتار پشتیبانی نمی‌شود</p>
          </div>
          <button
            onClick={() => onComplete(false)}
            className="w-full py-3 bg-gray-200 text-gray-700 rounded-xl font-medium"
          >
            رد کردن ←
          </button>
        </div>
      )}
    </div>
  );
}
