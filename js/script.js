const names = document.querySelector(".names")
const signOut = document.querySelector(".signOut")
const title = document.querySelector(".title")
const description = document.querySelector(".description")
const image = document.querySelector(".image")
const addToDo = document.querySelector(".addToDo")
const error = document.querySelector(".error")

const container = document.querySelector(".row")



window.addEventListener("load", () => {
    const currentUser =JSON.parse(localStorage.getItem("currentUser"))
    
    names.innerHTML = currentUser.name;
})


window.addEventListener("load", () => {
    if(!localStorage.getItem("access_token")  || localStorage.getItem("access_token") === "false"){

        window.open("../auth.html", "_self")
    }
})


signOut.addEventListener("click", (e) => {
    e.preventDefault()

    localStorage.setItem("currentUser", null)
    localStorage.setItem("access_token", false)

    window.open("../auth.html", "_self")
})


window.addEventListener("load", () => {
    if(!localStorage.getItem("todo")){
        localStorage.setItem("todo", JSON.stringify([]))
    }else{
        const todos = JSON.parse(localStorage.getItem("todo"))
        const toDoWithID = todos.map((item, index) => {
            return{...item, id: index}
        })
        
        localStorage.setItem("todo" , JSON.stringify(toDoWithID))

        const newTodos = JSON.parse(localStorage.getItem("todo"))

        cardTemplate(newTodos)
    }
})

addToDo.addEventListener("click", (e) => {
    e.preventDefault();
    if(title.value !== "" && description.value!=="" && image.value !== "" ){
        const allTodo = JSON.parse(localStorage.getItem("todo"))

        localStorage.setItem("todo", JSON.stringify(
            [
                ...allTodo,
                {
                    title:title.value,
                    description:description.value,
                    image:image.value
                }
            ]
        ))

        window.location.reload()

    }else{
        error.innerHTML = "Все поля должны быть заполнены!"
    }
})

function cardTemplate(base) {
    const template = base.map(({title, image, description, id}) => {
        return `
        <div class="todo_card">
        <h2>${title}</h2>

        <img src=${image}>

        <p>
            ${description}
        </p>

        <div class="inline_buttons">
            <button onclick = "editTodo(${id})">Edit</button>
            <button onclick = "deleteTodo(${id})">Delete</button>
        </div>
            
        </div>
        `
    }) .join(" ")

    container.innerHTML = template;
}

function deleteTodo(id){
    console.log(id)
    const todo = JSON.parse(localStorage.getItem("todo"))

    const filtered = todo.filter(item => item.id !== id)

    localStorage.setItem("todo", JSON.stringify(filtered))

    window.location.reload()
}
       


function editTodo(id){
    const todo = JSON.parse(localStorage.getItem("todo"))

    const changes = todo.map(item => {
        if(item.id === id){
            return{
                ...item,
                title: prompt("Change title"),
                description: prompt("Change description")
            }
        }else{
            return item
        }
    })
    localStorage.setItem("todo",JSON.stringify(changes))
    window.location.reload();
}
 