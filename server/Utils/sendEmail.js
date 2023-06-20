const nodemailer = require('nodemailer');

const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });

const transporter = nodemailer.createTransport({
    service: 'Gmail',
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD
    },
});

const sendOTPEmail = (email, otp) => {
    const mailOptions = {
        from: 'bhattaraisuresh009@gmail.com',
        to: email,
        subject: 'OTP for Password Reset',
        text: `Your OTP for password reset is ${otp}`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log('Error: ', error);
        } else {
            console.log('Email sent: ', info.response);
        }
    })
}

module.exports = sendOTPEmail;