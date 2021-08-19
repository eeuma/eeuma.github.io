document.addEventListener("DOMContentLoaded", ready);


function ready() {
    //1)
    const nameModal = document.querySelector('.name-modal'),
        postModal = document.querySelector('.post-modal')
        nameModalButton = document.querySelector('.name-modal__button'),
        postModalButton = document.querySelector('.post-modal__button'),
        postModalClose = document.querySelector('.post-modal__close')
    
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

            document.querySelector('.task-card-container').innerHTML += `
            <div class="task-card">
            <input class='task-card-checkbox' type="checkbox">
            <div class="task-text"> ${postName} </div>
            </div>`
        } else {
            document.querySelector('.post-name').style.border = '2px solid red'
        }
        console.log(2)

    })
    //2)
}