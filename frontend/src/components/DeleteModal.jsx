import { AlertTriangle, Loader2 } from 'lucide-react';

/**
 * DeleteModal Component (100% Mobile & Desktop Responsive):
 * Confirmation popup before permanently removing a task.
 * Adapts cleanly to mobile viewports with comfortable button touch targets.
 */
export default function DeleteModal({ isOpen, onClose, onConfirm, task, isDeleting }) {
  if (!isOpen || !task) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3.5 sm:p-4">
      {/* Modal Box */}
      <div className="bg-white rounded-2xl shadow-xl border border-slate-200 w-full max-w-md overflow-hidden animate-in fade-in zoom-in-95 duration-200 p-5 sm:p-6">
        
        <div className="flex items-start gap-3 sm:gap-4">
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-rose-100 flex items-center justify-center text-rose-600 shrink-0 mt-0.5">
            <AlertTriangle className="w-5 h-5" />
          </div>

          <div className="flex-1 min-w-0">
            <h3 className="text-base sm:text-lg font-bold text-slate-900">Delete Task</h3>
            <p className="mt-1 text-xs sm:text-sm text-slate-600 wrap-break-word leading-relaxed">
              Are you sure you want to delete <span className="font-semibold text-slate-900">"{task.title}"</span>? This action cannot be undone.
            </p>
          </div>
        </div>

        {/* Action Buttons: Responsive row */}
        <div className="mt-5 sm:mt-6 flex items-center justify-end gap-2 sm:gap-3">
          <button
            type="button"
            onClick={onClose}
            disabled={isDeleting}
            className="px-3.5 sm:px-4 py-2 text-xs sm:text-sm font-medium text-slate-600 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={onConfirm}
            disabled={isDeleting}
            className="inline-flex items-center gap-1.5 sm:gap-2 px-4 py-2 bg-rose-600 hover:bg-rose-700 active:bg-rose-800 text-white rounded-lg text-xs sm:text-sm font-semibold shadow-xs transition-colors disabled:opacity-50 cursor-pointer"
          >
            {isDeleting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Deleting...</span>
              </>
            ) : (
              <span>Delete Task</span>
            )}
          </button>
        </div>

      </div>
    </div>
  );
}
