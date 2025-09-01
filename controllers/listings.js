// const Listing = require("../models/listing.js");
// const User = require("./user.js")


// module.exports.index = async(req, res) => {
//     const allListings = await Listing.find({})
//     res.render("listings/index.ejs", { allListings });
// };

// module.exports.renderNewForm = (req, res) => {
//     res.render("listings/new.ejs");
// };

// module.exports.showListing = async(req, res) => {
//     let { id } = req.params;
//     const listing = await Listing.findById(id).populate({
//         path: "reviews",
//         populate: {
//             path: "author",
//         },
//     }).populate("owner");
//     if (!listing) {
//         req.flash("error", " Listing you requested for does not exist!");
//         res.redirect("/listings");
//     }
//     res.render("listings/show.ejs", { listing });
// };

// module.exports.createListing = async(req, res, next) => {
//     let url = req.file.path;
//     let filename = req.file.filename;
//     const newListing = new Listing(req.body.listing);
//     newListing.owner = req.user._id;
//     newListing.image = { url, filename };
//     await newListing.save();
//     req.flash("success", "New Listing Created!");
//     res.redirect("/listings");
// };

// module.exports.renderEditForm = async(req, res) => {
//     let { id } = req.params;
//     const listing = await Listing.findById(id);
//     if (!listing) {
//         req.flash("error", " Listing you requested for does not exist!");
//         res.redirect("/listings");
//     }

//     let originalImageUrl = listing.image.url;
//     originalImageUrl = originalImageUrl.replace("/upload", "/upload/w_250");
//     res.render("listings/edit.ejs", { listing, originalImageUrl });
// };

// module.exports.updateListing = async(req, res) => {
//     let { id } = req.params;
//     let listing = await Listing.findByIdAndUpdate(id, {...req.body.listing });
//     if (typeof req.file != "undefined") {
//         let url = req.file.path;
//         let filename = req.file.filename;
//         listing.image = { url, filename };
//         await listing.save();
//     }
//     req.flash("success", "Listing updated!");
//     res.redirect(`/listings/${id}`);
// };


// module.exports.destroyListing = async(req, res) => {
//     let { id } = req.params;
//     let deletedListing = await Listing.findByIdAndDelete(id);
//     console.log(deletedListing);
//     req.flash("success", " Listing deleted!");
//     res.redirect("/listings");
// };

//shraddha
// import Listing from "../models/listing.js";
// //import User from "./user.js";
// import mbxGeocoding from '@mapbox/mapbox-sdk/services/geocoding.js';
// const mapToken = process.env.MAP_TOKEN;
// const geocodingClient = mbxGeocoding({ accessToken: mapToken });

// const index = async(req, res) => {
//     const allListings = await Listing.find({});
//     res.render("listings/index.ejs", { allListings });
// };

// const renderNewForm = (req, res) => {
//     res.render("listings/new.ejs");
// };

// const showListing = async(req, res) => {
//     let { id } = req.params;
//     const listing = await Listing.findById(id).populate({
//         path: "reviews",
//         populate: { path: "author" },
//     }).populate("owner");

//     if (!listing) {
//         req.flash("error", " Listing you requested for does not exist!");
//         return res.redirect("/listings");
//     }
//     res.render("listings/show.ejs", { listing });
// };

// const createListing = async(req, res) => {
//     let response = await geocodingClient.forwardGeocode({
//             query: req.body.listing.location,
//             limit: 1,
//         })
//         .send();




//     let url = req.file.path;
//     let filename = req.file.filename;

//     const newListing = new Listing(req.body.listing);
//     newListing.owner = req.user._id;
//     newListing.image = { url, filename };


//     newListing.geometry = response.body.features[0].geometry;

//     let savedListing = await newListing.save();
//     console.log(savedListing);
//     req.flash("success", "New Listing Created!");
//     res.redirect("/listings");
// };

// const renderEditForm = async(req, res) => {
//     let { id } = req.params;
//     const listing = await Listing.findById(id);
//     if (!listing) {
//         req.flash("error", " Listing you requested for does not exist!");
//         return res.redirect("/listings");
//     }

