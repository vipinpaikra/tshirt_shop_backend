const express = require("express");
const router = express.Router();
const { isSignedIn, isAuthenticated, isAdmin } = require("../controller/auth");
const { getUserById } = require("../controller/user");
const {
    getProductById,
    createProduct,
    getProduct,
    photo,
    updateProduct,
    deleteProduct,
    getAllProduts,
    getAllUniqueCategories,
} = require("../controller/product");

// all of params
router.param("userId", getUserById);
router.param("productId", getProductById);

//all of actual routes
///create route
router.post(
    "/product/create/:userId",
    isSignedIn,
    isAuthenticated,
    isAdmin,
    createProduct
);

//read routes

router.get("/product/:productId", getProduct);
router.get("/product/photo/:productId", photo);

//delete route
router.delete(
    "/product/:productId/:userId",
    isSignedIn,
    isAuthenticated,
    isAdmin,
    deleteProduct
);

//update route
router.put(
    "/product/:productId/:userId",
    isSignedIn,
    isAuthenticated,
    isAdmin,
    updateProduct
);
//listing route

router.get("/products", getAllProduts);

router.get("/products/categories", getAllUniqueCategories);

module.exports = router;
