const express = require("express");
const router = express.Router();
const { isSignedIn, isAuthenticated, isAdmin } = require("../controller/auth");
const { getUserById, pushOrderInPurchaseList } = require("../controller/user");
const { updateStock } = require("../controller/product");
const {
    getOrderById,
    createOrder,
    getAllOrders,
    getOrderStatus,
    updateStatus,
} = require("../controller/order");

//params
router.param("userId", getUserById);
router.param("orderId", getOrderById);

// Actual routes

//create route
router.post(
    "/order/create/:userId",
    isSignedIn,
    isAuthenticated,
    pushOrderInPurchaseList,
    updateStock,
    createOrder
);
//read route

router.get(
    "/order/all/:userId",
    isSignedIn,
    isAuthenticated,
    isAdmin,
    getAllOrders
);

// status of order
router.get(
    "/order/status/:userId",
    isSignedIn,
    isAuthenticated,
    isAdmin,
    getOrderStatus
);
router.put(
    "/order/:orderId/status/:userId",
    isSignedIn,
    isAuthenticated,
    isAdmin,
    updateStatus
);
module.exports = router;
