const input = document.querySelector('.input-task__input');
const btn = document.querySelector('.input-task__button');
const ul = document.querySelector('.tasks__tasks-to-do .tasks__tasks-to-do__item');
const ulDone = document.querySelector('.tasks__tasks-done .tasks__tasks-to-do__item');

const data = (localStorage.getItem('tasks')) ? JSON.parse(localStorage.getItem('tasks')) : {
    taskList: [],
    taskListDone: []
};

renderStorageTasks()

btn.addEventListener('click', function (e) {
    if (input.value) {
        addEvent();
    }
});

input.addEventListener('keydown', function (e) {
    if (input.value) {
        if (e.key === 'Enter') {
            addEvent();
        }
    }
});

function addEvent() {
    data.taskList.push(input.value);
    addTasks(input.value, ul);
    input.value = '';
}

function removeTask() {
    const li = this.parentNode.parentNode.parentNode.parentNode;
    const text = this.parentNode.childNodes[0].innerText;

    li.className === 'tasks__tasks-to-do' ? data.taskList.splice(data.taskList.indexOf(text), 1) : data.taskListDone.splice(data.taskListDone.indexOf(text), 1)

    this.parentNode.remove();
    renderTasks();
}

function completeTasks() {
    li = this.parentNode.parentNode.parentNode.parentNode;
    text = this.parentNode.childNodes[0].innerText;
    if (li.className === 'tasks__tasks-to-do') {
        data.taskListDone.push(text);
        data.taskList.splice(data.taskList.indexOf(text), 1)
        this.parentNode.remove();
        ulDone.insertBefore(this.parentNode, ulDone.childNodes[0]);
    } else {
        data.taskList.push(text);
        data.taskListDone.splice(data.taskListDone.indexOf(text), 1)
        this.parentNode.remove();
        ul.insertBefore(this.parentNode, ul.childNodes[0]);
    }
    renderTasks();
}

function renderTasks() {
    localStorage.setItem('tasks', JSON.stringify(data));
}

function renderStorageTasks() {
    for (i = 0; i < data.taskList.length; i++) {
        addTasks(data.taskList[i], ul)
    }
    for (i = 0; i < data.taskListDone.length; i++) {
        addTasks(data.taskListDone[i], ulDone)
    }
}

function addTasks(value, element) {
    const li = document.createElement('li');
    li.classList.add('tasks__tasks-to-do__link');

    const remove = document.createElement('i');
    remove.classList.add('far', 'fa-trash-alt');

    const complete = document.createElement('i');
    complete.classList.add('far', 'fa-check-circle');

    const p = document.createElement('p');
    p.innerText = value;

    li.appendChild(p);
    li.appendChild(remove);
    li.appendChild(complete);

    remove.addEventListener('click', removeTask);

    complete.addEventListener('click', completeTasks);

    element ? element.insertBefore(li, element.childNodes[0]) : ul.insertBefore(li, ul.childNodes[0]);

    renderTasks();
}