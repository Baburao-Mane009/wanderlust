const User = require("../model/user.js")



module.exports.signupForm = (req, res) => {
    res.render("user/signup"); // ✅ correct


}

module.exports.signupPost = async (req, res) => {
    try {
        let { username, email, password } = req.body;
        const newUser = new User({ username, email });
        const newRegister = await User.register(newUser, password);
        console.log(newRegister);
        req.login(newRegister, (err) => {
            if (err) {
                return next(err);
            }
            req.flash("success", "you signed sucessfully");
            res.redirect("/listing");
        });


    } catch (e) {
        req.flash("error", e.message);
        res.redirect("/signup");
    }


}

module.exports.loginForm = (req, res) => {
    res.render("user/login.ejs"); // ✅ correct


}


module.exports.loginPost = async (req, res) => {
    req.flash("success", "welcome to wanderlust");
    let redirectUrl = res.locals.redirectUrl || "/listing"

    res.redirect(redirectUrl);

}

module.exports.logOut = (req, res, next) => {
    req.logOut((err) => {
        if (err) {
            return next(err);
        }
        req.flash("success", "logged out now!");
        res.redirect("/listing")
    })
}