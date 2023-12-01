
const telegramBot = require('node-telegram-bot-api');

const bot = require('../code/telegramCode')

const sendTelegram = async (title ,textToSend,telegram) => {

    try{
        
    //    const token = process.env.TELEGRAM_TOKEN
    //  const messageBot  =  new telegramBot(token, {polling: true});

      for (const item of telegram){
        console.log(item.name,item.telegram)
        bot.sendMessage(item.telegram, `Ola senhor(a) ${item.name} \n Teve Seguinte Atualizacoes para ${title} \n  ${textToSend}`)
    }

   // messageBot.stopPolling();


    }catch(error){console.log(error)}

}

module.exports = { sendTelegram }