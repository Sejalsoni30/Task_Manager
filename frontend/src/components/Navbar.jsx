import React from 'react';
import { CheckSquare, Plus, Clock, PlayCircle, CheckCircle, ListTodo } from 'lucide-react';

/**
 * Navbar Component (100% Mobile & Desktop Responsive):
 * - Mobile (<640px): Brand on the left, "+ New Task" button on the right;
 *   Compact 4-column stats grid underneath for quick status tracking on phones.
 * - Tablet & Desktop (>=640px): Seamless single-row layout with stats pills
 *   and action button side-by-side.
 */
export default function Navbar({ stats, onOpenCreateModal }) {
  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-xs">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-3 sm:py-3.5">
        
        {/* Main Row: Brand on left, "+ New Task" button on right */}
        <div className="flex items-center justify-between gap-3">
          
          {/* Logo & Brand Title */}
          <div className="flex items-center space-x-2.5 sm:space-x-3 min-w-0">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-500 flex items-center justify-center text-white shadow-md shadow-indigo-100 shrink-0">
              <CheckSquare className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <div className="truncate">
              <div className="flex items-center gap-1.5 sm:gap-2">
                <h1 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight">
                  TaskFlow
                </h1>
                <span className="text-[10px] sm:text-xs px-1.5 sm:px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700 font-semibold border border-indigo-200">
                  MERN
                </span>
              </div>
              <p className="text-[11px] sm:text-xs text-slate-500 hidden sm:block">
                Organize, track, and complete your tasks
              </p>
            </div>
          </div>

          {/* Desktop Stats + Button Container */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* Desktop Stats (hidden on mobile, visible on sm and up) */}
            <div className="hidden md:flex items-center gap-2 text-xs">
              <div className="px-2.5 py-1.5 rounded-lg bg-slate-100 text-slate-700 font-medium flex items-center gap-1.5 border border-slate-200">
                <ListTodo className="w-3.5 h-3.5 text-slate-500" />
                <span className="font-semibold">Total:</span> {stats.total}
              </div>

              <div className="px-2.5 py-1.5 rounded-lg bg-amber-50 text-amber-800 font-medium flex items-center gap-1.5 border border-amber-200">
                <Clock className="w-3.5 h-3.5 text-amber-600" />
                <span>Pending:</span> {stats.pending}
              </div>

              <div className="px-2.5 py-1.5 rounded-lg bg-blue-50 text-blue-800 font-medium flex items-center gap-1.5 border border-blue-200">
                <PlayCircle className="w-3.5 h-3.5 text-blue-600" />
                <span>Active:</span> {stats.inProgress}
              </div>

              <div className="px-2.5 py-1.5 rounded-lg bg-emerald-50 text-emerald-800 font-medium flex items-center gap-1.5 border border-emerald-200">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                <span>Done:</span> {stats.completed}
              </div>
            </div>

            {/* "+ New Task" Action Button */}
            <button
              onClick={onOpenCreateModal}
              className="inline-flex items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white rounded-lg text-xs sm:text-sm font-semibold shadow-xs transition-colors cursor-pointer shrink-0"
              aria-label="Create New Task"
            >
              <Plus className="w-4 h-4" />
              <span>New Task</span>
            </button>

          </div>

        </div>

        {/* Mobile Stats Row: Visible on phones & small tablets (< md) */}
        <div className="grid grid-cols-4 gap-1.5 sm:gap-2 mt-2.5 pt-2.5 border-t border-slate-100 md:hidden">
          
          <div className="bg-slate-100 border border-slate-200 rounded-lg py-1.5 px-2 text-center">
            <span className="block text-[10px] text-slate-500 font-medium">Total</span>
            <span className="text-xs sm:text-sm font-bold text-slate-800">{stats.total}</span>
          </div>

          <div className="bg-amber-50 border border-amber-200 rounded-lg py-1.5 px-2 text-center">
            <span className="block text-[10px] text-amber-700 font-medium">Pending</span>
            <span className="text-xs sm:text-sm font-bold text-amber-900">{stats.pending}</span>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg py-1.5 px-2 text-center">
            <span className="block text-[10px] text-blue-700 font-medium">Active</span>
            <span className="text-xs sm:text-sm font-bold text-blue-900">{stats.inProgress}</span>
          </div>

          <div className="bg-emerald-50 border border-emerald-200 rounded-lg py-1.5 px-2 text-center">
            <span className="block text-[10px] text-emerald-700 font-medium">Done</span>
            <span className="text-xs sm:text-sm font-bold text-emerald-900">{stats.completed}</span>
          </div>

        </div>

      </div>
    </header>
  );
}
