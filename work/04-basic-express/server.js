const express = require('express');
const app = express();
const PORT = 3000;

const controllers = require('./chat-controller'); // connects request with model updates and views

app.use(express.static('./public'));

app.get('/', controllers.viewChat);
app.post('/chat', express.urlencoded({ extended: false }), controllers.postMessage);

app.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`));
