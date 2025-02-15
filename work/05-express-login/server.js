"use strict";

const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const PORT = 3000;

app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static('./public'));

const loginController = require('./login-controller');
app.get('/', loginController.handleHome);
app.post('/login', loginController.handleLogin);
app.post('/logout', loginController.handleLogout);
app.post('/update-word', loginController.handleUpdateWord);

app.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`));