const express = require('express');
const cookieParser = require('cookie-parser');
const app = express()
const PORT = 3000;

const authController = require('./auth-controller');
const chatController = require('./chat-controller');

app.use(cookieParser());
app.use(express.json());
app.use(express.static('./public'));

app.get('/api/v1/session', authController.checkSession);
app.post('/api/v1/session', authController.login);
app.delete('/api/v1/session', authController.logout);

app.get('/api/v1/messages', chatController.getMessages);
app.post('/api/v1/messages', chatController.addMessage);
app.get('/api/v1/users', chatController.getUsers);

app.listen(PORT, () => console.log(`http://localhost:${PORT}`));