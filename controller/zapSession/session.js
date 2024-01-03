const { json } = require('body-parser');
const venom = require('venom-bot');
const fs = require('fs');
const path = require('path');
const photo = '../../out.png';
const photoPath = path.join(__dirname, '../../out.png');


const  { fileURLToPath } = require("url");


let whatsappClient;

const handleQRCode = async (base64Qr) => {
  try {
    const matches = base64Qr.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
    if (!matches || matches.length !== 3) {
      throw new Error('Invalid input string');
    }

    const response = {};
    response.type = matches[1];
    response.data = Buffer.from(matches[2], 'base64');

    const imageBuffer = response;

    await new Promise((resolve, reject) => {
      require('fs').writeFile(
        'out.png',
        imageBuffer['data'],
        'binary',
        (err) => {
          if (err != null) {
            console.log(err);
            reject(err);
          } else {
            resolve();
          }
        }
      );
    });

    // Now, call sendQrCode after the file is written
    sendQrCode(photoPath);
  } catch (error) {
    throw error;
  }
};





const initializeSession = () => {
  console.log("itcomes")
  return new Promise((resolve, reject) => {
    venom
      .create({
        session: 'session-name',
        headless: true,
        autoClose: 60000,
      }, (base64Qr, asciiQR, attempts, urlCode) => {
        handleQRCode(base64Qr);
      })
      .then((client) => {
        whatsappClient = client;
        console.log('WhatsApp session initialized');
        resolve(whatsappClient);
      })
      .catch((error) => {
        console.error('Error initializing WhatsApp session:', error);
        console.log("im here")
        if (whatsappClient) {
          whatsappClient.close();
        }
        reject(error);
    //    reject(error);
      });
  });
};


const closeSession = async(req,res) =>{
  if(whatsappClient!=undefined){
    await whatsappClient.close();
    whatsappClient = undefined;
    return "Session Closed"

  }
  return "Session Already Closed"


}


const sendQrCode = async (photoPath) => {
  try {
    const  telegramBot = require('../apisStatus/apiStatus')

    const photoBuffer = fs.readFileSync(photoPath);
    telegramBot.sendMessage(process.env.TELEGRAM_CHAT_ID_APISTATUS, 'QrCode');
    await telegramBot.sendPhoto(
      process.env.TELEGRAM_CHAT_ID_APISTATUS,
      photoBuffer,
      { caption: 'QrCode' }
    );
   // fs.unlinkSync(photoPath);


    console.log('Photo sent successfully.');
  } catch (error) {
    console.error('Error sending photo:', error);
  }
};

//sendQrCode(photoPath);


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
    throw error;
};

module.exports = { getWhatsappClient,closeSession };