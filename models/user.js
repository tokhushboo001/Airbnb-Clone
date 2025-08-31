//  const mongoose = require("mongoose");
//  const Schema = mongoose.Schema;
//  const passportLocalMongoose = require("passport-local-mongoose");
import mongoose from "mongoose";
import passportLocalMongoose from "passport-local-mongoose"; // optional if needed
const Schema = mongoose.Schema;
const userSchema = new Schema({
    email: {
        type: String,
        required: true
    },
});

userSchema.plugin(passportLocalMongoose);
//module.exports = mongoose.model("User", userSchema);
//  import mongoose from "mongoose";
//  // import passportLocalMongoose from "passport-local-mongoose"; // optional if needed
//  const Schema = mongoose.Schema;
//  const userSchema = new Schema({
//      email: {
//          type: String,
//          required: true
//      },
//  });
//  // userSchema.plugin(passportLocalMongoose); // Uncomment if using passport-local-mongoose

const User = mongoose.model("User", userSchema);
export default User;