const jwt = require("jsonwebtoken")
const env = require("dotenv");
env.config()
const UserModel = require("../model/userModel");

const AuthMiddleware = async (req, res, next) => {

    const {accesstoken} = req.cookies

    try {
        const { email } = jwt.verify(accesstoken, process.env.PRIVATEKEY)
        const user = await UserModel.findOne({ email })

        if (!user) {
            return res.status.json({ message: "User not found" })
        } else {
            req.user = user
            next()
        }
    } catch (error) {
        res.status(404).json({ message: "Invalid Token" })
    }
};

module.exports = AuthMiddleware