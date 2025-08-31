// module.exports.isLoggedIn =
//     (req, res, next) => {
//         if (!req.isAuthenticated()) {
//             req.flash("error", "you must be logged in to create listing!");
//             return res.redirect("/login");
//         }
//         next();

//     }





// const Listing = require("./models/listing");
// const ExpressError = require("./utils/ExpressError.js");
// const { listingSchema, reviewSchema } = require("./schema.js");

// export default function isLoggedIn(req, res, next) {
//     if (!req.isAuthenticated()) {
//         req.session.redirectUrl = req.originalUrl;
//         req.flash("error", "You must be logged in to create listing!");
//         return res.redirect("/login");
//     }
//     next();
// }
// module.exports.saveRedirectUrl = (req, res, next) => {
//     if (req.session.redirectUrl) {
//         res.locals.redirectUrl = req.session.redirectUrl;
//     }
//     next();
// };
// module.exports.isOwner = async(req, res, next) => {
//     let { id } = req.params;
//     let listing = await Listing.findById(id);
//     if (!listing.owner.equals(res.locals.currUser._id)) {
//         req.flash("error", "You are not the owner of this listing");
//         return res.redirect(`/listings/${id}`);
//     }
//     next();
// };
// module.exports.isOwner = async(req, res, next) => {
//     const validateListing = (req, res, next) => {
//         let { error } = listingSchema.validate(req.body);
//         if (error) {
//             let errMsg = error.details.map((el) => el.message).join(",");
//             throw new ExpressError(400, errMsg);
//         } else {
//             next();
//         }
//     }
// };
// module.exports.validateReview = (req, res, next) => {


//     const validateReview = (req, res, next) => {
//         let { error } = reviewSchema.validate(req.body);
//         if (error) {
//             let errMsg = error.details.map((el) => el.message).join(",");
//             throw new ExpressError(400, errMsg);
//         } else {
//             next();
//         }
//     }
//};
import Listing from "./models/listing.js";
import Review from "./models/review.js";
import ExpressError from "./utils/ExpressError.js";
import { listingSchema, reviewSchema } from "./schema.js";


export function isLoggedIn(req, res, next) {
    if (!req.isAuthenticated()) {
        req.session.redirectUrl = req.originalUrl;
        req.flash("error", "You must be logged in to perform this action!");
        return res.redirect("/login");
    }
    next();
};


export function saveRedirectUrl(req, res, next) {
    if (req.session.redirectUrl) {
        res.locals.redirectUrl = req.session.redirectUrl;
    }
    next();
};


// export function isOwner(req, res, next) {
//     let { id } = req.params;
//     let listing = Listing.findById(id);
//     if (!listing.owner.equals(res.locals.currUser._id)) {
//         req.flash("error", "You are not the owner of this listing");
//         return res.redirect(`/listings/${id}`);
//     }
//     next();
// };
export async function isOwner(req, res, next) {
    const { id } = req.params;
    const listing = await Listing.findById(id);
    if (!listing) {
        req.flash("error", "Listing not found!");
        return res.redirect("/listings");
    }

    if (!listing.owner.equals(res.locals.currUser._id)) {
        req.flash("error", "You are not the owner of this listing");
        return res.redirect(`/listings/${id}`);
    }

    next();
};


export function validateListing(req, res, next) {
    let { error } = listingSchema.validate(req.body);
    if (error) {
        let errMsg = error.details.map((el) => el.message).join(",");
        throw new ExpressError(400, errMsg);
    } else {
        next();
    }
};

export function validateReview(req, res, next) {
    let { error } = reviewSchema.validate(req.body);
    if (error) {
        let errMsg = error.details.map((el) => el.message).join(",");
        throw new ExpressError(400, errMsg);
    } else {
        next();
    }
};

// export function isReviewAuthor(req, res, next) {
//     let { id, reviewId } = req.params;
//     let review = Review.findById(reviewId);
//     if (!review.author.equals(res.locals.currUser._id)) {
//         req.flash("error", "You are not the oauthor  of this review");
//         return res.redirect(`/listings/${id}`);
//     }
//     next();
// };
export async function isReviewAuthor(req, res, next) {
    const { id, reviewId } = req.params;
    const review = await Review.findById(reviewId); // ✅ correct id + await

    if (!review) {
        req.flash("error", "Review not found!");
        return res.redirect(`/listings/${id}`);
    }

    if (!review.author.equals(res.locals.currUser._id)) {
        req.flash("error", "You are not the author of this review");
        return res.redirect(`/listings/${id}`);
    }

    next();
};