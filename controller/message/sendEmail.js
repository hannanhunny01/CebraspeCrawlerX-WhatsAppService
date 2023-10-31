


const nodemailer = require('nodemailer')

const sendEmail = async (emails,msg,name)  =>{
    try{
    const transporter = nodemailer.createTransport({
        host:process.env.EMAIL_HOSTNAME,
        port:process.env.EMAIL_PORT,
        auth:{
            user: process.env.EMAIL_USERNAME,
            pass: process.env.EMAIL_PASSWORD
        }

    })
    const mailOptions = {
        from:'HANNAN <hannan@hannan.com>',
        to: emails.join(', '),
        subject: `Sistema verificou atualização no ${name}`,
        text:`Teve Segatualizaçoes :- \n ${msg}`,
        
    }

    await transporter.sendMail(mailOptions)

}catch(error){console.log(error)}
}
module.exports ={sendEmail}