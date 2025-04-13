import express from 'express';
import cookieParser from 'cookie-parser';
import sessionsController from './sessions-controller.js';
import wordsController from './words-controller.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cookieParser());
app.use(express.static('./dist'));
app.use(express.json());

app.get('/api/v1/session', sessionsController.getSession);
app.post('/api/v1/session', sessionsController.login);
app.delete('/api/v1/session', sessionsController.logout);

app.get('/api/v1/word', wordsController.getWord);
app.put('/api/v1/word', wordsController.updateWord);

app.listen(PORT, () => console.log(`http://localhost:${PORT}`));