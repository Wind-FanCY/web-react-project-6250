"use strict";

const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const PORT = 3000;

const gameController = require('./game-controller');

app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static('./public'));

app.get('/', gameController.handleHome);
app.post('/login', gameController.handleLogin);
app.post('/logout', gameController.handleLogout);
app.post('/guess', gameController.makeGuess);
app.post('/new-game', gameController.newGame);

app.listen(PORT, () => { console.log(`Listening on http://localhost:${PORT}`) });
