import express from "express";
const router = express.Router();
import wrapAsync from "../utils/wrapAsync.js";
import Listing from "../models/listing.js"
import { isLoggedIn, isOwner, validateListing } from "../middleware.js";

import listingController from "../controllers/listings.js";
import multer from "multer";
import { storage } from "../cloudConfig.js";

const upload = multer({ storage });

router.route("/")

.get(wrapAsync(listingController.index))
    .post(isLoggedIn, validateListing, upload.single("listing[image]"), wrapAsync(listingController.createListing));


//new route
router.get("/new", isLoggedIn, listingController.renderNewForm);


router.route("/:id")
    .get(wrapAsync(listingController.showListing))
    .put(isLoggedIn, isOwner, upload.single("listing[image]"), validateListing,
        wrapAsync(listingController.updateListing))
    .delete(isLoggedIn, isOwner, wrapAsync(listingController.destroyListing));

//edit route
router.get("/:id/edit", isLoggedIn, isOwner, wrapAsync(listingController.renderEditForm));

export default router;