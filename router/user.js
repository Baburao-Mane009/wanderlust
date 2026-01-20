const express = require("express");
const router = express.Router();
const User = require("../model/user.js")
const passport = require("passport");

const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const { saveRedirectUrl } = require("../middleware.js");
const userController = require("../controller/user.js");

router.route("/signup")
    .get(userController.signupForm)
    .post(wrapAsync(userController.signupPost));



router.route("/login")
    .get(userController.loginForm)
    .post(
        saveRedirectUrl,
        passport.authenticate("local", {
            failureFlash: true,
            failureRedirect: "/login"
        }), userController.loginPost);


router.get("/logout", userController.logOut)

module.exports = router;