const mongoose = require("mongoose")

const Noteschema =new mongoose.Schema({
    title:{type:String,require:true},
    body:{type:String,require:true},
    image:{type:String,default:"https://m.media-amazon.com/images/I/314Rp+8XKWL._SX342_SY445_.jpg"},
    userId:String
},{versionKey:false})

const NoteModel = mongoose.model("note",Noteschema)

module.exports = NoteModel  
