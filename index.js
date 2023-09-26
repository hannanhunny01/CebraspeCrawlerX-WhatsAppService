const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv').config();
const {dbConnect} = require('./config/dbConnect')
const PORT = process.env.PORT || 4000;
const app = express();

dbConnect();

const message = require('./controller/message')
const {sendMessagePas} = require('./controller/sendMessagePas')

// Use body-parser middleware to parse JSON request bodies
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Define a simple "hello" route

const bot = require('./controller/code/telegramCode')

app.get('/sendHello',(req,res) =>{
    try{
   res.json({message:"hello World"})}
   catch(error){
    console.log(error)
   }
})

app.post('/sendMessagePas',sendMessagePas)

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});


