const venom = require('venom-bot');
let whatsappClient;

const initializeSession = () => {
  return new Promise((resolve, reject) => {
    venom
      .create({
        session: 'session-name',
        headless: false
      })
      .then((client) => {
        whatsappClient = client;
        console.log('WhatsApp session initialized');
        resolve(whatsappClient);
      })
      .catch((error) => {
        console.error('Error initializing WhatsApp session:', error);
        reject(error);
      });
  });
};

// Function to get the initialized whatsappClient
const getWhatsappClient = async () => {
  if (!whatsappClient) {
    await initializeSession();
  }
  return whatsappClient;
};

module.exports = { getWhatsappClient };
