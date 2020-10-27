const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')
const messageThree = document.querySelector('#message-3')
const messageFour = document.querySelector('#message-4')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const location = search.value
    messageOne.textContent = "Please Wait..."
    messageTwo.textContent = "" 
    messageThree.textContent = ""
    messageFour.textContent = ""
    fetch('/weather?loc=' + location).then((response) => {
        response.json().then((data) => {
            if(data.error) {
                return messageOne.textContent = data.message
            } else {
                messageOne.textContent = data.location
                messageTwo.textContent = data.description
                messageThree.textContent = data.temperature
                messageFour.textContent = data.feels
            }
        })
    })   
})

console.log('Client side javascript file is loaded!')