const User = require("../models/User");
const Order = require("../models/Order");
const Contact = require("../models/Contact");
const { check, validationResult } = require("express-validator");
exports.getUserById = (req, res, next, id) => {
    User.findById(id).exec((err, user) => {
        if (err || !user) {
            return res.status(400).json({
                error: "No user was found in DB",
            });
        }
        req.profile = user;
        next();
    });
};
exports.getAllUser = (req, res) => {
    User.find(
        {},
        { salt: 0, encry_password: 0, createdAt: 0, updatedAt: 0 }
    ).exec((err, users) => {
        if (err || !users) {
            return res.status(400).json({
                error: "No user was found in DB",
            });
        }
        res.json(users);
    });
};
exports.getUser = (req, res) => {
    req.profile.salt = undefined;
    req.profile.encry_password = undefined;
    req.profile.createdAt = undefined;
    req.profile.updatedAt = undefined;

    return res.json(req.profile);
};

exports.updateUser = (req, res) => {
    User.findByIdAndUpdate(
        { _id: req.profile._id },
        { $set: req.body },
        { new: true, useFindAndModify: false },
        (err, user) => {
            if (err) {
                return res.status(400).json({
                    error: "You are not authorized to update this user",
                });
            }
            user.salt = undefined;
            user.encry_password = undefined;
            user.createdAt = undefined;
            user.updatedAt = undefined;
            res.json(user);
        }
    );
};
exports.userParchaseList = (req, res) => {
    Order.find({ user: req.profile._id })
        .populate("user", "_id name")
        .exec((err, order) => {
            if (err) {
                if (err) {
                    return res.status(400).json({
                        error: "No order in this account",
                    });
                }
            }
            return res.json(order);
        });
};

exports.pushOrderInPurchaseList = (req, res, next) => {
    let puchases = [];
    req.body.order.products.forEach((product) => {
        purchases.push({
            _id: product._id,
            name: product.name,
            description: product.description,
            category: product.category,
            quantity: product.quantity,
            amount: req.body.order.amount,
            transation_id: req.body.order.transaction_id,
        });
    });

    //store in DB

    User.findOneAndUpdate(
        { _id: req.profile._id },
        { $push: { purchases: purchases } },
        { new: true },
        (err, purchases) => {
            if (err) {
                return res.status(400).json({
                    error: "Unable to save purchage list",
                });
            }
            next();
        }
    );
};
//for contact
exports.contact = (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({
            errors: errors.array()[0].msg,
            err_parameter: errors.array()[0].param,
        });
    }
    const user = new Contact(req.body);
    user.save((err, result) => {
        if (err) {
            return res
                .status(400)
                .json({ err: "Not able to save user in DB", err_message: err });
        }
        res.json(result);
    });
};
