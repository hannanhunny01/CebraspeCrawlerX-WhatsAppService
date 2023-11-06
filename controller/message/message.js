const {sendTelegram} = require("./sendtelegram")
const {sendEmail} = require('./sendEmail')
const sendMessage = async (req, res) => {

    try{
       console.log(req.body.item)

       
        for(const items of req.body.item){
           
            const title = items.title
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

            console.log(email)
            console.log(whatsapp)
            console.log(telegram)

         //  return res.json({email:email,whatsapp:whatsapp,telegram:telegram})



      

 
        } 

        
    }catch(error){console.log(error)}
}
module.exports = { sendMessage }