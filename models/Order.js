const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;
const Schema = mongoose.Schema;

const prodcutCartSchema = new Schema({
    product: { type: ObjectId, ref: "Product" },
    name: String,
    count: Number,
    price: Number,
});

const orderSchema = new Schema({
    products: [prodcutCartSchema],
    transaction_id: {},
    amount: { type: Number },
    address: String,
    status: {
        type: String,
        default: "Recieved",
        enum: ["Cancelled", "Delivered", "Shipped", "Processing", "Recieved"],
    },
    upadated: Date,
    user: {
        type: ObjectId,
        ref: "User",
    },
});

const Order = mongoose.model("Order", orderSchema);
const ProductCart = mongoose.model("ProductCart", prodcutCartSchema);

module.exports = { Order, ProductCart };
