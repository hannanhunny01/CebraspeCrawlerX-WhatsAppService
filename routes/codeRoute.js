const express = require('express')
const { verifyTelegramCode } = require('../controller/code/verify')
const { sendCode } = require('../controller/code/sendCode')
const router  = express.Router()


const {closeSession} = require('../controller/zapSession/session')

router.post('/verifyTelegram',verifyTelegramCode)
router.post('/sendCode',sendCode)

router.get('/closeSession',closeSession)
module.exports = router