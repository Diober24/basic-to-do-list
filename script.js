document.addEventListener("DOMContentLoaded", () => {
    const addBtn = document.getElementById("addBtn");
    const taskInput = document.getElementById("taskInput");
    const taskList = document.getElementById("taskList");

    // Load existing tasks
    loadTasks();

    addBtn.addEventListener("click", addTask);
    taskInput.addEventListener("keypress", (e) => {
        if (e.key === "Enter") {
            addTask();
        }
    });

    function addTask() {
        const taskText = taskInput.value.trim();
        if (taskText === "") return; // Early return for empty input

        createTaskElement(taskText);
        saveTask(taskText);
        taskInput.value = "";
    }

    function removeTask(btn) {
        const li = btn.parentElement;
        const taskText = li.querySelector('.task-content span')?.textContent;
        
        // Only proceed with deletion if there's actual text content
        if (taskText) {
            deleteTask(taskText);
            li.remove();
        }
    }

    function createTaskElement(taskText) {
        const li = document.createElement("li");
        
        // Create task content container
        const taskContent = document.createElement("div");
        taskContent.className = "task-content";
        
        // Create and set up the image
        const img = document.createElement("img");
        img.src = "img/icon-circle.png";
        img.alt = "task icon";
        img.className = "task-icon";
        
        const textSpan = document.createElement("span");
        textSpan.textContent = taskText;
        
        const deleteBtn = document.createElement("span");
        deleteBtn.className = "delete-btn";
        deleteBtn.textContent = "×";
        deleteBtn.onclick = function() { removeTask(this); };
        
        // Add click handler for completion
        taskContent.onclick = function() {
            textSpan.classList.toggle("completed");
            img.classList.toggle("completed");
            if (img.classList.contains("completed")) {
                img.src = "img/icon-check.png";
            } else {
                img.src = "img/icon-circle.png";
            }
            saveTaskStatus(taskText, textSpan.classList.contains("completed"));
        };
        
        // Append elements
        taskContent.appendChild(img);
        taskContent.appendChild(textSpan);
        li.appendChild(taskContent);
        li.appendChild(deleteBtn);
        taskList.appendChild(li);

        const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
        const taskData = tasks.find(t => t.text === taskText);
        if (taskData && taskData.completed) {
            textSpan.classList.add("completed");
            img.classList.add("completed");
            img.src = "img/icon-check.png";
        }
    }

    function saveTask(taskText) {
        let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
        tasks.push({ text: taskText, completed: false });
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }

    function saveTaskStatus(taskText, completed) {
        let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
        tasks = tasks.map(task => {
            if (task.text === taskText) {
                return { ...task, completed };
            }
            return task;
        });
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }

    function deleteTask(taskText) {
        let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
        tasks = tasks.filter(task => task.text !== taskText);
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }

    function loadTasks() {
        const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
        // Filter out any empty tasks before loading
        const validTasks = tasks.filter(task => task.text && task.text.trim());
        
        // Update storage with clean data
        localStorage.setItem("tasks", JSON.stringify(validTasks));
        
        // Load only valid tasks
        validTasks.forEach(task => createTaskElement(task.text));
    }
});
