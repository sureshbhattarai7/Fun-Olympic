const mongoose = require('mongoose');

const broadcastSchema = mongoose.Schema({
    category: {
        type: String,
        required: [true, 'Category must be defined!']
    },
    title: {
        type: String,
        required: [true, 'Title must be entered!']
    },
    url: {
        type: String,
        required: [true, 'URL must be entered!']
    },
    description: {
        type: String,
        required: [true, 'Description must be given!']
    }
});

const Broadcast = mongoose.model('Broadcast', broadcastSchema);
module.exports = Broadcast;