const express = require("express");
const app =express();
const mongoose = require('mongoose');
const path =require("path");
const Listing =require("./model/listening.js");
const methodOverride =require("method-override");
const ejsMate = require("ejs-mate");
const wrapAsync = require("./utils/wrapAsync.js");
const ExpressError =require("./utils/ExpressError.js");

app.set("views",path.join(__dirname,"/views"))
app.set("view engine","ejs");
app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));
app.engine("ejs",ejsMate);
app.use(express.static(path.join(__dirname,"/public")));

main().then(res=>{
    console.log("connection sucessful")
}).catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/wanderlust');

}

// index route
app.get("/listing", wrapAsync(async (req,res)=>{
    const allListing = await Listing.find({});
    res.render("listing/index.ejs",{allListing});
}))

// app.get("/testListing",async (req,res)=>{
//     let samplelisting = new Listing({
//         title:"my new villa",
//         description:"by the beach ",
//         price:2000,
//         location:"Goa",
//         countary:"india"

//     });
//     await samplelisting.save();
//     console.log("sample was saved");
//     res.send("sucessful testing");


// });



// new route
app.get("/listing/new",(req,res)=>{
    res.render("listing/new.ejs")
})

// show route
app.get("/listing/:id",wrapAsync(async (req,res)=>{
    let{id} =req.params;
    let listings = await Listing.findById(id);
    res.render("listing/show.ejs",{listings})

})
)

// create route
app.post("/listing",wrapAsync(async (req,res)=>{
    if(!req.body.listing){
        throw new ExpressError(400,"send valid data for listing")
    }
     const newListing = new Listing(req.body.listing);
     await newListing.save();
     res.redirect("/listing");
}))

// edit route
app.get("/listing/:id/edit",wrapAsync(async (req,res)=>{
     let{id} =req.params;
    let listings = await Listing.findById(id);
    res.render("listing/edit.ejs",{listings})
}))
// update route
app.put("/listing/:id",wrapAsync(async (req,res)=>{
   
     if(!req.body.listing){
        throw new ExpressError(400,"send valid data for listing")
    }
     let{id} =req.params;
     await Listing.findByIdAndUpdate(id,{...req.body.listings});
    //  await Listing.findByIdAndUpdate(id, req.body.listing);

    res.redirect(`/listing/${id}`)
}))
// delete route
app.delete("/listing/:id",wrapAsync(async (req,res)=>{
     let{id} =req.params;
    let deletedListing = await Listing.findByIdAndDelete(id);
    console.log(deletedListing);
    res.redirect("/listing")
}))
app.get("/",(req,res)=>{
    res.send ("working");
})


// error handling middleware
// error handling middleware
app.use((err, req, res, next) => {
  let { statusCode = 500, message = "something went wrong" } = err;
  res.status(statusCode).render("listing/error.ejs", { err });
});


app.listen(8080,()=>{
    console.log("port listing")
})