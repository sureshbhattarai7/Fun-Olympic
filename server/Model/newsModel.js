const mongoose = require('mongoose');

const newSchema = new mongoose.Schema({
    category: {
        type: String,
        required: true
    },

    description: {
        type: String,
        required: true
    },

    photo: {
        type: String
    },

    title: {
        type: String
    }
})

const News = mongoose.model("News", newSchema);
module.exports = News;