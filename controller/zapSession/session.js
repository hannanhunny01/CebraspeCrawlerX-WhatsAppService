const venom = require('venom-bot');
let whatsappClient;

const initializeSession = () => {
  console.log("itcomes")
  return new Promise((resolve, reject) => {
    venom
      .create({
        session: 'session-name',
        headless: false,
        autoClose: 60000,
      })
      .then((client) => {
        whatsappClient = client;
        console.log('WhatsApp session initialized');
        resolve(whatsappClient);
      })
      .catch((error) => {
        console.error('Error initializing WhatsApp session:', error);
        venom.close();
        client.close();
        whatsappClient = null;
        reject(error);
      });
  });
};

// Function to get the initialized whatsappClient
const getWhatsappClient = async () => {
  try{
  if (!whatsappClient) {

    await initializeSession();
  }
  return whatsappClient;}
  catch(error){
    console.log("errrp here")
    console.log(error) }
};

module.exports = { getWhatsappClient };
