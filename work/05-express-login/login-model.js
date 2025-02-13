"use strict";

const uuidv4 = require('crypto').randomUUID;

const sessions = {};
const userData = {};

const loginModel = {
    createSession: function (username) {
        const sid = uuidv4();
        sessions[sid] = { username };
        return sid;
    },

    validateSession: function (sid) {
        return sessions[sid] ? sessions[sid].username : '';
    },

    removeSession: function (sid) {
        delete sessions[sid];
    },

    getStoredWord: function (username) {
        return userData[username] || '';
    },

    setStoredWord: function (username, word) {
        userData[username] = word || '';
    },
    
    validateUsername: function (username) {
        if (!username) {
            return {
                isValid: false,
                status: 400,
                error: 'Username cannot be empty'
            };
        }

        if (username === 'dog') {
            return {
                isValid: false,
                status: 403,
                error: 'Username "dog" is not allowed'
            };
        }

        const allowedUsername = /^[a-zA-Z0-9]+$/;
        if (!allowedUsername.test(username)) {
            return {
                isValid: false,
                status: 400,
                error: 'Username is a-z, A-Z, 0-9 only'
            };
        }

        return { isValid: true };
    }
};

module.exports = loginModel;