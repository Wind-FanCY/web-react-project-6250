"use strict";

const loginView = {
    loginPage: function (error) {
        return `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Login</title>
            <link rel="stylesheet" href="index.css">
        </head>
        <body>
            <div id="login-page">
                <form method="POST" action="/login" class="login-form">
                    <h2 class="form-title">Login</h2>
                    <label for="username" class="form-label">
                        <span class="label-name">Username:</span>
                        <input type="text" name="username" id="username" class="label-input">
                    </label>
                    ${error ? `<span class="error">${error}</span>` : ''}
                    <button class="form-submit">Login</button>
                </form>
            </div>
        </body>
        </html>
        `;
    },
    dataPage: function (username, storedWord) {
        return `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>User Data</title>
            <link rel="stylesheet" href="data.css">
        </head>
        <body>
            <div id="data-page">
                <form method="POST" action="/logout" class="logout-form">
                    <button class="logout-button">Logout</button>
                </form>
                <h1 class="data-title">Welcome, ${username}</h1>
                <div class="data-section">
                    <h2 class="section-title">Your stored word is: ${storedWord}</h2>
                    <form method="POST" action="/update-word" class="word-form">
                        <label class="form-label">
                            <span class="label-name">Update your word:</span>
                            <input class="label-input" type="text" id="word" name="word" value=${storedWord}>
                        </label>
                        <button class="update-button">Update</button>
                    </form>
                </div>
            </div>
        </body>
        </html>
        `;
    }
};

module.exports = loginView;

