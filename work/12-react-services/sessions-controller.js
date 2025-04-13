import sessions from './sessions.js';
import users from './users.js';

function getSession(req, res) {
    const sid = req.cookies.sid;
    const username = sid ? sessions.getSession(sid) : '';

    if (!sid || !users.isValidUsername(username) ) {
        res.status(401).json({ error: 'auth-missing' });
        return;
    }

    if (!users.isPermittedUsername(username)) {
        res.status(403).json({ error: 'auth-insufficient' });
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
    res.cookie('sid', sid);
    res.json({ username });
}

function logout(req, res) {
    const sid = req.cookies.sid;
    const username = sid ? sessions.getSession(sid) : '';

    if (sid) {
        res.clearCookie('sid');
    }

    if (username) {
        sessions.deleteSession(sid);
    }

    res.json({ username });
}

export default {
    getSession,
    login,
    logout
}