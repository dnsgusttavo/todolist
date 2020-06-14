//Getting elements
const input = document.getElementById("input");
const list = document.getElementsByTagName("ul")[0];

//Event listeners that are activated on submit text
document.getElementById("add").addEventListener("click", ()=> {add(input.value.toUpperCase())});
input.addEventListener("keypress", () => event.key == "Enter" ? add(input.value.toUpperCase()) : null);

let tasks = []; //Array that contain the tasks to store in cache
let taskLi; //Variable that contains the list item structures

//Get the tasks stored in cache on load
window.addEventListener("load", ()=> {

    //Creates a local storage if does not exists
    if(localStorage.getItem("tasks") == null)
        localStorage.setItem("tasks", []);
    
    //Gets local cache only if  it have data
    if(localStorage.getItem("tasks") != "")
        tasks = JSON.parse(localStorage.getItem("tasks"));
    
    //When window loads, reads the data in cache and displays it on screen
    tasks.forEach(task => {
        add(task.name,task.striked)
        list.innerHTML += taskLi;
    });
})

//Function to add a new task
function add(task,striked) {

    //Sets local variables
    let text; //Stores the task name in tag format
    let addThis = true; //Variable to check if this task already been added and prevent duplication

    //Verify if the task was finished
    striked ? text = `<p onclick="strike()" class="strike">${task}</p> ` : text = `<p onclick="strike()">${task}</p> `;

    //If the solicitation of new task don't be null, starts the add process
    if (task != "" && task != null) {

        //checks if task already exists
        for (const item of tasks) {
            if(item.name == task){
                addThis = false;
                break;
            }     
        }

        //Defines the html structure of task
        taskLi = `<li>
                    <span> <p>&#9679;<p> ${text}</span>
                    <i class="icon-remove" onclick="remove()" title="${task}"></i>
                  </li>`

        //If task does not exists, inserts it on array, save it in cache and displays on screen
        if(addThis){
            tasks.push({name: task, striked: (striked || false)});
            localStorage.setItem("tasks", JSON.stringify(tasks));
            list.innerHTML += taskLi;
            input.value = "";
        }      
    }
}

//Function to add or remove strike in task text
function strike() {
    //Toggles the strike status
    event.target.classList.toggle("strike");

    //Gets the task name by event target
    let taskName = event.target.innerHTML
    
    //Search by task in task array and changes the strike status
    tasks.forEach(element => {
        if(element.name == taskName){
            let index = tasks.indexOf(element) //Gets index of task (Ex: 2)
            let item = tasks[index].striked //Gets strike status in task in task array, based in task index obtained previously
            tasks[index].striked = !item; //Toggle strike status
        }      
    });

    //Saves array modified in cache
    localStorage.setItem("tasks", JSON.stringify(tasks));

}

//Function to remove task
function remove() {

    //Removes the <li> on screen
    list.removeChild(event.path[1]);

    //Get task name using contained on the attribute "title" of <i> tag
    let taskName = event.path[0].title

    //Search by task in task array and remove this
    tasks.forEach(element => {
        if(element.name == taskName)
            tasks.splice(tasks.indexOf(element),1);          
    });

    //Saves array modified in cache
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

//Function to clear cache if it is necessary
function clearCache(){
    localStorage.setItem("tasks", []);
    window.location.href = window.location.href;
}