//     let originalImageUrl = listing.image.url;
//     originalImageUrl = originalImageUrl.replace("/upload", "/upload/w_250");
//     res.render("listings/edit.ejs", { listing, originalImageUrl });
// };

// const updateListing = async(req, res) => {
//     let { id } = req.params;
//     let listing = await Listing.findByIdAndUpdate(id, {...req.body.listing });

//     if (typeof req.file != "undefined") {
//         let url = req.file.path;
//         let filename = req.file.filename;
//         listing.image = { url, filename };
//         await listing.save();
//     }
//     req.flash("success", "Listing updated!");
//     res.redirect(`/listings/${id}`);
// };

// //destroy or delete listing
// const destroyListing = async(req, res) => {
//     let { id } = req.params;
//     let deletedListing = await Listing.findByIdAndDelete(id);
//     console.log(deletedListing);
//     req.flash("success", " Listing deleted!");
//     res.redirect("/listings");
// };

// export default {
//     index,
//     renderNewForm,
//     showListing,
//     createListing,
//     renderEditForm,
//     updateListing,
//     destroyListing
// };

//gpt
import Listing from "../models/listing.js";
import fetch from "node-fetch"; // ✅ add this (comes with Node 18+, else run: npm install node-fetch)

// helper function for geocoding using OpenStreetMap Nominatim
async function geocodeLocation(location) {
    const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(location)}`;
    const res = await fetch(url, {
        headers: { "User-Agent": "airbnb-clone-app" } // required by Nominatim
    });
    const data = await res.json();

    if (data.length > 0) {
        return {
            type: "Point",
            coordinates: [parseFloat(data[0].lon), parseFloat(data[0].lat)]
        };
    } else {
        // fallback if no location found
        return {
            type: "Point",
            coordinates: [77.209, 28.613] // Default: Delhi
        };
    }
}

const index = async(req, res) => {
    const allListings = await Listing.find({});
    res.render("listings/index.ejs", { allListings });
};

const renderNewForm = (req, res) => {
    res.render("listings/new.ejs");
};

const showListing = async(req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id)
        .populate({
            path: "reviews",
            populate: { path: "author" },
        })
        .populate("owner");

    if (!listing) {
        req.flash("error", " Listing you requested for does not exist!");
        return res.redirect("/listings");
    }
    res.render("listings/show.ejs", { listing });
};

const createListing = async(req, res) => {
    // ✅ Geocode with OSM instead of Mapbox
    const geometry = await geocodeLocation(req.body.listing.location);

    let url = req.file.path;
    let filename = req.file.filename;

    const newListing = new Listing(req.body.listing);
    newListing.owner = req.user._id;
    newListing.image = { url, filename };
    newListing.geometry = geometry; // ✅ OSM geometry

    let savedListing = await newListing.save();
    console.log(savedListing);
    req.flash("success", "New Listing Created!");
    res.redirect("/listings");
};

const renderEditForm = async(req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);
    if (!listing) {
        req.flash("error", " Listing you requested for does not exist!");
        return res.redirect("/listings");
    }

    let originalImageUrl = listing.image.url;
    originalImageUrl = originalImageUrl.replace("/upload", "/upload/w_250");
    res.render("listings/edit.ejs", { listing, originalImageUrl });
};

const updateListing = async(req, res) => {
    let { id } = req.params;
    let listing = await Listing.findByIdAndUpdate(id, {...req.body.listing });

    if (typeof req.file != "undefined") {
        let url = req.file.path;
        let filename = req.file.filename;
        listing.image = { url, filename };
        await listing.save();
    }
    req.flash("success", "Listing updated!");
    res.redirect(`/listings/${id}`);
};

//destroy or delete listing
const destroyListing = async(req, res) => {
    let { id } = req.params;
    let deletedListing = await Listing.findByIdAndDelete(id);
    console.log(deletedListing);
    req.flash("success", " Listing deleted!");
    res.redirect("/listings");
};

export default {
    index,
    renderNewForm,
    showListing,
    createListing,
    renderEditForm,
    updateListing,
    destroyListing
};