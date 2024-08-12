const express = require('express');
const router = express.Router();
const User = require('../models/user');
const Product = require('../models/product');
const verifyToken = require('../middleware/authMiddleware');



router.get('/profile', verifyToken, async (req, res) => {
    try {
        const user = await User.findOne({ email: req.userEmail }).select('-password');
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        const populatedCart = await Promise.all(user.cart.map(async item => {
            const product = await Product.findOne({ productId: item.productId });
            return { ...item.toObject(), productName: product.productName, productPrice: product.productPrice };
        }));

        res.json({ user: { ...user.toObject(), cart: populatedCart } });
    } catch (error) {
        console.error('Error fetching profile:', error);
        res.status(500).json({ error: 'Failed to fetch profile' });
    }
});



router.put('/', verifyToken, async (req, res) => {
    const { username, email } = req.body;

    try {
        const user = await User.findOne({ email: req.userEmail });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        user.username = username || user.username;
        // user.email = email || user.email;
        await user.save();

        res.json({ message: 'Profile updated successfully', user });
    } catch (error) {
        console.error('Error updating profile:', error);
        res.status(500).json({ error: 'Failed to update profile' });
    }
});

module.exports = router;
