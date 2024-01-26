// First let's select the form ID
let form = document.getElementById("form");

// Adding a submit event to the form
// Grab the task, grab what s alreadt in the local storage, and then update it with the new task
form.addEventListener('submit', function() {
    let task = document.querySelector("#task").value;
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  
    tasks.unshift(task);
    localStorage.setItem("tasks", JSON.stringify(tasks))
});


// Create a function to show the tasks on the screen
function showTasks() {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    let list = document.querySelector(".main-section ul");
    
    list.innerHTML = "";


    // Using iterators:
        tasks.forEach((item, idx) => {
        let newLi = document.createElement("li");
        let newSpan1 = document.createElement("span");
        let newSpan2 = document.createElement("span");

        newSpan1.innerHTML = item;
        newLi.id = idx;

        let delBtn = document.createElement("button");
        delBtn.innerHTML = "Delete";
        delBtn.className = "del-btn";
        newSpan2.appendChild(delBtn);


        let editBtn = document.createElement("button");
        editBtn.innerHTML = "Edit";
        editBtn.classList.add("edit-btn");
        newSpan2.appendChild(editBtn);

        newLi.appendChild(newSpan1);
        newLi.appendChild(newSpan2);

        list.appendChild(newLi);
    });

    delElements();
    editElements();

}

showTasks();


// Create a function to delete items from local storage and screen
function delElements() {

    let delBtn = document.querySelectorAll(".del-btn");
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    // Delete button
    for (let i = 0; i < delBtn.length; i++) {

        delBtn[i].addEventListener('click', function() {
            let removed = tasks.splice(i, 1);
            localStorage.setItem('tasks', JSON.stringify(tasks))

            
            showTasks();
        })
    }
    
}




// Create a function to edit the task on the screen and on the local storage

function editElements() {
    let editBtn = document.querySelectorAll(".edit-btn");
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    for (let i = 0; i < editBtn.length; i++) {

        editBtn[i].addEventListener('click', function(event) {
            let currentTask = tasks[i];
            event.target.parentElement.parentElement.innerHTML = `
            <input type="text" value="${currentTask}">
            <button id="${i}" class="update">Update</button>`
        })
    }
    update();
}



function update() {
    let ul = document.querySelector(".main-section ul");
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    ul.addEventListener('click', function(event) {
        if (event.target.className.includes("update")) {
            let updatedTask = event.target.previousElementSibling.value;
            let idx = Number(event.target.id)

            tasks.splice(idx, 1, updatedTask);
            localStorage.setItem('tasks', JSON.stringify(tasks));
            showTasks()
        }
        
    })
}

