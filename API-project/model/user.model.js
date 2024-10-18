const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema({
    username:String,
    email:String,
    dob:String,
    role:{type:String,default:"user"},
    location:String,
    password:String,
    confpassword:String
},{
    versionKey:false
})

const UserModel = mongoose.model("user",UserSchema)

module.exports=UserModel