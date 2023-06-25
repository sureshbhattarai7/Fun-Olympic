const express = require('express');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const xss = require('xss-clean');

require('dotenv').config({path: './config.env'});
const app = express();
const userRoute = require('./Route/userRoute');
const cors = require('cors');
const { default: mongoExpressSanitize } = require('mongo-express-sanitize');
require('./Database/databaseConnection');

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

app.use('/user', userRoute);


const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`App is connected at ${PORT}`);
});
