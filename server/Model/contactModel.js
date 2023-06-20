const mongoose = require('mongoose');
const validator = require('validator');

const contactSchema = mongoose.Schema({
    fullname: {
        type: String,
        required: [true, 'Enter your full name!']
    },
    email: {
        type: String,
        // required: [true, 'Enter your email!'],
        validate: [validator.isEmail, 'Email is invalid!']
    },
    message: {
        type: String,
        // required: [true, 'Enter your message!']
    }
});

const Contact = mongoose.model('Contact', contactSchema);
module.exports = Contact;