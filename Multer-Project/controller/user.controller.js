const UserModel = require("../model/user.model");
// const SendEmail = require("../utilis/email");
const createOtp = require("../utilis/otpgenerator");
const ejs = require("ejs")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")

const Signup = async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({ message: "All field must be fill" })
    }
    if (password.length != 6) {
        return res.status(400).json({ message: "password must be 6 character long" })
    }

    try {
        const user = await UserModel.findOne({ email })
        if (user) {
            return res.status(400).json({ message: "Eamil already exists" });
        }

        const { token, otp } = createOtp({ name, email, password })

        const htmltemplate = await ejs.renderFile(__dirname + "/../view/email.ejs", { name, otp });

        // await SendEmail(email,htmltemplate)
        console.log(otp)

        res.cookie("Verification_Token", token).status(200).json({ message: "Please Verify your otp" })
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

const Varification = async (req, res) => {
    const { otp } = req.body;
    const { Verification_Token } = req.cookies;

    if (!otp) {
        return res.status(400).json({ message: "Please enter otp" })
    }

    jwt.verify(Verification_Token, process.env.privatekey_Varification, async function (err, decode) {
        if (err) {
            return res.status(400).json({ message: err.message })
        }

        const { user, otpGenerator } = decode;

        if (otpGenerator != otp) {
            return res.status(400).json({ message: "Invalid otp" })
        }

        bcrypt.hash(user.password, 5, async function (err, hash) {
            if (err) {
                return res.status(400).json({ message: err.message })
            }
            await UserModel.create({ ...user, password: hash })
            return res.status(200).json({ message: "User created successfully" })
        })

    })


}

const Signin = async (req,res) => {
    const {email, password} = req.body

    try {
        const user = await UserModel.findOne({email})

        if(!user){
        return res.status(400).json({message:"Please Register"})
        }

        bcrypt.compare(password,user.password,function(err,result){
            if(err){
            return res.status(400).json({message:"Error compiling password"})
            }

            if(!result){
            return res.status(400).json({message:"Invalid password"})
            }

            const {password,...rest} = user._doc;

            var token = jwt.sign({userdata : rest},process.env.privatekey_AToken)
            if(!token){
            return res.status(400).json({message:"Error generating token"})
            }

            res.cookie("Access_Token",token).status(200).json({message:"Login Successfully"})
        })
        
    } catch (error) {
        res.status(400).json({message:error.message})
    }
}

const Logout = (req,res) => {
    res.clearCookie("Access_Token").status(200).json({message:"Logout successfully"})
}

const Getuser = async (req,res) => {
    const user = req.user;
    
    if(user._id !== req.params.userId){
        return res.status(400).json({message:"Invalid User"})
    }

    try {
        const userdata = await UserModel.findOne({_id:req.params.userId})
        const {password,...rest} = userdata._doc
        res.status(200).json({message:"Data get successfully",data:rest})
        
    } catch (error) {
        return res.status(400).json({message:error.message})
    }
}

const Updateuser = async (req,res) => {
    
    const {filename} = req.file
    res.send("ok")
    
    if(req.body.email || req.body.password || req.body.roll){
        return res.status(400).json({message:"Invalid Request"})
    }

    try {
        const userdata = await UserModel.findByIdAndUpdate(req.params.userId,{
            $set:{...req.body,profileImage:filename},
        })

        const {password,...rest} = userdata._doc
        res.status(200).json({message:"Data Updated successfully",data:rest})
    } catch (error) {
        res.status(400).json({message:error.message})
    }
}

const getusers = async (req,res) => {
    const limit = req.query.limit || 10
    const skip = req.query.skip || 0
    const sort = req.query.sort=="asc" ? -1 : 1
    try {
        const userdata = await UserModel.find().limit(limit).skip(skip).sort({creatdAt:sort})
        if(!userdata){
            return res.status(400).json({message:"No users found"})
        }
        return res.status(200).json({message:"Data get successfully",data:userdata})
    } catch (error) {
        return res.status(400).json({message:error.message})
    }
}

const deleteusers = async (req,res) => {
    try {
        const user = await UserModel.findOne({_id:req.params.Id})
        if(!user){
            return res.status(400).json({messsage:"user not found"})
        }
        const deleteuser = await UserModel.findByIdAndDelete({_id:req.params.Id})
        return res.status(200).json({message:"User deleted successfully",deleteuser})

    } catch (error) {
        return res.status(400).json({message:error.message})
    }
}

module.exports = { Signup, Varification, Signin, Logout, Getuser, Updateuser, getusers, deleteusers}