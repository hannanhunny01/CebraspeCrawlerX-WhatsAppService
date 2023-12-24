const {sendTelegram} = require("./sendtelegram")
const {sendEmail} = require('./sendEmail')

const {sendZapUpdates} = require('./sendWhatsapp')

const VestUnb = require('../../models/vestibular');
const Concurso = require('../../models/concurso');
const PasUnb = require('../../models/pasunb');

const updateHasSent = async (id, type ,method) => {
    try{
        if(type === "vestibular"){
            const vest = await VestUnb.findById(id)
            if(method === "email"){
                 vest.sendMessageEmail = true;
            }
            else if(method === "whatsapp"){
                 vest.sendMessagePhone = true;
            }

            else if (method === "telegram"){
                 vest.sendMessageTelegram = true;
            }

           if(vest.sendMessageEmail && vest.sendMessagePhone && vest.sendMessageTelegram){
            vest.items_on_site_number = vest.items_on_site.length
           }
            
            await vest.save();
        }
        if(type === "pas"){
            const pas = await PasUnb.findById(id)
              if(method === "email"){
                    pas.sendMessageEmail = true;}
            else if(method === "whatsapp"){
                    pas.sendMessagePhone = true;}
            else if (method === "telegram"){
                    pas.sendMessageTelegram = true;}

            if(pas.sendMessageEmail && pas.sendMessagePhone && pas.sendMessageTelegram){
                pas.items_on_site_number = pas.items_on_site.length
               }
                    
            await pas.save()
        }
        if(type === "concurso"){
            const conc = await Concurso.findById(id)
            if(method === "email"){
                conc.sendMessageEmail = true;}
            else if(method === "whatsapp"){
                conc.sendMessagePhone = true;}
            else if (method === "telegram"){
                conc.sendMessageTelegram = true;}
            
            if(conc.sendMessageEmail && conc.sendMessagePhone && conc.sendMessageTelegram){
                conc.items_on_site_number = conc.items_on_site.length
               }
            await conc.save()
        }
    }catch(error){
        console.log(error)
    }


}

const sendMessage = async (req, res) => {

    try{


        for(const items of req.body.item){
            console.log(items)
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
            await sendZapUpdates(title,textToSend,whatsapp).then(async ()=>{
                await updateHasSent(items.itemId,items.itemType,"whatsapp")
            })
            await sendTelegram(title ,textToSend,telegram).then(async ()=>{
                await updateHasSent(items.itemId,items.itemType,"telegram")
              })
            await sendEmail(title,textToSend,email).then(async ()=>{
                await updateHasSent(items.itemId,items.itemType,"email")
              })



        

      

 
        } 
        return res.status(200).json({message:"Message Sent Successfully to all the users"})


        
    }catch(error){
        return res.json(404).json({message:"Cannot send message now"})
        
        console.log(error)}
}
module.exports = { sendMessage }