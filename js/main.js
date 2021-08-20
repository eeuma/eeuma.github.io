document.addEventListener("DOMContentLoaded", ready);


function ready() {
    //1)
    const nameModal = document.querySelector('.name-modal'),
        postModal = document.querySelector('.post-modal'),
        nameModalButton = document.querySelector('.name-modal__button'),
        postModalButton = document.querySelector('.post-modal__button'),
        postModalClose = document.querySelector('.post-modal__close'),
        clearAllTask = document.querySelector('.clear-all-task'),
        editName = document.querySelector('.edit-name')

    let postID = 0;
    
    nameModal.style.display = "flex"
    
    let userName;

    nameModalButton.addEventListener('click', ()=>{
        userName = document.querySelector('.user-name').value   
        if (userName) {
            nameModal.style.display = "none"

            document.querySelector(".greeting-user").textContent = userName
            
            localStorage.setItem('userName', userName)
        } else {
            document.querySelector('.user-name').style.border = '2px solid red'
        }
    })

    if (localStorage.getItem('userName')) {
        nameModal.style.display = "none"
        document.querySelector(".greeting-user").textContent = localStorage.getItem('userName')
    }

    document.querySelector('.bottom-menu-button').addEventListener('click', ()=>{
        postModal.style.display = 'flex'

        if (userName) {
            nameModal.style.display = "none"

            document.querySelector(".greeting-user").textContent = userName
            
            localStorage.setItem('userName', userName)
        } else {
            document.querySelector('.user-name').style.border = '2px solid red'
        }
    })

    postModalClose.addEventListener('click', ()=>{
        postModal.style.display = 'none'
    })

    let todoList = []

    if (localStorage.getItem('todoList')) {
        todoList = JSON.parse(localStorage.getItem('todoList'))
        showTodo()
    }

    postModalButton.addEventListener('click', ()=> {
        let postName = document.querySelector('.post-name').value

        if (postName) {
            postModal.style.display = 'none'

            let newTodo = {
                name: postName,
                checked: false,
                favorite: false
            }
            todoList.push(newTodo)

            localStorage.setItem('todoList', JSON.stringify(todoList))
            document.querySelector('.post-name').value = ''
            showTodo()
        } else {
            document.querySelector('.post-name').style.border = '2px solid red'
            setTimeout( () => {
                document.querySelector('.post-name').style.border = ''
            }, 2000)
        }
    })

    function showTodo(){
        let newPost = ''

        if (todoList.length > 0) {
            todoList.forEach((item,id)=>{
                newPost +=
                    `
                    <div class="task-card">
                        <input class='task-card-checkbox' type="checkbox" id='item${id}' ${item.checked ? "checked" : ''}>
                        <label for="item${id}" class="task-text">${item.name}</label>
                        
                        <img class="favorite" src="./img/star${item.favorite ? 2 : ''}.svg" alt="favorite-icon">
                        <img class="task-remove" src="./img/delete.svg" alt="trash-icon">
                    </div>
                    `
                document.querySelector('.task-card-container').innerHTML = newPost
            })
        } else {
            document.querySelector('.task-card-container').innerHTML = ''
        }
    }

    document.querySelector('.task-card-container').addEventListener('change', (event)=>{
        let postID = event.target.id,
            postName = document.querySelector('.task-card-container').querySelector(`[for=${postID}]`).textContent

        todoList.forEach( (item) => {
            if (item.name == postName) {
                item.checked = !item.checked;
                localStorage.setItem('todoList', JSON.stringify(todoList))
            }
        })

        if (event.target.checked) {
            event.target.offsetParent.style.opacity = '0.5'
            event.target.offsetParent.style.textDecoration = 'line-through'
        } else {
            event.target.offsetParent.style.opacity = '1'
            event.target.offsetParent.style.textDecoration = 'none'
        }
    })

    document.addEventListener('click', (event)=>{

        // REMOVE
        if (event.target && event.target.className == 'task-remove') {
            let postName = event.target.offsetParent.children[1].textContent

            todoList.forEach( (item, i) => {
                if (item.name == postName) {
                    todoList.splice(i,1)
                    localStorage.setItem('todoList', JSON.stringify(todoList))
                    showTodo()
                }
            })
        }

        //FAVORITE
        if (event.target && event.target.className == 'favorite') {
            let postName = event.target.offsetParent.children[1].textContent

            todoList.forEach( (item, i) => {
                if (item.name == postName) {
                    item.favorite = !item.favorite
                    localStorage.setItem('todoList', JSON.stringify(todoList))
                    showTodo()
                }
            })

        }
    })


    editName.addEventListener('click', ()=>{
        nameModal.style.display = "flex"
    })

    clearAllTask.addEventListener('click', ()=>{
        let archive = {},
            keys = Object.keys(localStorage),
            i = keys.length;

        while ( i-- ) {
            archive[ keys[i] ] = localStorage.getItem( keys[i] );

            if (keys[i] != 'userName') {
                localStorage.removeItem(keys[i])
            }
        }
        todoList = []
        document.querySelectorAll('.task-card').forEach(item=>{
            item.remove()
        })
    })

}