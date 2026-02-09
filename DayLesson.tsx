import { useState, useEffect } from 'react';
import { courseData, Word, Sentence } from '@/data/courseData';
import { useTextToSpeech } from '@/hooks/useTextToSpeech';
import { useSpeechRecognition } from '@/hooks/useSpeechRecognition';

interface DayLessonProps {
  month: number;
  day: number;
  onBack: () => void;
  onComplete: (scores: { vocabularyScore: number; sentenceScore: number; exerciseScore: number; pronunciationScore: number }) => void;
}

type LessonStep = 'vocabulary' | 'sentences' | 'exercises' | 'pronunciation' | 'complete';

export function DayLesson({ month, day, onBack, onComplete }: DayLessonProps) {
  const [step, setStep] = useState<LessonStep>('vocabulary');
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentSentenceIndex, setCurrentSentenceIndex] = useState(0);
  const [exerciseIndex, setExerciseIndex] = useState(0);
  const [pronunciationIndex, setPronunciationIndex] = useState(0);
  
  const [scores, setScores] = useState({
    vocabulary: 0,
    sentences: 0,
    exercises: 0,
    pronunciation: 0
  });
  
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  
  const { speak, speakSlow, isSpeaking } = useTextToSpeech();
  const { startListening, isListening, result, error, isSupported } = useSpeechRecognition();

  const monthData = courseData.find(m => m.month === month);
  const dayData = monthData?.days.find(d => d.day === day);

  useEffect(() => {
    // Load voices
    window.speechSynthesis.getVoices();
  }, []);

  if (!dayData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100" dir="rtl">
        <div className="bg-white p-8 rounded-xl shadow-lg text-center">
          <p className="text-gray-600">محتوای این روز در دسترس نیست</p>
          <button onClick={onBack} className="mt-4 px-6 py-2 bg-indigo-500 text-white rounded-lg">
            بازگشت
          </button>
        </div>
      </div>
    );
  }

  const { words, sentences } = dayData;

  // Generate exercises from words and sentences
  const exercises = [
    ...words.map(w => ({
      type: 'word-meaning' as const,
      question: `معنی "${w.english}" چیست؟`,
      answer: w.persian,
      options: shuffleArray([w.persian, ...getRandomPersianMeanings(words, w.persian)])
    })),
    ...words.slice(0, 3).map(w => ({
      type: 'meaning-word' as const,
      question: `کدام کلمه به معنی "${w.persian}" است؟`,
      answer: w.english,
      options: shuffleArray([w.english, ...getRandomEnglishWords(words, w.english)])
    })),
    ...sentences.slice(0, 2).map(s => ({
      type: 'sentence-fill' as const,
      question: `جای خالی را پر کنید: "${createFillBlank(s.english)}"`,
      answer: getMissingWord(s.english),
      hint: s.persian,
      options: shuffleArray([getMissingWord(s.english), ...getRandomWords(words)])
    }))
  ];

  const pronunciationItems = [...words.slice(0, 3), ...sentences.slice(0, 2).map(s => ({
    english: s.english,
    persian: s.persian
  }))];

  function shuffleArray<T>(array: T[]): T[] {
    return [...array].sort(() => Math.random() - 0.5).slice(0, 4);
  }

  function getRandomPersianMeanings(allWords: Word[], exclude: string): string[] {
    return allWords.filter(w => w.persian !== exclude).slice(0, 3).map(w => w.persian);
  }

  function getRandomEnglishWords(allWords: Word[], exclude: string): string[] {
    return allWords.filter(w => w.english !== exclude).slice(0, 3).map(w => w.english);
  }

  function getRandomWords(allWords: Word[]): string[] {
    return allWords.slice(0, 3).map(w => w.english);
  }

  function createFillBlank(sentence: string): string {
    const words = sentence.replace(/[.,!?]/g, '').split(' ');
    const middleIndex = Math.floor(words.length / 2);
    words[middleIndex] = '______';
    return words.join(' ');
  }

  function getMissingWord(sentence: string): string {
    const words = sentence.replace(/[.,!?]/g, '').split(' ');
    return words[Math.floor(words.length / 2)];
  }

  const handleNextWord = () => {
    if (currentWordIndex < words.length - 1) {
      setCurrentWordIndex(prev => prev + 1);
    } else {
      setStep('sentences');
      setCurrentSentenceIndex(0);
    }
  };

  const handleNextSentence = () => {
    if (currentSentenceIndex < sentences.length - 1) {
      setCurrentSentenceIndex(prev => prev + 1);
    } else {
      setStep('exercises');
      setExerciseIndex(0);
    }
  };

  const handleExerciseAnswer = (answer: string) => {
    const exercise = exercises[exerciseIndex];
    const correct = answer.toLowerCase() === exercise.answer.toLowerCase();
    setIsCorrect(correct);
    setShowFeedback(true);
    
    if (correct) {
      setScores(prev => ({ ...prev, exercises: prev.exercises + 1 }));
    }
    
    setTimeout(() => {
      setShowFeedback(false);
      if (exerciseIndex < exercises.length - 1) {
        setExerciseIndex(prev => prev + 1);
      } else {
        setStep('pronunciation');
        setPronunciationIndex(0);
      }
    }, 1500);
  };

  const handlePronunciationComplete = (correct: boolean) => {
    if (correct) {
      setScores(prev => ({ ...prev, pronunciation: prev.pronunciation + 1 }));
    }
    
    if (pronunciationIndex < pronunciationItems.length - 1) {
      setPronunciationIndex(prev => prev + 1);
    } else {
      setStep('complete');
    }
  };

  const handleFinish = () => {
    const finalScores = {
      vocabularyScore: Math.round((scores.vocabulary / words.length) * 100) || 50,
      sentenceScore: Math.round((scores.sentences / sentences.length) * 100) || 50,
      exerciseScore: Math.round((scores.exercises / exercises.length) * 100),
      pronunciationScore: Math.round((scores.pronunciation / pronunciationItems.length) * 100)
    };
    onComplete(finalScores);
  };

  const getProgressPercent = () => {
    const totalSteps = words.length + sentences.length + exercises.length + pronunciationItems.length;
    let completed = 0;
    
    if (step === 'vocabulary') completed = currentWordIndex;
    else if (step === 'sentences') completed = words.length + currentSentenceIndex;
    else if (step === 'exercises') completed = words.length + sentences.length + exerciseIndex;
    else if (step === 'pronunciation') completed = words.length + sentences.length + exercises.length + pronunciationIndex;
    else completed = totalSteps;
    
    return (completed / totalSteps) * 100;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50" dir="rtl">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-3">
            <button
              onClick={onBack}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors"
            >
              <span>→</span>
              <span>بازگشت</span>
            </button>
            <div className="text-center">
              <h1 className="font-bold text-gray-800">ماه {month} - روز {day}</h1>
              <p className="text-sm text-gray-500">
                {step === 'vocabulary' && 'یادگیری واژگان'}
                {step === 'sentences' && 'یادگیری جملات'}
                {step === 'exercises' && 'تمرین‌های تعاملی'}
                {step === 'pronunciation' && 'تمرین تلفظ'}
                {step === 'complete' && 'پایان درس'}
              </p>
            </div>
            <div className="w-16" />
          </div>
          
          {/* Progress Bar */}
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-indigo-500 to-purple-600 transition-all duration-300"
              style={{ width: `${getProgressPercent()}%` }}
            />
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Vocabulary Step */}
        {step === 'vocabulary' && (
          <VocabularyCard
            word={words[currentWordIndex]}
            index={currentWordIndex}
            total={words.length}
            onNext={handleNextWord}
            onSpeak={speak}
            onSpeakSlow={speakSlow}
            isSpeaking={isSpeaking}
          />
        )}

        {/* Sentences Step */}
        {step === 'sentences' && (
          <SentenceCard
            sentence={sentences[currentSentenceIndex]}
            index={currentSentenceIndex}
            total={sentences.length}
            onNext={handleNextSentence}
            onSpeak={speak}
            onSpeakSlow={speakSlow}
            isSpeaking={isSpeaking}
          />
        )}

        {/* Exercises Step */}
        {step === 'exercises' && (
          <ExerciseCard
            exercise={exercises[exerciseIndex]}
            index={exerciseIndex}
            total={exercises.length}
            onAnswer={handleExerciseAnswer}
            showFeedback={showFeedback}
            isCorrect={isCorrect}
          />
        )}

        {/* Pronunciation Step */}
        {step === 'pronunciation' && (
          <PronunciationCard
            item={pronunciationItems[pronunciationIndex]}
            index={pronunciationIndex}
            total={pronunciationItems.length}
            onComplete={handlePronunciationComplete}
            onSpeak={speak}
            startListening={startListening}
            isListening={isListening}
            result={result}
            error={error}
            isSupported={isSupported}
            isSpeaking={isSpeaking}
          />
        )}

        {/* Complete Step */}
        {step === 'complete' && (
          <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
            <div className="text-6xl mb-4">🎉</div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">آفرین! درس امروز تمام شد!</h2>
            <p className="text-gray-600 mb-6">شما تمام بخش‌های این درس را با موفقیت گذراندید.</p>
            
            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-4">
                <div className="text-2xl font-bold text-blue-600">{scores.exercises}</div>
                <div className="text-sm text-blue-700">تمرین درست</div>
              </div>
              <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-4">
                <div className="text-2xl font-bold text-green-600">{scores.pronunciation}</div>
                <div className="text-sm text-green-700">تلفظ صحیح</div>
              </div>
            </div>
            
            <button
              onClick={handleFinish}
              className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white py-4 rounded-xl font-bold text-lg hover:opacity-90 transition-opacity"
            >
              تکمیل و ادامه 🚀
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

// Vocabulary Card Component
function VocabularyCard({ 
  word, 
  index, 
  total, 
  onNext, 
  onSpeak, 
  onSpeakSlow,
  isSpeaking 
}: { 
  word: Word; 
  index: number; 
  total: number; 
  onNext: () => void; 
  onSpeak: (text: string) => void;
  onSpeakSlow: (text: string) => void;
  isSpeaking: boolean;
}) {
  return (
    <div className="bg-white rounded-2xl shadow-xl p-8">
      <div className="flex items-center justify-between mb-6">
        <span className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-sm font-medium">
          واژه {index + 1} از {total}
        </span>
        <div className="flex gap-2">
          <button
            onClick={() => onSpeak(word.english)}
            disabled={isSpeaking}
            className="p-3 bg-indigo-100 text-indigo-600 rounded-xl hover:bg-indigo-200 transition-colors disabled:opacity-50"
            title="پخش صدا"
          >
            🔊
          </button>
          <button
            onClick={() => onSpeakSlow(word.english)}
            disabled={isSpeaking}
            className="p-3 bg-green-100 text-green-600 rounded-xl hover:bg-green-200 transition-colors disabled:opacity-50"
            title="پخش آهسته"
          >
            🐢
          </button>
        </div>
      </div>
      
      <div className="text-center mb-8">
        <h2 className="text-5xl font-bold text-gray-800 mb-4">{word.english}</h2>
        <p className="text-gray-400 text-lg mb-2">/{word.pronunciation}/</p>
        <p className="text-2xl text-indigo-600 font-medium">{word.persian}</p>
      </div>

      <div className="bg-gray-50 rounded-xl p-4 mb-6">
        <p className="text-sm text-gray-500 mb-1">مثال:</p>
        <p className="text-lg text-gray-700 font-medium">{word.example}</p>
        <p className="text-gray-500 mt-1">{word.examplePersian}</p>
      </div>

      <button
        onClick={onNext}
        className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white py-4 rounded-xl font-bold text-lg hover:opacity-90 transition-opacity"
      >
        {index < total - 1 ? 'واژه بعدی ←' : 'رفتن به جملات ←'}
      </button>
    </div>
  );
}

// Sentence Card Component
function SentenceCard({ 
  sentence, 
  index, 
  total, 
  onNext, 
  onSpeak,
  onSpeakSlow,
  isSpeaking 
}: { 
  sentence: Sentence; 
  index: number; 
  total: number; 
  onNext: () => void; 
  onSpeak: (text: string) => void;
  onSpeakSlow: (text: string) => void;
  isSpeaking: boolean;
}) {
  return (
    <div className="bg-white rounded-2xl shadow-xl p-8">
      <div className="flex items-center justify-between mb-6">
        <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm font-medium">
          جمله {index + 1} از {total}
        </span>
        <div className="flex gap-2">
          <button
            onClick={() => onSpeak(sentence.english)}
            disabled={isSpeaking}
            className="p-3 bg-indigo-100 text-indigo-600 rounded-xl hover:bg-indigo-200 transition-colors disabled:opacity-50"
          >
            🔊
          </button>
          <button
            onClick={() => onSpeakSlow(sentence.english)}
            disabled={isSpeaking}
            className="p-3 bg-green-100 text-green-600 rounded-xl hover:bg-green-200 transition-colors disabled:opacity-50"
          >
            🐢
          </button>
        </div>
      </div>
      
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-4 leading-relaxed">{sentence.english}</h2>
        <p className="text-xl text-purple-600 font-medium">{sentence.persian}</p>
      </div>

      <div className="bg-gray-50 rounded-xl p-4 mb-6">
        <p className="text-sm text-gray-500 mb-2">کلمات جمله:</p>
        <div className="flex flex-wrap gap-2 justify-center">
          {sentence.words.map((word, i) => (
            <span key={i} className="bg-white px-3 py-1 rounded-lg border border-gray-200 text-gray-700">
              {word}
            </span>
          ))}
        </div>
      </div>

      <button
        onClick={onNext}
        className="w-full bg-gradient-to-r from-purple-500 to-pink-600 text-white py-4 rounded-xl font-bold text-lg hover:opacity-90 transition-opacity"
      >
        {index < total - 1 ? 'جمله بعدی ←' : 'رفتن به تمرین‌ها ←'}
      </button>
    </div>
  );
}

// Exercise Card Component
interface Exercise {
  type: 'word-meaning' | 'meaning-word' | 'sentence-fill';
  question: string;
  answer: string;
  options: string[];
  hint?: string;
}

function ExerciseCard({ 
  exercise, 
  index, 
  total, 
  onAnswer,
  showFeedback,
  isCorrect
}: { 
  exercise: Exercise; 
  index: number; 
  total: number; 
  onAnswer: (answer: string) => void;
  showFeedback: boolean;
  isCorrect: boolean;
}) {
  return (
    <div className="bg-white rounded-2xl shadow-xl p-8">
      <div className="flex items-center justify-between mb-6">
        <span className="bg-amber-100 text-amber-700 px-3 py-1 rounded-full text-sm font-medium">
          تمرین {index + 1} از {total}
        </span>
        <span className="text-2xl">
          {exercise.type === 'word-meaning' && '📝'}
          {exercise.type === 'meaning-word' && '🔤'}
          {exercise.type === 'sentence-fill' && '✏️'}
        </span>
      </div>
      
      <div className="text-center mb-8">
        <h2 className="text-xl font-bold text-gray-800 mb-4">{exercise.question}</h2>
        {exercise.hint && (
          <p className="text-gray-500 text-sm">(راهنما: {exercise.hint})</p>
        )}
      </div>

      <div className="grid grid-cols-2 gap-3 mb-4">
        {exercise.options.map((option, i) => (
          <button
            key={i}
            onClick={() => !showFeedback && onAnswer(option)}
            disabled={showFeedback}
            className={`p-4 rounded-xl border-2 text-lg font-medium transition-all ${
              showFeedback
                ? option === exercise.answer
                  ? 'bg-green-100 border-green-500 text-green-700'
                  : 'bg-gray-100 border-gray-200 text-gray-400'
                : 'bg-white border-gray-200 hover:border-indigo-500 hover:bg-indigo-50'
            }`}
          >
            {option}
          </button>
        ))}
      </div>

      {showFeedback && (
        <div className={`text-center p-4 rounded-xl ${
          isCorrect ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
        }`}>
          <p className="text-lg font-bold">
            {isCorrect ? '✅ آفرین! درست بود!' : `❌ اشتباه! جواب درست: ${exercise.answer}`}
          </p>
        </div>
      )}
    </div>
  );
}

// Pronunciation Card Component
interface PronunciationItem {
  english: string;
  persian: string;
}

function PronunciationCard({ 
  item, 
  index, 
  total, 
  onComplete,
  onSpeak,
  startListening,
  isListening,
  result,
  error,
  isSupported,
  isSpeaking
}: { 
  item: PronunciationItem; 
  index: number; 
  total: number; 
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

  const handleListen = () => {
    setTried(true);
    startListening(item.english);
  };

  const handleNext = () => {
    onComplete(result?.isCorrect || false);
    setTried(false);
  };

  const handleSkip = () => {
    onComplete(false);
    setTried(false);
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8">
      <div className="flex items-center justify-between mb-6">
        <span className="bg-pink-100 text-pink-700 px-3 py-1 rounded-full text-sm font-medium">
          تلفظ {index + 1} از {total}
        </span>
        <span className="text-2xl">🎤</span>
      </div>
      
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">{item.english}</h2>
        <p className="text-lg text-pink-600 font-medium">{item.persian}</p>
      </div>

      <div className="flex justify-center gap-4 mb-6">
        <button
          onClick={() => onSpeak(item.english)}
          disabled={isSpeaking || isListening}
          className="flex items-center gap-2 px-6 py-3 bg-indigo-100 text-indigo-600 rounded-xl hover:bg-indigo-200 transition-colors disabled:opacity-50"
        >
          <span>🔊</span>
          <span>گوش کن</span>
        </button>
      </div>

      {isSupported ? (
        <div className="text-center">
          {!tried && !result && (
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
              <button
                onClick={handleListen}
                className="mt-2 text-sm underline"
              >
                تلاش مجدد
              </button>
            </div>
          )}

          {result && (
            <div className={`p-4 rounded-xl mb-4 ${
              result.isCorrect ? 'bg-green-100' : 'bg-amber-100'
            }`}>
              <p className="text-lg font-bold mb-2">
                {result.isCorrect ? '✅ عالی! تلفظ صحیح!' : '🔄 نزدیک بود! تلاش کن!'}
              </p>
              <p className="text-gray-600 text-sm">
                شما گفتید: "{result.transcript}"
              </p>
              <p className="text-gray-500 text-xs mt-1">
                اطمینان: {Math.round(result.confidence * 100)}%
              </p>
            </div>
          )}

          {(tried || result) && (
            <div className="flex gap-3">
              {!result?.isCorrect && (
                <button
                  onClick={handleListen}
                  disabled={isListening}
                  className="flex-1 py-3 bg-amber-100 text-amber-700 rounded-xl font-medium hover:bg-amber-200 transition-colors"
                >
                  🔄 تلاش مجدد
                </button>
              )}
              <button
                onClick={handleNext}
                className="flex-1 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-xl font-medium hover:opacity-90 transition-opacity"
              >
                ادامه ←
              </button>
            </div>
          )}
        </div>
      ) : (
        <div className="text-center">
          <div className="bg-amber-100 text-amber-700 p-4 rounded-xl mb-4">
            <p>تشخیص گفتار در این مرورگر پشتیبانی نمی‌شود.</p>
            <p className="text-sm mt-1">لطفاً از Chrome یا Edge استفاده کنید.</p>
          </div>
          <button
            onClick={handleSkip}
            className="w-full py-3 bg-gray-200 text-gray-700 rounded-xl font-medium hover:bg-gray-300 transition-colors"
          >
            رد کردن ←
          </button>
        </div>
      )}
    </div>
  );
}
