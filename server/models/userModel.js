const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    fullName:{
        type:String,
        required: true
    },
    userName:{
        type:String,
        required: true,
        unique: true
    },
    gender:{
        type:String,
        required: true,
        enums: ["male", "female"]
    },
    profilePic:{
        type:String,
        default: ""
    },
    password:{
        type:String,
        required: true,
        minlength: 6
    }
})

const User = mongoose.model("User", userSchema);

module.exports = User;