const express = require("express");
const router = express.Router();
const { check } = require("express-validator");
const {
    getUserById,
    getUser,
    getAllUser,
    updateUser,
    userParchaseList,
    contact,
} = require("../controller/user");
const { isSignedIn, isAuthenticated, isAdmin } = require("../controller/auth");

router.param("userId", getUserById);

router.get("/user/:userId", isSignedIn, isAuthenticated, getUser);
router.get("/users", isSignedIn, isAuthenticated, isAdmin, getAllUser);

router.put("/user/:userId", isSignedIn, isAuthenticated, updateUser);
router.get(
    "/orders/user/:userId",
    isSignedIn,
    isAuthenticated,
    userParchaseList
);
router.post(
    "/contact",
    [
        check("name", "name must be at least 5 chars long").isLength({
            min: 5,
        }),
        check("lname", "name must be at least 5 chars long").isLength({
            min: 5,
        }),
        check("email", "email is required").isEmail(),
        check("desc", "description should be 10 char long").isLength({
            min: 5,
        }),
    ],
    contact
);

module.exports = router;
