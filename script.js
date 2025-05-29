const addBtn = document.getElementById("addBtn");
const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");

addBtn.addEventListener("click", addTask);

function addTask() {
  const taskText = taskInput.value.trim();
  if (taskText === "") return;

  const li = document.createElement("li");
  li.innerHTML = `
    ${taskText}
    <span class="delete-btn" onclick="removeTask(this)">×</span>
  `;
  taskList.appendChild(li);
  taskInput.value = "";
}

function removeTask(btn) {
  btn.parentElement.remove();
}
