const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const contactSchema = new Schema(
    {
        name: {
            type: String,
            trim: true,
            required: true,
            maxlength: 32,
        },
        lname: {
            type: String,
            trim: true,
            required: true,
            maxlength: 32,
        },
        email: {
            type: String,
            trim: true,
            required: true,
            unique: false,
        },
        desc: {
            type: String,
            trim: true,
            required: true,
            maxlegth: 2000,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Contact", contactSchema);
