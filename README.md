# 📋 TaskFlow - MERN Stack Task Manager

TaskFlow is a modern, responsive, and full-featured Task Management web application built with the MERN stack (MongoDB, Express.js, React, Node.js) and styled with Tailwind CSS. It allows users to efficiently manage day-to-day tasks with real-time feedback, status tracking, and intuitive filtering.

> **Note:** API endpoints were thoroughly tested using Postman before integrating them with the React frontend.

---

## 🌟 Key Features

- **Task Creation:** Add new tasks with title, description, status, priority, and due dates.
- **Task Updating:** Edit existing tasks seamlessly via a dedicated modal or update status directly from task cards.
- **Task Deletion:** Remove tasks with a safe confirmation popup to prevent accidental data loss.
- **Title & Description Search:** Real-time, debounced search across task titles and descriptions.
- **Status & Priority Filtering:** Filter tasks by status (`Pending`, `In Progress`, `Completed`) and priority (`Low`, `Medium`, `High`).
- **Flexible Sorting:** Sort tasks by Due Date (earliest/latest), Priority (High to Medium to Low), or Creation Date (newest/oldest).
- **100% Responsive Design:** Optimized for mobile phones, tablets, laptops, and desktop screens.

---

## 🛠️ Tech Stack Used

### Frontend
- **React 19 (via Vite):** Declarative, component-based user interface.
- **Tailwind CSS v4:** Modern, utility-first CSS framework for responsive layouts.
- **Lucide React:** Clean and lightweight SVG icon set.
- **Axios:** Promise-based HTTP client for API communication.

### Backend
- **Node.js:** Asynchronous, event-driven JavaScript runtime environment.
- **Express.js:** Fast, minimalist web framework for RESTful routing and middleware.
- **MongoDB:** Scalable NoSQL document database.
- **Mongoose:** Object Data Modeling (ODM) library for schema validation and business logic.
- **dotenv & cors:** Environment variable configuration and cross-origin resource sharing.

---

## ⚙️ Prerequisites & Environment Setup

### Prerequisites
Make sure the following are installed on your machine:
- **Node.js** (v18.0.0 or higher) - [Download Node.js](https://nodejs.org/)
- **npm** (v9.0.0 or higher)
- **MongoDB** (A local MongoDB instance running at `mongodb://127.0.0.1:27017` or a free cloud cluster on [MongoDB Atlas](https://www.mongodb.com/atlas))

### Environment Configuration
Create a `.env` file inside the `backend/` directory:

```bash
# Navigate to the backend directory
cd backend

# Create .env file (or copy from .env.example)
cp .env.example .env
```

Add your environment variables inside `backend/.env`:

```env
# Server Port
PORT=5000

# MongoDB Connection String:
# Cloud MongoDB Atlas:
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/task-manager?retryWrites=true&w=majority

# OR Local MongoDB:
# MONGO_URI=mongodb://127.0.0.1:27017/task-manager
```

---

## 🗄️ Database Schema & Sample Data

### Mongoose Task Schema (`backend/server.js`)

```javascript
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
      enum: ['Pending', 'In Progress', 'Completed'],
      default: 'Pending'
    },
    priority: {
      type: String,
      enum: ['Low', 'Medium', 'High'],
      default: 'Medium'
    },
    dueDate: {
      type: Date,
      default: null
    }
  },
  {
    timestamps: true // Automatically generates createdAt and updatedAt
  }
);
```

### Sample Data (JSON)

#### Example 1: In Progress Task with High Priority
```json
{
  "_id": "67215a3bcce2e1367933b13a",
  "title": "Build Authentication Module",
  "description": "Implement JWT-based user login and registration with bcrypt encryption.",
  "status": "In Progress",
  "priority": "High",
  "dueDate": "2026-11-10T00:00:00.000Z",
  "createdAt": "2026-10-29T15:49:52.535Z",
  "updatedAt": "2026-10-29T16:20:10.120Z",
  "__v": 0
}
```

#### Example 2: Completed Task with Medium Priority
```json
{
  "_id": "67215a3bcce2e1367933b13b",
  "title": "Set Up Tailwind CSS v4",
  "description": "Configure Tailwind with Vite and establish responsive breakpoint layouts.",
  "status": "Completed",
  "priority": "Medium",
  "dueDate": "2026-10-29T00:00:00.000Z",
  "createdAt": "2026-10-29T14:30:00.000Z",
  "updatedAt": "2026-10-29T17:15:22.000Z",
  "__v": 0
}
```

---

## 📡 API Endpoints Documentation

Base URL: `http://localhost:5000/api`

| Method | Endpoint | Description | Request Body / Query Params |
| :--- | :--- | :--- | :--- |
| **GET** | `/health` | Server health check and uptime | None |
| **GET** | `/tasks` | Retrieve tasks with optional search, filter, and sort | Query: `?search=...&status=...&priority=...&sort=...` |
| **GET** | `/tasks/:id` | Retrieve a specific task by its MongoDB `_id` | URL param: `:id` |
| **POST** | `/tasks` | Create a new task | Body: `{ title, description, status, priority, dueDate }` |
| **PUT** | `/tasks/:id` | Update an existing task | Body: fields to update (e.g. `{ status: "Completed" }`) |
| **DELETE** | `/tasks/:id` | Permanently delete a task | URL param: `:id` |

---

## 🚀 Installation & Run Instructions

### 1. Clone & Navigate to Project Directory
```bash
git clone <repository-url>
cd task-manager
```

### 2. Backend Setup & Run
Open a terminal for the backend:

```bash
# 1. Navigate to the backend folder
cd backend

# 2. Install backend dependencies
npm install

# 3. Start backend in development mode (with auto-reload)
npm run dev
```

The backend server will start on **`http://localhost:5000`**.

### 3. Frontend Setup & Run
Open a second terminal for the frontend:

```bash
# 1. Navigate to the frontend folder
cd frontend

# 2. Install frontend dependencies
npm install

# 3. Start frontend development server
npm run dev
```

The frontend client will start on **`http://localhost:5173`**.

Open **`http://localhost:5173`** in your browser to start managing tasks.
