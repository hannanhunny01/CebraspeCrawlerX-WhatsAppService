const {sendTelegram} = require("./telegramMessage")
const {sendEmail} = require('./sendEmail')
const sendMessage = async (req, res) => {

    try{

        for(const items of req.item){
           
            const title = items.title
            const textToSend = ""
            for (const update of items.updates){
                textToSend = textToSend + " \n"+ update.date  +" \n"+ update.name +" \n"
            }
            const email  =   [];
            const whatsapp = [];
            const telegram = [];
            for (const item of req.people){
                if(item.email){
                    email.push({name: item.name, email: item.email});                
                }
                if(item.whatsapp){
                    whatsapp.push({name: item.name, whatsapp: item.whatsapp});                
                }
                if(item.telegram){
                    telegram.push({name: item.name, telegram: item.telegram});                
                }
            }

            console.log(email)
            console.log(whatsapp)
            console.log(telegram)

            await sendTelegram(textToSend,telegram)
            await sendEmail(textToSend,email)
            await sendWhatsapp(textToSend,whatsapp)



      

 
        } 

        
    }catch(error){console.log(error)}
}
module.exports = { sendMessage }