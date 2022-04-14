// Include model
const Friend = require("../models/Friend");
const User = require("../models/User")

const moment = require("moment");
const { isDate } = require("moment");
const { now } = require("moment");

// HTTP GET - Load a Friend
exports.friend_create_get = (req, res) => {
    User.find()
    .then((friend) => {
        res.render('../views/friend/add', {friend});
    })
    .catch((err) => {
        console.log(err);
    })
}

// HTTP POST - ADD Friend
exports.friend_create_post = async (req, res) => {
    let friend = new Friend(req.body);
    friend.notes.push(req.body.content)
    friend.save()
    let user = await User.findById(req.user._id)
    user.friends.push(friend)
    user.save()
    res.redirect("/friend/index");
};

// // HTTP GET - Friend Index
//---------------------TO DO----------------
// get the birthdays happening within 7 days
exports.friend_index_get = async (req, res) => { 
    const todayDate = new Date();
    let thisMonth = []
    let user = await User.findById(req.user).populate("friends")
    user.friends = user.friends.sort(function(a,b){
        return a.lastContacted-b.lastContacted
    })
    user.friends.forEach(function(friend){
        let birthdayMonth = friend.birthday.toLocaleString().split(',')[0].slice(6,7)
        let todayDateMonth = todayDate.getMonth()+1
        if((todayDateMonth == birthdayMonth)){
            thisMonth.push(friend)
        }
    })
    res.render("../views/friend/index.ejs", {user, thisMonth});
}

// // HTTP GET - show details of the clicked friend
exports.friend_show_get = async (req, res) => {
    let user = await User.findById(req.user._id).populate("friends")
    // going through all friends of current user, give me the current clicked on friend

    let friend = await Friend.findById(req.params.id)

    res.render("../views/friend/detail", {friend})
};

// // HTTP DELETE - Friend
exports.friend_delete_get = async (req, res) => {
    let user = await User.findById(req.user.id)
    // going through all friends of current user, 
    // give me the current clicked on friend's id
    let friend = await user.friends.find(friend =>(friend._id== req.params.id))
    let index = await user.friends.findIndex(friend =>(friend._id== req.params.id))
    user.friends.splice(index,1)
    await user.save()
    res.redirect("/friend/index")
}

// Delete note for friend
exports.friend_delete_note = async (req, res)=>{
    let friend = await Friend.findById(req.params.fid)
    friend.notes.splice(req.query.note,1)
    await friend.save()
    res.redirect(`/friend/${req.params.fid}`)
}

// add new note GET
exports.friend_add_get = async (req, res)=>{
    let friend = await Friend.findById(req.params.fid)
    res.render('../views/friend/addNote', {friend});
}
// Add note to friend POST
exports.friend_add_note = async (req, res)=>{
    let friend = await Friend.findById(req.params.fid)
    // console.log(friend)
    friend.notes.push(req.body.content)
    await friend.save()
    res.redirect(`/friend/${req.params.fid}`)
}
// HTTP GET - Load Friend Edit Form
exports.friend_edit_get = async (req, res) =>{
    let friend = await Friend.findById(req.query.fid)
    res.render(`../views/friend/editFriend`, {friend})
}
// Friend edit post. makes changes and updates it
exports.friend_edit_post = async (req, res) =>{
    let friend = await Friend.findById(req.params.fid)
    if (req.body.lastContacted != ""){
        friend.lastContacted = req.body.lastContacted
    }
    if (req.body.name != ""){
        friend.name = req.body.name
    }
    friend.save()
    res.redirect(`/friend/${req.params.fid}`)

}


