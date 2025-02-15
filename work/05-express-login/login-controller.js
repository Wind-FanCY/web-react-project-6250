"use strict";

const model = require('./login-model');
const view = require('./login-view');

const loginController = {
    handleHome: function (req, res) {
        const sid = req.cookies.sid;
        const username = model.validateSession(sid);

        if (username) {
            const storedWord = model.getStoredWord(username);
            res.send(view.dataPage(username, storedWord));
        } else {
            res.send(view.loginPage());
        }
    },

    handleLogin: function (req, res) {
        const username = req.body.username.trim();
        const validation = model.validateUsername(username);

        if (!validation.isValid) {
            return res.status(validation.status).send(view.loginPage(validation.error));
        }

        const sid = model.createSession(username);
        res.cookie('sid', sid);
        res.redirect('/');
    },

    handleLogout: function (req, res) {
        const sid = req.cookies.sid;
        model.removeSession(sid);
        res.clearCookie('sid');
        res.redirect('/');
    },

    handleUpdateWord: function (req, res) {
        const sid = req.cookies.sid;
        const username = model.validateSession(sid);

        if (!username) {
            res.redirect('/');
            return;
        }

        const { word } = req.body;
        model.setStoredWord(username, word);
        res.redirect('/');
    }
};

module.exports = loginController;