const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const UserModel = require("../model/user.model")

const env = require("dotenv")
env.config()

const UserRegister = async (req, res) => {

    const {username,email,dob,role,location,password,confpassword} = req.body
    try {
        if(password!=confpassword){
            return res.status(400).json({ message: "password and conf pass must be same" })
        }

        bcrypt.hash(password,5,function(err,hash){
        if(err){
            return res.status(400).json({ message: "error to hashing pass" })
        }
        UserModel.create({username,email,dob,role,location,password:hash,confpassword:hash})
    })   
        
        res.status(200).json({ message: "Account created successfully" })
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

const UserLogin = async (req, res) => {
    const { email, password } = req.body
    
    try {
        const user = await UserModel.findOne({ email })
        if (!user) {
            return res.status(400).json({ message: "User not found" })
        }
    
        bcrypt.compare(password, user.password, function (err, result) {
            if(result) {
                const accessToken = jwt.sign({ email }, process.env.SECRETE_KEY)
                res.cookie("accessToken", accessToken).json({ message: "User Login Successfully" })
            }else{
                res.status(400).json({ message:"Invalid password"})
            }
        })
    } catch (error) {
        res.status(400).json({ message: error.message })
    }

    
}

const UserLogout = async (req,res) => {
    res.clearCookie("accessToken").status(200).json({message:"Logout successfully"})
}

const GetUser = async(req,res)=>{
    try {
        const data = await UserModel.findOne({_id:req.user._id})
        console.log(data);
        
        res.status(200).json({ message: "Here your data",data })

    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

const GetAllUser = async(req,res)=>{
    try {
        const data = await UserModel.find()
        
        res.status(200).json({ message: "Here your data",data })

    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

const UpdateUser = async(req,res)=>{

    try {
        const data = await UserModel.findOne({_id:req.params.userId})
        if(!data){
            return res.status(400).json({ message:"user not found" })
        }
        await UserModel.findByIdAndUpdate({_id:req.params.userId},{...req.body})
        
        res.status(200).json({ message: "User updated successfully" })

    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}
const DeleteUser = async(req,res)=>{
    try {
        const data = await UserModel.findOne({_id:req.user._id})
        if(!data){
            return res.status(400).json({ message:"user not found" })
        }
        await UserModel.findByIdAndDelete({_id:req.params.userId})
        
        res.status(200).json({ message: "User Deleted successfully" })

    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

module.exports = { GetUser, GetAllUser, UserRegister, UserLogin, UserLogout, UpdateUser, DeleteUser }