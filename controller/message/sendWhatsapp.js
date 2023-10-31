const venom = require('venom-bot');


const sendWhatsapp = async (data,items)=>{


  session = await venom.create({
    session: 'firstSession' 
  })
 
  for (const item of items){
    await session.sendText(`${item.whatsapp}@c.us`, '👋 Hello !').then((result) => {
        console.log('Result: ', result); 
      })
      .catch((erro) => {
        console.error('Error when sending: ', erro); 
      });

  }

 
}




    
