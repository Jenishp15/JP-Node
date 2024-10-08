const Usermodel = require("../models/usermodel")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")


const env = require("dotenv")
env.config()

const otpGenerator = require('otp-generator')
// const sendmail = require("../utilities/sendotp")

const UserRegister = async (req, res) => {
    const { name, email, password } = req.body

    try {
        const otp = otpGenerator.generate(6, { lowerCaseAlphabets: false, upperCaseAlphabets: false, specialChars: false })
        console.log(otp)

        var verificationToken = jwt.sign({ name, email, password, generatedOtp: otp }, process.env.SECRETE_KEY)

        // const htmltemplate = await ejs.renderFile(__dirname + "/../view/email.ejs",{otp,name})
        // await sendmail(email,htmltemplate)

        res.cookie("verificationToken", verificationToken).status(200).json({ message: "Email send Successfully" })
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

const UserVerify = async (req, res) => {
    try {
        const { otp } = req.body
        const { verificationToken } = req.cookies

        const { generatedOtp, name, email, password } = jwt.verify(verificationToken, process.env.SECRETE_KEY);

        if (!otp) {
            return res.status(400).json({ message: "Enter OTP" })
        }

        if (generatedOtp != otp) {
            return res.status(400).json({ message: "Please Enter valid OTP" })
        }

        bcrypt.hash(password, 5, function (err, hash) {
            if (err) {
                return res.status(400).json({ message: err.message })
            } else {
                Usermodel.create({ name, email, password: hash })
                res.status(200).json({ message: "User Created Successfully" })
            }
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


module.exports = { UserRegister, UserVerify, UserLogin }