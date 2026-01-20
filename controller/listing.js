const Listing = require("../model/listening.js");



module.exports.index = async (req, res) => {

    const allListing = await Listing.find({});
    res.render("listing/index.ejs", { allListing });
}

module.exports.newlisting = (req, res) => {
    res.render("listing/new.ejs");
}


module.exports.show = async (req, res) => {
    let { id } = req.params;
    let listings = await Listing.findById(id)
        .populate({
            path: "review",
            populate: {
                path: "author"
            }
        }).populate("owner");
    if (!listings) {
        req.flash("error", "Listing does not exist");
        return res.redirect("/listing");
    }

    res.render("listing/show.ejs", { listings });
}

module.exports.createListing = async (req, res) => {

    let url = req.file.path;
    let filename = req.file.filename;

    const listingData = req.body.listing;

    // listingData.image = {
    //     url: listingData.image || "https://unsplash.com/photos/picturesque-village-nestled-at-the-foot-of-snow-capped-mountains-TX-AxJV1mBw",
    //     filename: ""
    // };

    const newListing = new Listing(listingData);
    newListing.owner = req.user._id;
    newListing.image = { url, filename };
    await newListing.save();

    req.flash("success", "Added successfully");
    res.redirect("/listing");
}

module.exports.editListing = async (req, res) => {
    let { id } = req.params;
    let listings = await Listing.findById(id);
    if (!listings) {
        req.flash("error", "Editing target does not exist");
        return res.redirect("/listing");
    }
    let originalImageUrl =listings.image.url;
    originalImageUrl=originalImageUrl.replace("/upload","/upload/w_250")


    req.flash("success", "You are now editing this listing");
    res.render("listing/edit.ejs", { listings ,originalImageUrl});
};

module.exports.updateListing = async (req, res) => {
    let { id } = req.params;
    const listingData = req.body.listing;

    let listing = await Listing.findByIdAndUpdate(id, listingData, { new: true });

    if (req.file) {
        listing.image = {
            url: req.file.path,
            filename: req.file.filename
        };
        await listing.save();
    }

    req.flash("success", "Updated successfully");
    res.redirect(`/listing/${id}`);
}

module.exports.deleteListing = async (req, res) => {
    let { id } = req.params;
    let deletedListing = await Listing.findByIdAndDelete(id);
    console.log(deletedListing);
    req.flash("success", "Deleted successfully");
    res.redirect("/listing");
}