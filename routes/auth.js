const express = require("express");
const router = express.Router();
const { signout, signup, signin, isSignedIn } = require("../controller/auth");
const { check } = require("express-validator");

router.post(
    "/signup",
    [
        check("name", "name must be at least 5 chars long").isLength({
            min: 5,
        }),
        check("email", "email is required").isEmail(),
        check("password", "password must be at least 5 chars long").isLength({
            min: 5,
        }),
    ],
    signup
);

router.post(
    "/signin",
    [
        check("email", "email is required").isEmail(),
        check(
            "password",
            "password is required && must be at least 5 chars long"
        ).isLength({ min: 5 }),
    ],
    signin
);

router.get("/signout", signout);
router.get("/test", isSignedIn, (req, res) => {
    res.send("protected route");
});
// router.get("/user", getuser);

module.exports = router;
