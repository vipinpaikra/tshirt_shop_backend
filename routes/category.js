const express = require("express");
const router = express.Router();

const {
    getCategoryById,
    createCategory,
    getAllCategory,
    getCategory,
    updateCategory,
    deleteCategory,
} = require("../controller/category");
const { isSignedIn, isAdmin, isAuthenticated } = require("../controller/auth");
const { getUserById } = require("../controller/user");

// params
router.param("userId", getUserById);
router.param("categoryId", getCategoryById);

// actual router goes here

router.post(
    "/category/create/:userId",
    isSignedIn,
    isAuthenticated,
    isAdmin,
    createCategory
);
//read routes
router.get("/category/:categoryId", getCategory);
router.get("/categories", getAllCategory);
//update
router.put(
    "/category/:categoryId/:userId",
    isSignedIn,
    isAuthenticated,
    isAdmin,
    updateCategory
);
//delete route
router.delete(
    "/category/:categoryId/:userId",
    isSignedIn,
    isAuthenticated,
    isAdmin,
    deleteCategory
);

module.exports = router;
