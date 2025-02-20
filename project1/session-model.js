"use strict";

const sessions = {};

const sessionModel = {
    createSession: function (sid, username) {
        sessions[sid] = username;
    },

    getSession: function (sid) {
        return sessions[sid];
    },

    deleteSession: function (sid) {
        delete sessions[sid];
    }
};

module.exports = sessionModel;