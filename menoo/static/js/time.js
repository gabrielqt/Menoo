const timeItem = document.getElementById('time');

let now = new Date();
const minDate = new Date('2024-08-21T19:00:00');
const maxDate = new Date('2024-08-21T23:30:00');

function closedTime() {
    timeItem.classList.remove('open')
    timeItem.classList.add('closed')
    timeItem.innerHTML = 'Fechado'
}

if (now.getTime() > maxDate){
 closedTime()
} else if (now.getTime() < minDate) {
    closedTime()
}