const timeItem = document.getElementById('time');

const now = new Date();
const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
const minTime = new Date(today.getTime() + 19 * 60 * 60 * 1000); // 19:00:00
const maxTime = new Date(today.getTime() + 23 * 60 * 60 * 1000 + 30 * 60 * 1000); // 23:30:00


function closedTime() {
    timeItem.classList.remove('open');
    timeItem.classList.add('closed');
    timeItem.innerHTML = 'Fechado';
}



function closedTime() {
    timeItem.classList.remove('open')
    timeItem.classList.add('closed')
    timeItem.innerHTML = 'Fechado'
}

if (now.getTime() > maxTime || now.getTime() < minTime) {
    closedTime();
}


// // // // // // // // // // // // // // // // // // // 


let btnAdd = document.querySelector('.btn_add');
let foodsOnTheCart = []
let count = document.querySelector('.count')
const modalDiv = document.querySelector('.modal-container')
const cart = document.querySelector('.cart')

window.onclick = (event)=>{
    if(event.target.closest('.close-modal')){
        modalDiv.style ="display:none;"
    }
}

function active_modal(div){
    div.style = "display:flex;"
}

function counter(value){
    count.innerHTML = value
}

function countCart(id){
    let count = foodsOnTheCart.reduce((accumulator, currentValue) =>{
        if (currentValue == id){
            accumulator += 1
        }
        return accumulator
    },0)
    return count
}

function modal(img,name,description,idFood){
    let modalTitle = document.querySelector('.modal-title');
    let modalLogo = document.querySelector('.logo-modal');
    let modalDesc = document.querySelector('.modal-desc');

    modalTitle.innerHTML = name
    btnAdd.value = idFood
    modalLogo.src = img
    modalDesc.innerHTML = description
    count.innerHTML = countCart(idFood)

    active_modal(modalDiv)

}

foods = document.querySelectorAll('.food-item')

foods.forEach(food =>{
    food.addEventListener('click', (event)=>{
        
        let imgSrc = food.querySelector('.food-image').src;
        let foodName = food.querySelector('.food-name')
        let idFood = foodName.id
        foodName = foodName.textContent
        let foodDescription = food.querySelector('.food-description').textContent;

        modal(imgSrc,foodName,foodDescription,idFood)

    })
})


btnAdd.onclick = ()=>{
    foodsOnTheCart.push(btnAdd.value)
    active_modal(cart)
    let count_ = countCart(btnAdd.value) //armazenei o ID no value do botão
    counter(count_)
}


// // // // // // // // // // // // // // 
foodsOnTheCart = [1,2,3,4]

function productsFunc(foods){
    for (item in foods){
        
    }
}

let productsList = document.querySelector('.products-list')

let products = productsFunc(foodsOnTheCart)

productsList.innerHTML = products
