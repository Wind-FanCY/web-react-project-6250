const sessions = require('./sessions');
const users = require('./users');

function checkSession(req, res) {
    const sid = req.cookies.sid;
    const username = sid ? sessions.getSessionUser(sid) : '';

    if (!sid || !username) {
        res.status(401).json({ error: 'auth-missing' });
        return;
    }

    res.json({ username });
}

function login(req, res) {
    const { username } = req.body;

    if (!users.isValidUsername(username)) {
        res.status(400).json({ error: 'required-username' });
        return;
    }

    if (!users.isPermittedUsername(username)) {
        res.status(403).json({ error: 'auth-insufficient' });
        return;
    }

    const sid = sessions.addSession(username);
    const existingUser = users.getUser(username);

    if (!existingUser) {
        users.addUser(username);
    }

    res.cookie('sid', sid)
    res.json({ username });
}

function logout(req, res) {
    const sid = req.cookies.sid;
    const username = sid ? sessions.getSessionUser(sid) : '';

    if (sid) {
        res.clearCookie('sid');
        sessions.deleteSession(sid);
    }

    res.json({ username });
}

module.exports = {
    checkSession,
    login,
    logout
};