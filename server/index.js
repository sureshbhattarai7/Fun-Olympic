const express = require('express');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const xss = require('xss-clean');

const otpgenerator = require('otp-generator');

require('dotenv').config({path: './config.env'});
const app = express();
const userRouter = require('./Route/userRoute');
const cors = require('cors');
const { default: mongoExpressSanitize } = require('mongo-express-sanitize');
const sendOTPEmail = require('./Utils/sendEmail');
require('./Database/databaseConnection');
const Contact = require('./Model/contactModel');

app.use(mongoExpressSanitize());
app.use(helmet());

app.use(express.json());
app.use(cors());
app.use(xss());


const limiter = rateLimit({
    max: 100,
    windoMs: 60 * 60 * 1000,
    message: 'To many requests from this IP, please try again later in an hour!'
});
app.use(limiter);

app.use('/user', userRouter);

app.post('/forgotpassword', (req, res) => {
    const { email } = req.body;
    const generateOTP = () => {
        return otpgenerator.generate(5, { digits: false, lowerCaseAlphabets: false, upperCaseAlphabets: false, specialChars: false });
    }

    sendOTPEmail(email, otp);

    res.json({ message: 'OTP sent successfully!' });
});


const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`App is connected at ${PORT}`);
});