


const { getWhatsappClient } = require('../zapSession/session');


const sendMessageZap = async (zapNumber,code)  => {
  try{
    const whatsappClient = await getWhatsappClient();

 //   console.log(whatsappClient)

  // Check if the WhatsApp client is initialized
 // if (!whatsappClient) {
//    return res.status(500).json({ error: 'WhatsApp session not initialized' });
//  }

  // Send a message using the initialized WhatsApp client
  whatsappClient
    .sendText(`55${zapNumber}@c.us`, "Ola , \nSeu codigo de Verficao e : \n" + "*"+  code  +"*"+ "\nValido por 10 minutos")
    .then((result) => {
  //    console.log('Result: ', result);
      return true;
    })
    .catch((error) => {
      console.error('Error when sending message:', error);
      return res.status(500).json({ error: 'Error sending message' });
    });

  }catch(error){
    console.log("errrp here")
    console.log(error)
  }
};

module.exports = { sendMessageZap };
