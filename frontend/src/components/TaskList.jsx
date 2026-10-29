import React from 'react';
import TaskCard from './TaskCard';
import { ClipboardList, Plus, SearchX, Loader2 } from 'lucide-react';

/**
 * TaskList Component (100% Mobile & Desktop Responsive):
 * - Mobile: 1-column stack with optimized compact card spacing
 * - Tablet: 2-column grid (md:grid-cols-2)
 * - Desktop & Laptops: 3-column responsive grid (lg:grid-cols-3)
 */
export default function TaskList({
  tasks,
  isLoading,
  onEdit,
  onDelete,
  onStatusChange,
  onOpenCreateModal,
  hasFilters,
  onResetFilters
}) {
  // 1. Loading State
  if (isLoading) {
    return (
      <div className="py-16 sm:py-24 text-center">
        <Loader2 className="w-8 h-8 sm:w-10 sm:h-10 animate-spin text-indigo-600 mx-auto mb-3 sm:mb-4" />
        <p className="text-sm sm:text-base text-slate-600 font-medium">Loading your tasks...</p>
      </div>
    );
  }

  // 2. Empty State (No search results)
  if (tasks.length === 0 && hasFilters) {
    return (
      <div className="bg-white rounded-2xl border border-dashed border-slate-300 p-6 sm:p-12 text-center my-4 sm:my-6">
        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 mx-auto mb-3 sm:mb-4">
          <SearchX className="w-5 h-5 sm:w-6 sm:h-6" />
        </div>
        <h3 className="text-base sm:text-lg font-semibold text-slate-800">No matching tasks found</h3>
        <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-sm mx-auto">
          Try adjusting your search terms or clearing active filters to see your tasks.
        </p>
        <button
          onClick={onResetFilters}
          className="mt-4 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs sm:text-sm font-semibold transition-colors cursor-pointer"
        >
          Clear All Filters
        </button>
      </div>
    );
  }

  // 3. Empty State (No tasks in database at all)
  if (tasks.length === 0) {
    return (
      <div className="bg-white rounded-2xl border border-dashed border-slate-300 p-8 sm:p-12 text-center my-4 sm:my-6">
        <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-600 mx-auto mb-3 sm:mb-4">
          <ClipboardList className="w-6 h-6 sm:w-8 sm:h-8" />
        </div>
        <h3 className="text-base sm:text-lg font-bold text-slate-900">No tasks created yet</h3>
        <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-sm mx-auto">
          Stay organized and productive! Create your first task to get started on your workflow.
        </p>
        <button
          onClick={onOpenCreateModal}
          className="mt-4 sm:mt-5 inline-flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs sm:text-sm font-semibold shadow-xs transition-colors cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Create Your First Task</span>
        </button>
      </div>
    );
  }

  // 4. Responsive Grid of Task Cards
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-4 lg:gap-5">
      {tasks.map((task) => (
        <TaskCard
          key={task._id}
          task={task}
          onEdit={onEdit}
          onDelete={onDelete}
          onStatusChange={onStatusChange}
        />
      ))}
    </div>
  );
}
