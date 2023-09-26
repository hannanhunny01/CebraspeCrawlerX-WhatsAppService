


const nodemailer = require('nodemailer')

const sendCodeEmail = async (email,code)  =>{
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
        to: email,
        subject: "Code to Register Email",
        text: `this is code :  ${code}  it is Valid for next ten minutes`,
        
    }

    await transporter.sendMail(mailOptions)

}catch(error){console.log(error)}
}
module.exports ={sendCodeEmail}