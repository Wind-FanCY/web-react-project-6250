"use strict";

const users = {};

const userModel = {
    isValidUsername: function (username) {
        const nameRegex = /^[a-zA-Z0-9_]+$/;
        
        return nameRegex.test(username);
    },

    addUser: function (username) {
        if (!users[username]) {
            users[username] = {
                username,
                isPlaying: false,
                bestScore: Infinity,
                worstScore: 0,
                gamesPlayed: 0
            };
        }
    },

    getUser: function (username) {
        return users[username];
    },

    updateUserState: function (username, guessCount, won) {
        const user = users[username];

        if (user && won) {
            user.gamesPlayed++;
            user.bestScore = Math.min(user.bestScore, guessCount);
            user.worstScore = Math.max(user.worstScore, guessCount);
        }
    },

    updatePlayState: function (username, playing) {
        const user = users[username];

        if (user) {
            user.isPlaying = playing;
        }
    }
};

module.exports = userModel;