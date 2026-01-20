const express = require("express");
const router = express.Router();
const Listing = require("../model/listening.js");
const wrapAsync = require("../utils/wrapAsync.js");
const { isLoggedIn, isOwner, validateListing } = require("../middleware.js");
const listingController = require("../controller/listing.js");
const multer = require("multer");
const{storage} =require("../cloudConfig.js");
const upload = multer({storage});


router.route("/")
  .get( wrapAsync(listingController.index))
  .post( isLoggedIn,  upload.single("listing[image]"),validateListing,wrapAsync(listingController.createListing));



//  New route
router.get("/new", isLoggedIn, listingController.newlisting);



// router.get("/category/:category", async (req, res) => {
//   const category = req.params.category;

//   const listings = await Listing.find({
//     category: new RegExp(category, "i") // Case-insensitive match
//   });

//   res.render("listing/index", { allListing: listings });
// });




  router.route("/:id")
.get(wrapAsync(listingController.show))
.put(isOwner, upload.single("listing[image]"), validateListing, wrapAsync(listingController.updateListing))
.delete( isLoggedIn, isOwner, wrapAsync(listingController.deleteListing));


//  Edit route
router.get("/:id/edit", isLoggedIn, isOwner, wrapAsync(listingController.editListing));

router.get("/category/:category", async (req, res) => {
  const category = req.params.category;

  const listings = await Listing.find({
    category: new RegExp(category, "i") // Case-insensitive match
  });

  res.render("listing/index", { allListing: listings });
});


module.exports = router;
