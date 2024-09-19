const mongoose = require("mongoose")

const contactschema = mongoose.Schema({
    name:String,
    email:String,
    message:String
})

const contactModel = mongoose.model("contact",contactschema)

module.exports = contactModel