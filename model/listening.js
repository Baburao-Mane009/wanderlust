const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const Review =require("./review.js");
let listingSchema = new Schema({
    title:{
        type:String
    },
    description:String,
     image: {
        filename: String,
        url:String },
    //     url: {
    //         type: String,
    //         default: "https://unsplash.com/photos/picturesque-village-nestled-at-the-foot-of-snow-capped-mountains-TX-AxJV1mBw"
    //     }
    // },
    // // image:{
    //     default:"https://unsplash.com/photos/picturesque-village-nestled-at-the-foot-of-snow-capped-mountains-TX-AxJV1mBw" ,
    //     type:String,
    //     set:(v)=>v === "" ? "https://unsplash.com/photos/picturesque-village-nestled-at-the-foot-of-snow-capped-mountains-TX-AxJV1mBw" 
    //     :v,
        
    // },
    price:{
      type:Number,
      
    },
    location:String,
    country:String,
    review:[{
      type:Schema.Types.ObjectId,
      ref:"Review"
}],
owner:{
  type:Schema.Types.ObjectId,
  ref:"User"
},
// category: {
//   type: String,
//   enum: ['farm', 'trending', 'mountains', 'rooms', 'iconic city', 'Amazing pools', 'camping'],
//   required: true
// }



})
 
listingSchema.post("findOneAndDelete",async(listing)=>{
  if(listing){
    await Review.deleteMany({_id:{$in:listing.review}});

  }

});
const Listing = mongoose.model("Listening",listingSchema);
module.exports = Listing;