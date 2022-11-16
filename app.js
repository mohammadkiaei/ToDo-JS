// Declare DOM
let table = document.querySelector('table')
let taskInput = document.querySelector('#taskInput')
let taskButton = document.querySelector('#taskButton')
let tableBody = document.querySelector('table tbody')

function getAllTasks() {
    let tasks = JSON.parse(localStorage.getItem('tasks'))
    if (!tasks) {
        return []
    } else {
        return tasks
    }
};

function addTask(title) {
    let tasks = getAllTasks()
    let id;
    if (tasks.length == 0) {
        id = 1
    } else {
        id = tasks[tasks.length - 1].id + 1
    }
    tasks.push({
        id,
        title
    })
    localStorage.setItem('tasks', JSON.stringify(tasks))
};



taskInput.addEventListener('keyup', event => {
    if (event.keyCode == 13) {
        addTaskHandler()
    }
});



function deleteTask(id) {
    let tasks = getAllTasks()
    let length = tasks.length
    tasks = tasks.filter(function (task) {
        return task.id != id
    })
    localStorage.setItem('tasks', JSON.stringify(tasks))
    return tasks.length != length;
};

function renderTable() {
    let tasks = getAllTasks()
    let html = ''
    let index = 1
    for (task of tasks) {
        html += `
        <tr>
            <td> ${index} </td>
            <td> ${task.title}</td>
            <td><button type="button" class="delete" id="delete-${task.id}">X</button>
        </tr>`
        index++
    }
    tableBody.innerHTML = html
};

function addTaskHandler() {
    if (taskInput.value == '') {
        return;
    }
    addTask(taskInput.value)
    taskInput.value = ''
    renderTable()
};

taskButton.addEventListener('click', () => {
    addTaskHandler()
})

table.addEventListener('click', function (event) {
    let target = event.target
    if (target.classList.contains('delete')) {
        let id = target.id.substr(7)
        deleteTask(id)
        renderTable()
    }
});

renderTable()

// Developed By SeyedMohammadMahdi Kiaei