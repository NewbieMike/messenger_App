//IMPORTY
const express = require('express');
const path = require('path');
const socket = require('socket.io');

// URUCHOMIENIE EXPRESS'A
const app = express();

//DOŁĄCZENIE DO SERVERA KOLEJNEGO KATALOGU
app.use(express.static(path.join(__dirname, '/client')));

//TABLICA WIADOMOŚCI
const messages = [];
const users = [];

//WPROWDZENIE LINKÓW WRAZ Z WIDOKAMI

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/client/index.html'));
});

//URUCHOMIENIE SERWERA NASŁUCHUJĄCEGO PORT 8000
const server = app.listen(8000, () => {
    console.log('Server is running on port: 8000');
});

const io = socket(server);

io.on('connection', (socket) => {
    console.log('New client! Its id – ' + socket.id);
    socket.on('join', (login) => {
        console.log('New user: ' + socket.id);
        users.push(login);
        console.log(users);
        socket.broadcast.emit('user', {author: 'Admin', content: '' + login.name + ' has joined the conversation!'});
    })
    socket.on('message', (message) => {
        console.log('Oh, I\'ve got something from ' + socket.id);
        messages.push(message);
        console.log(messages);
        socket.broadcast.emit('message', message);
      });
      socket.on('disconnect', (login) => { 
        console.log('Socket ' + socket.id + ' has left');
        users.shift(login);
        console.log(users);
        socket.broadcast.emit('userDisconnect', {author: 'Admin', content: '' + login.name + 'has left the conversation! '})
    });
    console.log('I\'ve added a listener on message and disconnect events \n');
  });