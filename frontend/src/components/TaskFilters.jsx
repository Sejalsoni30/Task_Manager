import React from 'react';
import { Search, X, Filter, ArrowUpDown, RotateCcw } from 'lucide-react';

/**
 * TaskFilters Component (100% Responsive):
 * - Mobile (<640px): Full-width search bar on top, followed by a clean 2-column grid
 *   of filters and sorting controls for effortless thumb-tapping.
 * - Tablet & Desktop (>=1024px): Horizontal flex layout with flexible search bar
 *   and inline controls.
 */
export default function TaskFilters({
  search,
  setSearch,
  statusFilter,
  setStatusFilter,
  priorityFilter,
  setPriorityFilter,
  sortOrder,
  setSortOrder,
  onReset
}) {
  const hasActiveFilters =
    search || statusFilter !== 'All' || priorityFilter !== 'All' || sortOrder !== 'newest';

  return (
    <div className="bg-white p-3.5 sm:p-4 rounded-xl border border-slate-200 shadow-xs mb-5 sm:mb-6">
      <div className="flex flex-col lg:flex-row gap-3 items-stretch lg:items-center justify-between">
        
        {/* 1. Search Input Field (Full-width on mobile, flex-1 on desktop) */}
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
            <Search className="w-4 h-4" />
          </div>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by title or description..."
            className="w-full pl-9 pr-9 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-800 placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all"
            aria-label="Search tasks"
          />
          {search && (
            <button
              onClick={() => setSearch('')}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 cursor-pointer"
              title="Clear search query"
              aria-label="Clear search"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* 2. Filter & Sort Controls Grid/Flex */}
        {/* Mobile: 2-column grid; Desktop: single flex row */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:flex items-center gap-2">
          
          {/* Status Dropdown */}
          <div className="relative col-span-1">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full lg:w-auto px-2.5 sm:px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs sm:text-sm font-medium text-slate-700 focus:outline-hidden focus:ring-2 focus:ring-indigo-500 bg-white cursor-pointer"
              aria-label="Filter tasks by status"
            >
              <option value="All">All Statuses</option>
              <option value="Pending">Pending</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>
          </div>

          {/* Priority Dropdown */}
          <div className="relative col-span-1">
            <select
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value)}
              className="w-full lg:w-auto px-2.5 sm:px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs sm:text-sm font-medium text-slate-700 focus:outline-hidden focus:ring-2 focus:ring-indigo-500 bg-white cursor-pointer"
              aria-label="Filter tasks by priority"
            >
              <option value="All">All Priorities</option>
              <option value="High">High Priority</option>
              <option value="Medium">Medium Priority</option>
              <option value="Low">Low Priority</option>
            </select>
          </div>

          {/* Sort Dropdown */}
          <div className="relative col-span-2 sm:col-span-1">
            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
              className="w-full lg:w-auto px-2.5 sm:px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs sm:text-sm font-medium text-slate-700 focus:outline-hidden focus:ring-2 focus:ring-indigo-500 bg-white cursor-pointer"
              aria-label="Sort tasks order"
            >
              <option value="newest">Sort by: Newest First</option>
              <option value="oldest">Sort by: Oldest First</option>
              <option value="dueDate_asc">Sort by Due Date (Earliest)</option>
              <option value="dueDate_desc">Sort by Due Date (Latest)</option>
              <option value="priority_desc">Sort by Priority (High to Medium to Low)</option>
              <option value="priority_asc">Sort by Priority (Low to Medium to High)</option>
            </select>
          </div>

          {/* Reset Filters Button */}
          {hasActiveFilters && (
            <button
              onClick={onReset}
              className="col-span-2 sm:col-span-3 lg:col-span-1 px-3 py-2 text-xs sm:text-sm font-medium text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-lg flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
              title="Reset all search filters"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset</span>
            </button>
          )}

        </div>

      </div>
    </div>
  );
}
