const router = require('express').Router();
const {body} = require('express-validator');

// Import Authentication Controller
const authCntrl = require("../controllers/auth");
const { getMaxListeners } = require('../models/Friend');

// Routes for Authentication
router.get("/auth/signup", authCntrl.auth_signup_get);
router.post("/auth/signup", [
    body('name').isLength({min : 3}),
    body('emailAddress').isEmail(),
    body('password').isLength({min : 5})
] , authCntrl.auth_signup_post);

router.get("/auth/signin", authCntrl.auth_signin_get);
router.post("/auth/signin", authCntrl.auth_signin_post);

router.get("/auth/logout", authCntrl.auth_logout_get);

module.exports = router;

