const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { ObjectId } = mongoose.Schema;
const orderSchema = new Schema(
    {
        email: {
            type: String,
            trim: true,
            required: true,
            maxlength: 32,
        },
        product: {
            type: ObjectId,
            ref: "Product",
        },
        price: {
            type: Number,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Ordercomplete", orderSchema);
