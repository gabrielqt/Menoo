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



let foodsOnTheCart = []
const modalDiv = document.querySelector('.modal-container')

window.onclick = (event)=>{
    if(event.target.closest('.close-modal')){
        modalDiv.style ="display:none;"
    }
}

function active_modal(){
    modalDiv.style = "display:flex;"
}

function modal(img,name,description){
    let modalTitle = document.querySelector('.modal-title');
    let modalLogo = document.querySelector('.logo-modal');
    let modalDesc = document.querySelector('.modal-desc');

    modalTitle.innerHTML = name
    modalLogo.src = img
    modalDesc.innerHTML = description

    active_modal()

}

foods = document.querySelectorAll('.food-item')

foods.forEach(food =>{
    food.addEventListener('click', (event)=>{
        
        let imgSrc = food.querySelector('.food-image').src;
        let foodName = food.querySelector('.food-name').textContent;
        let foodDescription = food.querySelector('.food-description').textContent;

        modal(imgSrc,foodName,foodDescription)

    })
})



/* <img src="{{food.image.url}}">
<div class="food-details">
    <h3 class="food-name">{{food.name}}</h3>
    <p>{{food.description|truncatechars:100}}</p> */


// products.forEach(product => {
//     product.addEventListener('click', (event)=>{
//         if (!event.target.classList.contains('buy') && !event.target.closest('.buy')) {

//             // acessando os elementos de dentro de cada product
//             const imgSrc = product.querySelector('img').src;
//             const coffeeName = product.querySelector('.coffe-name').textContent;
//             const description = product.querySelector('.description').textContent

//             modal(imgSrc, coffeeName, description)

//         }
//     })
// })
