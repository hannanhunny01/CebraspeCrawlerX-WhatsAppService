const nodemailer = require('nodemailer');


const fs = require('fs');
const path = require('path');



const sendCodeEmail = async (email, code) => {
    try {
        const transporter = nodemailer.createTransport({
            host: process.env.MAILGUN_HOSTNAME,
            port: process.env.MAILGUN_PORT,
            auth: {
                user: process.env.MAILGUN_USERNAME,
                pass: process.env.MAILGUN_PASSWORD
            }
        });
        const confirmationTempaletePath = path.join(__dirname, '../../template/emailConfirmation.html');
        let confirmationTempalete = fs.readFileSync(confirmationTempaletePath, 'utf-8');    
        confirmationTempalete = confirmationTempalete.replace('{{code}}', code);

        const mailOptions = {
            from: 'Suporte <suporte@cebraspecrawlerx.tech>',
            to: email,
            subject: 'Confirmaçao para Validação de Email',
            html: confirmationTempalete,
        };

        await transporter.sendMail(mailOptions);
    } catch (error) {
        console.log(error);
    }
};

module.exports = { sendCodeEmail };
