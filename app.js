const btn = document.querySelector(".hovero");
const todoList = document.getElementById("mytodolist");
const todoAdd = document.getElementById("todoadd");

btn.addEventListener("click", addTask);
todoList.addEventListener("click", removeTask);
document.addEventListener("DOMContentLoaded", getTodos);

// Add a new Item
function addTask() {
    var listItem = document.createElement("li");
    listItem.className = "list-group-item ro-md-3";
    todoList.appendChild(listItem);

    var mainDiv = document.createElement("div");
    mainDiv.classList.add("todo-item");
    listItem.appendChild(mainDiv);

    var secondDiv = document.createElement("div");
    secondDiv.classList.add("secondiv");
    mainDiv.appendChild(secondDiv);
    var text = document.createElement("p");
    text.className = "h4 myText";
    text.innerText = todoAdd.value;
    secondDiv.appendChild(text);

    //Add todo to localstorage
    saveToLocal(todoAdd.value);

    var thirdDiv = document.createElement("div");
    thirdDiv.classList.add("thirdiv");
    mainDiv.appendChild(thirdDiv);

    var okay = document.createElement("button");
    okay.className = "btn btn-success addspace";
    thirdDiv.appendChild(okay);

    var okayIcon = document.createElement("i");
    okayIcon.className = "glyphicon glyphicon-ok";
    okay.appendChild(okayIcon);

    var trashed = document.createElement("button");
    trashed.className = "btn btn-danger";
    thirdDiv.appendChild(trashed);

    var trashIcon = document.createElement("i");
    trashIcon.className = "glyphicon glyphicon-trash";
    trashed.appendChild(trashIcon);

    todoAdd.value = "";
}

// function for removing and checking completed items
function removeTask(e) {
    const x = e.target;
    //delete item
    if (x.classList.contains("btn-danger")) {
        const parentX = x.parentElement.closest("li");
        removeLocalTodo(parentX);
        console.log(parentX);
        parentX.remove();
    }
    // check an item
    else if (x.classList.contains("btn-success")) {
        const miniParent = x.closest("li");
        const normalParent = miniParent.childNodes;
        const allDiv = normalParent[0].childNodes[0];
        allDiv.childNodes[0].classList.toggle("checked-task");
    }
}

function saveToLocal(myItem) {
    let item;
    //check if there is already local storage
    if (localStorage.getItem("item") === null) {
        item = [];
    } else {
        item = JSON.parse(localStorage.getItem("item"));
    }

    item.push(myItem);
    localStorage.setItem("item", JSON.stringify(item));
}

if (window.matchMedia("(min-width: 375px) and (max-width: 375px)").matches) {
    todoAdd.maxLength = "20";
} else if (window.matchMedia("(min-width: 410px) and (max-width: 414px)").matches) {
    todoAdd.maxLength = "25";
}

function getTodos() {
    let item;
    //check is something exist in localstorage
    if (localStorage.getItem("item") === null) {
        item = [];
    } else {
        item = JSON.parse(localStorage.getItem("item"));
    }

    item.forEach(function (todo) {
        var listItem = document.createElement("li");
        listItem.className = "list-group-item ro-md-3";
        todoList.appendChild(listItem);

        var mainDiv = document.createElement("div");
        mainDiv.classList.add("todo-item");
        listItem.appendChild(mainDiv);

        var secondDiv = document.createElement("div");
        secondDiv.classList.add("secondiv");
        mainDiv.appendChild(secondDiv);
        var text = document.createElement("p");
        text.className = "h4 myText";
        text.innerText = todo;
        secondDiv.appendChild(text);

        var thirdDiv = document.createElement("div");
        thirdDiv.classList.add("thirdiv");
        mainDiv.appendChild(thirdDiv);

        var okay = document.createElement("button");
        okay.className = "btn btn-success addspace";
        thirdDiv.appendChild(okay);

        var okayIcon = document.createElement("i");
        okayIcon.className = "glyphicon glyphicon-ok";
        okay.appendChild(okayIcon);

        var trashed = document.createElement("button");
        trashed.className = "btn btn-danger";
        thirdDiv.appendChild(trashed);

        var trashIcon = document.createElement("i");
        trashIcon.className = "glyphicon glyphicon-trash";
        trashed.appendChild(trashIcon);
    });
}

function removeLocalTodo(todo) {
    let item;
    //check if found in localstorage
    if (localStorage.getItem("item") === null) {
        item = [];
    } else {
        item = JSON.parse(localStorage.getItem("item"));
    }

    const todoIndex = todo.innerText;
    item.splice(item.indexOf(todoIndex), 1);
    localStorage.setItem("item", JSON.stringify(item));
}
