const express = require('express')  
const router = express.Router()

const {sendMessage } = require('../controller/message/message')

const {sendMessageZap} = require('../controller/code/whatsappCode')

router.post('/sendMessage',sendMessage)

router.post('/sendMessageZap',sendMessageZap)

module.exports = router