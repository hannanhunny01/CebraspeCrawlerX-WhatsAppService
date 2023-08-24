const venom = require('venom-bot');







const venomMessage = async () =>{
  session = await venom.create({
    session: 'firstSession' //name of session
  })
  secondSession = await venom.create({
    session: 'SecondSession' //name of session
  })
  await session.sendText('5561994281856@c.us', '👋 Hello !').then((result) => {
    console.log('Result: ', result); //return object success
  })
  .catch((erro) => {
    console.error('Error when sending: ', erro); //return object error
  });
  await secondSession.sendText('5561986250932@c.us', '👋 Hello !').then((result) => {
    console.log('Result: ', result); //return object success
  })
}

venomMessage()


