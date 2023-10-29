
const telegram = require('node-telegram-bot-api');


const sendtelegram = async (data ,items) => {

    try{
        
        const token = process.env.TELEGRAM_TOKEN
      const messageBot  =  new telegram(token, {polling: true});

      for (const item of items){
        messageBot.sendMessage(item.telegram, "Senho "+item.name+" Teve Seguinte Atualizacoes :-" + data)
    }

    messageBot.stopPolling();


    }catch(error){console.log(error)}

}

module.exports = { sendtelegram }