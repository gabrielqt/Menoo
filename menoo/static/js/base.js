let sideButton = document.querySelector('.side-button')
let sideMenu = document.querySelector('.side-menu')

sideButton.onclick = () =>{
    menu_side();
}

function menu_side () {
    sideMenu.classList.toggle('active-side')
}