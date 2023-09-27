const TelegramBot = require('node-telegram-bot-api');
const token = '6517517605:AAHMSAwLd5AIPK71AZ-ZLtrlwvpUXaplVLU';

const TelegramSaver = require('../../Model/telegramModel')
const {generateRandomMixTwelve} = require('./sendCode')

const makeCode =  async (chatId)=>{
  try{
    const checkCode = await TelegramSaver.findOne({chatId:chatId})
    if (checkCode) {
      const minutesLeft = Math.ceil((600000 - (new Date() - checkCode.createdAt)) / 60000);
    
      return `Esse Codigo \n<b>${checkCode.verificationCode}</b>\nEsta Valido por ${minutesLeft} minuto(s)`;
    } else {
      const newCode = await TelegramSaver.create({ chatId: chatId, verificationCode: generateRandomMixTwelve() });
      await newCode.save();
      return `Esse Codigo \n<b>${newCode.verificationCode}</b>\nEsta Valido por 10 minutos `;
    }
  }catch(error){

    console.log(error)
  }
}


const bot = new TelegramBot(token, {polling: true});

bot.onText(/\/start/,(msg)=>{
  bot.sendMessage(msg.chat.id, "Bem Vindo manda /novoToken para Receber Novo codigo de Cadastro")
})
bot.onText(/\/novoToken/, async (msg)=>{
   bot.sendMessage(msg.chat.id ,await makeCode(String(msg.chat.id)),{parse_mode : "HTML"} )

})
//bot.onText(/(.+)/, (msg) => {
 // const chatId = msg.chat.id;
//  bot.sendMessage(chatId, "Send /register to get Code");
//});




module.exports = bot
