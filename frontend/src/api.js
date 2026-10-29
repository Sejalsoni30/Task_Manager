import axios from 'axios';

/**
 * Configure Axios base URL.
 * Defaults to 'http://localhost:5000/api' if no environment variable is provided.
 */
const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json'
  }
});

/**
 * Fetch tasks with optional filters:
 * @param {Object} params - { search, status, priority, sort }
 */
export const fetchTasks = async (params = {}) => {
  const response = await API.get('/tasks', { params });
  return response.data;
};

/**
 * Create a new task:
 * @param {Object} taskData - { title, description, status, priority, dueDate }
 */
export const createTask = async (taskData) => {
  const response = await API.post('/tasks', taskData);
  return response.data;
};

/**
 * Update an existing task by ID:
 * @param {string} id - The MongoDB _id of the task
 * @param {Object} updates - Fields to update
 */
export const updateTask = async (id, updates) => {
  const response = await API.put(`/tasks/${id}`, updates);
  return response.data;
};

/**
 * Delete a task by ID:
 * @param {string} id - The MongoDB _id of the task
 */
export const deleteTask = async (id) => {
  const response = await API.delete(`/tasks/${id}`);
  return response.data;
};

export default API;

