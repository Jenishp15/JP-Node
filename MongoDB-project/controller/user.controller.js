// const express = require("express")
const UserModel = require("../model/user.model")
// const UserRouter = express.Router()
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const env = require("dotenv")
env.config()

const getuserdata = async(req,res)=>{
    try {
       const userdata = await UserModel.find()
       res.status(200).json({message:userdata})
    } catch (error) {
        res.status(400).json({message:"Error to fatching data"})
    }
}

const userregistraion = (req,res)=>{
    const {username,email,DOB,roll,location,password,confpassword} = req.body

    try {
        if(password==confpassword){
            bcrypt.hash(password,5,async(err,hash)=>{
                if(err){
                    return res.status(500).json({message:"Error in hashing password"})
                }else{
                    const singleuser=await UserModel({username,email,DOB,roll,location,password:hash,confpassword:hash})
                    await singleuser.save()
                    res.status(200).json("User created successfully")
                }
            })

        }else{
            res.status(200).json("password not match with confirm password")
        }
    } catch (error) {
        res.status(400).json({message:error})
    }
}

const userlogin = async(req,res)=>{
    const {username,password} = req.body
    try {
        const matchuser=await UserModel.findOne({username})
        const hashpassword = matchuser.password
        bcrypt.compare(password,hashpassword,function(err,result){
            if(result){

                jwt.sign({matchuser},process.env.SECRET_KEY,function(err,token){
                    if(err){
                        res.status(400).json({message:"Error in generiting token"})   
                    }else{
                        res.status(200).json("Log in successfully")
                    }
                })
            }else{
                res.status(400).json("Invalid User || Password")     
            }
        })

    } catch (error) {
        res.status(400).json({message:error.message})
    }
}

const updateuser = async(req,res)=>{
    const id = req.params.id 
    
    try {

            const updateddata = await UserModel.findByIdAndUpdate({_id: id},req.body,{new:true})
            res.status(200).json({message:"updated successfully"})    

        } catch (error) {
        res.status(400).json({message:error.message})
    }
}

const deleteuser = async (req, res) => {

    const id = req.params.id
    
    try {
        const deleteditem =await UserModel.findByIdAndDelete(id)  
        res.status(200).json({message:"data deleted"})
    } catch (error) {
        res.status(400).json({message:error.message})
    }

}

module.exports = {getuserdata,userregistraion,userlogin,deleteuser,updateuser}