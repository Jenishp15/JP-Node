const express = require("express")
const UserModel = require("../model/userModel")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

const UserRouter = express.Router()

UserRouter.post("/register",async (req,res)=>{
    const {username,email,password,role} = req.body
    try {
        bcrypt.hash(password,5,async (err,hash)=>{
            if(err){
                console.log("error to genriting hash password")
            }
            const singleuser = UserModel({username,email,password:hash,role})
            await singleuser.save()
            
            var verificationToken = jwt.sign({username,email,password,role},process.env.PRIVATEKEY)
            res.cookie("verificationToken",verificationToken).json({message:"User created successfully"})    
        })
        } catch (error) {
        res.status(400).json({message:error.mressage})
    }
})
     
UserRouter.post("/login",async(req,res)=>{
    const {email,password} = req.body;
    const user = await UserModel.findOne({email})      

        if(!user){
            return res.status(400).json({message:"User not found"})
        }
    
        bcrypt.compare(password,user.password,function (err,result){
            if(err){
                res.status(400).json({message:"Invalid password"})
            }
            if(result){
                const accesstoken = jwt.sign({email},process.env.PRIVATEKEY)
                res.cookie("accesstoken",accesstoken).json({message:"Login successfully"})
            }
        })
  
})

module.exports = UserRouter