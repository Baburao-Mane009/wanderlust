const mongoose = require('mongoose');

const Schema = mongoose.Schema;
let listingSchema = new Schema({
    title:{
        type:String
    },
    description:String,
    image: {
  filename: String,
  url: {
    type: String,
    default: "https://unsplash.com/photos/picturesque-village-nestled-at-the-foot-of-snow-capped-mountains-TX-AxJV1mBw"
  }
},

    // image:{
    //     default:"https://unsplash.com/photos/picturesque-village-nestled-at-the-foot-of-snow-capped-mountains-TX-AxJV1mBw" ,
    //     type:String,
    //     set:(v)=>v === "" ? "https://unsplash.com/photos/picturesque-village-nestled-at-the-foot-of-snow-capped-mountains-TX-AxJV1mBw" 
    //     :v,
        
    // },
    price:{
      type:Number,
      
    },
    location:String,
    countary:String
})

const Listing = mongoose.model("Listening",listingSchema);
module.exports = Listing;