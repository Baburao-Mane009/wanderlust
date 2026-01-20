const mongoose = require('mongoose');
const initData = require("./data.js");
const Listing =require("../model/listening.js");


main().then(res=>{
    console.log("connection sucessful")
}).catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/wanderlust');

}


const initDB = async ()=>{
    await Listing.deleteMany({});
    initData.data = initData.data.map((obj)=>({...obj,owner:"6863a64c90137a350e7d682f"})

    )
    await Listing.insertMany(initData.data);
    console.log("data was initialized");


};
initDB();