


const { getWhatsappClient } = require('../zapSession/session');

const {generateRandomSixDigitNumber} = require('./sendCode')

const sendMessageZap = async (req, res) => {
    const whatsappClient = await getWhatsappClient();

    console.log(whatsappClient)

  // Check if the WhatsApp client is initialized
  if (!whatsappClient) {
    return res.status(500).json({ error: 'WhatsApp session not initialized' });
  }

  // Send a message using the initialized WhatsApp client
  whatsappClient
    .sendText(`55${req.body.number}@c.us`, "Ola , \nSeu codigo de Verficao e : \n" + "*"+generateRandomSixDigitNumber() +"*"+ "\nValido por 10 minutos")
    .then((result) => {
      console.log('Result: ', result);
      return res.status(200).json({message:"Message Sent Successfully"});
    })
    .catch((error) => {
      console.error('Error when sending message:', error);
      return res.status(500).json({ error: 'Error sending message' });
    });
};

module.exports = { sendMessageZap };
