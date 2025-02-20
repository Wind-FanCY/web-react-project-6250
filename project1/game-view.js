"use strict";

const gameView = {
    loginPage: function (error = '') {
        return `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Guess Word Game</title>
            <link rel="stylesheet" href="index.css">
        </head>
        <body>
            <div id="login-page">
                <form action="/login" method="POST" class="login-form">
                    <h1 class="login-title">Word Guessing Game</h1>
                    ${error ? `<p class="error">${error}</p>` : ''}
                    <label for="username" class="form-label">
                        <span class="label-name">Username: </span>
                        <input type="text" name="username" id="username" class="label-input">
                    </label>
                    <button class="form-login">Login</button>
                </form>
            </div>
        </body>
        </html>
        `;
    },

    gamePage: function (gameState, words, userState) {
        const { validGuesses, lastGuess, isWon, guessCount } = gameState;
        const { username, gamesPlayed, bestScore, worstScore } = userState;

        return `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Guess Word Game</title>
            <link rel="stylesheet" href="game.css">
        </head>
        <body>
            <div id="game-page">
                <header class="game-header">
                    <form action="/logout" method="POST" class="logout-form">
                        <button class="form-logout">Logout</button>
                    </form>
                    <h1 class="game-title">Word Guessing Game</h1>
                    <h2 class="game-welcome">Welcome, <span class="username">${username}</span></h2>
                </header>
                <main class="game-content">
                    <div class="user-status">
                        <h2 class="status-title">Your Statistics: </h2>
                        <ul class="status-list">
                            <li class="status-item">
                                <span class="status-label">Games Played:</span>
                                <span class="status-value">${gamesPlayed}</span>
                            </li>
                            ${bestScore !== Infinity ? `
                            <li class="status-item">
                                <span class="status-label">Best Score:</span>
                                <span class="status-value">${bestScore}</span>
                            </li>
                            ` : ''}
                            ${worstScore > 0 ? `
                            <li class="status-item">
                                <span class="status-label">Worst Score:</span>
                                <span class="status-value">${worstScore}</span>
                            </li>
                            ` : ''}
                        </ul>
                    </div>
                    <div class="game-status">
                        <h2 class="status-title">Game Status:</h2>
                        <p class="status-count">Number of valid guesses: ${guessCount}</p>
                        ${lastGuess ?
                        `<p class="status-last">Last guess: ${lastGuess.word} 
                            ${lastGuess.isValid ? 
                                `(Matches: ${lastGuess.matches})` :
                                `(Invalid: ${lastGuess.message})`
                            }
                        </p>` : ''}
                    </div>
                    ${isWon ? `
                    <div class="game-win">
                        <h2 class="win-title">Congratulations! You've won!</h2>
                        <form action="/new-game" method="POST" class="win-form">
                            <button class="form-new">Start New Game</button>
                        </form>
                    </div>
                    ` : `
                    <div class="game-guess">
                        <form action="/guess" method="POST" class="guess-form">
                            <label for="guess" class="form-label">
                                <span class="label-name">Guess word: </span>
                                <input type="text" name="guess" id="guess" class="label-input">
                            </label>
                            <button class="form-guess">Make Guess</button>
                        </form>
                    </div>
                    `}
                    <div class="game-words">
                        <div class="possible-words">
                            <h2 class="words-title">Possible Words</h2>
                            <div class="words-list">
                                ${words.map(word => `<span class="list-word">${word}</span>`).join('')}
                            </div>
                        </div>
                        <div class="previous-guesses">
                            <h2 class="guesses-title">Previous Guesses</h2>
                            <div class="guesses-list">
                                ${validGuesses.map(guess => `
                                    <span class="guesses-words">${guess.word} (Matches: ${guess.matches})</span>
                                `).join('')}
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </body>
        </html>
        `
    }
};

module.exports = gameView;