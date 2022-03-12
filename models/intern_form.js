const mongoose = require('mongoose')

const resume_form = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    college: {
        type: String,
        required: true
    },
    degree: {
        type: String,
        required: true
    },
    year: {
        type: Number,
        required: true
    },
    gpa: {
        type: String,
        required: true
    },
    resume: {
        type: String,
        required: true
    },
    criminal_record: {
        type: Boolean,
        default: false
    }
})

module.exports = mongoose.model("Resume", resume_form)