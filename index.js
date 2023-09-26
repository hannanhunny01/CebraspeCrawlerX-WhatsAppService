const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv').config();
const {dbConnect} = require('./config/dbConnect')
const PORT = process.env.PORT || 4000;

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

dbConnect();

const codeRoute = require('./routes/codeRoute')
app.use('/api/code',codeRoute)

const message = require('./controller/message')
const {sendMessagePas} = require('./controller/sendMessagePas')

// Use body-parser middleware to parse JSON request bodies


// Define a simple "hello" route

const bot = require('./controller/code/telegramCode')



app.post('/sendMessagePas',sendMessagePas)

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});


