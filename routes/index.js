// Dependencies
const express = require("express");

// Initialze Router
const router = express.Router();

// Require Controller
const indexCntrl = require("../controllers/index")

// Routes
router.get("/", indexCntrl.index_get);


// Export to other files
module.exports = router;