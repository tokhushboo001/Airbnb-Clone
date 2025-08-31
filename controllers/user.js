// const User = require("../models/user.js");


// module.exports.renderSignUpForm = (req, res) => {
//     res.render("users/signup.ejs");
// };
// module.exports.signUp = async(req, res) => {
//     try {
//         let { username, email, password } = req.body;
//         let newUser = new User({ username, email });
//         let registredUser = await User.register(newUser, password);
//         req.login(registredUser, (err) => {
//             if (err) {
//                 next(err);
//             }
//             req.flash("success", "welcome to wanderlust!")
//             res.redirect("/listings");
//         })

//     } catch (e) {
//         req.flash("error", e.message);
//         res.redirect("/signup");
//     }
// };


// module.exports.renderLoginForm = (req, res) => {
//     res.render("users/login.ejs");
// };

// module.exports.login = async(req, res) => {
//     req.flash("success", "Welcome to Wanderlust ! You are logged in !");
//     let redirectUrl = res.locals.redirectUrl || "/listings";
//     res.redirect(redirectUrl);
// };

// module.exports.logout = (req, res) => {
//     req.logout((err) => {
//         if (err) {
//             return next(err);

//         }
//         req.flash("success", "logged you out!");
//         res.redirect("/listings");

//     });
// };

import User from "../models/user.js";

const renderSignUpForm = (req, res) => {
    res.render("users/signup.ejs");
};

const signUp = async(req, res, next) => {
    try {
        let { username, email, password } = req.body;
        let newUser = new User({ username, email });
        let registeredUser = await User.register(newUser, password);

        req.login(registeredUser, (err) => {
            if (err) {
                return next(err);
            }
            req.flash("success", "Welcome to Wanderlust!");
            res.redirect("/listings");
        });
    } catch (e) {
        req.flash("error", e.message);
        res.redirect("/signup");
    }
};

const renderLoginForm = (req, res) => {
    res.render("users/login.ejs");
};

const login = async(req, res) => {
    req.flash("success", "Welcome to Wanderlust! You are logged in!");
    let redirectUrl = res.locals.redirectUrl || "/listings";
    res.redirect(redirectUrl);
};

const logout = (req, res, next) => {
    req.logout((err) => {
        if (err) {
            return next(err);
        }
        req.flash("success", "Logged you out!");
        res.redirect("/listings");
    });
};

export default {
    renderSignUpForm,
    signUp,
    renderLoginForm,
    login,
    logout
};