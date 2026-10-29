import { useEffect } from 'react';
import { CheckCircle2, AlertCircle, X } from 'lucide-react';

/**
 * Toast Component (100% Mobile & Desktop Responsive):
 * On mobile, stays centered within viewport margins (inset-x-3);
 * on desktop, docks neatly to the bottom-right corner.
 */
export default function Toast({ toast, onClose }) {
  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => {
        onClose();
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [toast, onClose]);

  if (!toast) return null;

  const isSuccess = toast.type === 'success';

  return (
    <div className="fixed bottom-4 inset-x-3 sm:inset-x-auto sm:right-5 sm:bottom-5 sm:max-w-md z-50 animate-in slide-in-from-bottom-5 duration-300">
      <div
        className={`flex items-center justify-between gap-3 px-3.5 sm:px-4 py-2.5 sm:py-3 rounded-xl shadow-lg border text-xs sm:text-sm font-medium ${
          isSuccess
            ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
            : 'bg-rose-50 text-rose-800 border-rose-200'
        }`}
      >
        <div className="flex items-center gap-2.5 min-w-0">
          {isSuccess ? (
            <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-600 shrink-0" />
          ) : (
            <AlertCircle className="w-4 h-4 sm:w-5 sm:h-5 text-rose-600 shrink-0" />
          )}
          <span className="truncate">{toast.message}</span>
        </div>

        <button
          onClick={onClose}
          className="text-slate-400 hover:text-slate-600 rounded p-1 shrink-0 cursor-pointer"
          aria-label="Dismiss notification"
        >
          <X className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
        </button>
      </div>
    </div>
  );
}
