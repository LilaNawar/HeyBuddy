// Dependencies
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const moment = require("moment")

const friendSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    birthday: {
        type: Date,
        required: true,
    },
    lastContacted: {
        type: Date,
        required:true,
    },
    notes: [{
        type: String,
    }]
}
,
    {
        timestamps: true
    })

const Friend = mongoose.model("Friend", friendSchema);

module.exports = Friend;