const { json } = require('body-parser');
const venom = require('venom-bot');
const fs = require('fs');
const path = require('path');

const  { fileURLToPath } = require("url");


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

const sendQrCode = async (req,res)=>{

  return

}
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