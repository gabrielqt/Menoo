
function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim()
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1))
                break;
            }
        }
    }
    return cookieValue;
}

const path = window.location.pathname;
const parts = path.split('/');
const number_table = parts[3]



const csrftoken = getCookie('csrftoken');
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
    let modalPrice = document.querySelector('.modal-price');

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
        foodName = foodName.textContent
        let foodDescription = food.querySelector('.food-description').textContent;

        modal(imgSrc,foodName,foodDescription,idFood, price)

    })
})


btnAdd.onclick = ()=>{
    let modalPrice = document.querySelector('.modal-price').textContent;

    // I stored the idFood on btn.value and nameFood on btn.name
    foodsOnTheCart.push(Number(btnAdd.value))
    foodsOnTheCartObj[btnAdd.value] = [btnAdd.name,modalPrice]
    active_modal(cart)
    let count_ = countCart(btnAdd.value) 
    counter(count_)
    productsList.innerHTML = productsFunc(foodsOnTheCart)
    assignListeners()
}


// // // // // // // // // // // // // // 


function productsFunc(foods){
    foods.sort((a,b) => a-b);
    let regex = /[0-9]+(\.[0-9]+)/;
    let sum = 0
    listHtml = '';
    
    for (item of foods){
        listHtml +=         `<li>
        ${foodsOnTheCartObj[item][0].slice(0,25)} <button class="pop" value="${item}"><span class="price-cart">${foodsOnTheCartObj[item][1]}</span><i class="bi bi-trash"></i></button>
        </li>`

        let string = foodsOnTheCartObj[item][1]
        let result = Number(string.match(regex)[0])
        sum += result
    }


    listHtml += `<li id="total-price">Total R$${sum}</li>`
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
const cartBtn = document.querySelector('.bi-basket2')
const closeCart = document.querySelector('.close-cart')

cartBtn.addEventListener('click',()=>{
    cartModal.style = 'display:flex;'
})

closeCart.addEventListener('click', ()=>{
    cartModal.style = 'display:none;'
    midCart.style = "display:none;"
    startCart.style = "display:block;"
    startCart.classList.remove('deactive-div')
    midCart.classList.remove('deactive-midcart')
})

const nextBtn = document.querySelector('.next')
const startCart = document.querySelector('.start-cart')
const midCart = document.querySelector('.mid-cart')
const endCart = document.querySelector('.end-cart')

nextBtn.addEventListener('click',()=>{

    if(foodsOnTheCart.length < 1){
        productsList.innerHTML = `<li class="error">Seu carrinho está vazio</li>`
        

        return
    }

    startCart.classList.add('deactive-div')
    setTimeout(()=>{
        startCart.style="display:none;"
        midCart.style = "display:flex;"
    }, 500)
})


// // // // // // // //

const buttonFinish = document.getElementById('finish')
let finishText = document.getElementById('finish-order');


buttonFinish.addEventListener('click', ()=>{
    const name = document.getElementById('name').value.trim();
    const number = document.getElementById('number').value.trim();
    const note = document.getElementById('note').value.trim();
    const errors = document.getElementById('errors-list');
    errors.innerHTML = ''
    let error = false

    if (name.length < 3){
                            
        errors.innerHTML += `<li class="error">O nome deve ter no minímo 3 caracteres<i class="bi bi-exclamation-lg"></i></li>`;
        error = true
    }

    const phoneRegex = /^\d{2}9\d{8}$/;
    if (!phoneRegex.test(number)) {
        errors.innerHTML += `<li class="error">Número inválido<i class="bi bi-exclamation-lg"></i></li>`
        error = true
    }

    if (!error){
        errors.innerHTML = ''
        midCart.classList.add('deactive-midcart')
        setTimeout(()=>{
            midCart.style = "display:none;"
            endCart.style = "display:flex;"
            closeCart.style = "display:none;"

        }, 500)

        let url = 'http://127.0.0.1:8000/menu/api/order-create/'

        const foodsNotDuplicated = [...new Set(foodsOnTheCart)]
        const foodsInput = []

        foodsNotDuplicated.forEach((item,index) => {
            let quantity = countCart(item)
            let objFood = {
                "food": {"id": item},
                "quantity" : quantity
            }
            foodsInput.push(objFood)
        })

        console.log(foodsInput)

        let data = {
            "order_foods_input":foodsInput,
            "note": note,
            "customer_name": name,
            "customer_phone_number": number,
            "table": number_table
        }
        
        
          
        
          
        fetch(url, {
            method:'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': csrftoken 
            },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(result => {
            console.log('Sucesso:', result); 
            let id_order = result['id'];
            finishText.innerHTML = `O seu pedido <span class="id_order">#${id_order}</span> foi entregue, aguarde ser recebido.`
            waitOrder(id_order)
        })
        .catch(error => {
            console.error('Erro:', error);
        });
            }

})

async function callBackwait(id_order){
    
    let response = await fetch(`http://127.0.0.1:8000/menu/api/order-retrieve/${id_order}/`);
    let data = await response.json();
    if (data['status'] === 'Visto' ){
      const finishIcon = document.getElementById('finish-icon');
      finishIcon.classList.remove('loading'); finishIcon.classList.remove('bi-hypnotize')
      finishIcon.classList.add('bi-emoji-heart-eyes')
      finishText.innerHTML = "O seu pedido foi recebido!";
    }
}

function waitOrder(id_order){

    setInterval(callBackwait,10000,id_order);

}