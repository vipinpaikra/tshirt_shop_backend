require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const app = express();

// my routes
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");
const categoryRoutes = require("./routes/category");
const productRoutes = require("./routes/product");
const orderRoutes = require("./routes/order");
const stripeRoutes = require("./routes/stripepayment");

mongoose
    .connect(
        // " mongodb+srv://vipin:vipin1234@cluster0.wdbru.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
        "mongodb://localhost:27017/testTshirt",
        {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
        }
    )
    .then(() => {
        console.log(`Successfully connected Database`);
    })
    .catch((err) => {
        console.log(`We have some DATA connection issue ${err}`);
    });

const mymiddleware = (req, res, next) => {
    console.log("middleware");
    next();
};

app.get("/", mymiddleware, (req, res) => {
    const user = { username: "aamir@gmail.com", name: "aamir", age: 20 };
    res.json(user);
});

app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

//my Routes
app.use("/api", authRoutes);
app.use("/api", userRoutes);
app.use("/api", categoryRoutes);
app.use("/api", productRoutes);
app.use("/api", orderRoutes);
app.use("/api", stripeRoutes);

//port

const port = 8000 || process.env.PORT;
app.listen(port, () => {
    console.log(`Server is running at port http://localhost:${port}`);
});
