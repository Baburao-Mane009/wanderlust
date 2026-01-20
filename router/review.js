const express = require("express");
const router = express.Router({ mergeParams: true });


const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");

const { reviewSchema } = require("../schema.js");
const Review = require("../model/review.js");
const Listing = require("../model/listening.js");
const { validateReview ,isLoggedIn, isReviewAuthor} = require("../middleware.js");

const reviewController =require("../controller/review.js");

// review route
router.post("/", isLoggedIn,validateReview, wrapAsync(reviewController.createReview)

)

// delete revivew 
router.delete("/:reviewId",isLoggedIn,isReviewAuthor, wrapAsync(reviewController.deleteReview))

module.exports = router;