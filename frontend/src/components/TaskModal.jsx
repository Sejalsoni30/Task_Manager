import { useState } from 'react';
import { X, Check, Loader2 } from 'lucide-react';

// Format existing date to YYYY-MM-DD for standard date input
const formatDateForInput = (dateStr) => {
  if (!dateStr) return '';
  const d = new Date(dateStr);
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const dd = String(d.getDate()).padStart(2, '0');
  return `${yyyy}-${mm}-${dd}`;
};

/**
 * TaskModal Component (100% Mobile & Desktop Responsive):
 * Reusable modal for Creating and Editing a task.
 * State is initialized directly from taskToEdit (paired with React key prop in App.jsx).
 */
export default function TaskModal({ isOpen, onClose, onSave, taskToEdit, isLoading }) {
  const [title, setTitle] = useState(taskToEdit ? taskToEdit.title || '' : '');
  const [description, setDescription] = useState(taskToEdit ? taskToEdit.description || '' : '');
  const [status, setStatus] = useState(taskToEdit ? taskToEdit.status || 'Pending' : 'Pending');
  const [priority, setPriority] = useState(taskToEdit ? taskToEdit.priority || 'Medium' : 'Medium');
  const [dueDate, setDueDate] = useState(taskToEdit ? formatDateForInput(taskToEdit.dueDate) : '');
  const [validationError, setValidationError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) {
      setValidationError('Please enter a task title.');
      return;
    }

    const payload = {
      title: title.trim(),
      description: description.trim(),
      status,
      priority,
      dueDate: dueDate ? new Date(dueDate).toISOString() : null
    };

    onSave(payload);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
      {/* Modal Dialog Card */}
      <div className="bg-white rounded-2xl shadow-xl border border-slate-200 w-full max-w-lg max-h-[92vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="px-4 sm:px-6 py-3.5 sm:py-4 border-b border-slate-100 flex items-center justify-between shrink-0">
          <h2 className="text-base sm:text-lg font-bold text-slate-900">
            {taskToEdit ? 'Edit Task' : 'Create New Task'}
          </h2>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 rounded-lg p-1.5 hover:bg-slate-100 transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Form Body */}
        <form onSubmit={handleSubmit} className="p-4 sm:p-6 space-y-3.5 sm:space-y-4 overflow-y-auto">
          
          {/* Title Field */}
          <div>
            <label className="block text-[11px] sm:text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
              Title <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              autoFocus
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
                if (validationError) setValidationError('');
              }}
              placeholder="e.g., Complete project documentation"
              className={`w-full px-3 sm:px-3.5 py-2 sm:py-2.5 bg-slate-50 border rounded-lg text-sm text-slate-800 placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:bg-white transition-all ${
                validationError
                  ? 'border-rose-300 focus:ring-rose-500'
                  : 'border-slate-200 focus:ring-indigo-500'
              }`}
            />
            {validationError && (
              <p className="mt-1 text-xs text-rose-500 font-medium">{validationError}</p>
            )}
          </div>

          {/* Description Field */}
          <div>
            <label className="block text-[11px] sm:text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
              Description
            </label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Add extra context, subtasks, or notes..."
              className="w-full px-3 sm:px-3.5 py-2 sm:py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-800 placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all resize-none"
            />
          </div>

          {/* Status & Priority Selection: 1 column on mobile, 2 columns on sm+ */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            
            {/* Status Field */}
            <div>
              <label className="block text-[11px] sm:text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                Status
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-indigo-500 bg-white cursor-pointer"
              >
                <option value="Pending">Pending</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
              </select>
            </div>

            {/* Priority Field */}
            <div>
              <label className="block text-[11px] sm:text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                Priority
              </label>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-indigo-500 bg-white cursor-pointer"
              >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
            </div>

          </div>

          {/* Due Date Field */}
          <div>
            <label className="block text-[11px] sm:text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
              Due Date
            </label>
            <input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="w-full px-3 sm:px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-indigo-500 bg-white cursor-pointer"
            />
          </div>

          {/* Footer Action Buttons: Responsive touch targets */}
          <div className="pt-3 sm:pt-4 border-t border-slate-100 flex items-center justify-end gap-2 sm:gap-3">
            <button
              type="button"
              onClick={onClose}
              disabled={isLoading}
              className="px-3.5 sm:px-4 py-2 text-xs sm:text-sm font-medium text-slate-600 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={isLoading}
              className="inline-flex items-center gap-1.5 sm:gap-2 px-4 sm:px-5 py-2 bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white rounded-lg text-xs sm:text-sm font-semibold shadow-xs transition-colors disabled:opacity-50 cursor-pointer"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Saving...</span>
                </>
              ) : (
                <>
                  <Check className="w-4 h-4" />
                  <span>{taskToEdit ? 'Save Changes' : 'Create Task'}</span>
                </>
              )}
            </button>
          </div>

        </form>

      </div>
    </div>
  );
}
