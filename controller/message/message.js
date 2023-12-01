const {sendTelegram} = require("./sendtelegram")
const {sendEmail} = require('./sendEmail')

const {sendZapUpdates} = require('./sendWhatsapp')

const sendMessage = async (req, res) => {

    try{

        return res.json(req.body)

        for(const items of req.body.item){
           
            const title = items.nameOfObject
            let textToSend = ""
            for (const update of items.updates){
                textToSend = textToSend + " \n"+ update.date  +" \n"+ update.name +" \n"
            }
            const email  =   [];
            const whatsapp = [];
            const telegram = [];
            for (const itm of items.people){
                if(itm.email){
                    email.push({name: itm.name, email: itm.email});                
                }
                if(itm.whatsapp){
                    whatsapp.push({name: itm.name, whatsapp: itm.whatsapp});                
                }
                if(itm.telegram){
                    telegram.push({name: itm.name, telegram: itm.telegram});                
                }
            }
       //     console.log(title,textToSend,telegram)
        //    await sendZapUpdates(title,textToSend,whatsapp)
            await sendTelegram(title ,textToSend,telegram)
      //      await sendEmail(title,textToSend,email)



        

      

 
        } 
        return res.status(200).json({message:"Message Sent Successfully to all the users"})


        
    }catch(error){console.log(error)}
}
module.exports = { sendMessage }