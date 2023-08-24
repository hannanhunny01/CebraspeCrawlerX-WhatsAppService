const { update } = require("tar");
const venom = require('venom-bot')


const sendMessage = async (string) =>{
    session = await venom.create({
      session: 'firstSession' //name of session
    })
    secondSession = await venom.create({
      session: 'SecondSession' //name of session
    })
    await session.sendText('5561994281856@c.us', string).then((result) => {
      console.log('Result: ', result); //return object success
    })
    .catch((erro) => {
      console.error('Error when sending: ', erro); //return object error
    });
    await secondSession.sendText('5561986250932@c.us', string).then((result) => {
      console.log('Result: ', result); //return object success
    })
  }
  







const sendMessagePas = async  function (req,res){

try{
       
        secondSession = await venom.create({
        session: 'SecondSession' //name of session
      })
    
   data = req.body.data

   for (const item of req.body.data){
    const name = "Para " + item.nameOfObject + "\n"
    let update = " Teve Seguinte Atualizacoes \n "
    for (const updateitem of item.updates){
     update += `${updateitem.date} - ${updateitem.name} \n \n \n`;
    }
    console.log(`${item.people[0].whatsapp}@c.us`)

    await secondSession.sendText(`${item.people[0].whatsapp}@c.us`, name + update).then((result) => {
        console.log('Result: ', result); 
      })
   }
  
   console.log(data)
   
   return res.status(200).json(data)

}catch(error){
    console.log(error)
}

}

module.exports = {sendMessagePas}