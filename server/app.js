const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require('cookie-parser');
const path = require('path');
const fs = require('fs');

const app = express();

// Import routes
const auth = require('./routes/auth');
const cart = require('./routes/cart');
const profile = require('./routes/profile');
const products = require('./routes/products');
const message = require('./routes/message');
const checkout = require('./routes/checkout'); 

app.use(
    cors({
        origin: "http://localhost:3001",
    })
);

app.use(express.json());
app.use(cookieParser());

// Use routes
app.use("/", auth);
app.use("/", cart);
app.use("/", profile);
app.use("/", products);
app.use("/", message);
app.use("/", checkout); 

// Middleware to log requests
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});

// Connect to MongoDB
mongoose.connect("mongodb://mongodb:27017/demo_care", {
});

const database = mongoose.connection;

database.on("error", (error) => {
    console.log(error);
});

database.once("connected", () => {
    console.log("Database Connected");
});

// Start the server
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
