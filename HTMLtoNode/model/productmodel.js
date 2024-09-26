const mongoose = require("mongoose")

const Productschema =new mongoose.Schema({
    name:String,
    price:String,
    description:String,
    image:String,
},{ versionKey: false })

const Productmodel = mongoose.model("product",Productschema)

module.exports = Productmodel
