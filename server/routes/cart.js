const express = require('express');
const router = express.Router();
const User = require('../models/user');
const Product = require('../models/product');
const verifyToken = require('../middleware/authMiddleware');


router.post('/add', verifyToken, async (req, res) => {
    const { productId, quantity } = req.body;

    try {
        const product = await Product.findOne({ productId });
        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }

        const user = await User.findOne({ email: req.userEmail });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        const existingProduct = user.cart.find(item => item.productId === productId);
        if (existingProduct) {
            existingProduct.quantity += quantity;
        } else {
            user.cart.push({ productId, quantity });
        }
        await user.save();

        res.json({ message: 'Product added to cart', cart: user.cart });
    } catch (error) {
        console.error('Error adding product to cart:', error);
        res.status(500).json({ error: 'Failed to add product to cart' });
    }
});


router.put('/update', verifyToken, async (req, res) => {
    const { productId, quantity } = req.body;

    try {
        const user = await User.findOne({ email: req.userEmail });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        const productInCart = user.cart.find(item => item.productId === productId);
        if (!productInCart) {
            return res.status(404).json({ error: 'Product not found in cart' });
        }

        productInCart.quantity = quantity;
        await user.save();

        res.json({ message: 'Cart updated', cart: user.cart });
    } catch (error) {
        console.error('Error updating cart:', error);
        res.status(500).json({ error: 'Failed to update cart' });
    }
});


router.delete('/remove', verifyToken, async (req, res) => {
    const { productId } = req.body;

    try {
        const user = await User.findOne({ email: req.userEmail });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        user.cart = user.cart.filter(item => item.productId !== productId);
        await user.save();

        res.json({ message: 'Product removed from cart', cart: user.cart });
    } catch (error) {
        console.error('Error removing product from cart:', error);
        res.status(500).json({ error: 'Failed to remove product from cart' });
    }
});

module.exports = router;
