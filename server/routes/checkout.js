const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const sharp = require('sharp');
const Checkout = require('../models/checkout');

const router = express.Router();

const uploadDir = path.join(__dirname, '../prescriptions');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

router.post('/checkout', upload.single('prescription'), async (req, res) => {
    try {
        const newCheckout = new Checkout({
            name: req.body.name,
            address: req.body.address,
            contactNumber: req.body.contactNumber,
            prescription: {
                filename: req.file.filename,
                originalname: req.file.originalname,
                path: req.file.path,
            },
        });

        await newCheckout.save();
        res.json({ message: 'Checkout successful', checkoutId: newCheckout._id });
    } catch (error) {
        console.error('Error processing checkout:', error);
        res.status(500).json({ message: 'Error processing checkout' });
    }
});

router.get('/admin/checkouts', async (req, res) => {
    try {
        const checkouts = await Checkout.find();
        const checkoutsWithImageUrl = checkouts.map(checkout => ({
            ...checkout._doc,
            imageUrl: `api/admin/checkouts/${checkout._id}/image`
        }));
        res.json(checkoutsWithImageUrl);
    } catch (error) {
        console.error('Error fetching checkouts:', error);
        res.status(500).json({ message: 'Error fetching checkouts' });
    }
});

router.get('/admin/checkouts/:id/image', async (req, res) => {
    try {
        const pres = await Checkout.findById(req.params.id);
        if (!pres) {
            return res.status(404).send('Prescription not found');
        }
        const presPath = path.resolve(__dirname, '..', pres.prescription.path);

        sharp(presPath)
            .resize({ width: 200 }) 
            .toBuffer()
            .then(data => {
                res.type('image/jpeg');
                res.send(data);
            })
            .catch(err => {
                console.error('Error processing prescription:', err);
                res.status(500).send('Error processing prescription');
            });
    } catch (error) {
        console.error('Error retrieving image:', error);
        res.status(500).send('Error retrieving image');
    }
});

router.put('/admin/checkouts/:id/confirm', async (req, res) => {
    try {
        const { id } = req.params;
        const checkout = await Checkout.findById(id);
        if (!checkout) {
            return res.status(404).json({ message: 'Order not found' });
        }

        checkout.confirmedByAdmin = true;
        checkout.status = 'Confirmed';
        await checkout.save();

        res.json({ message: 'Order confirmed successfully' });
    } catch (error) {
        console.error('Error confirming order:', error);
        res.status(500).json({ message: 'Error confirming order' });
    }
});

router.put('/admin/checkouts/:id/reject', async (req, res) => {
    try {
        const { id } = req.params;
        const checkout = await Checkout.findById(id);
        if (!checkout) {
            return res.status(404).json({ message: 'Order not found' });
        }

        checkout.confirmedByAdmin = false;
        checkout.status = 'Cancelled';
        await checkout.save();

        res.json({ message: 'Order cancelled successfully' });
    } catch (error) {
        console.error('Error cancelling order:', error);
        res.status(500).json({ message: 'Error cancelling order' });
    }
});


module.exports = router;
