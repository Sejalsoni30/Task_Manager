import React from 'react';
import { Calendar, Edit3, Trash2, CheckCircle2, Clock, PlayCircle } from 'lucide-react';

/**
 * TaskCard Component (100% Mobile & Desktop Responsive):
 * Displays an individual task item with priority badges, status, due date,
 * quick completion toggle, edit, and delete action buttons.
 * Optimized with comfortable touch targets for mobile thumb interaction.
 */
export default function TaskCard({ task, onEdit, onDelete, onStatusChange }) {
  const isCompleted = task.status === 'Completed';

  // Format due date into a human-readable string (e.g., Oct 30, 2026)
  const formatDueDate = (dateStr) => {
    if (!dateStr) return null;
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  // Determine if a task is overdue (dueDate is in the past and status is not Completed)
  const isOverdue = () => {
    if (!task.dueDate || isCompleted) return false;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const dueDate = new Date(task.dueDate);
    return dueDate < today;
  };

  // Priority badge styling helper
  const getPriorityBadge = (priority) => {
    switch (priority) {
      case 'High':
        return 'bg-rose-50 text-rose-700 border-rose-200';
      case 'Medium':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'Low':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      default:
        return 'bg-slate-50 text-slate-700 border-slate-200';
    }
  };

  // Status badge styling helper
  const getStatusBadge = (status) => {
    switch (status) {
      case 'Completed':
        return {
          classes: 'bg-emerald-50 text-emerald-700 border-emerald-200',
          icon: <CheckCircle2 className="w-3.5 h-3.5" />
        };
      case 'In Progress':
        return {
          classes: 'bg-blue-50 text-blue-700 border-blue-200',
          icon: <PlayCircle className="w-3.5 h-3.5" />
        };
      case 'Pending':
      default:
        return {
          classes: 'bg-slate-100 text-slate-700 border-slate-200',
          icon: <Clock className="w-3.5 h-3.5" />
        };
    }
  };

  const statusInfo = getStatusBadge(task.status);

  return (
    <div
      className={`bg-white rounded-xl border transition-all duration-200 p-4 sm:p-5 flex flex-col justify-between hover:shadow-md ${
        isCompleted
          ? 'border-emerald-200 bg-emerald-50/20'
          : 'border-slate-200 hover:border-indigo-300'
      }`}
    >
      <div>
        {/* Top Header: Status Badges & Quick Status Selector */}
        <div className="flex items-center justify-between gap-2 mb-3">
          
          <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
            {/* Status Badge */}
            <span
              className={`inline-flex items-center gap-1 px-2 sm:px-2.5 py-0.5 rounded-full text-[11px] sm:text-xs font-semibold border ${statusInfo.classes}`}
            >
              {statusInfo.icon}
              {task.status}
            </span>

            {/* Priority Badge */}
            <span
              className={`inline-flex items-center px-2 sm:px-2.5 py-0.5 rounded-full text-[11px] sm:text-xs font-semibold border ${getPriorityBadge(
                task.priority
              )}`}
            >
              {task.priority} Priority
            </span>
          </div>

          {/* Quick Status Dropdown */}
          <select
            value={task.status}
            onChange={(e) => onStatusChange(task._id, e.target.value)}
            className="text-[11px] sm:text-xs bg-slate-50 border border-slate-200 rounded-md px-2 py-1 text-slate-700 font-medium focus:outline-hidden focus:ring-1 focus:ring-indigo-500 cursor-pointer shrink-0"
            title="Change status"
            aria-label="Change status"
          >
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
        </div>

        {/* Task Title */}
        <h3
          className={`text-sm sm:text-base font-semibold text-slate-900 leading-snug break-words ${
            isCompleted ? 'line-through text-slate-400' : ''
          }`}
        >
          {task.title}
        </h3>

        {/* Task Description */}
        {task.description && (
          <p
            className={`mt-1.5 sm:mt-2 text-xs sm:text-sm text-slate-600 line-clamp-3 whitespace-pre-line break-words ${
              isCompleted ? 'text-slate-400' : ''
            }`}
          >
            {task.description}
          </p>
        )}
      </div>

      {/* Card Footer: Due Date & Action Buttons */}
      <div className="mt-4 sm:mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
        
        {/* Due Date Indicator */}
        <div className="flex items-center gap-1.5 min-w-0">
          {task.dueDate ? (
            <span
              className={`inline-flex items-center gap-1 font-medium truncate ${
                isOverdue()
                  ? 'text-rose-600 font-semibold bg-rose-50 px-2 py-0.5 rounded-md border border-rose-200 text-[11px]'
                  : 'text-slate-600'
              }`}
            >
              <Calendar className="w-3.5 h-3.5 shrink-0" />
              <span>{formatDueDate(task.dueDate)}</span>
              {isOverdue() && <span className="text-[10px] font-bold uppercase tracking-wider">(Overdue)</span>}
            </span>
          ) : (
            <span className="text-slate-400 italic text-[11px]">No due date</span>
          )}
        </div>

        {/* Action Buttons: Edit & Delete */}
        <div className="flex items-center gap-1 shrink-0">
          <button
            onClick={() => onEdit(task)}
            className="p-1.5 sm:p-2 text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors cursor-pointer"
            title="Edit Task"
            aria-label="Edit Task"
          >
            <Edit3 className="w-4 h-4" />
          </button>
          
          <button
            onClick={() => onDelete(task)}
            className="p-1.5 sm:p-2 text-slate-500 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
            title="Delete Task"
            aria-label="Delete Task"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
}
