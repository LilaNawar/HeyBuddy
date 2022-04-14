// Dependencies
const express = require("express");
const mongoose = require("mongoose");
require('dotenv').config();
const flash = require('connect-flash');

// Port Configuration
const PORT = process.env.PORT;

// Initialize Express Application
const app = express();

// look for static files here (CSS, JS, Images, Video, Audio)
app.use(express.static("public"));

const expressLayouts = require("express-ejs-layouts");

// Look into views folder for a file named as layout.ejs
app.use(expressLayouts);
app.use(express.urlencoded({ extended: true }));

let session = require('express-session');
let passport = require('./helper/ppConfig');


app.use(session({
  secret: process.env.secret,
  saveUninitialized: true,
  resave: false,
  cookie: {maxAge: 19060000}
}))

app.use(passport.initialize());
app.use(passport.session());

app.use(flash());

// Sharing the information with all pages.
app.use(function(req, res, next){
  res.locals.currentUser = req.user;
  res.locals.alerts = req.flash();
  next();
})

// Import Routes
const indexRoute = require('./routes/index');
const friendRoute = require("./routes/friends");
const authRoutes = require("./routes/auth");

// Mount Routes
app.use('/', indexRoute);
app.use('/', friendRoute);
app.use('/', authRoutes);

// NodeJS to look in a folder called views for all ejs files.
app.set("view engine", "ejs");

mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
},
() => {
    console.log("mongodb connected successfully!");
});

app.listen(PORT ||3000, () => console.log(`App is running on ${PORT}`));
