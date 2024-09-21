const btnFinish = document.querySelector('.finish-order');
const modal = document.querySelector('.modal-menu');
const btnNot = document.querySelector('.not-finish');

btnFinish.addEventListener('click', () => {
    modal.style = "display:flex;"
})

btnNot.addEventListener('click', () => {
    modal.style = "display:none;"
})