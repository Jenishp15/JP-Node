const mongoose = require("mongoose")

const Blogschema =new mongoose.Schema({
    title:String,
    author:String,
    content:String,
    tags:String,
    published_date:Date,
    userId:String
},{versionKey:false})

const BlogModel = mongoose.model("blog",Blogschema)

module.exports = BlogModel  
