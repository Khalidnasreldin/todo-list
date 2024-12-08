let task = document.querySelector("#task");
let description = document.querySelector("#description");
let date = document.querySelector("#date");
let priority = document.querySelector("#priority");
let submit = document.querySelector("button");

let state = 'create';
let tempId;

let tasksList = [];
if (localStorage.task != null) {
    tasksList = JSON.parse(localStorage.task);
}
submit.addEventListener('click', function() {
    let newTask = {
        task:task.value,
        description:description.value,
        date:date.value,
        priority:priority.value,
    }
    if (state == 'create') {
        tasksList.push(newTask);
    } else {
        tasksList[tempId] = newTask;
        state = 'create';
        submit.innerText = 'create';
    }
    localStorage.setItem('task', JSON.stringify(tasksList));
    displayTasks();
    clearInputs();
})

function clearInputs() {
    task.value = '';
    description.value = '';
    date.value = '';
    priority.value = '';
}

function displayTasks() {
    let tableBody = "";
    for (let i = 0; i < tasksList.length; i++) {
        tableBody += `
                    <tr>
                        <td>${i}</td>
                        <td>${tasksList[i].task}</td>
                        <td>${tasksList[i].description}</td>
                        <td>${tasksList[i].date}</td>
                        <td>${tasksList[i].priority}</td>
                        <td><img src="assets/icons/edit.png" id="update" onclick="updateTask(${i})" alt="icon"></td>
                        <td><img src="assets/icons/delete.png" id="delete" onclick="deleteTask(${i})" alt="icon"></td>
                    </tr>
                 `;
    }
    document.getElementById("tableBody").innerHTML = tableBody;
}
displayTasks();

function updateTask(taskId) {
    task.value = tasksList[taskId].task;
    description.value = tasksList[taskId].description;
    priority.value = tasksList[taskId].priority;

    submit.innerText = 'update';
    state = 'update';
    tempId = taskId;
    scroll({
        top:0,
        behavior:"smooth",
    })
}

function deleteTask(taskId) {
    tasksList.splice(taskId,1);
    localStorage.task = JSON.stringify(tasksList);
    displayTasks();
}