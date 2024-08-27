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
let foodsOnTheCartObj = {}
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

function modal(img,name,description,idFood,price){
    let modalTitle = document.querySelector('.modal-title');
    let modalLogo = document.querySelector('.logo-modal');
    let modalDesc = document.querySelector('.modal-desc');
    let modalPrice = document.querySelector('.modal-price')

    modalTitle.innerHTML = name
    btnAdd.value = idFood
    btnAdd.name = name
    modalLogo.src = img
    modalDesc.innerHTML = description
    modalPrice.innerHTML = price
    count.innerHTML = countCart(idFood)

    active_modal(modalDiv)

}

foods = document.querySelectorAll('.food-item')

foods.forEach(food =>{
    food.addEventListener('click', (event)=>{
        
        let imgSrc = food.querySelector('.food-image').src;
        let foodName = food.querySelector('.food-name')
        let idFood = foodName.id
        let price = food.querySelector('.price').textContent;
        console.log(price)
        foodName = foodName.textContent
        let foodDescription = food.querySelector('.food-description').textContent;

        modal(imgSrc,foodName,foodDescription,idFood, price)

    })
})


btnAdd.onclick = ()=>{
    // I stored the idFood on btn.value and nameFood on btn.name
    foodsOnTheCart.push(Number(btnAdd.value))
    foodsOnTheCartObj[btnAdd.value] = btnAdd.name
    active_modal(cart)
    let count_ = countCart(btnAdd.value) 
    counter(count_)
    productsList.innerHTML = productsFunc(foodsOnTheCart)
    assignListeners()
}


// // // // // // // // // // // // // // 


function productsFunc(foods){
    foods.sort((a,b) => a-b);
    listHtml = '';
    for (item of foods){
        listHtml +=         `<li>
        ${foodsOnTheCartObj[item]} <button class="pop" value="${item}"><i class="bi bi-trash"></i></button>
        </li>`
    }
    return listHtml
}

let productsList = document.querySelector('.products-list')




function assignListeners() {
    popBtns = document.querySelectorAll('.pop'); 
    popBtns.forEach((btn) => {
        btn.addEventListener('click', () => {
            let index_pop = foodsOnTheCart.indexOf(Number(btn.value))
            
            if (index_pop !== -1) { 
                foodsOnTheCart.splice(index_pop, 1)
                productsList.innerHTML = productsFunc(foodsOnTheCart)
                assignListeners()
            } else {
                console.log("Item não encontrado no array.")
            }
        })
    })
}

assignListeners()


const cartModal = document.querySelector('.cart-modal')
const cartBtn = document.querySelector('.bi-cart4')
const closeCart = document.querySelector('.close-cart')

cartBtn.addEventListener('click',()=>{
    cartModal.style = 'display:flex;'
})

closeCart.addEventListener('click', ()=>{
    cartModal.style = 'display:none;'
})