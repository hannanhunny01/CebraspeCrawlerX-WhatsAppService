


const { getWhatsappClient } = require('../zapSession/session');



const sendMessageZap = async (req, res) => {
    const whatsappClient = await getWhatsappClient();

    console.log(whatsappClient)

  // Check if the WhatsApp client is initialized
  if (!whatsappClient) {
    return res.status(500).json({ error: 'WhatsApp session not initialized' });
  }

  // Send a message using the initialized WhatsApp client
  whatsappClient
    .sendText('5561994281856@c.us', req.body.message)
    .then((result) => {
      console.log('Result: ', result);
      return res.json(whatsappClient);
    })
    .catch((error) => {
      console.error('Error when sending message:', error);
      return res.status(500).json({ error: 'Error sending message' });
    });
};

module.exports = { sendMessageZap };
