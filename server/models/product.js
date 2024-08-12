const mongoose = require('mongoose');


const productSchema = new mongoose.Schema({
    productId: { type: Number, required: true, unique: true },
    productName: { type: String, required: true, unique: true },
    productQuantity: { type: Number, required: true },
    productDescription: { type: String, required: true },
    productPrice: { type: Number, required: true },
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
