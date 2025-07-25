const express = require("express");
const { ProductModel } = require("../db");

const ProductRouter = express();

ProductRouter.get("/",(req,res)=>{
    console.log("from get orute");
    res.send("product get");
})

ProductRouter.post("/addproduct",async(req,res)=>{
    try {
        const {name,qnt,price} = req.body;
        ProductModel.create({name,qnt,price});
        res.status(200).json({ message: "Product Added successfully" })
    } catch (error) {
        res.status(400).json({message: error.message})
    }
    
    
})

ProductRouter.patch("/updateproduct/:pid",async(req,res)=>{
    try {
        const {qnt} = req.body;
        const {pid} = req.params
        await ProductModel.findByIdAndUpdate(pid,{qnt});
        res.status(200).json({ message: "Quantity updated successfully" })
    } catch (error) {
        res.status(400).json({message: error.message})
    }
    
})

ProductRouter.delete("/deleteproduct/:pid",async(req,res)=>{
    try {
        const {pid} = req.params;
        await ProductModel.findByIdAndDelete(pid);
        res.status(200).json({ message: "Product deleted successfully" })
    } catch (error) {
        res.status(400).json({message: error.message})
    }
    
})

module.exports = ProductRouter