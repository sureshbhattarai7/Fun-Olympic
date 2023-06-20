const Contact = require('./../Model/contactModel');

exports.contact = (req, res) => {
    const { fullname, email, message } = req.body;

    const newMessage = new Contact({
        fullname,
        email,
        message
    });

    newMessage.save((err) => {
        if (err) {
            console.log(err.message);
            res.status(500).json({
                status: 'fail',
                message: 'Failed to save the message!'
            })
        } else {
            res.status(200).json({
                status: 'success',
                message: 'Message saved successfully!'
            })
        };
    });
}
