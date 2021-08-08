//IMPORTY
const express = require('express');
const path = require('path');

// URUCHOMIENIE EXPRESS'A
const app = express();

//DOŁĄCZENIE DO SERVERA KOLEJNEGO KATALOGU
app.use(express.static(path.join(__dirname, '/client')));

//TABLICA WIADOMOŚCI
const messages = [];

//WPROWDZENIE LINKÓW WRAZ Z WIDOKAMI

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/client/index.html'));
});

//URUCHOMIENIE SERWERA NASŁUCHUJĄCEGO PORT 8000
app.listen(8000, () => {
    console.log('Server is running on port: 8000');
})