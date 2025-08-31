//const mongoose = require("mongoose");
import mongoose from "mongoose";
const Schema = mongoose.Schema;
//const Review = require("./review.js");
import Review from "./review.js";
const listingSchema = new Schema({

    title: {
        type: String,
        required: true,
    },
    description: String,
    image: {
        url: String,
        filename: String,
    },
    price: Number,
    location: String,
    reviews: [{
        type: Schema.Types.ObjectId,
        ref: "Review",

    }, ],
    // country: String,
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
    geometry: {
        type: {
            type: String, //Don't do {location :{type:String}}
            enum: ['Point'], //location.type must be Point
            required: true
        },
        coordinates: {
            type: [Number],
            required: true
        }

    }
});

listingSchema.post("findOneAndDelete", async(listing) => {
    if (listing) {
        awaitReview.deleteMany({ _id: { $in: listing.reviews } });
    }
});
// const Listing = mongoose.model("Listing", listingSchema);
// module.exports = Listing;
const Listing = mongoose.model("Listing", listingSchema);
export default Listing;