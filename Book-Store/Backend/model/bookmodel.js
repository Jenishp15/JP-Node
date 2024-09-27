const mongoose = require("mongoose")

const bookSchema = mongoose.Schema({
    title: String,
    author: String,
    price: Number,
    description: String,
    ISBN: String,
},{ versionKey: false })

const bookModel = mongoose.model("book",bookSchema)

module.exports=bookModel