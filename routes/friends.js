// Dependencies
const express = require("express");
var methodOverride = require('method-override')
const isLoggedIn = require("../helper/isLoggedIn")

const router = express.Router();

router.use(methodOverride('_method'))

router.use(express.urlencoded({extended: true}));

// Import Friend Controller
const FriendCntrl = require("../controllers/friend");

// Routes
router.get("/friend/add", isLoggedIn, FriendCntrl.friend_create_get);
router.post("/friend/add", FriendCntrl.friend_create_post);
router.get("/friend/index", FriendCntrl.friend_index_get);
router.get("/friend/note/add/:fid", FriendCntrl.friend_add_get)
router.post("/friend/note/add/:fid", FriendCntrl.friend_add_note)
router.get("/friend/edit/:fid", FriendCntrl.friend_edit_get)
router.post("/friend/edit/:fid",FriendCntrl.friend_edit_post)

router.get("/friend/:fid/delete/note?", FriendCntrl.friend_delete_note)
router.get("/friend/delete/:id", FriendCntrl.friend_delete_get);

router.get("/friend/:id", FriendCntrl.friend_show_get);


// Export router
module.exports = router;