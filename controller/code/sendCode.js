// this file contains the code functions for sending the code to the user that are used by email and telegram

const { sendCodeEmail } = require("./emailCode");

const {sendMessageZap} = require('./whatsappCode');

function generateRandomMixTwelve() {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let mix = '';
  
    for (let i = 0; i < 12; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      mix += characters.charAt(randomIndex);
    }
  
    return mix;
  }
  


  function generateRandomSixDigitNumber() {
    const min = 100000; // Minimum 6-digit number
    const max = 999999; // Maximum 6-digit number
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }


const sendCode = async(req,res) =>{

  try{

    const code = generateRandomSixDigitNumber()
   if(req.body.contactMethod == 'email'){
    try{
    await  sendCodeEmail(req.body.contactValue,code)
  }catch(error){
    return res.status(500).json({message:"Cannot send message now"})
  }
    return res.status(200).json({code:code})  

  }
  else if(req.body.contactMethod == 'phone'){

    try{

        await sendMessageZap(req.body.contactValue,code)

    }catch(error){
       return res.status(500).json({message:"Cannot send message now"})
    }
      
    return res.status(200).json({code:code})

  }




}catch(error){console.log(error)}
}
  

  
module.exports ={generateRandomMixTwelve,generateRandomSixDigitNumber,sendCode}
  
