const mongoose = require('mongoose');

const sportSchema = new mongoose.Schema({
    sporturl: {
        type: String,
        required: true
    },

    sportcategory: {
        type: String,
        required: true
    },

    date: {
        type: Date,
        default: Date.now()
    }
})

const Sport = mongoose.model("Sport", sportSchema);
module.exports = Sport;