const mongoose = require("mongoose")
const dotenv = require("dotenv")
dotenv.config()

const connection = mongoose.connect(process.env.CONNECTION);

const ProductSchema = new mongoose.Schema({
    name:String,
    qnt:{type:Number,default:1},
    price:Number
})

const ProductModel = mongoose.model("product",ProductSchema)

module.exports={connection ,ProductModel}