
const input = document.getElementById("input");
const list = document.getElementsByTagName("ul")[0];
document.getElementById("add").addEventListener("click", ()=> {add(input.value)});
input.addEventListener("keypress", () => event.key == "Enter" ? add(input.value) : null);

function add(task) {
    if (task != "" && task != null) {
        const taskLi = `<li>
                        <p onclick="strike()">&#9679; ${task}</p> 
                        <i class="icon-remove" onclick="remove()"></i>
                     </li>`
        list.innerHTML += taskLi;
        input.value = "";
    }
}

function strike() {
    event.target.classList.toggle("strike");
}

function remove() {
    list.removeChild(event.path[1]);
}