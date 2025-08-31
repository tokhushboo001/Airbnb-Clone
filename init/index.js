const mongoose = require("mongoose");
const initdata = require("./data.js");
const Listing = require("../models/listing.js");
const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

main().then(() => {

    console.log("connected to db ");;
}).catch((err) => {
    console.log;

});
async function main() {
    await mongoose.connect(MONGO_URL);

};
const initDB = async() => {
    await Listing.deleteMany({});
    initData.data = initData.data.map((obj) => ({...obj, owner: "6893620b28b6a3c5f97d1f4b" }));
    await Listing.insertMany(initdata.data);
    console.log("Data was initialized");
};

initDB();