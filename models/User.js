// Dependencies
const { accepts } = require("express/lib/request");
const mongoose = require("mongoose");
const bcrypt = require('bcrypt');


const userSchema = mongoose.Schema({
    name: String,
    emailAddress: String,
    password: String,
    friends: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Friend"
    }]
},
{
    timestamps: true // means createdAt and updatedAt
});

// verifyPassword
userSchema.methods.verifyPassword = function(password){
    return bcrypt.compareSync(password, this.password);
}

// Create Model with the name Article
const User = mongoose.model("User", userSchema);

module.exports = User;