const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: { type: String, required: true,unique:true},
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    userType: { type: String, required: true, enum: ['user', 'admin'], default: 'user' },
    cart: [{
        productId: { type: Number, required: true },
        quantity: { type: Number, required: true }
    }]
});

const User = mongoose.model('User', userSchema);

module.exports = User;
