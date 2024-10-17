const jwt = require("jsonwebtoken")
const env = require("dotenv")
env.config()
const Usermodel = require("../models/usermodel")

const AuthMiddleware = async (req, res, next) => {
    const token = req?.cookies?.accessToken

    try {
        const { email } = jwt.verify(token, process.env.SECRETE_KEY)
        const user = await Usermodel.findOne({ email })        

        if (!user) {
            return res.status(400).json({ message: "User not found" })
        } else {
            req.user = user;
            next();
        }
    } catch (error) {
        return res.status(400).json({ message: "Invalid Token from a"})
    }

}

module.exports = AuthMiddleware