"use strict";

const words = require('./words');
const games = {};

const gameModel = {
    words,

    createGame: function (username) {
        const secretWord = words[Math.floor(Math.random() * words.length)];
        console.log(`${username}: ${secretWord}`);

        games[username] = {
            secretWord: secretWord.toLowerCase(),
            guesses: [],
            validGuesses: [],
            lastGuess: null,
            isWon: false,
            guessCount: 0,
            isValidCuess: false,
            invalidGuessWord: ''
        };
    },

    getGame: function (username) {
        return games[username];
    }
};

module.exports = gameModel;