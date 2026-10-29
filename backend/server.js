/**
 * ==============================================================================
 * Task Manager Backend - server.js
 * ==============================================================================
 * A clean, beginner-friendly Express.js server connected to MongoDB using Mongoose.
 * Provides RESTful CRUD API endpoints for managing tasks with validation,
 * search, and filtering capabilities.
 * ==============================================================================
 */

// Step 1: Import required modules
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dns = require('dns');
require('dotenv').config();

// Fix for Windows / ISP DNS resolution issues with MongoDB Atlas SRV connection strings
// Setting Google Public DNS ensures querySrv does not fail with ECONNREFUSED
try {
  dns.setServers(['8.8.8.8', '8.8.4.4']);
} catch (dnsErr) {
  console.warn('DNS server configuration warning:', dnsErr.message);
}

// Step 2: Initialize Express application
const app = express();

// Step 3: Configure Middleware
// cors: Allows requests from different domains/ports (e.g., React on port 5173)
app.use(cors());

// express.json(): Parses incoming HTTP request bodies with JSON payloads
app.use(express.json());

// Step 4: Connect to MongoDB Database
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/task-manager';

mongoose
  .connect(MONGO_URI, { dbName: 'task-manager' })
  .then(() => {
    console.log('✅ Connected to MongoDB successfully!');
  })
  .catch((err) => {
    console.error('❌ MongoDB Connection Error:', err.message);
    console.log('💡 Tip: Verify your MONGO_URI, username, password, or IP whitelist in MongoDB Atlas.');
  });

// Step 5: Define Task Schema and Model
// Mongoose schemas define the structure of documents within a MongoDB collection
const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Task title is required'],
      trim: true,
      maxlength: [120, 'Title cannot exceed 120 characters']
    },
    description: {
      type: String,
      trim: true,
      default: ''
    },
    status: {
      type: String,
      enum: {
        values: ['Pending', 'In Progress', 'Completed'],
        message: '{VALUE} is not a supported status'
      },
      default: 'Pending'
    },
    priority: {
      type: String,
      enum: {
        values: ['Low', 'Medium', 'High'],
        message: '{VALUE} is not a supported priority'
      },
      default: 'Medium'
    },
    dueDate: {
      type: Date,
      default: null
    }
  },
  {
    // Automatically creates `createdAt` and `updatedAt` timestamps
    timestamps: true
  }
);

// Create the Task Model from the schema
const Task = mongoose.model('Task', taskSchema);

// ==============================================================================
// REST API ROUTES
// ==============================================================================

/**
 * Health check route: Verify server is running
 * GET /api/health
 */
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'ok', uptime: process.uptime() });
});

/**
 * Route 1: Get all tasks with optional search, status/priority filters, and sorting
 * GET /api/tasks?search=meeting&status=Pending&priority=High&sort=dueDate_asc
 */
app.get('/api/tasks', async (req, res) => {
  try {
    const { search, status, priority, sort } = req.query;

    // Build the query object dynamically based on provided query parameters
    const query = {};

    // 1. Search by title or description (case-insensitive regular expression)
    if (search && search.trim() !== '') {
      query.$or = [
        { title: { $regex: search.trim(), $options: 'i' } },
        { description: { $regex: search.trim(), $options: 'i' } }
      ];
    }

    // 2. Filter by status (Pending, In Progress, Completed)
    if (status && status !== 'All') {
      query.status = status;
    }

    // 3. Filter by priority (Low, Medium, High)
    if (priority && priority !== 'All') {
      query.priority = priority;
    }

    // Determine sorting order (default: newest first)
    let sortOptions = { createdAt: -1 };
    if (sort === 'dueDate_asc') {
      sortOptions = { dueDate: 1 };
    } else if (sort === 'dueDate_desc') {
      sortOptions = { dueDate: -1 };
    } else if (sort === 'oldest') {
      sortOptions = { createdAt: 1 };
    } else if (sort === 'newest') {
      sortOptions = { createdAt: -1 };
    }

    const tasks = await Task.find(query).sort(sortOptions);
    return res.status(200).json(tasks);
  } catch (error) {
    console.error('Error fetching tasks:', error);
    return res.status(500).json({ error: 'Failed to retrieve tasks', details: error.message });
  }
});

