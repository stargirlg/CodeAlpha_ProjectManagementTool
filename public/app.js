async function loadTasks() {
  const res = await fetch('/api/tasks');
  const tasks = await res.json();
  const list = document.getElementById('taskList');
  list.innerHTML = '';

  tasks.forEach(task => {
    list.innerHTML += `
      <div class="task-item ${task.status}">
        <div class="task-info">
          <h4>${task.title} <small>(${task.priority})</small></h4>
          <p>${task.description || 'No description'}</p>
          <small>Status: <strong>${task.status}</strong></small>
        </div>
        <div class="actions">
          ${task.status !== 'Completed' ? `<button class="btn-complete" onclick="updateTask(${task.id}, 'Completed')">Done</button>` : ''}
          <button class="btn-delete" onclick="deleteTask(${task.id})">Delete</button>
        </div>
      </div>
    `;
  });
}

async function addTask() {
  const title = document.getElementById('title').value;
  const description = document.getElementById('description').value;
  const priority = document.getElementById('priority').value;

  if (!title) return alert("Title is required!");

  await fetch('/api/tasks', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title, description, priority })
  });

  document.getElementById('title').value = '';
  document.getElementById('description').value = '';
  loadTasks();
}

async function updateTask(id, status) {
  await fetch(`/api/tasks/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ status })
  });
  loadTasks();
}

async function deleteTask(id) {
  await fetch(`/api/tasks/${id}`, { method: 'DELETE' });
  loadTasks();
}

loadTasks();