document.addEventListener("DOMContentLoaded", ready);


function ready() {
    //1)
    const nameModal = document.querySelector('.name-modal'),
        postModal = document.querySelector('.post-modal')
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
        postContent = document.querySelector('.post-content')
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


    postModalButton.addEventListener('click', ()=>{
        let postName = document.querySelector('.post-name').value

        if (postName) {
            postModal.style.display = 'none'
            postID = (postID+1)
            const newPost = document.createElement('div')
            newPost.className = 'task-card'
            newPost.innerHTML = `
            <input class='task-card-checkbox' type="checkbox">

            <div id=${postID} class="task-text"> ${postName} </div>

            <img class="task-remove" src="./img/delete.svg" alt="trash-icon">
            `
            document.querySelector('.task-card-container').append(newPost)
            localStorage.setItem(postName+postID, postName)
        } else {
            document.querySelector('.post-name').style.border = '2px solid red'
        }
        
    })

    document.addEventListener('click', (event)=>{
        if(event.target && event.target.className == 'task-remove') {
            postID = event.target.offsetParent.children[1].id
            
            if (localStorage.getItem(event.target.offsetParent.outerText+(postID))) {
                localStorage.removeItem(event.target.offsetParent.outerText+(postID))
            }

            event.target.offsetParent.remove()

        }

        if(event.target && event.target.className == 'task-card-checkbox') {

            if (event.target.checked) {
                
                event.target.offsetParent.style.opacity = 0.5
                event.target.offsetParent.style.textDecoration = 'line-through'
            } else {
                
                event.target.offsetParent.style.opacity = 1
                event.target.offsetParent.style.textDecoration = 'none'
   
            }
        }

        
    })


    function allStorage() {

        let archive = {}, 
            keys = Object.keys(localStorage),
            i = keys.length;
    
        while ( i-- ) {
            archive[ keys[i] ] = localStorage.getItem( keys[i] );

            if (keys[i] != 'userName') {

                storageID = keys[i].replace(/\D/g, '')

                document.querySelector('.task-card-container').innerHTML +=
                    `   <div class="task-card">

                            <input class='task-card-checkbox' type="checkbox">
                            <div id=${storageID} class="task-text"> ${localStorage.getItem( keys[i])} </div>
                            
                            <img class="task-remove" src="./img/delete.svg" alt="trash-icon">
                            
                        </div>
                    `
            }
        }
    }

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
        document.querySelectorAll('.task-card').forEach(item=>{
            item.remove()
        })
    })
    
    allStorage()
        
    //2)
}