/**
 * Route 2: Get a single task by ID
 * GET /api/tasks/:id
 */
app.get('/api/tasks/:id', async (req, res) => {
  try {
    const { id } = req.params;

    // Validate MongoDB ObjectId format
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'Invalid Task ID format' });
    }

    const task = await Task.findById(id);
    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }

    return res.status(200).json(task);
  } catch (error) {
    console.error('Error fetching task by ID:', error);
    return res.status(500).json({ error: 'Server error while fetching task' });
  }
});

/**
 * Route 3: Create a new task
 * POST /api/tasks
 * Body: { title, description, status, priority, dueDate }
 */
app.post('/api/tasks', async (req, res) => {
  try {
    const { title, description, status, priority, dueDate } = req.body;

    // Validation: Title must not be empty
    if (!title || typeof title !== 'string' || title.trim() === '') {
      return res.status(400).json({ error: 'Task title is required and cannot be empty' });
    }

    // Prepare task payload
    const taskData = {
      title: title.trim(),
      description: description ? description.trim() : '',
      status: status || 'Pending',
      priority: priority || 'Medium',
      dueDate: dueDate ? new Date(dueDate) : null
    };

    // Instantiate and save document in MongoDB
    const newTask = new Task(taskData);
    const savedTask = await newTask.save();

    return res.status(201).json(savedTask);
  } catch (error) {
    console.error('Error creating task:', error);
    // Handle validation errors from Mongoose
    if (error.name === 'ValidationError') {
      return res.status(400).json({ error: error.message });
    }
    return res.status(500).json({ error: 'Failed to create task', details: error.message });
  }
});

/**
 * Route 4: Update an existing task
 * PUT /api/tasks/:id
 * Body: { title, description, status, priority, dueDate }
 */
app.put('/api/tasks/:id', async (req, res) => {
  try {
    const { id } = req.params;

    // Validate MongoDB ObjectId format
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'Invalid Task ID format' });
    }

    // Title validation if present in request body
    if (req.body.title !== undefined && (!req.body.title || req.body.title.trim() === '')) {
      return res.status(400).json({ error: 'Task title cannot be empty' });
    }

    // Prepare fields to update
    const updates = { ...req.body };
    if (updates.title) updates.title = updates.title.trim();
    if (updates.description) updates.description = updates.description.trim();
    if (updates.dueDate) updates.dueDate = new Date(updates.dueDate);

    // Update document and return the modified version ({ new: true })
    // runValidators ensures Mongoose enum and length validations run on update
    const updatedTask = await Task.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true
    });

    if (!updatedTask) {
      return res.status(404).json({ error: 'Task not found to update' });
    }

    return res.status(200).json(updatedTask);
  } catch (error) {
    console.error('Error updating task:', error);
    if (error.name === 'ValidationError') {
      return res.status(400).json({ error: error.message });
    }
    return res.status(500).json({ error: 'Failed to update task', details: error.message });
  }
});

/**
 * Route 5: Delete a task
 * DELETE /api/tasks/:id
 */
app.delete('/api/tasks/:id', async (req, res) => {
  try {
    const { id } = req.params;

    // Validate MongoDB ObjectId format
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'Invalid Task ID format' });
    }

    const deletedTask = await Task.findByIdAndDelete(id);

    if (!deletedTask) {
      return res.status(404).json({ error: 'Task not found to delete' });
    }

    return res.status(200).json({
      message: 'Task deleted successfully',
      taskId: id
    });
  } catch (error) {
    console.error('Error deleting task:', error);
    return res.status(500).json({ error: 'Failed to delete task', details: error.message });
  }
});

// Step 6: 404 Route Handler for undefined endpoints
app.use((req, res) => {
  res.status(404).json({ error: `Cannot ${req.method} ${req.originalUrl}` });
});

// Step 7: Start the Express Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Task Manager API server running on http://localhost:${PORT}`);
});
