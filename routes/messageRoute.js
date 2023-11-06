const express = require('express')  
const router = express.Router()

const {sendMessage } = require('../controller/message/message')


router.post('/sendMessage',sendMessage)

module.exports = router