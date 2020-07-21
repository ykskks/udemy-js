const form = document.querySelector("#task-form");
const taskList = document.querySelector(".collection");
const clearBtn = document.querySelector(".clear-tasks");
const filter = document.querySelector("#filter");
const taskInput = document.querySelector("#task");

loadEventListeners();

function loadEventListeners() {
    document.addEventListener("DOMContentLoaded", getTasks);
    form.addEventListener("submit", addTask);
    taskList.addEventListener("click", removeTask);
    clearBtn.addEventListener("click", clearTasks);
    filter.addEventListener("keyup", filterTasks);
}

function getTasks(e) {
    if (localStorage.getItem('tasks') === null) {
        return false;
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
        tasks.forEach(task => {
            const li = document.createElement("li");
            li.className = "collection-item";
            li.appendChild(document.createTextNode(task));

            const link = document.createElement("a");
            link.className = "delete-item secondary-content";
            link.innerHTML = '<i class="fa fa-remove"></i>';

            li.appendChild(link);
            taskList.appendChild(li);
        })
    }
}


function addTask(e) {
    if (taskInput.value === "") {
        alert("Add a task!");

        // added myself
        e.preventDefault();
        return false;
    }

    const li = document.createElement("li");
    li.className = "collection-item";
    // li.innerText = taskInput.value;
    // li.textContent = taskInput.value;
    li.appendChild(document.createTextNode(taskInput.value));

    const link = document.createElement("a");
    link.className = "delete-item secondary-content";
    link.innerHTML = '<i class="fa fa-remove"></i>';

    li.appendChild(link);
    taskList.appendChild(li);

    storeTaskInLocalStorage(taskInput.value);

    taskInput.value = "";

    e.preventDefault();
}

function storeTaskInLocalStorage(task) {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));

}

function removeTask(e) {
    if (e.target.parentElement.classList.contains("delete-item")) {
        if (confirm("Are you sure you want to remove task?")) {
            e.target.parentElement.parentElement.remove();

            removeTaskFromLocalStorage(e.target.parentElement.parentElement);
        }
    }
}

function removeTaskFromLocalStorage(taskItem) {
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.forEach(function (task, index) {
        if (taskItem.textContent === task) {
            tasks.splice(index, 1);
        }
    })
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function clearTasksFromStorage() {
    // localStorage.clear()
    localStorage.removeItem("tasks");
}


function clearTasks(e) {
    if (confirm("Are you sure you want to clear all tasks?")) {
        taskList.innerHTML = "";
        clearTasksFromStorage();
    }
    // while (taskList.firstChild) {
    //     taskList.lastChild.remove();
    // }
}

function filterTasks(e) {
    const text = e.target.value.toLowerCase();
    document.querySelectorAll(".collection-item").forEach(task => {
        taskName = task.innerText.toLowerCase();
        // if (taskName.includes(text)) {
        if (taskName.indexOf(text) != -1) {
            task.style.display = "block"
        } else {
            task.style.display = "none"
        }
    }
    )
}