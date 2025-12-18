const todoInput = document.getElementById("todo-input");
const addTaskButton = document.getElementById("add-task-button");
const todoList = document.getElementById("todo-list");

// Load persisted tasks
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// Render saved tasks on load
tasks.forEach((task) => renderTasks(task));

addTaskButton.addEventListener("click", () => {
  const task1 = todoInput.value.trim();
  if (!task1) return;

  const newTask = {
    id: Date.now(),
    text: task1,
    completed: false,
  };

  tasks.push(newTask);
  saveTasks();
  renderTasks(newTask);
  todoInput.value = "";
});

function renderTasks(task) {
  const li = document.createElement("li");
  li.setAttribute("data-id", task.id);

  // Restore completed state
  if (task.completed) li.classList.add("Completed");

  li.innerHTML = `
    <span>${task.text}</span>
    <button>delete</button>
  `;

  // Toggle completion (excluding delete button)
  li.addEventListener("click", (e) => {
    if (e.target.tagName === "BUTTON") return;

    task.completed = !task.completed;
    li.classList.toggle("Completed");
    saveTasks();
  });

  // Delete task
  li.querySelector("button").addEventListener("click", (e) => {
    e.stopPropagation();
    tasks = tasks.filter((t) => t.id !== task.id);
    li.remove();
    saveTasks();
  });

  todoList.appendChild(li);
}

// Persist tasks to localStorage
function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}
