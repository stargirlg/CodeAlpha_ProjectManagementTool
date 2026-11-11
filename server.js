const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));

const db = new sqlite3.Database('./tasks.db', (err) => {
  if (err) console.error('Database error:', err);
  else console.log('SQLite database connected.');
});

// Setup Tasks Table
db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS tasks (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT,
    description TEXT,
    priority TEXT,
    status TEXT DEFAULT 'Pending',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )`);
});

// API Routes
app.get('/api/tasks', (req, res) => {
  db.all("SELECT * FROM tasks ORDER BY id DESC", [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

app.post('/api/tasks', (req, res) => {
  const { title, description, priority } = req.body;
  if (!title) return res.status(400).json({ error: "Title required" });
  
  db.run("INSERT INTO tasks (title, description, priority) VALUES (?, ?, ?)", 
    [title, description, priority || 'Medium'], 
    function(err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ message: "Task created!", taskId: this.lastID });
    }
  );
});

app.put('/api/tasks/:id', (req, res) => {
  const { status } = req.body;
  db.run("UPDATE tasks SET status = ? WHERE id = ?", [status, req.params.id], function(err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: "Task updated!" });
  });
});

app.delete('/api/tasks/:id', (req, res) => {
  db.run("DELETE FROM tasks WHERE id = ?", [req.params.id], function(err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: "Task deleted!" });
  });
});

app.listen(PORT, () => console.log(`Project Management app running at http://localhost:${PORT}`));