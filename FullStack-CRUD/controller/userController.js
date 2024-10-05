const Usermodel = require("../models/usermodel")
const jwt = require("jsonwebtoken")
const env = require("dotenv")
env.config()

const UserRegister = async(req,res)=>{
    const {name,email,password} = req.body

    try {
        const singleuser = Usermodel({name,email,password})
        await singleuser.save()
        
        res.status(200).json({message:"user created successfully"})   
    } catch (error) {
        res.status(400).json({message:error.message})   
    }
}

const UserVerify = async(req,res)=>{
    try {
        
    } catch (error) {
        res.status(400).json({message:error.message})
    }
}

    // const registrationToken = jwt.sign({singleuser},process.env.SECRETE_KEY)


module.exports={UserRegister, UserVerify}