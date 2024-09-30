const mongoose = require("mongoose")

const Movieschema = mongoose.Schema({
    title:String,
    genre:String,
    director:String,
    releaseYear:Number,
    description:String,
    userId:String
},{versionKey:false})

const MovieModel = mongoose.model("movie",Movieschema)

module.exports=MovieModel