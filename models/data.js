const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    university: {
        type: String,
        required: true
    },
    count: {
        type: Number,
        required: true
    },
})

module.exports = mongoose.model('Intern', schema)