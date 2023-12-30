const nodemailer = require('nodemailer');


const fs = require('fs');
const path = require('path');

const confirmationTempaletePath = path.join(__dirname, '../../template/emailConfirmation.html');
let confirmationTempalete = fs.readFileSync(confirmationTempaletePath, 'utf-8');

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
        confirmationTempalete = confirmationTempalete.replace('{{code}}', code);

        const mailOptions = {
            from: 'Suporte <suporte@cebraspecrawlerx.tech>',
            to: email,
            subject: 'Code to Register Email',
            html: confirmationTempalete,
        };

        await transporter.sendMail(mailOptions);
    } catch (error) {
        console.log(error);
    }
};

module.exports = { sendCodeEmail };
