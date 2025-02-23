"use strict";


const sessionModel = require('./session-model');
const userModel = require('./user-model');
const gameModel = require('./game-model');
const view = require('./game-view');
const uuidv4 = require('crypto').randomUUID;

function countMatch(guess, secret) {
    const secretCount = {};
    let matches = 0;

    for (const s of secret) {
        const secretChar = s.toLowerCase();

        if (!secretCount[secretChar]) {
            secretCount[secretChar] = 0;
        }
        secretCount[secretChar]++;
    }

    for (const g of guess) {
        const guessChar = g.toLowerCase();

        if (secretCount[guessChar] && secretCount[guessChar] > 0) {
            matches++;
            secretCount[guessChar]--;
        }
    }

    return matches;
};

function isGuessExited(validGuesses, newGuess) {
    const lowerGuess = newGuess.toLowerCase();
    
    for (const guess of validGuesses) {
        if (guess.word.toLowerCase() === lowerGuess) {
            return true;
        }
    }

    return false;
};

const gameController = {
    handleLogin: function (req, res) {
        const username = req.body.username;

        if (!username) {
            res.status(400).send(view.loginPage('Username is required'));
            return;
        }

        if (username === 'dog') {
            res.status(403).send(view.loginPage('Username "dog" is not permitted'));
            return;
        }

        if (!userModel.isValidUsername(username)) {
            res.status(400).send(view.loginPage('Username is "a-z, A-Z, 0-9, _" only'));
            return;
        }

        const sid = uuidv4();
        sessionModel.createSession(sid, username);
        userModel.addUser(username);

        const userState = userModel.getUser(username);

        if (!userState.isPlaying) {
            gameModel.createGame(username);
            userModel.updatePlayState(username, true);
        }

        res.cookie('sid', sid);
        res.status(302).redirect('/');
    },

    handleHome: function (req, res) {
        const sid = req.cookies.sid;
        const username = sessionModel.getSession(sid);

        if (!sid || !username) {
            res.status(401).send(view.loginPage('Please login first'));
            return;
        }

        const gameState = gameModel.getGame(username);
        const userState = userModel.getUser(username);
        const words = gameModel.words;
        
        res.status(200).send((view.gamePage(gameState, words, userState)));
    },

    handleLogout: function (req, res) {
        const sid = req.cookies.sid;

        if (sid) {
            sessionModel.deleteSession(sid);
        }

        res.clearCookie('sid');
        res.status(302).redirect('/');
    },

    makeGuess: function (req, res) {
        const sid = req.cookies.sid;
        const username = sessionModel.getSession(sid);

        if (!sid || !username) {
            res.status(401).send(view.loginPage('Please login first'));
            return;
        }

        const guess = req.body.guess;
        const gameState = gameModel.getGame(username);
        const isValidWord = gameModel.words.includes(guess.toLowerCase());
        const isAlreadyGuessed = isGuessExited(gameState.validGuesses, guess);

        if (!isValidWord || isAlreadyGuessed) {
            gameState.lastGuess = { 
                word: guess, 
                isValid: false,
                message: !isValidWord ? 'Not a valid word' : 'Word already guessed'
            };
            res.status(400).redirect('/');
            return;
        } else {
            const matches = countMatch(guess, gameState.secretWord);
            const guessInfo = { word: guess, matches };
            
            gameState.validGuesses.push(guessInfo);
            gameState.lastGuess = { ...guessInfo, isValid: true };
            gameState.guessCount++;

            if (guess.toLowerCase() === gameState.secretWord.toLowerCase()) {
                gameState.isWon = true;
                userModel.updateUserState(username, gameState.guessCount, true);
            }

            res.status(302).redirect('/');
        }
    },

    newGame: function (req, res) {
        const sid = req.cookies.sid;
        const username = sessionModel.getSession(sid);

        if (!sid || !username) {
            res.status(401).send(view.loginPage('Please login first'));
            return;
        }

        gameModel.createGame(username);
        userModel.updatePlayState(username, false);

        res.status(302).redirect('/');
    }
};

module.exports = gameController;
