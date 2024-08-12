const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        match: [/^\S+@\S+\.\S+$/, 'Please use a valid email address.']
    },
    mobileNumber: {
        type: String,
        required: true,
        match: [/^\d{10}$/, 'Please use a valid 10-digit mobile number.']
    },
    message: {
        type: String,
        required: true,
        minlength: [10, 'Message should be at least 10 characters long.']
    }
}, { timestamps: true });

module.exports = mongoose.model('Message', messageSchema);