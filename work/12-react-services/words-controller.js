import sessions from './sessions.js';
import users from './users.js';
import words from './words.js';

function getWord(req, res) {
    const sid = req.cookies.sid;
    const username = sid ? sessions.getSession(sid) : '';

    if (!sid || !users.isValidUsername(username)) {
        res.status(401).json({ error: 'auth-missing' });
        return;
    }

    if (!users.isPermittedUsername(username)) {
        res.status(403).json({ error: 'auth-insufficient' });
        return;
    }
    const word = words.getWord(username);
    res.json({ word: word || '' });
}

function updateWord(req, res) {
    const sid = req.cookies.sid;
    const username = sid ? sessions.getSession(sid) : '';
    const { word } = req.body;

    if (!sid || !users.isValidUsername(username)) {
        res.status(401).json({ error: 'auth-missing' });
        return;
    }
    
    if (!users.isPermittedUsername(username)) {
        res.status(403).json({ error: 'auth-insufficient' });
        return;
    }

    if (!word) {
        res.status(400).json({ error: 'required-word' });
        return;
    }

    if (!words.isValidWord(word)) {
        res.status(400).json({ error: 'invalid-chars' });
        return;
    }

    words.setWord(username, word);
    res.json({ word });
}

export default {
    getWord, 
    updateWord
}