const express = require("express")
const Usermodel = require("../models/usermodel")

const UserRouter = express.Router()

UserRouter.post("/register",async(req,res)=>{
    const {name,email,password} = req.body
    try {
        const singleuser = Usermodel({name,email,password})
        await singleuser.save()
        res.status(201).json({message:"user created successfully"})   
    } catch (error) {
        res.status(400).json({message:error.message})   
    }
})




module.exports=UserRouter