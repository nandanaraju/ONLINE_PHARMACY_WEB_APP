const express = require('express');
const router = express.Router();
const User = require('../models/user');
const Product = require('../models/product');
const verifyToken = require('../middleware/authMiddleware');


router.post('/add/:id/:quantity', verifyToken, async (req, res) => {
    const { id, quantity } = req.params;
    console.log(quantity);

    try {
        const product = await Product.findOne({ productId: id });
        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }

        const user = await User.findOne({ email: req.userEmail });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }




        const existingProduct = user.cart.find(item => item.productId == id);
        if (existingProduct) {
          existingProduct.quantity=  Number(existingProduct.quantity )+ Number(quantity);
        product.productQuantity-=existingProduct.quantity

        } else {
            user.cart.push({ productId:id, quantity:quantity });
        product.productQuantity-=quantity

        }
        await User.updateOne({email:req.userEmail},{$set:user});

        await Product.updateOne({productId:id},{$set:product});
        res.json({ message: 'Product added to cart', cart: user.cart });
    } catch (error) {
        console.error('Error adding product to cart:', error);
        res.status(500).json({ error: 'Failed to add product to cart' });
    }
});





router.put('/update/:id/:quantity', verifyToken, async (req, res) => {
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
