//OBSŁUGA SOCKET.IO
const socket = io();

socket.on('message', ({ author, content }) => addMessage(author, content));
socket.on('user', ({ author, content }) => addMessage(author, content));
socket.on('userDisconnect', ({ author, content }) => addMessage(author, content));

// STAŁE LOKALE
const loginForm = document.getElementById('welcome-form');
const messagesSection = document.getElementById('messages-section');
const messagesList = document.getElementById('messages-list');
const addMessageForm = document.getElementById('add-messages-form');
const userNameInput = document.getElementById('username');
const messageContentInput = document.getElementById('message-content');

//ZMIENNE GLOBALNE
let userName;

//FUNKCJE
const login = function(event) {
    event.preventDefault();
    if(userNameInput.value){
        userName = userNameInput.value;
        loginForm.classList.remove('show');
        messagesSection.classList.add('show');
        socket.emit('join', {name: userName, id: socket.id});
    } else {
        alert('Please try again...');
    }
}

function addMessage (author, content) {
    const message = document.createElement('li');
    message.classList.add('message');
    message.classList.add('message--received');
    if(author === userName) {
        message.classList.add('message--self');   
    }
    message.innerHTML = `
        <h3 class="message__author">${userName === author ? 'You' : author }</h3>
        <div class="message__content">
            ${content}
        </div>
    `;
    messagesList.appendChild(message);
}

const sendMessage = function(event) {
    event.preventDefault();
    if(messageContentInput.value) {
        addMessage(userName, messageContentInput.value);
        socket.emit('message', { author: userName, content: messageContentInput.value})
        messageContentInput.value = '';
    } else {
        alert('Try again!')
    }
}
//OBSŁUGA PRZYCISKÓW
loginForm.addEventListener('submit', login);
addMessageForm.addEventListener('submit', sendMessage);