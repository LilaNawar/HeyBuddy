// API's for Authentication
const User = require('../models/User');
const bcrypt = require('bcrypt');
let passport = require('../helper/ppConfig');
const salt = 10;
const {validationResult} = require('express-validator');

// HTTP GET - Signup - to load the signup form
exports.auth_signup_get = (req, res) => {
    res.render("auth/signup");
}

// HTTP POST - Signup - to post the data
exports.auth_signup_post = (req, res) => {
    let user = new User(req.body);
    //console.log(req.file);
    let hash = bcrypt.hashSync(req.body.password, salt);
    //console.log(hash);

    user.password = hash;

    //var imagPath = '/uploads/' + req.file.filename;
    //user.image = imagPath;

    user.save()
    .then(() => {
        res.redirect('/auth/signin');
    })
    .catch((err) => {

        if(err.code == 11000){
            req.flash("error", "Email already exists");
            res.redirect("/auth/signin");
        }
        else
        {
          const errors = validationResult(req);
          if(!errors.isEmpty()){
            //   res.status(400).json({errors: errors.array()});
            req.flash("validationErrors", errors.errors);
          }
          res.redirect("/auth/signup");
        }
    })
}

// HTTP GET - Signin - to load the signin form
exports.auth_signin_get =  (req, res) => {
    res.render("auth/signin");
  }
  

// HTTP POST - Signin - to post the data
exports.auth_signin_post = 
  passport.authenticate("local", {
      successRedirect: "/friend/index",
      failureRedirect: "/auth/signin",
      failureFlash: "Invalid username or password",
      successFlash: "You are logged in successfully"
  })

// HTTP GET - Logout - to logout the user
exports.auth_logout_get = (req, res) => {
    // This will clear the session
    req.logout();
    req.flash("success", "Your are successfully logged out");
    res.redirect("/auth/signin");
}