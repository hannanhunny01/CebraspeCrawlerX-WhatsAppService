const { getWhatsappClient } = require('../zapSession/session');


const sendZapUpdates = async (title,textToSend,whatsapp)=>{
  const whatsappClient = await getWhatsappClient();


 
  if (!whatsappClient) {
    return res.status(500).json({ error: 'WhatsApp session not initialized' });
  }

  for (const item of whatsapp){


    whatsappClient
    .sendText(`55${item.whatsapp}@c.us`, `Ola senhor(a) ${item.name} \n Teve Seguinte Atualizacoes para ${title} \n` + textToSend)
    .then((result) => {
      console.log("sent")
     // console.log('Result: ', result);
     // return res.status(200).json({message:"Message Sent Successfully"});
    })
    .catch((error) => {
      console.error('Error when sending message:', error);
      return res.status(500).json({ error: 'Error sending message' });
    });



  }

  
 
}



module.exports = { sendZapUpdates };
    
