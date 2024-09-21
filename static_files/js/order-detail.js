let numberDOM = document.querySelector('.numberphone')
let number = numberDOM.textContent

let NewNumber = `(${number.slice(1,3)}) ${number.slice(3,8)} - ${number.slice(8)}`
numberDOM.innerHTML = `<i class="bi bi-phone-fill"></i>&nbsp` + NewNumber

const btnFinish = document.querySelector('.finish-order');
const modal = document.querySelector('.modal');
const btnNot = document.querySelector('.not-finish');

btnFinish.addEventListener('click', () => {
    modal.style = "display:flex;"
})

btnNot.addEventListener('click', () => {
    modal.style = "display:none;"
})