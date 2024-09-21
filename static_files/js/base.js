let sideButton = document.querySelector('.side-button')
let sideMenu = document.querySelector('.side-menu')

function menu_side () {
    sideMenu.classList.toggle('active-side')
}

sideButton.onclick = (event) => {
    if (!event.target.closest('.side-menu')){
        sideMenu.classList.add('active-side')
    }
}

window.addEventListener('click', (event) => {
    if (!sideMenu.contains(event.target) && !sideButton.contains(event.target) && sideMenu.classList.contains('active-side')) {
        sideMenu.classList.remove('active-side')
        sideMenu.classList.add('deactive-side')
        setTimeout(()=>{
            sideMenu.classList.remove('deactive-side')
        },300)
    }
});
