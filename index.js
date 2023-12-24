const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv').config();
const {dbConnect ,dbConnectMain} = require('./config/dbConnect')
const PORT = process.env.PORT || 4000;
const messageRoute = require('./routes/messageRoute')

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

dbConnect();
//dbConnectMain();
const codeRoute = require('./routes/codeRoute')
app.use('/api/code',codeRoute)
app.use('/api/message',messageRoute)
const message = require('./controller/message')
const {sendMessagePas} = require('./controller/sendMessagePas')

// Use body-parser middleware to parse JSON request bodies


// Define a simple "hello" route

const bot = require('./controller/code/telegramCode')
const statusBot = require('./controller/apisStatus/apiStatus')


app.post('/sendMessagePas',sendMessagePas)



app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});


