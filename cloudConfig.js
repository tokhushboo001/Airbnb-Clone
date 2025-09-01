// const cloudinary = require("cloudinary").v2;
// const { CloudinaryStorage } = require("multer-storage-cloudinary");

// cloudinary.config({
//     cloud_name: process.env.CLOUD_NAME,
//     api_key: process.env.CLOUD_API_KEY,
//     api_secret: process.env.CLOUD_API_SECRET
// });

// const storage = new CloudinaryStorage({
//     cloudinary: cloudinary,
//     params: {
//         folder: 'wanderlust_DEV',
//         allowedFormats: ['png', 'jpg', 'jpeg'],
//     },
// });

// module.exports = {
//     cloudinary,
//     storage
// };



// cloudConfig.js (ESM version)



//1
// import { v2 as cloudinary } from "cloudinary";
// import { CloudinaryStorage } from "multer-storage-cloudinary";

// cloudinary.config({
//     cloud_name: process.env.CLOUD_NAME,
//     api_key: process.env.CLOUD_API_KEY,
//     api_secret: process.env.CLOUD_API_SECRET,
// });

// const storage = new CloudinaryStorage({
//     cloudinary: cloudinary,
//     params: {
//         folder: "wanderlust_DEV",
//         allowed_formats: ["png", "jpg", "jpeg"],
//     },
// });

// export { cloudinary, storage };

//gpt
import dotenv from "dotenv";

// Load .env (only if not in production)
if (process.env.NODE_ENV !== "PRODUCTION") {
    dotenv.config();
}

import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";

// Configure cloudinary using .env values
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET,
});

// Debug check (this will show if .env values are loading)
console.log("Cloudinary ENV:", {
    CLOUD_NAME: process.env.CLOUD_NAME,
    CLOUD_API_KEY: process.env.CLOUD_API_KEY ? "✅ Loaded" : "❌ Missing",
    CLOUD_API_SECRET: process.env.CLOUD_API_SECRET ? "✅ Loaded" : "❌ Missing",
});

const storage = new CloudinaryStorage({
    cloudinary,
    params: {
        folder: "wanderlust_DEV", // you can rename if you want
        allowed_formats: ["jpeg", "png", "jpg"],
    },
});

export { cloudinary, storage };