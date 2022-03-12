const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    points: {
        type: Number,
        required: true
    },
})

module.exports = mongoose.model('Intern', schema)