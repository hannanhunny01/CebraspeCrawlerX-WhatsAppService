


const { getWhatsappClient } = require('../zapSession/session');


const sendCheckMsg = async () => {
  try{
    const whatsappClient = await getWhatsappClient();

   const result =  await  whatsappClient.sendText(`5561986250932@c.us`, "Check Check Check")
   console.log(result)
   return true;

  }catch(error){return false;};


}

module.exports = { sendCheckMsg };  