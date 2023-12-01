


const nodemailer = require('nodemailer')

const sendEmail = async ()  =>{
    try{
    const transporter = nodemailer.createTransport({
        host:process.env.MAILGUN_HOSTNAME,
        port:process.env.MAILGUN_PORT,
        auth:{
            user: process.env.MAILGUN_USERNAME,
            pass: process.env.MAILGUN_PASSWORD
        }

    })
    const mailOptions = {
        from:'HANNAN <hannan@hannan.com>',
      //  to: emails.join(', '),
         to:"hannanhoney5000@gmail.com",
        subject: `Sistema verificou atualização no `,
        text:`Teve Segatualizaçoes :- \n `,
        
    }

    await transporter.sendMail(mailOptions)

}catch(error){console.log(error)}
}

console.log("hello")
//sendEmail()
module.exports ={sendEmail}