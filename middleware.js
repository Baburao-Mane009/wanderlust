const { session } = require("passport");

const Listing = require("./model/listening.js");
const Review = require("./model/review.js"); // ✅ Import Listing model
const ExpressError = require("./utils/ExpressError.js");

const { listingSchema, reviewSchema } = require("./schema.js");
// ✅ Validation middleware
module.exports.validateListing = (req, res, next) => {
    let { error } = listingSchema.validate(req.body.listing);
    if (error) {
        let errMsg = error.details.map((el) => el.message).join(",");
        throw new ExpressError(400, errMsg);
    } else {
        next();
    }
};



module.exports.validateReview = (req, res, next) => {
    let { error } = reviewSchema.validate(req.body);
    if (error) {
        let errMsg = error.details.map((el) => el.message).join(",");
        throw new ExpressError(400, errMsg);
    } else {
        next();
    }


};





module.exports.isLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        req.session.redirectUrl = req.originalUrl;
        req.flash("error", "You must be logged in to make changes!");
        return res.redirect("/login");
    }
    next();
};

module.exports.saveRedirectUrl = (req, res, next) => {
    if (req.session.redirectUrl) {
        res.locals.redirectUrl = req.session.redirectUrl;
    }
    next();
};

module.exports.isOwner = async (req, res, next) => {
    let { id } = req.params; // ✅ fixed typo
    let listing = await Listing.findById(id); // ✅ corrected reference
    if (!listing.owner.equals(res.locals.currUser._id)) { // ✅ fixed variable name
        req.flash("error", "Only the owner is authorized to edit this listing");
        return res.redirect(`/listing/${id}`);
    }
    next();
};
module.exports.isReviewAuthor = async (req, res, next) => {
    let { id, reviewId } = req.params;

    let review = await Review.findById(reviewId); // ✅ fetch review first

    if (!review) {
        req.flash("error", "Review not found");
        return res.redirect(`/listing/${id}`);
    }

    if (!review.author.equals(res.locals.currUser._id)) {
        req.flash("error", "You do not have permission to delete this review");
        return res.redirect(`/listing/${id}`);
    }

    next();
};
