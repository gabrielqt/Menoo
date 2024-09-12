let numberDOM = document.querySelector('.numberphone')
let number = numberDOM.textContent

let NewNumber = `(${number.slice(1,3)}) ${number.slice(3,8)} - ${number.slice(8)}`
numberDOM.innerHTML = `<i class="bi bi-phone-fill"></i>&nbsp` + NewNumber