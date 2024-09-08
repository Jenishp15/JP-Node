const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema({
    username:String,
    email:String,
    DOB:String,
    roll:String,
    location:String,
    password:String,
    confpassword:String
})

const UserModel = mongoose.model("user",UserSchema)

module.exports = UserModel