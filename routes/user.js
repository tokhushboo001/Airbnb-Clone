import express from "express";
const router = express.Router();
import User from "../models/user.js";
import wrapAsync from './wrapAsync.js';
import passport from "passport";
import { saveRedirectUrl } from "../middleware.js";
import userController from "../controllers/user.js";


router.route("/signup")
    .get(userController.renderSignUpForm)
    .post(wrapAsync(userController.signUp))

router.route("/login")
    .get(userController.renderLoginForm)
    .post(saveRedirectUrl, passport.authenticate("local", { failureRedirect: '/login', failureFlash: true }), userController.login)

router.get("/logout", userController.logout);

export default router;