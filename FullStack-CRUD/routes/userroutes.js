const express = require("express")

const { UserRegister, UserVerify } = require("../controller/userController")

const UserRouter = express.Router()

UserRouter.post("/register",UserRegister)
UserRouter.post("/verification",UserVerify)

// UserRouter.post("/register",UserRegister)

module.exports=UserRouter