const mongoose = require("mongoose")

const Userschema =new mongoose.Schema({
    username:String,
    email:String,
    password:String,
    role:{type:String,default:"user"}
},{versionKey:false})

const Usermodel = mongoose.model("user",Userschema)

module.exports = Usermodel
