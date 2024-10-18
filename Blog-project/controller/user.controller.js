const Usermodel = require("../models/usermodel")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")

const env = require("dotenv")
env.config()

const UserRegister = async (req, res) => {
    const { username, email, password,role } = req.body;

    try {
        bcrypt.hash(password,5,function(err,hash){
            if(err){
                res.send("error to hash pass")
            }
            Usermodel.create({username, email, password:hash,role})
            res.status(200).json({ message: "Account created successfully" })
        })

    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

const UserLogin = async (req, res) => {
    const { email, password } = req.body
    const user = await Usermodel.findOne({ email })

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
}

const UserLogout = async (req,res) => {
    res.clearCookie("accessToken").status(200).json({message:"Logout successfully"})
}


module.exports = { UserRegister, UserLogin, UserLogout}