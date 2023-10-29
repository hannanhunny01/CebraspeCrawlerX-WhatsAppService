const TelegramBot = require('node-telegram-bot-api');


const sendStatus = async (token ,chatid,msg) => {
    try {
        const bot = new TelegramBot(token, { polling: true });
       bot.sendMessage(chatid,msg)
    } catch (error) {
        console.log(error);
    }

}

msg ={ 
    "chatId": 5030042717,
    "message": "teste"
}

sendStatus('6395001603:AAEMhzQ9yiTzIQIuAQnQv5pNF9xFUtbnvCc',5030042717,msg.chatId   );
sendStatus('6517517605:AAHMSAwLd5AIPK71AZ-ZLtrlwvpUXaplVLU',5030042717,"teste");
sendStatus('6674440083:AAFtRTgZ0ZaXFfSF0MQAGYf6oA9aJFsox24',5030042717,"new bot");