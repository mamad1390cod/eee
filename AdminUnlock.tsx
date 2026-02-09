import { useState } from 'react';

interface AdminUnlockProps {
  onClose: () => void;
  onUnlock: (month: number, code: string) => boolean;
}

export function AdminUnlock({ onClose, onUnlock }: AdminUnlockProps) {
  const [selectedMonth, setSelectedMonth] = useState(1);
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess(false);
    
    if (!code.trim()) {
      setError('لطفاً کد را وارد کنید');
      return;
    }
    
    const result = onUnlock(selectedMonth, code.trim());
    
    if (result) {
      setSuccess(true);
      setCode('');
      setTimeout(() => {
        onClose();
      }, 1500);
    } else {
      setError('کد اشتباه است');
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" dir="rtl">
      <div className="bg-white rounded-2xl shadow-2xl p-6 max-w-md w-full">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-800">🔐 باز کردن ماه با کد</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-2xl"
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              انتخاب ماه
            </label>
            <select
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(Number(e.target.value))}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value={1}>ماه ۱ - سلام و احوالپرسی</option>
              <option value={2}>ماه ۲ - خانواده و روابط</option>
              <option value={3}>ماه ۳ - زندگی روزمره</option>
              <option value={4}>ماه ۴ - سفر و مکان‌ها</option>
              <option value={5}>ماه ۵ - آینده و اهداف</option>
            </select>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              کد مخفی
            </label>
            <input
              type="password"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="کد را وارد کنید..."
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-xl text-sm">
              ❌ {error}
            </div>
          )}

          {success && (
            <div className="mb-4 p-3 bg-green-100 text-green-700 rounded-xl text-sm">
              ✅ ماه با موفقیت باز شد!
            </div>
          )}

          <div className="flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3 bg-gray-200 text-gray-700 rounded-xl font-medium hover:bg-gray-300 transition-colors"
            >
              انصراف
            </button>
            <button
              type="submit"
              className="flex-1 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-xl font-bold hover:opacity-90 transition-opacity"
            >
              باز کردن
            </button>
          </div>
        </form>

        <div className="mt-6 pt-4 border-t border-gray-200">
          <p className="text-xs text-gray-400 text-center">
            این بخش فقط برای ادمین است
          </p>
        </div>
      </div>
    </div>
  );
}
