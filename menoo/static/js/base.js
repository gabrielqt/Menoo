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
    // Verifica se o clique foi fora do menu e do botão
    if (!sideMenu.contains(event.target) && !sideButton.contains(event.target)) {
        sideMenu.classList.remove('active-side');
    }
});