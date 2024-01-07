    const {sendTelegram} = require("./sendtelegram")
    const {sendEmail} = require('./sendEmail')

    const {sendZapUpdates} = require('./sendWhatsapp')

    const VestUnb = require('../../models/vestibular');
    const Concurso = require('../../models/concurso');
    const PasUnb = require('../../models/pasunb');

    const updateHasSent = async (id, type, method) => {
        try {
            let model;

            switch (type) {
                case "vestibular":
                    model = await VestUnb.findById(id);
                    break;
                case "pas":
                    model = await PasUnb.findById(id);
                    break;
                case "concurso":
                    model = await Concurso.findById(id);
                    break;
                default:
                    throw new Error("Invalid type");
            }

            if (!model) {
                throw new Error("Document not found");
            }

            switch (method) {
                case "email":
                    model.sendMessageEmail = model.items_on_site.length;
                    break;
                case "whatsapp":
                    model.sendMessagePhone = model.items_on_site.length;
                    break;
                case "telegram":
                    model.sendMessageTelegram = model.items_on_site.length;
                    break;
                default:
                    throw new Error("Invalid method");
            }

            const allEqual =
                model.sendMessageEmail === model.sendMessagePhone &&
                model.sendMessagePhone === model.sendMessageTelegram;

            if (allEqual) {
                model.items_on_site_number = model.items_on_site.length;
            }

            await model.save();
        } catch (error) {
            console.log(error);
        }
    };


    const sendMessage = async (req, res) => {

        try{

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

                let model;
                let type = items.itemType;
                switch (type) {
                    case "vestibular":  
                        model = await VestUnb.findById(items.itemId);
                        break;
                    case "pas":
                        model = await PasUnb.findById(items.itemId);
                        break;
                    case "concurso":             
                        model = await Concurso.findById(items.itemId);
                        break;
                    default:
                        throw new Error("Invalid type");
                }
                console.log("mode",model)
                if(model.sendMessageEmail<model.items_on_site.length){
               
                    await sendEmail(title,textToSend,email).then(async ()=>{
                        await updateHasSent(items.itemId,items.itemType,"email")
                    })
    
                }
                if(model.sendMessagePhone<model.items_on_site.length){
                 
                    await sendZapUpdates(title,textToSend,whatsapp).then(async ()=>{
                        await updateHasSent(items.itemId,items.itemType,"whatsapp")
                    })
                }
                if(model.sendMessageTelegram<model.items_on_site.length){
              
                    await sendTelegram(title ,textToSend,telegram).then(async ()=>{
                        await updateHasSent(items.itemId,items.itemType,"telegram")
                    })
                }
                
             


            

        

    
            } 
            return res.status(200).json({message:"Message Sent Successfully to all the users"})


            
        }catch(error){
            console.log(error)}

            return res.status(404).json({message:"Cannot send message now"})
            
    }
    module.exports = { sendMessage }