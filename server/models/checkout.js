const mongoose = require('mongoose');

const checkoutSchema = new mongoose.Schema({
    name: String,
    address: String,
    contactNumber: String,
    prescription: {
        filename: String,
        originalname: String,
        path: String,
    },
    status: {
        type: String,
        default: 'Pending',
    },
    confirmedByAdmin: {
        type: Boolean,
        default: false,
    },
});

module.exports = mongoose.model('Checkout', checkoutSchema);
