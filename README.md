# 📋 TaskFlow - MERN Stack Task Manager

A complete, modern, and beginner-friendly full-stack **Task Manager** web application built with MongoDB, Express.js, React, and Node.js (MERN), styled with Tailwind CSS.

---

## 🌟 Features

- **Full CRUD Functionality:** Create, Read, Update, and Delete tasks in real-time.
- **Task Schema:**
  - `title` (required string, trimmed)
  - `description` (optional text)
  - `status` (`Pending`, `In Progress`, `Completed`)
  - `priority` (`Low`, `Medium`, `High`)
  - `dueDate` (date selector with "Overdue" detection)
- **Live Search & Filters:**
  - Real-time case-insensitive keyword search on title and description.
  - Filter tasks dynamically by status and priority.
  - Sort by newest, oldest, or due date (earliest/latest).
- **Interactive UI:**
  - Modern dashboard with live status counter badges (Total, Pending, In Progress, Completed).
  - Quick status dropdown directly on each task card.
  - Safe deletion modal with confirmation before permanent removal.
  - Reusable modal dialog for both task creation and editing.
  - Auto-dismissing toast notifications for immediate user feedback.

---

## 🏗️ Project Structure

```text
task-manager/
├── backend/
│   ├── .env                 # Environment variables (PORT, MONGO_URI)
│   ├── .env.example         # Template for environment variables
│   ├── package.json         # Backend dependencies & scripts
│   └── server.js            # Express server, MongoDB connection, & REST API routes
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx       # Header with app branding & live task statistics
│   │   │   ├── TaskFilters.jsx  # Search bar, status/priority dropdowns, sort controls
│   │   │   ├── TaskList.jsx     # Responsive grid & empty-state handlers
│   │   │   ├── TaskCard.jsx     # Task card item with priority/status tags & actions
│   │   │   ├── TaskModal.jsx    # Create/Edit task modal dialog with validation
│   │   │   ├── DeleteModal.jsx  # Delete confirmation popup
│   │   │   └── Toast.jsx        # Success/Error alert notifications
│   │   ├── api.js           # Centralized Axios client for backend endpoints
│   │   ├── App.jsx          # Main React state orchestration
│   │   ├── main.jsx         # React application entry point
│   │   └── index.css        # Tailwind CSS imports
│   ├── index.html           # HTML template
│   ├── vite.config.js       # Vite + Tailwind configuration
│   └── package.json         # Frontend dependencies & scripts
└── README.md                # Project documentation & setup instructions
```

---

## ⚙️ Prerequisites

Make sure you have the following installed on your machine:
- **Node.js** (v18.x or later recommended — check with `node -v`)
- **npm** (v9.x or later — check with `npm -v`)
- **MongoDB**: Either a free cloud cluster on [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) or a local MongoDB community server running at `mongodb://127.0.0.1:27017`.

---

## 🚀 Environment Setup & Installation

### 1. Backend Setup

1. Open a terminal and navigate to the `backend` folder:
   ```bash
   cd backend
   ```

2. Install backend dependencies (if not already installed):
   ```bash
   npm install
   ```

3. Create or verify your `.env` file in the `backend/` folder:
   ```env
   PORT=5000
   MONGO_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/task-manager?retryWrites=true&w=majority
   ```
   > **Note for Local MongoDB:** If you are using local MongoDB, set:
   > `MONGO_URI=mongodb://127.0.0.1:27017/task-manager`

4. Start the backend server:
   ```bash
   # Development mode with auto-reload (Node 18+)
   npm run dev

   # Or standard production mode:
   npm start
   ```
   The backend will start on **`http://localhost:5000`**.

---

### 2. Frontend Setup

1. Open a second terminal window and navigate to the `frontend` folder:
   ```bash
   cd frontend
   ```

2. Install frontend dependencies:
   ```bash
   npm install
   ```

3. Start the Vite development server:
   ```bash
   npm run dev
   ```
   The frontend application will run on **`http://localhost:5173`**.

---

## 📡 REST API Reference

| Method | Endpoint | Description | Query / Body Parameters |
| :--- | :--- | :--- | :--- |
| **GET** | `/api/tasks` | Get all tasks (supports search, filter, and sorting) | `?search=term&status=Pending&priority=High&sort=newest` |
| **GET** | `/api/tasks/:id` | Get a specific task by its MongoDB `_id` | URL param `id` |
| **POST** | `/api/tasks` | Create a new task | JSON body: `{ title, description, status, priority, dueDate }` |
| **PUT** | `/api/tasks/:id` | Update an existing task | JSON body: fields to update |
| **DELETE** | `/api/tasks/:id` | Permanently delete a task | URL param `id` |
| **GET** | `/api/health` | Health check route | Returns `{ status: 'ok', uptime }` |

