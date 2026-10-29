import React, { useState, useEffect, useCallback, useMemo } from 'react';
import Navbar from './components/Navbar';
import TaskFilters from './components/TaskFilters';
import TaskList from './components/TaskList';
import TaskModal from './components/TaskModal';
import DeleteModal from './components/DeleteModal';
import Toast from './components/Toast';
import { fetchTasks, createTask, updateTask, deleteTask } from './api';
import { AlertCircle, RefreshCw } from 'lucide-react';

/**
 * App Component (100% Mobile & Desktop Responsive):
 * Orchestrates global state, API communication, search, filtering,
 * modal dialogs, and toast notifications.
 */
export default function App() {
  // 1. Task Data State
  const [tasks, setTasks] = useState([]);
  const [allTasksForStats, setAllTasksForStats] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [backendError, setBackendError] = useState(null);

  // 2. Filter & Search States
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [priorityFilter, setPriorityFilter] = useState('All');
  const [sortOrder, setSortOrder] = useState('newest');

  // 3. Modal & Action States
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // 4. Toast Notification State
  const [toast, setToast] = useState(null);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
  };

  // Load all tasks once to calculate global stats independent of active filters
  const loadGlobalStats = useCallback(async () => {
    try {
      const data = await fetchTasks();
      setAllTasksForStats(data);
      setBackendError(null);
    } catch (err) {
      console.error('Failed to load global stats:', err);
    }
  }, []);

  // Fetch filtered tasks based on search, status, priority, and sorting
  const loadTasks = useCallback(async () => {
    setIsLoading(true);
    try {
      const params = {};
      if (search.trim()) params.search = search.trim();
      if (statusFilter !== 'All') params.status = statusFilter;
      if (priorityFilter !== 'All') params.priority = priorityFilter;
      if (sortOrder) params.sort = sortOrder;

      const data = await fetchTasks(params);
      setTasks(data);
      setBackendError(null);
    } catch (err) {
      console.error('Error fetching tasks:', err);
      setBackendError(
        'Unable to connect to the backend server. Make sure the Node.js server is running on port 5000 and MongoDB is connected.'
      );
    } finally {
      setIsLoading(false);
    }
  }, [search, statusFilter, priorityFilter, sortOrder]);

  // Debounced search / filter trigger
  useEffect(() => {
    const timer = setTimeout(() => {
      loadTasks();
    }, 250);

    return () => clearTimeout(timer);
  }, [loadTasks]);

  // Load stats on mount
  useEffect(() => {
    loadGlobalStats();
  }, [loadGlobalStats]);

  // Calculate live statistics for navbar
  const stats = useMemo(() => {
    const total = allTasksForStats.length;
    const pending = allTasksForStats.filter((t) => t.status === 'Pending').length;
    const inProgress = allTasksForStats.filter((t) => t.status === 'In Progress').length;
    const completed = allTasksForStats.filter((t) => t.status === 'Completed').length;
    return { total, pending, inProgress, completed };
  }, [allTasksForStats]);

  // Open modal in Create mode
  const handleOpenCreateModal = () => {
    setTaskToEdit(null);
    setIsTaskModalOpen(true);
  };

  // Open modal in Edit mode
  const handleOpenEditModal = (task) => {
    setTaskToEdit(task);
    setIsTaskModalOpen(true);
  };

  // Save task handler (Create or Update)
  const handleSaveTask = async (taskData) => {
    setIsSubmitting(true);
    try {
      if (taskToEdit) {
        await updateTask(taskToEdit._id, taskData);
        showToast('Task updated successfully!');
      } else {
        await createTask(taskData);
        showToast('New task created successfully!');
      }
      setIsTaskModalOpen(false);
      setTaskToEdit(null);
      loadTasks();
      loadGlobalStats();
    } catch (err) {
      console.error('Failed to save task:', err);
      showToast(err.response?.data?.error || 'Failed to save task. Please try again.', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Open Delete confirmation popup
  const handleOpenDeleteModal = (task) => {
    setTaskToDelete(task);
    setIsDeleteModalOpen(true);
  };

  // Delete task confirmation handler
  const handleDeleteConfirm = async () => {
    if (!taskToDelete) return;
    setIsDeleting(true);
    try {
      await deleteTask(taskToDelete._id);
      showToast('Task deleted successfully!');
      setIsDeleteModalOpen(false);
      setTaskToDelete(null);
      loadTasks();
      loadGlobalStats();
    } catch (err) {
      console.error('Failed to delete task:', err);
      showToast(err.response?.data?.error || 'Failed to delete task.', 'error');
    } finally {
      setIsDeleting(false);
    }
  };

  // Quick status change handler from card dropdown
  const handleQuickStatusChange = async (taskId, newStatus) => {
    try {
      await updateTask(taskId, { status: newStatus });
      showToast(`Status updated to "${newStatus}"!`);
      loadTasks();
      loadGlobalStats();
    } catch (err) {
      console.error('Failed to update status:', err);
      showToast('Could not update task status.', 'error');
    }
  };

  // Reset all filters
  const handleResetFilters = () => {
    setSearch('');
    setStatusFilter('All');
    setPriorityFilter('All');
    setSortOrder('newest');
  };

  const hasActiveFilters =
    search || statusFilter !== 'All' || priorityFilter !== 'All' || sortOrder !== 'newest';

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans">
      {/* 1. Header Navigation (100% Responsive) */}
      <Navbar stats={stats} onOpenCreateModal={handleOpenCreateModal} />

      {/* 2. Main Dashboard Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-7">
        
        {/* Disconnection Banner */}
        {backendError && (
          <div className="mb-4 sm:mb-6 p-3.5 sm:p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 flex items-start justify-between gap-3 shadow-xs">
            <div className="flex items-start gap-2.5 sm:gap-3">
              <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
              <div>
                <h4 className="font-semibold text-xs sm:text-sm">Backend Disconnected</h4>
                <p className="text-[11px] sm:text-xs text-rose-700 mt-0.5">{backendError}</p>
              </div>
            </div>
            <button
              onClick={() => {
                loadTasks();
                loadGlobalStats();
              }}
              className="inline-flex items-center gap-1 px-2.5 sm:px-3 py-1.5 bg-rose-100 hover:bg-rose-200 text-rose-800 rounded-lg text-xs font-semibold transition-colors cursor-pointer shrink-0"
            >
              <RefreshCw className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
              <span>Retry</span>
            </button>
          </div>
        )}

        {/* 3. Search and Filter Bar */}
        <TaskFilters
          search={search}
          setSearch={setSearch}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
          priorityFilter={priorityFilter}
          setPriorityFilter={setPriorityFilter}
          sortOrder={sortOrder}
          setSortOrder={setSortOrder}
          onReset={handleResetFilters}
        />

        {/* 4. Task Grid / List View */}
        <TaskList
          tasks={tasks}
          isLoading={isLoading}
          onEdit={handleOpenEditModal}
          onDelete={handleOpenDeleteModal}
          onStatusChange={handleQuickStatusChange}
          onOpenCreateModal={handleOpenCreateModal}
          hasFilters={hasActiveFilters}
          onResetFilters={handleResetFilters}
        />

      </main>

      {/* 5. Modals & Notifications */}
      <TaskModal
        isOpen={isTaskModalOpen}
        onClose={() => setIsTaskModalOpen(false)}
        onSave={handleSaveTask}
        taskToEdit={taskToEdit}
        isLoading={isSubmitting}
      />

      <DeleteModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDeleteConfirm}
        task={taskToDelete}
        isDeleting={isDeleting}
      />

      <Toast toast={toast} onClose={() => setToast(null)} />
    </div>
  );
}
