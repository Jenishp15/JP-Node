const mongoose = require("mongoose")

const Userschema =new mongoose.Schema({
    name:{type:String,require:true},
    email:{type:String,require:true,unique:true},
    password:{type:String,require:true}
},{versionKey:false})

const Usermodel = mongoose.model("user",Userschema)

module.exports = Usermodel
