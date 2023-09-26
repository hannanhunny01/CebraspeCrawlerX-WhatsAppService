const express = require('express')
const { verifyTelegramCode } = require('../controller/code/verify')
const { sendCode } = require('../controller/code/sendCode')
const router  = express.Router()


router.post('/verifyTelegram',verifyTelegramCode)
router.post('/sendCode',sendCode)


module.exports = router