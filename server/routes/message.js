const express = require('express');
const router = express.Router();
const Message = require('../models/message'); 

router.post('/messages', async (req, res) => {
    try {
        const { email, mobileNumber, message } = req.body;
        const newMessage = new Message({ email, mobileNumber, message });
        await newMessage.save();
        res.status(201).json(newMessage);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/messages', async (req, res) => {
    try {
        const message = await Message.find();
        res.json(message);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;