const sessions = require('./sessions');
const users = require('./users');

const messages = [];

function getMessages(req, res) {
    const sid = req.cookies.sid;
    const username = sid ? sessions.getSessionUser(sid) : '';

    if (!sid | !users.isValidUsername(username)) {
        res.status(401).json({ error: 'auth-missing' });
        return;
    }

    res.json(messages);
}

function addMessage(req, res) {
    const sid = req.cookies.sid;
    const username = sid ? sessions.getSessionUser(sid) : '';

    if (!sid || !users.isValidUsername(username)) {
        res.status(401).json({ error: 'auth-missing' });
        return;
    }

    const { text } = req.body;

    if (!text || !text.trim()) {
        res.status(400).json({ error: 'required-message' });
        return;
    }

    const message = {
        id: messages.length + 1,
        username,
        text: text.trim(),
    };

    messages.push(message);
    res.json(message);
}

function getUsers(req, res) {
    const sid = req.cookies.sid;
    const username = sid ? sessions.getSessionUser(sid) : '';

    if (!sid || !users.isValidUsername(username)) {
        res.status(401).json({ error: 'auth-missing' });
        return;
    }

    const activeUsers = {};
    Object.values(sessions.getAllSessions()).forEach(session => {
        activeUsers[session.username] = true;
    });

    const userList = Object.keys(activeUsers);
    res.json(userList);
}

module.exports = {
    getMessages,
    addMessage,
    getUsers
}