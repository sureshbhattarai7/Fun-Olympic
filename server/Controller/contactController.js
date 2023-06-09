const Contact = require('./../Model/contactModel');

exports.createContact = async (req, res) => {
    const contact = await Contact.create(req.body);
    try {
        res.status(200).json({
            status: 'success',
            data: {
                contact
            }
        })
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err.message
        })
    }

}

exports.getContacts = async (req, res) => {
    try {
        const contacts = await Contact.find();
        res.status(200).json({
            status: 'success',
            data: {
                contacts
            }
        })
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            err: err.message
        })
    }
}
