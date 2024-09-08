
const mongoose = require("mongoose")

const connection = mongoose.connect('mongodb://127.0.0.1:27017/data10am')


const userschema = new mongoose.Schema({
    name:String,
    age:Number,
    city:String
})

const UserModel = mongoose.model("user",userschema)

module.exports={connection,UserModel}