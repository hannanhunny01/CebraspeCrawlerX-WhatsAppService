const nodemailer = require('nodemailer');

const sendEmail = async (title, textToSend, email) => {
    try {
        const transporter = nodemailer.createTransport({
            host: process.env.MAILGUN_HOSTNAME,
            port: process.env.MAILGUN_PORT,
            auth: {
                user: process.env.MAILGUN_USERNAME,
                pass: process.env.MAILGUN_PASSWORD
            }
        });

        for (const item of email) {
            const mailOptions = {
                from: 'Suporte <suporte@cebraspecrawlerx.tech>',
                to: item.email,
                subject: title,
                text: `Teve seguinte atualizações:\n\n${textToSend}`, // Include the introductory text
            };
            await transporter.sendMail(mailOptions);
        }
    } catch (error) {
        console.log(error);
    }
}

console.log("hello");
// sendEmail();
module.exports = { sendEmail };
