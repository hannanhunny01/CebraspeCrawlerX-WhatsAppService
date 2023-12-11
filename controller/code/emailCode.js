const nodemailer = require('nodemailer');

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

        const mailOptions = {
            from: 'Suporte <suporte@cebraspecrawlerx.tech>',
            to: email,
            subject: 'Code to Register Email',
            html: `
                <p>Olá,</p>
                <p>Você está recebendo este e-mail para confirmar sua identidade no CebraspeCrawler X.</p>
                <p>Seu código de verificação é:</p>
                <h2 style="color: #007bff;">${code}</h2>
                <p>Este código é válido pelos próximos dez minutos.</p>
                <p>Insira este código no site para concluir o processo de verificação.</p>
                <p>Se você não solicitou esta verificação, pode ignorar este e-mail com segurança.</p>
                <p>Atenciosamente,<br>Equipe CebraspeCrawler X</p>
            `
        };

        await transporter.sendMail(mailOptions);
    } catch (error) {
        console.log(error);
    }
};

module.exports = { sendCodeEmail };
