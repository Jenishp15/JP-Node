const mongoose = require("mongoose")

const Userschema = mongoose.Schema({
    username:String,
    email:String,
    password:String,
    role:{
        default:"user",
        type:String
    }
},{ versionKey: false })

const UserModel = mongoose.model("user",Userschema)

module.exports=UserModel