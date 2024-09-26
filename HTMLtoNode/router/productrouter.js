const express = require("express")
const formController = require("../controller/product")
const Productmodel = require("../model/productmodel")

const ProductRouter = express.Router()

ProductRouter.get("/home",(req,res)=>{
    res.render("../views/home.ejs")
})

ProductRouter.get("/about", (req,res)=>{
    res.render("../views/about.ejs")
})

ProductRouter.get("/contact", (req,res)=>{
    res.render("../views/contact.ejs")
})

ProductRouter.get("/product",async (req,res)=>{
    
    const productdata = await Productmodel.find()
    
    res.render("../views/product.ejs",{productdata})
})

ProductRouter.post("/contact",formController)

module.exports = ProductRouter