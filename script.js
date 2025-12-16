const input = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let editIndex = null;

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function renderTasks() {
  taskList.innerHTML = "";

  tasks.forEach((task, index) => {
    const card = document.createElement("div");
    card.className = "task-card" + (task.completed ? " completed" : "");

    card.innerHTML = `
      <div class="task-left">
        <input type="checkbox" ${task.completed ? "checked" : ""}
          onclick="toggleTask(${index})">
        <span class="task-text" onclick="viewTask(${index})">
          ${task.text}
        </span>
      </div>

      <div class="actions">
        <span class="edit" onclick="editTask(${index})">✏️</span>
        <span class="delete" onclick="deleteTask(${index})">🗑</span>
      </div>
    `;

    taskList.appendChild(card);
  });
}

addBtn.addEventListener("click", () => {
  const value = input.value.trim();
  if (!value) return;

  if (editIndex === null) {
    tasks.push({ text: value, completed: false });
  } else {
    tasks[editIndex].text = value;
    editIndex = null;
    addBtn.textContent = "Add";
  }

  input.value = "";
  saveTasks();
  renderTasks();
});

function toggleTask(index) {
  tasks[index].completed = !tasks[index].completed;
  saveTasks();
  renderTasks();
}

function deleteTask(index) {
  tasks.splice(index, 1);
  saveTasks();
  renderTasks();
}

function editTask(index) {
  input.value = tasks[index].text;
  editIndex = index;
  addBtn.textContent = "Update";
}

function viewTask(index) {
  const status = tasks[index].completed ? "Completed" : "Not Completed";
  alert(`Task: ${tasks[index].text}\nStatus: ${status}`);
}

renderTasks();
