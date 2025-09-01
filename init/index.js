// // const mongoose = require("mongoose");
// // const initdata = require("./data.js");
// // const Listing = require("../models/listing.js");
// // const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

// // main().then(() => {

// //     console.log("connected to db ");;
// // }).catch((err) => {
// //     console.log;

// // });
// // async function main() {
// //     await mongoose.connect(MONGO_URL);

// // };
// // const initDB = async() => {
// //     await Listing.deleteMany({});
// //     initData.data = initData.data.map((obj) => ({...obj, owner: "6893620b28b6a3c5f97d1f4b" }));
// //     await Listing.insertMany(initdata.data);
// //     console.log("Data was initialized");
// // };

// // initDB();
// import mongoose from "mongoose";
// import initData from "./data.js";
// import Listing from "../models/listing.js";
// import dotenv from "dotenv";

// dotenv.config();

// const dbUrl = process.env.ATLASDB_URL || "mongodb://127.0.0.1:27017/wanderlust";

// async function main() {
//     await mongoose.connect(dbUrl);
//     console.log("Connected to DB");
// }

// const initDB = async() => {
//     await Listing.deleteMany({});
//     const dataWithOwner = initData.data.map((obj) => ({
//         ...obj,
//         owner: "6893620b28b6a3c5f97d1f4b", // make sure this user actually exists in your Atlas DB
//     }));
//     await Listing.insertMany(dataWithOwner);
//     console.log("Data was initialized");
// };

// main().then(initDB).catch((err) => {
//     console.error(err);
// });



import mongoose from "mongoose";
import initData from "./data.js";
import Listing from "../models/listing.js";

const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

main().then(() => {
    console.log("connected to db");
}).catch((err) => {
    console.log(err);
});

async function main() {
    await mongoose.connect(MONGO_URL);
}

const initDB = async() => {
    await Listing.deleteMany({});
    // Add an owner ID (replace with real one from your DB if needed)
    const newData = initData.data.map((obj) => ({
        ...obj,
        owner: "6893620b28b6a3c5f97d1f4b",
    }));
    await Listing.insertMany(newData);
    console.log("Data was initialized ✅");
};

initDB();