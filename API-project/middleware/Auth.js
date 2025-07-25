const jwt = require("jsonwebtoken")
const env = require("dotenv")
env.config()
const UserModel = require("../model/user.model")

const AuthMiddleware = async (req, res, next) => {
    const token = req?.cookies?.accessToken

    try {
        const { email } = jwt.verify(token, process.env.SECRETE_KEY)
        
        const user = await UserModel.findOne({ email })

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