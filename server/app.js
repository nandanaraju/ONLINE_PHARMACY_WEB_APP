const express = require("express");
const { mongoose } = require("mongoose");
const app = express();
const cors = require("cors");
const products = require("./routes/products");
const cart = require("./routes/cart")
const profile =require("./routes/profile")
const auth = require('./routes/auth')
const cookieParser = require('cookie-parser')

app.use(
    cors({
        origin: "http://localhost:3001",
    })
);

app.use(express.json());
app.use(cookieParser());

app.use("/", auth);
app.use("/",cart);
app.use("/",profile);
app.use("/", products);

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

mongoose.connect("mongodb://localhost:27017/demo_care");

const database = mongoose.connection;

database.on("error", (error) => {
    console.log(error);
});

database.once("connected", () => {
    console.log("Database Connected");
});
