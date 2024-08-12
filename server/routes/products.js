const express = require('express');
const router = express.Router();
const Product = require('../models/product');
const verifyToken = require('../middleware/authMiddleware');


router.post('/products',verifyToken,  async (req, res) => {
    if (req.userType !== 'admin') {
        return res.status(403).json({ error: 'Access denied' });
    }

    try {
        const { productId, productName, productDescription, productPrice,productQuantity } = req.body;
        const product = new Product({ productId, productName, productDescription, productPrice,productQuantity });
        await product.save();
        res.status(201).json({ message: 'Product created successfully', product });
    } catch (error) {
        console.error('Product creation error:', error);
        res.status(500).json({ error: 'Product creation failed' });
    }
});
router.get("/products/:id",  async (req, res) => {
    const productId = req.params.id;
    const details = await Product.findOne({ productId: productId }, { _id: 0 });
    res.json(details);
});


router.get('/products', async (req, res) => {
    try {
        const products = await Product.find({});
        res.status(200).json(products);
    } catch (error) {
        console.error('Fetching products error:', error);
        res.status(500).json({ error: 'Failed to fetch products' });
    }
});


router.put('/products/:id', verifyToken, async (req, res) => {
    if (req.userType != 'admin') {
        console.log("new1", userType)
        return res.status(403).json({ error: 'Access denied' });
    }

    try {
        const  productId  = req.params.id;
        console.log("new1", productId)
        const { productName, productDescription, productPrice,productQuantity } = req.body;

        const updatedProduct = await Product.findOneAndUpdate(
            { productId },
            { productName, productDescription, productPrice,productQuantity },
            { new: true }
        );

        if (!updatedProduct) {
            return res.status(404).json({ error: 'Product not found' });
        }

        res.status(200).json({ message: 'Product updated successfully', product: updatedProduct });
    } catch (error) {
        console.error('Product update error:', error);
        res.status(500).json({ error: 'Product update failed' });
    }
});


router.delete('/products/:id', verifyToken, async (req, res) => {
    if (req.userType !== 'admin') {
        return res.status(403).json({ error: 'Access denied' });
    }

    try {
        const productId = req.params.id;
        console.log(productId);

        const deletedProduct = await Product.findOneAndDelete({ productId });
        console.log("work2");
        if (!deletedProduct) {
            return res.status(404).json({ error: 'Product not found' });
        }

        res.status(200).json({ message: 'Product deleted successfully' });
    } catch (error) {
        console.error('Product deletion error:', error);
        res.status(500).json({ error: 'Product deletion failed' });
    }
});

module.exports = router;
