# CodeAlpha - Project Management Tool

A full-stack task management web application built for the **CodeAlpha Full Stack Development Internship**. Users can create tasks, assign priority levels, update task status dynamically, and delete completed entries with persistent SQLite storage[cite: 2].

---

## 🚀 Features

- **Task Creation**: Add new tasks with detailed titles, descriptions, and priority levels[cite: 2].
- **Status Tracking**: Toggle tasks between pending and completed states in real-time[cite: 2].
- **Data Persistence**: Complete RESTful CRUD operations backed by an SQLite relational database[cite: 2].

---

## 🛠️ Tech Stack

- **Frontend**: HTML5, CSS3, JavaScript (DOM Manipulation, Async Fetch API)
- **Backend**: Node.js, Express.js (REST API Architecture)
- **Database**: SQLite3 (Relational Task Schema)
- **Development Environment**: GitHub Codespaces, Git

---

## 📡 REST API Endpoints

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/tasks` | Fetches all tasks[cite: 1] |
| `POST` | `/api/tasks` | Creates a new task entry[cite: 1] |
| `PUT` | `/api/tasks/:id` | Updates task status[cite: 1] |
| `DELETE` | `/api/tasks/:id` | Deletes a task from the database[cite: 1] |

---

## 💻 How to Run Locally

1. **Clone repository:**
   ```bash
   git clone [https://github.com/stargirlg/CodeAlpha_ProjectManagementTool.git](https://github.com/stargirlg/CodeAlpha_ProjectManagementTool.git)
   cd CodeAlpha_ProjectManagementTool
